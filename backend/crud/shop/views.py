from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from .models import Category, Product, ProductImage, Cart, CartItem
from .serializers import (
    CategorySerializer,
    ProductSerializer,
    CartSerializer,
    CartItemSerializer
)

from rest_framework import generics
from .serializers import RegisterSerializer
from django.contrib.auth.models import User
from django.db.models import Prefetch


# ---------------- Category ----------------
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.filter(is_active=True)
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAdminUser]
    lookup_field = 'slug'

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return super().get_permissions()


# ---------------- Product ----------------
class ProductViewSet(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAdminUser]
    lookup_field = 'slug'

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return super().get_permissions()

    def get_queryset(self):
        # base queryset
        queryset = Product.objects.filter(available=True).prefetch_related(
            Prefetch('images', queryset=ProductImage.objects.all())
        )

        # filter by category
        category_slug = self.request.query_params.get('category', None)
        if category_slug:
            queryset = queryset.filter(category__slug=category_slug)

        # filter by featured
        featured = self.request.query_params.get('featured', None)
        if featured == 'true':
            queryset = queryset.filter(featured=True)

        return queryset


# ---------------- Cart ----------------
class CartViewSet(viewsets.ModelViewSet):
    serializer_class = CartSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return Cart.objects.none()

    def get_object(self):
        user = self.request.user
        session_key = self.request.session.session_key

        if not session_key:
            self.request.session.create()
            session_key = self.request.session.session_key

        cart, created = Cart.objects.get_or_create(
            user=user if user.is_authenticated else None,
            session_key=session_key if not user.is_authenticated else None
        )
        return cart

    @action(detail=False, methods=['get'])
    def my_cart(self, request):
        cart = self.get_object()
        serializer = self.get_serializer(cart)
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def add_item(self, request):
        cart = self.get_object()
        serializer = CartItemSerializer(data=request.data, context={'request': request})

        if serializer.is_valid():
            product = serializer.validated_data['product']
            quantity = serializer.validated_data.get('quantity', 1)

            if product.stock < quantity:
                return Response(
                    {"detail": f"Only {product.stock} in stock"},
                    status=status.HTTP_400_BAD_REQUEST
                )

            cart_item, created = CartItem.objects.get_or_create(
                cart=cart,
                product=product,
                defaults={'quantity': quantity}
            )

            if not created:
                cart_item.quantity += quantity
                cart_item.save()

            return Response(
                CartItemSerializer(cart_item).data,
                status=status.HTTP_201_CREATED
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['patch'], url_path='item-update/(?P<item_id>\d+)')
    def item_update(self, request, item_id=None):
        cart = self.get_object()
        item = get_object_or_404(CartItem, id=item_id, cart=cart)

        serializer = CartItemSerializer(
            item,
            data=request.data,
            partial=True,
            context={'request': request}
        )

        if serializer.is_valid():
            new_quantity = serializer.validated_data.get('quantity')

            if new_quantity is not None:
                if new_quantity <= 0:
                    item.delete()
                    return Response(
                        {"detail": "Item removed"},
                        status=status.HTTP_200_OK
                    )

                if item.product.stock < new_quantity:
                    return Response(
                        {"detail": f"Only {item.product.stock} in stock"},
                        status=status.HTTP_400_BAD_REQUEST
                    )

            serializer.save()
            return Response(CartItemSerializer(item).data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['delete'], url_path='item-delete/(?P<item_id>\d+)')
    def item_delete(self, request, item_id=None):
        cart = self.get_object()
        item = get_object_or_404(CartItem, id=item_id, cart=cart)
        item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# ---------------- Register ----------------
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {
                "user": serializer.data,
                "message": "User created successfully"
            },
            status=status.HTTP_201_CREATED
        )
