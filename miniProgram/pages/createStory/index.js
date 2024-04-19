// pages/createStory/index.js
import Api from "../../utils/api";
import util from "../../utils/util";
Page({
  data: {
    //mediaList结构：fileType,tempFilePath,url,fileID
    mediaList: [],
    diaryTitle: "",
    diaryContent: "",
    editNoteId: "",
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
      mode: "create",
    });
    await util.checkUserLogin();
    if (options.noteId) {
      this.setData({
        mode: "edit",
        editNoteId: options.noteId,
      });
      const res = await Api.getNoteDetails({
        noteId: Number(options.noteId),
      });
      //设置默认值为已获得的内容
      if (res.data.status === 200 && res.data.content.resources) {
        const newMediaList = res.data.content.resources.map(file => {
          let filetype = ""
          if (file.mediaType === "img")
            filetype = "image"
          else filetype = "video"
          return {
            filetype: filetype,
            tempFilePath: "",
            url: file.url,
            fileID: ""
          }
        })
      } else {
        wx.showToast({
          title: '获取游记详情失败',
          icon: 'none',
          duration: 2000
        })
      }



    }
  },
  handleTitleChange(e) {
    this.setData({
      diaryTitle: e.detail.value,
    });
  },
  handleContentChange(e) {
    this.setData({
      diaryContent: e.detail.value,
    });
  },
  bindChooseMedia: function () {
    let _this = this;
    if (this.data.mediaList.length >= 9) {
      this.setData({
        uploadPicDisplay: "none",
      });
      wx.showToast({
        title: "最多上传9张图片/视频",
        icon: "none",
        duration: 2000,
      });
      return;
    }
    this.setData({
      uploadPicDisplay: "flex",
    });
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
        //console.log(tempFiles);
        let tempArray = this.data.mediaList;
        for (let i = 0; i < tempFiles.length; i++) {
          tempArray.push({
            fileType: tempFiles[i].fileType,
            tempFilePath: tempFiles[i].tempFilePath,
            url: "",
            fileID: "",
          });
        }
        // console.log(tempArray);
        this.setData({
          mediaList: tempArray,
        });
        console.log(this.data.mediaList);
        if (tempArray.length >= 9) {
          this.setData({
            uploadPicDisplay: "none",
          });
        }
      },
    });
  },
  // uploadToCloud: function () {
  //   let _this = this;
  //   for (let i = 0; i < tempFiles.length; i++) {
  //     let tempFiles = _this.data.mediaList;
  //     console.log(tempFiles);
  //     let prefix = "";
  //     if (tempFiles[i].fileType === "video") prefix = "video";
  //     else prefix = "img";
  //     let fileuuid = util.wxuuid();
  //     let suffix = /\.\w+$/.exec(tempFiles[i].tempFilePath)[0];
  //     wx.cloud
  //       .uploadFile({
  //         cloudPath: prefix + "/" + new Date().getTime() + fileuuid + suffix,
  //         filePath: tempFiles[i].tempFilePath,
  //       })
  //       .then((res) => {
  //         console.log("上传media到云成功", res);
  //         _this.setData({
  //           [`mediaList[${i}].url`]: res.fileID,
  //         });
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // },
  //先不做
  bindPreviewMedia: function (e) {
    const previewMediaList = this.data.mediaList.map(file => {
      return {
        url: (file.url || file.tempFilePath),
        type: file.fileType
      }
    })
    console.log(e.currentTarget.dataset.index)
    wx.previewMedia({
      sources:previewMediaList,
      current:e.currentTarget.dataset.index
    })
  },
  catchDelMedia: function (e) {
    if (this.data.mediaList.length >= 9) {
      this.setData({
        uploadPicDisplay: "flex",
      });
    }
    let tempArray = this.data.mediaList;
    tempArray.splice(e.target.dataset.index, 1);
    this.setData({
      mediaList: tempArray,
    });
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
    wx.showToast({
      title: '抓紧上传中~',
      icon: 'loading',
      duration:3000
    })
    //所有内容上传到云端[已有内容不上传]
    const upLoadPromises = this.data.mediaList.map((file) => {
      return new Promise((resolve, reject) => {
        let prefix = "";
        if (file.fileType === "video") prefix = "video";
        else prefix = "img";
        let fileuuid = util.wxuuid();
        let suffix = /\.\w+$/.exec(file.tempFilePath)[0]; //正则表达式返回文件的扩展名
        if (file.url) {
          resolve(file)
        }
        wx.cloud
          .uploadFile({
            cloudPath: prefix + "/" + new Date().getTime() + fileuuid + suffix,
            filePath: file.tempFilePath,
          })
          .then((res) => {
            console.log("上传media到云成功", res);
            file.fileID = res.fileID;
            resolve(file);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    });
    Promise.all(upLoadPromises).then((res) => {
      this.setData({
        mediaList: res,
      });
      //分割为两部分，前半部分一定是已经有url的
      const fileIDList = this.data.mediaList.filter(fileobj => fileobj.fileID).map(fileobj => fileobj.fileID);
      console.log("fileIDlist", fileIDList)
      //fileID换取url
      wx.cloud
        .getTempFileURL({
          fileList: fileIDList,
        })
        .then((res) => {
          // get temp file URL
          console.log(res.fileList);
          //搜索fileID匹配的,修改对应的url
          for (let i = 0; i < res.fileList.length; i++) {
            const changeSub = this.data.mediaList.findIndex(item => (item.fileID === fileIDList[i]))
            if (res.fileList[i].status === 0)
              this.setData({
                [`mediaList[${changeSub}].url`]: res.fileList[i].tempFileURL,
              });
            else
              this.setData({
                [`mediaList[${changeSub}].fileType`]: "image",
                [`mediaList[${changeSub}].url`]: "cloud://cloud1-3gqiovxdc0a8a188.636c-cloud1-3gqiovxdc0a8a188-1325653378/default/nopic.png",
              });
          }
          let tempArray = [];
          for (let i = 0; i < this.data.mediaList.length; i++) {
            console.log("开始构造上传结构", this.data.mediaList[i])
            tempArray.push({
              mediaType: this.data.mediaList[i].fileType == "image" ? "img" : "video",
              url: this.data.mediaList[i].url,
            });
          }
          if (this.data.mode === "edit") {
            Api.modifyNote({
              content: {
                noteId: this.data.editNoteId,
                noteTitle: this.data.diaryTitle,
                noteContent: this.data.diaryContent,
                location: "SHANGHAI",
                resources: tempArray,
              },
            }).then((res) => {
              if (res.data.status === 200) {
                wx.showToast({
                  title: "发布成功",
                  icon: "success",
                  duration: 2000,
                });
                setTimeout(() => {
                  wx.navigateTo({
                    url: `/pages/storyDetail/index?noteId=${res.data.noteId}`,
                  });
                }, 2000);
              } else {
                wx.showToast({
                  title: "发布失败",
                  icon: "error",
                  duration: 2000,
                });
              }
            });
          } else {
            Api.uploadNote({
              content: {
                noteTitle: this.data.diaryTitle,
                noteContent: this.data.diaryContent,
                location: "SHANGHAI",
                resources: tempArray,
              },
            }).then((res) => {
              if (res.data.status === 200) {
                wx.showToast({
                  title: "发布成功",
                  icon: "success",
                  duration: 2000,
                });
                setTimeout(() => {
                  this.setData({
                    mediaList:[],
                    diaryTitle:"",
                    diaryContent:""
                  })
                  wx.navigateTo({
                    url: `/pages/storyDetail/index?noteId=${res.data.noteId}`,
                  });
                }, 2000);
              } else {
                wx.showToast({
                  title: "发布失败",
                  icon: "error",
                  duration: 2000,
                });
              }
            });
          }
        })
        .catch((error) => {
          console.log(error);
          return;
        });
    });
  },
});