import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FooddashboardComponent } from './foodblog/fooddashboard/fooddashboard.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FoodNewComponent } from './food-new/food-new.component';
import { MealSingleComponent } from './meal/meal-single/meal-single.component';

const routes: Routes = [
  {path: '', component:DashboardComponent},
  {path:'food', component:FooddashboardComponent},
  {path:'food/new', component:FoodNewComponent},
  {path: 'meal/:id', component:MealSingleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
