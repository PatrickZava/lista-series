import { TestBed } from '@angular/core/testing';

import { MyMemoryService } from './my-memory.service';

describe('GoogleService', () => {
  let service: MyMemoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyMemoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
