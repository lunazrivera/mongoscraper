var scrape = require("./../scripts/scrape");
var headlinesController = require("./../controllers/headline");
var notesController = require("./../controllers/notes");


module.exports = function(router) {
     router.get("/", function(req, res) {
          res.render("home");
     });

     router.get("/saved", function(req, res) {
          res.render("saved");
     });

     router.get("/api/fetch", function(req,res) {
          headlinesController.fetch(function(err, docs) {
               if(!docs || docs.insertedCount === 0) {
                    res.json({message: "Theres no new articles. Come back in another time!"
                    });
               } else {
                    res.json({
                         message: "Added " + docs.insertedCount + " new articles!"
                    });
               };
          });
     });

     router.get("/api/headline", function(req, res) {
          var query = {};
          if (req.query.saved) {
               query = req.query;
          };
          headlinesController.get(query, function(data) {
               res.json(data);
          });
     });

     router.delete("/api/headline/:id", function(req, res) {
          var query = {};
          query._id = req.params.id;
          headlinesController.delete(query, function(err, data) {
               res.json(data);
          });
     });

     router.patch("/api/headline", function(req, res) {
          headlinesController.update(req.body, function(err, data) {
               res.json(data);
          });
     });
     router.get("/api/notes/:headline_id?", function(req, res) {
          var query = {};
          if (req.params.headline_id) {
               query._id = req.params.headline_id;
          };
          notesController.get(query, function(err, data) {
               res.json(data);
          });
     });
     router.delete("/api/notes/:id", function(req,res) {
          var query = {};
          query._id = req.params.id;
          notesController.delete(query, function(err, data) {
               res.json(data);
          });
     });
     router.post("/api/notes", function(req,res) {
          console.log(req.body);
          notesController.save(req.body, function(data) {
               res.json(data);
          });
     });
}