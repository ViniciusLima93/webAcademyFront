import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MateriaService {

  constructor(private http: HttpClient) { }

  getMaterias(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/materia');
  }

  getCursoById(id: number): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/curso/${id}`);
  }

  getCursoList(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/curso');
  }

  adicionarMateria(materia: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/materia', materia);
  }

  atualizarMateria(materia: any): Observable<any> {
    return this.http.put<any>('http://localhost:3000/materia/' + materia.ID_Materia, materia);
  }

  deletarMateria(materia: any): Observable<any> {
    return this.http.delete<any>('http://localhost:3000/materia/' + materia.ID_Materia);
  }
}
