import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  cartItemCount$: Observable<number> | undefined;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartItemCount$ = this.cartService.getItemCount(); // Initialize cart count
  }


}
