import {Component, OnInit} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ApiService} from '../../../service/api.service';
import {ExchangeRatesForCurrency} from "../../../currency";

@Component({
  selector: 'app-converter-currency',
  standalone: true,
  imports: [ReactiveFormsModule, MatSelectModule, CommonModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule],
  templateUrl: './converter-currecy.component.html',
  styleUrl: './converter-currecy.component.css',
})

export class ConverterCurrencyComponent implements OnInit {
  constructor(private ApiServise: ApiService) {}
  public uahExchangeRate!: ExchangeRatesForCurrency;
  public exchangeRates = new Map<string, number>();
  public currencies = ['uah', 'usd', 'eur'];
  public errorMessage: string | null = null;
  form1 = new FormGroup({
    inputValue1: new FormControl(''),
    selectedCurrencyFirst: new FormControl('uah')
  });
  form2 = new FormGroup({
    inputValue2: new FormControl(''),
    selectedCurrencySecond: new FormControl('usd')
  });

  ngOnInit(): void {
    this.ApiServise.getRates().subscribe((data) => {
      this.uahExchangeRate = data.uah;
      this.currencies.forEach((fromCurrency) => {
        this.currencies.forEach((toCurrency) => {
          this.fillExchangeRateMap(fromCurrency, toCurrency);
        })
      })
    })
  }

  resetAll() {
    this.form1.reset();
    this.form2.reset();
  }

  doExchange(event: Event) {
    const formValue = this.form1.getRawValue();
    const formValue2 = this.form2.getRawValue();
    const inputElement = event.target as HTMLInputElement;
    const inputId = inputElement.id;
    let exchangeAmount: number;
    if (inputId === 'input1' || inputId === 'input2') {
      this.checkIfNotNegative(+inputElement.value)
    }
    if (inputId === 'input1' || inputId === 'mySelectId1') {
      if (!formValue.inputValue1) {
        this.form2.patchValue({inputValue2: ''})
        return;
      }
      exchangeAmount = +formValue.inputValue1! * this.exchangeRates.get(formValue.selectedCurrencyFirst! + '|' + formValue2.selectedCurrencySecond!)!
      this.form2.patchValue({inputValue2: exchangeAmount.toString()})
    } else {
      if (!formValue2.inputValue2) {
        this.form1.patchValue({inputValue1: ''})
        return;
      }
      exchangeAmount = +formValue2.inputValue2! * this.exchangeRates.get(formValue2.selectedCurrencySecond! + '|' + formValue.selectedCurrencyFirst)!;
      this.form1.patchValue({inputValue1: exchangeAmount.toString()})
    }
  }

  private fillExchangeRateMap(fromCurrency: string | string, toCurrency: string | string) {
    if (fromCurrency === toCurrency) {
      this.exchangeRates.set(fromCurrency + '|' + toCurrency, 1);
    } else if (fromCurrency === 'uah') {
      this.exchangeRates.set(fromCurrency + '|' + toCurrency, this.uahExchangeRate[toCurrency as keyof ExchangeRatesForCurrency]);

    } else if (toCurrency === 'uah') {
      this.exchangeRates.set(fromCurrency + '|' + toCurrency, 1 / this.uahExchangeRate[fromCurrency as keyof ExchangeRatesForCurrency]);

    } else if (fromCurrency !== 'uah' && toCurrency !== 'uah') {
      let crossExchangeRate = 1 / (this.uahExchangeRate[fromCurrency as keyof ExchangeRatesForCurrency] / this.uahExchangeRate[toCurrency as keyof ExchangeRatesForCurrency]);
      this.exchangeRates.set(fromCurrency + '|' + toCurrency, crossExchangeRate);
    }
  }

  private checkIfNotNegative(value: number) {
    if (value < 0) {
      this.errorMessage = 'Only positive numbers are allowed!';
    } else {
      this.errorMessage = null;
    }
  }
}
