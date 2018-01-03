/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { ChunkPipe } from './chunk.pipe';

describe('ChunkPipe', () => {

  it('create an instance', () => {
    let pipe = new ChunkPipe();
    expect(pipe).toBeTruthy();
  });

  it('for n = 0 returns the given array as the only chunk', () => {
    let pipe = new ChunkPipe();
    const result = pipe.transform([], 0);

    expect(result).toEqual([[]]);
  });

  it('for n > the length of the given array returns the array itself as the only chunk', () => {
    let pipe = new ChunkPipe();
    const result = pipe.transform(['a'], 2);

    expect(result).toEqual([['a']]);
  });

  it('returns the given array in chunks of size n', () => {
    let pipe = new ChunkPipe();
    
    // even case
    let result = pipe.transform(['a', 'b', 'c', 'd'], 2);
    expect(result).toEqual([['a', 'b'], ['c', 'd']]);

    // odd case
    result = pipe.transform(['a', 'b', 'c'], 2);
    expect(result).toEqual([['a', 'b'], ['c']]);
  });


});
