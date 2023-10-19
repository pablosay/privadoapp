import { TestBed } from '@angular/core/testing';

import { ShareAuthoPersonInfoService } from './share-autho-person-info.service';

describe('ShareAuthoPersonInfoService', () => {
  let service: ShareAuthoPersonInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShareAuthoPersonInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
