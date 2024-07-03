import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../../service/api.service';
import {DecimalPipe} from '@angular/common';
import {ExchangeRatesApiResponse} from "../../../currency";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  public eur = 0;
  public usd = 0;
  constructor(private ApiServise: ApiService) {
  }

  ngOnInit() {
    this.getExchangeRates();
  }

  getExchangeRates(): void {
    this.ApiServise.getRates().subscribe((data: ExchangeRatesApiResponse) => {
      this.eur = 1 / (data.uah.eur);
      this.usd = 1 / (data.uah.usd);
    })
  }
}
