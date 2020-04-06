const filesInDirectory = dir => new Promise(resolve =>

    dir.createReader().readEntries(entries =>

        Promise.all(entries.filter(e => e.name[0] !== '.').map(e =>

            e.isDirectory
                ? filesInDirectory(e)
                : new Promise(resolve => e.file(resolve))
        ))
            .then(files => [].concat(...files))
            .then(resolve)
    )
)

const timestampForFilesInDirectory = dir =>
    filesInDirectory(dir).then(files =>
        files.map(f => f.name + f.lastModifiedDate).join())

const reload = () => {

    chrome.tabs.query({ active: true, currentWindow: true }, tabs => { // NB: see https://github.com/xpl/crx-hotreload/issues/5

        if (tabs[0]) { chrome.tabs.reload(tabs[0].id) }

        chrome.runtime.reload()
    })
}

const watchChanges = (dir, lastTimestamp) => {

    timestampForFilesInDirectory(dir).then(timestamp => {

        if (!lastTimestamp || (lastTimestamp === timestamp)) {

            setTimeout(() => watchChanges(dir, timestamp), 1000) // retry after 1s

        } else {

            reload()
        }
    })

}

chrome.management.getSelf(self => {

    if (self.installType === 'development') {

        chrome.runtime.getPackageDirectoryEntry(dir => watchChanges(dir))
    }
})


// fires when tab is updated
chrome.tabs.onUpdated.addListener(updateBadge);

// fires when active tab changes
chrome.tabs.onActivated.addListener(updateBadge);

// fires when browser window changes
chrome.windows.onFocusChanged.addListener(updateBadge);

let emails = []

function updateBadge() {
    console.log("updateBadge")
    // get active tab on current window
    chrome.tabs.query({ active: true, currentWindow: true }, function (arrayOfTabs) {
        // the return value is an array
        var activeTab = arrayOfTabs[0];

        if (!activeTab) return;

        chrome.tabs.executeScript({
            code: "document.documentElement.outerHTML"
        }, function (src) {
            if (src) {
                const htmlString = src[0]
                console.log("running executescript")
                emails = extractEmails(htmlString)
                // sessionStorage.setItem("emails", JSON.stringify(emails))
                // chrome.runtime.sendMessage({ emails: JSON.stringify(emails) }, function (res) {
                //     console.log("res-from-ext", res)
                // })
                chrome.storage.local.set({ emails: JSON.stringify(emails) }, function () {
                    console.log('emails is set to ' + JSON.stringify(emails));
                });

                if (emails.length != 0) {
                    console.log("emails detected @ background", emails)
                    chrome.browserAction.setBadgeBackgroundColor({ color: "#19A974" });
                    chrome.browserAction.setBadgeText({
                        text: emails.length.toString(),
                    });
                } else {
                    console.log("emails are 0")
                    chrome.browserAction.setBadgeText({
                        text: '',
                    });
                }
            } else {
                // for the case like chrome-extension page that doesn't have url or html-src.
                console.log("no src detected")
                chrome.storage.local.set({ emails: JSON.stringify([""]) }, function () {
                    console.log('emails is set to ' + JSON.stringify([""]));
                });
                chrome.browserAction.setBadgeText({
                    text: '',
                });
            }
        });

        function extractEmails(text) {
            let validNames = []
            const names = text.match(/([a-zA-Z0-9._-]+@[a-zA-Z._-]+\.[a-zA-Z0-9._-]+)/gi); //this one most fast though requires post-works. even including those post works

            if (names == null) {
                return []
            } else {
                function isNotImages(e) {
                    return !(/\.(png|bmp|jpe?g)$/i).test(e);
                };
                function removeHexaDecimal(e) {
                    if (/^x22/.test(e)) {
                        return e.slice(3)
                    } else {
                        return e
                    }
                }
                function removeEndPeriod(e) {
                    if (/.*(\.)$/.test(e)) {
                        return e.slice(-1)
                    } else {
                        return e
                    }
                }
                function atLeastThreeStrings(e) {
                    return e.length >= 3
                }

                validNames = names.filter(name => isNotImages(name))
                validNames = validNames.map(removeHexaDecimal)
                validNames = validNames.map(removeEndPeriod)
                validNames = validNames.filter(name => atLeastThreeStrings(name))

                return [...new Set(validNames)]
            }
        }
    });
}

