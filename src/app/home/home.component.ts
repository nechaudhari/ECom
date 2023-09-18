import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { SharedDataService } from '../services/shared-data.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  data: any[] = []; 
  count:number=0;
  incrementCount:number = 0;
  decrementCount:number = 0;
  itemCount: number=0;
  

  constructor(private productService:ProductsService, private router:Router, private cartService:CartService, private sharedDataService:SharedDataService){}

  ngOnInit(): void {
    this.productService.getData().subscribe(data => {
      this.data = data;
      //added stored value of count
      this.data.forEach((item,index) =>{
        item.itemCount = this.productService.getItemCountFromLocalStorage(item.id);
        this.sharedDataService.updateItemCount(index,item.itemCount);
      });
    });
  }

  redirectToDescription(index:number) {
    this.router.navigate([`/description/${index}`]);
  }

  increment(index:any){
    index.itemCount = index.itemCount + 1;
    index.addedItem = true;

    //added stored value of count***************
    this.productService.increment(index.itemCount);

    //update local storage
    this.productService.setItemCountInLocalStorage(index.id, index.itemCount);
    this.sharedDataService.updateItemCount(index.id - 1,index.itemCount);
    //update cart count
    if (index.addedItem) {
      this.cartService.addItemToCart(index);
    }
  }

  decrement(index:any){ 
    if (index.itemCount > 0) {
      index.itemCount--;
      if (index.itemCount === 0) {
        index.itemCount = index.itemCount --;
        index.addedItem = false;
      }
      else{
        index.addedItem = true;
      }
    }
    //update stored value of count
    this.productService.setItemCountInLocalStorage(index.id, index.itemCount);
    //update service
    this.sharedDataService.updateItemCount(index.id - 1,index.itemCount);
    //update cart count
    if (!index.addedItem) {
      this.cartService.removeItemFromCart(index);
    }
  }

}
