## 2.2.0

### Fixed
- render `@example` metadata with proper code block style
- modify `prettify.js` to stop syntax highlighting in code blocks with
  the `text` file type so that markup like this:

  <code>

  &#96;&#96;&#96;text<br/>
  npm i && npm i jsdoc --no-save<br/>
  &#96;&#96;&#96;
  </code>

  looks like this:

  ![fixed_text_block](https://raw.githubusercontent.com/rdipardo/clean-jsdoc-theme/master/.github/img/v2.2.0/after.png)

  and _not_ like this:

  ![v2.1.0_text_block](https://raw.githubusercontent.com/rdipardo/clean-jsdoc-theme/master/.github/img/v2.2.0/before.png)

### Changed
- make one default set of code style rules; keep some thematic variations
  for better contrast

## 2.1.0

### Fixed
- restore the `dynamicStyle` property that was accidentally removed
  from the layout template in the previous release
- restrict the `.pre-top-bar-container` style to actual code blocks so
  that markup like this:

```markdown
##Example

    /full/name/of/some/path
```

  looks like this:

  ![fixed_code_container](https://raw.githubusercontent.com/rdipardo/clean-jsdoc-theme/master/.github/img/v2.1.0/after.png)

  and _not_ like this:

  ![v2.0.0_code_container](https://raw.githubusercontent.com/rdipardo/clean-jsdoc-theme/master/.github/img/v2.1.0/before.png)

## 2.0.0

### Added
- new features introduced by [upstream][]
- the `add_assets` option will generate a `link` tag for stylesheets and
  image icons (so far) when only an `href` attribute is provided.
  Otherwise, it behaves the same as the (removed) `add_style_path` option

### Changed
- ~~add_style_path~~

## 1.0.0

### Fixed
- use `position: absolute;` to keep the navigation toggle button inside
  the view-port on small mobile screens

### Changed
- versioning scheme is now independent of upstream

### Added
- provide fonts in `.eot`, `svg`, `.woff` and `woff2` file formats
- JS assets are now compiled to make them safe for IE 11

## 2.2.14.02

### Fixed
- the `langNames` option is now properly detected by the layout template
- the `demo/copy.cmd` script works now

### Changed
- the nav bar's top margin is always dynamically set, with or without the search box present
- show [npm installation steps][] in the README

### Added
-  special development scripts for Windows users

## 2.2.14.01

### Fixed
- only code is copied to the clipboard, with no extra HTML markup

### Changed
- use web-friendly Google fonts
- tweak styles, layout

### Added
- new `langNames` option to hide language names from code blocks
- new `project` option to display version and repo information

## In version 2.2.14

### Bug Fix

1.  Malformed HTML when parsing 'default' JSDoc tags [issue: [#48](https://github.com/ankitskvmdam/clean-jsdoc-theme/issues/48)]

## In version 2.2.13

### New

1.  Make the # before members and methods a clickable anchor. [pull request: [#44](https://github.com/ankitskvmdam/clean-jsdoc-theme/pull/44)] [Thanks to [GMartigny](https://github.com/GMartigny)]

### Other

1.  Change jsdoc into a peerDependency [pull request: [#45](https://github.com/ankitskvmdam/clean-jsdoc-theme/pull/45)][Thanks to [GMartigny](https://github.com/GMartigny)]

## In version 2.2.12

### New

1.  Add dark theme.

### Bug fix

1.  Fix typescript-eslint camelCase rule issue [issue: [#37](https://github.com/ankitskvmdam/clean-jsdoc-theme/issues/37)]
1.  Fix ordered list style [issue: [#40](https://github.com/ankitskvmdam/clean-jsdoc-theme/issues/40)]
1.  Fix code overflow issue.

[upstream]: https://github.com/ankitskvmdam/clean-jsdoc-theme/commits/master
[npm installation steps]: https://github.com/rdipardo/clean-jsdoc-theme#quick-start
