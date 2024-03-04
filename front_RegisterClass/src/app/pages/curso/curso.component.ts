import { Component, OnInit } from '@angular/core';
import { Curso } from 'src/app/types/ICurso';
import { CursoService } from 'src/app/services/curso/curso.service';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {

  cursos: Curso[] = [];

  constructor(private cursoService: CursoService) { }

  ngOnInit(): void {
    this.carregarCursos();
  }

  carregarCursos(): void {
    this.cursoService.getCursos()
      .subscribe(
        (cursos: Curso[]) => {
          this.cursos = cursos;
        },
        error => {
          console.error('Erro ao buscar cursos:', error);
        }
      );
  }

  deletarCurso(id_Curso: number | undefined): void {
    if (id_Curso !== undefined) {
      this.cursoService.deletarCurso(id_Curso)
        .subscribe(
          () => {
            console.log('Curso deletado com sucesso');
            this.carregarCursos();
          },
          error => {
            console.error('Erro ao deletar curso:', error);
          }
        );
    } else {
      console.error('ID do curso é undefined');
    }
  }

  criarCurso(nomeCurso: string): void {
    if (nomeCurso.trim()) {
      const novoCurso: Curso = { Nome: nomeCurso };
      this.cursoService.adicionarCurso(novoCurso)
        .subscribe(
          (curso: Curso) => {
            console.log('Curso adicionado com sucesso');
            this.carregarCursos();
          },
          error => {
            console.error('Erro ao adicionar curso:', error);
          }
        );
    } else {
      console.error('Nome do curso não pode estar vazio');
    }
  }
  
  adicionarCurso(nomeCurso: string): void {
    const novoCurso: Curso = { Nome: nomeCurso };
    this.cursoService.adicionarCurso(novoCurso)
      .subscribe(
        (curso: Curso) => {
          console.log('Curso adicionado com sucesso');
          this.carregarCursos();
        },
        error => {
          console.error('Erro ao adicionar curso:', error);
        }
      );
  }

  atualizarCurso(curso: Curso): void {
    const novoNome = prompt('Digite o novo nome para o curso:', curso.Nome);
    if (novoNome !== null) {
      const cursoAtualizado: Curso = { ...curso, Nome: novoNome };
      if (curso.ID_Curso !== undefined) {
        this.cursoService.atualizarCurso(curso.ID_Curso, cursoAtualizado)
          .subscribe(
            () => {
              console.log('Curso atualizado com sucesso');
              this.carregarCursos();
            },
            error => {
              console.error('Erro ao atualizar curso:', error);
            }
          );
      } else {
        console.error('ID do curso é undefined');
      }
    }
  }

}