var engageGoldenCookieClicker = document.getElementById('engageGoldenCookieClicker');

//on init update the UI checkbox based on storage
chrome.storage.sync.get('engageGoldenCookieClicker', function (data) {
    engageGoldenCookieClicker.checked = data.engageGoldenCookieClicker;
});

engageGoldenCookieClicker.onchange = function (element) {
    let value = this.checked;

    //update the extension storage value
    chrome.storage.sync.set({ 'engageGoldenCookieClicker': value }, function () {
        let msg = "Golden Cookie Clicker is"
        value ? console.info(`${msg} engaged`) : console.info(`${msg}n't engaged`)
    });

    //Pass startGCC or stopGCC message to content script 
    if (value) {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { command: "startGCC", engageGoldenCookieClicker: value }, function (response) {
                console.info(response.result);
            });
        });
    } else {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { command: "stopGCC", engageGoldenCookieClicker: value }, function (response) {
                console.info(response.result);
            });
        });
    }

};