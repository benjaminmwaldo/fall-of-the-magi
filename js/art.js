'use strict';

// ─────────────────────────────────────────────────────────────────────────────
// PIXEL SIZE CONSTANTS
// Scene grid: 240×150 logical pixels → 960×600 screen (y offset 40)
// Portrait grid: 36×44 logical → 180×220 screen
// ─────────────────────────────────────────────────────────────────────────────
const PS = 4;
const PP = 5;

// Scene pixel helpers
function $r(x,y,w,h,col,a){ if(a!==undefined)ENGINE.rect(x*PS,40+y*PS,w*PS,h*PS,col,a); else ENGINE.rect(x*PS,40+y*PS,w*PS,h*PS,col); }
function $p(x,y,col,a)    { $r(x,y,1,1,col,a); }
function $h(y,x1,x2,col,a){ $r(x1,y,x2-x1,1,col,a); }
function $v(x,y1,y2,col,a){ $r(x,y1,1,y2-y1,col,a); }

// Stars for night scenes
function $stars(seed){
  const S=[[11,7],[30,19],[50,10],[85,4],[120,13],[150,7],[180,17],[212,9],
            [22,36],[62,31],[102,40],[140,33],[175,29],[205,43],[42,50],[88,48],
            [132,55],[168,52],[220,45],[17,62],[75,65],[115,60],[170,68],[230,58]];
  const f=ENGINE.frame;
  S.forEach(([x,y],i)=>$p(x,y,'#FFFFFF',0.4+0.6*Math.sin(f*0.05+i*1.7+(seed||0))));
}

// Portrait pixel helpers (set _px/_py before drawing)
let _px=0, _py=0;
function $pr(x,y,w,h,col,a){ if(a!==undefined)ENGINE.rect(_px+x*PP,_py+y*PP,w*PP,h*PP,col,a); else ENGINE.rect(_px+x*PP,_py+y*PP,w*PP,h*PP,col); }
function $pp(x,y,col){ $pr(x,y,1,1,col); }

// ─── SPRITES ──────────────────────────────────────────────────────────────────
const SPRITES = {
  pale_hound:{
    pal:['#D4D4D4','#8C8C8C','#4A4A4A','#B8B8B8','#CCCCCC','#333333','#EEEEEE','#FF3333'],
    rows:['0000011100000000','0000122100000000','0001112110000000','0011211211000000',
          '0121111111200000','0122111111220000','0012221112200000','0001122111000000',
          '0000112110000000','0000122110000000','0001122211000000','0001113311000000',
          '0001133311000000','0001133311000000','0000011100000000','0000000000000000']
  },
  hound_captain:{
    pal:['#D4D4D4','#8C8C8C','#4A4A4A','#FFAA00','#B8B8B8','#333333','#EEEEEE','#FF3333'],
    rows:['0000044400000000','0000142400000000','0001114140000000','0011211411000000',
          '0121111411200000','0122441441220000','0012241114200000','0001142111000000',
          '0000442110000000','0000442110000000','0001442211000000','0001443311000000',
          '0001133311000000','0001133311000000','0000441100000000','0000000000000000']
  },
  cinder_eel:{
    pal:['#2D4A1A','#1A3310','#4A7A2A','#FF6600','#884400','#AAFFAA','#336600','#FF9900'],
    rows:['0000000000000000','0001113000000000','0011133300000000','0011133300000000',
          '0111133311100000','0111143331100000','0111144331100000','0111443331100000',
          '1114444433111000','0111444433111000','0011444433111000','0001144431110000',
          '0001114311110000','0001113111110000','0000003111100000','0000000011000000']
  },
  salt_drinker:{
    pal:['#8AB4C8','#4A7A8C','#2A4A5C','#BBDDEE','#336688','#AABBCC','#225577','#FFFFFF'],
    rows:['0000011100000000','0001122100000000','0011221100000000','0112222110000000',
          '0122211220000000','0122122220000000','0012222220000000','0012211220000000',
          '0001122110000000','0001122110000000','0011122211000000','0011133211000000',
          '0011133211000000','0000113300000000','0000011100000000','0000000000000000']
  },
  hollow_fragment:{
    pal:['#39D353','#1A6620','#00FF44','#004410','#88FF88','#005522','#AAFFAA','#002200'],
    rows:['0000033300000000','0003322330000000','0033211233000000','0032111123000000',
          '0321111112300000','0321113112300000','0321133112300000','0032133112300000',
          '0032133112300000','0032111112300000','0032111123000000','0033211233000000',
          '0003311330000000','0000333300000000','0000033000000000','0000000000000000']
  },
  choir_member:{
    pal:['#E8D8C0','#8C7A60','#4A3820','#FFFFFF','#AAAAAA','#666666','#333333','#9988CC'],
    rows:['0000011100000000','0001122110000000','0011221110000000','0011211110000000',
          '0012211110000000','0122211110000000','0122888810000000','0128888881000000',
          '0012888810000000','0001288810000000','0001288810000000','0001128810000000',
          '0000128810000000','0000128810000000','0000112200000000','0000000000000000']
  },
  veyra_boss:{
    pal:['#E8E8F8','#AAAACC','#666688','#39FF14','#FFFFFF','#BBBBDD','#88AAFF','#4400CC'],
    rows:['0000033300000000','0003322330000000','0031141130000000','0311411413000000',
          '3114311413000000','3114411413000000','3114411413000000','3111444413000000',
          '0311444130000000','0031444130000000','0003114430000000','0003114430000000',
          '0003114430000000','0003114430000000','0003114430000000','0000330300000000']
  },
  warden:{
    pal:['#E8D8C0','#8B5E3C','#4A2C17','#C0A060','#888888','#CCCCCC','#FF4444','#445566'],
    rows:['0000011100000000','0001122110000000','0011211110000000','0011211110000000',
          '0012211110000000','0112255510000000','0122555510000000','0125555510000000',
          '0125555510000000','0125544410000000','0125544410000000','0012544100000000',
          '0012544100000000','0001254100000000','0001254100000000','0000110000000000']
  },
  scholar:{
    pal:['#E8D8C0','#6A3A8C','#4A1A6C','#D4A574','#AAAAFF','#DDDDFF','#FF8800','#888888'],
    rows:['0000011100000000','0001122110000000','0011211110000000','0011211110000000',
          '0012211110000000','0112233310000000','0122333310000000','0123333310000000',
          '0123333310000000','0123322210000000','0123322210000000','0012322100000000',
          '0012322100000000','0001232100000000','0001232100000000','0000110000000000']
  },
  blade:{
    pal:['#E8D8C0','#333344','#1A1A2A','#888888','#CCCCCC','#FFFFFF','#FF4444','#AAAAAA'],
    rows:['0000011100000000','0001122110000000','0011211110000000','0011211110000000',
          '0012211110000000','0112244410000000','0122444410000000','0124444410000000',
          '0124444410000000','0124433310000000','0124433310000000','0012433100000000',
          '0012433100000000','0001243100000000','0001243100000000','0000110000000000']
  },
  hedge_witch:{
    pal:['#E8D8C0','#3A6A3C','#1A4A1C','#D4A574','#88CC88','#CCEECC','#FF8800','#A0D0A0'],
    rows:['0000011100000000','0001122110000000','0011211110000000','0011211110000000',
          '0012211110000000','0112233310000000','0122333310000000','0123333310000000',
          '0123333310000000','0123322210000000','0123322210000000','0012322100000000',
          '0012322100000000','0001232100000000','0001232100000000','0000110000000000']
  }
};

