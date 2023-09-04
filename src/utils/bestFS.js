const fs = require('fs').promises;
const path = require('path');

function getFileEncoding(pathname) {
  const supportedFileExtensions = ['png', 'gif', 'jpg', 'jpeg', 'webp', 'bmp', 'ico', 'svg', 'mp3', 'mp4', 'wav', 'ogg', 'm3u8', 'zip', 'rar', 'iso'];
  const extension = path.extname(pathname).slice(1).toLowerCase(); // 获取小写的文件扩展名
  if (supportedFileExtensions.includes(extension)) {
    return null; // 不指定编码（二进制文件）
  } else {
    return 'utf8'; // 使用 utf8 编码处理（文本文件）
  }
}

async function readFile(pathname) {
  pathname = path.resolve(pathname);
  const encoding = getFileEncoding(pathname);
  try {
    return await fs.readFile(pathname, encoding);
  } catch (error) {
    throw new Error(`Error reading file: ${error.message}`);
  }
}

async function writeFile(pathname, content) {
  pathname = path.resolve(pathname);
  const encoding = getFileEncoding(pathname);
  try {
    if (typeof content === 'object') {
      content = JSON.stringify(content);
    } else {
      content = String(content);
    }
    await fs.writeFile(pathname, content, encoding);
  } catch (error) {
    throw new Error(`Error writing file: ${error.message}`);
  }
}

async function readdir(pathname) {
  pathname = path.resolve(pathname);
  try {
    return await fs.readdir(pathname);
  } catch (error) {
    throw new Error(`Error reading directory: ${error.message}`);
  }
}

async function mkdir(pathname) {
  pathname = path.resolve(pathname);
  try {
    await fs.mkdir(pathname);
  } catch (error) {
    throw new Error(`Error creating directory: ${error.message}`);
  }
}

async function rmdir(pathname) {
  pathname = path.resolve(pathname);
  try {
    await fs.rmdir(pathname);
  } catch (error) {
    throw new Error(`Error deleting directory: ${error.message}`);
  }
}

async function unlink(pathname) {
  pathname = path.resolve(pathname);
  try {
    await fs.unlink(pathname);
  } catch (error) {
    throw new Error(`Error deleting file: ${error.message}`);
  }
}

async function copyFile(source, target) {
  source = path.resolve(source);
  target = path.resolve(target);
  try {
    await fs.copyFile(source, target);
  } catch (error) {
    throw new Error(`Error copying file: ${error.message}`);
  }
}

module.exports = { readFile, writeFile, readdir, mkdir, rmdir, unlink, copyFile };