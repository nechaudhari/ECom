import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private dataUrl = 'http://localhost:3000/items';

  private counterSubject = new BehaviorSubject<number>(0);
  counter$ = this.counterSubject.asObservable();

  constructor(private http: HttpClient) { }

  getData(): Observable<any[]> {
    return this.http.get<any[]>(this.dataUrl);
  }

  increment(count:number){
    this.counterSubject.next(this.counterSubject.value + count);
  }

  decrement(count:number){
    this.counterSubject.next(this.counterSubject.value - count);
  }

  //added
  getItemCountFromLocalStorage(itemId:number): number{
    const count = localStorage.getItem(`itemCount_${itemId}`);
    return count ? parseInt(count,10):0;
  }

  //added
  setItemCountInLocalStorage(itemId:number, count:number){
    localStorage.setItem(`itemCount_${itemId}`, count.toString());
  }

  
}
