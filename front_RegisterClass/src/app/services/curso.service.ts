import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Curso } from './Curso';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  private apiUrl = 'http://localhost:3000/curso';

  constructor(private http: HttpClient) { }

  getCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.apiUrl);
  }

  deletarCurso(id_Curso: number): Observable<any> {
    const url = `${this.apiUrl}/${id_Curso}`;
    return this.http.delete(url);
  }


  adicionarCurso(curso: Curso): Observable<Curso> {
    return this.http.post<Curso>(this.apiUrl, { nome: curso.Nome });
  }

  atualizarCurso(id_Curso: number, cursoAtualizado: Curso): Observable<any> {
    const url = `${this.apiUrl}/${id_Curso}`;
    return this.http.put(url, { nome: cursoAtualizado.Nome });
  }
}
