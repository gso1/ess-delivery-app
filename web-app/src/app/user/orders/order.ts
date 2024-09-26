// import { Product } from 'src/app/admin/restaurant';
import { Product } from '../../../../src/app/admin/restaurant';
// import { Coupon } from 'src/app/admin/coupon';
import { Coupon } from '../../../../src/app/admin/coupon';


export interface Order {
    id: string;
    products: Product[];
    amount: number;
    coupon: Coupon;
    restaurant: string;
    address: string;
}

export const order = <Order>{
    id: "",
    restaurant: "BK",
    products: [],
    coupon: {
        id: "",
        name: "",
        adm: false,
        minValue: 0,
        product: "",
        discount: 0,
        status: ""
    },
    amount: 0,
    address: "",
}