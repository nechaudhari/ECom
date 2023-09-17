import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private itemCountsSubject = new BehaviorSubject<number>(0);
  itemCounts$ = this.itemCountsSubject.asObservable();

  updateItemCount(count:number, id:number){
    this.itemCountsSubject.next(count);
   
  }
}
