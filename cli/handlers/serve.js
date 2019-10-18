const path = require('path');
const express = require('express');

/**
 * Serve <cwd>/_build on [port] (8080)
 */
module.exports = argv => {
  const { cwd, port } = argv;

  const root = path.join(cwd, '_build');
  const draft = path.join(cwd, 'draft');
  const notFound = path.join(root, '404.html');

  const app = express();
  app.use('/', express.static(root));
  app.use('/', express.static(draft));
  app.use((req, res, next) => {
    res.status(404).sendFile(notFound, err => {
      if (err) {
        res.status(404).send('404 Not Found');
      }
    });
  });

  app.listen(port, () => {
    console.log(`Serving at http://localhost:${port}`);
  });
};
