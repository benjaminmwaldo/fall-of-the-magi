'use strict';

// ─── SPRITES ──────────────────────────────────────────────────────────────────
const SPRITES = {
  // 16x16 combat sprites, scale 3 = 48x48
  pale_hound: {
    pal: ['#D4D4D4','#8C8C8C','#4A4A4A','#B8B8B8','#CCCCCC','#333333','#EEEEEE','#FF3333'],
    rows: ['0000011100000000','0000122100000000','0001112110000000','0011211211000000',
           '0121111111200000','0122111111220000','0012221112200000','0001122111000000',
           '0000112110000000','0000122110000000','0001122211000000','0001113311000000',
           '0001133311000000','0001133311000000','0000011100000000','0000000000000000']
  },
  hound_captain: {
    pal: ['#D4D4D4','#8C8C8C','#4A4A4A','#FFAA00','#B8B8B8','#333333','#EEEEEE','#FF3333'],
    rows: ['0000044400000000','0000142400000000','0001114140000000','0011211411000000',
           '0121111411200000','0122441441220000','0012241114200000','0001142111000000',
           '0000442110000000','0000442110000000','0001442211000000','0001443311000000',
           '0001133311000000','0001133311000000','0000441100000000','0000000000000000']
  },
  cinder_eel: {
    pal: ['#2D4A1A','#1A3310','#4A7A2A','#FF6600','#884400','#AAFFAA','#336600','#FF9900'],
    rows: ['0000000000000000','0001113000000000','0011133300000000','0011133300000000',
           '0111133311100000','0111143331100000','0111144331100000','0111443331100000',
           '1114444433111000','0111444433111000','0011444433111000','0001144431110000',
           '0001114311110000','0001113111110000','0000003111100000','0000000011000000']
  },
  salt_drinker: {
    pal: ['#8AB4C8','#4A7A8C','#2A4A5C','#BBDDEE','#336688','#AABBCC','#225577','#FFFFFF'],
    rows: ['0000011100000000','0001122100000000','0011221100000000','0112222110000000',
           '0122211220000000','0122122220000000','0012222220000000','0012211220000000',
           '0001122110000000','0001122110000000','0011122211000000','0011133211000000',
           '0011133211000000','0000113300000000','0000011100000000','0000000000000000']
  },
  hollow_fragment: {
    pal: ['#39D353','#1A6620','#00FF44','#004410','#88FF88','#005522','#AAFFAA','#002200'],
    rows: ['0000033300000000','0003322330000000','0033211233000000','0032111123000000',
           '0321111112300000','0321113112300000','0321133112300000','0032133112300000',
           '0032133112300000','0032111112300000','0032111123000000','0033211233000000',
           '0003311330000000','0000333300000000','0000033000000000','0000000000000000']
  },
  choir_member: {
    pal: ['#E8D8C0','#8C7A60','#4A3820','#FFFFFF','#AAAAAA','#666666','#333333','#9988CC'],
    rows: ['0000011100000000','0001122110000000','0011221110000000','0011211110000000',
           '0012211110000000','0122211110000000','0122888810000000','0128888881000000',
           '0012888810000000','0001288810000000','0001288810000000','0001128810000000',
           '0000128810000000','0000128810000000','0000112200000000','0000000000000000']
  },
  veyra_boss: {
    pal: ['#E8E8F8','#AAAACC','#666688','#39FF14','#FFFFFF','#BBBBDD','#88AAFF','#4400CC'],
    rows: ['0000033300000000','0003322330000000','0031141130000000','0311411413000000',
           '3114311413000000','3114411413000000','3114411413000000','3111444413000000',
           '0311444130000000','0031444130000000','0003114430000000','0003114430000000',
           '0003114430000000','0003114430000000','0003114430000000','0000330300000000']
  },

  // Player class sprites 16x16
  warden: {
    pal: ['#E8D8C0','#8B5E3C','#4A2C17','#C0A060','#888888','#CCCCCC','#FF4444','#445566'],
    rows: ['0000011100000000','0001122110000000','0011211110000000','0011211110000000',
           '0012211110000000','0112255510000000','0122555510000000','0125555510000000',
           '0125555510000000','0125544410000000','0125544410000000','0012544100000000',
           '0012544100000000','0001254100000000','0001254100000000','0000110000000000']
  },
  scholar: {
    pal: ['#E8D8C0','#6A3A8C','#4A1A6C','#D4A574','#AAAAFF','#DDDDFF','#FF8800','#888888'],
    rows: ['0000011100000000','0001122110000000','0011211110000000','0011211110000000',
           '0012211110000000','0112233310000000','0122333310000000','0123333310000000',
           '0123333310000000','0123322210000000','0123322210000000','0012322100000000',
           '0012322100000000','0001232100000000','0001232100000000','0000110000000000']
  },
  blade: {
    pal: ['#E8D8C0','#333344','#1A1A2A','#888888','#CCCCCC','#FFFFFF','#FF4444','#AAAAAA'],
    rows: ['0000011100000000','0001122110000000','0011211110000000','0011211110000000',
           '0012211110000000','0112244410000000','0122444410000000','0124444410000000',
           '0124444410000000','0124433310000000','0124433310000000','0012433100000000',
           '0012433100000000','0001243100000000','0001243100000000','0000110000000000']
  },
  hedge_witch: {
    pal: ['#E8D8C0','#3A6A3C','#1A4A1C','#D4A574','#88CC88','#CCEECC','#FF8800','#A0D0A0'],
    rows: ['0000011100000000','0001122110000000','0011211110000000','0011211110000000',
           '0012211110000000','0112233310000000','0122333310000000','0123333310000000',
           '0123333310000000','0123322210000000','0123322210000000','0012322100000000',
           '0012322100000000','0001232100000000','0001232100000000','0000110000000000']
  }
};

