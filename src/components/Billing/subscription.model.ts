export class Subscription {
  constructor(
    public id: string,
    public active: boolean,
    public cardLast4: string,
    public cardName: string,
    public currentPeriodStart: string,
    public currentPeriodEnd: string,
    public productName: string,
    public priceAmount: string,
    public priceInterval: PriceInterval,
  ) {}
}

export enum PriceInterval {
  Month = 'month',
  Year = 'year',
}
