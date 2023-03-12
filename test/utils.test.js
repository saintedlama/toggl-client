import { expect } from 'chai';
import { defaultToEmpty, mapData } from '../lib/utils.js';

describe('utilities', () => {
  it('should return the passed in input', () => {
    const inputArray = ['foo', 'bar', 'baz'];
    const inputString = 'sample string';
    let output = defaultToEmpty(inputArray);
    expect(output).to.be.an('array').to.have.length(3);
    output = defaultToEmpty(inputString);
    expect(output).to.be.a('string').to.equal(inputString);
  });

  it('should return an empty array without input', () => {
    const output = defaultToEmpty();
    expect(output).to.be.an('array').that.is.empty;
  });

  it('should return the undefined if there is no data property', () => {
    const input = { some: 'random', object: { with: ['nested', 'array'] } };
    const output = mapData(input);
    expect(output).to.be.undefined;
  });

  it('should return the data property if passed an object with data', () => {
    const input = { some: 'random', data: { with: ['nested', 'array'] } };
    const output = mapData(input);
    expect(output).to.be.an('object');
    expect(output).to.have.property('with');
  });
});
