// import * as fs from 'fs';
const multer = require('multer');
const fs = require('fs');
const path = require('path');

function uploadFiles(options = {}){
    const {path = "./public/image",key = "file" , size = 1000} = options;
    const storage = multer.diskStorage({
        destination:function(req,file,cb){
            try {
                fs.accessSync(path);
            } catch(error){
                fs.mkdirSync(path)
            }
            cb(null,path)
        },
        filename:function(req,file,cb) {
            var changeName = new Date().getTime() + '-' + file.originalname;
            cb(null,changeName);
        }
    });

    const limits = {
        fileSize: 1024 * size,
        files : 5
    };

    const upload = multer({storage,limits})
    return upload.array(key)
}

function copyFiles(options = {}) {
    const {fromPath = './public/temp',toPath = "./public/images",filename} = options;
    let sourceFile = path.join(fromPath,filename);
    let destPath = path.join(toPath,filename);
    try {
        fs.accessSync(toPath)
    } catch (error){
        fs.mkdirSync(toPath)
    }
    let readStream = fs.createReadStream(sourceFile);
    let writeStream = fs.createWriteStream(destPath);
    readStream.pipe(writeStream)
}

function moveFiles(options = {}) {
    const {fromPath = './public/temp',toPath = "./public/images",filename} = options;
    let sourceFile = path.join(fromPath,filename);
    let destPath = path.join(toPath,filename);
    try {
        fs.accessSync(toPath)
    } catch (error){
        fs.mkdirSync(toPath)
    }
    fs.renameSync(sourceFile,destPath)
    return {path:destPath}
}

function removeFiles(filePath = "./public/temp") {
    let stats = fs.statSync(filePath);
    if(stats.isFile()){
        fs.unlinkSync(filePath)
    } else if (stats.isDirectory()){
        let filesArr = fs.readdirSync(filePath);
        filesArr.forEach(files => {
            removeFiles(path.resolve(filePath,files))
        })
        fs.rmdirSync(filePath)
    }
}

module.exports = {uploadFiles,copyFiles,moveFiles,removeFiles }