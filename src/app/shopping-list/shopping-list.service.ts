import {Injectable} from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientChanged = new Subject<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomato', 10)
  ];

  constructor() { }

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    for (let ingredient of ingredients) {
      const foundIng = this.ingredients.filter((ing) => ing.name.toLowerCase() === ingredient.name.toLowerCase());
      if (foundIng.length > 0) {
        foundIng[0].amount += ingredient.amount;
      } else {
        this.ingredients.push(Object.assign({}, ingredient));
      }
    }
    this.ingredientChanged.next(this.ingredients.slice());
  }
}
