import { Component, OnInit } from '@angular/core';
import { MateriaService } from '../services/materia.service';

@Component({
  selector: 'app-materia',
  templateUrl: './materia.component.html',
  styleUrls: ['./materia.component.css']
})
export class MateriaComponent implements OnInit {

  materias!: any[];
  cursos!: any[];
  detalhesMateria: any;
  detalhesCurso: any;

  novaMateria: any = {
    Nome: '',
    CargaHoraria: '',
    Ementa: '',
    fk_Curso_ID_Curso: null
  };

  constructor(private materiaService: MateriaService) { }

  ngOnInit(): void {
    this.getMaterias();
    this.getCursoList();
  }

  getMaterias(): void {
    this.materiaService.getMaterias().subscribe(materias => {
      this.materias = materias;
    });
  }

  mostrarDetalhes(materia: any): void {
    this.detalhesMateria = materia;
    this.materiaService.getCursoById(materia.fk_Curso_ID_Curso).subscribe(curso => {
      this.detalhesCurso = curso;
    });
  }

  getCursoList(): void {
    this.materiaService.getCursoList().subscribe(cursos => {
      this.cursos = cursos;
    });
  }

  adicionarMateria(): void {
    this.materiaService.adicionarMateria(this.novaMateria).subscribe(() => {
      this.novaMateria = {
        Nome: '',
        CargaHoraria: '',
        Ementa: '',
        fk_Curso_ID_Curso: null
      };
      this.getMaterias();
    });
  }

  atualizarMateria(): void {
    this.materiaService.atualizarMateria(this.novaMateria).subscribe(() => {
      console.log('Matéria atualizada com sucesso!');
      this.novaMateria = {
        Nome: '',
        CargaHoraria: '',
        Ementa: '',
        fk_Curso_ID_Curso: null
      };
      this.getMaterias();
    }, error => {
      console.error('Erro ao atualizar matéria:', error);
    });
  }

  deletarMateria(materia: any): void {
    this.materiaService.deletarMateria(materia).subscribe(() => {
      console.log('Matéria deletada com sucesso!');
      this.getMaterias();
    }, error => {
      console.error('Erro ao deletar matéria:', error);
    });
  }

  editarMateria(materia: any): void {
    this.novaMateria = { ...materia };
  }

  cancelarEdicao(): void {
    this.novaMateria = {
      Nome: '',
      CargaHoraria: '',
      Ementa: '',
      fk_Curso_ID_Curso: null
    };
  }

}
