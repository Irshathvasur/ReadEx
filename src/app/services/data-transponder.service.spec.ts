import { TestBed } from '@angular/core/testing';

import { DataTransponderService } from './data-transponder.service';

describe('DataTransponderService', () => {
  let service: DataTransponderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataTransponderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
