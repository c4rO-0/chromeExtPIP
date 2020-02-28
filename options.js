chrome.storage.local.get({ time: 5, volume: 5, play: true, list: false }, results => {
  const targetTime = document.querySelector('#time')
  const targetVolume = document.querySelector('#volume')
  const targetPlay = document.querySelector('#play')
  const targetlist = document.querySelector('#list')
  const targetOk = document.querySelector('#ok')
  targetTime.value = results.time
  targetVolume.value = results.volume
  targetPlay.checked = results.play
  targetlist.checked = results.list
  targetOk.addEventListener('click', () => {
    chrome.storage.local.set({ time: targetTime.value, volume: targetVolume.value, play: targetPlay.checked, list: targetlist.checked })
  })
})