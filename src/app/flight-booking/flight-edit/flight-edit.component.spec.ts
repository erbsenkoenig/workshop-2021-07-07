import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightEditComponent } from './flight-edit.component';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('FlightEditComponent', () => {
  let component: FlightEditComponent;
  let fixture: ComponentFixture<FlightEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlightEditComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightEditComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges(); // NG ON INIT
    expect(component).toBeTruthy();
  });

  it('should include heading if id is foo', () => {
    // setup
    component.id = 'foo';
    expect(component.id).toEqual('foo');

    let debugElem = fixture.debugElement.query(By.css('[data-testid="flight-edit-heading"]'));
    expect(debugElem).toBeNull();

    // execution
    fixture.detectChanges();

    // expectation
    debugElem = fixture.debugElement.query(By.css('[data-testid="flight-edit-heading"]'));
    expect(debugElem).not.toBeNull();

    // debugElem.nativeElement.textContent

    // debugElem.properties; // EVERYTHING IN []
    expect(debugElem.attributes['translateId']).toEqual('MY_ID');
  });

  it('should not include heading if id is not foo', () => {
    // setup
    component.id = 'bar';
    expect(component.id).toEqual('bar');

    let debugElem = fixture.debugElement.query(By.css('[data-testid="flight-edit-heading"]'));
    expect(debugElem).toBeNull();

    // execution
    fixture.detectChanges();

    // expectation
    debugElem = fixture.debugElement.query(By.css('[data-testid="flight-edit-heading"]'));
    expect(debugElem).toBeNull();
  });

  it('should set navigated to true after button click', () => {
    // setup
    // nothing sepcial to set up

    // execution
    fixture.detectChanges();

    const debugElem = fixture.debugElement.query(By.css('button'));
    debugElem.triggerEventHandler('click', null);

    // expectation
    expect(component.navigated).toBeTruthy();

    fixture.detectChanges();

    const headingElem = fixture.debugElement.query(By.css('h2'));
    expect(headingElem).not.toBeNull();
  });
});
