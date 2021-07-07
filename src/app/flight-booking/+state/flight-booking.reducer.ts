import { Action, createReducer, on } from '@ngrx/store';
import * as FlightBookingActions from './flight-booking.actions';
import { Flight } from '../../entities/entities';

export const flightBookingFeatureKey = 'flightBooking';

export interface FlightBookingAppState {
  flightBooking: State;
}

export interface State {
  flights: Flight[];
}

export const initialState: State = {
  flights: [] as Flight[],
};

export const reducer = createReducer(
  initialState,
  on(FlightBookingActions.flightsLoaded, (state: State, action) => {
    return { ...state, flights: action.flights };
  })
);
