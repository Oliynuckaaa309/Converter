import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../service/api.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  public rates: any;
  public eur!:number;
  public usd!:number;
  constructor(private ApiServise: ApiService) { }
  ngOnInit() {
    this.getExchangeRates();
    this.eur=1/(this.rates.eur);
    this.usd=1/(this.rates.usd);
  }
  getExchangeRates(): void {
    this.ApiServise.getRates().subscribe((data: any) => {
      this.rates = data.uah;
    })

  }
}
