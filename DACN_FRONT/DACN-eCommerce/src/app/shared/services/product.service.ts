import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { isNullOrUndefined } from 'util';
import { Product } from '../models/product';
import { AuthService } from './auth.service';
import { OrderCommand } from './command/order-command';
import { ProductCommand } from './command/product-command';
import { ToastrService } from './toastr.service';
@Injectable()
export class ProductService {
	products: AngularFireList<Product>;
	product: AngularFireObject<Product>;

	// favouriteProducts
	favouriteProducts: AngularFireList<FavouriteProduct>;
	cartProducts: AngularFireList<FavouriteProduct>;

	// NavbarCounts
	navbarCartCount = 0;
	navbarFavProdCount = 0;

	constructor(
		private db: AngularFireDatabase,
		private authService: AuthService,
		private toastrService: ToastrService,
    private productCommand: ProductCommand,
    private orderCommand: OrderCommand
	) {
		this.calculateLocalFavProdCounts();
    // this.calculateLocalCartProdCounts();
    this.calculateCartProdCounts();
	}

	getProducts() {
		this.products = this.db.list('products');
		return this.products;
	}

	getAllProducts() {
		return this.productCommand.getProducts();
	}
	getProductByCategory(categoryId: any) {
		if (isNullOrUndefined(categoryId))
			return this.productCommand.getProducts();
		else
			return this.productCommand.getProductsByCategory(categoryId);
	}
	createProduct(data: any) {
		return this.productCommand.createProduct(data);
	}

	getProductById(key: string) {
		this.product = this.db.object('products/' + key);
		return this.product;
	}

	getProductDetail(key: string) {
		return this.productCommand.getDetail(key);
	}

  updateProduct(data: any) {
    return this.productCommand.updateProduct(data);
  }

	deleteProduct(key: string) {
		return this.productCommand.deleteId(key);
	}

	deleteProductById(key: string) {
		return this.productCommand.deleteId(key);
	}

	/*
   ----------  Favourite Product Function  ----------
  */

	// Get Favourite Product based on userId
	getUsersFavouriteProduct() {
		const user = this.authService.getLoggedInUser();
		this.favouriteProducts = this.db.list('favouriteProducts', (ref) =>
			ref.orderByChild('userId').equalTo(user.id)
		);
		return this.favouriteProducts;
	}

	// Adding New product to favourite if logged else to localStorage
	addFavouriteProduct(data: Product): void {
		let a: Product[];
		a = JSON.parse(localStorage.getItem('avf_item')) || [];
		a.push(data);
		this.toastrService.wait('Adding Product', 'Adding Product as Favourite');
		setTimeout(() => {
			localStorage.setItem('avf_item', JSON.stringify(a));
			this.calculateLocalFavProdCounts();
		}, 300);
	}

	// Fetching unsigned users favourite proucts
	getLocalFavouriteProducts(): Product[] {
		const products: Product[] = JSON.parse(localStorage.getItem('avf_item')) || [];

		return products;
	}

	// Removing Favourite Product from Database
	removeFavourite(key: string) {
		this.favouriteProducts.remove(key);
	}

	// Removing Favourite Product from localStorage
	removeLocalFavourite(product: Product) {
		const products: Product[] = JSON.parse(localStorage.getItem('avf_item'));

		for (let i = 0; i < products.length; i++) {
			if (products[i].id === product.id) {
				products.splice(i, 1);
				break;
			}
		}
		this.toastrService.wait('Removing Product', 'Removing Product as Favourite');
		// ReAdding the products after remove
		localStorage.setItem('avf_item', JSON.stringify(products));

		this.calculateLocalFavProdCounts();
	}

	// Returning Local Products Count
	calculateLocalFavProdCounts() {
		this.navbarFavProdCount = this.getLocalFavouriteProducts().length;
	}

	/*
   ----------  Cart Product Function  ----------
  */

	// Adding new Product to cart db if logged in else localStorage
	addToCart(data: Product): void {
		let a: Product[];

		a = JSON.parse(localStorage.getItem('avct_item')) || [];
    console.log("addTocart",a);
		a.push(data);
		this.toastrService.wait('Adding Product to Cart', 'Product Adding to the cart');
		setTimeout(() => {
			localStorage.setItem('avct_item', JSON.stringify(a));
			this.calculateLocalCartProdCounts();
		}, 500);
  }

  createOrderItem(data: any){
    this.calculateCartProdCounts();
    return this.orderCommand.createOrderItem(data);
  }

	// Removing cart from local
	removeLocalCartProduct(product: Product) {
		const products: Product[] = JSON.parse(localStorage.getItem('avct_item'));

		for (let i = 0; i < products.length; i++) {
			if (products[i].id === product.id) {
				products.splice(i, 1);
				break;
			}
		}
		// ReAdding the products after remove
		localStorage.setItem('avct_item', JSON.stringify(products));

		this.calculateLocalCartProdCounts();
  }

  removeOrderItem(id: any){
    this.toastrService.wait('Delete product', 'Product remove');
    return this.orderCommand.deleteOrderItem(id);
  }

	// Fetching Locat CartsProducts
	getLocalCartProducts(): Product[] {
		const products: Product[] = JSON.parse(localStorage.getItem('avct_item')) || [];

		return products;
  }

  getOrderItem(){
    return this.orderCommand.getOrderItem();
  }

	// returning LocalCarts Product Count
	calculateLocalCartProdCounts() {
		this.navbarCartCount = this.getLocalCartProducts().length;
  }

  calculateCartProdCounts() {
		this.getOrderItem().subscribe(data => {
      if(data.length == 0){
        this.navbarCartCount = 0;
      }
      else {
        this.navbarCartCount = 0;
        for(let item of data){
          if(item.inCart == true)
            this.navbarCartCount += item.quantity;
        }
      }
    })
  }

  updateOrderItem(data: any){
    return this.orderCommand.updateOrderItem(data);
  }

  //Rating
  createComment(data: any) {
    return this.productCommand.createComment(data);
	}

  getAllComments() {
    return this.productCommand.getComment();
	}

  deleteComment(id: any) {
    return this.productCommand.deleteComment(id);
  }

  searchProduct(data :any){
    return this.productCommand.searchProduct(data);
  }

  updateProductImage(data : any){
    return this.productCommand.updateImgProduct(data);
  }

}

export class FavouriteProduct {
	product: Product;
	id: string;
	userId: string;
}
