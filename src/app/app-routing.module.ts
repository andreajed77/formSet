import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { NewHeroComponent } from './new-hero/new-hero.component';
import { TableComponent } from './table/table.component';
import { ResolveService } from './resolve.service';
import { FightComponent } from './fight/fight.component';
import { SuperpowerComponent } from './superpower/superpower.component';


const routes: Routes = [
  {path: 'table', component:TableComponent},
  {path: 'newhero', component:NewHeroComponent},
  {path: 'hero/:id', component:DetailsComponent, resolve : {hero : ResolveService}},
  {path: 'fight', component:FightComponent},
  {path: 'superpower/:id', component:SuperpowerComponent, resolve : {hero : ResolveService}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
