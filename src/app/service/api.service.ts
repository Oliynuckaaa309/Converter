import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, shareReplay} from 'rxjs';
import {ExchangeRatesApiResponse} from "../currency";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/uah.json';
  private cachedResponse$!: Observable<ExchangeRatesApiResponse>;
  constructor(private http: HttpClient) {
  }

  getRates(): Observable<ExchangeRatesApiResponse> {
    if (!this.cachedResponse$) {
      this.cachedResponse$ = this.requestRates().pipe(
        shareReplay(1)
      );
    }
    return this.cachedResponse$;
  }

  requestRates(): Observable<ExchangeRatesApiResponse> {
    return this.http.get<ExchangeRatesApiResponse>(this.apiUrl);
  }
}
