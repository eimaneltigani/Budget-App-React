import React from 'react';
import ReactDOM from 'react-dom/client';


import firebase, { FirebaseContext } from './components/Firebase';
import App from './components/App';

// Redux store
import { Provider } from 'react-redux';
import { store } from './redux/store';

// Styling
import GlobalStyle from './components/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import { theme } from './tailwind.js';
import './css/tailwind.css';


import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <FirebaseContext.Provider value={new firebase()}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <App />
        </ThemeProvider>
    </FirebaseContext.Provider>
  </Provider>
);
  

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
