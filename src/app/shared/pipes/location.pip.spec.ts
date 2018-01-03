/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { LocationPipe } from './location.pipe';
import { Location } from '../../models';

describe('LocationPipe', () => {

  it('create an instance', () => {
    let pipe = new LocationPipe();
    expect(pipe).toBeTruthy();
  });

  it('If the type of location is string then it would return string', () => {
    let pipe = new LocationPipe();
    const result = pipe.transform('Guindy');

    expect(result).toEqual('Guindy');
  });

  it('If the type of location is an location object then it would return name of the location', () => {
    let pipe = new LocationPipe();
    let location: Location = new Location();
    location.name = 'Guindy';
    const result = pipe.transform(location);
    expect(result).toEqual('Guindy');
  });

});