// ─── PORTRAITS ────────────────────────────────────────────────────────────────
// 36×44 pixel grid at PP=5 per logical pixel = 180×220 screen pixels
// Helper: call _face() then add character details with $pr/$pp
const PORTRAITS = {
  draw(name, emotion, sx, sy) {
    _px = sx; _py = sy;
    ENGINE.rect(sx, sy, 36*PP, 44*PP, '#0D0A18');
    ENGINE.stroke(sx, sy, 36*PP, 44*PP, '#8B5E3C', 2);
    const fn = this[name];
    if (fn) fn.call(this, emotion);
    else this._unknown(sx, sy, name);
  },

  // Standard face template. skin/hair/cloth/eye = color strings, opts = { longHair, bald, emotion }
  _face(skin, hair, cloth, eye, opts={}) {
    const em = opts.emotion || 'neutral';
    // Hair back (behind head)
    if (!opts.bald) {
      $pr(8, 3, 20, 10, hair);
      if (opts.longHair) { $pr(5, 10, 4, 20, hair); $pr(27, 10, 4, 20, hair); }
    }
    // Head
    $pr(9, 7, 18, 18, skin);
    // Ears
    $pr(8, 12, 2, 4, skin); $pr(26, 12, 2, 4, skin);
    // Hair front
    if (!opts.bald) $pr(9, 7, 18, 4, hair);
    // Eye whites
    $pr(11, 13, 5, 3, '#E8E4E0');
    $pr(21, 13, 5, 3, '#E8E4E0');
    // Pupils / irises
    const ey = em==='angry'?14:em==='fear'?12:13;
    $pr(12, ey, 3, 2, eye); $pr(22, ey, 3, 2, eye);
    // Pupils dark
    $pr(13, ey, 1, 2, '#0A0808'); $pr(23, ey, 1, 2, '#0A0808');
    // Eyebrows
    const brow = em==='angry' ? 10 : 11;
    const browSlant = em==='angry';
    $pr(11, brow, 5, 1, hair); $pr(21, brow, 5, 1, hair);
    if (browSlant){ $pp(11, brow+1, hair); $pp(21, brow-1, hair); }
    // Nose
    $pr(17, 18, 2, 2, skin); $pr(16, 19, 1, 1, hair); $pr(19, 19, 1, 1, hair);
    // Mouth
    if (em==='happy'||em==='warm'){
      $pr(13,21,10,2,'#7A3030'); $pp(12,22,'#7A3030'); $pp(23,22,'#7A3030');
    } else if (em==='sad'||em==='dying'){
      $pr(13,22,10,2,'#7A3030'); $pp(12,21,'#7A3030'); $pp(23,21,'#7A3030');
    } else if (em==='fear'||em==='worried'){
      $pr(14,21,8,1,'#7A3030'); $pr(14,22,2,1,'#1A0808'); $pr(20,22,2,1,'#1A0808');
    } else if (em==='sinister'){
      $pr(12,21,12,1,'#7A3030'); $pp(12,22,'#7A3030'); $pp(23,22,'#7A3030');
      $pr(14,22,4,1,'#E8E4E0'); $pr(19,22,3,1,'#E8E4E0');
    } else if (em==='angry'){
      $pr(14,22,8,2,'#7A3030');
    } else {
      $pr(14,21,8,1,'#7A3030');
    }
    // Neck
    $pr(15, 25, 6, 4, skin);
    // Body / cloth
    $pr(4, 29, 28, 15, cloth);
    // Collar shadow
    $pr(10, 29, 16, 2, cloth);
  },

  hastha(em) {
    this._face('#C07848','#4A3A30','#3A2818','#5A4030',{emotion:em});
    // Gray streak in hair
    $pr(9,7,4,4,'#888878');
    // Wide shoulders
    $pr(2,29,32,15,'#3A2818');
    $pr(4,29,28,15,'#4A3828');
    // Knife at hip
    $pr(28,32,2,10,'#888888'); $pr(27,31,4,2,'#7A5A3C');
    // Tavern-keeper's apron
    $pr(10,32,16,12,'#6A5A48');
  },

  mira(em) {
    const mapped = em==='scared'?'fear':em;
    this._face('#E8C898','#C8A858','#4A3828','#5A4830',{emotion:mapped,longHair:true});
    // Oversized coat
    $pr(2,29,32,15,'#5A4828');
    // Bruise under eye
    if(em==='scared'||em==='neutral') $pr(10,15,4,2,'#7A5A8A',0.7);
    // Coat collar detail
    $pr(8,30,4,8,'#6A5838'); $pr(24,30,4,8,'#6A5838');
  },

  kael(em) {
    this._face('#B07848','#3A2A18','#2A2A3A','#4A3828',{emotion:em});
    // Eye scar (X marks)
    $pr(10,11,2,1,'#8A6A50'); $pr(14,14,2,1,'#8A6A50');
    $pr(10,14,2,1,'#8A6A50'); $pr(14,11,2,1,'#8A6A50');
    // Armor
    $pr(2,29,32,15,'#2A2A3A');
    // Mechanical arm seam (right side)
    $pr(26,29,4,15,'#484858');
    $pr(27,30,2,13,'#585868');
    $pr(27,32,2,1,'#888898');
    $pr(27,36,2,1,'#888898');
    $pr(27,40,2,1,'#888898');
  },

  yssen(em) {
    this._face('#C08858','#CC9940','#4A2A18','#4A3020',{emotion:em});
    // Burn scars on side of face
    $pr(24,12,3,8,'#9A6038',0.8);
    $pr(25,14,2,6,'#7A4828',0.9);
    // Robes
    $pr(4,29,28,15,'#5A3818');
    // Candle in hand
    if(em!=='angry'){
      $pr(30,24,2,6,'#EEEACC');
      $pr(30,22,2,3,'#FFAA20');
      $pr(29,21,4,2,'#FF8800',0.7);
    }
  },

  calvix(em) {
    this._face('#D0A870','#888870','#0A0A0A','#445566',{emotion:em,bald:false});
    // Gray beard
    $pr(9,21,18,7,'#888870');
    $pr(11,24,14,5,'#AAAAAA');
    // Black robes
    $pr(2,29,32,15,'#0E0E12');
    $pr(10,29,16,15,'#1A1A22');
    // Black gloves
    $pr(4,35,6,6,'#080808'); $pr(26,35,6,6,'#080808');
    // Missing pinky indicator
    $pr(4,36,5,3,'#080808');
  },

  veyra(em) {
    const mapped = em==='vessel'?'sinister':em;
    this._face('#F0EEFA','#E8E8FA','#F0EEFF','#8888BB',{emotion:mapped,longHair:true});
    // Cold blue-white tint
    $pr(9,7,18,18,'#E0E0F0',0.2);
    // White robes
    $pr(2,29,32,15,'#EEEEF8');
    $pr(6,31,24,12,'#DDDDE8');
    // Vessel: glowing green eyes
    if(em==='vessel'){
      $pr(11,13,5,3,'#001800');
      $pr(21,13,5,3,'#001800');
      $pr(11,13,5,3,'#39FF14',0.9);
      $pr(21,13,5,3,'#39FF14',0.9);
      $pr(12,13,3,3,'#AAFFAA');
      $pr(22,13,3,3,'#AAFFAA');
    }
  },

  sereth(em) {
    this._face('#C08858','#4A3828','#4A3A28','#4A3828',{emotion:em});
    // Scar through right eyebrow
    $pr(22,10,4,3,'#9A7050');
    $pr(23,11,1,3,'#9A7050');
    // Leather + steel armor
    $pr(2,29,32,15,'#4A3A28');
    $pr(6,29,8,15,'#7A7A7A'); $pr(22,29,8,15,'#7A7A7A');
    $pr(14,29,8,15,'#4A3A28');
    // Tea cup
    if(em==='neutral'||em==='drinking'){
      $pr(28,26,6,4,'#E8E8E0'); $pr(28,29,6,2,'#4A2C14');
      $pr(33,27,2,3,'#888880');
    }
  },

  orenna(em) {
    this._face('#D4A878','#555540','#5A5A5A','#447744',{emotion:em,longHair:true});
    // Spectacles
    $pr(10,13,7,4,'#00000000');
    ENGINE.rect(_px+10*PP,_py+13*PP,7*PP,4*PP,'#888844',0);
    const c=ENGINE.ctx;
    c.save(); c.strokeStyle='#888844'; c.lineWidth=2;
    c.strokeRect(_px+11*PP,_py+13*PP,4*PP,3*PP);
    c.strokeRect(_px+21*PP,_py+13*PP,4*PP,3*PP);
    c.beginPath(); c.moveTo(_px+15*PP,_py+14.5*PP); c.lineTo(_px+21*PP,_py+14.5*PP); c.stroke();
    c.restore();
    // Gray robes
    $pr(4,29,28,15,'#5A5A5A');
    // Ink-stained fingers
    $pr(4,37,4,4,'#3A3A28'); $pr(28,37,4,4,'#3A3A28');
  },

  peytar(em) {
    const mapped=em==='traitor'?'sad':em;
    this._face('#C08858','#3A2818','#7A6A58','#4A3828',{emotion:mapped});
    // Patched traveling robes
    $pr(4,29,28,15,'#7A6A58');
    $pr(6,31,8,6,'#9A8A70'); $pr(22,35,7,5,'#6A5A48');
    // Holy symbol (cross)
    $pr(16,31,4,8,'#D4A574'); $pr(14,34,8,3,'#D4A574');
    // Tears if traitor
    if(em==='traitor'){
      $pr(13,17,1,4,'#AACCEE'); $pr(22,17,1,4,'#AACCEE');
    }
  },

  thess(em) {
    this._face('#D4B888','#CCCCCC','#9A9A9A','#888888',{emotion:'happy'});
    // Silver spectacles
    const c=ENGINE.ctx;
    c.save(); c.strokeStyle='#CCCCCC'; c.lineWidth=2;
    c.strokeRect(_px+11*PP,_py+13*PP,4*PP,3*PP);
    c.strokeRect(_px+21*PP,_py+13*PP,4*PP,3*PP);
    c.beginPath(); c.moveTo(_px+15*PP,_py+14.5*PP); c.lineTo(_px+21*PP,_py+14.5*PP); c.stroke();
    c.restore();
    // Gray robes
    $pr(4,29,28,15,'#9A9A9A');
    $pr(8,31,20,12,'#BBBBBB');
    // Revealed dreamtouched
    if(em==='revealed'){
      $pr(11,13,5,3,'#001800');
      $pr(21,13,5,3,'#001800');
      $pr(11,13,5,3,'#39FF14',0.9);
      $pr(21,13,5,3,'#39FF14',0.9);
    }
  },

  vess(em) {
    this._face('#C8A878','#CCCCAA','#4A3828','#6A5A48',{emotion:em});
    // Wrinkle lines
    const c=ENGINE.ctx;
    c.save(); c.strokeStyle='#A07848'; c.lineWidth=1;
    for(let i=0;i<5;i++){
      c.beginPath(); c.moveTo(_px+11*PP,_py+(14+i*2)*PP); c.lineTo(_px+14*PP,_py+(15+i*2)*PP); c.stroke();
    }
    c.restore();
    // Worn clothes
    $pr(4,29,28,15,'#4A3828');
    // Tin cup
    $pr(28,26,6,6,'#888888'); $pr(27,25,8,2,'#AAAAAA');
  },

  vorrel(em) {
    this._face('#C08858','#888870','#CCCCCC','#3A4A5A',{emotion:em});
    // Gray beard
    $pr(10,21,16,7,'#888870');
    $pr(12,24,12,4,'#AAAAAA');
    // Plate armor
    $pr(2,29,32,15,'#BBBBBB');
    $pr(6,29,24,15,'#AAAAAA');
    // Armor seams
    $pr(12,29,1,15,'#888888'); $pr(23,29,1,15,'#888888');
    // Cloak edges
    $pr(0,30,4,14,'#3A2818'); $pr(32,30,4,14,'#3A2818');
  },

  loyar(em) {
    this._face('#C08858','#AA4028','#4A3A28','#4A3828',{emotion:em});
    // Jaw scar
    const c=ENGINE.ctx;
    c.save(); c.strokeStyle='#9A6840'; c.lineWidth=2;
    c.beginPath(); c.moveTo(_px+13*PP,_py+23*PP); c.lineTo(_px+22*PP,_py+25*PP); c.stroke();
    c.restore();
    // Short copper hair
    $pr(8,3,20,5,'#AA4028');
    $pr(9,7,18,2,'#AA4028');
    // Guard uniform
    $pr(4,29,28,15,'#4A3A28');
    $pr(8,29,7,15,'#7A7A7A'); $pr(21,29,7,15,'#7A7A7A');
  },

  _unknown(sx, sy, name) {
    ENGINE.rect(sx, sy, 180, 220, '#1A1028');
    ENGINE.stroke(sx, sy, 180, 220, '#8B5E3C', 2);
    ENGINE.text('?', sx+90, sy+110, {size:40,col:'#8B5E3C',align:'center',base:'middle'});
    ENGINE.text(name||'???', sx+90, sy+165, {size:7,col:'#555544',align:'center'});
  }
};

