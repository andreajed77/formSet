import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { hero } from './models/hero';
import { HeroServiceService } from './service/hero-service.service';

@Injectable({
  providedIn: 'root'
})
export class ResolveService implements Resolve<hero> {

  constructor(private service : HeroServiceService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): hero | Observable<hero> | Promise<hero> {
    return this.service.getById(parseInt(route.paramMap.get('id')!));
  }


}

