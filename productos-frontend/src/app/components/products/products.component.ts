import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],  // necesario para *ngFor y ngModel
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  formProduct: Product = { name: '', price: 0, stock: 0 };
  editingId: number | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.productService.getAll().subscribe(data => this.products = data);
  }

  save(): void {
    if (this.editingId) {
      this.productService.update(this.editingId, this.formProduct).subscribe(() => {
        this.load();
        this.resetForm();
      });
    } else {
      this.productService.create(this.formProduct).subscribe(() => {
        this.load();
        this.resetForm();
      });
    }
  }

  edit(p: Product): void {
    this.editingId = p.id ?? null;
    this.formProduct = { ...p };
  }

  delete(id: number | undefined): void {
    if (!id) return;
    if (!confirm('¿Eliminar producto?')) return;
    this.productService.delete(id).subscribe(() => this.load());
  }

  resetForm(): void {
    this.formProduct = { name: '', price: 0, stock: 0 };
    this.editingId = null;
  }
}
