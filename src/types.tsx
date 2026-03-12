export interface Product {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    tags: string[];
    brand: string;
    sku: string;
    weight: number;
    dimensions: {
        width: number;
        height: number;
        depth: number;
    };
    warrantyInformation: string;
    shippingInformation: string;
    availabilityStatus: string;
    reviews: Review[];
    returnPolicy: string;
    minimumOrderQuantity: number;
    meta: {
        createdAt: string;
        updatedAt: string;
        barcode: string;
        qrCode: string;
    };
    images: string[];
    thumbnail: string;
    quantity?: number;
}

interface Review {
    rating: number;
    comment: string;
    reviewerName: string;
    reviewerEmail: string;
}

export interface ProductList {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}

export type ProductIds = {
    products: {
        id: number
    }[];
    total: number;
    skip: number;
    limit: number;
};

export type User = {
    id: string;
    email: string;
    firstName: string;
    lastSeen: number;
    role: "student" | "admin" | "teacher";
    preferredLanguage: string;
    entity?: string;
    created: string;
    modified: string;
};

export type AuthResponse = {
    user?: User;
    token?: string;
    message?: string;
};

export type CartResponse = {
    cart?: Cartitems;
    message?: string;
};

export type Cartitems = Record<string, number>;

export interface AlertProps {
    type?: "success" | "error" | "info" | "warning";
    message?: string;
    onDismiss?: () => void;
    fading?: boolean;
}

export interface FormProps {
    values: { email: string, password?: string, Name?: string, confirmPassword?: string };
    errors: { email?: string, password?: string, Name?: string, confirmPassword?: string };
    touched: { email?: boolean, password?: boolean, Name?: boolean, confirmPassword?: boolean };
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    isSubmitting: boolean;
    isValid: boolean;
};

export interface FormikSubmitProps {
    setSubmitting: (submitting: boolean) => void;
    props: {
        navigate: (to: string) => void;
        login?: (user: User, token: string) => void;
        showAlert: (message: string, type: AlertProps["type"]) => void;
    };
};