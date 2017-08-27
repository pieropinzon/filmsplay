/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WebGuardService } from './web-guard.service';

describe('WebGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebGuardService]
    });
  });

  it('should ...', inject([WebGuardService], (service: WebGuardService) => {
    expect(service).toBeTruthy();
  }));
});
