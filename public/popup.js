chrome.tabs.executeScript({
    code: "document.documentElement.outerHTML"
}, function (src) {
    const htmlString = src[0]

    let emails = extractEmails(htmlString)

    console.log("src", htmlString, typeof htmlString)
    console.log("emails", emails, typeof emails)
    sessionStorage.setItem("emails", JSON.stringify(emails))
    console.log("emails in popup", sessionStorage.getItem("emails"))
});

function extractEmails(text) {
    const names = text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
    const validNames = names.filter(name => isValidName(name))
    function isValidName(e) {
        return !(/\.(png|bmp|jpe?g)$/i).test(e);
    };
    return [...new Set(validNames)];
}
