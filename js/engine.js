'use strict';

const ENGINE = {
  canvas: null,
  ctx: null,
  W: 960,
  H: 640,
  scale: 1,
  mouse: { x: 0, y: 0, down: false },
  click: null,
  keys: {},
  frame: 0,
  lastTime: 0,

  init() {
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.ctx.imageSmoothingEnabled = false;
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.canvas.addEventListener('mousemove', e => this._onMove(e));
    this.canvas.addEventListener('mousedown', e => { this.mouse.down = true; });
    this.canvas.addEventListener('mouseup', e => { this.mouse.down = false; });
    this.canvas.addEventListener('click', e => this._onClick(e));
    document.addEventListener('keydown', e => { this.keys[e.key] = true; });
    document.addEventListener('keyup', e => { this.keys[e.key] = false; });
  },

  resize() {
    const s = Math.min(window.innerWidth / this.W, window.innerHeight / this.H);
    this.scale = s;
    this.canvas.style.width = (this.W * s) + 'px';
    this.canvas.style.height = (this.H * s) + 'px';
  },

  _onMove(e) {
    const r = this.canvas.getBoundingClientRect();
    this.mouse.x = (e.clientX - r.left) / this.scale;
    this.mouse.y = (e.clientY - r.top) / this.scale;
  },

  _onClick(e) {
    const r = this.canvas.getBoundingClientRect();
    this.click = {
      x: (e.clientX - r.left) / this.scale,
      y: (e.clientY - r.top) / this.scale
    };
  },

  consumeClick() {
    const c = this.click;
    this.click = null;
    return c;
  },

  peekClick() { return this.click; },

  over(x, y, w, h) {
    return this.mouse.x >= x && this.mouse.x <= x + w &&
           this.mouse.y >= y && this.mouse.y <= y + h;
  },

  clicked(x, y, w, h) {
    if (!this.click) return false;
    return this.click.x >= x && this.click.x <= x + w &&
           this.click.y >= y && this.click.y <= y + h;
  },

  // ─── Drawing utilities ───────────────────────────────────────────────

  clear(color = '#050810') {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.W, this.H);
  },

  rect(x, y, w, h, col, alpha = 1) {
    const c = this.ctx;
    c.save();
    c.globalAlpha = alpha;
    c.fillStyle = col;
    c.fillRect(x, y, w, h);
    c.restore();
  },

  stroke(x, y, w, h, col, lw = 2) {
    const c = this.ctx;
    c.save();
    c.strokeStyle = col;
    c.lineWidth = lw;
    c.strokeRect(x + lw/2, y + lw/2, w - lw, h - lw);
    c.restore();
  },

  line(x1, y1, x2, y2, col, lw = 1) {
    const c = this.ctx;
    c.save();
    c.strokeStyle = col;
    c.lineWidth = lw;
    c.beginPath();
    c.moveTo(x1, y1);
    c.lineTo(x2, y2);
    c.stroke();
    c.restore();
  },

  circle(x, y, r, col, fill = true) {
    const c = this.ctx;
    c.save();
    c.beginPath();
    c.arc(x, y, r, 0, Math.PI * 2);
    if (fill) { c.fillStyle = col; c.fill(); }
    else { c.strokeStyle = col; c.lineWidth = 2; c.stroke(); }
    c.restore();
  },

  gradient(x, y, w, h, colors) {
    const c = this.ctx;
    const g = c.createLinearGradient(x, y, x, y + h);
    colors.forEach(([stop, col]) => g.addColorStop(stop, col));
    c.fillStyle = g;
    c.fillRect(x, y, w, h);
  },

  text(str, x, y, opts = {}) {
    const c = this.ctx;
    c.save();
    c.font = opts.size ? `${opts.size}px "Press Start 2P"` : '14px "Press Start 2P"';
    c.fillStyle = opts.col || '#E8D8C0';
    c.textAlign = opts.align || 'left';
    c.textBaseline = opts.base || 'top';
    if (opts.shadow) {
      c.shadowColor = opts.shadow;
      c.shadowBlur = opts.shadowBlur || 6;
    }
    if (opts.maxW) {
      this._wrapText(str, x, y, opts.maxW, opts.lineH || (opts.size || 14) + 8, opts);
    } else {
      c.fillText(str, x, y);
    }
    c.restore();
  },

  _wrapText(str, x, y, maxW, lineH, opts) {
    const c = this.ctx;
    const words = str.split(' ');
    let line = '';
    let cy = y;
    for (let i = 0; i < words.length; i++) {
      const test = line + words[i] + ' ';
      if (c.measureText(test).width > maxW && i > 0) {
        c.fillText(line.trim(), x, cy);
        line = words[i] + ' ';
        cy += lineH;
        if (opts.maxLines && (cy - y) / lineH >= opts.maxLines) break;
      } else {
        line = test;
      }
    }
    c.fillText(line.trim(), x, cy);
  },

  measureText(str, size = 14) {
    this.ctx.font = `${size}px "Press Start 2P"`;
    return this.ctx.measureText(str).width;
  },

  // Panel: dark background + decorative borders
  panel(x, y, w, h, title = null) {
    const c = this.ctx;
    c.save();
    // bg
    c.fillStyle = '#0D1117';
    c.fillRect(x, y, w, h);
    // outer border
    c.strokeStyle = '#8B5E3C';
    c.lineWidth = 3;
    c.strokeRect(x + 1, y + 1, w - 2, h - 2);
    // inner accent
    c.strokeStyle = '#D4A574';
    c.lineWidth = 1;
    c.strokeRect(x + 5, y + 5, w - 10, h - 10);
    // corner squares
    const corners = [[x+1,y+1],[x+w-7,y+1],[x+1,y+h-7],[x+w-7,y+h-7]];
    corners.forEach(([cx,cy]) => {
      c.fillStyle = '#D4A574';
      c.fillRect(cx, cy, 6, 6);
    });
    if (title) {
      const tw = this.measureText(title, 11) + 16;
      c.fillStyle = '#1A1028';
      c.fillRect(x + 15, y - 9, tw, 18);
      c.fillStyle = '#D4A574';
      this.text(title, x + 23, y - 7, { size: 11, col: '#D4A574', base: 'top' });
    }
    c.restore();
  },

  // Button: returns true if clicked
  button(label, x, y, w, h, opts = {}) {
    const hovered = this.over(x, y, w, h);
    const c = this.ctx;
    c.save();
    const bg = hovered ? (opts.hoverBg || '#2D1F0E') : (opts.bg || '#1A1028');
    const border = hovered ? '#D4A574' : '#8B5E3C';
    const textCol = hovered ? '#FFFFFF' : (opts.col || '#D4A574');
    c.fillStyle = bg;
    c.fillRect(x, y, w, h);
    c.strokeStyle = border;
    c.lineWidth = 2;
    c.strokeRect(x + 1, y + 1, w - 2, h - 2);
    c.fillStyle = textCol;
    c.font = `${opts.size || 12}px "Press Start 2P"`;
    c.textAlign = 'center';
    c.textBaseline = 'middle';
    c.fillText(label, x + w/2, y + h/2);
    c.restore();
    if (hovered && this.click) {
      const cl = this.click;
      if (cl.x >= x && cl.x <= x + w && cl.y >= y && cl.y <= y + h) {
        return true;
      }
    }
    return false;
  },

  // Pixel sprite: palette + rows of hex chars ('0'=transparent)
  sprite(data, x, y, sc = 2) {
    const c = this.ctx;
    data.rows.forEach((row, ri) => {
      for (let ci = 0; ci < row.length; ci++) {
        const idx = parseInt(row[ci], 16);
        if (idx === 0) continue;
        c.fillStyle = data.pal[idx - 1];
        c.fillRect(x + ci * sc, y + ri * sc, sc, sc);
      }
    });
  },

  // Animated flickering overlay for fire/ambient light
  flickerOverlay(x, y, w, h, col, intensity = 0.15) {
    const flicker = intensity + Math.sin(this.frame * 0.3) * 0.05;
    this.rect(x, y, w, h, col, flicker);
  },

  // Scanline effect for retro feel
  scanlines(alpha = 0.04) {
    const c = this.ctx;
    c.save();
    c.globalAlpha = alpha;
    c.fillStyle = '#000000';
    for (let y = 0; y < this.H; y += 2) {
      c.fillRect(0, y, this.W, 1);
    }
    c.restore();
  },

  // Floating particles (for green aura effect)
  particles: [],

  spawnParticles(x, y, col, n = 5) {
    for (let i = 0; i < n; i++) {
      this.particles.push({
        x, y, col,
        vx: (Math.random() - 0.5) * 2,
        vy: -Math.random() * 2 - 0.5,
        life: 60 + Math.random() * 40,
        maxLife: 100,
        size: 2 + Math.random() * 2
      });
    }
  },

  updateAndDrawParticles() {
    this.particles = this.particles.filter(p => p.life > 0);
    const c = this.ctx;
    this.particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.life--;
      const alpha = p.life / p.maxLife;
      c.save();
      c.globalAlpha = alpha;
      c.fillStyle = p.col;
      c.fillRect(Math.round(p.x), Math.round(p.y), p.size, p.size);
      c.restore();
    });
  }
};