// ─── SCENE BACKGROUNDS ────────────────────────────────────────────────────────
// All drawing uses $r/$h/$v/$p helpers (240×150 logical grid, y offset 40)
const SCENES_ART = {

  drawBackground(sceneId) {
    const fn = this[sceneId];
    if (fn) fn.call(this);
    else this.fallback(sceneId);
  },

  fallback(id) {
    $r(0,0,240,150,'#080A14');
    for(let y=0;y<8;y++) $h(y*18,0,240,y%2?'#0A0C16':'#08090E');
    ENGINE.text(id||'???', 480, 340, {size:12,col:'#222233',align:'center',base:'middle'});
  },

  // ── TITLE ─────────────────────────────────────────────────────────────────
  title() {
    const f = ENGINE.frame;
    // Sky bands — night
    $r(0,0,240,40,'#050810');
    $r(0,40,240,30,'#060A12');
    $r(0,70,240,20,'#080C14');
    $r(0,90,240,15,'#0A0E16');
    // Stars
    $stars(0);
    // Aurora bands
    const ay=95;
    for(let x=0;x<240;x++){
      const h=Math.round(8+Math.sin(x*0.08+f*0.03)*4+Math.cos(x*0.04+f*0.02)*3);
      const a=0.18+0.08*Math.sin(x*0.1+f*0.02);
      $r(x,ay-h,1,h,'#39FF14',a);
    }
    // Ground/horizon bands
    $r(0,105,240,5,'#0A1010');
    $r(0,110,240,6,'#080C08');
    $r(0,116,240,34,'#050808');
    // Ruin silhouettes
    const ruins=[[0,28,20,30],[5,20,8,38],[22,25,14,33],[45,18,12,40],[68,22,10,36],
                 [100,20,6,38],[115,26,16,32],[140,18,10,40],[165,22,14,36],
                 [195,20,8,38],[210,25,18,33],[228,22,12,36]];
    ruins.forEach(([x,y,w,h])=>$r(x,y,w,h,'#030508'));
    // Tower spires
    [[8,12,3],[26,10,2],[50,8,2],[118,9,3],[145,6,2],[200,10,3]].forEach(([x,y,w])=>$r(x,y,w,12,'#030508'));
    // Ground bar
    $r(0,116,240,34,'#040608');

    // Title text with glow
    const glow = 16+6*Math.sin(f*0.04);
    const c=ENGINE.ctx;
    c.save();
    c.shadowColor='#D4A574'; c.shadowBlur=glow;
    ENGINE.text('THE FALL', 480, 170, {size:44,col:'#D4A574',align:'center',base:'middle',shadow:'#D4A574',shadowBlur:glow});
    ENGINE.text('OF THE MAGI', 480, 228, {size:30,col:'#C89A60',align:'center',base:'middle',shadow:'#C89A60',shadowBlur:glow});
    c.restore();
    ENGINE.text("a tale of the world's second ending", 480, 278, {size:8,col:'#5A4A30',align:'center',base:'middle'});
    // Crow
    const cx=((f*2)%1100)-100;
    ENGINE.rect(cx,350,8,3,'#040608');
    ENGINE.rect(cx-8,347,8,4,'#040608');
    ENGINE.rect(cx+8,347,8,4,'#040608');
  },

  // ── CHARACTER SELECT ──────────────────────────────────────────────────────
  char_select() {
    // Dark purple bg
    $r(0,0,240,150,'#0C0A18');
    // Column texture
    for(let x=0;x<240;x+=30){
      $r(x,0,1,150,'#100E1C',0.5);
    }
    // Top/bottom border bands
    $r(0,0,240,3,'#8B5E3C');
    $r(0,1,240,1,'#D4A574',0.4);
    $r(0,147,240,3,'#8B5E3C');
    $r(0,148,240,1,'#D4A574',0.3);
    // Header text
    ENGINE.text('WHO ARE YOU?', 480, 70, {size:16,col:'#D4A574',align:'center',base:'middle'});
    ENGINE.rect(80, 82, 800, 2, '#8B5E3C');
    ENGINE.rect(80, 84, 800, 1, '#D4A574', 0.3);
  },

  // ── HOLLOWDRIFT ROAD (ARRIVAL) ────────────────────────────────────────────
  road_arrival() {
    const f = ENGINE.frame;
    // Overcast sky - stepped bands
    $r(0,0,240,20,'#7A8898');
    $r(0,20,240,10,'#6A7888');
    $r(0,30,240,15,'#5A6878');
    $r(0,45,240,10,'#4A5868');
    // Cloud blocks
    $r(12,5,46,8,'#8A9AAA'); $r(20,3,30,6,'#9AAABB');
    $r(80,7,50,9,'#8A9AAA'); $r(88,4,34,7,'#9AAABB');
    $r(162,5,56,10,'#8A9AAA'); $r(170,3,40,7,'#9AAABB');
    // Distant hills - stepped
    $r(0,55,240,8,'#5A6858');
    $r(0,58,240,6,'#4A5848');
    $r(0,61,240,4,'#3A4838');
    // Village silhouette
    $r(104,52,6,12,'#3A4438'); $r(111,54,5,10,'#363E34');
    $r(117,50,6,14,'#3A4438'); $r(124,53,4,11,'#363E34');
    // Smoke from village
    for(let i=0;i<3;i++){
      const sw=Math.sin(f*0.04+i)*1;
      $r(Math.round(106+i*7+sw),46,1,6,'#7A8898',0.4);
      $r(Math.round(106+i*7+sw*1.2),40,2,7,'#7A8898',0.25);
    }
    // Ash fields - mid
    $r(0,63,240,12,'#6A6858');
    $r(0,68,240,6,'#5A5848');
    // Dead trees
    this._pixTree(20,55,6,30);
    this._pixTree(40,52,5,33);
    this._pixTree(198,54,6,30);
    this._pixTree(218,51,5,33);
    // Road - perspective trapezoid (approximated with shrinking rows)
    for(let row=0;row<38;row++){
      const t=row/38;
      const lx=Math.round(80+t*0);
      const rx=Math.round(160-t*0);
      const scaleL=80-Math.round(t*20);
      const scaleR=160+Math.round(t*20);
      $h(75+row,80-Math.round(t*20),160+Math.round(t*20),'#7A6858');
    }
    // Road color bands
    $r(60,75,120,8,'#7A6A58'); $r(60,83,120,10,'#786858');
    $r(60,93,120,12,'#766655'); $r(60,105,120,14,'#746455');
    $r(60,119,120,6,'#726253');
    // Road edges
    $v(60,75,125,'#5A4A38'); $v(180,75,125,'#5A4A38');
    // Wheel ruts
    $v(78,75,125,'#6A5A48'); $v(162,75,125,'#6A5A48');
    // Signpost
    $v(155,60,88,'#4A3A28'); $r(138,60,18,7,'#7A6A50');
    ENGINE.text('HOLLOWDRIFT', (138+9)*PS, 40+(61)*PS, {size:4,col:'#3A2818',align:'center',base:'top'});
    // Ground
    $r(0,125,240,25,'#4A4838');
    $r(0,135,240,15,'#3A3828');
    // Foreground dead trees
    this._pixTree(60,95,5,24);
    this._pixTree(172,94,5,25);
  },

  // Pixel art dead tree helper
  _pixTree(x, y, w, h) {
    const bx=x-Math.floor(w/2);
    // Trunk
    $r(bx,y,Math.max(1,Math.floor(w/2)),h,'#2A2018');
    // Branches (blocky)
    $r(bx+Math.floor(w/2),y,5,1,'#2A2018');
    $r(bx+Math.floor(w/2),y+2,4,1,'#2A2018');
    $r(bx-2,y+4,4,1,'#2A2018');
    $r(bx+Math.floor(w/2)-1,y+4,3,1,'#2A2018');
    $r(bx-3,y+8,3,1,'#2A2018');
    $r(bx+Math.floor(w/2),y+7,4,1,'#2A2018');
  },

  // ── HOLLOWDRIFT VILLAGE ROAD ──────────────────────────────────────────────
  road_village() {
    // Overcast sky
    $r(0,0,240,25,'#6A7888');
    $r(0,25,240,10,'#5A6878');
    $r(0,35,240,10,'#4A5868');
    // Cloud layer
    $r(0,8,240,15,'#7A8898',0.5);
    // Distant building row
    $r(0,45,240,5,'#3A4240');
    $r(12,40,20,10,'#3A4240'); $r(50,38,15,12,'#3A4240');
    $r(162,39,22,11,'#3A4240'); $r(204,40,18,10,'#3A4240');
    // INN - left building
    this._pixBuilding(7,50,46,65,'#5A5040','#484030','INN');
    // Guard post - right building
    this._pixBuilding(188,52,46,63,'#484838','#383828','GUARD');
    // Background buildings mid
    this._pixBuilding(110,55,30,55,'#524840','#403830','');
    this._pixBuilding(148,54,32,56,'#4A4A40','#3A3A30','');
    // Ground mud - stepped
    $r(0,100,240,12,'#5A5040');
    $r(0,112,240,10,'#504A3A');
    $r(0,122,240,10,'#4A4438');
    $r(0,132,240,18,'#3A3828');
    // Cobblestone road
    for(let cx=20;cx<220;cx+=5){
      $r(cx,100,4,4,cx%10===0?'#484038':'#504840');
      $r(cx+2,104,4,4,cx%10===5?'#484038':'#4A4238');
    }
    // Well
    $r(113,88,12,8,'#7A6A58'); $r(111,86,16,3,'#8A7A68');
    $r(117,80,2,8,'#4A3A28'); $r(115,79,6,2,'#5A4A38');
    // Mud puddle
    $r(100,112,20,5,'#484038',0.8);
    // NPC silhouettes
    this._npcSil(87,100,'#4A3A30');
    this._npcSil(150,102,'#504838');
    this._npcSil(35,98,'#484848');
    // Child sitting
    $r(70,108,3,2,'#3A3228');
  },

  _pixBuilding(x, y, w, h, wallCol, roofCol, label) {
    // Roof (triangle approx)
    const rx=Math.floor(w/2);
    for(let i=0;i<=rx;i+=2){
      const rw=w-i*2;
      $r(x+i,y+Math.floor(i/2),rw,2,roofCol);
    }
    // Walls
    const wallY=y+rx/2+2;
    $r(x,wallY,w,h-rx/2-2,wallCol);
    // Window
    $r(x+rx-4,wallY+8,8,8,'#1A1808');
    $r(x+rx-3,wallY+9,3,6,'#AA8820',0.4);
    $r(x+rx,wallY+9,3,6,'#AA8820',0.4);
    $r(x+rx,wallY+8,1,8,'#0A0804');
    $r(x+rx-4,wallY+12,8,1,'#0A0804');
    // Door
    $r(x+rx-3,wallY+h-rx/2-14,6,13,'#2A1A0A');
    // Label
    if(label) ENGINE.text(label, (x+rx/2+x+w/2)/2*PS, 40+(wallY+4)*PS, {size:5,col:'#D4A574',align:'center',base:'top'});
    // Plank lines
    for(let gy=wallY+2;gy<y+h;gy+=4) $r(x,gy,w,1,'#000000',0.07);
  },

  _npcSil(x, y, col) {
    $r(x-2,y-7,4,7,col);
    $r(x-3,y,6,6,col);
    ENGINE.circle(x*PS,40+(y-9)*PS,6,col);
  },

  // ── DRIFT HOUSE INTERIOR ──────────────────────────────────────────────────
  drift_house_interior() {
    const f = ENGINE.frame;
    // Ceiling / upper walls - dark warm wood
    $r(0,0,240,50,'#1A0A00');
    $r(0,50,240,40,'#200C02');
    // Wood beam ceiling
    for(let bx=0;bx<240;bx+=30){ $r(bx,0,3,55,'#100800'); }
    // Floor
    $r(0,90,240,60,'#4A2C10');
    // Floor planks
    for(let px=0;px<240;px+=15){ $r(px,90,14,60,px%30===0?'#462A0E':'#4A2C10'); }
    for(let py=90;py<150;py+=5){ $r(0,py,240,1,'#2A1808',0.3); }
    // Stain
    $r(88,105,20,8,'#180402',0.8);
    // Bar counter - left
    $r(0,70,55,30,'#2A1608');
    $r(0,68,58,3,'#3A2010');
    // Bottles on shelf above bar
    const bcols=['#882A1A','#1A3A88','#1A5228','#886A1A','#501A38','#1A3458','#884A1A'];
    bcols.forEach((bc,i)=>{ $r(8+i*7,50,4,14,bc); $r(9+i*7,48,2,3,bc); $r(9+i*7,47,2,1,'#777777'); });
    // Fireplace - right wall
    $r(205,50,35,50,'#1A1008'); $r(207,52,31,43,'#0F0804');
    // Fire
    for(let fx=0;fx<8;fx++){
      const fh=Math.round(16+Math.sin(f*0.3+fx*0.7)*6);
      const fo=Math.round(Math.sin(f*0.2+fx*1.2)*2);
      $r(Math.round(210+fx*3+fo),Math.round(75-fh),2,fh,['#FF3300','#FF6600','#FFAA00'][fx%3]);
    }
    $r(207,84,31,8,'#0F0804');
    // Mantle
    $r(204,48,36,3,'#2A1808');
    // Candle on mantle
    $r(217,44,2,5,'#EEEACC'); $r(217,42,2,3,'#FFAA20');
    // Tables
    [[70,88],[120,88],[160,84]].forEach(([tx,ty])=>{
      $r(tx,ty+4,30,15,'#2A1608'); $r(tx-1,ty+3,32,2,'#3A2010');
      // Candle on table
      $r(tx+14,ty+1,2,6,'#EEEACC'); $r(tx+14,ty-1,2,2,'#FFAA20');
    });
    // Candle glows - radial (radial gradient in screen coords)
    [[85,132],[135,132],[175,128],[219,126]].forEach(([gsx,gsy])=>{
      const gc=ENGINE.ctx.createRadialGradient(gsx*1,40+gsy,0,gsx,40+gsy,60);
      const gf=0.12+0.04*Math.sin(f*0.2+gsx*0.01);
      gc.addColorStop(0,`rgba(255,160,40,${gf})`);
      gc.addColorStop(1,'rgba(0,0,0,0)');
      ENGINE.ctx.fillStyle=gc;
      ENGINE.ctx.fillRect(gsx-60,40+gsy-60,120,120);
    });
    // NPC silhouettes
    this._npcSil(75,98,'#382818'); this._npcSil(130,98,'#283818');
    // Hastha behind bar
    this._npcSil(28,72,'#3A2A18');
    // Stairs right
    for(let si=0;si<5;si++) $r(183+si*3,70+si*4,15,3,'#2A1608');
    $r(180,70,3,50,'#1A0E06');
    // Rope across stairs
    const rc=ENGINE.ctx;
    rc.save(); rc.strokeStyle='#6A3A18'; rc.lineWidth=2;
    rc.beginPath(); rc.moveTo(180*PS,40+72*PS); rc.lineTo(200*PS,40+72*PS); rc.stroke();
    rc.restore();
  },

  // ── ROOT CELLAR ───────────────────────────────────────────────────────────
  root_cellar() {
    // Stone wall pattern
    for(let row=0;row<10;row++){
      for(let col=0;col<12;col++){
        const bc=(row+col)%2===0?'#1E1610':'#181208';
        $r(col*20,row*15,20,15,bc);
        $r(col*20,row*15,20,1,'#100A08');
        $r(col*20,row*15,1,15,'#100A08');
      }
    }
    // Floor
    $r(0,120,240,30,'#1A1208');
    for(let fx=0;fx<240;fx+=20) $r(fx,120,19,30,'#161008',0.5);
    // Lantern glow
    const lx=120, ly=20;
    $r(lx-3,ly-5,6,10,'#AA8820'); $r(lx-2,ly-3,4,6,'#FFAA20');
    const lg=ENGINE.ctx.createRadialGradient(lx*PS,40+ly*PS,0,lx*PS,40+ly*PS,180);
    lg.addColorStop(0,'rgba(255,160,40,0.20)');
    lg.addColorStop(1,'rgba(0,0,0,0)');
    ENGINE.ctx.fillStyle=lg; ENGINE.ctx.fillRect(0,40,960,600);
    // Barrels
    [15,38,202,218].forEach(bx=>{
      $r(bx,95,15,20,'#4A2A10'); $r(bx-1,93,17,3,'#3A2010'); $r(bx-1,113,17,3,'#3A2010');
    });
    // Bodies under linen
    [70,115].forEach(bx=>{
      $r(bx,95,40,12,'#E0D4B8'); $r(bx,95,40,1,'#C0B4A0');
      $r(bx+8,93,10,3,'#E0D4B8'); // head lump
    });
    // Steps
    $r(100,115,40,5,'#2A1E10'); $r(105,110,30,5,'#2A1E10'); $r(110,105,20,5,'#2A1E10');
    // Light from above stairs
    $r(110,45,20,60,'#1A1008',0.5);
    const dg=ENGINE.ctx.createRadialGradient(120*PS,40+40*PS,0,120*PS,40+40*PS,80);
    dg.addColorStop(0,'rgba(180,120,50,0.25)');
    dg.addColorStop(1,'rgba(0,0,0,0)');
    ENGINE.ctx.fillStyle=dg; ENGINE.ctx.fillRect(60*PS,40,120*PS,120);
  },

  // ── WHISPERING WOOD ───────────────────────────────────────────────────────
  whispering_wood() {
    const f = ENGINE.frame;
    // Dark canopy sky - stepped
    $r(0,0,240,30,'#0A1208');
    $r(0,30,240,25,'#0C1610');
    $r(0,55,240,20,'#0A1410');
    $r(0,75,240,75,'#07100A');
    // Distant light between trees (center gap)
    $r(95,5,50,30,'#182818',0.6);
    $r(100,10,40,20,'#1A2A18',0.4);
    // Tree trunks
    [[15,0],[35,0],[55,2],[10,5],[75,1],[170,0],[190,2],[210,1],[225,0],[155,3]].forEach(([tx,lean])=>{
      $r(tx+lean,0,5,135,'#140C06');
      // Canopy blob
      $r(tx+lean-6,0,18,20,'#0B1C0E');
      $r(tx+lean-4,0,14,12,'#0D2010');
    });
    // Path
    $r(100,50,40,90,'#16120A');
    $r(102,60,36,80,'#18140C');
    // Ground/moss
    $r(0,125,240,25,'#0C0E08');
    for(let lx=0;lx<240;lx+=8) $r(lx,126,7,1,'#0A0E08',0.6);
    // Man-shaped impression in moss
    $r(110,95,20,12,'#0E1008');
    $r(113,92,12,4,'#0E1008');
    // Leather strap
    $r(130,103,8,2,'#4A2A10'); $r(130,103,2,2,'#2A1008');
    // Sigil on tree
    const c=ENGINE.ctx;
    c.save(); c.strokeStyle='#2A4A28'; c.lineWidth=2;
    c.beginPath(); c.arc(40*PS,40+52*PS,12,0,Math.PI*2); c.stroke();
    c.restore();
    // Eerie ambient flicker
    if(f%40<2) $r(0,0,240,135,'#1A2818',0.04);
    // Sound wave bands
    for(let i=0;i<3;i++){
      const a=0.04+0.02*Math.sin(f*0.08+i);
      $r(0,40+i*10,240,1,'#2A5020',a);
    }
  },

  // ── GUARD STATION ─────────────────────────────────────────────────────────
  guard_station() {
    // Floor / wall base
    $r(0,0,240,72,'#2A2818');
    $r(0,72,240,78,'#201E10');
    // Stone wall texture
    for(let row=0;row<5;row++) for(let col=0;col<8;col++){
      $r(col*30,row*14,30,14,(row+col)%2===0?'#282816':'#221E12');
      $r(col*30,row*14,30,1,'#181610');
    }
    // Window
    $r(25,20,45,30,'#5A7080');
    $r(26,21,43,28,'#3A5060');
    $r(47,20,1,30,'#1A2020');
    $r(25,35,45,1,'#1A2020');
    // Desk
    $r(70,76,100,30,'#381C08');
    $r(69,74,102,3,'#4A2C10');
    // Papers on desk
    [[74,72],[87,70],[105,73],[125,71],[150,74]].forEach(([px,py])=>{
      $r(px,py,10,8,'#E0D4B0');
      $r(px+1,py+2,8,1,'#3A2808',0.4);
      $r(px+1,py+4,6,1,'#3A2808',0.4);
    });
    // Sword rack on right wall
    $r(175,25,35,55,'#1A1808');
    $r(176,27,2,48,'#222018');
    [180,185,190,195].forEach((sx,i)=>{
      $r(sx,30,2,42,'#787878');
      $r(sx-1,33,4,3,'#4A2C08');
      if(i===0) $r(sx,29,2,1,'#AA3310');
    });
    // Sigil plaque on wall
    $r(10,25,20,25,'#221E10');
    $r(13,28,14,18,'#181408');
    // Tree sigil (blocky)
    $v(20,30,44,'#5A5A48'); $h(38,16,24,'#5A5A48'); $h(34,14,18,'#5A5A48'); $h(30,17,24,'#5A5A48');
    // Floor detail
    $r(0,105,240,45,'#181408');
    for(let fx=0;fx<240;fx+=20) $r(fx,105,19,45,'#161208',0.4);
    // Captain Loyar NPC
    this._npcSil(123,76,'#3A3028');
  },

  // ── DRIFT HOUSE EXTERIOR ──────────────────────────────────────────────────
  drift_house_exterior() {
    // Winter sky - banded
    $r(0,0,240,30,'#6A7888');
    $r(0,30,240,15,'#5A6878');
    $r(0,45,240,15,'#4A5868');
    // Cloud
    $r(0,5,240,16,'#7A8898',0.4);
    // Main building
    this._pixBuilding(25,45,125,85,'#5A4838','#3A2818','');
    // Inn sign
    $r(72,43,32,10,'#7A6050');
    ENGINE.rect(72*PS,40+43*PS,32*PS,10*PS,'#4A2A10',0);
    const c2=ENGINE.ctx; c2.strokeStyle='#4A2A10'; c2.lineWidth=1; c2.strokeRect(72*PS,40+43*PS,32*PS,10*PS);
    ENGINE.text('DRIFT HOUSE',88*PS,40+46*PS,{size:5,col:'#D4A574',align:'center',base:'top'});
    // Warm window glow
    $r(45,65,20,17,'#AA8820',0.7); $r(105,65,20,17,'#AA8820',0.5);
    // Door
    $r(73,100,15,30,'#2A1808'); $r(72,98,17,2,'#3A2010');
    // Stable right
    $r(162,70,55,60,'#4A3820'); $r(161,68,57,3,'#3A2818');
    $r(180,98,20,32,'#2A1808');
    // Mud tracks
    $r(50,113,100,8,'#3A2A18',0.5);
    // Ground
    $r(0,118,240,32,'#3A3020');
    $r(0,128,240,22,'#2A2018');
    // Snow patches
    $r(10,118,15,3,'#D8D8E0',0.6); $r(210,120,18,4,'#D8D8E0',0.5);
  },

  // ── MIRA'S ROOM ───────────────────────────────────────────────────────────
  mira_room() {
    // Dark attic - ceiling slopes
    $r(0,0,240,75,'#120A04');
    $r(0,75,240,75,'#0A0602');
    // Slanted ceiling (stepped)
    for(let i=0;i<20;i++) $r(0,i,240-i*12,2,'#181008');
    // Floor boards
    $r(0,90,240,60,'#3A2010');
    for(let px=0;px<240;px+=15) $r(px,90,14,60,'#382010',0.5);
    for(let py=90;py<150;py+=5) $r(0,py,240,1,'#201008',0.3);
    // Straw mattress
    $r(25,95,65,20,'#5A4820');
    $r(26,96,63,18,'#7A6030');
    for(let sx=28;sx<88;sx+=4) $r(sx,96,1,18,'#6A5028',0.4);
    // Candle on floor
    $r(98,106,2,8,'#EEEACC'); $r(98,104,2,2,'#FFAA20');
    const cg=ENGINE.ctx.createRadialGradient(99*PS,40+106*PS,0,99*PS,40+106*PS,100);
    cg.addColorStop(0,'rgba(200,140,40,0.14)');
    cg.addColorStop(1,'rgba(0,0,0,0)');
    ENGINE.ctx.fillStyle=cg; ENGINE.ctx.fillRect(50*PS,40+60*PS,100*PS,100*PS);
    // Mira against far wall
    this._npcSil(188,97,'#3A2818');
    // Coat draped
    $r(178,93,22,22,'#483820',0.7);
    // Eaves beam
    $r(0,0,240,8,'#120A04');
    // Small window
    $r(205,25,20,15,'#3A5060');
    $r(206,26,18,13,'#1A3040');
    $r(215,25,1,15,'#0A0A10'); $r(205,32,20,1,'#0A0A10');
    // Gray light shaft from window
    const wg=ENGINE.ctx.createLinearGradient(215*PS,40+25*PS,215*PS,40+100*PS);
    wg.addColorStop(0,'rgba(140,170,190,0.13)'); wg.addColorStop(1,'rgba(0,0,0,0)');
    ENGINE.ctx.fillStyle=wg; ENGINE.ctx.fillRect(195*PS,40+25*PS,30*PS,90*PS);
  },

  // ── STONE BRIDGE (NIGHT) ──────────────────────────────────────────────────
  bridge_road() {
    // Night sky bands
    $r(0,0,240,40,'#121218');
    $r(0,40,240,25,'#0E0E14');
    $r(0,65,240,15,'#0A0A10');
    // Moon
    const mc=ENGINE.ctx;
    mc.save(); mc.fillStyle='#E8E8D8';
    mc.beginPath(); mc.arc(200*PS,40+25*PS,22,0,Math.PI*2); mc.fill();
    mc.restore();
    // Cloud over moon
    $r(205,18,40,20,'#161618');
    // Ground/banks
    $r(0,90,240,60,'#2A2418');
    $r(0,105,240,45,'#1E1A10');
    // Creek
    $r(0,108,240,15,'#0A1820');
    $r(0,110,240,3,'#0E1C28',0.7);
    // Stone bridge
    $r(75,95,90,13,'#4A4438');
    $r(73,93,94,3,'#5A5448');
    // Bridge stonework
    for(let bx=75;bx<165;bx+=8){ $r(bx,95,7,11,'#484238'); $r(bx,95,7,1,'#3A3428'); }
    // Bridge rails/posts
    $v(75,88,97,'#3A3830'); $v(164,88,97,'#3A3830');
    $r(75,88,90,2,'#3A3830');
    // Road approaching
    $r(87,65,66,30,'#282018');
    $v(87,65,96,'#1E1810'); $v(151,65,96,'#1E1810');
    // Stone marker
    $r(150,80,8,20,'#4A4848'); $r(149,78,10,3,'#5A5858');
    // Pale hound silhouette on bridge
    $r(115,92,12,5,'#AAAAB8'); $r(118,90,4,3,'#AAAAB8'); $r(115,96,3,3,'#AAAAB8'); $r(123,96,3,3,'#AAAAB8');
  },

  // ── CINDER FORD ───────────────────────────────────────────────────────────
  cinder_ford() {
    const f = ENGINE.frame;
    // Dark overcast sky
    $r(0,0,240,35,'#20202E');
    $r(0,35,240,15,'#18181E');
    $r(0,50,240,20,'#141420');
    // Mist bands
    for(let mx=0;mx<240;mx+=15){
      const my=Math.round(55+Math.sin(f*0.02+mx*0.04)*4);
      $r(mx,my,14,18,'#8A9898',0.07);
    }
    // River — dark water
    $r(0,70,240,40,'#080E16');
    $r(0,72,240,4,'#0A1220');
    $r(0,100,240,4,'#0A1220');
    // Steam rising from river
    for(let sx=0;sx<240;sx+=10){
      const sh=Math.round(6+Math.sin(f*0.05+sx*0.04)*4);
      const soff=Math.round(Math.sin(f*0.03+sx*0.02)*2);
      $r(Math.round(sx+soff),70-sh,2,sh,'#8A9898',0.11);
    }
    // Stepping stones through ford
    for(let rx=25;rx<215;rx+=10){ $r(rx,77,9,30,'#2E2E20',0.8); $r(rx,77,9,1,'#1E1E14'); }
    // Eel shapes under water
    [[50,80],[112,83],[175,79]].forEach(([ex,ey],i)=>{
      const eoy=Math.round(Math.sin(f*0.04+i)*2);
      $r(ex,ey+eoy,20,5,'#06101A');
      $r(ex+14,ey+eoy+1,8,3,'#06101A');
    });
    // Far bank — Iron Reach silhouette
    $r(0,105,240,45,'#141418');
    $r(0,108,240,5,'#181820');
    [20,50,95,140,180,218].forEach(bx=>{
      $r(bx,95,15,15,'#141418'); $r(bx+2,90,10,6,'#141418');
    });
    // Guards on far bank
    this._npcSil(190,104,'#2A2836'); this._npcSil(200,104,'#2A2836');
  },

  // ── EMBER CAMP ────────────────────────────────────────────────────────────
  ember_camp() {
    const f = ENGINE.frame;
    // Rocky hollow - dark night
    $r(0,0,240,150,'#080404');
    // Rocky walls left/right
    $r(0,0,30,150,'#120A06'); $r(210,0,30,150,'#120A06');
    // Rock texture
    [[5,25],[5,55],[10,85],[215,20],[220,65]].forEach(([rx,ry])=>$r(rx,ry,20,15,'#181208',0.7));
    // Ground
    $r(0,112,240,38,'#1A0A04');
    $r(0,120,240,30,'#150804');
    // Campfire center
    const fX=120, fY=90;
    // Logs
    $r(fX-12,fY+2,25,3,'#2A1004'); $r(fX-10,fY+3,20,2,'#1A0802');
    // Flames
    for(let fi=0;fi<8;fi++){
      const fh=Math.round(10+Math.sin(f*0.3+fi*0.7)*5);
      const fo=Math.round(Math.sin(f*0.2+fi*1.2)*2);
      const fc=['#FF2200','#FF6600','#FFCC00'][fi%3];
      $r(Math.round(fX-10+fi*3+fo),fY-fh,2,fh,fc);
    }
    // Fire glow
    const cg=ENGINE.ctx.createRadialGradient(fX*PS,40+fY*PS,0,fX*PS,40+fY*PS,160);
    cg.addColorStop(0,'rgba(255,100,20,0.22)');
    cg.addColorStop(1,'rgba(0,0,0,0)');
    ENGINE.ctx.fillStyle=cg; ENGINE.ctx.fillRect(0,40,960,600);
    // Tents
    [[35,80],[70,75],[162,76],[195,80]].forEach(([tx,ty])=>{
      const tc=ENGINE.ctx;
      tc.fillStyle='#382010';
      tc.beginPath(); tc.moveTo(tx*PS,40+(ty+20)*PS); tc.lineTo((tx+15)*PS,40+ty*PS); tc.lineTo((tx+30)*PS,40+(ty+20)*PS); tc.fill();
      tc.strokeStyle='#281808'; tc.lineWidth=1; tc.stroke();
    });
    // Rebel NPCs around fire
    [[50,90],[87,87],[150,88],[175,86],[100,95],[140,94]].forEach(([nx,ny])=>this._npcSil(nx,ny,'#2E2418'));
    // Yssen at fire
    this._npcSil(fX-15,fY-8,'#483018');
  },

  // ── FOREST AMBUSH ─────────────────────────────────────────────────────────
  forest_ambush() {
    const f = ENGINE.frame;
    // Night forest
    $r(0,0,240,100,'#08100A');
    $r(0,100,240,50,'#060E08');
    // Moon
    const mc=ENGINE.ctx;
    mc.save(); mc.fillStyle='#E8E8D4';
    mc.beginPath(); mc.arc(175*PS,40+20*PS,18,0,Math.PI*2); mc.fill();
    mc.restore();
    // Dense trees
    [10,30,50,185,205,225].forEach(tx=>{
      $r(tx,0,6,140,'#100A06');
      $r(tx-5,0,16,18,'#0A1208');
      $r(tx-2,0,11,10,'#0C1A0A');
    });
    // Fallen log blocking path
    $r(62,98,110,8,'#2A1808'); $r(63,96,108,3,'#1E1208');
    // Road
    $r(82,68,76,38,'#1E1810');
    // Shadow figures
    $r(67,90,5,10,'#080810'); $r(160,88,5,12,'#080810'); $r(120,87,5,10,'#080810');
    // Eyes glinting
    $p(68,93,'#BBBBCC'); $p(161,91,'#BBBBCC'); $p(121,90,'#BBBBCC');
    // Moonlight shaft
    const mg=ENGINE.ctx.createLinearGradient(120*PS,40,120*PS,40+100*PS);
    mg.addColorStop(0,'rgba(220,220,200,0.07)');
    mg.addColorStop(1,'rgba(0,0,0,0)');
    ENGINE.ctx.fillStyle=mg; ENGINE.ctx.fillRect(100*PS,40,40*PS,100*PS);
    // Ground
    $r(0,130,240,20,'#0A0C06');
  },

  // ── VAEL AUREN CITY GATES ─────────────────────────────────────────────────
  city_gates() {
    // Dark night sky
    $r(0,0,240,50,'#121218');
    $r(0,50,240,50,'#0A0A10');
    // Massive obsidian wall
    $r(0,50,240,100,'#0A0A10');
    $r(0,50,240,3,'#141420');
    // Fused glass texture
    for(let gx=0;gx<240;gx+=20){ $r(gx,50,19,100,'#0A0A10'); $r(gx,50,19,1,'#141428',0.4); }
    // Towers
    $r(0,25,45,125,'#101018'); $r(195,25,45,125,'#101018');
    // Tower stonework
    for(let row=0;row<8;row++){ $r(0,25+row*12,45,11,'#0E0E16'); $r(195,25+row*12,45,11,'#0E0E16'); }
    // Tower battlements
    for(let i=0;i<5;i++){ $r(i*9,21,7,6,'#101018'); $r(195+i*9,21,7,6,'#101018'); }
    // Tower green windows
    [[12,38],[24,38],[12,52],[24,52]].forEach(([wx,wy])=>{ $r(wx,wy,6,9,'#002A00'); $r(wx+1,wy+1,4,7,'#39FF14',0.28); });
    [[202,38],[214,38],[202,52],[214,52]].forEach(([wx,wy])=>{ $r(wx,wy,6,9,'#002A00'); $r(wx+1,wy+1,4,7,'#39FF14',0.28); });
    // Gate arch
    $r(75,50,90,60,'#080810');
    $r(76,51,88,58,'#0A0A14');
    // Portcullis bars
    for(let gx=77;gx<163;gx+=6) $r(gx,50,1,59,'#1A1A28');
    for(let gy=52;gy<108;gy+=8) $r(77,gy,87,1,'#1A1A28');
    // Open bottom gap
    $r(79,90,83,20,'#080808');
    // Guard queue NPCs
    [87,100,113,126].forEach(qx=>this._npcSil(qx,105,'#181820'));
    // Guards flanking
    this._npcSil(72,100,'#282830'); this._npcSil(167,100,'#282830');
    // Distant spire towers
    [0,1,2,3,4].forEach(i=>{ $r(25+i*40,10,10,15+i*8,'#101018'); $r(28+i*40,5,4,6,'#101018'); });
    // Green atmosphere
    $r(0,0,240,50,'#001400',0.14);
    // Ground
    $r(0,110,240,40,'#080810');
  },

  // ── GLASS CITY STREETS ────────────────────────────────────────────────────
  glass_city() {
    // Sky between towers
    $r(0,0,240,70,'#080810');
    $r(0,70,240,25,'#0C0C18');
    // Obsidian towers flanking
    [[0,10,40,125],[45,20,30,115],[87,10,25,120],[167,15,28,120],[210,10,38,125]].forEach(([tx,ty,tw,th])=>{
      $r(tx,ty,tw,th,'#0E0E18');
      // Windows
      for(let wy=ty+5;wy<ty+th-5;wy+=10){
        for(let wx=tx+2;wx<tx+tw-2;wx+=8){
          const lit=(wx+wy)%22<4;
          $r(wx,wy,5,6,'#0A0A14');
          if(lit){ $r(wx+1,wy+1,3,4,'#39FF14',0.24); }
        }
      }
    });
    // Glass floor - reflective obsidian
    $r(0,105,240,45,'#080810');
    $r(0,105,240,1,'#141428',0.5);
    // Merchant stalls
    [[60,85],[140,82]].forEach(([sx,sy])=>{
      $r(sx,sy,40,20,'#1E1008'); $r(sx-1,sy-1,42,3,'#6A4020'); $r(sx,sy,40,1,'#8A5828');
    });
    // Notice board
    $r(115,70,10,35,'#2A1808'); $r(110,73,20,15,'#7A6A50');
    // NPC silhouettes
    [50,85,120,160,195].forEach(nx=>this._npcSil(nx,95,'#181818'));
    // Green street tinge
    $r(0,0,240,150,'#001200',0.06);
  },

  // ── CHAPTER HOUSE (LIBRARY) ───────────────────────────────────────────────
  chapter_house() {
    // Dark warm interior
    $r(0,0,240,150,'#0E0C06');
    // Bookshelf walls
    const bookCols=['#3A1408','#183008','#180828','#303008','#281010','#101028'];
    for(let bx=0;bx<240;bx+=7){
      const bc=bookCols[Math.floor(bx/7)%6];
      $r(bx,0,6,50,bc);
      $r(bx,50,6,1,'#080604');
    }
    // Desk
    $r(60,80,120,20,'#2A1408'); $r(59,78,122,3,'#3A1C0A');
    // Books stacked on desk
    [[65,76],[78,73],[100,77],[125,74],[140,72],[155,76]].forEach(([bx,by])=>{
      const bc=bookCols[Math.floor(bx/10)%3];
      $r(bx,by,12,4,bc);
    });
    // Reading lamp
    $r(120,72,2,12,'#383428'); $r(116,71,12,2,'#282820'); $r(118,73,6,2,'#FFCC40');
    const cg=ENGINE.ctx.createRadialGradient(121*PS,40+72*PS,0,121*PS,40+72*PS,100);
    cg.addColorStop(0,'rgba(255,200,80,0.18)'); cg.addColorStop(1,'rgba(0,0,0,0)');
    ENGINE.ctx.fillStyle=cg; ENGINE.ctx.fillRect(0,40,960,300);
    // Order symbol on back wall
    $r(110,18,20,20,'#1A1808');
    const c=ENGINE.ctx;
    c.save(); c.strokeStyle='#5A4A30'; c.lineWidth=2;
    c.beginPath(); c.arc(120*PS,40+28*PS,16,0,Math.PI*2); c.stroke();
    c.beginPath(); c.moveTo(120*PS,40+12*PS); c.lineTo(120*PS,40+44*PS); c.stroke();
    c.beginPath(); c.moveTo(104*PS,40+28*PS); c.lineTo(136*PS,40+28*PS); c.stroke();
    c.restore();
    // NPCs
    this._npcSil(100,79,'#3A3028'); this._npcSil(155,77,'#484038');
    // Floor
    $r(0,120,240,30,'#160E04');
    for(let fx=0;fx<240;fx+=20) $r(fx,120,19,30,'#180E04',0.4);
  },

  // ── EDDIK'S FLOPHOUSE ─────────────────────────────────────────────────────
  eddik_flophouse() {
    const f = ENGINE.frame;
    // Dingy interior
    $r(0,0,240,150,'#0A0808');
    // Concrete walls (pre-fall era)
    $r(0,0,240,2,'#141210'); $r(0,0,2,150,'#141210'); $r(238,0,2,150,'#141210');
    // Small room indent
    $r(25,30,190,95,'#0D0A0A');
    // Cot
    $r(135,83,70,20,'#2A1A10'); $r(134,81,72,3,'#3A2818');
    // Stained mattress
    $r(136,85,68,17,'#382010');
    // Eddik lying on cot (skin shape)
    $r(138,82,40,10,'#966038'); $r(136,91,45,5,'#483818');
    // Blood spreading
    $r(136,90,25,10,'#2E0606',0.8);
    // Candle on floor
    const flick=0.08+0.04*Math.sin(f*0.4);
    $r(123,107,2,6,'#EEEACC'); $r(123,105,2,3,'#FFAA20');
    const cg=ENGINE.ctx.createRadialGradient(124*PS,40+107*PS,0,124*PS,40+107*PS,70);
    cg.addColorStop(0,`rgba(200,140,40,${flick*2.5})`); cg.addColorStop(1,'rgba(0,0,0,0)');
    ENGINE.ctx.fillStyle=cg; ENGINE.ctx.fillRect(80*PS,40+80*PS,90*PS,90*PS);
    // Small pack on floor
    $r(45,105,20,15,'#382818'); $r(46,106,18,2,'#483828');
    // Broken window (pre-fall glass)
    $r(205,40,20,20,'#080810');
    $r(205,40,20,1,'#141420'); $r(205,40,1,20,'#141420');
    // Cracked lines
    const cc=ENGINE.ctx;
    cc.strokeStyle='#181828'; cc.lineWidth=1;
    cc.beginPath(); cc.moveTo(205*PS,40+50*PS); cc.lineTo(222*PS,40+58*PS); cc.stroke();
    cc.beginPath(); cc.moveTo(210*PS,40+40*PS); cc.lineTo(218*PS,40+60*PS); cc.stroke();
    // Door
    $r(25,40,20,50,'#160E08');
    // Floor
    $r(0,125,240,25,'#0C0808');
  },

  // ── IRON REACH THRONE ROOM ────────────────────────────────────────────────
  iron_reach() {
    // Black iron interior
    $r(0,0,240,150,'#070708');
    // Iron columns
    [25,70,170,215].forEach(cx=>{
      $r(cx,0,9,150,'#141418'); $r(cx-1,0,11,5,'#1E1E22'); $r(cx-1,145,11,5,'#1E1E22');
    });
    // Column rivets
    [25,70,170,215].forEach(cx=>[15,30,45,60,75,90].forEach(ry=>$r(cx+3,ry,3,2,'#202024')));
    // Oil lanterns
    [47,120,192].forEach(lx=>{
      $r(lx,20,3,8,'#282820'); $r(lx-2,27,7,5,'#888820'); $r(lx-1,28,5,4,'#FFAA20',0.8);
      const lg=ENGINE.ctx.createRadialGradient(lx*PS+PS,40+28*PS,0,lx*PS+PS,40+28*PS,50);
      lg.addColorStop(0,'rgba(255,180,40,0.15)'); lg.addColorStop(1,'rgba(0,0,0,0)');
      ENGINE.ctx.fillStyle=lg; ENGINE.ctx.fillRect((lx-10)*PS,40+15*PS,30*PS,50*PS);
    });
    // War table
    $r(70,82,100,35,'#141008'); $r(69,80,102,3,'#1E1810');
    // Map pins
    [[78,83],[88,88],[100,82],[115,86],[125,82],[135,90]].forEach(([px,py])=>{
      $r(px,py,1,3,'#AA1A1A');
    });
    // Sereth silhouette
    this._npcSil(123,80,'#282028');
    // Iron wall plates
    for(let wy=0;wy<150;wy+=10){ $r(0,wy,25,9,'#0E0E10'); $r(215,wy,25,9,'#0E0E10'); }
    // Black banner
    $r(105,0,30,40,'#080808'); $r(111,12,18,2,'#AA1A1A'); $r(112,17,16,1,'#AA1A1A');
    // Floor
    $r(0,135,240,15,'#0E0E10');
    for(let fx=0;fx<240;fx+=15) $r(fx,135,14,15,'#0C0C0E',0.4);
  },

  // ── SALT COAST RUINS ──────────────────────────────────────────────────────
  salt_coast() {
    // Sea visible through gap
    $r(0,0,240,75,'#081820');
    $r(0,60,240,20,'#0A1E28');
    $r(175,0,65,75,'#081820'); // sea on right
    // Wave lines
    for(let wx=175;wx<240;wx+=15){ $r(wx,50,12,2,'#0E2A38'); $r(wx+8,55,12,1,'#0E2A38',0.5); }
    // Collapsed citadel wall
    $r(0,55,175,95,'#1E1E18');
    // Leaning right wall (stepped)
    for(let i=0;i<8;i++) $r(125+i*6,55+i*3,15-i,95-i*3,'#1E1E18');
    // Stone texture
    for(let sx=0;sx<175;sx+=10) for(let sy=55;sy<150;sy+=10){
      if((sx+sy)%20===0) $r(sx,sy,9,9,'#181816',0.7);
    }
    // Library entrance
    $r(75,85,30,65,'#141008'); $r(74,83,32,3,'#1E1E18');
    // Salt crystal deposits
    [[20,105],[50,115],[90,100],[120,112]].forEach(([cx,cy])=>{
      $r(cx,cy,5,8,'#E8E8F0',0.5); $r(cx+1,cy-2,3,3,'#F0F0FF',0.6);
    });
    // Seagull
    $r(112,40,5,2,'#7A7A6A'); $r(110,38,2,2,'#7A7A6A'); $r(115,38,2,2,'#7A7A6A');
    // Collapsed floor gap
    $r(140,110,40,15,'#081820');
  },

  // ── SPYMASTER'S CRYPT ─────────────────────────────────────────────────────
  spymaster_crypt() {
    // Underground dark
    $r(0,0,240,150,'#060408');
    // Stone walls
    $r(0,0,240,20,'#141218'); $r(0,145,240,5,'#141218');
    // Sarcophagi
    [[25,75],[75,75],[137,75],[187,75]].forEach(([sx,sy])=>{
      $r(sx,sy,40,15,'#1E1818'); $r(sx-1,sy-1,42,3,'#282428');
      // Lid detail
      $r(sx+2,sy+2,36,9,'#1A1616');
      $r(sx+10,sy+4,20,4,'#161414');
    });
    // Three floor lanterns
    [[50,100],[120,95],[190,100]].forEach(([lx,ly])=>{
      $r(lx-2,ly,5,8,'#887818'); $r(lx-2,ly+1,5,6,'#FFAA18',0.9);
      const lg=ENGINE.ctx.createRadialGradient(lx*PS,40+ly*PS,0,lx*PS,40+ly*PS,80);
      lg.addColorStop(0,'rgba(200,150,40,0.18)'); lg.addColorStop(1,'rgba(0,0,0,0)');
      ENGINE.ctx.fillStyle=lg; ENGINE.ctx.fillRect((lx-20)*PS,40+(ly-20)*PS,55*PS,55*PS);
    });
    // Calvix silhouette
    this._npcSil(120,75,'#1E1618');
    // Arch entrance at bottom
    $r(100,135,40,15,'#060408'); $r(99,133,42,3,'#1E1818');
    // Stone floor
    for(let fx=0;fx<240;fx+=15) $r(fx,120,14,25,'#141218',0.4);
  },

  // ── SUMMIT HALL ───────────────────────────────────────────────────────────
  summit_hall() {
    const f = ENGINE.frame;
    // Smoke-glass dome — green-tinted
    $r(0,0,240,50,'#121A10');
    $r(0,50,240,25,'#0A1208');
    $r(0,75,240,75,'#080C08');
    // Round obsidian hall walls
    for(let bx=0;bx<240;bx+=12) for(let by=50;by<150;by+=8){
      $r(bx,by,11,7,'#0C0C10'); $r(bx,by,11,1,'#080808');
    }
    // Five thrones
    [[30,65],[68,60],[120,57],[172,60],[210,65]].forEach(([tx,ty],i)=>{
      $r(tx,ty,20,25,'#141224'); $r(tx-1,ty-5,22,6,'#1C1A30');
      $r(tx+2,ty-10,16,8,'#141224'); // throne back
      const tsil=['#282038','#201830','#28204A','#281828','#202038'][i];
      this._npcSil(tx+10,ty,'#000000'); // empty
      this._npcSil(tx+10,ty,tsil);
      // Veyra — white glow center throne
      if(i===2){ $r(tx,ty,20,25,'#FFFFFF',0.06); }
    });
    // Central table
    $r(65,98,110,20,'#141424'); $r(64,96,112,3,'#1C1C30');
    // Obsidian disk
    const dc=ENGINE.ctx;
    dc.save(); dc.fillStyle='#0A0A14';
    dc.beginPath(); dc.arc(120*PS,40+108*PS,14,0,Math.PI*2); dc.fill();
    dc.strokeStyle='#001800'; dc.lineWidth=2;
    dc.beginPath(); dc.arc(120*PS,40+108*PS,10,0,Math.PI*2); dc.stroke();
    dc.restore();
    // Pale hound guards lining walls
    [15,42,198,225].forEach(gx=>this._npcSil(gx,98,'#141418'));
    // Smoke filling room if late
    if(f>300) $r(0,50,240,100,'#2A2010',Math.min(0.45,(f-300)*0.002));
    // Green tinge on dome light
    $r(0,0,240,50,'#001400',0.18);
  },

  // ── BLACK COAST CAMP ──────────────────────────────────────────────────────
  black_coast() {
    const f = ENGINE.frame;
    // Night sky - clearest yet, green tinge
    $r(0,0,240,65,'#040608');
    $r(0,65,240,25,'#040806');
    $stars(1);
    // Strong green aurora
    for(let x=0;x<240;x++){
      const h=Math.round(18+Math.sin(x*0.06+f*0.02)*10+Math.cos(x*0.03+f*0.015)*7);
      $r(x,60-h,1,h,'#39FF14',0.22+0.09*Math.sin(x*0.08+f*0.01));
    }
    // Cathedral spire silhouettes distant
    [95,105,115,125,135].forEach((sx,i)=>{
      const sh=20+i*8;
      $r(sx,60-sh,3,sh,'#001600');
      $r(sx+1,57-sh,1,6,'#001600');
    });
    // Black sand - stepped
    $r(0,90,240,8,'#080606');
    $r(0,98,240,7,'#070504');
    $r(0,105,240,45,'#060404');
    // Wave lines
    for(let wx=0;wx<240;wx+=15){ $r(wx,95,12,1,'#0A1420',0.7); $r(wx+8,98,12,1,'#0A1420',0.5); }
    // Campfire
    const fX=120, fY=108;
    $r(fX-10,fY+2,20,3,'#1A0A04');
    for(let fi=0;fi<6;fi++){
      const fh=Math.round(8+Math.sin(f*0.3+fi)*4);
      const fo=Math.round(Math.sin(f*0.2+fi*1.1)*1);
      $r(Math.round(fX-6+fi*2+fo),fY-fh,2,fh,['#FF3300','#FF7700','#FFCC00'][fi%3]);
    }
    const fc2=ENGINE.ctx.createRadialGradient(fX*PS,40+fY*PS,0,fX*PS,40+fY*PS,130);
    fc2.addColorStop(0,'rgba(255,100,20,0.18)'); fc2.addColorStop(1,'rgba(0,0,0,0)');
    ENGINE.ctx.fillStyle=fc2; ENGINE.ctx.fillRect(0,40,960,600);
    // Tents
    [[50,100],[180,100]].forEach(([tx,ty])=>{
      const tc=ENGINE.ctx;
      tc.fillStyle='#201008';
      tc.beginPath(); tc.moveTo(tx*PS,40+(ty+20)*PS); tc.lineTo((tx+15)*PS,40+ty*PS); tc.lineTo((tx+30)*PS,40+(ty+20)*PS); tc.fill();
    });
    // Ally silhouettes
    this._npcSil(95,110,'#2A1E10'); this._npcSil(145,110,'#1E2818'); this._npcSil(110,115,'#382828');
  },

  // ── CATHEDRAL EXTERIOR ────────────────────────────────────────────────────
  cathedral_exterior() {
    const f = ENGINE.frame;
    // Apocalyptic sky
    $r(0,0,240,40,'#020608');
    $r(0,40,240,20,'#030810');
    $r(0,60,240,15,'#020608');
    // Dying green aurora — chaotic
    for(let x=0;x<240;x+=2){
      const h=Math.round(20+Math.sin(x*0.05+f*0.04)*12+Math.cos(x*0.08+f*0.06)*8);
      $r(x,55-h,2,h,'#39FF14',0.3+0.15*Math.sin(x*0.1+f*0.03));
    }
    // Shallow flooded ground
    $r(0,100,240,50,'#040E14');
    $r(0,102,240,3,'#061018',0.7);
    // Water ripples
    for(let wx=0;wx<240;wx+=20){ const wph=Math.sin(f*0.04+wx*0.08)*1; $r(wx,Math.round(103+wph),18,1,'#081420',0.5); }
    // Cathedral — massive dark structure
    $r(20,20,200,80,'#050810');
    // Walls stepped
    $r(20,20,200,5,'#0A0C18'); $r(22,22,196,3,'#080A14');
    // Buttresses
    [30,60,90,120,150,180].forEach(bx=>{ $r(bx,30,8,70,'#060810'); $r(bx-1,28,10,4,'#0A0C18'); });
    // Spires
    [50,80,120,160,190].forEach((sx,i)=>{
      const sh=40+i*12; const sw=5-Math.floor(i/2);
      $r(sx,20-sh,sw,sh+5,'#060810');
      $r(sx+Math.floor(sw/2),18-sh,1,4,'#060810');
      // Green glow at tips
      $p(sx+Math.floor(sw/2),18-sh,'#39FF14',0.6+0.3*Math.sin(f*0.05+i));
    });
    // Grand doors
    $r(105,60,30,40,'#020408');
    $r(107,62,13,36,'#030508'); $r(120,62,13,36,'#030508');
    $r(119,62,2,36,'#020408');
    // Door arch — green glow emanating
    const dg=ENGINE.ctx.createRadialGradient(120*PS,40+62*PS,0,120*PS,40+62*PS,60);
    dg.addColorStop(0,'rgba(0,80,0,0.3)'); dg.addColorStop(1,'rgba(0,0,0,0)');
    ENGINE.ctx.fillStyle=dg; ENGINE.ctx.fillRect(60*PS,40+30*PS,120*PS,80*PS);
    // Cathedral reflected in floodwater
    $r(20,100,200,50,'#040608',0.4);
    for(let rx=20;rx<220;rx+=3) $r(rx,Math.round(100+Math.sin(rx*0.2+f*0.05)*1),2,6,'#050810',0.3);
    // Choir members silhouettes in doorway
    this._npcSil(108,98,'#020408'); this._npcSil(120,98,'#020408'); this._npcSil(132,98,'#020408');
    // Stone circle before doors
    this._stonecircle(120, 100, 15, f);
  },

  _stonecircle(cx, cy, r, f) {
    for(let i=0;i<8;i++){
      const angle=i/8*Math.PI*2;
      const sx=Math.round(cx+Math.cos(angle)*r);
      const sy=Math.round(cy+Math.sin(angle)*r*0.4);
      $r(sx-1,sy-2,2,4,'#2A2828');
    }
    // Green glow at center
    const g2=ENGINE.ctx.createRadialGradient(cx*PS,40+cy*PS,0,cx*PS,40+cy*PS,r*PS);
    g2.addColorStop(0,'rgba(0,255,20,0.12)'); g2.addColorStop(1,'rgba(0,0,0,0)');
    ENGINE.ctx.fillStyle=g2; ENGINE.ctx.fillRect((cx-r)*PS,40+(cy-r)*PS,r*2*PS,r*2*PS);
  },

  // Cathedral room variants (reuse cathedral_exterior with different overlays)
  cathedral_choir()     { this.cathedral_exterior(); $r(0,0,240,150,'#0A0010',0.3); },
  cathedral_nave()      { this.cathedral_exterior(); $r(0,0,240,150,'#001408',0.25); },
  cathedral_vestry()    { this.cathedral_exterior(); $r(0,0,240,150,'#100800',0.3); },
  cathedral_ascent()    { this.cathedral_exterior(); $r(0,0,240,150,'#0A0A00',0.35); },
  cathedral_sanctum()   {
    const f=ENGINE.frame;
    this.cathedral_exterior();
    $r(0,0,240,150,'#001A00',0.4);
    // Veyra vessel glow — center
    const vg=ENGINE.ctx.createRadialGradient(120*PS,340,0,120*PS,340,200);
    vg.addColorStop(0,'rgba(57,255,20,0.25)'); vg.addColorStop(1,'rgba(0,0,0,0)');
    ENGINE.ctx.fillStyle=vg; ENGINE.ctx.fillRect(0,40,960,600);
  }

};
