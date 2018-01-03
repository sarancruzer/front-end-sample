import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chunk'
})
export class ChunkPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let n = args ? args : 0;
    if (n === 0) {
      return [value];
    }

    let result = [];
    for (var i = 0; i < value.length; i+=n) {
      result.push(value.slice(i, i + n));
    }
    return result;
  }

}
