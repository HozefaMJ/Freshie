const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GitHubJobsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    date: {
        type: Date,
    }
})


module.exports = GitHubJobs = mongoose.model("githubjobs", GitHubJobsSchema);