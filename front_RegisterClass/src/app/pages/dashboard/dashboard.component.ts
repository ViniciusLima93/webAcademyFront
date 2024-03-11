import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { CursoService } from 'src/app/services/curso/curso.service';
import { Curso } from 'src/app/types/ICurso';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts'

//@ts-ignore
import * as html2pdf from 'html2pdf.js'

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements AfterViewInit {
  @ViewChild('barGraph') canvasRef!: ElementRef;
  @ViewChild('pizzaGraph') pizzaRef! : ElementRef
  @ViewChild('lineGraph') lineRef! : ElementRef
   
  bar: any;
  pizza: any;
  line: any;

  cursos: Curso[] = []

  dataLabelPizzaGraph:any[] = []

  constructor(private cursoService: CursoService) {}
   
  ngAfterViewInit(): void {

   this.loadCursos()


    const barGraph = this.canvasRef.nativeElement;
    this.bar = new Chart(barGraph, {
      type: 'bar',
      data: {
        labels: [ 20, 30, 50,],
        datasets: [
          {
            label: '# of Votes',
            data: [  5,  7, 10],
            borderWidth:  1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    
    const pizzaGraph  = this.pizzaRef.nativeElement;
    this.pizza = new Chart (pizzaGraph, {
        type: 'pie',
        data: this.dataGraphPizza
       
    })

    const lineGraph = this.lineRef.nativeElement;
    this.line = new Chart ( lineGraph, {
        type: 'line',
        data: {
            labels: ['aprovados', 'reporvados', 'indecisos', ],
            datasets: [
                {
                    label: '# of aprovados',
                    data: ['10', '20', '30', '40', '50'],
                    borderWidth: 2
                }
            ]
        }

    })
 }


  loadCursos(): void {
    this.cursoService.getCursos()
    .subscribe(
      (cursos: Curso[]) => {
        this.cursos = cursos;
        const nameCurso = cursos.map(c => c.Nome);
        const vagasCurso = cursos.map(c => c.Vagas);
        this.updatePizzaDatas(nameCurso,vagasCurso)
      },
      error => {
        console.log('Error ao buscar cursos', error)
      }
    )
}

dataGraphPizza = {
  labels: ['Red', 'Orange', 'Yellow', 'Green', 'Brown', 'Blue', 'Pink'],
  datasets: [
    {
      label: 'Alunos',
      data:this.cursos,
      borderWidth: 1,
      backgroundColor: [
        'Red', 'Orange', 'Yellow', 'Green', 'Brown', 'Blue', 'Pink'
      ],
    }
  ]
 }



updatePizzaDatas(labels: string[], vagas: number[]) {
  if (this.pizza && this.pizza.data && this.pizza.data.datasets) {
     this.pizza.data.labels = labels;
     if (this.pizza.data.datasets[0]) {
       this.pizza.data.datasets[0].data = vagas;
     }
     this.pizza.update();
  }
 }
 

exportToPDF () {

  const htmlContent = document.body
  const content = html2pdf().from(htmlContent).toPdf().save()
  const documentDefinition = {
    content:[content]
  }
  pdfMake.createPdf(documentDefinition).download()
}
    
}