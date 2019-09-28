const yamlFront = require('yaml-front-matter');
const marked = require('marked');
const markdownToc = require('markdown-toc');

/**
 * Parse markdownString and return { ...front, html }
 *
 * Front:
 * - title      // string; if omitted, first # is used
 * - toc        // boolean; if true, sets toc as []
 * - ...(any other)
 */
module.exports = markdownString => {
  const front = yamlFront.loadFront(markdownString);
  let {
    title,
    toc: showtoc,
    __content,
    ...other
  } = front;

  const tocJson = markdownToc(__content).json;

  // Use first heading (in markdown as #) as default title
  if (!title) title = tocJson[0] && tocJson[0].content;

  // Get TOC, but exclude first heading (in markdown as #)
  const toc = showtoc && tocJson.length > 1 && tocJson.splice(1);
  const html = marked(__content);

  return {
    title,
    toc,
    ...other,
    html
  };
};
