export class Product {
  constructor(
    public id: string,
    public monthlyPriceId: string,
    public yearlyPriceId: string,
    public name: string,
    public features: string,
    public monthlyPriceAmount: string,
    public yearlyPriceAmount: string,
    public active: boolean,
    public mostPopular: boolean,
  ) {}
}
