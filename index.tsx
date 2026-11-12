
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import { installRuntimeMonitoring, recordRuntimeError } from './src/utils/runtimeMonitoring';
import { installAnalytics } from './src/utils/analytics';

installRuntimeMonitoring();
installAnalytics();
window.addEventListener('qudschool:error', (event) => {
  recordRuntimeError((event as CustomEvent<{ error: unknown }>).detail.error, 'react-error-boundary');
});

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
    