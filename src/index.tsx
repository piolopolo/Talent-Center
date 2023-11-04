import ReactDOM from 'react-dom/client';

import reportWebVitals from 'reportWebVitals';

import { ThemeProvider } from '@mui/material';

import App from '@astarx-studio/react-core/app';
import { HelloWorldErrorPage } from '@astarx-studio/mui/prefabs/errors';

import routes from 'pages/_routes';

import { DarkTheme, LightTheme } from 'resource/themes';

const root = ReactDOM.createRoot(document.getElementById('app-root') as HTMLElement);
root.render(
  <App
    strict
    secured
    routed={{
      routes,
      welcomePage: <HelloWorldErrorPage />,
    }}
    themed={{
      themeProvider: ({ theme, children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>,
      defaultTheme: {
        dark: DarkTheme,
        light: LightTheme,
        
      },
    }}
  />
);

reportWebVitals();
