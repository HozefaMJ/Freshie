const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GitHubJobsSchema = new Schema({
    type:{
        type: String,
    },
    url:{
        type: String,
    },
    created_at: {
        type: String,
    },
    company:{
        type: String,
    },
    company_url:{
        type: String,
    },
    location:{
        type: String,
    },
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    how_to_apply: {
        type: String,
    },
    company_logo: {
        type: String,
    },
    
})


module.exports = GitHubJobs = mongoose.model("githubjobs", GitHubJobsSchema);