import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "./shopping-list.service";
import {Subscription} from "rxjs";
import {animate, group, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  animations: [
    trigger('listAnimation', [
      state('appear', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      // Animation von "nicht da" nach "irgendwas" (Beim Einfügen eines Listenelements)
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100px)',
          color: 'green'
        }),
        group([
          animate(300, style({
            opacity: 1,
            transform: 'translate(0px)'
          })),
          animate(800, style({
            color: '#555'
          }))
        ])
      ]),
      // Animation von "irgendwas" nach "nichts" (Beim Löschen eines Listenelements)
      transition('* => void', [
        group([
          animate(800, style({
          opacity: 0,
          transform: 'translate(100px)'
        })),
          animate(300, style({
            color: 'red'
          }))
        ])
      ])
    ])
  ]
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  private subscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.subscription = this.shoppingListService.ingredientChanged
      .subscribe((ingredients: Ingredient[]) => {
      this.ingredients = ingredients;
    })
  }

  onEditItem(index: number) {
    this.shoppingListService.startedEditing.next(index);
  }

  animationStarted(event) {
    console.log(event);
  }

  animationEnded(event) {
    console.log(event);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
