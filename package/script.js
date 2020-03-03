var videoUrl
var observerVideo
var count
var list
var auto
var pause

(async () => {
  chrome.storage.local.get((result) => {
    list = result.list
    auto = result.auto
    pause = result.pause
    // console.log(result)
  })
  const videos = Array.from(document.querySelectorAll('video'))
    .filter(video => video.readyState != 0)
    .filter(video => video.disablePictureInPicture == false)
    .sort((v1, v2) => {
      const v1Rect = v1.getClientRects()[0];
      const v2Rect = v2.getClientRects()[0];
      return ((v2Rect.width * v2Rect.height) - (v1Rect.width * v1Rect.height));
    });

  if (videos.length === 0)
    return;

  const video = videos[0];

  if (count) {
    count += 1
  } else {
    count = 1
  }
  console.log(count)

  if (videoUrl) {
    console.log(videoUrl)
  }
  videoUrl = video.src
  console.log(videoUrl)

  if (observerVideo) {
    console.log("disconnecting old observer")
    observerVideo.disconnect()
  }
  observerVideo = new MutationObserver((mutationList, observer) => {
    console.log("mutationList" + count)
    // console.log(mutationList)
    const _videos = Array.from(document.querySelectorAll('video'))
      .filter(video => video.readyState != 0)
      .filter(video => video.disablePictureInPicture == false)
      .sort((v1, v2) => {
        const v1Rect = v1.getClientRects()[0];
        const v2Rect = v2.getClientRects()[0];
        return ((v2Rect.width * v2Rect.height) - (v1Rect.width * v1Rect.height));
      });
    if (_videos.length > 0) {
      const _video = _videos[0]
      if (videoUrl !== _video.src) {
        console.log("videoUrl:" + videoUrl)
        console.log("video.src:" + _video.src)
        videoUrl = _video.src
        console.log("video address changed")
        if (document.pictureInPictureElement) {
          document.exitPictureInPicture().then(()=>{
            _video.requestPictureInPicture()
          })
          
        }
        // console.log("videoUrl:"+videoUrl)
        // console.log("video.src:"+_video.src)
      }
    }
  })

  if (document.pictureInPictureElement) {
    if(pause){
      // await document.pictureInPictureElement.pause()
    }
    await document.exitPictureInPicture();
  } else {
    await video.requestPictureInPicture();
    if (auto) {
      // await document.pictureInPictureElement.play()
    }
    if (list) {
      observerVideo.observe(document.querySelector('body'), { subtree: true, childList: true, attributes: true, attributeOldValue: false, characterDataOldValue: false })
    }
  }
})();
