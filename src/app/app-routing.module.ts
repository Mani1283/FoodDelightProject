import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { AddrestaurantComponent } from './addrestaurant/addrestaurant.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'restaurant',
    pathMatch : 'full'

},
{
  path: 'restaurant',
  component : RestaurantsComponent
},
{
  path : 'addRestaurant',
  component: AddrestaurantComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
