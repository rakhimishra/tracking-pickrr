import { Outlet, LiveReload, Links, Meta } from 'remix';
import {
  // Links,
  // LiveReload,
  // Meta,
  // Outlet,
  Scripts,
  useLoaderData,
} from '@remix-run/react';
import { useContext } from 'react';
import globalStylesUrl from '~/styles/global.css';
import antdStyles from 'antd/dist/antd.css';
import PickrrHeader from './page-components/pickrr-header';
import StylesContext from './styles-context';
export const links = () => [
  { rel: 'stylesheet', href: antdStyles },
  { rel: 'stylesheet', href: globalStylesUrl },
];

export const meta = () => {
  const description = 'Pickrr Tracking page';
  const keywords = 'remix, react, javascript';

  return {
    description,
    keywords,
  };
};

export default function App() {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  );
}

function Document({ children, title }) {
  const styles = useContext(StylesContext);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        {/* <link rel="icon" href="/favicon.png" type="image/png" /> */}
        {title ? <title>{title}</title> : null}
        <Meta />
        {typeof document === 'undefined' ? '__STYLES__' : null}
        {styles}
        <Links />
      </head>
      <body>
        <PickrrHeader />
        <div className="container"> {children}</div>
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  );
}

function Layout({ children }) {
  // const { user } = useLoaderData();

  return (
    <>
      <div className="container">{children}</div>
    </>
  );
}

export function ErrorBoundary({ error }) {
  return (
    <Document>
      <Layout>
        <h1>Error</h1>
        <p>{error.message}</p>
      </Layout>
    </Document>
  );
}
