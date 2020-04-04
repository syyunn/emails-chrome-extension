chrome.tabs.executeScript({
    code: "document.documentElement.outerHTML"
}, function (src) {
    const htmlString = src[0]

    let plainText = extractEmails(htmlString)

    console.log("src", htmlString, typeof htmlString)
    console.log("plainText", plainText, typeof plainText)
});

function extractEmails(text) {
    return text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
}