# blockdown

Blockdown is a simple helper utility that takes a block of
[markdown](http://daringfireball.net/projects/markdown/) as input
and the path a HTML template file and injects the HTML for the markdown
into the HTML element with a `role="content"` attribute.


[![NPM](https://nodei.co/npm/blockdown.png)](https://nodei.co/npm/blockdown/)

[![stable](https://img.shields.io/badge/stability-stable-green.svg)](https://github.com/badges/stability-badges) [![Dependency Status](https://david-dm.org/DamonOehlman/blockdown.svg)](https://david-dm.org/DamonOehlman/blockdown) 

## Usage

It's designed to be used as a command line tool like so:

```
blockdown <templateFile>
```

It will look to read the markdown input from `stdin` and will write the
combined output to `stdout`.  The only argument that it expects is
`<templateFile>` which is the html template that the content will be
injected into.

So a full example would look something like:

```
blockdown templates/page.html < README.md > pages/readme.html
```

If your template contains simple template section that are recognised by
[formatter](https://github.com/DamonOehlman/formatter) (e.g. `{{ a }}`)
you can specify values for these values using command-line arguments:

```
blockdown templates/page.html --a=b < README.md > pages/readme.html
```

## Reference

You can also use `blockdown` as a node module if so desired also:

### blockdown(input, opts, callback)

To be completed.

## License(s)

### MIT

Copyright (c) 2014 Damon Oehlman <damon.oehlman@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
