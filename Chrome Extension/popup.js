/**************************************************************************************************************
 1.destructure the object which is return it has 3 key value pairs.
 2.Returning the current tab  url .
***************************************************************************************************************/
const getActiveTabURL = async () => {
  //destructure the object which is returned from contentScript.js file .
  let queryOptions = { active: true, currentWindow: true };
  let tab = await chrome.tabs.query(queryOptions);
  return tab[0];
};
/**************************************************************************************************************/


/***************************************************************************************************************
 Get Time function is used to get the time of the bookmark.
***************************************************************************************************************/
const getTime = (t) => {
  var date = new Date(0);
  date.setSeconds(t);
  return date.toISOString().substr(11, 8);
};
/***************************************************************************************************************/


/***************************************************************************************************************
 1.adding the bookmark using the elements. To this we are fetching the data.
 2.updating the dom inserting the button to play task.
****************************************************************************************************************/
const addNewBookmark = (bookmarksElement, bookmark) => {
  //! here bookmark is an object which contain data from youtube (contentscript.js)

  const bookmarkNoteElement = document.createElement("div");
  const newBookmarkElement = document.createElement("div");
  const controlsElement = document.createElement("div");

  bookmarkNoteElement.textContent = bookmark.desc;
  bookmarkNoteElement.className = "bookmark-note";
  controlsElement.className = "bookmark-controls";

  // adding a player button to move to that particular instant.
  setBookmarkAttributes("play", onPlay, controlsElement);

  const onDeleteClosure = (e) => {
    onDelete(e, bookmark.time);
  };

  //adding the buttons delete the bookmark.
  setBookmarkAttributes("delete", onDeleteClosure, controlsElement);

  newBookmarkElement.id = "bookmark-" + bookmark.time.toFixed(3);
  newBookmarkElement.className = "bookmark";
  newBookmarkElement.setAttribute("timestamp", bookmark.time);

  newBookmarkElement.appendChild(bookmarkNoteElement);
  newBookmarkElement.appendChild(controlsElement);
  bookmarksElement.appendChild(newBookmarkElement);
};
/***************************************************************************************************************/


/***************************************************************************************************************
 1.The function main use to show the bookmarked video.if data is present then it show data else empty array.
 2.taking the html that is time to a web page and updating.
 3.if data is empty then it will show the no bookmark is added .
 4.if user is clicked to add a bookmark if present it will add.
 5.to show the data to user.on click every time updating of array.
 **************************************************************************************************************/
const viewBookmarks = (currentBookmarks = []) => {
  const allBookmarkedTime = document.getElementById("bookmarkedAtTime");
  // console.log(allBookmarkedTime);
  allBookmarkedTime.innerHTML = "";

  if (currentBookmarks.length > 0) {
    currentBookmarks.forEach((bookmark) => {
      // console.log(bookmark);
      //append the old data and new data.
      addNewBookmark(allBookmarkedTime, bookmark);
    });
  } else {
    allBookmarkedTime.innerHTML = '<i class="row">No bookmarks to show.</i>';
  }
};
/****************************** * * * viewBookmarks function ends * * * ***********************************/


/***************************************************************************************************************
 1.on play button it will take the time  and update the tab video to play form that instance.
 2.the message that send is time to start video from the instance  a action to play.
 **************************************************************************************************************/
const onPlay = async (e) => {
  // console.log(e);
  const bookmarkTime = e.target.parentNode.parentNode.getAttribute("timestamp");
  const activeTab = await getActiveTabURL();

  // tabs.sendMessage() => The message will be received in the extension context by any listeners to the runtime.onMessage event. Listeners may then optionally return something as a response back to the sender.
  chrome.tabs.sendMessage(activeTab.id, {
    type: "PLAY",
    value: bookmarkTime,
  });
};
/**************************************************************************************************************/


/**************************************************************************************************************
 1.To delete the data it will take current tab details  and remove the hole functionality.
**************************************************************************************************************/
const onDelete = async (e, bookmarkTime) => {
  // console.log("delete button is clicked");
  const activeTab = await getActiveTabURL();
  const queryParameters = activeTab.url.split("?")[1];
  const urlParameters = new URLSearchParams(queryParameters);
  const currentVideo = urlParameters.get("v");
  const bookmarkElementToDelete = document.getElementById(
    "bookmark-" + bookmarkTime.toFixed(3)
  );

  bookmarkElementToDelete.parentNode.removeChild(bookmarkElementToDelete);

  // Fetch the stored bookmarks
  chrome.storage.sync.get([currentVideo], (data) => {
    let currentBookmarks = data[currentVideo]
      ? JSON.parse(data[currentVideo])
      : [];

    // Filter out the deleted bookmark
    currentBookmarks = currentBookmarks.filter(
      (bookmark) => Math.abs(bookmark.time - bookmarkTime) > 0.001
    );

    // Update the stored bookmarks
    chrome.storage.sync.set(
      { [currentVideo]: JSON.stringify(currentBookmarks) },
      () => {
        // console.log("Bookmark deleted and storage updated.");
      }
    );
  });

  //sending the message to chrome to delete this tab.
  chrome.tabs.sendMessage(activeTab.id, {
    type: "DELETE",
    value: bookmarkTime,
  });
};
/***************************************************************************************************************/


/***************************************************************************************************************
 1.setBookmarkAttributes() => This function will add the image like play and delete to a page.
 2.Return the listener like play and delete etc back with image.
 ***************************************************************************************************************/
const setBookmarkAttributes = (src, eventListener, controlParentElement) => {
  const controlElement = document.createElement("img");

  controlElement.src = "assets/" + src + ".png";
  controlElement.title = src;
  controlElement.addEventListener("click", eventListener);
  controlParentElement.appendChild(controlElement);

  return eventListener;
};
/***************************************************************************************************************/


/****************************************************************************************************************
 1.DOMContentLoaded => event fires when the HTML document has been completely parsed.
 2.getActiveTabURL() => A function which is called and stored in a activeTab variable.
 3.spliting the url into array on the bases of ? (question mark.).
 4.The URLSearchParams interface defines utility methods to work with the query string of a URL.
 5.The get syntax binds an object property to a function that will be called when that property is looked up. AND get the value from the url from ."v".
****************************************************************************************************************/
document.addEventListener("DOMContentLoaded", async () => {
  const activeTab = await getActiveTabURL();
  const queryParameters = activeTab.url.split("?")[1];
  const urlParam = new URLSearchParams(queryParameters);

  const currentVideo = urlParam.get("v");

  //url check conditions in url is there watch and it in current video on browser .
  if (activeTab.url.includes("youtube.com/watch") && currentVideo) {


    //Represents the sync storage area. Items in sync storage are synced by the browser.
    //Refer [https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/storage/sync]
    chrome.storage.sync.get([currentVideo], (data) => {
      const currentVideoBookmarks = data[currentVideo]
        ? JSON.parse(data[currentVideo])
        : [];
      viewBookmarks(currentVideoBookmarks);
      // console.log(currentVideoBookmarks);
    });
  } else {
    // if conditions not match show the not a youtube video page.
    const container = document.getElementsByClassName("container")[0];
    container.innerHTML =
      '<div class="title-name">This is not a YouTube video page.</div>';
  }
});
/*************************************************************************************************************/