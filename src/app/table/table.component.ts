import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HeroServiceService } from '../service/hero-service.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {


  displayedColumns: any = [ 'id', 'name', 'superPowers']
  dataSource:any



  constructor(private service : HeroServiceService, private route : Router){}


  ngOnInit(){
    this.service.getAll().subscribe(data =>this.dataSource = data)
  }


   goToDetail(element: any){
    this.route.navigate([`hero/${element.id}`])
  }




  }








