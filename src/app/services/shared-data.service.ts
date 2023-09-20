import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private itemCountsSubject = new BehaviorSubject<number[]>([]);
  itemCounts$ = this.itemCountsSubject.asObservable();

  constructor(){
    this.itemCountsSubject.next([]);
  }

  updateItemCount(index:number,count:number){
    const currentCounts = this.itemCountsSubject.value;
    currentCounts[index] = count;
    this.itemCountsSubject.next([...currentCounts]);
  }

  getItemCount(index:number):number{
    const currentCounts = this.itemCountsSubject.value;
    return currentCounts[index] || 0;
  }
}
