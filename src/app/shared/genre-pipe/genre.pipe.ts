import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genre',
})
export class GenrePipe implements PipeTransform {
  transform(genre: string[]): unknown {
    if (genre.length === 0) return '-';

    if (genre.length === 1) return genre[0];

    if (genre.length > 1) {
      return genre.join(', ');
    }

    return '';
  }
}
