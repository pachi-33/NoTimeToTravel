# Server End

# Database



## users   Table

| column      | alias        | type         | constraint                   |
| ----------- | ------------ | ------------ | ---------------------------- |
| uid         | 用户编号     | INT          | PK   NotNull   AutoIncrement |
| openid      | 用户唯一标识 | VARCHAR(255) | NotNull                      |
| session_key | 会话密钥     | VARCHAR(255) | NotNull                      |
| nickname    | 昵称         | VARCHAR(255) | default: `游客+uid`          |
| avatar      | 头像         | VARCHAR(255) |                              |



## reviewers   Table

| column     | alias      | type                    | constraint                   |
| ---------- | ---------- | ----------------------- | ---------------------------- |
| reviewerId | 审核员编号 | INT                     | PK   NotNull   AutoIncrement |
| username   | 账号       | VARCHAR(255)            | NotNull                      |
| password   | 密码       | VARCHAR(255)            |                              |
| auth       | 权限       | ENUM('admin', 'review') | NotNull                      |



## travelNote   Table

| column         | alias    | type          | constraint                   |
| -------------- | -------- | ------------- | ---------------------------- |
| noteId         | 游记编号 | INT           | PK   AutoIncrement   NotNull |
| noteTitle      | 标题     | VARCHAR(255)  | NotNull                      |
| noteContent    | 正文     | VARCHAR(4096) | NotNull                      |
| updateBy       | 作者 uid | INT           | FK   NotNull                 |
| viewNum        | 浏览量   | INT           | NotNull                      |
| likeNum        | 获赞量   | INT           | NotNull                      |
| collectNum     | 收藏量   | INT           | NotNull                      |
| uploadTime     | 上传时间 | DATETIME      | NotNull                      |
| lastModifyTime | 修改时间 | DATETIME      | NotNull                      |
| location       | 分享地点 | VARCHAR(255)  | NotNull                      |



## review   Table

| column     | alias           | type                                                 | constraint         |
| ---------- | --------------- | ---------------------------------------------------- | ------------------ |
| reviewId   | 审核编号        | INT                                                  | PK   AutoIncrement |
| noteId     | 游记编号 noteId | INT                                                  | FK   NotNull       |
| reviewTime | 审核时间        | DATETIME                                             |                    |
| reviewerId | 审核员编号 uid  | INT                                                  | FK                 |
| status     | 审核状态        | ENUM('waiting', 'approved', 'disapproved', 'delete') | NotNull            |
| comment    | 注释            | VARCHAR(1024)                                        |                    |



## resources   Table

| column    | alias    | type                 | constraint                        |
| --------- | -------- | -------------------- | --------------------------------- |
| noteId    | 游记编号 | INT                  | PK   FK   AutoIncrement   NotNull |
| idx       | 序号     | INT                  | PK NotNull                        |
| mediaType | 媒体类型 | ENUM('img', 'video') | NotNull                           |
| url       | 路径     | VARCHAR(255)         | NotNull                           |



## comments Table

| column         | alias         | type          | constraint         |
| -------------- | ------------- | ------------- | ------------------ |
| commentId      | 评论编号      | INT           | PK   AutoIncrement |
| noteId         | 游记编号      | INT           | FK   NotNull       |
| commentBy      | 评论用户  uid | INT           | FK NotNull         |
| commentContent | 内容          | VARCHAR(4096) | NotNull            |
| commentTime    | 评论时间      | DATETIME      | NotNull            |



## collection   Table

| column      | alias      | type     | constraint   |
| ----------- | ---------- | -------- | ------------ |
| uid         | 收藏者     | INT      | PK   NotNull |
| noteId      | 收藏的游记 | INT      | PK   NotNull |
| collectTime | 收藏时间   | DATETIME | NotNull      |



# Interface conventions

domain name: ctrip.x3322.net

port: 3000

接口:  domainName:port/api/~



## travelDiary

用户登录

[POST]	.../travelDiary/login

```js
req.data = {
    code
}

成功
res.data = {
    status: 200,
    msg: 'Login success.',
    token
}

```



获取用户信息

[POST]	.../travelDiary/getUserInfo

```js
req.data = {
    token 
}

获取成功
res.data = {
    status: 200,
    freshToken,
    nickname,
    avatarUrl,
    msg: 'Get user info success.',
}

验证失败
res.data = {
    status: 401,
    msg: 'Validation failed.',
}

token过期
res.data = {
    status: 401,
    msg: 'Authentication expires.',
}
```



