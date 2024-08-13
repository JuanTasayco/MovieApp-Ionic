import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideshowBackdropComponent } from './slideshow-backdrop/slideshow-backdrop.component';
import { IonicModule } from '@ionic/angular';
import { ImgUrlPipe } from '../shared/pipes/img-url.pipe';
import { SlideshowDobleComponent } from './slideshow-doble/slideshow-doble.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';



@NgModule({
  declarations: [
    SlideshowBackdropComponent,
    SlideshowDobleComponent,
    MovieDetailComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ImgUrlPipe
  ],
  exports: [SlideshowBackdropComponent, SlideshowDobleComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule { }
