import { Coupon } from "./coupon";
import { product } from "./restaurants";

import { PaymentMethod } from "./payment-method";

export interface Order {
    id: string;
    products: product[];
    amount: number;
    coupon: Coupon;
    restaurant: string;
    address: string
}

export interface User {
    name: string;
    id: string;
    email: string;
    orders: Order[];
    paymentMethods: PaymentMethod[];
}

export interface Admin {
    name: string;
    id: string;
}

