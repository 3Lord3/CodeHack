import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('App', () => {
  it('renders the start screen by default', () => {
    const html = renderToString(<App />);

    expect(html).toContain('deHack');
    expect(html).toContain('Начать');
    expect(html).toContain('Количество действий');
  });
});
