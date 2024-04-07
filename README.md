# Server End

# Database



## users   Table

| column   | alias    | type                            | constraint                   |
| -------- | -------- | ------------------------------- | ---------------------------- |
| uid      | 用户编号 | INT                             | PK   NotNull   AutoIncrement |
| username | 账号     | VARCHAR(255)                    | PK   NotNull                 |
| password | 密码     | VARCHAR(255)                    | PK                           |
| auth     | 权限     | ENUM('admin', 'user', 'review') | NotNull                      |
| nickname | 昵称     | VARCHAR(255)                    | PK   default: `游客+uid`     |
| avatar   | 头像     | VARCHAR(255)                    |                              |



## travelNote   Table

| column         | alias    | type           | constraint                   |
| -------------- | -------- | -------------- | ---------------------------- |
| noteId         | 游记编号 | INT            | PK   AutoIncrement   NotNull |
| noteTitle      | 标题     | VARCHAR(255)   | NotNull                      |
| noteContent    | 正文     | VARCHAR(65535) | NotNull                      |
| updateBy       | 作者 uid | INT            | FK   NotNull                 |
| viewNum        | 浏览量   | INT            | NotNull                      |
| likeNum        | 获赞量   | INT            | NotNull                      |
| collectNum     | 收藏量   | INT            | NotNull                      |
| uploadTime     | 上传时间 | DATETIME       | NotNull                      |
| lastModifyTime | 修改时间 | DATETIME       | NotNull                      |
| location       | 分享地点 | VARCHAR(255)   | NotNull                      |



## review   Table

| column     | alias           | type                                                 | constraint   |
| ---------- | --------------- | ---------------------------------------------------- | ------------ |
| reviewId   | 审核编号        | INT                                                  | PK   NotNull |
| noteId     | 游记编号 noteId | INT                                                  | FK   NotNull |
| reviewTime | 审核时间        | DATETIME                                             |              |
| reviewerId | 审核员编号 uid  | INT                                                  | FK           |
| status     | 审核状态        | ENUM('waiting', 'approved', 'disapproved', 'delete') | NotNull      |
| comment    | 注释            | VARCHAR(255)                                         |              |



## resources   Table

| column    | alias    | type                 | constraint                        |
| --------- | -------- | -------------------- | --------------------------------- |
| noteId    | 游记编号 | INT                  | PK   FK   AutoIncrement   NotNull |
| index     | 序号     | INT                  | NotNull                           |
| mediaType | 媒体类型 | ENUM('img', 'video') | NotNull                           |
| url       | 路径     | VARCHAR(255)         | NotNull                           |
|           |          |                      |                                   |



## comments Table

| column         | alias         | type           | constraint         |
| -------------- | ------------- | -------------- | ------------------ |
| commentId      | 评论编号      | INT            | PK   AutoIncrement |
| noteId         | 游记编号      | INT            | FK   NotNull       |
| commentBy      | 评论用户  uid | INT            | NotNull            |
| commentContent | 内容          | VARCHAR(65535) | NotNull            |
| commentTime    | 评论时间      | DATETIME       | NotNull            |





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
    loginKey: {
        openid,
        session_key,
        auth: 'user',
        token
    } 
}

```



获取用户信息

[POST]	.../travelDiary/getUserInfo

```js
req.data = {
    loginKey: {
        openid,
        session_key,
        auth: 'user',
        token
    } 
}

获取成功
res.data = {
    status: 200,
    newloginKey: {
        openid,
        session_key,
        auth: 'user',
        newToken
    },
    uid,
    auth,
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
    loginKey: {
        openid,
        session_key,
        auth: 'user',
        token
    },
    img: 'base64...'
}

上传成功
res.data = {
    status: 200,
    newloginKey: {
        openid,
        session_key,
        auth: 'user',
        newToken
    },
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
    loginKey: {
        openid,
        session_key,
        auth: 'user',
        token
    },
    nickName
}

修改成功
res.data = {
    status: 200,
    newloginKey: {
        openid,
        session_key,
        auth: 'user',
        newToken
    },
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
    loginKey: {
        openid,
        session_key,
        auth: 'user',
        token
    },
    beforeWhen: 'YYYY-MM-DD HH:mm:ss', //获取该时间之前上传的游记，设置为当前时间即最新游记
    listLength: 100
}

