import { TestBed } from '@angular/core/testing';

import { MatriculaTurmaService } from './matricula-turma.service';

describe('MatriculaTurmaService', () => {
  let service: MatriculaTurmaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatriculaTurmaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
