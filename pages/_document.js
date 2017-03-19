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
