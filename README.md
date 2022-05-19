# GitHub Pull Request Aggregator
Aggregates pull requests by multiple authors on the GitHub pull request search page when the search query starts with `q=authoraggregation`.

## Features
* Displays both open and closed PRs by multiple authors
* List of authors can be set dynamically by modifying the search query in the URL
* Additional GitHub [search qualifiers](https://docs.github.com/en/search-github/searching-on-github/searching-issues-and-pull-requests) are supported and passed through to the GitHub PR search

## Installation
1. Download the [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en) 
Chrome extension. 
2. Add a new userscript with the contents of [pull-request-aggregator.js](https://github.com/jiayingxu/github-pull-request-aggregator/blob/main/pull-request-aggregator.js).

## Usage
* Add a bookmark to the GitHub Pull requests page with the query params `q=authoraggregation+is:open+author:teammate-1+author:teammate-2`.
* Any additional query parameters will be passed through to the underlying pull request search query.

## Bookmarks for IX Team PRs
* [Open PRs](https://github.com/pulls?q=authoraggregator+is%3Aopen+user%3AAddepar+author%3Aalex-anderson-addepar+author%3Aaslattum-addepar+author%3Agerryster+author%3Agordon-addepar+author%3AjamesHendersonAddepar+author%3Ajiayingxu+author%3Aswornimbarahi+author%3Awei-addepar+author%3Aoscarla-addepar)
* [Closed PRs](https://github.com/pulls?q=authoraggregator+is%3Aclosed+user%3AAddepar+author%3Aalex-anderson-addepar+author%3Aaslattum-addepar+author%3Agerryster+author%3Agordon-addepar+author%3AjamesHendersonAddepar+author%3Ajiayingxu+author%3Aswornimbarahi+author%3Awei-addepar+author%3Aoscarla-addepar)

## Motivation
I was looking for a way to get a list of all open PRs across my team and there wasn't a built-in way to do that in GitHub.
There is a [Review Requests](https://github.com/pulls/review-requested) page but as soon as a team member reviews the PR, 
the review request will [disappear](https://github.com/pulls/review-requested) from the search results.

The GitHub pull request search page currently does not support a [logical OR search](https://stackoverflow.com/a/61618255)
for pull requests to allow aggregation of PRs from multiple authors.  