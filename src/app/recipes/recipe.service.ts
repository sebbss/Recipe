import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shoppingList.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {
  constructor(private slService: ShoppingListService){

  }

  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('Title',
               'this is a description',
               'https://i.pinimg.com/originals/f8/d8/62/f8d862135c18ee203740c9c693b67716.jpg',
               [
                 new Ingredient('bread', 2),
                 new Ingredient('sugar', 32)
               ]),
    new Recipe('Title 2',
               'this is another description',
               'https://i.pinimg.com/originals/f8/d8/62/f8d862135c18ee203740c9c693b67716.jpg',
                [
                  new Ingredient('bread', 2),
                 new Ingredient('fries', 32)
                ]),
  ]

  getRecipes(){
    return this.recipes.slice()
  }

  addIngridientsToList(ingridients: Ingredient[]){
    this.slService.addIngredients(ingridients);
  }
}
