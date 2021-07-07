import { Component, OnInit } from '@angular/core';
import { Flight } from '../../entities/entities';
import { FlightService } from '../flight.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { FlightBookingAppState, flightBookingFeatureKey } from '../+state/flight-booking.reducer';
import { flightsLoaded, loadFlights } from '../+state/flight-booking.actions';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css'],
})
export class FlightSearchComponent implements OnInit {
  from: string;
  to: string;
  flights: Flight[] = [];
  selectedFlight: Flight;

  flights$: Observable<Flight[]>;

  formGroup: FormGroup;
  basket: { [key: number]: boolean } = {
    182: true,
  };

  constructor(
    private readonly flightService: FlightService,
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private store: Store<FlightBookingAppState>
  ) {
    this.formGroup = this.fb.group({
      from: this.fb.control(null, [Validators.required, Validators.minLength(3)]),
      to: this.fb.control(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    const from = this.activatedRoute.snapshot.queryParamMap.get('from');
    const to = this.activatedRoute.snapshot.queryParamMap.get('to');

    this.formGroup.patchValue({ from, to });

    this.flights$ = this.store.select((s) => s[flightBookingFeatureKey].flights);
  }

  onSubmit() {
    // this.router.navigate([], { queryParams: this.formGroup.value });
    const { from, to } = this.formGroup.value;

    this.store.dispatch(loadFlights({ from, to }));

    // this.flightService.search(from, to).subscribe(
    //   (flights: Flight[]) => {
    //     this.store.dispatch(flightsLoaded({ flights }));
    //   },
    //   (errResp) => {
    //     console.error('Error loading flights', errResp);
    //   }
    // );
  }

  onSelectedChange(selected: boolean, flightId: number) {
    this.basket[flightId] = selected;
  }

  select(f: Flight): void {
    this.selectedFlight = f;
  }
}
