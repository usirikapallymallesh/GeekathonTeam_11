const initContentScript = (tabId, url) => {
    console.log("url", url);

    const videoId = new URLSearchParams(new URL(url).search).get("v");
    // const title = document.querySelectorAll("#video-title")[1].childNodes[0].data;
    if (videoId) {
        chrome.tabs.sendMessage(tabId, { type: "NEW", videoId });
    }
};

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (
        changeInfo.status === "complete" &&
        tab.url.includes("youtube.com/watch")
    ) {
        initContentScript(tabId, tab.url);
    }
});

//   chrome.webNavigation.onHistoryStateUpdated.addListener((details) => {
//     if (details.url.includes("youtube.com/watch")) {
//       initContentScript(details.tabId, details.url);
//     }
//   });

const showBadge = () => {
    chrome.action.setBadgeText({ text: "\u2713" });
    chrome.action.setBadgeBackgroundColor({ color: "#32bea6" });

    setTimeout(() => {
        chrome.action.setBadgeText({ text: "" });
    }, 1500);
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "SHOW_BADGE") {
        showBadge();
    }
});






/*******************************************************************************************************************
adding a event listener to the chrome youTube page.
@param {tabWindow}  it takes the hole window from that we are extracting the url.
@param {tabId} it will show the current window id of tab.
******************************************************************************************************************/
// chrome.tabs.onUpdated.addListener((tabId, tabWindow) => {

//     if (tabWindow.url && tabWindow.url.includes("youtube.com/watch")) {
//         // split the url at the question mark and return array.
//         const queryParameters = tabWindow.url.split("?")[1];
//         const urlParameters = new URLSearchParams(queryParameters);
//         //  it will send the message and catch by content page..
//         chrome.tabs.sendMessage(tabId, {
//             type: "NEW",
//             // from v the url should be stored uniquely to identify the video from youtube.
//             videoId: urlParameters.get("v"),
//         });
//     }
// });
/***************************************************************************************************************/
