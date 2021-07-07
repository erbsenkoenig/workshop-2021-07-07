import { createAction, props } from '@ngrx/store';
import { Flight } from '../../entities/entities';

export const flightsLoaded = createAction('[FlightBooking] Flights Loaded', props<{ flights: Flight[] }>());

export const loadFlights = createAction('[FlightBooking] Load flights', props<{ from: string; to: string }>());
