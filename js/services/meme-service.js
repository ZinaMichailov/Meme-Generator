'use strict'

const STORAGE_KEY = 'memes';
let gSaveMemes = [];

let gImgs = [
    {id: 1, url: 'img/meme-imgs/1.jpg', keywords: ['politicians', 'angry']},
    {id: 2, url: 'img/meme-imgs/2.jpg', keywords: ['animals', 'sweet']},
    {id: 3, url: 'img/meme-imgs/3.jpg', keywords: ['animals', 'sweet', 'sleep', 'baby']},
    {id: 4, url: 'img/meme-imgs/4.jpg', keywords: ['animals', 'sleep']},
    {id: 5, url: 'img/meme-imgs/5.jpg', keywords: ['baby', 'angry']},
    {id: 6, url: 'img/meme-imgs/6.jpg', keywords: ['happy', 'excited', 'tv']},
    {id: 7, url: 'img/meme-imgs/7.jpg', keywords: ['baby', 'surprised']},
    {id: 8, url: 'img/meme-imgs/8.jpg', keywords: ['happy', 'excited']},
    {id: 9, url: 'img/meme-imgs/9.jpg', keywords: ['happy', 'excited', 'conspiracy']},
    {id: 10, url: 'img/meme-imgs/10.jpg', keywords: ['happy', 'politicians']},
    {id: 11, url: 'img/meme-imgs/11.jpg', keywords: ['angry', 'fight']},
    {id: 12, url: 'img/meme-imgs/12.jpg', keywords: ['explain', 'tv', 'righteous', 'celeb']},
    {id: 13, url: 'img/meme-imgs/13.jpg', keywords: ['celeb', 'happy']},
    {id: 14, url: 'img/meme-imgs/14.jpg', keywords: ['celeb', 'tv', 'movie', 'surprised']},
    {id: 15, url: 'img/meme-imgs/15.jpg', keywords: ['celeb', 'tv', 'movie', 'explain']},
    {id: 16, url: 'img/meme-imgs/16.jpg', keywords: ['celeb', 'tv', 'movie', 'happy', 'excited']},
    {id: 17, url: 'img/meme-imgs/17.jpg', keywords: ['politicians', 'explain']},
    {id: 18, url: 'img/meme-imgs/18.jpg', keywords: ['tv', 'explain', 'surprised']},
];

let gKeywords = _mapKeywords(gImgs);
let gId = 18;

let gMeme;
let gCurrLine = 0;
let gNewLinePosY = 400;

function updateMeme(imgIdx) {
    gMeme = { 
        selectedImgId: imgIdx, 
        selectedLineIdx: gCurrLine, 
        lines: [_createLine()] 
    };
}

function updateLineTxt(userTxt) {
    if (userTxt === undefined) userTxt ='';
    gMeme.lines[gCurrLine].txt = userTxt;
}

function updateWidthLine(num) {
    gMeme.lines[gCurrLine].width = num;
}

function getMeme() {
    return gMeme;
}

function getImgs() {
    return gImgs;
}

function getCurrLine() {
    return gMeme.lines[gCurrLine];
}

function updateCurrLine(idx) {
    gCurrLine = idx;
}

function getKeywords() {
    return gKeywords;
}

// buttons

function switchLine() {
    gCurrLine--;
    if (gCurrLine < 0) gCurrLine += 2;
}

function addLine() {
    gCurrLine++;
    let line = _createLine();
    line.pos.y += gNewLinePosY;
    gMeme.lines.push(line);
    gNewLinePosY = 200;
}

function clearLine() {
    gMeme.lines[gCurrLine].txt = '';
}

function addIncrease() {
    gMeme.lines[gCurrLine].size += 10;
}

function addDecrease() {
    gMeme.lines[gCurrLine].size -= 10;
}

function addAlign(align) {
    gMeme.lines[gCurrLine].align = align;
}

function updateFont(font) {
    gMeme.lines[gCurrLine].font = font;
}

function updateColor(colorFill, colorStroke) {
    gMeme.lines[gCurrLine].colorFill = colorFill;
    gMeme.lines[gCurrLine].colorStroke = colorStroke;
}

// sort

function sortBtKeyword(keyword) {
    return gImgs.filter(img => {
        return img.keywords.find(imgKeyword => {
            return imgKeyword === keyword
        })
    })
}

//

function _createLine() {
    let canvas = document.getElementById('my-canvas');
    return { 
        txt: '',
        width: 0, 
        size: 40, 
        align: 'center',
        font: 'Impact', 
        colorFill: '#ffffff',
        colorStroke: '#000000',
        pos: {x: (canvas.width / 2) , y: 60},
        isDragging: false 
    }
}

function _saveMemeToStorage() {
    gSaveMemes.push(gMeme);
    saveToStorage(STORAGE_KEY, gSaveMemes);
}

function _mapKeywords() {
    var res = gImgs.reduce(function (obj, currObj) {
        currObj.keywords.forEach(keyword => {
            if (!obj[keyword]) {
                obj[keyword] = 1;
            } else {
                obj[keyword]++;
            }
        });
        return obj;
    }, {})
    return res;
}