import { Injectable, signal } from "@angular/core";

// Injectable decorator makes this service available throughout the application
@Injectable({
	providedIn: "root",
})
export class CartService {
	// Define a reactive signal for the cart's state
	cart = signal<Cart>({
		items: [], // Initialize with an empty array of items
		count: 0, // Initialize with a count of 0 items
		total: 0, // Initialize with a total price of 0
	});

	// Constructor for the CartService
	constructor() {}

	// Method to add an item to the cart
	addItem(item: CartItem) {
		// Check if the item already exists in the cart
		const itemObj = this.cart().items.find((t) => t.id === item.id);
		if (itemObj) {
			// If the item exists, increase its quantity
			this.increaseItem(itemObj);
		} else {
			// If the item doesn't exist, add it to the cart
			this.cart.update((prevCart) => ({
				// Create a new cart object with updated state
				...prevCart,
				items: [...prevCart.items, item], // Add the new item to the items array
				count: prevCart.count + 1, // Increment the total count of items
				total: prevCart.total + item.price, // Update the total price
			}));
		}
	}

	// Method to increase the quantity of an existing item in the cart
	increaseItem(item: CartItem) {
		this.cart.update((prevCart) => {
			// Create a new cart object based on the previous cart
			const newCart = {
				...prevCart,
				items: [...prevCart.items], // Copy the items array
			};

			// Find the item in the new cart's items array
			const itemObj = newCart.items.find((t) => t.id === item.id);

			// Increase the quantity of the item
			itemObj!.quantity = itemObj!.quantity + 1;

			// Increase the total count of items in the cart
			newCart.count++;

			// Update the total price of the cart
			newCart.total += itemObj!.price;

			// Return the new cart object
			return newCart;
		});
	}

	// Method to decrease the quantity of an existing item in the cart
	decreaseItem(item: CartItem) {
		this.cart.update((prevCart) => {
			// Create a new cart object based on the previous cart
			const newCart = {
				...prevCart,
				items: [...prevCart.items], // Copy the items array
			};

			// Find the item in the new cart's items array
			const itemObj = newCart.items.find((t) => t.id === item.id);

			// Decrease the quantity of the item
			itemObj!.quantity = itemObj!.quantity - 1;

			// Decrease the total count of items in the cart
			newCart.count--;

			// Update the total price of the cart
			newCart.total -= itemObj!.price;

			// Return the new cart object
			return newCart;
		});
	}

	// Method to remove an item from the cart
	removeItem(item: CartItem) {
		this.cart.update((prevCart) => {
			// Create a new cart object with the item removed
			const newCart = {
				...prevCart,
				items: [...prevCart.items.filter((t) => t.id !== item.id)], // Filter out the item to be removed
			};

			// Find the item in the new cart's items array
			const itemObj = newCart.items.find((t) => t.id === item.id);

			// Decrease the total count of items in the cart by the item's quantity
			newCart.count -= itemObj!.quantity;

			// Update the total price of the cart
			newCart.total -= itemObj!.price * itemObj!.quantity;

			// Return the new cart object
			return newCart;
		});
	}
}

// Interface for a cart item
export interface CartItem {
	id: string; // Unique identifier for the item
	name: string; // Name of the item
	imageUrl: string; // URL of the item's image
	price: number; // Price of the item
	quantity: number; // Quantity of the item in the cart
}

// Interface for the cart
export interface Cart {
	items: CartItem[]; // Array of cart items
	count: number; // Total number of items in the cart
	total: number; // Total price of all items in the cart
}
