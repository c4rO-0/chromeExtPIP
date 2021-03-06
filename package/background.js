let targetTab = null
let time = null
let volume = null
if (!document.pictureInPictureEnabled) {
  chrome.browserAction.setTitle({ title: 'Picture-in-Picture NOT supported' });
} else {
  chrome.browserAction.onClicked.addListener(async tab => {
    if (targetTab && targetTab.id !== tab.id) {
      await chrome.tabs.executeScript(targetTab.id, { code: "(async ()=>{observerVideo.disconnect();for(video of document.querySelectorAll('video')){await document.exitPictureInPicture();video.pause();}})();", allFrames: true })
    }
    await chrome.tabs.executeScript({ file: 'script.js', allFrames: true });
    targetTab = tab
    chrome.storage.local.set({ targetTabId: tab.id })
  });
}
/**
 * default settings
 */
chrome.storage.local.get( { time: 5, volume: 5, auto: true, pause: true, list: true }, results => {
  chrome.storage.local.set({
    time  : results.time  , 
    volume: results.volume, 
    auto  : results.auto  , 
    pause : results.pause , 
    list  : results.list  ,
  })
})



chrome.storage.local.get({ time: 5, volume: 5 }, result => {
  time = result.time
  volume = result.volume / 100
  // console.log(volume)
})

/**
 * update settings
 */
chrome.storage.onChanged.addListener((change, namespace) => {
  chrome.storage.local.get(result => {
    time = result.time
    volume = result.volume / 100
    // console.log(volume)
  })
})

chrome.commands.onCommand.addListener(cmd => {
  chrome.storage.local.get(["targetTabId"], result => {
    console.log(result.targetTabId)
    // console.log(time)
    // console.log(volume)
    console.log(cmd)
    if (targetTab != null) {
      switch (cmd) {
        case "forward":
          chrome.tabs.executeScript(result.targetTabId, { code: "try{document.getElementsByTagName('video')[0].currentTime+=" + time + "}catch(err){}", allFrames: true })
          break
        case "backward":
          chrome.tabs.executeScript(result.targetTabId, { code: "try{document.getElementsByTagName('video')[0].currentTime-=" + time + "}catch(err){}", allFrames: true })
          break
        case "volumeUp":
          chrome.tabs.executeScript(result.targetTabId, { code: "try{document.getElementsByTagName('video')[0].volume+=" + volume + "}catch(err){}", allFrames: true })
          break
        case "volumeDown":
          chrome.tabs.executeScript(result.targetTabId, { code: "try{document.getElementsByTagName('video')[0].volume-=" + volume + "}catch(err){}", allFrames: true })
          break
        case "play":
          chrome.tabs.executeScript(result.targetTabId, { code: "try{if(document.getElementsByTagName('video')[0].paused){document.getElementsByTagName('video')[0].play()}else{document.getElementsByTagName('video')[0].pause()}}catch(err){}", allFrames: true })
          break
        case "exit":
          chrome.tabs.executeScript(result.targetTabId, { code: "try{document.exitPictureInPicture()}catch(err){}", allFrames: true })
          break
        case "reopen":
          chrome.tabs.executeScript(result.targetTabId, { file: 'script.js', allFrames: true })
          break
      }
    }
  })
})

/**
 * initialize
 */
chrome.tabs.query({}, tabs => {
  console.log(tabs)
  for (tab of tabs) {
    if (tab.status === "complete" && tab.url && !tab.url.startsWith("https://chrome.google.com/webstore")) {
      console.log("enale")
      chrome.browserAction.enable(tab.id)
    } else {
      console.log("disabling")
      chrome.browserAction.disable(tab.id)
    }
  }
})

/**
 * disable when loading
 */
// chrome.tabs.onActivated.addListener((info)=>{
//   console.log("tab changed")
//   console.log(info)
//   chrome.tabs.get(info.tabId, (tab)=>{
//     console.log(tab)
//     if(tab.status !== "complete"){
//       console.log("disabling in loading")
//       chrome.browserAction.disable(tab.id)
//     }
//   })
// })

/**
 * disable after complete
 */
chrome.tabs.onUpdated.addListener((tabId, info, tab) => {
  console.log(info)
  console.log(tab)
  if (tab.url && !tab.url.startsWith("https://chrome.google.com/webstore")) {
    console.log("enable")
    chrome.browserAction.enable(tabId)
  } else {
    console.log("disabling")
    chrome.browserAction.disable(tabId)
  }
})

/**
 * reset variable when close tab
 */
chrome.tabs.onRemoved.addListener((tabId) => {
  chrome.storage.local.get("targetTabId", ({targetTabId}) => {
    if(tabId === targetTabId) {
      targetTab = null;
      chrome.storage.local.set({ targetTabId: null });
    }
  });
});