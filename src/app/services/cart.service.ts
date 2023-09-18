import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemSubject = new BehaviorSubject<any[]>([]);
  cartItem$ = this.cartItemSubject.asObservable();

  constructor(){}

  // addItemToCart(item:any){
  //   const currentCartItems = this.cartItemSubject.value;
  //   const updatedCartItems = [...currentCartItems,item];
  //   this.cartItemSubject.next(updatedCartItems);
  // }
  addItemToCart(item: any) {
    const currentCartItems = this.cartItemSubject.value;
    const itemIndex = currentCartItems.findIndex((cartItem: { id: any; }) => cartItem.id === item.id);

    if (itemIndex === -1) {
      // If the item is not in the cart, add it
      const updatedCartItems = [...currentCartItems, { ...item, addedItem: true }];
      this.cartItemSubject.next(updatedCartItems);
    } else {
      // If the item is already in the cart, update its count
      currentCartItems[itemIndex].itemCount++;
      this.cartItemSubject.next(currentCartItems);
    }
  }


  removeItemFromCart(item:any){
    const currentCartItems = this.cartItemSubject.value;
    const updatedCartItems = currentCartItems.filter(cartItem =>cartItem.id !== item.id);
    this.cartItemSubject.next(updatedCartItems);
  }

  getItemCount(): Observable<number> {
    return this.cartItemSubject.asObservable().pipe(
      map(items => items.reduce((total, item) => total + item.itemCount, 0))
    );
  } 

  


}
