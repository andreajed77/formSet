import { Component, OnInit } from '@angular/core';
import { CheckboxRequiredValidator, FormBuilder, FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HeroServiceService } from '../service/hero-service.service';

@Component({
  selector: 'app-new-hero',
  templateUrl: './new-hero.component.html',
  styleUrls: ['./new-hero.component.scss']
})
export class NewHeroComponent implements OnInit{

  form : FormGroup

  constructor(private fb : FormBuilder, private service : HeroServiceService, private route : ActivatedRoute)
  { this.form = this.fb.group({

    id :  null,
    name : null,
    strenght : null

  })

}
  ngOnInit(): void {
    this.route.data.subscribe(({hero})=>{
      console.log(hero);

      this.form.get('id')?.setValue(hero?.id)
      this.form.get('name')?.setValue(hero?.name)
      this.form.get('strenght')?.setValue(hero?.strenght)
    })
  }

  savedata(){

    this.service.createOne(this.form.getRawValue()).subscribe()

  }


}
