import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Custom console styling with your brand colors
const brandStyles = {
  primary: '#C4DFDF',
  secondary: '#E3F4F4',
  accent: '#D2E9E9',
  text: '#2D3A3A'
};

// Welcome message with brand styling
console.log(
  `%c🚀 CorpConnect Intranet Portal\n%cVersion 2.0 | Ready for Collaboration`,
  `color: ${brandStyles.primary}; font-size: 14px; font-weight: bold;`,
  `color: ${brandStyles.accent}; font-size: 12px;`
);

console.log(
  `%c✨ Powered by your corporate ecosystem`,
  `color: ${brandStyles.secondary}; font-size: 11px; font-style: italic;`
);

// Global error boundary shield with enhanced error formatting
window.addEventListener('unhandledrejection', (event) => {
  console.group(
    `%c⚠️ Ecosystem Runtime Guard | Unhandled Promise Rejection`,
    `color: ${brandStyles.primary}; font-weight: bold;`
  );
  console.error('%cReason:', `color: ${brandStyles.accent}; font-weight: bold;`, event.reason);
  console.error('%cStack:', `color: ${brandStyles.secondary};`, event.reason?.stack || 'No stack trace available');
  console.groupEnd();
  
  // Optional: Send to error tracking service
  // reportErrorToAnalytics(event.reason);
});

window.addEventListener('error', (event) => {
  console.group(
    `%c⚠️ Ecosystem Runtime Guard | Global Application Error`,
    `color: ${brandStyles.primary}; font-weight: bold;`
  );
  console.error('%cMessage:', `color: ${brandStyles.accent}; font-weight: bold;`, event.message);
  console.error('%cFile:', `color: ${brandStyles.secondary};`, event.filename);
  console.error('%cLine:', `color: ${brandStyles.secondary};`, event.lineno);
  console.error('%cColumn:', `color: ${brandStyles.secondary};`, event.colno);
  console.error('%cError:', `color: ${brandStyles.secondary};`, event.error);
  console.groupEnd();
  
  // Optional: Prevent default error behavior for non-critical errors
  // if (event.error?.message?.includes('optional-error')) {
  //   event.preventDefault();
  // }
});

// Performance monitoring (development only)
if (import.meta.env.DEV) {
  console.log(
    `%c🔧 Development Mode Active\n%cColor Palette: #F8F6F4 | #E3F4F4 | #D2E9E9 | #C4DFDF`,
    `color: ${brandStyles.primary}; font-size: 11px;`,
    `color: ${brandStyles.secondary}; font-size: 10px;`
  );
}

// Report Web Vitals (optional - uncomment if needed)
// const reportWebVitals = (metric) => {
//   console.log(`%c📊 Web Vitals: ${metric.name} - ${metric.value}`, `color: ${brandStyles.accent};`);
// };
// reportWebVitals(console.log);

// Initialize app with error boundary
const root = ReactDOM.createRoot(document.getElementById('root'));

// Simple error boundary wrapper (for mount errors)
const renderApp = () => {
  try {
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    
    console.log(
      `%c✅ Application mounted successfully`,
      `color: ${brandStyles.primary}; font-weight: bold;`
    );
  } catch (error) {
    console.error(
      `%c❌ Failed to mount application:`,
      `color: ${brandStyles.accent}; font-weight: bold;`,
      error
    );
    
    // Fallback UI for critical mount errors
    document.getElementById('root').innerHTML = `
      <div style="
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        font-family: system-ui, -apple-system, sans-serif;
        background-color: #F8F6F4;
        color: #2D3A3A;
        padding: 1rem;
        text-align: center;
      ">
        <div style="
          background-color: #E3F4F4;
          border: 1px solid #D2E9E9;
          border-radius: 1rem;
          padding: 2rem;
          max-width: 400px;
        ">
          <h1 style="font-size: 1.5rem; font-weight: bold; margin-bottom: 0.5rem;">⚠️ Unable to Load Application</h1>
          <p style="color: #5A6E6E; margin-bottom: 1rem;">The application failed to start. Please try refreshing the page.</p>
          <button 
            onclick="window.location.reload()"
            style="
              background-color: #C4DFDF;
              border: 1px solid #D2E9E9;
              padding: 0.5rem 1rem;
              border-radius: 0.75rem;
              font-weight: 600;
              cursor: pointer;
            "
          >
            Refresh Page
          </button>
        </div>
      </div>
    `;
  }
};

renderApp();

// Optional: Hot Module Replacement for development
if (import.meta.hot) {
  import.meta.hot.accept();
  console.log(
    `%c🔥 HMR enabled - Changes will reflect without full reload`,
    `color: ${brandStyles.secondary}; font-size: 10px;`
  );
}