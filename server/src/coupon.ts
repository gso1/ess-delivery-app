export class Coupon {
    id: string;
    name: string;
    adm: boolean;
    minValue: number;
    product: string;
    discount: number;
    status: string;

  constructor(coupon: Coupon) {
      this.id = coupon.id;
      this.name = coupon.name;
      this.adm = coupon.adm;
      this.minValue = coupon.minValue;
      this.product = coupon.product;
      this.discount = coupon.discount;
      this.status = coupon.status;
  }

  update(coupon: Coupon): void {
      this.name = coupon.name;
      this.product = coupon.product;
      this.minValue = coupon.minValue;
      this.discount = coupon.discount;
      this.status = coupon.status;
  }
}