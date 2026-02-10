from django.contrib import admin
from .models import Category, Product, ProductImage, Cart, CartItem


# ---------------- Category ----------------
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'is_active', 'created_at')
    list_filter = ('is_active',)
    search_fields = ('name', 'description')
    prepopulated_fields = {'slug': ('name',)}
    ordering = ('name',)


# ---------------- Product Images Inline ----------------
class ProductImageInline(admin.TabularInline):  # or StackedInline for larger image preview
    model = ProductImage
    extra = 1  # number of empty image fields
    readonly_fields = ('image_preview',)

    def image_preview(self, obj):
        if obj.image:
            return f'<img src="{obj.image.url}" style="max-height: 100px;" />'
        return ""
    image_preview.allow_tags = True
    image_preview.short_description = "Preview"


# ---------------- Product ----------------
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'category',
        'price',
        'stock',
        'available',
        'featured',
        'created_at'
    )
    list_filter = ('available', 'featured', 'category')
    list_editable = ('price', 'stock', 'available')
    search_fields = ('name', 'description')
    prepopulated_fields = {'slug': ('name',)}
    ordering = ('-created_at', 'name')
    inlines = [ProductImageInline]  # <-- add multiple images inline


# ---------------- Cart ----------------
@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'total_items', 'created_at', 'updated_at')
    readonly_fields = ('created_at', 'updated_at')
    search_fields = ('user__username', 'session_key')
    ordering = ('-updated_at',)


# ---------------- Cart Item ----------------
@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'cart', 'quantity', 'subtotal', 'created_at')
    list_filter = ('cart__user',)
    search_fields = ('product__name',)
    readonly_fields = ('created_at', 'updated_at')
    ordering = ('-created_at',)

    def subtotal(self, obj):
        return obj.subtotal()
    subtotal.short_description = "Subtotal"
