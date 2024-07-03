export interface ExchangeRatesApiResponse{
  uah:ExchangeRatesForCurrency
}

export interface ExchangeRatesForCurrency{
  usd:number,
  eur:number
}
