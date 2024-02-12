
/****************************************************************************************************************
 youtubeLeftControls => it is for accessing the controls form the youtube.
 youtubePlayer=> it is to add a player to it.
****************************************************************************************************************/
let youtubeLeftControls, youtubePlayer;
let currentVideo = "";
let currentVideoBookmarks = [];//by MVC it will store the data.


/******************* The function used to get the time ]and convert to in a structured format *****************/
const getTime = function (t) {
    console.log("hello");
    var date = new Date(0);
    date.setSeconds(t);
    // console.log(date.toISOString().substr(11, 8));
    return date.toISOString().substr(11, 8);
}
/**************************************************************************************************************/


/*************************************************************************************************************
 1.fetchBookmarks()=> A function which returns a promise.
 2.if the bookmark url loaded it will return object else return new array to resolve.
**************************************************************************************************************/
const fetchBookmarks = () => {
    return new Promise((resolve) => {
        if (chrome.runtime && !chrome.runtime.lastError) {
            // console.log("chrome", chrome.runtime);

            chrome.storage.sync.get([currentVideo], (obj) => {
                resolve(obj[currentVideo] ? JSON.parse(obj[currentVideo]) : []);
            });
        } else {
            // console.error("Extension context invalid.");
            resolve([]);
        }
    });
};
/*************************************************************************************************************/


/**************************************************************************************************************
@param {Object} object object that returned from the background page with a message.
1.Use this event to listen for messages from another part of your extension.
refer [https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessage]
***************************************************************************************************************/
chrome.runtime.onMessage.addListener((object, sender, response) => {
    //destructure the object which is return it has 3 key value pairs send to popup js.
    const { type, value, videoId } = object;
    if (type === "NEW") {
        currentVideo = videoId;
        // sendResponse(newVideoLoaded());
        newVideoLoaded();
    } else if (type === "PLAY") {
        youtubePlayer.currentTime = value;
    } else if (type === "DELETE") {
        // console.log(value);
        const bookmarkTime = value;
        currentVideoBookmarks = currentVideoBookmarks.filter(
            (b) => b.time !== bookmarkTime
        );
        chrome.storage.sync.set({
            [currentVideo]: JSON.stringify(currentVideoBookmarks),
        });
        response(currentVideoBookmarks);
    }
});
/*************************************************************************************************************/


/**************************************************************************************************************
 1.if the button is clicked and it is new so at that time the function is called.
**************************************************************************************************************/
const newVideoLoaded = async () => {
    youtubeLeftControls = document.getElementsByClassName("ytp-left-controls")[0];
    youtubePlayer = document.getElementsByClassName("video-stream")[0];



    if (youtubeLeftControls && youtubePlayer) {
        currentVideoBookmarks = await fetchBookmarks();
        const bookmarkBtnExists = document.getElementsByClassName("bookmark-btn")[0];
        /***************** UPDATING THE THE DOM IF BUTTON NOT EXIT IN DOM *********************/
        if (!bookmarkBtnExists) {
            const bookmarkBtn = document.createElement("img");

            bookmarkBtn.src = chrome.runtime.getURL("assets/bookmark.png");
            bookmarkBtn.className = "ytp-button " + "bookmark-btn";
            bookmarkBtn.title = "Click to bookmark current timestamp";

            // targeting the buttons container to add our own button to a page.

            // Add event listener for hover
            bookmarkBtn.addEventListener('mouseover', function () {
                // Change the background color to light gray
                this.style.backgroundColor = 'lightgray';
                // Make the border radius 50%
                this.style.borderRadius = '50%';
            });

            // Add event listener for mouseout to revert the color
            bookmarkBtn.addEventListener('mouseout', function () {
                // Revert the background color
                this.style.backgroundColor = 'initial'; // or the original color
            });

            bookmarkBtn.style.width = "30px";
            bookmarkBtn.style.height = "30px";
            bookmarkBtn.style.marginTop = "7px";

            youtubeLeftControls.append(bookmarkBtn);
            //on click on the bookmark image it will add the content to a bookmark list.
            bookmarkBtn.addEventListener("click", addNewBookmarkEventHandler);

            return true; //! if Bookmark button added
        }
        else {
            return false; //! if Bookmark button already exists
        }
    }

    return false; //! if Bookmark button not added
}
/*****************************************************************************************************************/


/*****************************************************************************************************************
 1.on click mark button the time will be taken. 
 2.while takeing time that will in the form of seconds a new function is called to store in current formate.
*****************************************************************************************************************/
const addNewBookmarkEventHandler = async () => {

    const currentTime = youtubePlayer.currentTime;
    const newBookmark = {

        time: currentTime,
        desc: "Bookmark at : " + getTime(currentTime),
    };
    console.log(newBookmark);

    currentVideoBookmarks = await fetchBookmarks();
    chrome.storage.sync.set({

        //it will take old data and new data it will sort according to the time.
        [currentVideo]: JSON.stringify([...currentVideoBookmarks, newBookmark]
            .sort((a, b) => a.time - b.time))

    });
    // Send a message to the background script to show the badge
    chrome.runtime.sendMessage({ type: "SHOW_BADGE" });
}
/****************************************************************************************************************/