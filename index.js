#!/usr/bin/env node

var     cheerio = require('cheerio'),
         repl = require('repl'),
    argv = require('minimist')(process.argv.slice(2)),
    request = require('request');


var usage = "\nUsage: \n\n"+
        "a) index --page <URL> \n" +
        "b) index --html <FILE>" +
        "\n";

//
// Debug
//
if(argv.v) console.dir(argv);

//
// Validations
//

if((argv.page && argv.html) || ( !argv.page && !argv.html ) || (process.argv.length < 3)) {
    console.log(usage);
    return;
}

//
// Page
//

if(argv.page) {

    console.log("Loading Webpage...");
    console.log("URL:", argv.page);
    request.get(argv.page, function(err, res, html) {

        if (err) { throw err; }

        var context = repl.start("cheerio> ", null, null, null, true).context;
        context.res = res;
        context.$ = cheerio.load(html);
    });
}

//
// HTML
//

if(argv.html) {

    console.log("Loading Webpage with local file...");
    console.log("FILE:", argv.html);

    fs = require('fs');
    fs.readFile(argv.html, 'utf8', function (err, html) {
        if (err) {
            return console.log(err);
        }
        var context = repl.start("cheerio> ", null, null, null, true).context;
//        context.res = res;
        context.$ = cheerio.load(html);
    });
}
