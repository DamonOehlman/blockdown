/* jshint node: true */
'use strict';

var fs = require('fs');
var path = require('path');
var brucedown = require('brucedown');
var extend = require('cog/extend');
var formatter = require('formatter');
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

**/
module.exports = function(input, opts, callback) {
  var contentHandler;
  var template = (opts || {}).template;
  var parser;
  var templateData = extend({
    tick: Date.now()
  }, opts);

  // if the template is not defined, then use a default template
  if (! template) {
    template = path.join(defaultTemplates, 'simple.html');
  }
  else {
    if (path.extname(template) === '') {
      template += '.html';
    }

    // look in the local directory
    template = fs.existsSync(path.resolve(template)) ?
      path.resolve(template) :
      path.resolve(defaultTemplates, template);
  }

  // if the template does not exist, then return an error
  if (! fs.existsSync(template)) {
    return callback(new Error('could not locate template: ' + template));
  }

  // parse the markdown html content
  contentHandler = new htmlparser.DomHandler(function(err, mdDom) {
    if (err) {
      return callback(err);
    }

    // load the template file
    fs.readFile(template, 'utf8', function(err, html) {
      var templateParser;

      if (err) {
        return callback(err);
      }

      // create the template parser
      templateParser = new htmlparser.Parser(cornet);

      cornet.select('*[role="content"]', function(elem) {
        // remove the children
        elem.children = [].concat(mdDom);
      });

      cornet.once('dom', function(dom) {
        callback(null, dom.map(DomUtils.getOuterHTML).join(''));
      });

      // format the template content
      html = formatter(html, { ignoreNumeric: true})(templateData);

      // write the html into the template parser
      templateParser.write(html);
      templateParser.end();
    });
  });

  // write the markdown content to the htmlparser
  parser = new htmlparser.Parser(contentHandler);

  // preprocess the input replacing {{ }} directives
  input = formatter(input, { ignoreNumeric: true })({
    tick: Date.now()
  });

  brucedown(input, function(err, html) {
    if (err) {
      return callback(err);
    }

    parser.write(html);
    parser.done();
  });
};