import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { __values } from 'tslib';
import { hero } from '../models/hero';
import { HeroServiceService } from '../service/hero-service.service';

@Component({
  selector: 'app-fight',
  templateUrl: './fight.component.html',
  styleUrls: ['./fight.component.scss']
})
export class FightComponent implements OnInit{

  form : FormGroup
  arrayEsclusi : any[] = []
  result : any
  heroes : any = this.fightService.getAll().subscribe(data=> this.heroes === data)


  constructor(private fightService : HeroServiceService, public route : ActivatedRoute, public fb : FormBuilder){
    this.form = this.fb.group({

      listHeroes : null,
      listHeroes2 : null

    })

  }

  heroes1 = this.heroes
  heroes2 = this.heroes

  ngOnInit(): void {

    this.form.get('listHeroes')?.valueChanges.subscribe((selezione:any) => {
      console.log("LISTA1 -->", selezione)

      this.heroes2 = this.heroes.filter((hero: { id: any; }) => hero.id !== selezione.id)

      /*

        this.heroes = this.heroesBackUp
        this.arrayEsclusi= []
        var index = this.arrayEsclusi.indexOf(selezione.id);
        index !== -1 ? this.arrayEsclusi.splice(index, 1): undefined;
        console.log("ARRAY ESCLUSI --> ", this.arrayEsclusi);

        this.arrayEsclusi.push(selezione,selezione.id);

        this.heroes = this.heroes.filter(h => !this.arrayEsclusi.includes(h.id));
        console.log(this.heroes) */

    })

    this.form.get('listHeroes2')?.valueChanges.subscribe((selezione:any) => {
      console.log("LISTA2 -->", selezione)

      this.heroes1 = this.heroes.filter((hero: { id: any; }) => hero.id !== selezione.id)
    })

  }

  fight() : void{

    let first= this.form.get('listHeroes')?.value
    console.log( first.strenght );

    let second = this.form.get('listHeroes2')?.value
    console.log( second.strenght );

    this.result = first.strenght > second.strenght? first.name : second.name

  }

  compareFn(o1: any, o2: any): boolean{
      return o1 && o2 ? o1.id === o2.id : o1 === o2
  }
}



