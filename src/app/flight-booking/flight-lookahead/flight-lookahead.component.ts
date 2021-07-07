import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, tap, delay } from 'rxjs/operators';
import { FlightService } from '../flight.service';
import { Flight } from '../../entities/entities';

@Component({
  selector: 'app-flight-lookahead',
  templateUrl: './flight-lookahead.component.html',
  styleUrls: ['./flight-lookahead.component.css'],
})
export class FlightLookaheadComponent implements OnInit {
  formGroup: FormGroup;
  flights: Flight[] = [];
  loading: boolean;

  constructor(private fb: FormBuilder, private flightService: FlightService) {
    this.formGroup = this.fb.group({
      from: this.fb.control(null),
    });
  }

  ngOnInit(): void {
    const formControl: FormControl = this.formGroup.get('from') as FormControl;
    formControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => (this.loading = true)),
        switchMap((userInput: string) => {
          return this.flightService.load(userInput).pipe(delay(7000));
        }),
        tap(() => (this.loading = false))
      )
      .subscribe({
        next: (value) => {
          this.flights = value;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
}
