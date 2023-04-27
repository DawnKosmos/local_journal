import { Component, inject } from '@angular/core';
import { RequestService } from '../service/request.service';
import { IS_DEBUG } from '../constant';

@Component({
  selector: 'app-food-new',
  templateUrl: './food-new.component.html',
  styleUrls: ['./food-new.component.scss']
})
export class FoodNewComponent {
 public MealTitle : string = 'Your Meal Title';
 time = new Date().toISOString().substring(0, 16);
 foods : Food[] = [];

 yourFoods : FoodDetailed[] = [];


  req = inject(RequestService)

  ngOnInit(){
    this.getFoods()
  }


  getFoods() : void{
    this.req.get<Food[]>('/food').subscribe({
      next: (v : Food[]) => this.foods = v,
      error: (err : any) => console.log(err),
      complete: () => IS_DEBUG ? console.log("auth finished") : null
    }
  )
  }


  addFood(id : number) : void { 
    this.req.get<FoodDetailed>('/food/'+id).subscribe({
      next: (v : FoodDetailed) => {this.yourFoods.push(v); this.sumFood()},
      error: (err : any) => console.log(err)
    })

  }


  

  sendMeal() : void{
    let am : FoodAmount[] = []
    this.yourFoods.forEach(e => {
      am.push({amount: e.default_amount, food_id: e.food_id })
    });
    let mq : MealReq = {
      carb : this.sum.carb,
      amount : this.sum.amount,
      fat : this.sum.fat,
      protein : this.sum.protein,
      kcal :  this.sum.kcal,
      foods : am,
      name : this.MealTitle,
      unix : this.time
    }
  
    this.req.postJson<MealResponse>('/meal/new', mq).subscribe(
      (data : MealResponse)=>{
        
      },
      (err) => console.log(err.error.error)
    )
    };

  // Table

  deleteFood(id : number){
    this.yourFoods= this.yourFoods.filter(e => e.food_id != id)
    this.sumFood()

  }

  calcCarb(f : FoodDetailed) : number{
    return f.default_amount  ? Math.round(f.default_amount*f.carb/100) : 0
 }
 calcKcal(f : FoodDetailed) : number{
   return f.default_amount  ? Math.round(f.default_amount*f.kcal/100) : 0
 }
 calcFat(f : FoodDetailed) : number{
   return f.default_amount  ? Math.round(f.default_amount*f.fat/100) : 0
 }
 calcProtein(f : FoodDetailed) : number{
   return f.default_amount ? Math.round(f.default_amount*f.protein/100) : 0
 }

 sum : any = {
  kcal : 0,
  carb : 0,
  fat : 0,
  protein : 0
}

 sumFood(){
  this.sum  = {
    kcal : 0,
    carb : 0,
    fat : 0,
    protein : 0,
    amount : 0
  }
  this.yourFoods.forEach(f => {      
    this.sum.kcal += f.kcal*f.default_amount/100;
    this.sum.carb += f.carb*f.default_amount/100;
    this.sum.fat += f.fat*f.default_amount/100;
    this.sum.protein += f.protein*f.default_amount/100;
    this.sum.amount += f.default_amount;
  });

  this.sum.kcal = Math.round(this.sum.kcal)
  this.sum.carb = Math.round(this.sum.carb)
  this.sum.fat = Math.round(this.sum.fat)
  this.sum.protein = Math.round(this.sum.protein)
  this.sum.amount = Math.round(this.sum.amount)
  return this.sum
}


  //AutoComplete
  keyword = 'name';


  selectEvent(e : any) : void{
    this.addFood(e.food_id)
  }

  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e : any) :void {
    // do something
  }

  //Add New Grocery
  f : FoodDetailed = {food_id: 0, default_amount:100, name : '', kcal : 0, carb:0, fat : 0, protein : 0}

  sendFood() : void {
    this.req.postJson<Food>("/food/new", this.f).subscribe({
      next: (data : Food) => {
        console.log(data)
        this.foods.push(data)
      },
      error : (err : any) => console.log(err)
    }
    )
    this.f = {food_id: 0, default_amount:100, name : '', kcal : 0, carb:0, fat : 0, protein : 0}
  }
}


export interface sumMeal {
  kcal : any;
  carb : any;
  fat : any;
  protein : any;
  amount : any;
}


export interface FoodDetailed{
  food_id : number;
  default_amount :number;
  name : string;
  kcal : number;
  carb : number;
  fat: number;
  protein: number;  
}

export interface Food{
  food_id : number;
  name : string;
}


export interface MealReq{
  name : string;
  kcal : number;
  carb : number;
  amount: number;
  fat: number;
  protein: number;
  unix : string;
  foods : FoodAmount[]
}

export interface FoodAmount{
  food_id : number;
  amount : number;
}

export interface MealResponse{
  id : number;
}