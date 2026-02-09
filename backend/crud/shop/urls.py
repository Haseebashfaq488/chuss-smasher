from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from .views import CategoryViewSet, ProductViewSet, CartViewSet, RegisterView

router = DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'products', ProductViewSet, basename='product')
router.register(r'cart', CartViewSet, basename='cart')

urlpatterns = [
    path('', include(router.urls)),
    
    # Add these for auth
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),          # POST username/password → get access + refresh
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),        # POST refresh → new access
    path('register/', RegisterView.as_view(), name='register'),
]