设置头像

[POST]	.../travelDiary/setAvatar

```js
req.data = {
    token,
    img: 'base64...'
}

上传成功
res.data = {
    status: 200,
    freshToken,
    avatarUrl
}

上传途中出错
res.data = {
    status: 500,
    msg: "Upload failed."
}

验证失败
res.data = {
    status: 401,
    msg: 'Validation failed.',
}

token过期
res.data = {
    status: 401,
    msg: 'Authentication expires.',
}
```



设置昵称

[POST]	.../travelDiary/setNickName

```js
req.data = {
    token,
    nickName
}

修改成功
res.data = {
    status: 200,
    freshToken,
    nickName
}

昵称重复
res.data = {
    status: 400,
    msg: 'Duplicate nickname.'
}

验证失败
res.data = {
    status: 401,
    msg: 'Validation failed.',
}

token过期
res.data = {
    status: 401,
    msg: 'Authentication expires.',
}
```



按时间获取一定数量的游记列表

[POST]	.../travelDiary/getNoteListByTime

```js
req.data = {
    token,
    beforeWhen: 'YYYY-MM-DD HH:mm:ss', //获取该时间之前上传的游记，设置为当前时间即最新游记,
    beforeNoteId,
    listLength: 100
}

res.data = {
    status: 200,
    freshToken,
    noteList: [
        note001: {
            noteId,
            title,
            coverImg: url,
            authorNickname,
            authorAvatar: url,
            likeNume,
            uploadTime	//较新的
        },
    	note002: {
        	noteId,
            title,
            coverImg: url,
            authorNickname,
            authorAvatar: url,
            likeNume,
            uploadTime	//较久的
   	 	},
        ......
        ......
    ]
}
    
验证失败
res.data = {
    status: 401,
    msg: 'Validation failed.',
}

token过期
res.data = {
    status: 401,
    msg: 'Authentication expires.',
}
```



搜索游记标题获得列表

[POST]	.../travelDiary/getNoteListBySearchTitle

```js
req.data = {
    token,
    beforeWhen: 'YYYY-MM-DD HH:mm:ss', //获取该时间之前上传的游记，设置为当前时间即最新游记
    beforeNoteId,
    keyWords,
    listLength: 100
}

res.data = {
    status: 200,
    freshToken,
    noteList: [
        note001: {
            noteId,
            title,
            coverImg: url,
            authorNickname,
            authorAvatar: url,
            likeNume,
            uploadTime	//较新的
        },
    	note002: {
        	noteId,
            title,
            coverImg: url,
            authorNickname,
            authorAvatar: url,
            likeNume,
            uploadTime	//较久的
    	},
        ......
        ......
    ]
}
    
验证失败
res.data = {
    status: 401,
    msg: 'Validation failed.',
}

token过期
res.data = {
    status: 401,
    msg: 'Authentication expires.',
}
```



搜索作者获取游记列表

[POST]	.../travelDiary/getNoteListBySearchAuthor

```js
req.data = {
    token,
    beforeWhen: 'YYYY-MM-DD HH:mm:ss', //获取该时间之前上传的游记，设置为当前时间即最新游记
    beforeNoteId,
    authorNickname,
    listLength: 100
}

res.data = {
    status: 200,
    freshToken,
    noteList: [
        note001: {
            noteId,
            title,
            coverImg: url,
            authorNickname,
            authorAvatar: url,
            likeNume,
            uploadTime	//较新的
        },
    	note002: {
        	noteId,
            title,
            coverImg: url,
            authorNickname,
            authorAvatar: url,
            likeNume,
            uploadTime	//较久的
    	},
        ......
        ......
    ]
}
    
验证失败
res.data = {
    status: 401,
    msg: 'Validation failed.',
}

token过期
res.data = {
    status: 401,
    msg: 'Authentication expires.',
}
```



获取游记详情内容 同时浏览量加一

[POST]	.../travelDiary/getNoteDetails

```js
req.data = {
    token,
    noteId
}

res.data = {
    status: 200,
	freshToken,
    content: {
        noteId
        noteTitle,
        noteContent,
        authorNickname,
        viewNum,
        likeNum,
        collectNum,
        lastModifyTime,
        location,
        resources: [
            index01: {
                mediaType,
                url
            },
            index02: {
                mediaType,
                url
            },
            ......
            ......
        ]
    }
}

验证失败
res.data = {
    status: 401,
    msg: 'Validation failed.',
}

token过期
res.data = {
    status: 401,
    msg: 'Authentication expires.',
}
```



