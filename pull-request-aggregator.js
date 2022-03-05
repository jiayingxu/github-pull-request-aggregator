// ==UserScript==
// @name         GitHub Pull Request Author Aggregator
// @namespace    jiayingxu
// @version      0.1
// @description  Fetches all open or closed PRs by multiple authors on the GitHub pull request page when the query `authoraggregation` is set.
// @author       Jiaying Xu
// @match        https://github.com/pulls?q=authoraggregator*
// @grant        none
// @run-at       document-end
// ==/UserScript==

const authorQualifier = 'author:';

(async function () {
    'use strict';

    let {authorList, additionalQueryParams} = parseQuery();
    removeAuthorFromSearchInput();

    let containerList = await Promise.all(authorList.map(author => fetchPullRequestList(author, additionalQueryParams)));
    let mergedContainer = mergePullRequestContainers(containerList);
    let sortedContainer = sortPullRequestsByDate(mergedContainer);

    applySearchResults(sortedContainer);
})();

function removeAuthorFromSearchInput() {
    let searchInputElement = document.querySelector('#js-issues-search');
    searchInputElement.value = searchInputElement.value.split(' ').filter(query => !query.startsWith(authorQualifier)).join(' ');
}

function parseQuery() {
    const uniqueScriptQuery = 'authoraggregator';
    let params = (new URL(document.location)).searchParams;
    let query = params.get('q');
    let queryList = query.split(' ');
    let authorList = queryList.filter(query => query.startsWith(authorQualifier)).map(query => query.replace(authorQualifier, ''));
    let additionalQueryParams = queryList.filter(query => !query.startsWith(authorQualifier) && !query.startsWith(uniqueScriptQuery)).join(' ');
    return {authorList, additionalQueryParams};
}

async function fetchPullRequestList(author, query) {
    let response = await fetch(
        `https://github.com/pulls?q=is%3Apr+author%3A${author}+archived%3Afalse+user%3AAddepar+${encodeURIComponent(query)}`
    );
    let text = await response.text();
    let parser = new DOMParser();
    let parsedHtml = parser.parseFromString(text, 'text/html');
    return parsedHtml.querySelector('.application-main .js-navigation-container');
}

function mergePullRequestContainers(containerList) {
    containerList = containerList.filter(container => container);
    if (containerList.length === 0) {
        return null;
    }

    let mainContainer = containerList[0];
    for (let i = 1; i < containerList.length; i++) {
        let curr = containerList[i];
        mainContainer.append(...curr.children);
    }
    return mainContainer;
}

function sortPullRequestsByDate(container) {
    const relativeTimeSelector = 'relative-time';
    const dateTimeAttribute = 'datetime';

    Array.from(container.children).sort((a, b) => {
        let aDate = new Date(a.querySelector(relativeTimeSelector).getAttribute(dateTimeAttribute));
        let bDate = new Date(b.querySelector(relativeTimeSelector).getAttribute(dateTimeAttribute));
        return bDate - aDate;
    }).forEach(item => item.parentNode.appendChild(item));
    return container;
}

function applySearchResults(sortedContainer) {
    // Modify open/closed pull request count
    let pullRequestCountContainers = document.querySelectorAll('.table-list-header-toggle .btn-link.selected');
    pullRequestCountContainers.forEach(container => {
        let pullRequestCountLabels = container.childNodes[2].textContent.trim().split(' ');
        pullRequestCountLabels[0] = sortedContainer.children.length;
        container.childNodes[2].textContent = ` ${pullRequestCountLabels.join(' ')}`;
    });

    // Remove 'No results matched your search' container
    document.querySelector('.application-main .container-md').remove();

    // Add in PR search results into DOM
    document.querySelector('#js-issues-toolbar').append(sortedContainer);
}

