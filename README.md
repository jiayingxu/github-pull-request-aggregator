# GitHub Pull Request Aggregator
Aggregates pull requests from multiple authors on the GitHub pull request search page

## Installation
1. Download the [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en) 
Chrome extension. 
2. Add a new userscript with the contents of [pull-request-aggregator.js](https://github.com/jiayingxu/github-pull-request-aggregator/blob/main/pull-request-aggregator.js).

## Usage
* Add a bookmark to the Github Pull requests page with the query params `q=authoraggregation+is:open+author:author1+author:author2`.
* Any additional query parameters will be passed through to the underlying pull request search query.

## Bookmarks for IX Team PRs
* [Open PRs](https://github.com/pulls?q=authoraggregator+is%3Aopen+user%3AAddepar+author%3Aalex-anderson-addepar+author%3Aaslattum-addepar+author%3Agerryster+author%3Agordon-addepar+author%3AjamesHendersonAddepar+author%3Ajiayingxu+author%3Aswornimbarahi+author%3Awei-addepar)
* [Closed PRs](https://github.com/pulls?q=authoraggregator+is%3Aclosed+user%3AAddepar+author%3Aalex-anderson-addepar+author%3Aaslattum-addepar+author%3Agerryster+author%3Agordon-addepar+author%3AjamesHendersonAddepar+author%3Ajiayingxu+author%3Aswornimbarahi+author%3Awei-addepar)
