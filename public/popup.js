chrome.tabs.executeScript({
    code: "document.documentElement.outerHTML"
}, function (src) {
    const htmlString = src[0]

    let emails = extractEmails(htmlString)

    console.log("src", htmlString, typeof htmlString)
    console.log("plainText", emails, typeof emails)
    localStorage.setItem("emails", JSON.stringify(emails));

});

function extractEmails(text) {
    const names = text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
    return [...new Set(names)];
}