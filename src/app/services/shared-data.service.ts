import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private itemCountsSubject = new BehaviorSubject<number[]>([]);
  itemCounts$ = this.itemCountsSubject.asObservable();

  constructor(){
    //initialise empty array of count
    this.itemCountsSubject.next([]);
  }

  //to update count
  updateItemCount(index:number,count:number){
    //this.itemCountsSubject.next(count);
    //new code
    const currentCounts = this.itemCountsSubject.value;
    currentCounts[index] = count;
    this.itemCountsSubject.next([...currentCounts]);
  }

  //new method
  getItemCount(index:number):number{
    const currentCounts = this.itemCountsSubject.value;
    return currentCounts[index] || 0;
  }
}
