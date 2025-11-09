export interface IPrice {
  value: number;
  currency: string;
  installment: {
    value: number;
    period: number;
  };
  validFrom: Date;
  validTo: Date;
}

export interface IProduct {
  image: string;
  code: string;
  name: string;
  color: string;
  capacity: number;
  dimensions: string;
  features: string[];
  energyClass: string;
  price: IPrice;
}
