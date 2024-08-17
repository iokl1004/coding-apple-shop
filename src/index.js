import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import App2 from './App2';  // 성능개선 3 : useTransition, useDeferredValue
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store.js'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'  

// react-query 설정
const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // react-query 설정
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <App />

        {/* 성능개선 3 : useTransition, useDeferredValue */}
        {/* <App2 /> */}
      </BrowserRouter>
    </Provider>
  </QueryClientProvider>
);