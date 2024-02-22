import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'normalize.css';

import { App } from './App.tsx';

const bootstrap = () => {
  const root = createRoot(document.getElementById('root')!);

  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
};

bootstrap();
