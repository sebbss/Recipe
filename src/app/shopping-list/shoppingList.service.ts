import { Subject } from 'rxjs';
import { Ingredient } from "../shared/ingredient.model";



export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>()
  startedEditing = new Subject<number>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)

  ]

  getIgredients(){
    return this.ingredients.slice()
  }

  getIngredient(i: number){
    return this.ingredients[i]
  }

  addIgredient(ingredient: Ingredient){
    this.ingredients.push(ingredient)
    this.ingredientsChanged.next(this.ingredients.slice())
  }

  updateIngredient(index: number, newIngredient){
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice())
  }

  deleteIngredient(index: number){
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice())
  }

  addIngredients(items: Ingredient[]){
    this.ingredients.push(...items)
    this.ingredientsChanged.next(this.ingredients.slice())
  }
}
