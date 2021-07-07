import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FlightSearchComponent } from './flight-search.component';
import { FlightService } from '../flight.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import createSpy = jasmine.createSpy;
import { of } from 'rxjs';

describe('FlightSearchComponent', () => {
  let component: FlightSearchComponent;
  let fixture: ComponentFixture<FlightSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [FlightSearchComponent],
      providers: [
        {
          provide: FlightService,
          useValue: {
            search: createSpy().and.returnValue(of(['FLIGHT'])),
          },
        },
        { provide: Router, useValue: {} },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { queryParamMap: { get: createSpy().and.callFake((value) => `PARAM_${value}`) } },
          },
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightSearchComponent);
    component = fixture.componentInstance;
  });

  it('should set default values for the form group depending on queryParams', () => {
    fixture.detectChanges();
    expect(component.formGroup.value).toEqual({
      from: 'PARAM_from',
      to: 'PARAM_to',
    });
  });

  it('should call service on submit', fakeAsync(() => {
    fixture.detectChanges();
    component.onSubmit();
    expect(TestBed.inject(FlightService).search).toHaveBeenCalledWith('PARAM_from', 'PARAM_to');

    tick();
    expect(component.flights).toEqual(['FLIGHT'] as any);
  }));

  it('should create', () => {
    fixture.detectChanges(); // NG ON INIT
    expect(component).toBeTruthy();
  });
});
