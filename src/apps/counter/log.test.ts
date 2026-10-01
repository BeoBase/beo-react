import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { log } from './log.ts';

const COMPONENT_STYLE = 'padding: 0.15rem; background: #04406b; color: #fcfabd';
const OTHER_STYLE = 'padding: 0.15rem; background: #210957; color: #ede6b2';

describe('log', () => {
  let consoleLog: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleLog = vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleLog.mockRestore();
  });

  it('logs the message with the component style and no indent by default', () => {
    log('hello');

    expect(consoleLog).toHaveBeenCalledTimes(1);
    expect(consoleLog).toHaveBeenCalledWith('%chello', COMPONENT_STYLE);
  });

  it('indents the message by two characters per level', () => {
    log('nested', 3);

    expect(consoleLog).toHaveBeenCalledWith('%c- - - nested', COMPONENT_STYLE);
  });

  it('uses the "other" style when type is other', () => {
    log('calculation', 2, 'other');

    expect(consoleLog).toHaveBeenCalledWith('%c- - calculation', OTHER_STYLE);
  });

  it('uses the component style when type is component', () => {
    log('rendered', 1, 'component');

    expect(consoleLog).toHaveBeenCalledWith('%c- rendered', COMPONENT_STYLE);
  });
});
