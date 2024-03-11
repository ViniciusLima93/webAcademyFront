import { Component, OnInit } from '@angular/core';
import { MatriculaTurmaService } from '../matricula-turma.service';

@Component({
  selector: 'app-matricula-turma',
  templateUrl: './matricula-turma.component.html',
  styleUrls: ['./matricula-turma.component.css']
})
export class MatriculaTurmaComponent implements OnInit {

  turmas: any[] = [];
  selectedTurma: any = null;
  mostrarOpcoes: boolean = false;
  discentesTurma: any[] = [];
  matriculasDiscentesTurma: number[] = [];
  discentes: any[] = [];
  novaMatricula: number | null = null;

  constructor(private matriculaTurma: MatriculaTurmaService) { }

  ngOnInit(): void {
    this.carregarTurmas();
    this.carregarDiscentes();
  }

  carregarTurmas(): void {
    this.matriculaTurma.listarTurmas().subscribe(turmas => {
      this.turmas = turmas;
    });
  }

  carregarDiscentes(): void {
    this.matriculaTurma.listarDiscentes().subscribe(discentes => {
      this.discentes = discentes;
    });
  }

  mostrarOpcoesTurma(turma: any): void {
    this.selectedTurma = turma;
    this.mostrarOpcoes = true;
    this.carregarDiscentesTurma(turma.ID_Turma);
    this.carregarMatriculasDiscentesTurma(turma.ID_Turma);
  }

  carregarDiscentesTurma(idTurma: number): void {
    this.matriculaTurma.listarTurmaDiscente(idTurma).subscribe(discentes => {
      this.discentesTurma = discentes;
    });
  }

  carregarMatriculasDiscentesTurma(idTurma: number): void {
    this.matriculaTurma.listarMatriculasDiscentesTurma(idTurma).subscribe(matriculas => {
      this.matriculasDiscentesTurma = matriculas.map((item: any) => item.Matricula_Discente);
    });
  }

  cadastrarMatricula(): void {
    if (this.novaMatricula !== null && this.novaMatricula !== undefined) {
      this.matriculaTurma.cadastrarMatricula({ ID_Turma: this.selectedTurma.ID_Turma, Matricula_Discente: this.novaMatricula }).subscribe(() => {
        this.carregarDiscentesTurma(this.selectedTurma.ID_Turma);
        this.carregarMatriculasDiscentesTurma(this.selectedTurma.ID_Turma);
        this.novaMatricula = null;
      });
    }
  }

  deletarMatricula(idTurma: number, matriculaDiscente: number): void {
    this.matriculaTurma.deletarMatricula(idTurma, matriculaDiscente).subscribe(() => {
      this.carregarMatriculasDiscentesTurma(idTurma);
    });
  }  

}
