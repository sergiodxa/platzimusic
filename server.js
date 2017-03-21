const express = require('express');
const next = require('next');
const LRUCache = require('lru-cache');
const fetch = require('isomorphic-fetch');
const { format } = require('url');


const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handler = app.getRequestHandler();


const apiCache = new LRUCache({
  max: 2000,
  maxAge: 1000 * 60 * 60, // 1 hour
});
const ssrCache = new LRUCache({
  max: 100,
  maxAge: 1000 * 60 * 60, // 1 hour
});


/**
 * Check if the page is already in cache and render it if not
 * @method renderAndCache
 * @param  {Object}       req         The HTTP request
 * @param  {Object}       res         The HTTP response
 * @param  {string}       pagePath    The page to render
 * @param  {Object}       queryParams The query params to use
 */
function renderAndCache(req, res, pagePath, queryParams) {
  const key = req.url;

  if (ssrCache.has(key)) {
    process.stdout.write(`SSR CACHE HIT: ${key}\n`);
    res.send(ssrCache.get(key));
    return;
  }

  app
  .renderToHTML(req, res, pagePath, queryParams)
  .then((html) => {
    process.stdout.write(`SSR CACHE MISS: ${key}\n`);
    ssrCache.set(key, html);
    res.send(html);
  })
  .catch((error) => {
    app.renderError(error, req, res, pagePath, queryParams);
  });
}


/**
 * Check if the API response is in cache and fetch it if not
 * @method fetchAndCache
 * @param  {Object}      req         The HTTP request
 * @param  {Object}      res         The HTTP response
 * @param  {Object}      queryParams The query params to use
 */
function fetchAndCache(req, res, query) {
  const key = format({
    protocol: 'https',
    pathname: '/v1/search',
    hostname: 'api.spotify.com',
    query,
  });

  if (apiCache.has(key)) {
    process.stdout.write(`API CACHE HIT: ${key}\n`);
    res.json(JSON.parse(apiCache.get(key)));
    return;
  }

  fetch(key)
    .then(response => response.json())
    .then((data) => {
      process.stdout.write(`API CACHE MISS: ${key}\n`);
      apiCache.set(key, JSON.stringify(data));
      res.json(data);
    })
    .catch(() => {
      res.status(500).send('Error');
    });
}


app
.prepare()
.then(() => {
  const server = express();

  server.get('/results', (req, res) => renderAndCache(req, res, '/results', req.query));

  server.get('/api', (req, res) => fetchAndCache(req, res, req.query));

  server.get('*', (req, res) => handler(req, res));

  server.listen(process.env.PORT || 3000);
});
