import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card'

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  standalone: true,
  imports: [MatCardModule]
})
export class CardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

