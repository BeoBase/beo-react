import { render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import Modal from './Modal';

describe('Modal', () => {
  const showModal = vi.fn();
  const close = vi.fn();

  beforeEach(() => {
    HTMLDialogElement.prototype.showModal = showModal;
    HTMLDialogElement.prototype.close = close;
  });

  afterEach(() => {
    showModal.mockClear();
    close.mockClear();
  });

  it('renders the children into document.body when open', () => {
    render(
      <Modal open onClose={vi.fn()}>
        <p>Modal content</p>
      </Modal>
    );

    expect(screen.getByText('Modal content')).toBeInTheDocument();
    expect(document.body.querySelector('dialog')).toBeInTheDocument();
  });

  it('opens the dialog when open is true', () => {
    render(
      <Modal open onClose={vi.fn()}>
        <p>Modal content</p>
      </Modal>
    );

    expect(showModal).toHaveBeenCalledTimes(1);
    expect(close).not.toHaveBeenCalled();
  });

  it('closes the dialog and hides the children when open is false', () => {
    render(
      <Modal open={false} onClose={vi.fn()}>
        <p>Modal content</p>
      </Modal>
    );

    expect(close).toHaveBeenCalledTimes(1);
    expect(showModal).not.toHaveBeenCalled();
    expect(screen.queryByText('Modal content')).not.toBeInTheDocument();
  });

  it('calls onClose when the dialog fires a close event', () => {
    const onClose = vi.fn();
    render(
      <Modal open onClose={onClose}>
        <p>Modal content</p>
      </Modal>
    );

    document.body.querySelector('dialog')!.dispatchEvent(new Event('close'));

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
