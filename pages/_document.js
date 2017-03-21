import React from 'react';
import Document, { Head, NextScript, Main } from 'next/document';
import styleSheet from 'styled-components/lib/models/StyleSheet';


class PlatziMusic extends Document {
  static async getInitialProps({ renderPage }) {
    const page = renderPage();
    const styles = (
      <style
        dangerouslySetInnerHTML={{ // eslint-disable-line
          __html: styleSheet.rules().map(rule => rule.cssText.trim()).join('\n'),
        }}
      />
    );
    return { ...page, styles };
  }

  render() {
    return (
      <html lang="es">
        <Head>
          <meta charSet="utf-8" />
          <title>PlatziMusic</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Quicksand"
          />
          <meta
            name="description"
            content="Diplomado de desarrollo de aplicaciones con React.js"
          />
          <meta
            name="language"
            content="es"
          />
          <meta
            name="author"
            content="Platzi"
          />
          <meta
            name="pagename"
            content="PlatziMusic"
          />
          <meta
            name="HandheldFriendly"
            content="True"
          />
          <meta
            name="MobileOptimized"
            content="320"
          />
          <meta
            name="apple-mobile-web-app-title"
            content="PlatziMusic"
          />
          <meta
            content="IE=edge,chrome=1"
            httpEquiv="X-UA-Compatible"
          />
          {/* Twitter Card */}
          <meta
            name="twitter:card"
            value="summary"
          />
          <meta
            name="twitter:site"
            value="@platzi"
          />
          <meta
            name="twitter:creator"
            value="@platzi"
          />
          <meta
            name="twitter:url"
            value="https://platzi-music.now.sh/"
          />
          <meta
            name="twitter:title"
            value="PlatziMusic"
          />
          <meta
            name="twitter:description"
            value="Diplomado de desarrollo de aplicaciones con React.js"
          />
          <meta
            name="twitter:image"
            value="/static/og.png"
          />
          <meta
            name="twitter:summary"
            value="Diplomado de desarrollo de aplicaciones con React.js"
          />
          {/* OpenGraph */}
          <meta
            property="og:type"
            content="website"
          />
          <meta
            property="og:title"
            content="PlatziMusic"
          />
          <meta
            property="og:description"
            content="Diplomado de desarrollo de aplicaciones con React.js"
          />
          <meta
            property="og:image"
            content="/static/og.png"
          />
          <meta
            property="og:url"
            content="https://platzi-music.now.sh/"
          />
          <meta
            property="og:site_name"
            content="PlatziMusic"
          />
          <meta
            property="og:locale"
            content="es"
          />
        </Head>
        <body id="PlatziMusic" role="application">
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}


export default PlatziMusic;
