# 旅行物语——微信小程序端
没有时间也要旅行组
## 项目介绍
- 本项目是携程前端训练营大作业——旅游日记平台小程序端

旅行物语小程序是一款可以记录你在旅途中的所见所闻的小程序。你可以随时随地向他人分享属于你的物语，在这里，你也可以观看他人分享的物语。

## 环境依赖
本小程序基于Skyline渲染引擎开发，小程序基础库版本3.3.4以上即可使用该小程序。

## 目录结构
```
├── README.md
├── app.js
├── app.json
├── app.wxss
├── pages
│   ├── createStory //发布游记
│   │   ├── index.js
│   │   ├── index.json
│   │   ├── index.wxml
│   │   └── index.wxss
│   ├── home    //游记列表（主页）
│   │   ├── data.js
│   │   ├── index.js
│   │   ├── index.json
│   │   ├── index.wxml
│   │   └── index.wxss
│   ├── login   //登录页
│   │   ├── index.js
│   │   ├── index.json
│   │   ├── index.wxml
│   │   └── index.wxss
│   ├── me  //"我的"页面
│   │   ├── index.js
│   │   ├── index.json
│   │   ├── index.wxml
│   │   └── index.wxss
│   ├── myCollection    //我的收藏页面
│   │   ├── index.js
│   │   ├── index.json
│   │   ├── index.wxml
│   │   └── index.wxss
│   ├── myStory //我的游记页面
│   │   ├── index.js
│   │   ├── index.json
│   │   ├── index.wxml
│   │   └── index.wxss
│   ├── searchDetail    //搜索结果页面
│   │   ├── index.js
│   │   ├── index.json
│   │   ├── index.wxml
│   │   └── index.wxss
│   └── storyDetail //游记详情页面
│       ├── index.js
│       ├── index.json
│       ├── index.wxml
│       └── index.wxss
├── pics //存放所有用到的icon图标
├── project.config.json
├── project.private.config.json
├── sitemap.json
└── utils
    ├── api.js  //所有的接口函数封装
    ├── request.js  //wx.request封装
    └── util.js //工具函数封装
```
## 使用说明
使用微信扫描下二维码即可使用小程序，小程序包含以下页面
![小程序码](./readmePic/gh_ecd2332eb518_258.jpg)

1. 首页
![alt text](README/9beccebdbe1ca08b61cfc7edb929cca.png)
2. 搜索结果页
![alt text](README/0184878bd5e7397d35020274b125d64.png)
3. 游记详情页
![alt text](README/f83d6c24a0832f5d35f8666bfa6c465.png)
4. 发布游记/编辑游记页
![alt text](README/b3e6aaceb7b8abe7f68ba9ce8d5985a.jpg)
5. 我的资料页面
![alt text](README/cdc86c6fe4481c04c60388639c18529.jpg)
6. 我的游记页面
![alt text](README/10572fff5c45971e7059a1ec48f57fb.png)
7. 我的收藏页面
![alt text](README/fe47e2714bd8699d5a71e02b66ec2e5.png)
8. 登录页
![alt text](README/99ae1542cf04b73ef5ef938e672e9b1.jpg)

