# Popsicle Status

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]

Popsicle middleware for rejecting responses with bad HTTP statuses.

## Installation

```
npm install popsicle-status --save
```

## Usage

```js
import { status } from "popsicle-status";

const middleware = status();

const res = await middleware(req, send);
```

### **status(min?: number, max?: number)**

Default status codes of min `200` (inclusive) and max `400` (exclusive).

## TypeScript

This project is written using [TypeScript](https://github.com/Microsoft/TypeScript) and publishes the definitions directly to NPM.

## License

MIT

[npm-image]: https://img.shields.io/npm/v/popsicle-status.svg?style=flat
[npm-url]: https://npmjs.org/package/popsicle-status
[downloads-image]: https://img.shields.io/npm/dm/popsicle-status.svg?style=flat
[downloads-url]: https://npmjs.org/package/popsicle-status
[travis-image]: https://img.shields.io/travis/blakeembrey/popsicle-status.svg?style=flat
[travis-url]: https://travis-ci.org/blakeembrey/popsicle-status
[coveralls-image]: https://img.shields.io/coveralls/blakeembrey/popsicle-status.svg?style=flat
[coveralls-url]: https://coveralls.io/r/blakeembrey/popsicle-status?branch=master
