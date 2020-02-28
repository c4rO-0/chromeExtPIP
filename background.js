let targetTab = null
let time = null
let volume = null
let play = null
if (!document.pictureInPictureEnabled) {
  chrome.browserAction.setTitle({ title: 'Picture-in-Picture NOT supported' });
} else {
  chrome.browserAction.onClicked.addListener(tab => {
    if(targetTab&&targetTab.id!==tab.id){
      chrome.tabs.executeScript(targetTab.id,{code:"observerVideo.disconnect();for(video of document.querySelectorAll('video')){video.pause();document.exitPictureInPicture()}", allFrames:true})
    }
    chrome.tabs.executeScript({ file: 'script.js', allFrames: true });
    targetTab = tab
  });
}
/**
 * initialize settings
 */
chrome.storage.local.get({ time: 5, volume: 5, play: false }, result => {
  time = result.time
  volume = result.volume / 100
  play = result.play
  // console.log(volume)
})

/**
 * update settings
 */
chrome.storage.onChanged.addListener((change, namespace) => {
  chrome.storage.local.get(result => {
    time = result.time
    volume = result.volume / 100
    play = result.play
    // console.log(volume)
  })
})

chrome.commands.onCommand.addListener(cmd => {
  console.log(targetTab)
  // console.log(time)
  // console.log(volume)
  console.log(play)
  console.log(cmd)
  if (targetTab != null) {
    switch (cmd) {
      case "right":
        chrome.tabs.executeScript(targetTab.id, { code: "try{document.getElementsByTagName('video')[0].currentTime+=" + time + "}catch(err){}", allFrames: true })
        break
      case "left":
        chrome.tabs.executeScript(targetTab.id, { code: "try{document.getElementsByTagName('video')[0].currentTime-=" + time + "}catch(err){}", allFrames: true })
        break
      case "up":
        if (play) {
          chrome.tabs.executeScript(targetTab.id, { code: "try{if(document.getElementsByTagName('video')[0].paused){document.getElementsByTagName('video')[0].play()}else{document.getElementsByTagName('video')[0].pause()}}catch(err){}", allFrames: true })
        } else {
          chrome.tabs.executeScript(targetTab.id, { code: "try{document.getElementsByTagName('video')[0].volume+=" + volume + "}catch(err){}", allFrames: true })
        }
        break
      case "down":
        if (play) {
          chrome.tabs.executeScript(targetTab.id, { code: "try{if(document.getElementsByTagName('video')[0].paused){document.getElementsByTagName('video')[0].play()}else{document.getElementsByTagName('video')[0].pause()}}catch(err){}", allFrames: true })
        } else {
          chrome.tabs.executeScript(targetTab.id, { code: "try{document.getElementsByTagName('video')[0].volume-=" + volume + "}catch(err){}", allFrames: true })
        }
        break
    }
  }
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
chrome.tabs.onActivated.addListener((info)=>{
  console.log("tab changed")
  console.log(info)
  chrome.tabs.get(info.tabId, (tab)=>{
    console.log(tab)
    if(tab.status !== "complete"){
      console.log("disabling in loading")
      chrome.browserAction.disable(tab.id)
    }
  })
})

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