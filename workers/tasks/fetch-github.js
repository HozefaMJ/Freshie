const fetch = require("node-fetch");

const baseUrl = 'https://jobs.github.com/positions.json'

var mongoose = require('mongoose');
 
// make a connection
mongoose.connect('mongodb://localhost:27017/Freshies',{ useNewUrlParser: true, useUnifiedTopology: true});
 
// get reference to database
var db = mongoose.connection;
 
db.on('error', console.error.bind(console, 'connection error:'));
 

async function fetchGithub(){

    let resultCount = 1;
    let onPage = 0;
    const allJobs = [];


    while( resultCount > 0){
        const res = await fetch(`${baseUrl}?page=${onPage}`) // URl Constructed
        const jobs = await res.json();
        allJobs.push(...jobs);
        resultCount = jobs.length;
        console.log('got', resultCount, 'jobs');
        onPage++;
    }

    console.log('got', allJobs.length, "jobs total");

    const jrJobs = allJobs.filter(jobs => {
        const jobTitle = jobs.title.toLowerCase();

        // Algorithm Logic
        if(jobTitle.includes('senior') || jobTitle.includes('manager') || jobTitle.includes('sr.') || jobTitle.includes('architect') || jobTitle.includes('lead')) {
            return false;
        }
        return true;
    })

    console.log('Filtered down to', jrJobs.length);
    

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
        var GitHubJobs = mongoose.model('GitHubJobs', GitHubJobSchema);
     
        // save multiple documents to the collection referenced by Book Model
        GitHubJobs.collection.bulkWrite(jrJobs, function (err, docs) {
          if (err){ 
              return console.error(err);
          } else {
            console.log("Multiple documents inserted to Collection");
          }
        });
        
    });
}

fetchGithub();

module.exports = fetchGithub;

