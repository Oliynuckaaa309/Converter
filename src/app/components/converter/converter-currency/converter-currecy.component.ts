import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { ApiService } from '../../../service/api.service';
@Component({
  selector: 'app-converter-currency',
  standalone: true,
  imports: [ReactiveFormsModule, MatSelectModule, CommonModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule],
  templateUrl: './converter-currecy.component.html',
  styleUrl: './converter-currecy.component.css',

})
export class ConverterCurrencyComponent implements OnInit {
  constructor(private ApiServise: ApiService) { }
  public uahExchangeRate: any;
  public inputValue1!: number | string;
  public inputValue2!: number | string;
  public selectedCurrencyFirst: string = 'uah';
  public selectedCurrencySecond: string = 'usd';
  public exchangeRates = new Map<string, number>();
  public currencies = ['uah', 'usd', 'eur'];
  public controlForFirstInput = new FormControl('');
  public controlForSecondInput = new FormControl('');
  ngOnInit(): void {
    this.ApiServise.getRates().subscribe((data) => {
      this.uahExchangeRate = data.uah;

    })

    this.currencies.forEach((fromCurrency) => {
      this.currencies.forEach((toCurrency) => {
        if (fromCurrency === toCurrency) {
          this.exchangeRates.set(fromCurrency + '|' + toCurrency, 1);
        }
        else if (fromCurrency === 'uah') {
          this.exchangeRates.set(fromCurrency + '|' + toCurrency, this.uahExchangeRate[toCurrency]);

        }
        else if (toCurrency === 'uah') {
          this.exchangeRates.set(fromCurrency + '|' + toCurrency, 1 / this.uahExchangeRate[fromCurrency]);

        }
        else if (fromCurrency !== 'uah' && toCurrency !== 'uah') {
          let crossExchangeRate = 1 / (this.uahExchangeRate[fromCurrency] / this.uahExchangeRate[toCurrency]);
          this.exchangeRates.set(fromCurrency + '|' + toCurrency, crossExchangeRate);
        }

      })

    })
  }
  resetAll() {
    this.inputValue1 = '';
    this.inputValue2 = '';
    this.selectedCurrencyFirst = 'uah';
    this.selectedCurrencySecond = 'usd';

  }
  doExchange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const inputId = inputElement.id;
    console.log(this.inputValue1)
    if (inputId === 'input1' || inputId === 'mySelectId1') {
      if (!this.inputValue1) {
        return;
      }
      this.inputValue2 = +this.inputValue1 * this.exchangeRates.get(this.selectedCurrencyFirst.toLowerCase() + '|' + this.selectedCurrencySecond.toLowerCase())!
    } else {
      if (!this.inputValue2) {
        return;
      }
      this.inputValue1 = +this.inputValue2 * this.exchangeRates.get(this.selectedCurrencySecond.toLowerCase() + '|' + this.selectedCurrencyFirst.toLowerCase())!
    }
    if(this.inputValue1===0){
      this.inputValue2=0
    }
   
  }
 
}
