import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'filmversion'})
export class FilmVersionPipe implements PipeTransform {
  transform(value: string): string {
    return (value === 'Français') ? 'FR' : "VOSTFR";
  }
}
