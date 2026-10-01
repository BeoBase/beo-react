import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ArrowRightIcon from './ArrowRightIcon.tsx';
import MinusIcon from './MinusIcon.tsx';
import PlusIcon from './PlusIcon.tsx';

describe.each([
  ['ArrowRightIcon', ArrowRightIcon],
  ['MinusIcon', MinusIcon],
  ['PlusIcon', PlusIcon],
])('%s', (_name, Icon) => {
  it('renders an svg with a path', () => {
    const { container } = render(<Icon />);

    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
    expect(svg?.querySelector('path')).toHaveAttribute('d');
  });

  it('draws with the current text color', () => {
    const { container } = render(<Icon />);

    expect(container.querySelector('svg')).toHaveAttribute('stroke', 'currentColor');
  });

  it('passes props such as className through to the svg', () => {
    const { container } = render(<Icon className="my-icon" />);

    expect(container.querySelector('svg')).toHaveClass('my-icon');
  });
});
