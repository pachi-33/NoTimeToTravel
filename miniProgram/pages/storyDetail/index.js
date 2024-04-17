// pages/storyDetail/index.js
import Api from "../../utils/api.js";
import util from "../../utils/util.js";
Page({
  data: {
    noteIdToSearch: 0,
    content: {
      noteId: "",
      noteTitle: "鼓浪屿探秘：闲适慢生活的海岛风情",
      noteContent: `  鼓浪屿是厦门的象征之一，其历史可以追溯到19世纪。岛上保留着大量具有欧洲风情的建筑，包括西式别墅、教堂和邮局等，每一座建筑都有着属于自己的故事。漫步在鼓浪屿的小巷中，仿佛穿越到了百年前的时光隧道。`,
      authorNickname: "喜欢旅游的小明",
      avatar: "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAOEcdM.img",
      viewNum: 100,
      likeNum: 200,
      collectNum: 300,
      isCollected: true,
      lastModifyTime: "2024-04-04 12:12:12",
      location: "厦门",
      resources: [{
          mediaType: "image",
          url: "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAOEcdM.img",
        },
        {
          mediaType: "image",
          url: "https://res.wx.qq.com/op_res/7_miJnK0wxIrh5bV2QqvYYjda9Dp372N3T05q_nn3PgvoXBoReXvaXBfkthtXQLN7m5_YI6FoTre-xvJBDFLMA",
        },
        {
          mediaType: "image",
          url: "https://res.wx.qq.com/op_res/7_miJnK0wxIrh5bV2QqvYfa6mRnywhNbBFV5eAt7oTz3zjlNJeujfQx0PVA1ufenPHBvxYXRNJ5chyi6RPaE7A",
        },
        {
          mediaType: "image",
          url: "https://res.wx.qq.com/op_res/7_miJnK0wxIrh5bV2QqvYZB1p48LLH-Pc7Rzr4nN0YF-uZg7FW7zksw_Kjp0BNDHcZp9R9SRKbg0rA1HBaeK3Q",
        },
        {
          mediaType: "image",
          url: "https://res.wx.qq.com/op_res/0-l2fyKjv3_BR62E3KwTJPRaN5CDI6NZFg_qbSxeqF8UBpM4lXJ_1o9S9bsOOxMpuXGLeKyAKleWlAXmVLmQOw",
        },
        {
          mediaType: "image",
          url: "https://res.wx.qq.com/op_res/7_miJnK0wxIrh5bV2QqvYRu0VRyVvePJ4pB4_Dvj0ytF-ovjQzMl6WMLyuCeKk3579HNjKLIeNrHE7OprTBx5w",
        },
        {
          mediaType: "image",
          url: "https://res.wx.qq.com/op_res/7_miJnK0wxIrh5bV2QqvYRu0VRyVvePJ4pB4_Dvj0ytF-ovjQzMl6WMLyuCeKk3579HNjKLIeNrHE7OprTBx5w",
        },
        {
          mediaType: "video",
          url: "https://prod-streaming-video-msn-com.akamaized.net/910e7354-d9fa-46b7-851d-0dfbd7854b52/6b480c47-1959-400e-9fb5-22d51f4a6427.mp4",
        },
        {
          mediaType: "video",
          url: "https://prod-streaming-video-msn-com.akamaized.net/9d7890f2-2646-4544-bbc7-5082440f52ef/df8ea196-566a-4291-85b2-c3bcb3781080.mp4",
        },
        {
          mediaType: "video",
          url: "https://prod-streaming-video-msn-com.akamaized.net/a75a7d73-21ab-4ac9-8c30-890433965c24/e9f6bdcb-eba0-4eca-b9d2-60d3415bf65f.mp4",
        },
      ],
    },
    haveCommentList: true,
    comments: [{
        commentId: 1,
        commentBy: "mmmmii",
        commentContent: "哇塞，姐妹你好厉害",
        commentTime: "2024-05-05 12:12:12", //较新的
      },
      {
        commentId: 2,
        commentBy: "闪闪",
        commentContent: "666",
        commentTime: "2024-05-05 12:12:12", //较久的
      },
      {
        commentId: 3,
        commentBy: "爱吃的小红花",
        commentContent: "厦门有什么好吃的吗",
        commentTime: "2024-05-05 12:12:12", //较久的
      },
      {
        commentId: 4,
        commentBy: "红一耶",
        commentContent: "我也想去厦门玩",
        commentTime: "2024-05-05 12:12:12", //较久的
      },
      {
        commentId: 5,
        commentBy: "nickname2",
        commentContent: "下周就出发去厦门了",
        commentTime: "2024-05-05 12:12:12", //较久的
      },
      {
        commentId: 6,
        commentBy: "nickname2",
        commentContent: "呜呜呜呜呜我的阿斯",
        commentTime: "2024-05-05 12:12:12", //较久的
      },
      {
        commentId: 7,
        commentBy: "nickname2",
        commentContent: "666",
        commentTime: "2024-05-05 12:12:12", //较久的
      },
    ],
    imgheightList: [],
    userComment: "",
    current: 0,
    // 顶部布局参数
    menuTop: 0,
    menuHeight: 0,
    menuLeft: 0,
    //底部布局参数
    commentpos: 0,
    likeImgUrl: "../../pics/like.png",
  },

  onLoad: function (options) {
    const res = wx.getMenuButtonBoundingClientRect();
    const {
      noteId
    } = options;
    this.setData({
      menuTop: res.top,
      menuHeight: res.height,
      menuLeft: res.width + 10,
      noteIdToSearch: noteId,
    });
    console.log("noteID",noteId)
    this.getDetail();
    this.getComment();
  },

  bindChange: function (e) {
    this.setData({
      current: e.detail.current,
    });
  },
  imageLoad: function (e) {
    let imgwidth = e.detail.width;
    let imgheight = e.detail.height;
    //宽高比
    const ratio = imgwidth / imgheight;
    console.log(imgwidth, imgheight);
    //计算的高度值
    const newHeight = 675 / ratio;
    const imgheights = this.data.imgheightList;
    //把每一张图片的对应的高度记录到数组里
    imgheights[e.target.dataset.id] = newHeight;
    this.setData({
      imgheightList: imgheights,
    });
    console.log(this.data.imgheightList);
  },
  videoLoad: function (e) {
    console.log("视频加载完成",e);
  },
  bindCommentInput: function (e) {
    this.setData({
      userComment: e.detail.current,
    });
  },
  bindTapBackIcon: function () {
    wx.navigateBack();
  },
  bindConfirmComment: async function () {
    const data = {
      noteId: Number(this.data.noteIdToSearch),
      commentContent: this.data.userComment,
    };
    let res = await Api.makeComment(data);
    if (res.data.status !== 200) {
      wx.navigateTo({
        url: "/pages/login/index",
      });
      return;
    }
    await getComment();
  },
  getDetail: async function () {
    let res = await Api.getNoteDetails({
      noteId: Number(this.data.noteIdToSearch)
    });
    console.log("getNoteDetail的res", res);
    let newContent = res.data.content || {};
    this.setData({
      content: newContent,
    });
  },
  getComment: async function () {
    let res = await Api.getNoteComments({
      noteId: Number(this.data.noteIdToSearch)
    });
    console.log("getCommentList的res", res);
    let newComments = res.data.comments || [];
    this.setData({
      comments: newComments,
    });
  },
  bindScrollToUpper: async function () {
    await this.getDetail();
    await this.getComment();
  },
  bindTapLike: async function () {
    const data = {
      noteId: Number(this.data.noteIdToSearch),
    };
    this.setData({
      content: {
        ...this.data.content,
        likeNum: this.data.content.likeNum + 1,
      },
    });
    if (this.data.likeImgUrl === "../../pics/like.png") {
      this.setData({
        likeImgUrl: "../../pics/like-fill.png",
      });
    }
    let res = await Api.likeNote(data);
    if (res.data.status !== 200) {
      wx.navigateTo({
        url: "/pages/login/index",
      });
      return;
    }
  },
  bindTapCollect: async function () {
    const data = {
      noteId: Number(this.data.noteIdToSearch),
    };
    let res;
    if (this.data.content.isCollected==="true") {
      res = await Api.cancelcollectNote(data);
      this.setData({
        content: {
          ...this.data.content,
          isCollected: "false",
          collectNum: this.data.content.collectNum - 1,
        },
      });
    } else {
      res = await Api.collectNote(data);
      this.setData({
        content: {
          ...this.data.content,
          isCollected: "true",
          collectNum: this.data.content.collectNum + 1,
        },
      });
    }
    if (res.data.status === 401 ) {
      wx.navigateTo({
        url: "/pages/login/index",
      });
      return;
    }
  },
  bindCommentFocus: function () {
    console.log("focus");
    util.checkUserLogin();
  },
  onShareAppMessage() {
    const {
      noteTitle,
      noteId
    } = this.data.content;
    const {
      imageUrl
    } = this.data.content.resources[0].url;
    return {
      title: noteTitle,
      path: `/pages/storyDetail/index?noteId=${noteId}`,
      imageUrl: imageUrl,
    };
  },
});