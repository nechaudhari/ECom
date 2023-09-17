import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { SharedDataService } from '../services/shared-data.service';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css'],
})
export class DescriptionComponent implements OnInit {
  counterValue: number | undefined;
  data: any[] = [];
  index: number = 0;

  constructor(
    private productService: ProductsService,private route: ActivatedRoute, private sharedDataService:SharedDataService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const index = params['index'];
      this.index = index;
    });
    this.productService.getData().subscribe(data => {
      this.data = data;
    });

    //to get data from localstorage
    //this.counterValue = this.productService.getItemCountFromLocalStorage(this.index + 1);
    this.counterValue = this.sharedDataService.getItemCount(this.index);
    //get value throough service
    this.sharedDataService.itemCounts$.subscribe(counts =>{
      this.counterValue = counts[this.index];
    });
  }
}
