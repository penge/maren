# maren.json

A configuration file to set theme and plugins.
Not required to exist.

## Example

```json
{
  "theme": "default",
  "plugins": [
    "maren-s3"
  ]
}
```

## Location

```
<blog>/maren.json
```

## Theme

1. Copy the files to:

```
<blog>/themes/<theme>/
```

2. Update `maren.json`

**Note:** If theme is set to an empty string,
or `maren.json` does not exist,
a built-in theme will be used.
