import { renderToString } from 'react-dom/server';
import App from './App.jsx';
export function render(pagePath) {
  return renderToString(<App pagePath={pagePath} />);
}
