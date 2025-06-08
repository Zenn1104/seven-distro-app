export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    profile_picture: File | null;
    email_verified_at?: string;
}

export interface ProductSize {
    id: number;
    size: string;
    stock: number;
}

export interface Product {
    id: number;
    name: string;
    category: { id: number; name: string };
    category_id: string;
    stock: number;
    price: string;
    description: string;
    image_url: string | null;
    sizes: ProductSize[];
    reviews: Review[];
}

export interface Category {
    id: number;
    name: string;
    products: Product[];
}

export type Order = {
    id: number;
    created_at: string;
    status: string;
    total_price: number;
    user: {
        id: number;
        name: string;
    };
    items: OrderItem[];
};

export type OrderItem = {
    id: number;
    quantity: number;
    price: number;
    subtotal: number;
    product: {
        id: number;
        name: string;
    };
};

export type Review = {
    id: number;
    rating: number;
    review: string;
    created_at: string;
    user: {
        id: number;
        name: string;
    };
};

export interface CartItem {
    id: number;
    product_id: number;
    user_id: number;
    quantity: number;
    product_size: ProductSize;
    product: Product;
    created_at?: string;
    updated_at?: string;
}

export interface UserGrowthData {
    month: string;
    users: number;
}

export interface TopProductData {
    name: string;
    sales: number;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
};
