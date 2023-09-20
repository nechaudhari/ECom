import { Component } from '@angular/core';
import { SellerHomeService } from '../services/seller-home.service';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent {
  sellers: any[] = [];

  constructor(private sellerHomeService: SellerHomeService) {}

  ngOnInit() {
    this.sellerHomeService.getSellers().subscribe(sellers => {
      this.sellers = sellers;
    });
  }
}
