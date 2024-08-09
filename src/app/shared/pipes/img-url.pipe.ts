import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imgUrl',
  standalone: true
})
export class ImgUrlPipe implements PipeTransform {

  transform(path: string): string {

    const url: string = 'https://image.tmdb.org/t/p/w500';

    if (path) return `${url}${path}`;

    return '';
  }

}
