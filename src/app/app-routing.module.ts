import {NgModule} from "@angular/core";
import {PreloadAllModules, RouterModule, Routes} from "@angular/router";

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'recipes',
    loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule)
  },
  { path: 'shopping-list',
    loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule)
  }
]

@NgModule({
  // preloadingStrategy: PreloadAllModules teilt alles in einzelne Bundles auf (wegen Lazy Loading), lädt die Module
  // aber schon von Anfang an, nicht wenn sie gebraucht werden, damit gibt es später kein Delay. Das erste Paket
  // app.module wird aber als erstes kleines Paket geladen. Man hat somit keine Nachteile beim initialen Laden der
  // Startseite (Startmodul)
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
