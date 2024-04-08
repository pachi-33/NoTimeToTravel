CREATE TABLE users (
    uid INT PRIMARY KEY AUTO_INCREMENT,
    openid VARCHAR(255) NOT NULL UNIQUE,
    session_key VARCHAR(255) NOT NULL,
    nickname VARCHAR(255) UNIQUE,
    avatar VARCHAR(255)
);

CREATE TABLE reviewers (
    reviewerId INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    auth ENUM('admin', 'review') NOT NULL
);

CREATE TABLE travelNote (
    noteId INT PRIMARY KEY AUTO_INCREMENT,
    noteTitle VARCHAR(255) NOT NULL,
    noteContent VARCHAR(4096) NOT NULL,
    updateBy INT NOT NULL,
    viewNum INT NOT NULL,
    likeNum INT NOT NULL,
    collectNum INT NOT NULL,
    uploadTime DATETIME NOT NULL,
    lastModifyTime DATETIME NOT NULL,
    location VARCHAR(255) NOT NULL,
    Foreign Key (updateBy) REFERENCES users(uid)
);

CREATE TABLE review (
    reviewId INT PRIMARY KEY AUTO_INCREMENT,
    noteId INT NOT NULL,
    reviewTime DATETIME,
    reviewerId INT,
    status ENUM('waiting', 'approved', 'disapproved', 'delete') NOT NULL,
    comment VARCHAR(1024) NOT NULL,
    Foreign Key (noteId) REFERENCES travelNote(noteId),
    Foreign Key (reviewerId) REFERENCES reviewers(reviewerId)
);

CREATE TABLE resources (
    noteId INT AUTO_INCREMENT,
    idx INT NOT NULL,
    mediaType ENUM('img', 'video') NOT NULL,
    url VARCHAR(255) NOT NULL,
    PRIMARY KEY (noteId, idx),
    Foreign Key (noteId) REFERENCES travelNote(noteId)
);

CREATE TABLE comments (
    commentId INT AUTO_INCREMENT PRIMARY KEY,
    noteId INT NOT NULL,
    commentBy INT NOT NULL,
    commentContent VARCHAR(4096) NOT NULL,
    commentTime DATETIME NOT NULL,
    Foreign Key (noteId) REFERENCES travelNote(noteId),
    Foreign Key (commentBy) REFERENCES users(uid)
);

CREATE TABLE collection (
    uid INT,
    noteId INT,
    collectTime DATETIME NOT NULL,
    PRIMARY KEY (uid, noteId),
    Foreign Key (noteId) REFERENCES travelNote(noteId),
    Foreign Key (uid) REFERENCES users(uid)
);
