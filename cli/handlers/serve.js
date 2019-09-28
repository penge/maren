const path = require('path');
const express = require('express');

/**
 * Serve <cwd>/_build on [port] (8080)
 */
module.exports = argv => {
  const { cwd, port } = argv;

  const root = path.join(cwd, '_build');
  const draft = path.join(cwd, 'draft');
  const images = path.join(cwd, 'images');
  const notFound = path.join(root, '404.html');

  const app = express();
  app.use('/', express.static(root));
  app.use('/', express.static(draft));
  app.use('/', express.static(images));
  app.use((req, res, next) => {
    res.status(404).sendFile(notFound);
  });

  app.listen(port, () => {
    console.log(`Serving at http://localhost:${port}`);
  });
};
