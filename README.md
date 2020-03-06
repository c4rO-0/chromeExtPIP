# chromeExtPIP

---

[简体中文](./README.md), [繁體中文](./README.zh-tw.md), [English](./README.en.md)

[TOC]

---

该插件可以让视频以小窗口的形式悬浮在桌面上.

该插件可以在视频变动后自动加载. 并且配合全局快捷键可实现方便地调整播放进度.

![](./readme/view.png)

## 技术说明

该插件基于画中画技术([Picture in Picture](https://w3c.github.io/picture-in-picture/)).  

已知支持该技术浏览器：

- chrome 桌面正式版71及以上

其他浏览器的支持情况未知.

## 安装

### 商店 : 暂无
### 安装包 

- 通过点击[![GitHub release (latest by date including pre-releases)](https://img.shields.io/github/v/release/c4rO-0/chromeExtPIP?include_prereleases&style=flat-square)](https://github.com/c4rO-0/chromeExtPIP/releases/latest)找到最新版本, 并保存zip文件到本地.
![](./readme/ins_step1.png)

- 打开Chrome扩展管理页面. 地址栏输入 : [chrome://extensions](chrome://extensions). 并确保开发者模式已开启.
![](./readme/ins_step2.png)

- 将下载的zip文件拖拽到浏览器页面里. 安装完成.
![](./readme/ins_step3.png)


## 设置

### 快捷键设置

**chrome 插件安装时默认限制最多4个快捷键, 若要完整体验本插件, 请务必手动添加设置.**

- 快捷键设置页面 : 在浏览器内输入 [chrome://extensions/shortcuts](chrome://extensions/shortcuts) 

- 按照个人喜好分配快捷键. 

- 如果想全局使用快捷键控制小窗口, **需要选择全局**

快捷键推荐设置：
* 前进：Ctrl + →, 全局
* 后退：Ctrl + ←, 全局
* 播放暂停：Ctrl + 空格, 全局
* 音量增：Ctrl + ↑, 全局
* 音量减：Ctrl + ↓, 全局

![](./readme/set_step1.png)

### 选项
在工具栏右击插件图标, 选择`选项`可打开插件选项界面.
![](./readme/set_step2.png)

**选项页内各项目：**

* 快进/快退：设置快进、快退的时间间隔, 默认5秒.  
* 音量增/减：设置音量增、减的大小, 默认5%.  
* 列表播放不间断：选中后, 连续播放的视频都会一直保持在小框口中, 默认勾选.  
* 快捷键设置：打开快捷键设置页.  
* 确定：**点确定, 设置才生效**.  

## 运行
* 点击插件图标, 网页中的视频会进入小窗口（pip）模式, 再次点击退出.  
* 设置好全局快捷键后, 按 Ctrl + ← 可以快退, Ctrl + → 快进, Ctrl + ↑ 音量增, Ctrl + ↓ 音量减.  
