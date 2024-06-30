import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { ConverterCurrencyComponent } from './components/converter/converter-currency/converter-currecy.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MatFormFieldModule,MatInputModule, HeaderComponent, HttpClientModule, ConverterCurrencyComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Converter';
}
