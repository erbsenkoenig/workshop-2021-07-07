import { RouterModule, Routes } from '@angular/router';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { FlightEditComponent } from './flight-edit/flight-edit.component';
import { FlightLookaheadComponent } from './flight-lookahead/flight-lookahead.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'flight-search' },
  {
    path: 'flight-search',
    component: FlightSearchComponent,
  },
  {
    path: 'flight-edit/:id',
    component: FlightEditComponent,
  },
  {
    path: 'flight-lookahead',
    component: FlightLookaheadComponent,
  },
];

export const FlightBookingRoutingModule = RouterModule.forChild(routes);
