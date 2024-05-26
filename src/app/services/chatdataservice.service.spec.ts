import { TestBed } from '@angular/core/testing';

import { ChatdataserviceService } from './chatdataservice.service';

describe('ChatdataserviceService', () => {
  let service: ChatdataserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatdataserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