// ─── PORTRAIT DRAWING ─────────────────────────────────────────────────────────
const PORTRAITS = {
  draw(name, emotion, x, y) {
    const fn = this[name];
    if (fn) fn.call(this, emotion, x, y);
    else this._unknown(x, y, name);
  },

  _face(x, y, skinCol, hairCol, clothCol, eyeCol, opts = {}) {
    const E = ENGINE, c = E.ctx;
    const w = 180, h = 220;
    // bg
    E.rect(x, y, w, h, '#1A1028');
    E.stroke(x, y, w, h, '#8B5E3C', 2);
    // neck
    E.rect(x + 75, y + 150, 30, 40, skinCol);
    // body/clothes
    E.rect(x + 20, y + 175, 140, 50, clothCol);
    // head shape
    E.rect(x + 50, y + 40, 80, 90, skinCol);
    // hair
    if (opts.longHair) {
      E.rect(x + 45, y + 30, 90, 40, hairCol);
      E.rect(x + 40, y + 50, 15, 80, hairCol);
      E.rect(x + 125, y + 50, 15, 80, hairCol);
    } else {
      E.rect(x + 45, y + 30, 90, 30, hairCol);
    }
    // eyes
    if (opts.emotion === 'happy' || opts.emotion === 'warm') {
      E.rect(x + 63, y + 75, 14, 8, eyeCol);
      E.rect(x + 103, y + 75, 14, 8, eyeCol);
    } else if (opts.emotion === 'fear' || opts.emotion === 'worried') {
      E.rect(x + 63, y + 74, 14, 12, eyeCol);
      E.rect(x + 103, y + 74, 14, 12, eyeCol);
      E.rect(x + 63, y + 74, 14, 3, '#FFFFFF');
      E.rect(x + 103, y + 74, 14, 3, '#FFFFFF');
    } else if (opts.emotion === 'angry') {
      E.rect(x + 63, y + 78, 14, 8, eyeCol);
      E.rect(x + 103, y + 78, 14, 8, eyeCol);
      E.rect(x + 60, y + 72, 20, 4, '#4A3820');
      E.rect(x + 100, y + 72, 20, 4, '#4A3820');
    } else if (opts.emotion === 'sinister') {
      E.rect(x + 65, y + 78, 10, 6, eyeCol);
      E.rect(x + 105, y + 78, 10, 6, eyeCol);
      E.rect(x + 63, y + 76, 18, 3, skinCol);
      E.rect(x + 103, y + 76, 18, 3, skinCol);
    } else {
      E.rect(x + 63, y + 76, 14, 10, eyeCol);
      E.rect(x + 103, y + 76, 14, 10, eyeCol);
    }
    // pupils
    E.rect(x + 67, y + 79, 6, 6, '#0A0A0A');
    E.rect(x + 107, y + 79, 6, 6, '#0A0A0A');
    // nose
    E.rect(x + 87, y + 95, 6, 4, hairCol);
    // mouth
    if (opts.emotion === 'happy' || opts.emotion === 'warm') {
      E.rect(x + 70, y + 110, 40, 4, '#8B3A3A');
      E.rect(x + 67, y + 108, 6, 6, '#8B3A3A');
      E.rect(x + 107, y + 108, 6, 6, '#8B3A3A');
    } else if (opts.emotion === 'sad' || opts.emotion === 'dying') {
      E.rect(x + 70, y + 112, 40, 4, '#8B3A3A');
      E.rect(x + 67, y + 110, 6, 6, '#8B3A3A');
      E.rect(x + 107, y + 110, 6, 6, '#8B3A3A');
    } else if (opts.emotion === 'sinister') {
      E.rect(x + 68, y + 108, 44, 3, '#8B3A3A');
      E.rect(x + 68, y + 108, 3, 8, '#8B3A3A');
      E.rect(x + 109, y + 108, 3, 8, '#8B3A3A');
    } else {
      E.rect(x + 72, y + 110, 36, 3, '#8B3A3A');
    }
  },

  hastha(emotion, x, y) {
    this._face(x, y, '#C68B5E', '#4A3A30', '#4A3A2A', '#5A4A3A', {
      emotion, longHair: false
    });
    // wide shoulders
    ENGINE.rect(x + 15, y + 175, 150, 50, '#4A3A2A');
    // knife at hip
    ENGINE.rect(x + 140, y + 185, 6, 30, '#888888');
    ENGINE.rect(x + 136, y + 183, 14, 6, '#8B5E3C');
    // gray streak in hair
    ENGINE.rect(x + 50, y + 30, 12, 28, '#888880');
  },

  mira(emotion, x, y) {
    this._face(x, y, '#E8C89A', '#C8A860', '#5A4A3A', '#6A5A4A', {
      emotion: emotion === 'scared' ? 'fear' : emotion, longHair: true
    });
    // oversized coat
    ENGINE.rect(x + 10, y + 175, 160, 50, '#5A4A3A');
    // bruise
    if (emotion === 'scared' || emotion === 'neutral') ENGINE.rect(x + 53, y + 95, 14, 8, '#7A5A8A');
  },

  kael(emotion, x, y) {
    this._face(x, y, '#B8825A', '#4A3A28', '#3A3A4A', '#5A4A3A', {
      emotion, longHair: false
    });
    // eye scars
    const c = ENGINE.ctx;
    c.strokeStyle = '#8A6A4A';
    c.lineWidth = 2;
    c.beginPath(); c.moveTo(x+57, y+68); c.lineTo(x+77, y+88); c.stroke();
    c.beginPath(); c.moveTo(x+57, y+88); c.lineTo(x+77, y+68); c.stroke();
    // detachable arm hint
    ENGINE.rect(x + 10, y + 175, 80, 50, '#3A3A4A');
    ENGINE.rect(x + 90, y + 175, 80, 50, '#3A3A4A');
    ENGINE.rect(x + 88, y + 185, 6, 40, '#888888');
    ENGINE.rect(x + 84, y + 183, 14, 6, '#5A5A6A');
  },

  yssen(emotion, x, y) {
    this._face(x, y, '#C89060', '#D4B840', '#5A3A2A', '#5A3A2A', {
      emotion, longHair: false
    });
    // burn scars on visible arm/neck area
    ENGINE.rect(x + 120, y + 140, 40, 30, '#AA7040');
    const c = ENGINE.ctx;
    c.strokeStyle = '#8A5030';
    c.lineWidth = 1;
    for (let i = 0; i < 5; i++) {
      c.beginPath();
      c.moveTo(x + 122 + i*3, y + 140);
      c.lineTo(x + 118 + i*4, y + 170);
      c.stroke();
    }
    ENGINE.rect(x + 15, y + 175, 150, 50, '#5A3A2A');
    // candle flame in hand
    if (emotion !== 'angry') {
      ENGINE.rect(x + 145, y + 155, 6, 16, '#FFAA00');
      ENGINE.rect(x + 143, y + 145, 10, 12, '#FF6600');
    }
  },

  calvix(emotion, x, y) {
    this._face(x, y, '#D4A880', '#888880', '#1A1A1A', '#445566', {
      emotion, longHair: false
    });
    // gray beard
    ENGINE.rect(x + 52, y + 108, 76, 30, '#888880');
    ENGINE.rect(x + 60, y + 118, 60, 22, '#AAAAAA');
    // missing pinky on gloved hand
    ENGINE.rect(x + 15, y + 175, 150, 50, '#1A1A1A');
    // black gloves
    ENGINE.rect(x + 20, y + 195, 40, 25, '#0A0A0A');
    ENGINE.rect(x + 120, y + 195, 40, 25, '#0A0A0A');
  },

  veyra(emotion, x, y) {
    this._face(x, y, '#F0EEFC', '#E8E8F8', '#FFFFFF', '#9999CC', {
      emotion: emotion === 'vessel' ? 'sinister' : emotion, longHair: true
    });
    // always cold — slight blue tint on skin
    ENGINE.rect(x + 50, y + 40, 80, 90, '#E8E8F8', 0.3);
    // vessel eyes glow
    if (emotion === 'vessel') {
      ENGINE.rect(x + 61, y + 74, 18, 12, '#39FF14');
      ENGINE.rect(x + 101, y + 74, 18, 12, '#39FF14');
      ENGINE.rect(x + 63, y + 74, 0, 0, '#000000');
      ENGINE.rect(x + 103, y + 74, 0, 0, '#000000');
    }
    // white robes
    ENGINE.rect(x + 10, y + 175, 160, 50, '#F0EEFC');
    ENGINE.rect(x + 25, y + 180, 130, 40, '#DDDDEE');
  },

  sereth(emotion, x, y) {
    this._face(x, y, '#C89060', '#5A4A38', '#5A4A30', '#5A4A38', {
      emotion, longHair: false
    });
    // scar through eyebrow
    const c = ENGINE.ctx;
    c.strokeStyle = '#8A6A4A';
    c.lineWidth = 2;
    c.beginPath(); c.moveTo(x+100, y+66); c.lineTo(x+120, y+80); c.stroke();
    // leather/steel armor
    ENGINE.rect(x + 10, y + 175, 160, 50, '#5A4A30');
    ENGINE.rect(x + 30, y + 178, 30, 46, '#888888');
    ENGINE.rect(x + 100, y + 178, 30, 46, '#888888');
    // tea cup
    if (emotion === 'neutral' || emotion === 'drinking') {
      ENGINE.rect(x + 130, y + 165, 24, 18, '#FFFFFF');
      ENGINE.rect(x + 134, y + 169, 16, 10, '#4A2C14');
    }
  },

  orenna(emotion, x, y) {
    this._face(x, y, '#D4A880', '#555540', '#6A6A6A', '#447744', {
      emotion, longHair: true
    });
    // spectacles
    const c = ENGINE.ctx;
    c.strokeStyle = '#888844';
    c.lineWidth = 2;
    c.strokeRect(x + 60, y + 73, 18, 14);
    c.strokeRect(x + 100, y + 73, 18, 14);
    c.beginPath(); c.moveTo(x+78, y+80); c.lineTo(x+100, y+80); c.stroke();
    // ink-stained hands
    ENGINE.rect(x + 20, y + 195, 40, 25, '#4A4A30');
    // gray robes
    ENGINE.rect(x + 10, y + 175, 160, 50, '#6A6A6A');
  },

  peytar(emotion, x, y) {
    this._face(x, y, '#C89060', '#4A3820', '#8A7A6A', '#5A4A38', {
      emotion: emotion === 'traitor' ? 'sad' : emotion, longHair: false
    });
    // traveling robes, patched
    ENGINE.rect(x + 10, y + 175, 160, 50, '#8A7A6A');
    // patches
    ENGINE.rect(x + 25, y + 185, 20, 16, '#AA9A8A');
    ENGINE.rect(x + 110, y + 195, 22, 14, '#7A6A5A');
    // holy symbol
    ENGINE.rect(x + 82, y + 180, 16, 20, '#D4A574');
    ENGINE.rect(x + 78, y + 185, 24, 8, '#D4A574');
    if (emotion === 'traitor') {
      // tears
      ENGINE.rect(x + 65, y + 98, 4, 14, '#AACCEE');
      ENGINE.rect(x + 111, y + 98, 4, 14, '#AACCEE');
    }
  },

  thess(emotion, x, y) {
    this._face(x, y, '#D4B890', '#CCCCCC', '#AAAAAA', '#888888', {
      emotion: 'happy', longHair: false
    });
    // silver glasses
    const c = ENGINE.ctx;
    c.strokeStyle = '#CCCCCC';
    c.lineWidth = 2;
    c.strokeRect(x + 61, y + 73, 18, 14);
    c.strokeRect(x + 101, y + 73, 18, 14);
    c.beginPath(); c.moveTo(x+79, y+80); c.lineTo(x+101, y+80); c.stroke();
    // immaculate gray robes
    ENGINE.rect(x + 10, y + 175, 160, 50, '#AAAAAA');
    ENGINE.rect(x + 30, y + 178, 100, 44, '#CCCCCC');
    // green eye glow if revealed dreamtouched
    if (emotion === 'revealed') {
      ENGINE.rect(x + 63, y + 76, 14, 10, '#39FF14');
      ENGINE.rect(x + 103, y + 76, 14, 10, '#39FF14');
    }
  },

  vess(emotion, x, y) {
    this._face(x, y, '#C8A878', '#CCCCAA', '#5A4A38', '#7A6A5A', {
      emotion, longHair: false
    });
    // very old, weathered
    const c = ENGINE.ctx;
    c.strokeStyle = '#AA8858';
    c.lineWidth = 1;
    for (let i = 0; i < 6; i++) {
      c.beginPath(); c.moveTo(x+52+i*12, y+85); c.lineTo(x+50+i*12, y+130); c.stroke();
    }
    // tin cup
    ENGINE.rect(x + 130, y + 165, 20, 22, '#888888');
    ENGINE.rect(x + 128, y + 163, 24, 6, '#AAAAAA');
    // worn clothes
    ENGINE.rect(x + 10, y + 175, 160, 50, '#5A4A38');
  },

  vorrel(emotion, x, y) {
    this._face(x, y, '#C89060', '#888880', '#CCCCCC', '#4A4A5A', {
      emotion, longHair: false
    });
    // gray beard, captain
    ENGINE.rect(x + 55, y + 108, 70, 25, '#888880');
    // plate armor
    ENGINE.rect(x + 10, y + 175, 160, 50, '#CCCCCC');
    ENGINE.rect(x + 20, y + 178, 140, 46, '#AAAAAA');
    ENGINE.rect(x + 40, y + 178, 4, 46, '#888888');
    ENGINE.rect(x + 116, y + 178, 4, 46, '#888888');
    // cloak whipping
    ENGINE.rect(x + 0, y + 160, 10, 80, '#4A3A2A');
    ENGINE.rect(x + 170, y + 160, 10, 80, '#4A3A2A');
  },

  loyar(emotion, x, y) {
    this._face(x, y, '#C89060', '#AA4430', '#5A4A30', '#5A4A38', {
      emotion, longHair: false
    });
    // jaw scar
    const c = ENGINE.ctx;
    c.strokeStyle = '#AA7A50';
    c.lineWidth = 2;
    c.beginPath(); c.moveTo(x+72, y+118); c.lineTo(x+110, y+128); c.stroke();
    // copper hair cropped
    ENGINE.rect(x + 48, y + 30, 84, 20, '#AA4430');
    // guard uniform
    ENGINE.rect(x + 10, y + 175, 160, 50, '#5A4A30');
    ENGINE.rect(x + 40, y + 178, 30, 46, '#888888');
    ENGINE.rect(x + 90, y + 178, 30, 46, '#888888');
  },

  _unknown(x, y, name) {
    ENGINE.rect(x, y, 180, 220, '#1A1028');
    ENGINE.stroke(x, y, 180, 220, '#8B5E3C', 2);
    ENGINE.text('?', x + 85, y + 90, { size: 40, col: '#8B5E3C', align: 'center', base: 'middle' });
    ENGINE.text(name, x + 90, y + 160, { size: 8, col: '#555544', align: 'center' });
  }
};

