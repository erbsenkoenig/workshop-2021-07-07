import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Flight } from '../../../entities/entities';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flight-card',
  templateUrl: './flight-card.component.html',
  styleUrls: ['./flight-card.component.css'],
})
export class FlightCardComponent implements OnInit {
  @Input() item: Flight;
  @Input() selected: boolean;

  @Output() selectedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private readonly router: Router) {}

  ngOnInit(): void {}

  editFlight() {
    this.router.navigate(['flight-booking', 'flight-edit', this.item.id]);
  }

  select() {
    this.selected = true;
    this.selectedChange.emit(this.selected);
  }

  deselect() {
    this.selected = false;
    this.selectedChange.emit(this.selected);
  }
}
