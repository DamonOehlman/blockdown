/* jshint node: true */
'use strict';

var fs = require('fs');
var path = require('path');
var brucedown = require('brucedown');
var htmlparser = require('htmlparser2');
var Cornet = require('cornet');
var DomUtils = require('domutils');
var cornet = new Cornet();
var defaultTemplates = path.resolve(__dirname, 'templates');

/**
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

**/
module.exports = function(input, opts, callback) {
  var contentHandler;
  var template = (opts || {}).template;
  var parser;

  // if the template is not defined, then use a default template
  if (! template) {
    template = path.join(defaultTemplates, 'simple.html');
  }
  else {
    template = path.resolve(template);
  }

  // if the template does not exist, then return an error
  if (! fs.existsSync(template)) {
    return callback(new Error('could not locate template:' + template));
  }

  // parse the markdown html content
  contentHandler = new htmlparser.DomHandler(function(err, mdDom) {
    if (err) {
      return callback(err);
    }

    // now parse the template
    parser = new htmlparser.WritableStream(cornet);
    fs.createReadStream(template).pipe(parser);

    cornet.select('*[role="content"]', function(elem) {
      // remove the children
      elem.children = [].concat(mdDom);
    });

    cornet.on('dom', function(dom) {
      callback(null, dom.map(DomUtils.getOuterHTML).join(''));
    });
  });

  // write the markdown content to the htmlparser
  parser = new htmlparser.Parser(contentHandler);

  brucedown(input, function(err, html) {
    if (err) {
      return callback(err);
    }

    parser.write(html);
    parser.done();
  });
};