var videoUrl
var observerVideo
var count
var list
var auto
var pause

var v
var vURL
var vPoster


(async () => {
  // console.log("==start===")
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
      .filter(video => video.id != 'c4r-video')
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

  function executeAfterVideoReady(video, callback) {
    if (video.readyState == 4) {
      // HAVE_ENOUGH_DATA - enough data available to start playing
      // console.log("video is ready")
      callback()
    } else {
      // waiting video ready
      // console.log("waiting video ready")
      video.addEventListener("canplay", () => {
        // console.log("can play")
        callback()
      }, { once: true })
    }
  }

//   function addSourceToVideo(element, src, type) {
//     var source = document.createElement('source');

//     source.src = src;
//     source.type = type;

//     element.appendChild(source);
// }

function addSourceToVideo(element, src) {
  element.src = src
  // element.setAttribute('preload', 'auto')
}

function addPosterToVideo(element, src){
  element.setAttribute('poster', src)
}

function videoUpdateTime(event){
  if( event.target.duration -event.target.currentTime < 0.5 ){
    console.log('timeupdate : ', event.target.currentTime, event.target.duration )
    event.target.removeEventListener("timeupdate", videoUpdateTime);
    executeAfterVideoReady(document.getElementById('c4r-video'), () => {
      document.getElementById('c4r-video').requestPictureInPicture()
    })
    
  }
}

  chrome.storage.local.get((result) => {
    list = result.list
    auto = result.auto
    pause = result.pause
    force = result.force
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

  vURL = chrome.extension.getURL('/assets/c4r.mp4')
  // vURL = 'http://upload.wikimedia.org/wikipedia/commons/7/79/Big_Buck_Bunny_small.ogv'
  vPoster = chrome.extension.getURL('/assets/c4r.png')


  if (observerVideo) {
    console.log("disconnecting old observer")
    await observerVideo.disconnect()
    for(vi of document.querySelectorAll('video')){
      vi.removeEventListener("timeupdate", videoUpdateTime);
    }
  }

  observerVideo = new MutationObserver(async (mutationList, observer) => {
    // console.log("mutationList" + count)
    const _video = queryVideo()
    if (_video !== 'noVideo') {
      if (videoUrl !== _video.src) {
        // console.log("videoUrl:" + videoUrl)
        // console.log("video.src:" + _video.src)
        videoUrl = _video.src
        
        console.log("video address changed")
        if (document.pictureInPictureElement) {

          console.log('prepare to reenter pip')
          // ---------------------------------------------
          // cannot exit here, scrip will loose permission
          // document.exitPictureInPicture()
          // ---------------------------------------------
          // console.log('directly reenter pip')
          executeAfterVideoReady(_video, () => {
            // console.log("start call back observe")
            _video.requestPictureInPicture().then(()=>{

              _video.addEventListener('timeupdate', videoUpdateTime);
            }).catch((error) => {
              console.log("fail PIP", error)
            })
          })
        }
      }
    }
  })

  if (document.pictureInPictureElement) {
    console.log("has PIP")
    let ePiP = document.pictureInPictureElement
    // await document.pictureInPictureElement.requestPictureInPicture()
    await document.exitPictureInPicture();
    await ePiP.requestPictureInPicture()
    await document.exitPictureInPicture();
  } else {

    if(! document.getElementById('c4r-video')){
      v = document.createElement('video')
      document.body.appendChild(v);
  
      v.setAttribute('id','c4r-video')
      addSourceToVideo(document.getElementById('c4r-video'), vURL);
      addPosterToVideo(document.getElementById('c4r-video'),vPoster)
    }


    executeAfterVideoReady(video, () => {
      // console.log("start call back")
      video.requestPictureInPicture().then(() => {
        if (list) {
          observerVideo.observe(document.querySelector('body'), { subtree: true, childList: true, attributes: true, attributeOldValue: false, characterDataOldValue: false })
        }

        video.addEventListener('timeupdate', videoUpdateTime);

      })
    })

  }
})();
