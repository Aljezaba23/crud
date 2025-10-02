import { Component } from '@angular/core';
import { ProductsComponent } from './components/products/products.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductsComponent],  // importa el componente hijo
  template: `<app-products></app-products>`  // renderiza el componente de productos
})
export class AppComponent {}
