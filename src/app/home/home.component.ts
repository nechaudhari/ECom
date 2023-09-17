import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';


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
  

  constructor(private productService:ProductsService, private router:Router, private cartService:CartService){}

  ngOnInit(): void {
    this.productService.getData().subscribe(data => {
      this.data = data;
    });
    this.itemCount = this.cartService.getCount();
  }

  redirectToDescription(index:number) {
    this.router.navigate([`/description/${index}`]);
  }

  increment(index:any){
    index.itemCount = index.itemCount + 1;
    index.addedItem = true;

    this.productService.increment(index.itemCount);
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
  }

}
