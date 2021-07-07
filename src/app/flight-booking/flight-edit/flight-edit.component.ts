import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FlightService } from '../flight.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { debounceTime, switchMap } from 'rxjs/operators';
import { Flight } from '../../entities/entities';

@Component({
  selector: 'app-flight-edit',
  templateUrl: './flight-edit.component.html',
  styleUrls: ['./flight-edit.component.css'],
})
export class FlightEditComponent implements OnInit, OnDestroy {
  flight: Flight;
  loading: boolean;

  private subs: Subscription[] = [];

  constructor(
    private readonly flightService: FlightService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.subs.push(
      this.activatedRoute.paramMap
        .pipe(
          debounceTime(500),
          switchMap((paramMap: ParamMap) => {
            this.loading = true;
            const id = paramMap.get('id');
            return this.flightService.getById(id);
          })
        )
        .subscribe({
          next: (value) => {
            console.log('get by id returned value');
            this.loading = false;
            this.flight = value;
          },
        })
    );
  }

  changeId() {
    const newId = +this.activatedRoute.snapshot.paramMap.get('id') + 1;
    this.router.navigate(['flight-booking', 'flight-edit', newId]);
  }

  ngOnDestroy() {
    console.log('flight edit on destroy');
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
