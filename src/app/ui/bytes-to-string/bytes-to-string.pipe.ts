import { Pipe, PipeTransform } from '@angular/core';

const UNITS = ['KB', 'MB', 'GB', 'TB'];

@Pipe({
  name: 'kidoBytesToString',
})
export class BytesToStringPipe implements PipeTransform {
  transform(bytes: number) {
    let i = -1;
    let size = bytes;

    while (size >= 1024) {
      size /= 1024;
      i++;
    }

    return `${size.toFixed(1)}${UNITS[i] ? UNITS[i] : 'B'}`;
  }
}
