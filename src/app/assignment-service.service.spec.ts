import { TestBed, inject } from '@angular/core/testing';

import { AssignmentServiceService } from './assignment-service.service';

describe('AssignmentServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AssignmentServiceService]
    });
  });

  it('should be created', inject([AssignmentServiceService], (service: AssignmentServiceService) => {
    expect(service).toBeTruthy();
  }));
});
