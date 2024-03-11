import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js/auto'; 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('barGraph') canvasRef!: ElementRef;
  @ViewChild('pizzaGraph') pizzaRef! : ElementRef
  @ViewChild('lineGraph') lineRef! : ElementRef
   
  bar: any;
  pizza: any;
  line: any;

  constructor() {}
   

  ngOnInit() {
    
  }

  ngAfterViewInit(): void {
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
        data: {
            labels: ['Ausentes', 'Presentes'],
            datasets: [
                {
                    label: '# of ausentes',
                    data: [50, 50],
                    borderWidth: 1,
                }
            ]
        },
       
    })

    const lineGraph = this.lineRef.nativeElement;
    this.line = new Chart ( lineGraph, {
        type: 'line',
        data: {
            labels: ['aprovados', 'reporvados'],
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
}