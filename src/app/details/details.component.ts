import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroServiceService } from '../service/hero-service.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})

export class DetailsComponent implements OnInit{

  heroName : any
  dataSource: any[]=[]
  displayedColumns: string[] = ['id','superPowers'];

  constructor(private heroservice : HeroServiceService, public route : ActivatedRoute,
    private router : Router){

    }

    ngOnInit(){
    let ids : any = this.route.snapshot.params['id']
    console.log(ids);

    this.heroservice.getById(ids).subscribe(data => {
      this.dataSource = data.superPowers;
      console.log(this.dataSource);
    })

    let name :any = this.route.snapshot.params['id']
    console.log(name);
    this.heroservice.getById(ids).subscribe(data => {
      this.heroName = data.name;
      console.log(this.heroName);
    })
  }

  // goToDetail(element: any){
  //   this.router.navigate([`hero/${element.superpower}`])
  // }

  goToDetail(element : any){
    this.router.navigate([`superpower/${element.id}`])
  }
}
