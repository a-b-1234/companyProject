import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import * as React from 'react';
import * as ReactDOM from 'react-dom/client';

import 'sanitize.css/sanitize.css';

// Initialize languages
import './locales/i18n';
import App from './app';
import { Provider } from 'react-redux';
import store from './configureStore'
import { HelmetProvider } from 'react-helmet-async';

const MOUNT_NODE = document.getElementById('root') as HTMLElement;

interface Props {
  Component: typeof App;
}
const ConnectedApp = ({ Component }: Props) => (
  <Provider store={store}>
    <HelmetProvider>
      <React.StrictMode>
        <Component />
      </React.StrictMode>
    </HelmetProvider>
  </Provider>
);

const root = ReactDOM.createRoot(MOUNT_NODE);

const render = (Component: typeof App) => {
  root.render(<ConnectedApp Component={Component} />);
};

if (module.hot) {
  // Hot reloadable translation json files and app
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./app', './locales/i18n'], () => {
    root.unmount();
    const App = require('./app').App;
    render(App);
  });
}

render(App);
