import { createBrowserRouter } from 'react-router-dom';
import { Suspense, createElement } from 'react';

import App from 'App';

import { Layout, NotFound } from 'shared';
import { DefaultSeoHeader, ROUTE_MAP } from 'components';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      errorElement: (
        <Suspense fallback={null}>
          <NotFound />
        </Suspense>
      ),
      children: [
        {
          element: <Layout />,
          children: [
            ...Object.entries(ROUTE_MAP).map(([PATH, DATA]) => {
              return {
                path: PATH,
                element: (
                  <>
                    {createElement(DATA.COMPONENT)}
                    {createElement(DATA.SEO_HEADER ?? DefaultSeoHeader)}
                  </>
                ),
              };
            }),
          ],
        },
      ],
    },
  ],
  { basename: process.env.PUBLIC_URL },
);

export default router;
