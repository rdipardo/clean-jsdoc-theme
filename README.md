# clean-jsdoc

<h3 align="center">

[![Build Docs Workflow][]][Build Docs]
[![Chrome, Firefox, IE, Safari on macOS Workflow][]][Chrome, Firefox, IE, Safari on macOS]
[![Chrome on Android, Safari on iOS Workflow][]][Chrome on Android, Safari on iOS]
[![BrowserStack Status Badge][]][BrowserStack Status]
[![License: MIT][]][Read the MIT]
</h3>

<div align="center">

![light_doc_page](https://heredocs.com/clean-jsdoc-theme/img/light_doc_example_2.png)
![light_code_example](https://heredocs.com/clean-jsdoc-theme/img/light_code_example.png)
![dark_doc_page](https://heredocs.com/clean-jsdoc-theme/img/dark_doc_example_2.png)
![dark_code_example](https://heredocs.com/clean-jsdoc-theme/img/dark_code_example.png)
</div>

- [Getting Started](#quick-start)
- [Adding to Your Workflow](#workflow-integration)
- [Configuration](#options)
  + [Basic Options](#basic)
  + [Advanced Options](#advanced)
- [Testing](#testing)
- [License](#license)

## Quick start

Install `jsdoc`:

```text
npm i --save-dev jsdoc
```

Install the template assets:

```text
npm i --save-dev rdipardo/clean-jsdoc-theme
```

Now run:

```text
npx jsdoc path/to/source/files -t node_modules/clean-jsdoc -r README.md
```

### Workflow Integration

Configure `jsdoc` to use the template in your `.jsdoc.json` file:

```json
  "opts": {
    "template": "node_modules/clean-jsdoc"
  }
```

For example:

```json5
{
    "plugins": ["plugins/markdown"],
    "markdown": {
        "idInHeadings": true
    },
    "source": {
        "include": ["lib", "README.md"],
        "includePattern": ".+\\.js(doc|x)?$",
        "excludePattern": "(node_modules/|docs)"
    },
    "sourceType": "module",
    "tags": {
        "allowUnknownTags": true,
        "dictionaries": ["jsdoc", "closure"]
    },
    "opts": {
        "template": "node_modules/clean-jsdoc",
        /* see below */
        "theme_opts": {},
        "encoding": "utf8",
        "readme": "./README.md",
        "destination": "docs/",
        "recurse": true
    }
}
```

Add a script to your `package.json`:

```json5
  "script": {
    /* ... */
    "gendocs": "node_modules/.bin/jsdoc -c .jsdoc.json --verbose"
  }
```

Build your documentation with: `npm run gendocs`

## Options

_All options must be defined under `opts.theme_opts` in your `.jsdoc.json`_

### Basic

| name           | purpose                                             | type         | default                            | options                                       |
|:--------------:|:---------------------------------------------------:|:------------:|:----------------------------------:|:---------------------------------------------:|
| `theme`        | the overall style theme                             | string       | `"light"`                          | `"light"`, `"dark"`                           |
| `search`       | enable fuzzy search using [Fuse.js][]               | bool         | `true`                             | `true`, `false`                               |
| `langNames`    | display language names in code blocks               | bool         | `true`                             | `true`, `false`                               |
| `title`        | the name of the home link to display on the nav bar | HTML string  | `"README"`                         | any valid HTML markup, or just a plain string |
| `footer`       | a footer to display in the page layout              | HTML string  | JSDoc version, date and theme info | any valid HTML markup                         |
| `create_style` | inline CSS for the `head` of the page layout        | CSS string   | `null`                             | any valid CSS markup                          |
| `add_scripts`  | inline JavaScript to add to the page layout         | JS string    | `null`                             | any valid JS code                             |
| `static_dir`   | a list of asset folders to copy to the output dir   | &#91;"/asset/dir", ...&#93;        | `[]`         | >=1 path, relative to your `.jsdoc.json`      |
| `include_css`  | a list of stylesheets to copy to the output dir     | &#91;"path/to/style.css", ...&#93; | `[]`         | >=1 stylesheet file path                      |
| `include_js`   | a list of scripts to copy to the output dir         | &#91;"path/to/script.js", ...&#93; | `[]`         | >=1 script file path                          |

### Advanced

#### `"project": {}`

Details of your project, e.g.

```json
  "project": {
      "title": "clean-jsdoc",
      "version": "2.2.0",
      "repo": "https://github.com/rdipardo/clean-jsdoc-theme"
  }
```

##### Required properties
| name      | type   |
|:---------:|:------:|
| `version` | string |
| `repo`    | URL    |

##### Optional properties
| name    | purpose                                                              | type   |
|:-------:|:--------------------------------------------------------------------:|:------:|
| `title` | the title of the project; it will appear in every page's `title` tag | string |


#### `"menu": [{}, ...]`

A list of hyperlinks to add to the navigation bar, e.g.

```json
  "menu": [
    {
      "title": "Website",
      "link": "https://heredocs.com",
      "target": "_blank",
      "class": "some-class",
      "id": "some-id"
    }
  ]
```
##### Required properties
| name    | type   |
|:-------:|:------:|
| `title` | string |
| `link`  | URL    |

##### Optional properties
| name     | type                  |
|:--------:|:---------------------:|
| `target` | HTML target attribute |
| `class`  | CSS class selector    |
| `id`     | CSS id selector       |

#### `"meta": [{}, ...]`

A list of `meta` tag attributes to add to the `head` of each page, e.g.

```json
  "meta": [
      {
        "name": "author",
        "content": "Ankit Kumar"
      },
      {
        "name": "description",
        "content": "Best Clean and minimal JSDoc 3 Template/Theme"
      }
    ]
```
##### Required properties
Any valid combinaton of [HTML metadata attributes][].

#### `"add_assets": [{}, ...]`
A list of `link` tag attributes for asset resources, e.g.

```json5
  "add_assets": [
    {
      "href": "https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css",
      "integrity": "sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1",
      "crossorigin": "anonymous"
    },
    {
      "href": "img/favicon.ico",
      "rel": "shortcut icon",
      "type": "image/x-icon"
    }
  ]
```

##### Required properties
| name    | type   |
|:-------:|:------:|
| `href`  | URL    |

##### Optional properties <a id="optional_asset_attrs"></a>
| name          | purpose                                         | type   |
|:-------------:|:-----------------------------------------------:|:------:|
| `integrity`   | A Subresource Integrity hash in base64 encoding | string |
| `crossorigin` | The CORS policy for the resource                | string |
<br/>

Some assets will need additional [link attributes][] to load properly.

As of version 2.0.0, this template can detect stylesheets and shortcut
icons from the file extension in the `href`. Support for more media types
may be added in future releases.

#### `"add_script_path": [{}, ...]`
A list of `script` tag attributes for third-party JavaScript sources. e.g.

```json5
  "add_script_path": [
    {
      "src": "https://code.jquery.com/jquery-3.5.1.js",
      "integrity": "sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc=",
      "crossorigin": "anonymous"
    }
  ]
```

##### Required properties

| name    | type   |
|:-------:|:------:|
| `src`   | URL    |

##### Optional properties

Mostly the same as [`add_assets`](#optional_asset_attrs)


#### `"overlay_scrollbar": { "options": {} }`
Includes the [OverlayScrollbars] plugin.

##### Required properties
None. Simply passing an empty object will activate this feature.

##### Optional properties
Any option supported by [OverlayScrollbars].


## Testing

To preview a small demo website, first run:

```text
git clone https://github.com/rdipardo/clean-jsdoc-theme.git clean-jsdoc
cd clean-jsdoc
npm i && npm i jsdoc --no-save
```

On Windows, run:

```text
npm run test:win
```

Otherwise:

```text
npm test
```

If `xdg-open` is available on your system, you can build and preview the site in one step with:

```text
npm run browse
```

## License

Copyright (c) 2019 [Ankit Kumar](https://github.com/ankitskvmdam/)<br/>
Copyright (c) 2020 [Robert Di Pardo](https://github.com/rdipardo/)

Distributed under the terms of the MIT license.

[clean-jsdoc-theme]: https://github.com/ankitskvmdam/clean-jsdoc-theme
[Fuse.js]: https://fusejs.io/
[OverlayScrollbars]: https://kingsora.github.io/OverlayScrollbars/#!documentation/options
[HTML metadata attributes]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#Attributes
[link attributes]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link#Attributes
<!-- badges -->
[Build Docs Workflow]: https://github.com/rdipardo/clean-jsdoc-theme/workflows/Build%20Docs/badge.svg?branch=master
[Build Docs]: https://github.com/rdipardo/clean-jsdoc-theme/actions?query=workflow%3ADocs
[Chrome, Firefox, IE, Safari on macOS Workflow]: https://github.com/rdipardo/clean-jsdoc-theme/workflows/Chrome,%20Firefox,%20IE,%20Safari%20on%20macOS/badge.svg?branch=master
[Chrome, Firefox, IE, Safari on macOS]: https://github.com/rdipardo/clean-jsdoc-theme/actions?query=workflow%3AIE
[Chrome on Android, Safari on iOS Workflow]: https://github.com/rdipardo/clean-jsdoc-theme/workflows/Chrome%20on%20Android,%20Safari%20on%20iOS/badge.svg?branch=master
[Chrome on Android, Safari on iOS]: https://github.com/rdipardo/clean-jsdoc-theme/actions?query=workflow%3AAndroid
[BrowserStack Status]: https://automate.browserstack.com/public-build/UmpiQjdrd0h6SGt6YlJYWUUvcERSRXNmZUpaR2pFVFJQb0I0MGwrM0dVcz0tLS9ENVVPc1I1eW5NQUF5MWFEUzUrOUE9PQ==--8a4ece5b7c6ffbe261a062d49079b8408b32760c
[BrowserStack Status Badge]: https://automate.browserstack.com/badge.svg?badge_key=UmpiQjdrd0h6SGt6YlJYWUUvcERSRXNmZUpaR2pFVFJQb0I0MGwrM0dVcz0tLS9ENVVPc1I1eW5NQUF5MWFEUzUrOUE9PQ==--8a4ece5b7c6ffbe261a062d49079b8408b32760c
[License: MIT]: https://img.shields.io/github/license/rdipardo/clean-jsdoc-theme.svg?logo=Github
[Read the MIT]: https://github.com/rdipardo/clean-jsdoc-theme/blob/master/LICENSE
