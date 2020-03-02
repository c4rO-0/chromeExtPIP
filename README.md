# chromeExtPIP

## 安装
- 商店 : 暂无
- 安装包 : [![GitHub release (latest by date including pre-releases)](https://img.shields.io/github/v/release/c4rO-0/chromeExtPIP?include_prereleases&style=flat-square)](https://github.com/c4rO-0/chromeExtPIP/releases/latest)
- 开发者: 下载整个项目, 导入文件夹

## 设置
chrome 插件安装时默认限制最多4个快捷键，若要完整体验本插件，请务必在 [chrome://extensions/shortcuts](chrome://extensions/shortcuts) 页面中手动定义所需的快捷键，并设置为全局！全局！！全局！！！

快捷键推荐设置：
* 前进：Ctrl + →，Global
* 后退：Ctrl + ←，Global
* 播放暂停：Ctrl + Space，Global
* 音量增：Ctrl + ↑，Global
* 音量减：Ctrl + ↓，Global


右键点击插件图标，可进入插件设置页，设置页内各项目：
* 快进/快退：设置快进、快退的时间间隔，默认5秒。
* 音量增/减：设置音量增、减的大小，默认5%。
* 列表播放不间断：选中后，连续播放的视频都会一直保持在小框口中，默认勾选。
* 快捷键设置：打开快捷键设置页。
* 确定：点确定，设置才生效。

## 运行
* 点击插件图标，网页中的视频会进入小窗口（pip）模式，再次点击退出。
* 设置好全局快捷键后，按 Ctrl + ← 可以快退，Ctrl + → 快进，Ctrl + ↑ 音量增，Ctrl + ↓ 音量减。

## 技术说明
该插件基于画中画技术([Picture in Picture](https://w3c.github.io/picture-in-picture/))。

已知支持该技术浏览器：
- chrome 桌面正式版71及以上
- [firefox抢先体验版](https://support.mozilla.org/en-US/kb/about-picture-picture-firefox)

其他浏览器的支持情况未知。
