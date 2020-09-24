var CronJob = require('cron').CronJob;

const fetchGithub = require('./tasks/fetch-github');


new CronJob("0 12 * * 1", fetchGithub,null,true, "America/Los_Angeles");

