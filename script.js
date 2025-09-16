// ==UserScript==
// @name        Linkedin Job Spam Blocker
// @description Hide job listings from banned companies
// @version      1.0.0
// @match       *://*.linkedin.com/jobs/*
// ==/UserScript==

const DEBUG = false; // Set to true to view logs

const bannedCompanies = [
  "Lensa",
  "Wiraa",
  "DataAnnotation",
  "SimplyApply",
  "RemoteWorker US",
  "Jobot",
  "Dice",
  "Aha!",
  "Get It Recruit - Information Technology",
  "Veeva Systems",
  "Veeva Consumer Products",
  "Motion Recruitment",
  "Get It - Professional Services",
  "Outlier",
  "Talentify.io",
  "CyberCoders",
  "Canonical",
  "HireMeFast LLC",
  "Phoenix Recruitment",
  "TekJobs",
  "Accenture",
  "Calyptus",
  "ArcheSys Inc - SBA 8(a) Certified",
  "Underdog.io",
  "RemoteWorker CA",
  "Patterned Learning AI",
  "Softrams, a Tria Federal Company",
  "Ryder System, Inc.",
  "TieTalent",
  "Jobright.ai",
  "Turing",
  "Trilogy",
  "Twine",
  "Applicantz",
  "Precision Technologies",
  "Insight Global",
  "Jobgether",
  "Goliath Partners",
  "Hirenza",
  "micro1",
  "Robert Half",
  "Acceler8 Talent",
  "Braintrust",
  "Revature",
  "Actalent",
  "JOBS by allUp",
  "Mindrift"
];

function normalize(str) {
  return (str || "").toLowerCase().trim();
}

const listingSelector = 'li.jobs-search-results__list-item, .base-card, div.job-card-container';

function removeBannedJobs() {
  let removedAny = false;
  document.querySelectorAll(listingSelector).forEach(job => {
    const jobText = normalize(job.textContent);
    for (const company of bannedCompanies) {
      if (jobText.includes(normalize(company))) {
        job.remove();
        removedAny = true;
        break;
      }
    }
  });
  return removedAny;
}

function attachObserverWhenReady() {
  if (window.jobsObserver && window.jobsObserver.disconnect) {
    window.jobsObserver.disconnect();
    if (DEBUG) console.debug("Old MutationObserver disconnected.");
  }
  const jobsList = document.querySelector('ul.jobs-search-results__list, ul.scaffold-layout__list-container') || document.querySelector('#main ul');
  if (jobsList) {
    removeBannedJobs();
    window.jobsObserver = new MutationObserver(() => removeBannedJobs());
    window.jobsObserver.observe(jobsList, { childList: true, subtree: true });
    if (DEBUG) console.debug('Job filter is now watching for banned companies as jobs load.');
  } else {
    setTimeout(attachObserverWhenReady, 1000);
  }
}

function listHandler() {
    if (window.done === undefined) window.done = false;

if (!window.done) {
    window.listChecker = setInterval(() => {
        if (DEBUG) console.debug('setting up interval', window.done);
        let jobsList = document.querySelectorAll('ul.jobs-search-results__list li, ul.scaffold-layout__list-container li, #main ul li');
        if (DEBUG) console.debug('checking...', jobsList.length);

        if (jobsList.length > 0) {
            window.done = true;
            if (DEBUG) console.debug('done set to true', window.done);
            attachObserverWhenReady();
            clearInterval(window.listChecker);
            if (DEBUG) console.debug('listChecker interval cleared');
        } else {
            clearInterval(window.listChecker);
        }
    }, 1000);
}
}

window.addEventListener('load', (event) => {
    listHandler();
})


