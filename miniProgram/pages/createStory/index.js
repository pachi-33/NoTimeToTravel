// pages/createStory/index.js
import Api from "../../utils/api";
import util from "../../utils/util";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    mediaList: [],
    diaryTitle: "",
    diaryContent: "",
    mode: "create", //create or edit
    // 顶部布局参数
    menuTop: 0,
    menuHeight: 0,
    menuLeft: 0,
    uploadPicDisplay: "flex",
  },
  onLoad: async function (options) {
    const res = wx.getMenuButtonBoundingClientRect();
    this.setData({
      menuTop: res.top,
      menuHeight: res.height,
      menuLeft: res.width + 10,
      mode: "create"
    });
    await util.checkUserLogin();
    if (options.noteId) {
      this.setData({
        mode: "edit"
      })
      const res = await Api.getNoteDetails({
        noteId: Number(options.noteId)
      });
    }

  },
  handleTitleChange(e) {
    this.setData({
      diaryTitle: e.detail.value
    });
  },
  handleContentChange(e) {
    this.setData({
      diaryContent: e.detail.value
    });
  },
  bindChooseMedia: function () {
    if (this.data.mediaList.length >= 9) {
      this.setData({
        uploadPicDisplay: "none"
      })
      wx.showToast({
        title: "最多上传9张图片/视频",
        icon: "none",
        duration: 2000,
      });
      return;
    }
    this.setData({
      uploadPicDisplay: "flex"
    })
    let remainChooseCount = 9 - this.data.mediaList.length;
    wx.chooseMedia({
      count: remainChooseCount,
      sizeType: ["compressed"], //先使用小程序官方的压缩，后续可以考虑自己压缩
      mediaType: ["image", "video"],
      sourceType: ["album", "camera"],
      success: (res) => {
        let {
          tempFiles
        } = res;
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
            name: tempFiles[i].fileType == "image" ? "imageFile" : "videoFile",
            header: {
              "content-type": "multipart/form-data",
              "Authorization": wx.getStorageSync("token"),
            },
            url: 'https://47.120.68.102/api/travelDiary/verification/uploadFile',
            formData: {
              mediaType: tempFiles[i].fileType == "image" ? "img" : "video"
            },
            success(res) {
              if (res.statusCode === 200) {
                const {
                  url,
                  mediaType
                } = res.data;
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
          this.setData({
            uploadPicDisplay: "none"
          })
        }
      },
    });
  },
  //先不做
  bindPreviewMedia: function () {},
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
        title: "请输入游记标题！",
        icon: "none",
        duration: 2000,
      });
      return;
    }
    if (this.data.diaryContent == "") {
      wx.showToast({
        title: "请输入游记内容！",
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
        noteContent: this.data.diaryContent,
        location: "SHANGHAI",
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
    } else {
      wx.showToast({
        title: '发布失败',
        icon: 'error',
        duration: 2000,
      })
    }
  },
});
