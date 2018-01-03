import { Pipe, PipeTransform } from '@angular/core';
import { Location } from '../../models';

@Pipe({
  name: 'location'
})
export class LocationPipe implements PipeTransform {

  transform(value: Object | string): string {
    if (!value) {
      return '';
    }

    if (typeof value === 'string') {
      return value;
    }

    return (<Location>value).name;
  }

}
