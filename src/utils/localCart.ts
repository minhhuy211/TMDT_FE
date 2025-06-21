// helpers/cartLocal.ts
import type { Product } from "@/model/Product";

export interface CartItemLocal {
    productId: string;
    productName: string;
    price: number;
    img?: string;
    quantity: number;
}

const CART_KEY = "cart_items";

export function getCartLocal(): CartItemLocal[] {
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
}

export function setCartLocal(items: CartItemLocal[]) {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
}

export function addToCartLocal(product: Product) {
    const cart = getCartLocal();
    const idx = cart.findIndex(item => item.productId === product.productId);
    if (idx !== -1) {
        cart[idx].quantity += 1;
    } else {
        cart.push({
            productId: product.productId,
            productName: product.productName,
            price: product.price,
            img: product.img,
            quantity: 1
        });
    }
    setCartLocal(cart);
}
export function updateCartItemLocal(productId: string, quantity: number) {
    let cart = getCartLocal();
    const idx = cart.findIndex(item => item.productId === productId);
    if (idx !== -1) {
        if (quantity > 0) {
            cart[idx].quantity = quantity;
        } else {
            cart.splice(idx, 1);
        }
        setCartLocal(cart);
    }
}
export function removeFromCartLocal(productId: string) {
    const cart = getCartLocal().filter(item => item.productId !== productId);
    setCartLocal(cart);
}
// Xóa toàn bộ giỏ hàng
export function clearCartLocal() {
    setCartLocal([]);
}

export function countCartLocal(): number {
    return getCartLocal().reduce((sum, item) => sum + item.quantity, 0);
}
