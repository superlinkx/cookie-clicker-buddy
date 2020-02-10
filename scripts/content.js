let cookieClickerBuddy = (function () {
    let goldenCookieClickerId = null
    let rate = 1000 / 30

    let goldenCookieClicker = function () {
        var shimmers = document.querySelectorAll('.shimmer')
        shimmers.forEach((shimmer) => {
            if (shimmer.style.backgroundImage.includes("goldCookie")) {
                let timestamp = new Date().toLocaleString()
                shimmer.click()
                console.info(`Clicked Golden Cookie at ${timestamp}`)
            }
        })

        goldenCookieClickerId = setTimeout(goldenCookieClicker, rate)
    }

    let stopGoldenCookieClicker = function () {
        clearTimeout(goldenCookieClickerId)
    }

    return {
        startGoldenCookieClicker: goldenCookieClicker,
        stopGoldenCookieClicker: stopGoldenCookieClicker
    }
})()

chrome.runtime.onMessage.addEventListener(function (request, sender, sendResponse) {
    if (request.command === 'startGCC') {
        cookieClickerBuddy.startGoldenCookieClicker()
        console.info("Engaging Golden Cookie Clicker on this page!")
    }

    if (request.command === 'stopGCC') {
        cookieClickerBuddy.stopGoldenCookieClicker()
        console.info("Stopping Golden Cookie Clicker on this page!")
    }

    sendResponse({ result: "success" })
})

HTMLDocument.prototype.ready = function () {
    return new Promise(function (resolve, reject) {
        if (document.readyState === 'complete') {
            resolve(document)
        } else {
            document.addEventListener('DOMContentLoaded', function () {
                resolve(document)
            })
        }
    })
}

document.ready().then(() => {
    chrome.storage.sync.get('engageGoldenCookieClicker', function (data) {
        if (data.engageGoldenCookieClicker) {
            cookieClickerBuddy.startGoldenCookieClicker()
            console.info("Engaging Golden Cookie Clicker on this page!")
        } else {
            console.info("Golden Cookie Clicker awaiting orders!")
        }
    })
})