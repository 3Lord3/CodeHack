// @vitest-environment jsdom
import { Provider, createStore } from 'jotai';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import App from './App';

// jsdom has no <dialog> implementation yet; the component only relies on
// showModal()/close() toggling the `open` state.
const dialogProto = HTMLDialogElement.prototype as unknown as Record<string, unknown>;
if (typeof dialogProto.showModal !== 'function') {
  dialogProto.showModal = function showModal(this: HTMLDialogElement) {
    this.open = true;
  };
  dialogProto.close = function close(this: HTMLDialogElement) {
    this.open = false;
    this.dispatchEvent(new Event('close'));
  };
}

const renderApp = () => render(
  <Provider store={createStore()}>
    <App />
  </Provider>,
);

const board = () =>
  [...document.querySelectorAll<HTMLElement>('.cell')].map((cell) => cell.textContent).join('');

afterEach(cleanup);

describe('App interaction', () => {
  it('starts a game from the menu', () => {
    renderApp();

    fireEvent.click(screen.getByText('⌨️ Начать'));

    expect(screen.getByText('Левый ↩️')).toBeTruthy();
    expect(screen.getAllByText(/Осталось/).length).toBeGreaterThan(0);
    expect(document.querySelectorAll('.cell')).toHaveLength(8);
  });

  it('rotates the panel on a button click', () => {
    renderApp();
    fireEvent.click(screen.getByText('⌨️ Начать'));

    const before = board();
    fireEvent.click(screen.getByText('Левый ↩️'));

    expect(board()).not.toBe(before);
  });

  it('shows an error dialog for invalid input', () => {
    renderApp();

    fireEvent.change(document.querySelector('#actions-input')!, { target: { value: '0' } });
    fireEvent.click(screen.getByText('⌨️ Начать'));

    expect(screen.getByText('Количество действий должно быть в диапазоне [1:100]')).toBeTruthy();
    // Still on the menu.
    expect(document.querySelectorAll('.cell')).toHaveLength(0);
  });
});
