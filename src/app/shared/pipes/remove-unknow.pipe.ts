import { Pipe, PipeTransform } from '@angular/core';
import { Result } from '../interfaces/moviedb.interfaces';

@Pipe({
  name: 'removeUnknow',
  standalone: true
})
export class RemoveUnknowPipe implements PipeTransform {

  transform(result: any): Result[] | [] {
    return result as Result[];
  }

}
