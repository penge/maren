# Maren

**A simple, fast, customizable, theme based static site generator.**

# [-> Documentation](https://maren.io)

# Install

### Global

```
~ $ npm install -g maren
```

### Local (preferred)

```
~ $ mkdir myblog
~ $ cd myblog

~/myblog $ npm init -y
~/myblog $ npm install maren
```

# CLI

```
~/myblog $ npx maren init
~/myblog $ npx maren build
~/myblog $ npx maren watch
~/myblog $ npx maren serve [--port]
```

# Folder structure

```
.gitignore

/_build # Generated, don't touch
/documents
/draft
/static
/themes

/maren.json
/package-lock.json
/package.json
```
