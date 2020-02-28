chrome.storage.local.get({ time: 5, volume: 5, play: true, auto: true, pause: false, list: false }, results => {
  const targetTime = document.querySelector('#time')
  const targetVolume = document.querySelector('#volume')
  const targetPlay = document.querySelector('#play')
  const targetlist = document.querySelector('#list')
  const targetOk = document.querySelector('#ok')
  // const targetAuto = document.querySelector('#auto')
  // const targetPause = document.querySelector('#pause')
  targetTime.value = results.time
  targetVolume.value = results.volume
  targetPlay.checked = results.play
  // targetAuto.checked = results.auto
  // targetPause.checked = results.pause
  targetlist.checked = results.list
  targetOk.addEventListener('click', () => {
    chrome.storage.local.set({
      time: targetTime.value,
      volume: targetVolume.value,
      play: targetPlay.checked,
      // auto: targetAuto.checked,
      // pause: targetPause,
      list: targetlist.checked
    })
  })
})