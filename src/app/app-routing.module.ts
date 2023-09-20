import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { DescriptionComponent } from './description/description.component';

const routes: Routes = [
  { path:'', component:HomeComponent },
  { path: 'home', component:HomeComponent},
  { path: 'description/:index', component:DescriptionComponent},
  { path: 'seller-auth', component: SellerAuthComponent},
  { path: 'seller-home', component: SellerHomeComponent},
  { path: '**', component: NotFoundComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
