import { Component } from '@angular/core';
import { RequestService } from 'src/app/service/request.service';




@Component({
  selector: 'app-fooddashboard',
  templateUrl: './fooddashboard.component.html',
  styleUrls: ['./fooddashboard.component.scss']
})
export class FooddashboardComponent {
  
  latestMeals : Meal[] = [] 
  lastDays : DayMeals[] = []


  constructor(private req : RequestService) {}

  getDashboard() : void{
    this.req.get<Dashboard>("/meal").subscribe({
      next: (data : Dashboard) => {
        this.latestMeals = data.latest_meals;
        console.log(this.latestMeals[0])
        this.lastDays = data.latest_days;
      },
      error : (err : any) => console.log(err)
    })
  }

  ngOnInit(){
    this.getDashboard()
  }

}


export interface Dashboard{
  latest_meals : Meal[]
  latest_days : DayMeals[]
}


export interface Meal{
  meal_id : number,
  name : string,
  unix : any,
  kcal : number,
  carb : number,
  fat : number,
  protein : number
};


export interface Day{
  days : number
  months : number
  microseconds : number
};

export interface DayMeals{
  day : Day
  total_kcal : number
  total_fat : number
  total_protein : number
  total_amount : number
  total_carb : number 
};
