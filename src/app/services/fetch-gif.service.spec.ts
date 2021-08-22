import { TestBed } from '@angular/core/testing';

import { FetchGIFService } from './fetch-gif.service';

describe('FetchGIFService', () => {
  let service: FetchGIFService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchGIFService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
