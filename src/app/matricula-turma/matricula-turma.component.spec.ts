import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatriculaTurmaComponent } from './matricula-turma.component';

describe('MatriculaTurmaComponent', () => {
  let component: MatriculaTurmaComponent;
  let fixture: ComponentFixture<MatriculaTurmaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatriculaTurmaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatriculaTurmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
