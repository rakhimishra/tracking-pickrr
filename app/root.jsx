import { Outlet, LiveReload, Links, Meta } from "remix";
import {
  // Links,
  // LiveReload,
  // Meta,
  // Outlet,
  Scripts,
  useLoaderData,
} from "@remix-run/react";
import globalStylesUrl from "~/styles/global.css";
import antdStyles from "antd/dist/antd.css";
import PickrrHeader from "./page-components/pickrr-header";
export const links = () => [
  { rel: "stylesheet", href: antdStyles },
  { rel: "stylesheet", href: globalStylesUrl },
];

export const meta = () => {
  const description = "Pickrr Tracking page";
  const keywords = "remix, react, javascript";

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
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        {typeof document === "undefined" ? "__STYLES__" : null}

        <Links />
        <title>Pickrr Tracking Page</title>
      </head>
      <body>
        <PickrrHeader />
        <div className="container"> {children}</div>

        {process.env.NODE_ENV === "development" ? <LiveReload /> : null}
        {/* <Scripts /> */}
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
