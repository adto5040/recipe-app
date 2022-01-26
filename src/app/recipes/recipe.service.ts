import {EventEmitter, Injectable} from '@angular/core';
import {Recipe} from "./recipe.model";
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list/shopping-list.service";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('Wiener Schnitzel',
      'Delicious Schnitzel',
      'https://upload.wikimedia.org/wikipedia/commons/a/ae/Wiener-Schnitzel02.jpg',
      [new Ingredient('Kalbfleisch', 2), new Ingredient('Paniermehl', 200)]),
    new Recipe('Sächsischer Sauerbraten',
      'Sour but good',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/S%C3%A4chsischer_Sauerbraten.jpg/1920px-S%C3%A4chsischer_Sauerbraten.jpg',
      [new Ingredient('Kloßteig', 3), new Ingredient('Rotkohl', 30), new Ingredient('kalbfleisch', 1)]),
  ];

  constructor(private shoppingListService: ShoppingListService) { }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number): Recipe {
    return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
