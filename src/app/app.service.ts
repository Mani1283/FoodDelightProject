import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Restaurant } from './restaurants/restaurants.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private editIdSubject = new BehaviorSubject<number | null>(null);
  editId = this.editIdSubject.asObservable();

  private apiUrl = 'http://localhost:8123/api/restaurant';

  constructor(private http: HttpClient) { }

  getRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(this.apiUrl);
  }
  setEditId(id: number) {
    this.editIdSubject.next(id);
  }
  getRestaurantById(id: number): Observable<Restaurant> {
    return this.http.get<Restaurant>(`${this.apiUrl}/${id}`);
  }

  addRestaurant(restaurant: Restaurant): Observable<Restaurant> {
    return this.http.post<Restaurant>(`${this.apiUrl}`, restaurant);
  }

  deleteRestaurant(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
