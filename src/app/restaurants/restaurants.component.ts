import { Component } from '@angular/core';
import { Restaurant } from './restaurants.model';
import { AppService } from '../app.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrl: './restaurants.component.scss'
})
export class RestaurantsComponent {

  restaurants: Restaurant[] = [];
  showDialog: boolean = false;

  constructor(private restaurantService: AppService, private fb: FormBuilder,private route:Router) {
  }
  

  ngOnInit(): void {
    this.fetchRestaurants();
  }

  fetchRestaurants(): void {
    this.restaurantService.getRestaurants().subscribe(
      (restaurants) => {
        this.restaurants = restaurants;
      },
      (error) => {
        console.error('Error fetching restaurants:', error);
      }
    );
  }

  editRestaurant(restaurantId: number): void {
    this.restaurantService.setEditId(restaurantId);
    this.route.navigate(['addRestaurant']);

  }

  deleteRestaurant(restaurantId: number): void {
    this.restaurantService.deleteRestaurant(restaurantId).subscribe(()=>{
      this.fetchRestaurants()
      console.log("Restaurant Deleted")
    })
  }
  addPage(){
    this.route.navigate(['addRestaurant']);
  }

}
