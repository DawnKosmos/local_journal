import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from 'src/app/service/request.service';


@Component({
  selector: 'app-meal-single',
  templateUrl: './meal-single.component.html',
  styleUrls: ['./meal-single.component.scss']
})
export class MealSingleComponent {
  constructor(private route : ActivatedRoute, private req : RequestService){

  }
  mealId : string | null = ''; 
  ngOnInit(){
    this.mealId = this.route.snapshot.paramMap.get('id');
    this.mealId ? this.getMeal(this.mealId) : null
  }

  mealInfo? : Meal

  getMeal(id : string){
    this.req.get<Meal>("/meal/"+id).subscribe({
      next: (data : Meal) => {
        console.log(data)
        this.mealInfo = data;
        this.mealInfo.foods.map(f => {
          f.carb =   Math.round(f.amount*f.carb/100)
          f.kcal =   Math.round(f.amount*f.kcal/100)
          f.protein =   Math.round(f.amount*f.protein/100)
          f.fat =   Math.round(f.amount*f.fat/100)
        })
      },
      error : (err : any) => console.log(err)
    })
  }
}


export interface Meal {
  name : string 
  time : any
  amount : number;
  kcal : number;
  carb : number;
  fat: number;
  protein: number;  
  foods : Food[];
}


export interface Food{
  name : string;
  kcal : number;
  carb : number;
  fat: number;
  protein: number;  
  amount: number;
}
/*
type GetMealResponse struct {
	Name    string                    `json:"name"`
	Time    time.Time                 `json:"time"`
	Amount  float64                   `json:"amount"`
	Kcal    float64                   `json:"kcal"`
	Protein float64                   `json:"protein"`
	Fat     float64                   `json:"fat"`
	Foods   []qq.ReadFoodsFromMealRow `json:"foods"`


  type ReadFoodsFromMealRow struct {
	FoodID  int32   `json:"food_id"`
	Name    string  `json:"name"`
	Kcal    float64 `json:"kcal"`
	Carb    float64 `json:"carb"`
	Fat     float64 `json:"fat"`
	Protein float64 `json:"protein"`
	Amount  int32   `json:"amount"`
}
}
*/