import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class HeroServiceService {

  constructor(private http: HttpClient) { }

  createOne(hero: any){
    return this.http.post('http://localhost:3000/hero', hero)
  }

  getById(id: number): Observable<any>{
    return this.http.get(`http://localhost:3000/hero/${id}`)
  }


  /* getAll(){
    return of (this.heroes)
  } */
  /* getById(id : number) : Observable<hero>{
    return of(this.heroes.find(value => value.id === id)!)
  } */
  getAll(){
    return this.http.get(`http://localhost:3000/hero`)
  }

  removeById(id : number): Observable<any>{
    return this.http.delete(`http://localhost:3000/hero/${id}`)
  }


}




