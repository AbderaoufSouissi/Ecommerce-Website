import { createRoot } from 'react-dom/client';
import './index.css';
import 'react-multi-carousel/lib/styles.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes.ts';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';

createRoot(document.getElementById('root')!).render(
 
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
 
);
