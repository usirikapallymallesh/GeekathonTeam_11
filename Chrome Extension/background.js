/*******************************************************************************************************************
 if the url matches with the youtube the initContentScript function is called.
 Background js is supported only message system.
*******************************************************************************************************************/
const initContentScript = (tabId, url) => {
    console.log("url", url);

    const videoId = new URLSearchParams(new URL(url).search).get("v");
    // const title = document.querySelectorAll("#video-title")[1].childNodes[0].data;
    if (videoId) {
        chrome.tabs.sendMessage(tabId,{ type: "NEW",videoId });//it will send the data using message system.
    }
};
/******************************************************************************************************************/


/*******************************************************************************************************************
 the function will check the current page is youtube or not.
*******************************************************************************************************************/
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (
        changeInfo.status === "complete" &&
        tab.url.includes("youtube.com/watch")
    ) {
        initContentScript(tabId, tab.url);
    }
});
/******************************************************************************************************************/


/*******************************************************************************************************************
 1.on click of show badge the function will be invoked and it will show the popup up to some duration.
********************************************************************************************************************/
const showBadge = () => {
    chrome.action.setBadgeText({ text: "\u2713" });
    chrome.action.setBadgeBackgroundColor({ color: "#32bea6" });

    setTimeout(() => {
        chrome.action.setBadgeText({ text: "" });
    }, 2000);
};
/******************************************************************************************************************/


/*******************************************************************************************************************
 1.on popup we take the show badge  and  the functions are taken.
*******************************************************************************************************************/
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "SHOW_BADGE") {
        showBadge();
    }
});
/********************************************************************************************************************/
