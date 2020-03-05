var videoUrl
var observerVideo
var count
var list
var auto
var pause

(async () => {
  function inViewport(el) {
    let rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
  }
  function queryVideo() {
    const videos = Array.from(document.querySelectorAll('video'))
      .filter(video => video.readyState != 0)
      .filter(video => video.disablePictureInPicture == false)
      .sort((v1, v2) => {
        const v1Rect = v1.getClientRects()[0];
        const v2Rect = v2.getClientRects()[0];
        return ((v2Rect.width * v2Rect.height) - (v1Rect.width * v1Rect.height));
      })
    if (videos.length === 0) {
      return 'noVideo'
    } else {
      return videos[0]
    }
  }
  chrome.storage.local.get((result) => {
    list = result.list
    auto = result.auto
    pause = result.pause
    // console.log(result)
  })
  const video = queryVideo()
  if (video === 'noVideo')
    return

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
    await observerVideo.disconnect()
  }

  observerVideo = new MutationObserver(async (mutationList, observer) => {
    // console.log("mutationList" + count)
    const _video = queryVideo()
    if (_video !== 'noVideo') {
      if (videoUrl !== _video.src) {
        // console.log("videoUrl:" + videoUrl)
        // console.log("video.src:" + _video.src)
        videoUrl = _video.src
        // console.log("video address changed")
        if (document.pictureInPictureElement) {
          document.exitPictureInPicture()
          _video.requestPictureInPicture()
        }
      }
    }
  })

  if (document.pictureInPictureElement) {
    await document.exitPictureInPicture();
  } else {
    await video.requestPictureInPicture();
    if (list) {
      observerVideo.observe(document.querySelector('body'), { subtree: true, childList: true, attributes: true, attributeOldValue: false, characterDataOldValue: false })
    }
  }
})();
