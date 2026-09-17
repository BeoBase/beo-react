import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import QuizPage from './QuizPage';

vi.mock('../components/Header.tsx', () => ({
  default: () => <header>Mock Header</header>,
}));

vi.mock('../components/Quiz.tsx', () => ({
  default: () => <div>Mock Quiz</div>,
}));

describe('QuizPage', () => {
  it('renders the Header component', () => {
    render(<QuizPage />);

    expect(screen.getByText('Mock Header')).toBeInTheDocument();
  });

  it('renders the Quiz component', () => {
    render(<QuizPage />);

    expect(screen.getByText('Mock Quiz')).toBeInTheDocument();
  });

  it('sets the document title', () => {
    render(<QuizPage />);

    expect(document.title).toBe('Beo Base | Quiz');
  });
})