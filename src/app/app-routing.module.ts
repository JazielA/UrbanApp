import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { NoAuthGuard } from "./guards/no-auth.guard";
import { AuthGuard } from "./guards/auth.guard";

const routes: Routes = [
  {
    path: "",
    redirectTo: "landing",
    pathMatch: "full",
  },

  {
    path: "landing",
    loadChildren: () =>
      import("./pages/landing/landing.module").then((m) => m.LandingPageModule),
  },

  {
    path: "auth",
    loadChildren: () =>
      import("./pages/auth/auth.module").then((m) => m.AuthPageModule),
    canActivate: [NoAuthGuard],
  },
  {
    path: "main",
    loadChildren: () =>
      import("./pages/main/main.module").then((m) => m.MainPageModule),
    canActivate: [AuthGuard],
  },
  {
    //si hay un enrutador despues de este enrutador de error, esta la tomara como si no existiera, este enrutador de error siempre debe ir al ultimo.
    path: "**",
    loadChildren: () =>
      import("./pages/error/error.module").then((m) => m.ErrorPageModule),
  },  {
    path: 'maps-test',
    loadChildren: () => import('./pages/maps-test/maps-test.module').then( m => m.MapsTestPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
