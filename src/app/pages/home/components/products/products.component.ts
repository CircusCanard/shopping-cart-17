import { Component } from "@angular/core";
import { PRODUCTS, Product } from "../../../../data/products.data";
import { ProductCardComponent } from "../product-card/product-card.component";

@Component({
	selector: "app-products",
	standalone: true,
	imports: [ProductCardComponent],
	templateUrl: "./products.component.html",
	styleUrl: "./products.component.css",
})
export class ProductsComponent {
	products = PRODUCTS;

	onAdd(product: Product) {}
}
