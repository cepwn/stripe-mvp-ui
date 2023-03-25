export class AdminProduct {
  constructor(
    public id: string,
    public name: string,
    public features: string,
    public monthlyPriceAmount: string,
    public yearlyPriceAmount: string,
    public active: boolean,
    public mostPopular: boolean,
  ) {}
}
