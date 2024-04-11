const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

const getVideoCover = async function (url) {
    const parts = url.split('/');
    const filename = parts[parts.length - 1];
    const videoPath = path.join(__dirname, '../../public/tmp/videoFile/' + filename);
    const outputPath = path.join(__dirname, '../../public/tmp/cover/' + filename);
    const unique_name = uuid.v4() + '.jpg';
    const tmpFolder = path.join(__dirname, '../../public/tmp/folder');

    return new Promise((resolve, reject) => {
        ffmpeg(videoPath).screenshots({
            count: 1,
            folder: tmpFolder,
            filename: unique_name
        })
        .on('end', () => {
            console.log('提取第一帧成功');
            const imagePath = path.join(tmpFolder, unique_name);
            fs.readFile(imagePath, (err, data) => {
                if (err) {
                    console.error('读取第一帧文件失败', err);
                    reject(err);
                    return;
                }
                fs.writeFile(outputPath, data, (err) => {
                    if (err) {
                        console.error('写入第一帧文件失败', err);
                        reject(err);
                        return;
                    }
                    console.log('第一帧图片已保存到', outputPath);

                    const match = outputPath.match(/\/public\/(.*)/);
                    const publicAndAfter = match ? match[1] : '';
                    resolve(publicAndAfter);
                });
            });
        })
        .on('error', (err) => {
            console.error('提取第一帧失败', err);
            reject(err);
        });
    });
};

module.exports = {getVideoCover};