res.data = {
    status: 200,
    newloginKey: {
        openid,
        session_key,
        auth: 'user',
        newToken
    },
    noteList: {
        listLength: xx,
        content: {
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
        }
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



搜索游记标题获得列表

[POST]	.../travelDiary/getNoteListBySearchTitle

```js
req.data = {
    loginKey: {
        openid,
        session_key,
        auth: 'user',
        token
    },
    keyWord,
    listLength: 100
}

res.data = {
    status: 200,
    newloginKey: {
        openid,
        session_key,
        auth: 'user',
        newToken
    },
    noteList: {
        listLength: xx,
        content: {
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
        }
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



搜索作者获取游记列表

[POST]	.../travelDiary/getNoteListBySearchAuthor

```js
req.data = {
    loginKey: {
        openid,
        session_key,
        auth: 'user',
        token
    },
    authorNickname,
    listLength: 100
}

res.data = {
    status: 200,
    newloginKey: {
        openid,
        session_key,
        auth: 'user',
        newToken
    },
    noteList: {
        listLength: xx,
        content: {
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
        }
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



获取游记详情内容

[POST]	.../travelDiary/getNoteDetails

```js
req.data = {
    loginKey: {
        openid,
        session_key,
        auth: 'user',
        token
    },
    noteId
}

res.data = {
	newloginKey: {
        openid,
        session_key,
        auth: 'user',
        newtoken
    },
    content: {
        noteTitle,
        noteContent,
        authorNickname,
        viewNum,
        likeNum,
        collectNum,
        lastModifyTime,
        location,
        resources: {
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
        }
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
    loginKey: {
        openid,
        session_key,
        auth: 'user',
        token
    },
    noteId
}

res.data = {
    listLength,
    comments: {
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



点赞

[POST]	.../travelDiary/likeNote

```js
req.data = {
	loginKey: {
        openid,
        session_key,
        auth: 'user',
        token
    },
    noteId
}
```



留下浏览记录

[POST]	.../travelDiary/viewNote

```js
req.data = {
	loginKey: {
        openid,
        session_key,
        auth: 'user',
        token
    },
    noteId
}
```



收藏

[POST]	.../travelDiary/collectNote

```js
req.data = {
	loginKey: {
        openid,
        session_key,
        auth: 'user',
        token
    },
    noteId
}
```



评论

[POST]	.../travelDiary/makeComment

```js
req.data = {
	loginKey: {
        openid,
        session_key,
        auth: 'user',
        token
    },
    noteId,
    commentorId,
    commentContent
}

res.data = {
    newloginKey: {
        openid,
        session_key,
        auth: 'user',
        newToken
    },
    reflectMyComment: {
        commentId,
        commentorNickname,
        commentorAvatar: url,
        commentTime: 'YYYY:MM:DD:HH:mm',
        content
    }
}
```



上传游记

[POST]	.../travelDiary/uploadNote







获得收藏的游记列表

[POST]	.../travelDiary/getMyCollect

```js
req.data = {
	loginKey: {
        openid,
        session_key,
        auth: 'user',
        token
    }
}

res.data = {
    newloginKey: {
        openid,
        session_key,
        auth: 'user',
        newToken
    },
    noteList: {
        listLength: xxx,
        content: {
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
        }
    }
}
```



获得我的游记列表

[POST]	.../travelDiary/getMyNoteListWithStatus

```js
req.data = {
	loginKey: {
        openid,
        session_key,
        auth: 'user',
        token
    }
}

res.data = {
    newloginKey: {
        openid,
        session_key,
        auth: 'user',
        newToken
    },
    noteList: {
        listLength: xxx,
        content: {
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
        }
    }
}
```



## moderationPlatform

审核员登录

[POST]	.../moderationPlatform/login





获取游记信息

[GET]	.../moderationPlatform/getNoteInfo





通过

[POST]	.../moderationPlatform/approveNote





通过

[POST]	.../moderationPlatform/approveNote





不通过

[POST]	.../moderationPlatform/disapproveNote





删除

[POST]	.../moderationPlatform/deleteNote





撤回到待审核

[POST]	.../moderationPlatform/restoreNote







按标题搜索游记获得列表

[GET]	.../moderationPlatform/getNoteListBySearchTitle





按作者搜索游记获得列表

[GET]	.../moderationPlatform/getNoteListBySearchAuthor





获取待审核游记列表

[GET]	.../moderationPlatform/getWaitingNoteList





获取已通过游记列表

[GET]	.../moderationPlatform/getApprovedNoteList





获取不通过游记列表

[GET]	.../moderationPlatform/getDisapprovedNoteList





获取已删除游记列表

[GET]	.../moderationPlatform/getDeleteNoteList





获取本审核员审核过的游记列表

[GET]	.../moderationPlatform/getMyReviewNote













