import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SuperPowerService } from '../service/superpower.service';

@Component({
  selector: 'app-superpower',
  templateUrl: './superpower.component.html',
  styleUrls: ['./superpower.component.scss']
})
export class SuperpowerComponent {

  form : FormGroup
  dataSource: any

  constructor(private superPowerService : SuperPowerService, public route : ActivatedRoute,
  private router : Router, private fb : FormBuilder ){
    this.form = fb.group({

      id :  null,
      name : null,
      strenght : null

    })

  }
  ngOnInit(): void {

   let power :any = this.route.snapshot.params['id']
   console.log(power);

   this.superPowerService.getById(power).subscribe(data => {
    this.dataSource = data;
    console.log(this.dataSource);

    this.form.get('id')?.setValue(this.dataSource?.id)
    this.form.get('name')?.setValue(this.dataSource?.name)
    this.form.get('strenght')?.setValue(this.dataSource?.strenght)
  })
}

  clear(){
    this.form.reset()
  }
}




