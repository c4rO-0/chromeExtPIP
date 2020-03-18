# chromeExtPIP

[![GitHub All Releases](https://img.shields.io/github/downloads/c4rO-0/chromeExtPIP/total?label=Git%20Downloads&style=flat-square)](https://github.com/c4rO-0/chromeExtPIP/blob/master/README.zh-tw.md#%E5%AE%89%E8%A3%9D) [![Chrome Web Store](https://img.shields.io/chrome-web-store/users/banggcaohiaanmdkalekjcffjonamlkj?label=Chrome%20Users&style=flat-square)](https://github.com/c4rO-0/chromeExtPIP/blob/master/README.zh-tw.md#%E5%AE%89%E8%A3%9D)

---

[简体中文](./README.md), [繁體中文](./README.zh-tw.md), [English](./README.en.md)

[TOC]

---

該插件可以讓視頻是小窗口的形式懸浮在桌面上, 實現辦公娛樂兩部耽誤.

該插件可以在視頻變動後自動加載. 並且配合全局快捷鍵可實現方便地調整進度條.

![](./readme/view.png)

## 技術說明

該插件基於畫中畫技術([Picture in Picture](https://w3c.github.io/picture-in-picture/)).  

已知支持該技術瀏覽器：

- chrome 桌面正式版71及以上

其他瀏覽器的支持情況未知.

## 安裝

### 商店

- 點擊[![Chrome Web Store](https://img.shields.io/chrome-web-store/v/banggcaohiaanmdkalekjcffjonamlkj?style=flat-square)](https://chrome.google.com/webstore/detail/%E5%B0%8F%E7%AA%97%E5%8F%A3%E8%A7%86%E9%A2%91-by-c4r/banggcaohiaanmdkalekjcffjonamlkj)進入chrome商店.
- 點擊頁麵中的`添加至 Chrome`完成安裝.
- 若要使用全局快捷鍵, 請完成設置步驟.

### 安裝包 

- 通過點擊[![GitHub release (latest by date including pre-releases)](https://img.shields.io/github/v/release/c4rO-0/chromeExtPIP?include_prereleases&style=flat-square)](https://github.com/c4rO-0/chromeExtPIP/releases/latest)找到最新版本, 並保存zip文件到本地.
![](./readme/ins_step1.png)

- 打開Chrome擴展管理頁面. 地址欄輸入 : [chrome://extensions](chrome://extensions). 並確保開發者模式已開啟.
![](./readme/ins_step2.png)

- 將下載的zip文件拖拽到瀏覽器頁麵裡. 安裝完成. 若要使用全局快捷鍵, 請完成設置步驟.
![](./readme/ins_step3.png)


## 設置

### 快捷鍵設置

**chrome 插件安裝時默認限制最多4個快捷鍵, 若要完整體驗本插件, 請務必手動設置.**

- 快捷鍵設置頁面 : 在瀏覽器內輸入 [chrome://extensions/shortcuts](chrome://extensions/shortcuts) 

- 按照個人喜好分配快捷鍵. 

- 如果想全局使用快捷鍵控制小窗口, **需要選擇全局**

快捷鍵推薦設置：
* 前進：Ctrl + →, Global
* 後退：Ctrl + ←, Global
* 播放暫停：Ctrl + Space, Global
* 音量增：Ctrl + ↑, Global
* 音量減：Ctrl + ↓, Global

![](./readme/set_step1.png)

### 選項
在工具欄右擊插件圖標, 選擇`選項`可打開插件選項界面.
![](./readme/set_step2.png)

**選項頁內各項目：**

* 快進/快退：設置快進、快退的時間間隔, 默認5秒.  
* 音量增/減：設置音量增、減的大小, 默認5%.  
* 列表播放不間斷：選中後, 連續播放的視頻都會一直保持在小框口中, 默認勾選.  
* 快捷鍵設置：打開快捷鍵設置頁.  
* 確定：**點確定, 設置才生效**.  

## 運行
* 點擊插件圖標, 網頁中的視頻會進入小窗口（pip）模式, 再次點擊退出.  
* 設置好全局快捷鍵後, 按 Ctrl + ← 可以快退, Ctrl + → 快進, Ctrl + ↑ 音量增, Ctrl + ↓ 音量減.  
