import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FlightCardComponent } from './flight-search/flight-card/flight-card.component';
import { FlightBookingRoutingModule } from './flight-booking-routing.module';
import { FlightEditComponent } from './flight-edit/flight-edit.component';
import { FlightLookaheadComponent } from './flight-lookahead/flight-lookahead.component';
import { StoreModule } from '@ngrx/store';
import * as fromFlightBooking from './+state/flight-booking.reducer';
import { EffectsModule } from '@ngrx/effects';
import { FlightBookingEffects } from './+state/flight-booking.effects';

@NgModule({
  declarations: [FlightSearchComponent, FlightCardComponent, FlightEditComponent, FlightLookaheadComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlightBookingRoutingModule,
    StoreModule.forFeature(fromFlightBooking.flightBookingFeatureKey, fromFlightBooking.reducer),
    EffectsModule.forFeature([FlightBookingEffects]),
  ],
})
export class FlightBookingModule {}
