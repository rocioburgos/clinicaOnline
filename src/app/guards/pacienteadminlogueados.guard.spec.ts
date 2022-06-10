import { TestBed } from '@angular/core/testing';

import { PacienteadminlogueadosGuard } from './pacienteadminlogueados.guard';

describe('PacienteadminlogueadosGuard', () => {
  let guard: PacienteadminlogueadosGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PacienteadminlogueadosGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
