import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatriculaTurmaService {

  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  listarTurmas(): Observable<any> {
    return this.http.get(`${this.baseUrl}/turma`);
  }
  
  listarTurmaDiscente(idTurma: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/turmaDiscentes/${idTurma}`);
  }

  cadastrarMatricula(matricula: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/turmaDiscentes`, matricula);
  }

  deletarMatricula(idTurma: number, matriculaDiscente: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/turmaDiscentes/${idTurma}/${matriculaDiscente}`);
  }

  listarDiscentes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/discente`);
  }

  listarMatriculasDiscentesTurma(idTurma: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/turmaDiscentes/${idTurma}`);
  }
}
