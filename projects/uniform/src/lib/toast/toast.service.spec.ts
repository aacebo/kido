import { TestBed } from '@angular/core/testing';

import { UniToastService } from './toast.service';

describe('UniToastService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UniToastService = TestBed.get(UniToastService);
    expect(service).toBeTruthy();
  });
});
