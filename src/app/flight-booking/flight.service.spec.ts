import { TestBed } from '@angular/core/testing';

import { FlightService } from './flight.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('FlightService', () => {
  let service: FlightService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(FlightService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return flights from api', () => {
    // setup
    const testingController = TestBed.inject(HttpTestingController);

    let result = 'UNDEFINED';
    service.search('FROM', 'TO').subscribe((value: any) => {
      result = value;
    });

    // action
    const req = testingController.expectOne('http://www.angular.at/api/flight?from=FROM&to=TO');

    req.flush(['FLIGHT']);

    // expectations
    expect(result).toEqual(['FLIGHT']);
  });
});
