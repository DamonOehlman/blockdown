# blockdown

Blockdown is a simple helper utility that takes a block of
[markdown](http://daringfireball.net/projects/markdown/) as input
and the path a HTML template file and injects the HTML for the markdown
into the HTML element with a `role="content"` attribute.

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

## Reference

You can also use `blockdown` as a node module if so desired also:

### blockdown(input, opts, callback)

To be completed.
