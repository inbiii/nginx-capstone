import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BondComponent } from './bondsFolder/bond/bond.component';
import { BondsComponent } from './bondsFolder/bonds/bonds.component';
import { HomeComponent } from './home/home.component';
import { LocationsComponent } from './locationsFolder/locations/locations.component';
import { LocationComponent } from './locationsFolder/location/location.component';
import { RetcalcComponent } from './retcalc/retcalc.component';

const routes: Routes = [
  {path: "home", component: HomeComponent},
  {path: "bonds", component: BondsComponent},
  {path: "bonds/:id", component: BondComponent},
  {path: "", component: HomeComponent, pathMatch: "full"},
  {path: "locations", component: LocationsComponent, pathMatch: "full"},
  {path: "locations/:id", component: LocationComponent},
  {path: "retcalc", component: RetcalcComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
