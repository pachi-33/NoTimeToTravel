-- users 表测试数据
INSERT INTO users (openid, session_key, nickname, avatar) VALUES
('openid123', 'session_key123', '爱丽丝', '头像1.jpg'),
('openid456', 'session_key456', '鲍勃', '头像2.jpg'),
('openid789', 'session_key789', '查理', '头像3.jpg');

-- reviewers 表测试数据
INSERT INTO reviewers (username, password, auth) VALUES
('admin1', 'adminpassword', 'admin'),
('reviewer1', 'reviewerpassword', 'review'),
('reviewer2', 'reviewerpassword', 'review');

-- travelNote 表测试数据
INSERT INTO travelNote (noteTitle, noteContent, updateBy, viewNum, likeNum, collectNum, uploadTime, lastModifyTime, location) VALUES
('巴黎之行', '参观埃菲尔铁塔和卢浮宫。', 1, 100, 50, 20, '2024-04-08 10:00:00', '2024-04-08 10:00:00', '巴黎'),
('海滩度假', '在马尔代夫海滩度过轻松的时光。', 2, 200, 100, 30, '2024-04-07 15:30:00', '2024-04-07 15:30:00', '马尔代夫'),
('徒步探险', '探索大峡谷。', 3, 150, 80, 25, '2024-04-06 09:45:00', '2024-04-06 09:45:00', '大峡谷');

-- review 表测试数据
INSERT INTO review (noteId, reviewTime, reviewerId, status, comment) VALUES
(1, '2024-04-08 11:30:00', 2, 'approved', '旅行描述很棒。'),
(2, '2024-04-08 12:45:00', 3, 'waiting', '请提供更多细节。'),
(3, '2024-04-08 14:20:00', 2, 'approved', '惊人的冒险体验！');

-- resources 表测试数据
INSERT INTO resources (noteId, idx, mediaType, url) VALUES
(1, 1, 'img', 'eiffel_tower.jpg'),
(1, 2, 'img', 'louvre_museum.jpg'),
(2, 1, 'img', 'maldives_beach.jpg'),
(3, 1, 'img', 'grand_canyon.jpg');

-- comments 表测试数据
INSERT INTO comments (noteId, commentBy, commentContent, commentTime) VALUES
(1, 3, '美丽的照片！', '2024-04-08 13:00:00'),
(2, 1, '我希望有一天能去马尔代夫。', '2024-04-08 14:30:00'),
(3, 2, '徒步需要多久？', '2024-04-08 15:45:00');

-- collection 表测试数据
INSERT INTO collection (uid, noteId, collectTime) VALUES
(1, 2, '2024-04-08 16:30:00'),
(2, 1, '2024-04-08 17:00:00'),
(3, 3, '2024-04-08 18:15:00');
