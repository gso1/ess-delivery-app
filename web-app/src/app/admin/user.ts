import { PaymentMethod } from  "../classes/payment-method";;
import { Order } from "../user/orders/order";
import { Coupon } from "./coupon";
import { Product } from "./restaurant";

export interface User {
    name: string;
    id: string;
    email: string;
    orders: Order[];
    paymentMethods: PaymentMethod[] // tem que adicionar metodo de pagamento aqui
}