获取游记评论区列表

[POST]	.../travelDiary/getNoteComments

```js
req.data = {
    token,
    noteId
}

res.data = {
    status: 200,
    comments: [
        index0001: {
            commentId,
            commentBy: nickname,
            commentContent,
            commentTime	//较新的
        },
        index0002: {
            commentId,
            commentBy: nickname,
            commentContent,
            commentTime	//较久的
        },
        ......
        ......
    ]
}

验证失败
res.data = {
    status: 401,
    msg: 'Validation failed.',
}

token过期
res.data = {
    status: 401,
    msg: 'Authentication expires.',
}
```



点赞

[POST]	.../travelDiary/likeNote

```js
req.data = {
	token,
    noteId
}

res.data = {
    status: 200,
    freshToken
}
```



收藏

[POST]	.../travelDiary/collectNote

```js
req.data = {
	token,
    noteId
}

res.data = {
    status: 200,
    freshToken
}

验证失败
res.data = {
    status: 401,
    msg: 'Validation failed.',
}

token过期
res.data = {
    status: 401,
    msg: 'Authentication expires.',
}
```



评论

[POST]	.../travelDiary/makeComment

```js
req.data = {
	token,
    noteId,
    commentContent
}

res.data = {
    status:200,
    freshToken,
    reflectMyComment: {
        commentId,
        commentorNickname,
        commentorAvatar: url,
        commentTime: 'YYYY-MM-DD HH:mm:ss',
        content
    }
}

验证失败
res.data = {
    status: 401,
    msg: 'Validation failed.',
}

token过期
res.data = {
    status: 401,
    msg: 'Authentication expires.',
}
```



上传文件

[POST]	.../travelDiary/uploadFile

```js
//用 wx.uploadFile 
 wx.uploadFile({
      url: '.../travelDiary/uploadFile', //仅为示例，非真实的接口地址
      filePath: tempFilePath,
      name: 'file',
      formData: {
        'mediaType': 'img' or 'video'
      },
     callback()
    })

res.data = {
    status: 200,
    url,
    mediaType
}

验证失败
res.data = {
    status: 401,
    msg: 'Validation failed.',
}

token过期
res.data = {
    status: 401,
    msg: 'Authentication expires.',
}

```



上传游记

[POST]	.../travelDiary/uploadNote

```js
req.data = {
	token,
    content: {
        noteTitle,
        noteContent,
        location,
        resources: [
            index01: {
                mediaType,
                url
            },
            index02: {
                mediaType,
                url
            },
            ......
            ......
        ]
    }
}

res.data = {
	status: 200,
    freshToken,
	reflectMyNote: {
	    noteId
        noteTitle,
        noteContent,
        authorNickname,
        viewNum,
        likeNum,
        collectNum,
        lastModifyTime,
        location,
        resources: [
            index01: {
                mediaType,
                url
            },
            index02: {
                mediaType,
                url
            },
            ......
            ......
        ]
	}
}

验证失败
res.data = {
    status: 401,
    msg: 'Validation failed.',
}

token过期
res.data = {
    status: 401,
    msg: 'Authentication expires.',
}
```



获得收藏的游记列表

[POST]	.../travelDiary/getMyCollect

```js
req.data = {
	token
}

res.data = {
    status: 200,
    freshToken,
    noteList: [
        //按照收藏顺序
        note001: {
            noteId,
            title,
            coverImg: url,
            authorNickname,
            authorAvatar: url,
            likeNume,
            uploadTime
        },
    	note002: {
        	noteId,
            title,
            coverImg: url,
            authorNickname,
            authorAvatar: url,
            likeNume,
            uploadTime
    	},
        ......
        ......
    ]
}

验证失败
res.data = {
    status: 401,
    msg: 'Validation failed.',
}

token过期
res.data = {
    status: 401,
    msg: 'Authentication expires.',
}
```



获得我的游记列表

[POST]	.../travelDiary/getMyNoteListWithStatus

```js
req.data = {
	token
}

res.data = {
    status: 200,
    freshToken,
    noteList: [
        note001: {
            noteId,
            title,
            coverImg: url,
            authorNickname,
            authorAvatar: url,
            likeNume,
            status,
            reviewComment,
            uploadTime //较新的
        },
    	note002: {
        	noteId,
            title,
            coverImg: url,
            authorNickname,
            authorAvatar: url,
            likeNume,
            status,
            reviewComment,
            uploadTime //较久的
    	},
        ......
        ......
   ]
}

验证失败
res.data = {
    status: 401,
    msg: 'Validation failed.',
}

token过期
res.data = {
    status: 401,
    msg: 'Authentication expires.',
}
```



