import { Component } from "@angular/core";
import { PRODUCTS } from "../../../../data/products.data";

@Component({
	selector: "app-products",
	standalone: true,
	imports: [],
	templateUrl: "./products.component.html",
	styleUrl: "./products.component.css",
})
export class ProductsComponent {
	products = PRODUCTS;
}
