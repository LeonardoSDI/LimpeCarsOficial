import { TestBed } from '@angular/core/testing';

import { LavacoesService } from './lavacoes.service';

describe('LavacoesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LavacoesService = TestBed.get(LavacoesService);
    expect(service).toBeTruthy();
  });
});
