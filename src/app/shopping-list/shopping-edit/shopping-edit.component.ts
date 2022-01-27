import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  shoppingForm = new FormGroup({
    name: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required),
  });

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing
      .subscribe((index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.shoppingForm.patchValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
      );
  }

  onResetForm() {
    this.editMode = false;
    this.shoppingForm.reset();
  }

  onSubmit() {
    const newIngredient = new Ingredient(this.shoppingForm.value.name, this.shoppingForm.value.amount);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.onResetForm();
  }

  onDelete() {
    if (this.editMode) {
      this.onResetForm();
      this.shoppingListService.deleteIngredient(this.editedItemIndex);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
