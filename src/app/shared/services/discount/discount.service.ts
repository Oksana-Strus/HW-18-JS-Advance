import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IDiscount } from '../../models/discount/discount.model';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  private resourceUrl = environment.BACKEND_URL;
  private api = {
    discounts: `${this.resourceUrl}discounts`
  }

  private arrDiscount: Array<IDiscount> = [
    {
      id: 1,
      title: 'title',
      text: 'text',
      image: 'https://pizzaletta.com/storage/2019/10/gallery_3.jpg',
      author: 'kik',
      date: new Date()
    }
  ];

  constructor(private http: HttpClient) {
  }

  getDiscounts(): Array<IDiscount> {
    return this.arrDiscount;
  }

  addDiscount(discount: IDiscount): void {
    discount.date = new Date();
    this.arrDiscount.push(discount);
  }

  deleteDiscount(id: number): void {
    const index = this.arrDiscount.findIndex(disc => disc.id === id);
    this.arrDiscount.splice(index, 1)
  }

  updateDiscount(discount: IDiscount): void {
    discount.date = new Date();
    const index = this.arrDiscount.findIndex(disc => disc.id === discount.id);
    this.arrDiscount.splice(index, 1, discount)
  }

  // ------------request-------------------

  getJSONDiscounts(): Observable<any> {
    return this.http.get<any>(this.api.discounts);
  }

  createJSONDiscount(discount: IDiscount): Observable<any> {
    return this.http.post<any>(this.api.discounts, discount);
  }

  deleteJSONDiscount(id: number): Observable<any> {
    return this.http.delete<any>(`${this.api.discounts}/${id}`);
  }

  updateJSONDiscount(discount: IDiscount, id: number): Observable<any> {
    return this.http.patch<any>(`${this.api.discounts}/${id}`, discount);
  }
}
