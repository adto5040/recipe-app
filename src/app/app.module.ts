import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import {AppRoutingModule} from "./app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {RecipesModule} from "./recipes/recipes.module";
import {ShoppingListModule} from "./shopping-list/shopping-list.module";
import {SharedModule} from "./shared/shared.module";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RecipesModule,
    ShoppingListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
