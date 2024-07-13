import { Component } from '@angular/core';
import { Restaurant } from '../restaurants/restaurants.model';
import { AppService } from '../app.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addrestaurant',
  templateUrl: './addrestaurant.component.html',
  styleUrl: './addrestaurant.component.scss'
})
export class AddrestaurantComponent {
  restaurants: Restaurant[] = [];
  restaurantForm: FormGroup;
  isEditing: boolean = false;
  editId: any;

  constructor(private restaurantService: AppService, private fb: FormBuilder,private route:Router) {
    this.restaurantForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      description: [''],
      location: ['']
    });
  }  

  ngOnInit(): void {
    this.restaurantService.editId.subscribe(id => {
      this.editId = id;
      if(this.editId){
        this.restaurantService.getRestaurantById(this.editId).subscribe((res:Restaurant)=>{
          this.restaurantForm.patchValue(res);
        })
      }
      console.log('Received edit ID:', this.editId);
    });
  }
  save(){
    this.restaurantService.addRestaurant(this.restaurantForm.value).subscribe(()=>{
      console.log("restaurant saved")
      this.restaurantForm.reset();
      this.route.navigate(['restaurant']);
    })
  }
  cancel(){
    this.route.navigate(['restaurant']);
  }
}
