var mongoose = require('mongoose');
 
// make a connection
mongoose.connect('mongodb://localhost:27017/Freshies');
 
// get reference to database
var db = mongoose.connection;
 
db.on('error', console.error.bind(console, 'connection error:'));
 
db.once('open', function() {
    console.log("Connection Successful!");
    
    // define Schema
    var GitHubJobSchema = mongoose.Schema({
      type: String,
      url: String,
      created_at: String,
      company_url: String,
      location: String,
      title: String,
      description: String,
      how_to_apply: String,
      company_logo: String
    });
 
    // compile schema to model
    var GitHubJobs = mongoose.model('GitHubJobs', GitHubJobSchema, 'bookstore');
 
    // save multiple documents to the collection referenced by Book Model
    GitHubJobs.collection.insertMany(books, function (err, docs) {
      if (err){ 
          return console.error(err);
      } else {
        console.log("Multiple documents inserted to Collection");
      }
    });
    
});