import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  itemCount = 0;

  constructor() { }

  getCount(){
    return this.itemCount;
  }

  setCount(){
    return this.itemCount;
  }

  increment(){
    this.itemCount ++;
  }

  decrement(){
    this.itemCount --;
  }
}
