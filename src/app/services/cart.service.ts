import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemSubject = new BehaviorSubject<any[]>([]);
  cartItems$ = this.cartItemSubject.asObservable();

  constructor() {
    const savedCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    this.cartItemSubject.next(savedCartItems);
  }

  private updateLocalStorage(cartItems: any[]) {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }

  addItemToCart(item: any) {
    const currentCartItems = this.cartItemSubject.value;
    const itemIndex = currentCartItems.findIndex(cartItem => cartItem.id === item.id);

    if (itemIndex === -1) {
      const updatedCartItems = [...currentCartItems, { ...item, addedItem: true }];
      this.cartItemSubject.next(updatedCartItems);
      this.updateLocalStorage(updatedCartItems);
    } else {
      currentCartItems[itemIndex].itemCount = item.itemCount; 
      this.cartItemSubject.next(currentCartItems);//updatedCartItems
      this.updateLocalStorage(currentCartItems);//updatedCartItems
    }
  }

  removeItemFromCart(item: any) {
    const currentCartItems = this.cartItemSubject.value;
    const updatedCartItems = currentCartItems.filter(cartItem => cartItem.id !== item.id);
    this.cartItemSubject.next(updatedCartItems);
    this.updateLocalStorage(updatedCartItems); 
  }

  getItemCount(): Observable<number> {
    return this.cartItemSubject.asObservable().pipe(
      map(items => items.reduce((total, item) => total + item.itemCount, 0))
    );
  }
}
