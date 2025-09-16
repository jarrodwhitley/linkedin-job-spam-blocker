# LinkedIn Job Spam Blocker

A simple **Userscript** that hides spammy, low-quality, or unwanted job listings from your LinkedIn job search results.  

This script automatically removes job cards from companies you specify, keeping your job feed cleaner and more relevant.

---

## Features

- 🚫 Removes job listings from a predefined list of **banned companies**.  
- 🔍 Works on LinkedIn job search result pages (`linkedin.com/jobs/*`).  
- 🔄 Continuously monitors the job list and removes new banned jobs as they load.  
- ⚙️ Optional debug logging to see which jobs are being blocked.  

---

## Installation

1. Install a Userscript manager extension:
   - [Userscripts](https://apps.apple.com/us/app/userscripts/id1463298887) (Safari only)
   - [Tampermonkey](https://www.tampermonkey.net/)
   - [Violentmonkey](https://violentmonkey.github.io/)  
   - [Greasemonkey](https://www.greasespot.net/)

3. Create a new script and paste in the contents of `linkedin-job-spam-blocker.user.js`.

4. Save the script.  
   It will now run automatically whenever you visit LinkedIn job pages.

---

## Configuration

- **Banned companies list**  
  The script includes a hardcoded array of common spammy recruiters and shady companies.  
  You can edit the `bannedCompanies` array to add or remove names:

  ```js
  const bannedCompanies = [
    "Lensa",
    "Jobot",
    "CyberCoders",
    "Insight Global",
    "Robert Half",
    // ... add your own
  ];
  ```

-	**Debug logging**
By default, logging is off.
To enable console logs for troubleshooting, set:
```js
const DEBUG = true;
```
