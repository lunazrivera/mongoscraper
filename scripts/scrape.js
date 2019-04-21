// Scrape Script
//==============

// Require axios and cheerio, making our scrapes possible
var axios = require("axios");
var cheerio = require("cheerio");

var scrape = function (cb) {
     axios("http://www.echojs.com/").then(function(response) {
          
          var $ = cheerio.load(response.data);

          var articles = [];
          
          $("article h2").each(function(i,element) {
               //Empty result object 
               var result = {};

               //Grabbing the title of article.
               result.headline = $(this).children("a").text();
               
               //Grabbing link of article.
               result.summary = $(this).children("a").attr("href");

               //Grabbing paragraph of article.
               // result.summary = $(this).children("p").text()
               // console.log(result.title);
               articles.push(result);
          });
          console.log(articles);
          cb(articles);
     });
};

module.exports =  scrape;