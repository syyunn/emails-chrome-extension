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

function updateBadge() {
    // get active tab on current window
    chrome.tabs.query({ active: true, currentWindow: true }, function (arrayOfTabs) {
        // the return value is an array
        var activeTab = arrayOfTabs[0];

        if (!activeTab) return;

        var count = getCount(activeTab.url);
        chrome.browserAction.setBadgeText({
            text: count.toString()
        });
    });
}

function getCount(currentUrl) {
    return 42
}

// chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });
// chrome.browserAction.setBadgeText({ text: "?" });