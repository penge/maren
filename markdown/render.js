const parse = require('./parse');

/**
 * Render markdown
 */
module.exports = (markdown, theme) => {
  const {
    beforeRender,
    template,
    options
  } = theme;

  const parsed = parse(markdown);

  let data = {
    ...parsed,
    '_theme': options || {}
  };

  if (beforeRender) {
    data = beforeRender(data);
  }

  const html = template(data);
  return html;
};