## moderationPlatform

审核员登录

[POST]	.../moderationPlatform/login

```js
req.data = {
    username,
    password
}

res.data = {
    status: 200,
    token,
    reviewerId,
    permission
}

用户密码错误
res.data = {
    status: 401,
    msg: 'Login failed.',
}
```



获取审核员列表

[GET]	.../moderationPlatform/getReviewerList

```js
req.data = {
    token
}

res.data = {
    status: 200,
    freshToken,
    reviewerList: [
        index01: {
        	reviewerId,
        	username
        },
    	index02: {
        	reviewerId,
            username
        },
        ......
        ......
    ]
}

验证失败
res.data = {
    status: 401,
    msg: 'Validation failed.',
}

token过期
res.data = {
    status: 401,
    msg: 'Authentication expires.',
}
```



删除审核员

[POST]	.../moderationPlatform/deleteReviewer

```js
req.data = {
    token,
    reviewerId: []
}

res.data = {
    freshToken,
    status: 200
}

验证失败
res.data = {
    status: 401,
    msg: 'Validation failed.',
}

token过期
res.data = {
    status: 401,
    msg: 'Authentication expires.',
}
```



增加审核员

[POST]	.../moderationPlatform/registerReviewer

```js
req.data = {
    token,
    username,
    password
}

res.data = {
    freshToken,
    status: 200
}

验证失败
res.data = {
    status: 401,
    msg: 'Validation failed.',
}

token过期
res.data = {
    status: 401,
    msg: 'Authentication expires.',
}
```



获取游记信息

[POST]	.../moderationPlatform/getNoteInfo

```js
req.data = {
    token,
    noteId
}

res.data = {
    status: 200,
    freshToken,
    content: {
        noteTitle,
        noteContent,
        authorNickname,
        lastModifyTime,
        location,
        status,
        resources: [
            index01: {
                mediaType,
                url
            },
            index02: {
                mediaType,
                url
            },
            ......
            ......
        ]
    }
}

验证失败
res.data = {
    status: 401,
    msg: 'Validation failed.',
}

token过期
res.data = {
    status: 401,
    msg: 'Authentication expires.',
}
```



审核操作

[POST]	.../moderationPlatform/approveNote

```js
req.data = {
    token,
    noteId: [],
    action: 'approve' or 'disapprove' or 'delete' or 'restore'//退回到waiting
}

res.data = {
    freshToken,
    status: 200
}

操作有误
res.data = {
    status: 401,
    msg: 'Illegal process',
}

验证失败
res.data = {
    status: 401,
    msg: 'Validation failed.',
}

token过期
res.data = {
    status: 401,
    msg: 'Authentication expires.',
}
```



获得游记完整列表

[GET]	.../moderationPlatform/getNoteListBySearchAuthor

```js
req.data = {
    token
}

res.data = {
    status: 200,
    freshToken,
    noteList: [
        note001: {
            noteId,
            title,
            coverImg: url,
            authorNickname,
            authorAvatar: url,
        	status,
            uploadTime	//较新的
        },
    	note002: {
        	noteId,
            title,
            coverImg: url,
            authorNickname,
            authorAvatar: url,
            status,
            uploadTime	//较久的
    	},
        ......
        ......
    ]
}
    
验证失败
res.data = {
    status: 401,
    msg: 'Validation failed.',
}

token过期
res.data = {
    status: 401,
    msg: 'Authentication expires.',
}
```



获取某审核员审核过的游记列表

[POST]	.../moderationPlatform/getMyReviewNote

```js
req.data = {
    token,
    reviewId
}

res.data = {
    status: 200,
    freshToken,
    noteList: [
        note001: {
            noteId,
            title,
            coverImg: url,
            authorNickname,
            authorAvatar: url,
        	status
            uploadTime	//较新的
        },
        note002: {
            noteId,
            title,
            coverImg: url,
            authorNickname,
            authorAvatar: url,
            status,
            uploadTime	//较久的
        },
        ......
        ......
     ]
}
    
验证失败
res.data = {
    status: 401,
    msg: 'Validation failed.',
}

token过期
res.data = {
    status: 401,
    msg: 'Authentication expires.',
}
```











