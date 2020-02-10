
chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.sync.set({ engageGoldenCookieClicker: true }, function () {
        console.log("Golden Cookie Clicker Engaged!");
    });
});

chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: 'orteil.dashnet.org' },
        })
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
});