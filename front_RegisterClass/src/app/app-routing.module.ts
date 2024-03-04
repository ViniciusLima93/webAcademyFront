import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { CursoComponent } from './pages/curso/curso.component';
import { MateriaComponent } from './pages/materia/materia.component';

const routes: Routes = [
  {path: '', redirectTo: 'inicio', pathMatch: 'full'},

  {
    path:"inicio", component:InicioComponent
  },
  
  {path: 'dashboard', component: DashboardComponent},

  {
    path:"home", component:HomeComponent
  },

  {
    path:"curso", component:CursoComponent
  },

  {
    path:"materia", component:MateriaComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
