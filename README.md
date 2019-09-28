# Maren

[![Maren](https://img.shields.io/badge/MAREN.IO-blue?style=for-the-badge)](https://maren.io)

Theme based markdown renderer.

## Installation

```
npm i -g maren
```

## Workflow

```
╔══════════╗
║ [1] init ║
╚══════════╝

$ cd by-blog
$ maren init

Grab existing theme or create your own.
Put theme files inside /themes/themeName/

╔═════════════════════╗
║ [2] write markdowns ║
╚═════════════════════╝

/documents/index.md
/documents/404.md
/documents/my-first-article/index.md
/draft/not-ready-article/index.md

╔═════════════════╗
║ [3] watch/serve ║
╚═════════════════╝

$ maren watch
$ maren watch --once (equivalent to build)

$ maren serve
$ maren serve --port=3000

╔════════════╗
║ [4] upload ║
╚════════════╝

(provided by plugin maren-s3)

$ maren upload pavelbucka
$ maren upload pavelbucka --html --dryrun

╔═════════════╗
║ back to [2] ║
╚═════════════╝
```

## CLI

```
# Commands
$ maren init
$ maren watch [--once]
$ maren serve [--port]

# Commands provided by maren-s3
$ maren upload <bucket>
  [--themes]
  [--images]
  [--html]
  [--dryrun]
```

## Folder structure

```
# Created by maren watch
/_build

/documents
/draft
/images
/themes

maren.json
package-lock.json
package.json
```

## Documents, Draft

```
/documents
  /article-a/index.md
  /article-b/index.md
  /article-c/index.md
  index.md
  404.md

/draft
  /not-ready-article-a/index.md
  /not-ready-article-b/index.md
  /not-ready-article-c/index.md
```

## Themes

```
/themes
  /default
    # Required
    template.js

    # Optional
    options.json
    styles.min.css
    scripts.min.js
    scripts.min.js.map

    # Optional other
    package-lock.json
    package.json
```

## Build

```
/_build
  /article-a/index.html
  /article-b/index.html
  /article-c/index.html
  index.html
  404.html

  /images
  /themes
    /default
      styles-MD5SUM.css
      scripts-MD5SUM.js
```

## Plugins

```
[1] $ cd my-blog
[2] $ npm init # if not done before
[3] $ npm i <plugin_name>
[4] Update maren.json to use <plugin_name>
```

## maren.json

```json
{
  "theme": "my-theme",
  "plugins": [
    "maren-s3"
  ]
}
```

If `theme` not specified, `default` is used.
