import { describe, expect, it } from 'vitest';

import {
  hasMinLength,
  isEmail,
  isEqualsToOtherValue,
  isNotEmpty,
} from './validation.ts';

describe('isEmail', () => {
  it('accepts a value that contains an @', () => {
    expect(isEmail('test@example.com')).toBe(true);
  });

  it('rejects a value without an @', () => {
    expect(isEmail('test.example.com')).toBe(false);
  });

  it('rejects an empty string', () => {
    expect(isEmail('')).toBe(false);
  });
});

describe('isNotEmpty', () => {
  it('accepts a value with text', () => {
    expect(isNotEmpty('hello')).toBe(true);
  });

  it('rejects an empty string', () => {
    expect(isNotEmpty('')).toBe(false);
  });

  it('rejects a string that only has whitespace', () => {
    expect(isNotEmpty('   ')).toBe(false);
  });

  it('accepts text surrounded by whitespace', () => {
    expect(isNotEmpty('  hi  ')).toBe(true);
  });
});

describe('hasMinLength', () => {
  it('accepts a value longer than the minimum', () => {
    expect(hasMinLength('abcdefg', 6)).toBe(true);
  });

  it('accepts a value exactly as long as the minimum', () => {
    expect(hasMinLength('abcdef', 6)).toBe(true);
  });

  it('rejects a value shorter than the minimum', () => {
    expect(hasMinLength('abcde', 6)).toBe(false);
  });

  it('accepts an empty string when the minimum is 0', () => {
    expect(hasMinLength('', 0)).toBe(true);
  });
});

describe('isEqualsToOtherValue', () => {
  it('accepts two identical values', () => {
    expect(isEqualsToOtherValue('secret', 'secret')).toBe(true);
  });

  it('rejects two different values', () => {
    expect(isEqualsToOtherValue('secret', 'Secret')).toBe(false);
  });

  it('accepts two empty strings', () => {
    expect(isEqualsToOtherValue('', '')).toBe(true);
  });
});
