/**
 * 根据fs(File System)模块的常用函数划分:
 *  - readdir | readFile | writeFile | mkdir | rmdir | appendFile | copyFile | ... 
 */

console.log("***betterFS required successfully***");
const fs = require('fs');
const path = require('path'); 
let exportObj = {};


/**
 * @function suffixHandle
 * @param pathname
 */
const suffixReg = /\.([0-9a-zA-Z]+)$/;
let encoding = "utf8";
function suffixHandle(pathname){
    const suffix = suffixReg.test(pathname)?suffixReg.exec(pathname)[1]:'';
    /^(PNG|GIF|JPG|JPEG|WEBP|BMP|ICO|SVG|MP3|MP4|WAV|OGG|M3U8|ZIP|RAR|ISO)$/i.test(suffix)?encoding=null:null;
    return encoding;
}


/** 根据函数类型划分:
 *  - readfile | readdir | mkdir | rmdir | unlink
 */
['readFile', 'readdir', 'mkdir', 'rmdir', 'unlink'].forEach(item=>{
    exportObj[item]=(pathname)=>{
        pathname = path.resolve(pathname); //=>补全执行的项目路径
        return new Promise((resolve, reject)=>{
            //=> 根据后缀处理encoding & pathname的补全
            encoding = suffixHandle(pathname);
            let callback = (err, result) => {
                if (err!==null){
                    reject(err);
                    return ;
                }
                resolve(result);
            } 
            if (item!=="readFile") {
                // 除了readFile,这一组的其他函数都只需添加path和callback,不需要encoding参数
                encoding = callback;
                callback = null;
            }
            fs[item](pathname, encoding, callback);
        });
    }
});


/** 根据函数类型划分:
 *  - writeFile | appendFile
 */
['writeFile', 'appendFile'].forEach(item=>{
    exportObj[item]=(pathname, content)=>{
        pathname = path.resolve(pathname); 
        // 内容的类型,若为json就转化为json字符串
        content!==null && typeof content === "object"?content = JSON.stringify(content):null;
        typeof content !== 'string'?content+='': null;
         
        return new Promise((resolve, reject)=>{
            encoding = suffixHandle(pathname);
            let callback = (err, result) => {
                if (err!==null){
                    reject(err);
                    return ;
                }
                resolve(result);
            };
            fs[item](pathname, content, encoding, callback);
        });
    }
});

/**
 * copyFile
 */
exportObj['copyFile']=(pathname, target)=>{
    pathname = path.resolve(pathname); 
    target = path.resolve(target);

    return new Promise((resolve, reject)=>{
        fs['copyFile'](pathname, target, (err)=>{
            if (err!==null){
                reject(err);
                return;
            }
            resolve();
        });
    })
}
// console.log(exportObj);
module.exports = exportObj;