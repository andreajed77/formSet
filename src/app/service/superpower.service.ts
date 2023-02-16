import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SuperPowerService {
  constructor(private http: HttpClient) { }

  createSuperPower(superPower: any){
    return this.http.post('http://localhost:3000/sp', superPower)
  }
  getById(id: number): Observable<any>{
    return this.http.get(`http://localhost:3000/sp/${id}`)
  }
  removeById(id : number): Observable<any>{
    return this.http.delete(`http://localhost:3000/sp/${id}`)
  }

}
