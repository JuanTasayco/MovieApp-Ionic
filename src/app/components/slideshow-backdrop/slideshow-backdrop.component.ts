import { Component, Input, OnInit } from '@angular/core';
import { Result } from 'src/app/shared/interfaces/moviedb.interfaces';

@Component({
  selector: 'app-slideshow-backdrop',
  templateUrl: './slideshow-backdrop.component.html',
  styleUrls: ['./slideshow-backdrop.component.scss'],
})
export class SlideshowBackdropComponent {
  @Input() movies: Result[] = [];
  constructor() { }



}
