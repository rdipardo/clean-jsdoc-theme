# clean-jsdoc

<h3 align="center">

[![Package Workflow][]][Package]
[![Chrome, Firefox, IE, Safari on macOS Workflow][]][Chrome, Firefox, IE, Safari on macOS]
[![Chrome on Android, Safari on iOS Workflow][]][Chrome on Android, Safari on iOS]
[![BrowserStack Status Badge][]][BrowserStack Status]
[![Current Release][]][Releases]
</h3>

<div align="center">

![light_code_example](https://raw.githubusercontent.com/rdipardo/clean-jsdoc-theme/gh-pages/img/light_code_example.png)
![light_doc_page](https://raw.githubusercontent.com/rdipardo/clean-jsdoc-theme/gh-pages/img/light_doc_example.png)
![dark_code_example](https://raw.githubusercontent.com/rdipardo/clean-jsdoc-theme/gh-pages/img/dark_code_example.png)
![dark_doc_page](https://raw.githubusercontent.com/rdipardo/clean-jsdoc-theme/gh-pages/img/dark_doc_example.png)
</div>

<hr/>

## Contents

- [Installation](#installation)
- [Getting Started](#quick-start)
- [Adding to Your Workflow](#workflow-integration)
- [Configuration](#options)
  + [Basic Options](#basic)
  + [Advanced Options](#advanced)
    * [project](#project_option)
    * [menu](#menu_option)
    * [meta](#meta_option)
    * [remote_assets](#remote_assets_option)
    * [remote_scripts](#remote_scripts_option)
    * [overlay_scrollbar](#overlay_scrollbar_option)
- [Testing](#testing)
- [License](#license)

## Installation
<i class="fa fa-warning" style="color:#f90;font-size:2em" aria-hidden="true">:warning:</i>

Installing from the [GitHub Package Registry][] ([currently][]) requires a
[personal access token][] (PAT) with the `read:packages` scope.

Be sure to [authenticate with the registry][] via `npm login`, or by adding this
line to a `.npmrc` file in your `$HOME` directory:

~~~text
//npm.pkg.github.com/:_authToken=<YOUR_PERSONAL_ACCESS_TOKEN>
~~~

## Quick start

**GitHub package only**

Add this line to a `.npmrc` file at the root of your project:

~~~text
@rdipardo:registry=https://npm.pkg.github.com
~~~

Install `jsdoc`:

```text
npm i --no-save jsdoc
```

Install the template assets:

**as a GitHub package:**

```text
npm i --save-dev @rdipardo/clean-jsdoc
```

**. . . or, directly from the source tree:**

```text
npm i --save-dev rdipardo/clean-jsdoc-theme
```

Now run:

```text
npx jsdoc path/to/source/files -t node_modules/@rdipardo/clean-jsdoc -r README.md
```

### Workflow Integration

Configure `jsdoc` to use the template in your `.jsdoc.json` file:

If you installed the GitHub package:

```json
  "opts": {
    "template": "node_modules/@rdipardo/clean-jsdoc"
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
        "template": "node_modules/@rdipardo/clean-jsdoc",
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
| `inline_style` | inline CSS for the `head` of the page layout        | CSS string   | `null`                             | any valid CSS markup                          |
| `asset_paths`   | a list of folders to search for scripts and CSS files  | &#91;"path/to/assets", ...&#93;   | `[]`       | >=1 path, relative to your `.jsdoc.json` &#91;&ast;&#93;  |

<hr/>
&#91;&ast;&#93; non-existent paths, or paths outside the working directory, will be ignored with a warning message

### Advanced

#### `"project": {}` <a id="project_option"></a>

Details of your project, e.g.

```json
  "project": {
      "title": "clean-jsdoc",
      "version": "4.0.0",
      "repo": "https://github.com/rdipardo/clean-jsdoc-theme"
  }
```

##### Required properties
| name      | type   |
|:---------:|:------:|
| `repo`    | URL    |

##### Optional properties
| name      | purpose                                                              | type   | default |
|:---------:|:--------------------------------------------------------------------:|:------:|:-------:|
| `title`   | the title of the project; it will appear in every page's `title` tag | string | `null`  |
| `version` | the semantic version number                                          | string | "1.0.0" |


#### `"menu": [{}, ...]` <a id="menu_option"></a>

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


#### `"meta": [{}, ...]` <a id="meta_option"></a>

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


#### `"remote_assets": [{}, ...]`  <a id="remote_assets_option"></a>
A list of `link` tag attributes for asset resources, e.g.

```json5
  "remote_assets": [
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


#### `"remote_scripts": [{}, ...]` <a id="remote_scripts_option"></a>
A list of `script` tag attributes for third-party JavaScript sources. e.g.

```json5
  "remote_scripts": [
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

Mostly the same as [`remote_assets`](#optional_asset_attrs)


#### `"overlay_scrollbar": { "options": {} }` <a id="overlay_scrollbar_option"></a>
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

Distributed under the terms of the [MIT license][Read the MIT].

[clean-jsdoc-theme]: https://github.com/ankitskvmdam/clean-jsdoc-theme
[Fuse.js]: https://fusejs.io/
[OverlayScrollbars]: https://kingsora.github.io/OverlayScrollbars/#!documentation/options
[HTML metadata attributes]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#Attributes
[link attributes]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link#Attributes
<!-- badges -->
[Package Workflow]: https://github.com/rdipardo/clean-jsdoc-theme/actions/workflows/publish.yml/badge.svg
[Package]: https://github.com/rdipardo/clean-jsdoc-theme/actions/workflows/publish.yml
[Chrome, Firefox, IE, Safari on macOS Workflow]: https://github.com/rdipardo/clean-jsdoc-theme/workflows/Chrome,%20Firefox,%20IE,%20Safari%20on%20macOS/badge.svg?branch=develop
[Chrome, Firefox, IE, Safari on macOS]: https://github.com/rdipardo/clean-jsdoc-theme/actions?query=workflow%3AIE
[Chrome on Android, Safari on iOS Workflow]: https://github.com/rdipardo/clean-jsdoc-theme/workflows/Chrome%20on%20Android,%20Safari%20on%20iOS/badge.svg?branch=develop
[Chrome on Android, Safari on iOS]: https://github.com/rdipardo/clean-jsdoc-theme/actions?query=workflow%3AAndroid
[BrowserStack Status]: https://automate.browserstack.com/public-build/UmpiQjdrd0h6SGt6YlJYWUUvcERSRXNmZUpaR2pFVFJQb0I0MGwrM0dVcz0tLS9ENVVPc1I1eW5NQUF5MWFEUzUrOUE9PQ==--8a4ece5b7c6ffbe261a062d49079b8408b32760c
[BrowserStack Status Badge]: https://automate.browserstack.com/badge.svg?badge_key=UmpiQjdrd0h6SGt6YlJYWUUvcERSRXNmZUpaR2pFVFJQb0I0MGwrM0dVcz0tLS9ENVVPc1I1eW5NQUF5MWFEUzUrOUE9PQ==--8a4ece5b7c6ffbe261a062d49079b8408b32760c
[Read the MIT]: https://github.com/rdipardo/clean-jsdoc-theme/blob/master/LICENSE
[Releases]: https://github.com/rdipardo/clean-jsdoc-theme/releases
[Current Release]: https://img.shields.io/github/package-json/v/rdipardo/clean-jsdoc-theme?logo=github
[GitHub Package Registry]: https://docs.github.com/en/packages/guides/configuring-npm-for-use-with-github-packages#authenticating-with-a-personal-access-token
[currently]: https://github.community/t/download-from-github-package-registry-without-authentication/14407/2
[authenticate with the registry]: https://docs.github.com/en/packages/guides/configuring-npm-for-use-with-github-packages#installing-a-package
[personal access token]: https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token
