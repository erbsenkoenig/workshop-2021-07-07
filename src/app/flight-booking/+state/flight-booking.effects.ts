import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap, switchMap, map } from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';

import * as FlightBookingActions from './flight-booking.actions';
import { FlightService } from '../flight.service';
import { Flight } from '../../entities/entities';

@Injectable()
export class FlightBookingEffects {
  constructor(private actions$: Actions, private flightService: FlightService) {}

  loadFlights = createEffect(() =>
    this.actions$.pipe(
      ofType(FlightBookingActions.loadFlights),
      switchMap(({ from, to }) => {
        return this.flightService.search(from, to);
      }),
      map((flights: Flight[]) => FlightBookingActions.flightsLoaded({ flights }))
    )
  );
}
