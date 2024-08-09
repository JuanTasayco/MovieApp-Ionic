import { Component, Input, OnInit } from '@angular/core';
import { Result } from 'src/app/shared/interfaces/moviedb.interfaces';

@Component({
  selector: 'app-slideshow-doble',
  templateUrl: './slideshow-doble.component.html',
  styleUrls: ['./slideshow-doble.component.scss'],
})
export class SlideshowDobleComponent implements OnInit {
  @Input() movies: Result[] = []
  constructor() { }

  ngOnInit() {
    console.log('');
  }

}
