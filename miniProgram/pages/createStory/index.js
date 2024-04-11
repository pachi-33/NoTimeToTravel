// pages/createStory/index.js
import Api from "../../utils/api";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    mediaList: [],
    diaryTitle: "",
    diaryContent: "",
    mode: "create",//create or edit
    // 顶部布局参数
    menuTop: 0,
    menuHeight: 0,
    menuLeft: 0,
    uploadPicDisplay: "flex",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const res = wx.getMenuButtonBoundingClientRect();
    this.setData({
      menuTop: res.top,
      menuHeight: res.height,
      menuLeft: res.width + 10,
      mode: "create"
    });
    if (options.noteId) {
      this.setData({
        mode: "edit"
      })
      const res = await Api.getNoteDetails({
        noteId: options.noteId
      });
    }

  },
  handleTitleChange(e) {
    this.data.diaryTitle = e.detail.value;
  },
  handleContentChange(e) {
    this.data.diaryContent = e.detail.value;
  },
  bindChooseMedia: function () {
    if (this.data.mediaList.length >= 9) {
      this.setData({ uploadPicDisplay: "none" })
      wx.showToast({
        title: "最多上传9张图片",
        icon: "none",
        duration: 2000,
      });
      return;
    }
    this.setData({ uploadPicDisplay: "flex" })
    let remainChooseCount = 9 - this.data.mediaList.length;
    wx.chooseMedia({
      count: remainChooseCount,
      sizeType: ["compressed"], //先使用小程序官方的压缩，后续可以考虑自己压缩
      mediaType: ["image", "video"],
      sourceType: ["album", "camera"],
      success: (res) => {
        let { tempFiles } = res;
        // console.log(tempFiles);
        let tempArray = this.data.mediaList;
        for (let i = 0; i < tempFiles.length; i++) {
          tempArray.push({
            tempFilePath: tempFiles[i].tempFilePath,
            fileType: tempFiles[i].fileType,
            url: "",
          })
          wx.uploadFile({
            filePath: tempFiles[i].tempFilePath,
            name: 'name',
            url: 'https://ctrip.x3322.net:3000/api/travelDiary/uploadFile',
            formData: {
              mediaType: tempFiles[i].fileType == "image" ? "img" : "video"
            },
            success(res) {
              if (res.statusCode === 200) {
                const { url, mediaType } = res.data;
                tempArray[tempArray.length - 1].url = url;
              }
            }
          })
        }
        // console.log(tempArray);
        this.setData({
          mediaList: tempArray,
        });
        if (tempArray.length >= 9) {
          this.setData({ uploadPicDisplay: "none" })
        }
      },
    });
  },
  //先不做
  bindPreviewMedia: function () { },
  catchDelMedia: function (e) {
    if (this.data.mediaList.length >= 9) {
      this.setData({
        uploadPicDisplay: "flex"
      })
    }
    let tempArray = this.data.mediaList;
    tempArray.splice(e.target.dataset.index, 1);
    this.setData({
      mediaList: tempArray
    })
    // console.log(this.data.mediaList);
  },
  bindSubmit: async function () {
    if (this.data.diaryTitle == "") {
      wx.showToast({
        title: "请输入故事标题！",
        icon: "none",
        duration: 2000,
      });
      return;
    }
    if (this.data.diaryContent == "") {
      wx.showToast({
        title: "请输入故事内容！",
        icon: "none",
        duration: 2000,
      });
      return;
    }
    if (this.data.mediaList.length == 0) {
      wx.showToast({
        title: "请上传图片或视频！",
        icon: "none",
        duration: 2000,
      });
      return;
    }
    let tempArray = [];
    for (let i = 0; i < this.data.mediaList.length; i++) {
      tempArray.push({
        fileType: this.data.mediaList[i].fileType == "image" ? "img" : "video",
        url: this.data.mediaList[i].url,
      })
    }
    let res = await Api.uploadNote({
      content: {
        noteTitle: this.data.diaryTitle,
        noteContent: this.data.noteContent,
        location: "",
        resources: tempArray,
      }
    })
    if (res.data.status === 200) {
      wx.showToast({
        title: '发布成功',
        icon: 'success',
        duration: 2000
      })
      setTimeout(() => {
        wx.navigateTo({
          url: `/pages/storyDetail/index?noteId=${res.data.noteId}`,
        })
      }, 2000)
    }
    else {
      wx.showToast({
        title: '发布失败',
        icon: 'error',
        duration: 2000,
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() { },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() { },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() { },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() { },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() { },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() { },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() { },
});