// ─── SCENE BACKGROUNDS ────────────────────────────────────────────────────────
const SCENES_ART = {

  drawBackground(sceneId) {
    const fn = this[sceneId];
    if (fn) fn.call(this);
    else this.fallback(sceneId);
  },

  fallback(id) {
    ENGINE.gradient(0, 40, 960, 500, [[0,'#0A0A18'],[1,'#1A1A28']]);
    ENGINE.text(id, 480, 270, { size: 16, col: '#333344', align: 'center', base: 'middle' });
  },

  // ── TITLE SCREEN ──────────────────────────────────────────────────────────
  title() {
    const f = ENGINE.frame;
    // night sky
    ENGINE.gradient(0, 0, 960, 640, [[0,'#050810'],[0.6,'#0A1428'],[1,'#0D1A1A']]);
    // stars
    const stars = [[45,30],[120,80],[200,45],[340,20],[480,55],[600,30],[720,70],[850,40],
                   [90,150],[250,130],[410,160],[550,140],[700,120],[820,155],[180,200],
                   [360,210],[530,195],[680,215],[900,180],[70,250],[300,260],[460,245]];
    stars.forEach(([sx, sy], i) => {
      const twinkle = 0.5 + 0.5 * Math.sin(f * 0.05 + i * 1.7);
      ENGINE.rect(sx, sy, 2, 2, '#FFFFFF', twinkle);
    });
    // green aurora at bottom
    const auroraY = 420;
    for (let x = 0; x < 960; x += 4) {
      const h = 60 + Math.sin(x * 0.02 + f * 0.03) * 30 + Math.cos(x * 0.01 + f * 0.02) * 20;
      const alpha = 0.15 + 0.1 * Math.sin(x * 0.03 + f * 0.02);
      ENGINE.rect(x, auroraY + (60 - h), 4, h, '#39FF14', alpha);
    }
    // silhouette landscape
    ENGINE.gradient(0, 480, 960, 160, [[0,'#0A1820'],[1,'#050810']]);
    // ruins silhouette
    const ruins = [[0,520,80,120],[100,490,40,150],[180,510,30,130],[250,480,60,160],
                   [360,500,25,140],[420,470,50,170],[520,490,40,150],[620,510,35,130],
                   [700,480,55,160],[800,500,30,140],[870,490,60,150],[930,520,30,120]];
    ruins.forEach(([rx,ry,rw,rh]) => ENGINE.rect(rx, ry, rw, rh, '#050810'));
    // title text glow
    const c = ENGINE.ctx;
    c.save();
    c.shadowColor = '#D4A574';
    c.shadowBlur = 20 + 8 * Math.sin(f * 0.04);
    ENGINE.text('THE FALL', 480, 140, { size: 48, col: '#D4A574', align: 'center', base: 'middle', shadow: '#D4A574', shadowBlur: 20 });
    ENGINE.text('OF THE MAGI', 480, 200, { size: 36, col: '#D4A574', align: 'center', base: 'middle', shadow: '#D4A574', shadowBlur: 20 });
    c.restore();
    ENGINE.text('a tale of the world’s second ending', 480, 262, { size: 10, col: '#8B7355', align: 'center', base: 'middle' });
    // crow flying
    const cx = ((f * 2) % 1100) - 100;
    ENGINE.rect(cx, 350, 8, 3, '#0A0A10');
    ENGINE.rect(cx - 8, 347, 8, 4, '#0A0A10');
    ENGINE.rect(cx + 8, 347, 8, 4, '#0A0A10');
  },

  // ── CHARACTER SELECT ──────────────────────────────────────────────────────
  char_select() {
    ENGINE.gradient(0, 0, 960, 640, [[0,'#0D0A18'],[1,'#1A0A0A']]);
    ENGINE.text('WHO ARE YOU?', 480, 30, { size: 18, col: '#D4A574', align: 'center', base: 'top' });
    // decorative lines
    ENGINE.rect(0, 62, 960, 2, '#8B5E3C');
    ENGINE.rect(0, 64, 960, 2, '#D4A574', 0.3);
  },

  // ── HOLLOWDRIFT ROAD (Arrival) ────────────────────────────────────────────
  road_arrival() {
    // sky — overcast gray
    ENGINE.gradient(0, 40, 960, 260, [[0,'#8A9AA8'],[0.5,'#6A7A88'],[1,'#4A5A68']]);
    // clouds
    ENGINE.rect(50, 60, 180, 40, '#9AAAB8');
    ENGINE.rect(80, 52, 120, 30, '#AABBC8');
    ENGINE.rect(320, 80, 200, 35, '#9AAAB8');
    ENGINE.rect(350, 70, 140, 28, '#AABBC8');
    ENGINE.rect(650, 60, 220, 42, '#9AAAB8');
    ENGINE.rect(680, 50, 150, 32, '#AABBC8');
    // distant hills
    ENGINE.gradient(0, 260, 960, 100, [[0,'#5A6858'],[1,'#4A5848']]);
    const hillpts = [0,280,100,255,220,270,350,248,500,262,640,245,780,260,900,252,960,280];
    const hc = ENGINE.ctx;
    hc.fillStyle = '#4A5848';
    hc.beginPath(); hc.moveTo(0, 350);
    for (let i = 0; i < hillpts.length; i += 2) hc.lineTo(hillpts[i], hillpts[i+1]);
    hc.lineTo(960, 350); hc.fill();
    // distant village outline
    ENGINE.rect(420, 248, 20, 30, '#3A4A38');
    ENGINE.rect(445, 252, 18, 26, '#3A4A38');
    ENGINE.rect(470, 244, 22, 34, '#3A4A38');
    ENGINE.rect(500, 250, 16, 28, '#3A4A38');
    // village smoke
    for (let i = 0; i < 3; i++) {
      const sx = 428 + i * 25, sy = 248;
      const sway = Math.sin(ENGINE.frame * 0.04 + i) * 4;
      ENGINE.rect(sx + sway, sy - 20, 4, 22, '#9AAAB8', 0.4);
      ENGINE.rect(sx + sway * 1.2, sy - 38, 6, 20, '#9AAAB8', 0.25);
    }
    // ash fields
    ENGINE.gradient(0, 340, 960, 160, [[0,'#6A6858'],[1,'#5A5848']]);
    // dead trees lining road
    this._deadTree(80, 310, 36, 130);
    this._deadTree(160, 295, 30, 150);
    this._deadTree(800, 308, 38, 128);
    this._deadTree(875, 292, 32, 148);
    // road
    ENGINE.gradient(320, 380, 320, 160, [[0,'#8A7A68'],[1,'#6A5A48']]);
    ENGINE.rect(320, 380, 320, 160, '#7A6A58');
    // road edge lines
    ENGINE.rect(320, 380, 6, 160, '#5A4A38');
    ENGINE.rect(634, 380, 6, 160, '#5A4A38');
    // wheel ruts
    ENGINE.rect(370, 380, 8, 160, '#6A5A48');
    ENGINE.rect(582, 380, 8, 160, '#6A5A48');
    // sign post
    ENGINE.rect(620, 340, 8, 100, '#5A4A30');
    ENGINE.rect(590, 340, 68, 28, '#8A7A60');
    ENGINE.text('HOLLOWDRIFT', 624, 348, { size: 6, col: '#3A2A18', align: 'center', base: 'top' });
    ENGINE.text('312 souls', 624, 358, { size: 5, col: '#5A4A30', align: 'center', base: 'top' });
    // ground level
    ENGINE.gradient(0, 500, 960, 100, [[0,'#5A5848'],[1,'#3A3828']]);
    // leaning trees emphasize direction
    this._deadTree(240, 380, 24, 110);
    this._deadTree(690, 375, 26, 112);
  },

  _deadTree(x, y, w, h) {
    // trunk
    ENGINE.rect(x - w/6, y, w/3, h, '#3A3020');
    // branches — lean south
    const c = ENGINE.ctx;
    c.save();
    c.strokeStyle = '#3A3020';
    c.lineWidth = 4;
    c.beginPath(); c.moveTo(x, y); c.lineTo(x + 20, y - 40); c.stroke();
    c.lineWidth = 3;
    c.beginPath(); c.moveTo(x + 20, y - 40); c.lineTo(x + 36, y - 60); c.stroke();
    c.beginPath(); c.moveTo(x + 20, y - 40); c.lineTo(x + 8, y - 62); c.stroke();
    c.lineWidth = 2;
    c.beginPath(); c.moveTo(x, y + 20); c.lineTo(x - 16, y - 20); c.stroke();
    c.beginPath(); c.moveTo(x + 4, y + 10); c.lineTo(x + 24, y - 24); c.stroke();
    c.restore();
  },

  // ── HOLLOWDRIFT MAIN ROAD ─────────────────────────────────────────────────
  road_village() {
    // overcast sky
    ENGINE.gradient(0, 40, 960, 200, [[0,'#7A8A98'],[1,'#5A6A78']]);
    // cloud layer
    ENGINE.rect(0, 50, 960, 60, '#8A9AA8', 0.5);
    // distant buildings back
    ENGINE.rect(0, 200, 960, 20, '#4A5248');
    ENGINE.rect(50, 180, 80, 40, '#4A5248');
    ENGINE.rect(200, 175, 60, 45, '#4A5248');
    ENGINE.rect(650, 178, 90, 42, '#4A5248');
    ENGINE.rect(820, 182, 70, 38, '#4A5248');
    // mud ground
    ENGINE.gradient(0, 400, 960, 160, [[0,'#6A5A48'],[1,'#4A3A28']]);
    // mud puddle
    ENGINE.rect(400, 440, 80, 20, '#5A5048', 0.8);
    // main buildings
    this._building(30, 240, 180, 200, '#6A6050', '#5A5040', 'INN', false);
    this._building(750, 245, 160, 195, '#5A5848', '#4A4838', 'GUARD', false);
    this._building(440, 260, 120, 180, '#6A5848', '#5A4838', '', false);
    this._building(590, 255, 120, 185, '#5A6050', '#4A5040', '', false);
    // road / cobbles
    ENGINE.rect(80, 400, 800, 140, '#6A6050');
    for (let x = 80; x < 880; x += 20) {
      ENGINE.rect(x, 400, 18, 8, '#5A5040');
      ENGINE.rect(x + 10, 412, 18, 8, '#5A5040');
    }
    // well center
    ENGINE.rect(455, 350, 50, 30, '#7A6A58');
    ENGINE.rect(448, 346, 64, 10, '#8A7A68');
    ENGINE.rect(470, 320, 10, 30, '#5A4A38');
    ENGINE.rect(465, 316, 20, 8, '#6A5A48');
    // NPCs silhouettes
    this._npcSilhouette(350, 390, '#5A4A38');
    this._npcSilhouette(600, 395, '#6A5A48');
    this._npcSilhouette(140, 385, '#5A5A48');
    // child on ground
    ENGINE.rect(280, 410, 12, 8, '#4A4438');
  },

  _building(x, y, w, h, wallCol, roofCol, label, hasWindow) {
    // wall
    ENGINE.rect(x, y + 40, w, h - 40, wallCol);
    // roof
    const c = ENGINE.ctx;
    c.fillStyle = roofCol;
    c.beginPath();
    c.moveTo(x - 10, y + 44);
    c.lineTo(x + w/2, y);
    c.lineTo(x + w + 10, y + 44);
    c.fill();
    // window
    ENGINE.rect(x + w/2 - 14, y + 70, 28, 28, '#2A2010');
    ENGINE.rect(x + w/2 - 12, y + 72, 12, 24, '#AA8830', 0.4);
    ENGINE.rect(x + w/2, y + 72, 12, 24, '#AA8830', 0.4);
    // door
    ENGINE.rect(x + w/2 - 12, y + h - 50, 24, 50, '#3A2A18');
    if (label) {
      ENGINE.text(label, x + w/2, y + 48, { size: 8, col: '#D4A574', align: 'center', base: 'top' });
    }
    // wood grain lines
    for (let gy = y + 44; gy < y + h; gy += 14) ENGINE.rect(x, gy, w, 2, '#000000', 0.06);
  },

  _npcSilhouette(x, y, col) {
    ENGINE.rect(x - 6, y - 28, 12, 28, col);
    ENGINE.rect(x - 9, y, 18, 22, col);
    ENGINE.circle(x, y - 34, 10, col);
  },

  // ── DRIFT HOUSE INTERIOR ──────────────────────────────────────────────────
  drift_house_interior() {
    const f = ENGINE.frame;
    // ceiling/wall — dark warm wood
    ENGINE.gradient(0, 40, 960, 240, [[0,'#2A1A0A'],[1,'#1A0A00']]);
    // wood beam ceiling
    for (let bx = 0; bx < 960; bx += 120) ENGINE.rect(bx, 40, 14, 200, '#1A0A00');
    // floor
    ENGINE.gradient(0, 340, 960, 200, [[0,'#5C3A1E'],[1,'#3A2010']]);
    // floor planks
    for (let px = 0; px < 960; px += 60) ENGINE.rect(px, 340, 58, 200, px % 120 === 0 ? '#5A3818' : '#5C3A1E');
    for (let py = 340; py < 540; py += 20) ENGINE.rect(0, py, 960, 1, '#3A2010', 0.3);
    // stain near third table
    ENGINE.rect(350, 400, 80, 30, '#2A0A04', 0.8);
    // bar counter
    ENGINE.rect(0, 280, 220, 120, '#3A2010');
    ENGINE.rect(0, 278, 230, 12, '#5A3818');
    // bottles behind bar
    [30,55,80,105,130,155,175].forEach((bx, i) => {
      const bc = ['#AA3322','#2244AA','#226633','#AA8822','#662244','#224466','#AA6622'][i];
      ENGINE.rect(bx, 220, 16, 55, bc);
      ENGINE.rect(bx + 2, 212, 12, 12, bc);
      ENGINE.rect(bx + 5, 208, 6, 6, '#888888');
    });
    // fireplace right wall
    ENGINE.rect(820, 200, 100, 200, '#2A1808');
    ENGINE.rect(828, 210, 84, 170, '#1A0804');
    // fire flicker
    const fc = ['#FF6600','#FF8800','#FFAA00','#FF4400'];
    for (let fx = 840; fx < 890; fx += 8) {
      const fh = 80 + Math.sin(f * 0.3 + fx * 0.1) * 20;
      ENGINE.rect(fx, 340 - fh, 6, fh, fc[Math.floor((f + fx) * 0.1) % fc.length]);
    }
    ENGINE.rect(828, 340, 84, 30, '#1A0A04');
    // mantle offering
    ENGINE.rect(835, 196, 80, 10, '#3A2010');
    ENGINE.rect(870, 182, 8, 16, '#C8A874');
    // tables
    [[280,340],[480,340],[640,320]].forEach(([tx,ty]) => {
      ENGINE.rect(tx, ty + 20, 120, 60, '#3A2010');
      ENGINE.rect(tx - 4, ty + 18, 128, 8, '#4A3018');
      // candle on table
      ENGINE.rect(tx + 55, ty + 10, 8, 22, '#EEEECC');
      ENGINE.rect(tx + 56, ty + 6, 6, 8, '#FFAA00');
    });
    // candle glow overlays
    [[335, 310],[535, 310],[695, 290],[870, 310]].forEach(([gx,gy]) => {
      const c = ENGINE.ctx;
      c.save();
      const grad = c.createRadialGradient(gx, gy, 0, gx, gy, 80);
      const gf = 0.12 + 0.04 * Math.sin(f * 0.2);
      grad.addColorStop(0, `rgba(255,160,40,${gf})`);
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      c.fillStyle = grad;
      c.fillRect(gx - 80, gy - 80, 160, 160);
      c.restore();
    });
    // locals at tables
    this._npcSilhouette(300, 360, '#4A3828');
    this._npcSilhouette(520, 360, '#3A4828');
    // Hastha behind bar
    this._npcSilhouette(110, 280, '#4A3A28');
    // stairs upper right
    for (let si = 0; si < 6; si++) ENGINE.rect(730 + si*14, 280 + si*12, 70, 12, '#3A2010');
    ENGINE.rect(720, 278, 14, 180, '#2A1808');
    // rope across stairs
    const c = ENGINE.ctx;
    c.strokeStyle = '#8B5E3C';
    c.lineWidth = 3;
    c.beginPath(); c.moveTo(720, 320); c.lineTo(820, 320); c.stroke();
  },

  // ── ROOT CELLAR ───────────────────────────────────────────────────────────
  root_cellar() {
    ENGINE.gradient(0, 40, 960, 560, [[0,'#0D0806'],[1,'#08040A']]);
    // stone walls
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 12; col++) {
        const bx = col * 80, by = 40 + row * 60;
        const bc = row % 2 === col % 2 ? '#2A2018' : '#241C14';
        ENGINE.rect(bx, by, 78, 58, bc);
        ENGINE.rect(bx, by, 78, 2, '#1A1008');
        ENGINE.rect(bx, by, 2, 58, '#1A1008');
      }
    }
    // lantern glow
    const lx = 480, ly = 120;
    ENGINE.rect(lx - 12, ly - 20, 24, 40, '#AA8830');
    ENGINE.rect(lx - 6, ly - 10, 12, 24, '#FFAA30');
    const c = ENGINE.ctx;
    const grad = c.createRadialGradient(lx, ly, 0, lx, ly, 200);
    grad.addColorStop(0, 'rgba(255,160,40,0.20)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    c.fillStyle = grad;
    c.fillRect(lx - 200, ly - 200, 400, 400);
    // vegetable barrels
    [60,150,810,870].forEach(bx => {
      ENGINE.rect(bx, 380, 60, 80, '#5A3A18');
      ENGINE.rect(bx - 2, 378, 64, 12, '#4A3010');
      ENGINE.rect(bx - 2, 450, 64, 12, '#4A3010');
    });
    // two body-shaped lumps under linen
    [280,460].forEach(bx => {
      ENGINE.rect(bx, 380, 160, 50, '#E8DCC8');
      ENGINE.rect(bx, 380, 160, 4, '#C8BCB8');
      // body shape lumps
      ENGINE.rect(bx + 30, 370, 40, 12, '#E8DCC8');
    });
    // steps back up
    ENGINE.rect(400, 460, 160, 20, '#3A2818');
    ENGINE.rect(420, 440, 120, 20, '#3A2818');
    ENGINE.rect(440, 420, 80, 20, '#3A2818');
    // Hastha's voice from door (light at top of stairs)
    ENGINE.rect(440, 180, 80, 240, '#2A1808', 0.5);
    const doorGrad = c.createRadialGradient(480, 180, 0, 480, 180, 100);
    doorGrad.addColorStop(0, 'rgba(200,140,60,0.3)');
    doorGrad.addColorStop(1, 'rgba(0,0,0,0)');
    c.fillStyle = doorGrad;
    c.fillRect(380, 100, 200, 200);
  },

  // ── WHISPERING WOOD PATH ──────────────────────────────────────────────────
  whispering_wood() {
    const f = ENGINE.frame;
    // dark canopy
    ENGINE.gradient(0, 40, 960, 560, [[0,'#0A1208'],[0.4,'#0D1810'],[1,'#080E06']]);
    // distant canopy light
    ENGINE.rect(380, 40, 200, 120, '#1A2818', 0.6);
    // tree trunks (leaning south = screen right)
    const trees = [[60,0],[140,0],[220,10],[40,20],[300,5],[680,0],[760,10],[840,5],[900,0],[620,15]];
    trees.forEach(([tx, lean]) => {
      ENGINE.rect(tx + lean, 40, 22, 500, '#1E1208');
      // dark green canopy blobs
      ENGINE.rect(tx + lean - 30, 30, 82, 80, '#0D2010');
      ENGINE.rect(tx + lean - 15, 20, 52, 50, '#0F2812');
      // lean south indicator
      ENGINE.rect(tx + lean + 10, 140, 40, 6, '#1E1208');
      ENGINE.rect(tx + lean + 30, 150, 30, 5, '#1E1208');
    });
    // path
    const pathW = 120;
    ENGINE.gradient(400, 200, pathW, 360, [[0,'#2A2018'],[1,'#1A1208']]);
    ENGINE.rect(400, 200, pathW, 360, '#1E1810');
    // moss and leaf floor
    ENGINE.rect(0, 500, 960, 100, '#121008');
    for (let lx = 0; lx < 960; lx += 30) ENGINE.rect(lx, 500, 28, 3, '#0A1008', 0.6);
    // man-shaped impression in moss
    ENGINE.rect(440, 380, 80, 50, '#141208');
    ENGINE.rect(455, 370, 50, 14, '#141208');
    // leather strap
    ENGINE.rect(520, 410, 30, 6, '#5A3A18');
    ENGINE.rect(520, 410, 6, 6, '#3A2010');
    // sigil carved in tree
    const sx = 160, sy = 200;
    const cc = ENGINE.ctx;
    cc.strokeStyle = '#3A5A30';
    cc.lineWidth = 3;
    cc.beginPath(); cc.arc(sx, sy, 18, 0, Math.PI*2); cc.stroke();
    cc.beginPath(); cc.arc(sx, sy + 6, 10, 0.2, Math.PI - 0.2); cc.stroke();
    // eerie ambience — light filtering
    if (f % 40 < 2) ENGINE.rect(0, 0, 960, 600, '#1A3020', 0.05);
    // sound wave suggestion
    for (let i = 0; i < 3; i++) {
      const wy = 180 + i * 40;
      const alpha = 0.05 + 0.03 * Math.sin(f * 0.08 + i);
      ENGINE.rect(0, wy, 960, 3, '#396030', alpha);
    }
  },

  // ── GUARD STATION ─────────────────────────────────────────────────────────
  guard_station() {
    // floor
    ENGINE.gradient(0, 40, 960, 560, [[0,'#2A2818'],[1,'#1A1808']]);
    // walls
    ENGINE.rect(0, 40, 960, 280, '#3A3020');
    // window
    ENGINE.rect(100, 80, 180, 120, '#6A8090');
    ENGINE.rect(102, 82, 176, 116, '#4A6070');
    ENGINE.rect(190, 80, 4, 120, '#2A3028');
    ENGINE.rect(100, 140, 180, 4, '#2A3028');
    // desk
    ENGINE.rect(280, 300, 400, 120, '#4A3018');
    ENGINE.rect(278, 298, 404, 12, '#5A4020');
    // papers and items on desk
    [[300,290],[350,285],[420,292],[500,288],[600,294]].forEach(([px,py]) => {
      ENGINE.rect(px, py, 40, 30, '#E8DCC0');
      ENGINE.rect(px + 4, py + 6, 30, 2, '#4A3018', 0.5);
      ENGINE.rect(px + 4, py + 12, 22, 2, '#4A3018', 0.5);
    });
    // sword rack on wall
    ENGINE.rect(700, 100, 140, 200, '#2A2018');
    ENGINE.rect(706, 108, 10, 184, '#3A3028');
    [720, 740, 760, 780].forEach((sx, i) => {
      ENGINE.rect(sx, 120, 8, 170, '#888888');
      ENGINE.rect(sx - 4, 132, 16, 10, '#5A3810');
      if (i === 0) ENGINE.rect(sx, 118, 8, 4, '#CC4422'); // blood
    });
    // sigil on wall
    ENGINE.rect(40, 100, 80, 100, '#3A3028');
    ENGINE.rect(55, 115, 50, 70, '#2A2018');
    // gray tree sigil
    const c = ENGINE.ctx;
    c.strokeStyle = '#6A6A5A';
    c.lineWidth = 3;
    c.beginPath(); c.moveTo(80, 185); c.lineTo(80, 145); c.stroke();
    c.beginPath(); c.moveTo(80, 165); c.lineTo(62, 145); c.stroke();
    c.beginPath(); c.moveTo(80, 155); c.lineTo(98, 138); c.stroke();
    c.beginPath(); c.moveTo(80, 145); c.lineTo(70, 125); c.stroke();
    // Captain Loyar
    this._npcSilhouette(490, 298, '#4A4038');
  },

  // ── DRIFT HOUSE EXTERIOR ──────────────────────────────────────────────────
  drift_house_exterior() {
    // winter sky
    ENGINE.gradient(0, 40, 960, 250, [[0,'#7A8898'],[1,'#5A6878']]);
    // ground
    ENGINE.gradient(0, 400, 960, 200, [[0,'#5A5040'],[1,'#3A3020']]);
    // main building
    this._building(100, 180, 500, 320, '#6A5840', '#4A3820', '', false);
    // inn sign
    ENGINE.rect(290, 165, 120, 40, '#8A7060');
    const c = ENGINE.ctx;
    c.strokeStyle = '#5A3A18';
    c.lineWidth = 2;
    c.strokeRect(290, 165, 120, 40);
    ENGINE.text('DRIFT HOUSE', 350, 178, { size: 7, col: '#D4A574', align: 'center' });
    // stable
    ENGINE.rect(650, 280, 220, 220, '#5A4830');
    ENGINE.rect(648, 278, 224, 12, '#4A3820');
    ENGINE.rect(720, 390, 80, 110, '#3A2818');
    // window light warm
    ENGINE.rect(180, 260, 80, 70, '#AA8830', 0.7);
    ENGINE.rect(420, 260, 80, 70, '#AA8830', 0.5);
    // door
    ENGINE.rect(295, 400, 60, 100, '#3A2010');
    ENGINE.rect(293, 398, 64, 8, '#4A3018');
    // ground mud
    ENGINE.rect(200, 450, 400, 30, '#4A3828', 0.5);
  },

  // ── MIRA'S ROOM ───────────────────────────────────────────────────────────
  mira_room() {
    // attic close quarters
    ENGINE.gradient(0, 40, 960, 560, [[0,'#1A1008'],[1,'#0A0804']]);
    // slanted ceiling
    const c = ENGINE.ctx;
    c.fillStyle = '#1E1410';
    c.beginPath(); c.moveTo(0, 40); c.lineTo(0, 300); c.lineTo(960, 160); c.lineTo(960, 40); c.fill();
    // straw mattress
    ENGINE.rect(100, 380, 260, 80, '#6A5830');
    ENGINE.rect(104, 384, 252, 72, '#8A7840');
    for (let sx = 110; sx < 350; sx += 15) ENGINE.rect(sx, 384, 2, 72, '#7A6830', 0.5);
    // candle on floor
    ENGINE.rect(395, 420, 10, 30, '#EEEECC');
    ENGINE.rect(396, 414, 8, 10, '#FFAA30');
    const cg = c.createRadialGradient(400, 424, 0, 400, 424, 120);
    cg.addColorStop(0, 'rgba(200,140,40,0.15)');
    cg.addColorStop(1, 'rgba(0,0,0,0)');
    c.fillStyle = cg;
    c.fillRect(280, 300, 240, 200);
    // Mira against wall
    this._npcSilhouette(750, 380, '#4A3828');
    // coat outline
    ENGINE.rect(710, 370, 80, 80, '#5A4838', 0.7);
    // eaves
    ENGINE.rect(0, 40, 960, 30, '#1A1008');
    // small window
    ENGINE.rect(820, 100, 80, 60, '#4A6070');
    ENGINE.rect(822, 102, 76, 56, '#2A4050');
    ENGINE.rect(860, 100, 4, 60, '#1A1010');
    ENGINE.rect(820, 130, 80, 4, '#1A1010');
    // gray winter light from window
    const wg = c.createLinearGradient(820, 100, 820, 400);
    wg.addColorStop(0, 'rgba(140,170,190,0.15)');
    wg.addColorStop(1, 'rgba(0,0,0,0)');
    c.fillStyle = wg;
    c.fillRect(780, 100, 120, 300);
  },

  // ── BRIDGE (COMBAT INTRO SCENE) ───────────────────────────────────────────
  bridge_road() {
    ENGINE.gradient(0, 40, 960, 320, [[0,'#1A1A28'],[1,'#0A0A18']]);
    // moon / dim light
    ENGINE.circle(800, 100, 40, '#EEEEDD');
    ENGINE.rect(820, 60, 60, 90, '#1A1A28'); // cloud over moon
    // long shadows
    ENGINE.gradient(0, 360, 960, 240, [[0,'#3A3028'],[1,'#1A1010']]);
    // stone bridge
    ENGINE.rect(300, 380, 360, 50, '#5A5048');
    ENGINE.rect(296, 376, 368, 12, '#6A6058');
    // creek below
    ENGINE.rect(0, 430, 960, 60, '#1A2830');
    ENGINE.rect(0, 432, 960, 4, '#2A3840', 0.8);
    // bridge stone detail
    for (let bx = 300; bx < 660; bx += 30) {
      ENGINE.rect(bx, 382, 28, 46, '#5A5048');
      ENGINE.rect(bx, 382, 28, 2, '#4A4038');
    }
    // stone marker
    ENGINE.rect(600, 320, 30, 80, '#5A5050');
    ENGINE.rect(596, 316, 38, 12, '#6A6060');
    // road
    ENGINE.rect(350, 260, 260, 120, '#3A3028');
    ENGINE.rect(350, 260, 6, 120, '#2A2018');
    ENGINE.rect(604, 260, 6, 120, '#2A2018');
    // pale hound silhouette
    this._npcSilhouette(480, 374, '#B0B0B0');
  },

  // ── CINDER RIVER FORD ─────────────────────────────────────────────────────
  cinder_ford() {
    const f = ENGINE.frame;
    // dark sky, mist
    ENGINE.gradient(0, 40, 960, 300, [[0,'#2A2A38'],[1,'#1A1A28']]);
    // mist layer
    for (let mx = 0; mx < 960; mx += 60) {
      const my = 240 + Math.sin(f * 0.02 + mx * 0.01) * 20;
      ENGINE.rect(mx, my, 60, 80, '#AABBBB', 0.08);
    }
    // river — black water
    ENGINE.gradient(0, 280, 960, 180, [[0,'#0A1A22'],[0.5,'#0D2030'],[1,'#0A1A22']]);
    // steam rising
    for (let sx = 0; sx < 960; sx += 40) {
      const sh = 30 + Math.sin(f * 0.05 + sx * 0.02) * 15;
      const soffset = Math.sin(f * 0.03 + sx * 0.01) * 8;
      ENGINE.rect(sx + soffset, 285 - sh, 6, sh, '#AABBBB', 0.12);
    }
    // sunken stone road
    for (let rx = 100; rx < 860; rx += 40) {
      ENGINE.rect(rx, 310, 36, 120, '#3A3828', 0.8);
      ENGINE.rect(rx, 310, 36, 3, '#2A2818');
    }
    // eel shapes (dark silhouettes under water)
    [200, 450, 700].forEach((ex, i) => {
      const ey = 330 + Math.sin(f * 0.04 + i) * 10;
      ENGINE.rect(ex, ey, 80, 18, '#0A1820');
      ENGINE.rect(ex + 60, ey + 4, 30, 10, '#0A1820');
    });
    // far bank — Iron Reach
    ENGINE.gradient(0, 420, 960, 180, [[0,'#2A2A30'],[1,'#1A1A20']]);
    ENGINE.rect(0, 420, 960, 180, '#1E1E2A');
    // iron reach distant buildings (darker, more angular)
    [80,200,380,560,720,870].forEach((bx) => {
      ENGINE.rect(bx, 380, 60, 60, '#1A1A24');
      ENGINE.rect(bx + 10, 360, 40, 22, '#1A1A24');
    });
    // guards visible upstream
    this._npcSilhouette(760, 415, '#3A3848');
    this._npcSilhouette(800, 415, '#3A3848');
  },

  // ── EMBER CELL CAMP ───────────────────────────────────────────────────────
  ember_camp() {
    const f = ENGINE.frame;
    // rocky hollow, night
    ENGINE.gradient(0, 40, 960, 400, [[0,'#100808'],[1,'#0A0404']]);
    // rocky walls
    ENGINE.rect(0, 40, 120, 560, '#1A1208');
    ENGINE.rect(840, 40, 120, 560, '#1A1208');
    // rock texture
    [20,60,100].forEach(rx => [100,200,300].forEach(ry => ENGINE.rect(rx, ry, 80, 60, '#1E1610', 0.7)));
    [860,900].forEach(rx => [80,180,280].forEach(ry => ENGINE.rect(rx, ry, 80, 60, '#1E1610', 0.7)));
    // ground — dirt floor
    ENGINE.gradient(0, 450, 960, 150, [[0,'#2A1808'],[1,'#1A1004']]);
    // campfire center
    const fc = [[0,'#FF2200'],[1,'#FF8800'],[2,'#FFCC00'],[3,'#FF4400'],[4,'#FF6600']];
    const fireX = 480, fireY = 360;
    // logs
    ENGINE.rect(fireX - 50, fireY + 10, 100, 10, '#3A1808');
    ENGINE.rect(fireX - 40, fireY + 12, 80, 8, '#2A1004');
    // flame
    for (let fi = 0; fi < 8; fi++) {
      const fh = 40 + Math.sin(f * 0.3 + fi * 0.7) * 20;
      const fw = 12;
      const foffset = Math.sin(f * 0.2 + fi * 1.2) * 8;
      ENGINE.rect(fireX - 40 + fi * 10 + foffset, fireY - fh, fw, fh, fc[fi % 5][1]);
    }
    // fire glow
    const cg = ENGINE.ctx.createRadialGradient(fireX, fireY, 0, fireX, fireY, 200);
    cg.addColorStop(0, 'rgba(255,120,30,0.25)');
    cg.addColorStop(1, 'rgba(0,0,0,0)');
    ENGINE.ctx.fillStyle = cg;
    ENGINE.ctx.fillRect(fireX - 200, fireY - 200, 400, 400);
    // tents
    [[140,320],[280,300],[650,305],[780,320]].forEach(([tx,ty]) => {
      const c = ENGINE.ctx;
      c.fillStyle = '#4A3828';
      c.beginPath(); c.moveTo(tx, ty + 80); c.lineTo(tx + 60, ty); c.lineTo(tx + 120, ty + 80); c.fill();
      c.strokeStyle = '#3A2818'; c.lineWidth = 2; c.stroke();
    });
    // rebel NPCs
    [[200,360],[350,350],[600,355],[700,345],[400,380],[560,375]].forEach(([nx,ny]) => {
      this._npcSilhouette(nx, ny, '#3A3028');
    });
    // Yssen at fire
    this._npcSilhouette(fireX - 60, fireY - 30, '#5A4028');
  },

  // ── FOREST ROAD (AMBUSH) ──────────────────────────────────────────────────
  forest_ambush() {
    const f = ENGINE.frame;
    ENGINE.gradient(0, 40, 960, 400, [[0,'#0A1008'],[1,'#060806']]);
    // Moon
    ENGINE.circle(700, 80, 35, '#EEEEDD');
    // dense trees
    [40,120,200,740,820,900].forEach(tx => {
      ENGINE.rect(tx, 40, 24, 560, '#1A1208');
      ENGINE.rect(tx - 20, 30, 64, 70, '#0D1808');
      ENGINE.rect(tx - 10, 20, 44, 40, '#0F2010');
    });
    // fallen tree blocking path
    ENGINE.rect(250, 390, 440, 30, '#3A2010');
    ENGINE.rect(254, 388, 432, 12, '#2A1808');
    // road
    ENGINE.rect(330, 270, 300, 150, '#2A2018');
    // shadow NPCs in undergrowth
    ENGINE.rect(270, 360, 18, 40, '#0A0A10');
    ENGINE.rect(640, 355, 18, 45, '#0A0A10');
    ENGINE.rect(480, 350, 18, 42, '#0A0A10');
    // Pale Hound eyes (just visible)
    ENGINE.rect(278, 370, 4, 4, '#BBBBCC');
    ENGINE.rect(648, 365, 4, 4, '#BBBBCC');
    ENGINE.rect(488, 360, 4, 4, '#BBBBCC');
    // moonlight shaft
    const mg = ENGINE.ctx.createLinearGradient(480, 40, 480, 420);
    mg.addColorStop(0, 'rgba(230,230,210,0.08)');
    mg.addColorStop(1, 'rgba(0,0,0,0)');
    ENGINE.ctx.fillStyle = mg;
    ENGINE.ctx.fillRect(400, 40, 160, 380);
  },

  // ── VAEL AUREN CITY GATES ─────────────────────────────────────────────────
  city_gates() {
    ENGINE.gradient(0, 40, 960, 300, [[0,'#1A1A28'],[1,'#0A0A18']]);
    // massive obsidian wall
    ENGINE.rect(0, 200, 960, 440, '#0D0D14');
    ENGINE.rect(0, 200, 960, 12, '#1A1A2A');
    // fused glass texture
    for (let gx = 0; gx < 960; gx += 80) {
      ENGINE.rect(gx, 200, 78, 440, '#0D0D14');
      ENGINE.rect(gx, 200, 78, 3, '#1A1A28', 0.5);
    }
    // towers
    ENGINE.rect(0, 100, 180, 340, '#141420');
    ENGINE.rect(780, 100, 180, 340, '#141420');
    // tower windows
    [[50,150],[110,150],[50,220],[110,220]].forEach(([wx,wy]) => {
      ENGINE.rect(wx, wy, 24, 36, '#39FF14', 0.3);
    });
    [[810,150],[870,150],[810,220],[870,220]].forEach(([wx,wy]) => {
      ENGINE.rect(wx, wy, 24, 36, '#39FF14', 0.3);
    });
    // gate arch
    ENGINE.rect(300, 200, 360, 240, '#0A0A12');
    ENGINE.rect(302, 202, 356, 238, '#0D0D18');
    // gate portcullis
    for (let gx = 305; gx < 655; gx += 24) ENGINE.rect(gx, 200, 4, 238, '#2A2A38');
    for (let gy = 210; gy < 430; gy += 30) ENGINE.rect(305, gy, 350, 4, '#2A2A38');
    // open gap at bottom
    ENGINE.rect(310, 360, 340, 80, '#0A0A10');
    // guard queue
    [350,400,450,500].forEach((qx) => this._npcSilhouette(qx, 420, '#2A2A38'));
    // guards
    this._npcSilhouette(290, 400, '#3A3A48');
    this._npcSilhouette(670, 400, '#3A3A48');
    // obsidian towers in distance
    [0,2,4,6,8].forEach(i => {
      const tx = 100 + i * 160, th = 60 + i % 3 * 30;
      ENGINE.rect(tx, 40, 40, th, '#141420');
    });
    // green atmospheric glow
    ENGINE.rect(0, 40, 960, 200, '#001A00', 0.15);
  },

  // ── GLASS CITY STREETS ────────────────────────────────────────────────────
  glass_city() {
    // obsidian street floor
    ENGINE.gradient(0, 380, 960, 220, [[0,'#0D0D18'],[1,'#080810']]);
    // sky between towers
    ENGINE.gradient(0, 40, 960, 280, [[0,'#0A0A1A'],[1,'#141430']]);
    // obsidian towers both sides
    [[0,40,160,500],[180,80,120,460],[350,40,100,480],[670,60,130,480],[820,40,140,500]].forEach(([tx,ty,tw,th]) => {
      ENGINE.gradient(tx, ty, tw, th, [[0,'#141420'],[1,'#0A0A14']]);
      // windows — some with green light
      for (let wy = ty + 20; wy < ty + th - 20; wy += 40) {
        for (let wx = tx + 10; wx < tx + tw - 10; wx += 30) {
          const lit = (wx + wy) % 90 < 15;
          ENGINE.rect(wx, wy, 18, 24, lit ? '#002200' : '#0A0A14');
          if (lit) ENGINE.rect(wx + 2, wy + 2, 14, 20, '#39FF14', 0.25);
        }
      }
    });
    // street reflection on glass floor
    ENGINE.rect(0, 420, 960, 180, '#0A0A14');
    ENGINE.rect(0, 420, 960, 4, '#1A1A28', 0.5);
    // merchant stalls
    [[240,340],[560,330]].forEach(([sx,sy]) => {
      ENGINE.rect(sx, sy, 160, 80, '#2A1808');
      ENGINE.rect(sx - 4, sy - 4, 168, 12, '#8A5E30');
      ENGINE.rect(sx, sy, 160, 4, '#AA7A40');
    });
    // notice board
    ENGINE.rect(460, 280, 40, 140, '#3A2010');
    ENGINE.rect(440, 290, 80, 60, '#8A7A60');
    // NPCs
    [200,340,480,640,780].forEach(nx => this._npcSilhouette(nx, 380, '#2A2A38'));
    // green tinge on street
    ENGINE.rect(0, 40, 960, 560, '#001A00', 0.06);
  },

  // ── QUIET HAND CHAPTER HOUSE ──────────────────────────────────────────────
  chapter_house() {
    ENGINE.gradient(0, 40, 960, 560, [[0,'#12100A'],[1,'#0A0804']]);
    // walls of books
    for (let bx = 0; bx < 960; bx += 28) {
      const bc = ['#3A1808','#1A3808','#1A0838','#383808','#301818','#181830'][bx % 6 === 0 ? 0 : Math.floor(bx/28) % 5];
      ENGINE.rect(bx, 40, 26, 200, bc);
      ENGINE.rect(bx, 240, 26, 1, '#0A0804');
    }
    // desk front
    ENGINE.rect(240, 320, 480, 80, '#3A2010');
    ENGINE.rect(238, 318, 484, 12, '#4A3018');
    // stacked books on desk
    [[260,305],[320,298],[400,308],[500,300],[560,295],[620,310]].forEach(([bx,by]) => {
      const bc = ['#3A1808','#1A3808','#383808'][Math.floor(bx/10) % 3];
      ENGINE.rect(bx, by, 50, 16, bc);
    });
    // reading lamp
    ENGINE.rect(480, 290, 10, 50, '#4A4438');
    ENGINE.rect(460, 284, 50, 10, '#3A3428');
    ENGINE.rect(474, 294, 22, 6, '#FFCC44');
    const cg = ENGINE.ctx.createRadialGradient(485, 285, 0, 485, 285, 120);
    cg.addColorStop(0, 'rgba(255,200,80,0.2)');
    cg.addColorStop(1, 'rgba(0,0,0,0)');
    ENGINE.ctx.fillStyle = cg;
    ENGINE.ctx.fillRect(365, 165, 240, 240);
    // Orenna and Thess silhouettes
    this._npcSilhouette(400, 316, '#4A4038');
    this._npcSilhouette(620, 310, '#5A5048');
    // floor
    ENGINE.rect(0, 480, 960, 160, '#1A1008');
    for (let fx = 0; fx < 960; fx += 80) ENGINE.rect(fx, 480, 78, 160, '#1E1408', 0.5);
    // order symbol on back wall
    ENGINE.rect(440, 80, 80, 80, '#2A2018');
    const c = ENGINE.ctx;
    c.strokeStyle = '#6A5A40';
    c.lineWidth = 3;
    c.beginPath(); c.arc(480, 120, 28, 0, Math.PI*2); c.stroke();
    c.beginPath(); c.moveTo(480, 90); c.lineTo(480, 148); c.stroke();
    c.beginPath(); c.moveTo(452, 120); c.lineTo(508, 120); c.stroke();
  },

  // ── EDDIK'S FLOPHOUSE ─────────────────────────────────────────────────────
  eddik_flophouse() {
    const f = ENGINE.frame;
    ENGINE.gradient(0, 40, 960, 560, [[0,'#0D0A0A'],[1,'#080606']]);
    // concrete walls (pre-Fall)
    ENGINE.rect(0, 40, 960, 10, '#1A1818');
    ENGINE.rect(0, 40, 10, 560, '#1A1818');
    ENGINE.rect(950, 40, 10, 560, '#1A1818');
    // small room
    ENGINE.rect(100, 120, 760, 380, '#120E0E');
    // cot
    ENGINE.rect(540, 330, 280, 80, '#3A2A18');
    ENGINE.rect(538, 328, 284, 12, '#4A3820');
    // dark stained mattress
    ENGINE.rect(542, 340, 276, 68, '#4A3020');
    // Eddik on cot (dying)
    ENGINE.rect(548, 330, 160, 40, '#C89060');
    ENGINE.rect(544, 365, 180, 20, '#5A4828');
    // blood spreading
    ENGINE.rect(540, 360, 100, 40, '#3A0808', 0.8);
    // candle on floor
    ENGINE.rect(494, 430, 8, 24, '#EEEECC');
    const flicker = 0.08 + 0.04 * Math.sin(f * 0.4);
    ENGINE.rect(494, 422, 8, 12, '#FFAA20');
    const cg = ENGINE.ctx.createRadialGradient(498, 430, 0, 498, 430, 80);
    cg.addColorStop(0, `rgba(200,140,40,${flicker * 2})`);
    cg.addColorStop(1, 'rgba(0,0,0,0)');
    ENGINE.ctx.fillStyle = cg;
    ENGINE.ctx.fillRect(418, 350, 160, 160);
    // small pack
    ENGINE.rect(180, 420, 80, 60, '#4A3828');
    ENGINE.rect(182, 422, 76, 8, '#5A4838');
    // broken glass window (pre-Fall)
    ENGINE.rect(820, 160, 80, 80, '#0A0A14');
    ENGINE.rect(820, 160, 80, 4, '#1A1A28');
    ENGINE.rect(820, 160, 4, 80, '#1A1A28');
    // door
    ENGINE.rect(100, 160, 80, 200, '#1E1410');
  },

  // ── IRON REACH THRONE ROOM ────────────────────────────────────────────────
  iron_reach() {
    ENGINE.gradient(0, 40, 960, 560, [[0,'#0A0A12'],[1,'#060608']]);
    // iron columns
    [100,280,680,860].forEach(cx => {
      ENGINE.rect(cx, 40, 36, 560, '#1A1A22');
      ENGINE.rect(cx - 4, 40, 44, 20, '#2A2A32');
      ENGINE.rect(cx - 4, 580, 44, 20, '#2A2A32');
    });
    // oil lanterns between columns
    [190,480,770].forEach(lx => {
      ENGINE.rect(lx, 80, 12, 30, '#3A3428');
      ENGINE.rect(lx - 6, 110, 24, 20, '#AA8830');
      ENGINE.rect(lx - 4, 112, 20, 16, '#FFAA30', 0.8);
    });
    // war table center
    ENGINE.rect(280, 320, 400, 140, '#1E1810');
    ENGINE.rect(278, 318, 404, 12, '#2A2018');
    // map pins on table
    [[310,330],[350,350],[400,325],[460,345],[500,330],[540,360]].forEach(([px,py]) => {
      ENGINE.rect(px, py, 6, 10, '#CC2222');
    });
    // Sereth at table
    this._npcSilhouette(490, 316, '#3A3038');
    // walls — iron plates
    for (let wy = 40; wy < 600; wy += 40) {
      ENGINE.rect(0, wy, 100, 38, '#141418');
      ENGINE.rect(860, wy, 100, 38, '#141418');
    }
    // black banner
    ENGINE.rect(420, 40, 120, 160, '#0A0A10');
    ENGINE.rect(445, 50, 70, 6, '#CC2222');
    ENGINE.rect(450, 60, 60, 4, '#CC2222');
    // floor
    ENGINE.gradient(0, 540, 960, 100, [[0,'#141418'],[1,'#0A0A0E']]);
    for (let fx = 0; fx < 960; fx += 60) ENGINE.rect(fx, 540, 58, 100, '#101014', 0.5);
  },

  // ── SALT COAST RUINS ──────────────────────────────────────────────────────
  salt_coast() {
    // sea visible
    ENGINE.gradient(0, 40, 960, 300, [[0,'#0A1A2A'],[1,'#141E2A']]);
    ENGINE.gradient(0, 280, 960, 80, [[0,'#1A3A4A'],[1,'#0A1A2A']]);
    // collapsed citadel
    ENGINE.rect(0, 220, 700, 420, '#2A2820');
    // leaning — right side collapsed
    const c = ENGINE.ctx;
    c.fillStyle = '#2A2820';
    c.beginPath(); c.moveTo(500, 220); c.lineTo(700, 220); c.lineTo(700, 640); c.lineTo(580, 640); c.fill();
    // sea through gap on right
    ENGINE.gradient(700, 220, 260, 420, [[0,'#0A1A2A'],[1,'#0A141E']]);
    // waves
    for (let wx = 700; wx < 960; wx += 50) {
      ENGINE.rect(wx, 280 + Math.sin(wx * 0.1) * 8, 40, 6, '#1A3A4A');
    }
    // crumbling stone texture
    for (let sx = 0; sx < 700; sx += 40) {
      for (let sy = 220; sy < 640; sy += 40) {
        if ((sx + sy) % 80 === 0) ENGINE.rect(sx, sy, 38, 38, '#242218', 0.7);
      }
    }
    // salt crystal deposits
    [[80,420],[200,460],[360,400],[480,450]].forEach(([cx,cy]) => {
      ENGINE.rect(cx, cy, 20, 30, '#EEEEF8', 0.5);
      ENGINE.rect(cx + 5, cy - 8, 10, 12, '#F0F0FF', 0.6);
    });
    // library entrance
    ENGINE.rect(300, 340, 120, 200, '#1A1810');
    ENGINE.rect(298, 338, 124, 10, '#2A2820');
    // gull in rafters
    ENGINE.rect(450, 160, 20, 6, '#8A8A7A');
    ENGINE.rect(442, 155, 10, 8, '#8A8A7A');
    ENGINE.rect(458, 155, 10, 8, '#8A8A7A');
    // collapsed floor gap
    ENGINE.rect(560, 440, 160, 60, '#0A1A2A');
  },

  // ── SPYMASTER'S CRYPT ─────────────────────────────────────────────────────
  spymaster_crypt() {
    ENGINE.gradient(0, 40, 960, 560, [[0,'#08060A'],[1,'#040408']]);
    // stone sarcophagi
    [[100,300],[300,300],[550,300],[750,300]].forEach(([sx,sy]) => {
      ENGINE.rect(sx, sy, 160, 60, '#2A2828');
      ENGINE.rect(sx - 2, sy - 4, 164, 14, '#3A3838');
    });
    // three lanterns on floor
    [[200,400],[480,380],[760,400]].forEach(([lx,ly]) => {
      ENGINE.rect(lx - 10, ly, 20, 30, '#AA8830');
      ENGINE.rect(lx - 8, ly + 2, 16, 22, '#FFAA20', 0.9);
      const cg = ENGINE.ctx.createRadialGradient(lx, ly, 0, lx, ly, 100);
      cg.addColorStop(0, 'rgba(200,150,40,0.2)');
      cg.addColorStop(1, 'rgba(0,0,0,0)');
      ENGINE.ctx.fillStyle = cg;
      ENGINE.ctx.fillRect(lx-100, ly-100, 200, 200);
    });
    // Calvix silhouette (back to entrance)
    this._npcSilhouette(480, 298, '#2A2828');
    // stone walls
    ENGINE.rect(0, 40, 960, 80, '#1A1818');
    ENGINE.rect(0, 580, 960, 60, '#1A1818');
    // crypt arch entrance (where party entered)
    ENGINE.rect(400, 540, 160, 100, '#0A080A');
    ENGINE.rect(398, 538, 164, 10, '#2A2828');
    // stone floor
    for (let fx = 0; fx < 960; fx += 60) ENGINE.rect(fx, 480, 58, 100, '#1A1818', 0.5);
  },

  // ── VAEL AUREN SUMMIT HALL ────────────────────────────────────────────────
  summit_hall() {
    const f = ENGINE.frame;
    // smoke-glass dome ceiling — green-tinted daylight
    ENGINE.gradient(0, 40, 960, 200, [[0,'#1A2A18'],[0.5,'#0A1A10'],[1,'#0A1208']]);
    // round obsidian hall
    ENGINE.rect(0, 200, 960, 440, '#0D0D14');
    // five thrones
    [[120,260],[280,240],[480,230],[680,240],[840,260]].forEach(([tx,ty],i) => {
      ENGINE.rect(tx, ty, 80, 100, '#1A1828');
      ENGINE.rect(tx - 4, ty - 20, 88, 24, '#2A2838');
      // throne back
      ENGINE.rect(tx + 10, ty - 40, 60, 30, '#1A1828');
      // seated Magus silhouette
      this._npcSilhouette(tx + 40, ty, ['#3A3048','#2A2838','#3A3858','#382838','#2A3038'][i]);
      // Veyra — white glow
      if (i === 2) {
        ENGINE.rect(tx, ty, 80, 100, '#FFFFFF', 0.05);
        ENGINE.rect(tx - 4, ty - 20, 88, 24, '#FFFFFF', 0.08);
      }
    });
    // central table
    ENGINE.rect(260, 390, 440, 80, '#1A1A28');
    ENGINE.rect(258, 388, 444, 12, '#2A2A38');
    // obsidian disk on table center
    ENGINE.circle(480, 416, 20, '#0D0D18');
    ENGINE.circle(480, 416, 18, '#1A1A28');
    ENGINE.circle(480, 416, 10, '#001A00', false);
    // Pale Hound guards lining walls
    [60,170,790,900].forEach(gx => this._npcSilhouette(gx, 390, '#1A1A28'));
    // smoke beginning to fill
    if (f > 300) {
      ENGINE.rect(0, 200, 960, 440, '#3A3020', Math.min(0.5, (f - 300) * 0.002));
    }
    // green tinge on daylight
    ENGINE.rect(0, 40, 960, 200, '#001A00', 0.2);
  },

  // ── BLACK COAST CAMP ──────────────────────────────────────────────────────
  black_coast() {
    const f = ENGINE.frame;
    // night sky — clearest of the game, but green tinge
    ENGINE.gradient(0, 40, 960, 300, [[0,'#050810'],[0.5,'#050A0A'],[1,'#030806']]);
    // green aurora strong now
    for (let x = 0; x < 960; x += 4) {
      const h = 80 + Math.sin(x * 0.015 + f * 0.02) * 40;
      ENGINE.rect(x, 280 - h, 4, h, '#39FF14', 0.25 + 0.1 * Math.sin(x * 0.02 + f * 0.01));
    }
    // cathedral silhouette in distance — just spires
    [380,420,460,500,540].forEach((sx,i) => {
      const sh = 80 + i * 30;
      ENGINE.rect(sx, 280 - sh, 12, sh, '#001A00');
      ENGINE.rect(sx + 4, 280 - sh - 20, 4, 22, '#001A00');
    });
    // black sand beach
    ENGINE.gradient(0, 360, 960, 240, [[0,'#0A0808'],[1,'#050404']]);
    // wave lines
    for (let wx = 0; wx < 960; wx += 60) {
      ENGINE.rect(wx, 380, 50, 4, '#0D1820', 0.7);
      ENGINE.rect(wx + 30, 392, 50, 3, '#0D1820', 0.5);
    }
    // campfire
    this._campfire(480, 430, f);
    // tents around fire
    [[200,400],[740,400]].forEach(([tx,ty]) => {
      const c = ENGINE.ctx;
      c.fillStyle = '#2A1808';
      c.beginPath(); c.moveTo(tx, ty + 80); c.lineTo(tx + 60, ty); c.lineTo(tx + 120, ty + 80); c.fill();
    });
    // ally silhouettes around fire
    this._npcSilhouette(380, 440, '#3A2818');
    this._npcSilhouette(580, 440, '#2A3828');
    this._npcSilhouette(440, 460, '#4A3838');
  },

  _campfire(x, y, f) {
    ENGINE.rect(x - 40, y + 10, 80, 10, '#2A1004');
    for (let fi = 0; fi < 6; fi++) {
      const fh = 30 + Math.sin(f * 0.3 + fi) * 14;
      const fo = Math.sin(f * 0.2 + fi * 1.1) * 6;
      ENGINE.rect(x - 24 + fi * 8 + fo, y - fh, 6, fh, ['#FF4400','#FF8800','#FFCC00'][fi % 3]);
    }
    const cg = ENGINE.ctx.createRadialGradient(x, y, 0, x, y, 160);
    cg.addColorStop(0, 'rgba(255,120,30,0.2)');
    cg.addColorStop(1, 'rgba(0,0,0,0)');
    ENGINE.ctx.fillStyle = cg;
    ENGINE.ctx.fillRect(x - 160, y - 160, 320, 320);
  },

  // ── CATHEDRAL ROOMS ───────────────────────────────────────────────────────
  cathedral_exterior() {
    const f = ENGINE.frame;
    ENGINE.gradient(0, 40, 960, 560, [[0,'#02080A'],[1,'#010406']]);
    // shallow water
    ENGINE.gradient(0, 400, 960, 200, [[0,'#041820'],[1,'#020C10']]);
    for (let wx = 0; wx < 960; wx += 50) ENGINE.rect(wx, 420 + Math.sin(wx * 0.08 + f * 0.03) * 6, 40, 5, '#0A2A38', 0.6);
    // cathedral spires rising from water
    [[200,50,40,400],[300,80,60,380],[400,20,80,440],[500,40,100,420],[600,60,70,390],[700,30,50,410]].forEach(([sx,sy,sw,sh]) => {
      ENGINE.rect(sx, sy, sw, sh, '#030A08');
      ENGINE.rect(sx + sw/2 - 6, sy - 30, 12, 32, '#030A08');
      // green bioluminescence
      ENGINE.rect(sx + sw/2 - 4, sy + sh/2, 8, 20, '#39FF14', 0.3 + 0.1 * Math.sin(f * 0.04 + sx));
    });
    // entrance
    ENGINE.rect(360, 320, 240, 280, '#020808');
    ENGINE.rect(358, 318, 244, 12, '#0A1810');
    // ancient door (bronze)
    ENGINE.rect(400, 340, 160, 240, '#4A3A0A');
    ENGINE.rect(402, 342, 156, 236, '#3A2C06');
    // sigils on door
    const c = ENGINE.ctx;
    c.strokeStyle = '#6A5A10';
    c.lineWidth = 1;
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 5; col++) {
        c.strokeRect(410 + col * 28, 352 + row * 28, 22, 22);
      }
    }
    // eerie green glow from within
    const gg = c.createRadialGradient(480, 460, 0, 480, 460, 200);
    gg.addColorStop(0, 'rgba(30,200,40,0.15)');
    gg.addColorStop(1, 'rgba(0,0,0,0)');
    c.fillStyle = gg;
    c.fillRect(280, 260, 400, 400);
  },

  cathedral_1() { this._cathedralRoom('#3A2A08', '#4A3A10', 'Bronze and sigils line every wall.'); },
  cathedral_2() { this._cathedralRoom('#080808', '#101010', 'Twelve niches. One is not empty.'); },
  cathedral_3() { this._cathedralMirrors(); },
  cathedral_4() { this._cathedralDrowned(); },
  cathedral_5() { this._cathedralRoom('#080A04', '#0A0C06', 'Ten stones pulse in the darkness.'); this._stonecircle(); },
  cathedral_6() { this._cathedralDream(); },
  cathedral_7() { this._cathedralRoom('#080408', '#0A060A', 'Seven robed figures sit perfectly still.'); this._choirScene(); },
  cathedral_8() { this._cathedralRoom('#080808', '#0A0A0A', 'Twenty stone cots. Eight are occupied.'); },
  cathedral_9() { this._cathedralRoom('#040A08', '#060C0A', 'Twelve sarcophagi radiate from a central pillar.'); },
  cathedral_10() { this._cathedralRoom('#04080A', '#060A0C', 'A great archway opens onto the final chamber below.'); },
  cathedral_11() { this._cathedralPool(); },
  cathedral_12() { this._cathedralFinal(); },

  _cathedralRoom(dark, mid, subtitle) {
    const f = ENGINE.frame;
    ENGINE.gradient(0, 40, 960, 560, [[0,dark],[1,'#010204']]);
    // stone block walls
    for (let x = 0; x < 960; x += 80) {
      ENGINE.rect(x, 40, 78, 200, mid);
      ENGINE.rect(x, 40, 78, 3, dark);
      ENGINE.rect(x, 240, 78, 200, mid);
    }
    // bioluminescent green streaks
    for (let i = 0; i < 6; i++) {
      ENGINE.rect(i * 160, 100 + Math.sin(i * 2) * 40, 3, 80, '#39FF14', 0.3 + 0.1 * Math.sin(f * 0.05 + i));
    }
    // floor
    ENGINE.gradient(0, 460, 960, 180, [[0,'#020804'],[1,'#010402']]);
    for (let fx = 0; fx < 960; fx += 60) ENGINE.rect(fx, 460, 58, 180, '#040C06', 0.5);
    ENGINE.text(subtitle, 480, 460, { size: 9, col: '#2A4A30', align: 'center', base: 'top' });
  },

  _cathedralMirrors() {
    ENGINE.gradient(0, 40, 960, 560, [[0,'#030308'],[1,'#010106']]);
    // polished black walls
    ENGINE.rect(0, 40, 30, 560, '#050510');
    ENGINE.rect(930, 40, 30, 560, '#050510');
    // mirror panels
    [0,160,320,480,640,800].forEach((mx, i) => {
      ENGINE.gradient(mx, 100, 160, 360, [[0,'#0A0A18'],[0.5,'#050514'],[1,'#0A0A18']]);
      ENGINE.rect(mx, 100, 158, 358, '#050514');
      ENGINE.stroke(mx, 100, 158, 358, '#1A1A2A', 2);
      // reflection — slightly off
      ENGINE.rect(mx + 4, 104, 150, 350, '#080814', 0.8);
    });
    // one reflection smiling (third from left)
    ENGINE.rect(320, 104, 150, 350, '#08081A', 0.9);
    ENGINE.rect(370, 200, 50, 8, '#2A2A4A'); // eyes of the reflection
    ENGINE.rect(360, 240, 68, 4, '#2A2A4A'); // smile
  },

  _cathedralDrowned() {
    const f = ENGINE.frame;
    ENGINE.gradient(0, 40, 960, 360, [[0,'#020C14'],[1,'#010810']]);
    // waist-deep water
    ENGINE.gradient(0, 260, 960, 200, [[0,'#041C28'],[1,'#020E16']]);
    for (let wx = 0; wx < 960; wx += 40) {
      ENGINE.rect(wx, 270, 36, 4, '#0A2A38', 0.6 + 0.2 * Math.sin(f * 0.05 + wx * 0.04));
    }
    // bookshelves rising from water
    [0,240,480,720].forEach(sx => {
      ENGINE.rect(sx, 40, 230, 260, '#1A1208');
      for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 7; col++) {
          const bc = ['#3A1808','#1A0838','#381808','#083818'][row % 4];
          ENGINE.rect(sx + 10 + col * 30, 50 + row * 55, 28, 52, bc);
        }
      }
    });
    // english title visible
    ENGINE.rect(482, 50, 96, 52, '#8A7A40');
    ENGINE.text('RECORDS', 530, 64, { size: 6, col: '#3A2A08', align: 'center' });
    ENGINE.text('VOL. XII', 530, 76, { size: 5, col: '#3A2A08', align: 'center' });
    // Salt Drinkers under water (just visible)
    ENGINE.rect(200, 310, 30, 80, '#0A2030', 0.7);
    ENGINE.rect(700, 305, 30, 85, '#0A2030', 0.7);
  },

  _stonecircle() {
    const f = ENGINE.frame;
    // ten stones in circle
    const cx = 480, cy = 350, r = 200;
    for (let i = 0; i < 10; i++) {
      const angle = (i / 10) * Math.PI * 2;
      const sx = cx + Math.cos(angle) * r - 20;
      const sy = cy + Math.sin(angle) * r - 60;
      const lit = i !== 9;
      ENGINE.rect(sx, sy, 40, 120, '#0A1208');
      ENGINE.rect(sx + 5, sy + 10, 30, 100, lit ? '#001A00' : '#080808');
      if (lit) {
        const gf = 0.3 + 0.1 * Math.sin(f * 0.05 + i);
        ENGINE.rect(sx + 10, sy + 20, 20, 80, '#39FF14', gf);
      }
    }
  },

  _cathedralDream() {
    ENGINE.gradient(0, 40, 960, 560, [[0,'#050208'],[1,'#030106']]);
    // no walls visible — just void and whispers
    for (let i = 0; i < 12; i++) {
      const x = Math.sin(i * 1.3) * 400 + 480;
      const y = Math.cos(i * 0.8) * 200 + 300;
      ENGINE.rect(x - 2, y - 2, 4, 4, '#2A1A3A', 0.5);
      ENGINE.rect(x - 30, y, 60, 1, '#1A0A28', 0.3);
    }
    ENGINE.text('Your name. Someone is saying your name.', 480, 300, {
      size: 9, col: '#2A1A3A', align: 'center', base: 'middle'
    });
  },

  _choirScene() {
    // seven figures on stone benches
    const benchY = 380;
    for (let i = 0; i < 7; i++) {
      const bx = 120 + i * 100;
      ENGINE.rect(bx - 10, benchY + 40, 60, 12, '#0A0808');
      this._npcSilhouette(bx + 20, benchY + 40, '#2A1A2A');
      // open eyes glow
      ENGINE.rect(bx + 12, benchY + 4, 16, 4, '#39FF14', 0.6);
    }
  },

  _cathedralPool() {
    const f = ENGINE.frame;
    ENGINE.gradient(0, 40, 960, 560, [[0,'#020408'],[1,'#010204']]);
    // perfect circular pool
    const pc = ENGINE.ctx;
    pc.fillStyle = '#010A10';
    pc.beginPath(); pc.arc(480, 380, 120, 0, Math.PI * 2); pc.fill();
    pc.strokeStyle = '#0A2A30';
    pc.lineWidth = 4;
    pc.stroke();
    // still black surface
    pc.strokeStyle = '#0A1820';
    pc.lineWidth = 1;
    pc.beginPath(); pc.arc(480, 380, 100, 0, Math.PI * 2); pc.stroke();
    // reflection — something looking back (green eyes)
    ENGINE.circle(464, 388, 5, '#39FF14');
    ENGINE.circle(496, 388, 5, '#39FF14');
    // vision shimmer
    const shimmer = 0.1 + 0.05 * Math.sin(f * 0.08);
    ENGINE.rect(360, 260, 240, 240, '#001A00', shimmer);
  },

  _cathedralFinal() {
    const f = ENGINE.frame;
    ENGINE.gradient(0, 40, 960, 560, [[0,'#010A04'],[1,'#000802']]);
    // vast chamber — walls barely visible
    ENGINE.rect(0, 40, 20, 560, '#010804');
    ENGINE.rect(940, 40, 20, 560, '#010804');
    // dais
    ENGINE.rect(340, 380, 280, 40, '#080A06');
    ENGINE.rect(338, 376, 284, 10, '#0C1008');
    // Veyra on dais in white
    ENGINE.rect(448, 300, 64, 80, '#E8E8F4');
    ENGINE.rect(444, 376, 72, 10, '#C8C8D8');
    // green light gathering around her
    const vg = ENGINE.ctx.createRadialGradient(480, 340, 0, 480, 340, 200);
    const gintensity = 0.3 + 0.1 * Math.sin(f * 0.05);
    vg.addColorStop(0, `rgba(30,220,50,${gintensity})`);
    vg.addColorStop(0.5, `rgba(10,80,20,${gintensity * 0.5})`);
    vg.addColorStop(1, 'rgba(0,0,0,0)');
    ENGINE.ctx.fillStyle = vg;
    ENGINE.ctx.fillRect(280, 140, 400, 400);
    // sigils on floor crawling
    for (let i = 0; i < 20; i++) {
      const angle = (i / 20) * Math.PI * 2 + f * 0.01;
      const r = 120 + (i % 3) * 40;
      const sx = 480 + Math.cos(angle) * r;
      const sy = 400 + Math.sin(angle) * r * 0.4;
      ENGINE.rect(sx - 4, sy - 2, 8, 4, '#39FF14', 0.2 + 0.1 * Math.sin(f * 0.1 + i));
    }
    // ceiling lost in green mist
    ENGINE.gradient(0, 40, 960, 200, [[0,'#001A00'],[1,'rgba(0,0,0,0)']]);
    ENGINE.rect(0, 40, 960, 200, '#001A00', 0.25);
  }
};
