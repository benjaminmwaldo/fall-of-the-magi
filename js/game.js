'use strict';

const GAME = {
  mode: 'TITLE',
  prevMode: null,
  flags: {},
  inventory: [],
  gold: 0,
  party: [],
  xp: 0,
  level: 1,
  currentScene: 'title',
  currentDialogue: null,
  dialogueLine: 0,
  dialogueChoiceIdx: 0,
  pendingScene: null,
  pendingDialogue: null,
  pendingCombat: null,
  postCombat: null,
  postDialogue: null,
  shopItems: [],
  mapUnlocked: ['road_arrival'],
  cathedralRoom: 0,
  ending: null,
  saveSlots: [null, null, null],
  notif: null,
  notifTimer: 0,
  levelUpPending: false,
  skillCheckPending: null,
  titleFrame: 0,
  charSelectClass: 0,
  charSelectName: '',
  charSelectNaming: false,
  cutsceneText: '',
  cutsceneTimer: 0,
  log: [],

  // ─── Boot ───────────────────────────────────────────────────────────────────

  init() {
    ENGINE.init();
    this._loadSaveSlots();
    this._hidingLoading = false;

    // Fade out loading screen after font presumably loaded
    setTimeout(() => {
      const ls = document.getElementById('loading-screen');
      if (ls) { ls.classList.add('hidden'); }
    }, 1200);

    // Animate loading bar
    let pct = 0;
    const bar = document.getElementById('loading-bar');
    const tick = setInterval(() => {
      pct = Math.min(pct + Math.random() * 18 + 5, 100);
      if (bar) bar.style.width = pct + '%';
      if (pct >= 100) clearInterval(tick);
    }, 120);

    requestAnimationFrame(t => this._loop(t));
  },

  _loop(ts) {
    const dt = Math.min((ts - ENGINE.lastTime) / 1000, 0.05);
    ENGINE.lastTime = ts;
    ENGINE.frame++;
    this.update(dt);
    this.render();
    ENGINE.click = null;
    requestAnimationFrame(t => this._loop(t));
  },

  // ─── Update ─────────────────────────────────────────────────────────────────

  update(dt) {
    if (this.notifTimer > 0) this.notifTimer -= dt;
    if (this.notifTimer <= 0) this.notif = null;

    if (this.mode === 'TITLE')       this._updateTitle(dt);
    else if (this.mode === 'SAVE')   this._updateSave();
    else if (this.mode === 'LOAD')   this._updateLoad();
    else if (this.mode === 'CHAR_SELECT') this._updateCharSelect();
    else if (this.mode === 'SCENE')  this._updateScene();
    else if (this.mode === 'DIALOGUE') this._updateDialogue();
    else if (this.mode === 'MAP')    this._updateMap();
    else if (this.mode === 'COMBAT') COMBAT.update(dt);
    else if (this.mode === 'ENDING') this._updateEnding(dt);
    else if (this.mode === 'LEVELUP') this._updateLevelUp();
    else if (this.mode === 'SKILLCHECK') this._updateSkillCheck(dt);
  },

  // ─── Render ─────────────────────────────────────────────────────────────────

  render() {
    ENGINE.clear();
    if (this.mode === 'TITLE')       this._renderTitle();
    else if (this.mode === 'SAVE')   this._renderSave();
    else if (this.mode === 'LOAD')   this._renderLoad();
    else if (this.mode === 'CHAR_SELECT') this._renderCharSelect();
    else if (this.mode === 'SCENE')  this._renderScene();
    else if (this.mode === 'DIALOGUE') this._renderDialogue();
    else if (this.mode === 'MAP')    this._renderMap();
    else if (this.mode === 'COMBAT') COMBAT.render();
    else if (this.mode === 'ENDING') this._renderEnding();
    else if (this.mode === 'LEVELUP') this._renderLevelUp();
    else if (this.mode === 'SKILLCHECK') this._renderSkillCheck();
    this._renderNotif();
    ENGINE.scanlines();
  },

  // ─── Title ──────────────────────────────────────────────────────────────────

  _updateTitle(dt) {
    this.titleFrame = (this.titleFrame || 0) + dt;
    const cl = ENGINE.consumeClick();
    if (!cl) return;
    const hit = (x, y, w, h) => cl.x >= x && cl.x <= x+w && cl.y >= y && cl.y <= y+h;
    const W = ENGINE.W, H = ENGINE.H;
    if (hit(W/2 - 100, 340, 200, 36)) this._startNewGame();
    else if (hit(W/2 - 100, 388, 200, 36)) this._goMode('LOAD');
    else if (hit(W/2 - 100, 436, 200, 36)) this._goMode('SAVE');
  },

  _renderTitle() {
    SCENES_ART.title.call(SCENES_ART);
    const W = ENGINE.W, H = ENGINE.H;
    // Title text
    ENGINE.rect(W/2 - 240, 60, 480, 80, '#0D1117', 0.85);
    ENGINE.stroke(W/2 - 240, 60, 480, 80, '#D4A574', 2);
    ENGINE.text('THE FALL OF', W/2, 80, { size: 20, col: '#D4A574', align: 'center', shadow: '#8B3A3A', shadowBlur: 12 });
    ENGINE.text('THE MAGI', W/2, 110, { size: 20, col: '#D4A574', align: 'center', shadow: '#8B3A3A', shadowBlur: 12 });
    // Subtitle
    ENGINE.text('A POINT & CLICK ADVENTURE', W/2, 162, { size: 8, col: '#8B7355', align: 'center' });

    // Buttons
    this._menuBtn('NEW GAME', W/2 - 100, 340, 200, 36);
    this._menuBtn('LOAD GAME', W/2 - 100, 388, 200, 36);
    this._menuBtn('RECORDS', W/2 - 100, 436, 200, 36);

    // Version
    ENGINE.text('v1.0', W - 40, H - 20, { size: 8, col: '#3A3030', align: 'right', base: 'bottom' });
  },

  _menuBtn(label, x, y, w, h) {
    const hov = ENGINE.over(x, y, w, h);
    ENGINE.rect(x, y, w, h, hov ? '#2D1F0E' : '#1A1028', hov ? 1 : 0.9);
    ENGINE.stroke(x, y, w, h, hov ? '#D4A574' : '#8B5E3C', 2);
    ENGINE.text(label, x + w/2, y + h/2, { size: 10, col: hov ? '#FFFFFF' : '#D4A574', align: 'center', base: 'middle' });
  },

  // ─── New Game / Char Select ──────────────────────────────────────────────────

  _startNewGame() {
    this.flags = {};
    this.inventory = [];
    this.gold = 12;
    this.party = [];
    this.xp = 0;
    this.level = 1;
    this.mapUnlocked = ['road_arrival'];
    this.cathedralRoom = 0;
    this.charSelectClass = 0;
    this.charSelectName = '';
    this.charSelectNaming = false;
    this._goMode('CHAR_SELECT');
  },

  _updateCharSelect() {
    if (this.charSelectNaming) { this._handleNameTyping(); }
    const cl = ENGINE.consumeClick();
    if (!cl) return;
    const hit = (x, y, w, h) => cl.x >= x && cl.x <= x+w && cl.y >= y && cl.y <= y+h;
    const W = ENGINE.W;
    if (hit(120, 280, 40, 40)) this.charSelectClass = (this.charSelectClass + 3) % 4;
    if (hit(800, 280, 40, 40)) this.charSelectClass = (this.charSelectClass + 1) % 4;
    if (hit(W/2 - 100, 540, 200, 40)) this.charSelectNaming = true;
  },

  _handleNameTyping() {
    // Check if user pressed Enter in the name field
    if (ENGINE.keys['Enter'] && this.charSelectName.trim()) {
      ENGINE.keys['Enter'] = false;
      this._confirmCharSelect();
      return;
    }
    if (ENGINE.keys['Backspace']) {
      ENGINE.keys['Backspace'] = false;
      this.charSelectName = this.charSelectName.slice(0, -1);
    }
    // Typing handled via keydown listener added in init
  },

  _confirmCharSelect() {
    const classKeys = ['warden', 'scholar', 'blade', 'hedge_witch'];
    const chosenClass = classKeys[this.charSelectClass];
    const cls = CLASSES[chosenClass];
    const bs = cls.baseStats;
    const name = this.charSelectName.trim() || 'Arynn';
    this.party = [{
      id: 'player',
      name,
      class: chosenClass,
      portrait: 'player',
      hp: bs.hp, maxHp: bs.hp,
      mp: bs.mp, maxMp: bs.mp,
      str: bs.str, def: bs.def, mag: bs.mag, res: bs.res, spd: bs.spd, wis: bs.wis,
      skills: [...cls.skills],
      statuses: [],
      alive: true,
      level: 1
    }];
    this.charSelectNaming = false;
    this._gotoScene('road_arrival');
    this._showNotif('Your journey begins...');
  },

  _renderCharSelect() {
    if (typeof SCENES_ART.char_select === 'function') SCENES_ART.char_select.call(SCENES_ART);
    else SCENES_ART.title.call(SCENES_ART);
    const W = ENGINE.W, H = ENGINE.H;
    ENGINE.panel(80, 60, W - 160, H - 120, 'CHOOSE YOUR PATH');

    const classKeys = ['warden', 'scholar', 'blade', 'hedge_witch'];
    const classNames = ['WARDEN', 'SCHOLAR', 'BLADE', 'HEDGE-WITCH'];
    const classDesc = [
      'Shield and sword. Guardian of\nthe weak. Stalwart defender.',
      'Ancient knowledge, arcane\npower. Fragile but devastating.',
      'Dual blades, shadow-craft.\nFast and lethal in the dark.',
      'Folk magic and herblore.\nHealer and cunning trickster.'
    ];
    const ci = this.charSelectClass;
    const cls = CLASSES[classKeys[ci]];

    // Class sprite (large)
    const sp = SPRITES[classKeys[ci]];
    if (sp) ENGINE.sprite(sp, W/2 - 40, 180, 5);

    ENGINE.text(classNames[ci], W/2, 150, { size: 14, col: '#D4A574', align: 'center' });
    ENGINE.text(classDesc[ci].split('\n')[0], W/2, 310, { size: 9, col: '#B89070', align: 'center' });
    ENGINE.text(classDesc[ci].split('\n')[1] || '', W/2, 330, { size: 9, col: '#B89070', align: 'center' });

    // Stats
    const sx = W/2 - 160, sy = 360;
    const bs = cls.baseStats;
    ['HP', 'MP', 'STR', 'DEF', 'MAG', 'RES', 'SPD', 'WIS'].forEach((s, i) => {
      const col = i % 2 === 0 ? sx : sx + 160;
      const row = sy + Math.floor(i / 2) * 22;
      const val = [bs.hp, bs.mp, bs.str, bs.def, bs.mag, bs.res, bs.spd, bs.wis][i];
      ENGINE.text(`${s}: ${val}`, col, row, { size: 9, col: '#C4A882' });
    });

    // Arrows
    ENGINE.text('<', 130, 296, { size: 18, col: '#D4A574', align: 'center', base: 'middle' });
    ENGINE.text('>', 822, 296, { size: 18, col: '#D4A574', align: 'center', base: 'middle' });

    // Name field
    if (this.charSelectNaming) {
      ENGINE.rect(W/2 - 150, 500, 300, 36, '#1A1028');
      ENGINE.stroke(W/2 - 150, 500, 300, 36, '#D4A574', 2);
      ENGINE.text((this.charSelectName || '_') + (ENGINE.frame % 60 < 30 ? '|' : ''), W/2, 518, { size: 11, col: '#FFF', align: 'center', base: 'middle' });
      ENGINE.text('PRESS ENTER TO CONFIRM', W/2, 550, { size: 8, col: '#8B7355', align: 'center' });
    } else {
      this._menuBtn('BEGIN YOUR JOURNEY', W/2 - 100, 540, 200, 40);
      ENGINE.text('(Click to enter name)', W/2, 592, { size: 8, col: '#5A4A3A', align: 'center' });
    }
  },

  // ─── Scene ──────────────────────────────────────────────────────────────────

  _gotoScene(sceneId) {
    this.currentScene = sceneId;
    this._goMode('SCENE');
    if (this.mapUnlocked.indexOf(sceneId) < 0) this.mapUnlocked.push(sceneId);
  },

  _updateScene() {
    const cl = ENGINE.consumeClick();
    if (!cl) return;
    const hit = (x, y, w, h) => cl.x >= x && cl.x <= x+w && cl.y >= y && cl.y <= y+h;
    const scene = SCENES[this.currentScene];

    // HUD buttons
    if (hit(ENGINE.W - 130, ENGINE.H - 50, 120, 36)) { this._goMode('MAP'); return; }
    if (hit(10, ENGINE.H - 50, 60, 36)) { this._openInventory(); return; }
    if (hit(80, ENGINE.H - 50, 60, 36)) { this._goMode('SAVE'); return; }

    if (!scene) return;
    // Hotspots
    for (const hs of (scene.hotspots || [])) {
      if (!this._checkCondition(hs)) continue;
      if (hit(hs.x, hs.y, hs.w, hs.h)) {
        this._fireAction(hs);
        return;
      }
    }
  },

  // Hotspot visibility: cond_flag without cond_action means "only show when flag set"
  _checkCondition(hs) {
    if (hs.cond_flag && !hs.cond_action) return !!this.flags[hs.cond_flag];
    return true;
  },

  _fireAction(hs) {
    let action = hs.action;
    if (!action) return;

    // cond_flag + cond_action: if flag is set, use the alternate action
    if (hs.cond_flag && hs.cond_action && this.flags[hs.cond_flag]) {
      const [altType, altDest] = hs.cond_action.split(':');
      if (altType === 'goto') { this._gotoScene(altDest); return; }
      if (altType === 'combat') { this._startCombat(altDest); return; }
      if (altType === 'dialogue') { this._startDialogue(altDest); return; }
    }

    if (action === 'examine') {
      if (hs.flag) this.flags[hs.flag] = true;
      if (hs.give_items) hs.give_items.forEach(id => this._giveItem(id));
      if (hs.text) this._showNotif(hs.text);
    }
    else if (action === 'dialogue') {
      if (hs.flag) this.flags[hs.flag] = true;
      this._startDialogue(hs.dialogue);
    }
    else if (action === 'goto') {
      this._gotoScene(hs.dest);
    }
    else if (action === 'take') {
      if (hs.text) this._showNotif(hs.text);
      if (hs.flag) this.flags[hs.flag] = true;
      this._takeItem(hs.item);
    }
    else if (action === 'shop') {
      this._openShop(hs.items);
    }
    else if (action === 'combat') {
      this._startCombat(hs.encounter, hs.post_scene);
    }
    else if (action === 'skill_check') {
      this._startSkillCheck(hs);
    }
    else if (action === 'map') {
      this._goMode('MAP');
    }
  },

  _renderScene() {
    const W = ENGINE.W, H = ENGINE.H;
    // Background
    const drawFn = SCENES_ART[this.currentScene];
    if (typeof drawFn === 'function') drawFn.call(SCENES_ART);
    else SCENES_ART.fallback(this.currentScene);

    // Scene name
    ENGINE.rect(0, 0, W, 30, '#000000', 0.6);
    const scene = SCENES[this.currentScene];
    ENGINE.text(scene ? scene.name : this.currentScene, 12, 9, { size: 9, col: '#D4A574' });

    // Hotspot overlays
    if (scene) {
      for (const hs of (scene.hotspots || [])) {
        if (!this._checkCondition(hs)) continue;
        const hov = ENGINE.over(hs.x, hs.y, hs.w, hs.h);
        if (hov) {
          ENGINE.rect(hs.x, hs.y, hs.w, hs.h, '#D4A574', 0.15);
          ENGINE.stroke(hs.x, hs.y, hs.w, hs.h, '#D4A574', 1);
          ENGINE.text(hs.label, hs.x + hs.w/2, hs.y + hs.h + 4, { size: 8, col: '#D4A574', align: 'center' });
        }
      }
    }

    // HUD bar
    this._renderHUD();
  },

  _renderHUD() {
    const W = ENGINE.W, H = ENGINE.H;
    ENGINE.rect(0, H - 56, W, 56, '#0D1117', 0.9);
    ENGINE.line(0, H - 56, W, H - 56, '#8B5E3C', 2);

    // Party HP/MP
    let px = 150;
    for (const m of this.party) {
      ENGINE.text(m.name, px, H - 50, { size: 8, col: '#D4A574' });
      this._renderBar(px, H - 36, 100, 8, m.hp, m.maxHp, '#5C1A1A', '#C04040');
      this._renderBar(px, H - 24, 100, 8, m.mp, m.maxMp, '#1A2A5C', '#4060C0');
      ENGINE.text(`${m.hp}/${m.maxHp}`, px + 104, H - 36, { size: 7, col: '#A07070' });
      px += 220;
    }

    // Buttons
    this._menuBtn('INV', 10, H - 50, 60, 36);
    this._menuBtn('SAVE', 80, H - 50, 60, 36);
    ENGINE.rect(W - 134, H - 54, 130, 50, '#1A1028', 0.9);
    ENGINE.stroke(W - 134, H - 54, 130, 50, '#8B5E3C', 1);
    this._menuBtn('WORLD MAP', W - 130, H - 50, 120, 36);
  },

  _renderBar(x, y, w, h, val, max, bg, fg) {
    ENGINE.rect(x, y, w, h, bg);
    ENGINE.rect(x, y, Math.round(w * Math.max(0, val) / max), h, fg);
    ENGINE.stroke(x, y, w, h, '#333', 1);
  },

  // ─── Dialogue ───────────────────────────────────────────────────────────────

  _startDialogue(nodeId, afterFn) {
    this.currentDialogue = DIALOGUE[nodeId];
    this.dialogueLine = 0;
    this.dialogueChoiceIdx = 0;
    this._pendingAfterDialogue = afterFn || null;
    if (!this.currentDialogue) { this._showNotif('...'); return; }
    this._goMode('DIALOGUE');
  },

  _dialogueLines(node) {
    return [...(node.lines || []), ...(node.lines2 || [])];
  },

  _updateDialogue() {
    const node = this.currentDialogue;
    if (!node) { this._endDialogue(); return; }
    const cl = ENGINE.consumeClick();
    if (!cl) return;
    const hit = (x, y, w, h) => cl.x >= x && cl.x <= x+w && cl.y >= y && cl.y <= y+h;
    const lines = this._dialogueLines(node);

    // Choice node — show choices after all lines are shown
    if (node.choices && this.dialogueLine >= lines.length) {
      const baseY = ENGINE.H - 160;
      node.choices.forEach((ch, i) => {
        if (hit(120, baseY + i * 36, 720, 32)) this._pickChoice(ch);
      });
      return;
    }

    // Advance lines
    this.dialogueLine++;
    if (this.dialogueLine >= lines.length && !node.choices) {
      this._applyDialogueEffects(node);
      if (node.next) this._startDialogue(node.next);
      else this._endDialogue();
    }
  },

  _pickChoice(choice) {
    // flag_needed gate: redirect to flag_fail if flag not set
    let dest = choice.next;
    if (choice.flag_needed && !this.flags[choice.flag_needed]) {
      dest = choice.flag_fail || null;
    }
    if (choice.flag) this.flags[choice.flag] = true;
    if (choice.setFlag) this.flags[choice.setFlag] = true;
    this._applyDialogueEffects(this.currentDialogue);
    if (dest) this._startDialogue(dest);
    else this._endDialogue();
  },

  _applyDialogueEffects(node) {
    if (!node) return;
    if (node.setFlag) this.flags[node.setFlag] = true;
    if (node.flag) this.flags[node.flag] = true;
    if (node.giveItem) this._giveItem(node.giveItem);
    if (node.give_items) node.give_items.forEach(id => this._giveItem(id));
    if (node.awardXP) this.awardXP(node.awardXP);
    if (node.unlockMap) { if (this.mapUnlocked.indexOf(node.unlockMap) < 0) this.mapUnlocked.push(node.unlockMap); }
  },

  _endDialogue() {
    this.currentDialogue = null;
    this.dialogueLine = 0;
    const after = this._pendingAfterDialogue;
    this._pendingAfterDialogue = null;
    if (after) after();
    else if (this.prevMode === 'SCENE') this._goMode('SCENE');
    else this._goMode('SCENE');
  },

  _renderDialogue() {
    // Draw scene behind
    const drawFn = SCENES_ART[this.currentScene];
    if (typeof drawFn === 'function') drawFn.call(SCENES_ART);
    else SCENES_ART.fallback(this.currentScene);

    const node = this.currentDialogue;
    if (!node) return;
    const W = ENGINE.W, H = ENGINE.H;
    const lines = this._dialogueLines(node);
    const lineIdx = Math.min(this.dialogueLine, lines.length - 1);
    const lineText = lines[lineIdx] || '';

    // Portrait
    const emotion = node.emotion || 'neutral';
    if (node.portrait && PORTRAITS[node.portrait]) {
      PORTRAITS.draw(node.portrait, emotion, 40, H - 260);
    }

    // Text box
    ENGINE.rect(190, H - 240, W - 210, 180, '#0D1117', 0.95);
    ENGINE.stroke(190, H - 240, W - 210, 180, '#8B5E3C', 2);
    ENGINE.stroke(195, H - 235, W - 220, 170, '#D4A574', 1);

    // Speaker name
    if (node.speaker) {
      ENGINE.rect(190, H - 256, 180, 22, '#1A1028');
      ENGINE.text(node.speaker, 200, H - 252, { size: 9, col: '#D4A574' });
    }

    // Line text
    ENGINE.text(lineText, 204, H - 222, { size: 9, col: '#E8D8C0', maxW: W - 234, lineH: 20 });

    // Choices
    if (node.choices && this.dialogueLine >= lines.length) {
      const baseY = H - 160;
      node.choices.forEach((ch, i) => {
        const hov = ENGINE.over(120, baseY + i * 36, 720, 32);
        ENGINE.rect(120, baseY + i * 36, 720, 32, hov ? '#2D1F0E' : '#12100E', 0.95);
        ENGINE.stroke(120, baseY + i * 36, 720, 32, hov ? '#D4A574' : '#5A4030', 1);
        ENGINE.text(ch.text, 134, baseY + i * 36 + 10, { size: 9, col: hov ? '#FFF' : '#C4A882' });
      });
    } else if (this.dialogueLine < lines.length - 1 || !node.choices) {
      // Advance indicator
      if (ENGINE.frame % 60 < 35) ENGINE.text('>', W - 50, H - 75, { size: 10, col: '#D4A574' });
    }
  },

  // ─── World Map ──────────────────────────────────────────────────────────────

  _updateMap() {
    const cl = ENGINE.consumeClick();
    if (!cl) return;
    const hit = (x, y, w, h) => cl.x >= x && cl.x <= x+w && cl.y >= y && cl.y <= y+h;
    // Back button
    if (hit(10, 10, 80, 30)) { this._goMode('SCENE'); return; }

    for (const loc of Object.values(MAP_LOCATIONS)) {
      if (this.mapUnlocked.indexOf(loc.scene) < 0) continue;
      const dx = cl.x - loc.x, dy = cl.y - loc.y;
      if (Math.sqrt(dx*dx + dy*dy) <= 30) {
        this._gotoScene(loc.scene);
        return;
      }
    }
  },

  _renderMap() {
    const W = ENGINE.W, H = ENGINE.H;
    ENGINE.rect(0, 0, W, H, '#060C0A');
    ENGINE.gradient(0, 0, W, H, [[0,'#060C0A'],[1,'#0A1410']]);
    ENGINE.panel(20, 20, W - 40, H - 40, 'WORLD MAP');

    for (const loc of Object.values(MAP_LOCATIONS)) {
      const unlocked = this.mapUnlocked.indexOf(loc.scene) >= 0;
      const col = unlocked ? '#D4A574' : '#3A3030';
      const hov = ENGINE.over(loc.x - 20, loc.y - 20, 40, 40);
      ENGINE.circle(loc.x, loc.y, hov && unlocked ? 14 : 10, unlocked ? (hov ? '#FFD080' : '#C08040') : '#2A2020');
      ENGINE.circle(loc.x, loc.y, hov && unlocked ? 14 : 10, col, false);
      ENGINE.text(loc.name, loc.x, loc.y + 18, { size: 7, col, align: 'center' });
      if (loc.scene === this.currentScene) ENGINE.circle(loc.x, loc.y, 16, '#FFFFFF', false);
    }

    // Draw roads between connected scenes
    const roads = [
      ['road_village','road_village'],['road_village','cinder_ford'],
      ['cinder_ford','vael_city'],['vael_city','iron_reach'],
      ['iron_reach','salt_coast'],['salt_coast','black_coast']
    ];
    const locs = Object.values(MAP_LOCATIONS);
    roads.forEach(([a, b]) => {
      const la = locs.find(l => l.scene === a);
      const lb = locs.find(l => l.scene === b);
      if (!la || !lb) return;
      const ua = this.mapUnlocked.indexOf(a) >= 0, ub = this.mapUnlocked.indexOf(b) >= 0;
      ENGINE.line(la.x, la.y, lb.x, lb.y, ua && ub ? '#5A4030' : '#2A1A10', 2);
    });

    this._menuBtn('CLOSE', 10, 10, 80, 30);
  },

  // ─── Combat ─────────────────────────────────────────────────────────────────

  _startCombat(encounterId, postScene) {
    this.prevMode = 'SCENE';
    this._goMode('COMBAT');
    COMBAT.startEncounter(encounterId, this.party, {
      win: (xp, gold) => {
        this.gold += gold || 0;
        this.awardXP(xp || 0);
        if (postScene) setTimeout(() => this._gotoScene(postScene), 1200);
        else setTimeout(() => this._goMode('SCENE'), 1200);
      },
      lose: () => {
        setTimeout(() => this._gameOver(), 2000);
      }
    });
  },

  _gameOver() {
    this._goMode('ENDING');
    this.ending = 'game_over';
  },

  // ─── Skill Check ────────────────────────────────────────────────────────────

  _startSkillCheck(hs) {
    const player = this.party[0];
    const statMap = { stealth: player.spd, insight: player.wis, persuasion: player.wis, arcana: player.mag };
    const skill = hs.check || hs.skill || 'insight';
    const mod = Math.floor(((statMap[skill] || 10) - 10) / 2);
    const roll = Math.floor(Math.random() * 20) + 1;
    const total = roll + mod;
    const success = total >= hs.dc;
    this.skillCheckPending = { roll, mod, total, dc: hs.dc, skill, success,
      pass: hs.pass || null, fail: hs.fail || null, timer: 0 };
    this._goMode('SKILLCHECK');
  },

  _resolveSkillOutcome(outcome) {
    if (!outcome) return;
    const [type, target] = outcome.includes(':') ? outcome.split(':') : ['flag', outcome];
    if (type === 'goto') this._gotoScene(target);
    else if (type === 'combat') this._startCombat(target);
    else if (type === 'dialogue') this._startDialogue(target);
    else this.flags[outcome] = true; // plain string = set flag
  },

  _updateSkillCheck(dt) {
    const sk = this.skillCheckPending;
    if (!sk) return;
    sk.timer += dt;
    if (sk.timer > 2.5) {
      const outcome = sk.success ? sk.pass : sk.fail;
      this.skillCheckPending = null;
      this._goMode('SCENE');
      this._resolveSkillOutcome(outcome);
    }
  },

  _renderSkillCheck() {
    const drawFn = SCENES_ART[this.currentScene];
    if (typeof drawFn === 'function') drawFn.call(SCENES_ART);
    else SCENES_ART.fallback(this.currentScene);
    const W = ENGINE.W, H = ENGINE.H;
    const sk = this.skillCheckPending;
    if (!sk) return;
    ENGINE.rect(W/2-200, H/2-120, 400, 240, '#0D1117', 0.97);
    ENGINE.stroke(W/2-200, H/2-120, 400, 240, '#D4A574', 2);
    ENGINE.text('SKILL CHECK', W/2, H/2 - 100, { size: 12, col: '#D4A574', align: 'center' });
    ENGINE.text(sk.skill.toUpperCase() + ' DC ' + sk.dc, W/2, H/2 - 72, { size: 10, col: '#B89070', align: 'center' });
    if (sk.timer > 0.5) {
      ENGINE.text('Roll: ' + sk.roll, W/2, H/2 - 40, { size: 16, col: '#FFF', align: 'center' });
      ENGINE.text('Mod: +' + sk.mod, W/2, H/2 - 12, { size: 10, col: '#8B7355', align: 'center' });
    }
    if (sk.timer > 1.2) {
      ENGINE.text('Total: ' + sk.total, W/2, H/2 + 20, { size: 14, col: sk.success ? '#40C040' : '#C04040', align: 'center' });
      ENGINE.text(sk.success ? 'SUCCESS' : 'FAILURE', W/2, H/2 + 50, { size: 16, col: sk.success ? '#60FF60' : '#FF4040', align: 'center', shadow: sk.success ? '#004000' : '#400000', shadowBlur: 12 });
    }
  },

  // ─── Inventory ──────────────────────────────────────────────────────────────

  _openInventory() {
    this._invPage = 0;
    this._goMode('INVENTORY');
    // Inline — reuse SCENE render + overlay
  },

  _takeItem(itemId) {
    const item = ITEMS[itemId];
    if (!item) return;
    this.inventory.push(itemId);
    this.flags['has_' + itemId] = true;
    this._showNotif('Obtained: ' + item.name);
  },

  _giveItem(itemId) {
    const item = ITEMS[itemId];
    if (!item) return;
    this.inventory.push(itemId);
    this.flags['has_' + itemId] = true;
    this._showNotif('Obtained: ' + item.name);
  },

  useItem(itemId, targetIdx) {
    const item = ITEMS[itemId];
    if (!item) return;
    const idx = this.inventory.indexOf(itemId);
    if (idx < 0) return;
    const target = this.party[targetIdx || 0];
    if (!target) return;
    if (item.hp)     target.hp = Math.min(target.maxHp, target.hp + item.hp);
    if (item.mp)     target.mp = Math.min(target.maxMp, target.mp + item.mp);
    if (item.revive) { target.hp = Math.max(1, Math.floor(target.maxHp * 0.5)); target.alive = true; }
    if (item.cure)   target.statuses = (target.statuses || []).filter(s => s !== item.cure);
    if (item.wisBoost) target.wis = (target.wis || 0) + item.wisBoost;
    this.inventory.splice(idx, 1);
    this._showNotif('Used: ' + item.name);
  },

  // ─── Shop ───────────────────────────────────────────────────────────────────

  _openShop(itemIds) {
    this.shopItems = itemIds || [];
    this._goMode('SHOP');
  },

  // ─── Ending ─────────────────────────────────────────────────────────────────

  _startEnding(endingId) {
    this.ending = endingId;
    this.endingLine = 0;
    this.endingTimer = 0;
    this._goMode('ENDING');
  },

  _updateEnding(dt) {
    this.endingTimer = (this.endingTimer || 0) + dt;
    const cl = ENGINE.consumeClick();
    if (cl && this.endingTimer > 2) {
      this.endingLine = (this.endingLine || 0) + 1;
      const node = DIALOGUE[this.ending];
      if (!node || (this.endingLine || 0) >= (node.lines || []).length) {
        // Return to title
        this._goMode('TITLE');
      }
    }
  },

  _renderEnding() {
    const W = ENGINE.W, H = ENGINE.H;
    if (this.ending === 'game_over') {
      ENGINE.rect(0, 0, W, H, '#000000');
      ENGINE.text('YOUR JOURNEY ENDS HERE', W/2, H/2 - 30, { size: 14, col: '#8B3A3A', align: 'center' });
      ENGINE.text('Click to return to title', W/2, H/2 + 30, { size: 9, col: '#5A4030', align: 'center' });
      const cl = ENGINE.consumeClick();
      if (cl) this._goMode('TITLE');
      return;
    }
    const node = DIALOGUE[this.ending];
    if (!node) { ENGINE.text('THE END', W/2, H/2, { size: 24, col: '#D4A574', align: 'center' }); return; }
    const line = (node.lines || [])[(this.endingLine || 0)] || '';

    if (typeof SCENES_ART.black_coast === 'function') SCENES_ART.black_coast.call(SCENES_ART);
    else ENGINE.rect(0, 0, W, H, '#05080A');
    ENGINE.rect(0, H/2 - 60, W, 200, '#000000', 0.8);
    ENGINE.text(line, W/2, H/2 - 20, { size: 10, col: '#D4A574', align: 'center', maxW: W - 100, lineH: 24 });

    const endingNames = { ending_1: 'THE WARDEN\'S VOW', ending_2: 'THE OPEN DOOR', ending_3: 'THE LAST CANDLE' };
    if (this.endingLine === 0 && this.ending !== 'game_over') {
      ENGINE.text(endingNames[this.ending] || 'THE END', W/2, H/2 - 60, { size: 14, col: '#D4A574', align: 'center', shadow: '#000', shadowBlur: 10 });
    }
    if (this.endingTimer > 2) ENGINE.text('click to continue', W/2, H - 40, { size: 8, col: '#5A4030', align: 'center' });
  },

  // ─── Level Up ───────────────────────────────────────────────────────────────

  awardXP(amount) {
    this.xp += amount;
    const needed = XP_TABLE[this.level] || 9999;
    if (this.xp >= needed && this.level < 8) {
      this.level++;
      this.xp -= needed;
      this._levelUp();
    }
  },

  _levelUp() {
    this.party.forEach(m => {
      const cls = CLASSES[m.class];
      if (!cls) return;
      m.maxHp += cls.hpPerLevel || 10;
      m.hp = m.maxHp;
      m.maxMp += cls.mpPerLevel || 4;
      m.mp = m.maxMp;
      // Flat stat growth per level
      m.str = (m.str || 0) + 1;
      m.def = (m.def || 0) + 1;
      m.mag = (m.mag || 0) + 1;
      m.res = (m.res || 0) + 1;
      m.spd = (m.spd || 0) + 1;
      m.wis = (m.wis || 0) + 1;
    });
    this._showNotif('Level up! Now level ' + this.level);
    this.levelUpPending = true;
    this._goMode('LEVELUP');
  },

  _updateLevelUp() {
    const cl = ENGINE.consumeClick();
    if (cl) { this.levelUpPending = false; this._goMode('SCENE'); }
  },

  _renderLevelUp() {
    const drawFn = SCENES_ART[this.currentScene];
    if (typeof drawFn === 'function') drawFn.call(SCENES_ART);
    else SCENES_ART.fallback(this.currentScene);
    const W = ENGINE.W, H = ENGINE.H;
    ENGINE.rect(W/2-200, H/2-140, 400, 280, '#0D1117', 0.97);
    ENGINE.stroke(W/2-200, H/2-140, 400, 280, '#D4A574', 2);
    ENGINE.text('LEVEL UP!', W/2, H/2 - 120, { size: 16, col: '#FFD080', align: 'center', shadow: '#804000', shadowBlur: 12 });
    ENGINE.text('Now Level ' + this.level, W/2, H/2 - 80, { size: 12, col: '#D4A574', align: 'center' });
    const m = this.party[0];
    if (m) {
      ENGINE.text(`HP: ${m.maxHp}   MP: ${m.maxMp}`, W/2, H/2 - 44, { size: 9, col: '#C4A882', align: 'center' });
      ENGINE.text(`STR:${m.str} DEF:${m.def} MAG:${m.mag}`, W/2, H/2 - 18, { size: 9, col: '#C4A882', align: 'center' });
      ENGINE.text(`RES:${m.res} SPD:${m.spd} WIS:${m.wis}`, W/2, H/2 + 8, { size: 9, col: '#C4A882', align: 'center' });
    }
    ENGINE.text('Click to continue', W/2, H/2 + 80, { size: 9, col: '#8B7355', align: 'center' });
  },

  // ─── Save / Load ────────────────────────────────────────────────────────────

  _saveSlotKey(slot) { return 'fotm_save_' + slot; },

  _saveGame(slot) {
    const data = {
      flags: this.flags, inventory: this.inventory, gold: this.gold,
      party: this.party, xp: this.xp, level: this.level,
      currentScene: this.currentScene, mapUnlocked: this.mapUnlocked,
      cathedralRoom: this.cathedralRoom, ts: Date.now()
    };
    localStorage.setItem(this._saveSlotKey(slot), JSON.stringify(data));
    this.saveSlots[slot] = data;
    this._showNotif('Game saved to slot ' + (slot + 1));
  },

  _loadGame(slot) {
    const raw = localStorage.getItem(this._saveSlotKey(slot));
    if (!raw) { this._showNotif('No save in slot ' + (slot + 1)); return; }
    const data = JSON.parse(raw);
    Object.assign(this, {
      flags: data.flags, inventory: data.inventory, gold: data.gold,
      party: data.party, xp: data.xp, level: data.level,
      currentScene: data.currentScene, mapUnlocked: data.mapUnlocked,
      cathedralRoom: data.cathedralRoom || 0
    });
    this._showNotif('Game loaded!');
    this._gotoScene(this.currentScene);
  },

  _loadSaveSlots() {
    for (let i = 0; i < 3; i++) {
      const raw = localStorage.getItem(this._saveSlotKey(i));
      this.saveSlots[i] = raw ? JSON.parse(raw) : null;
    }
  },

  _updateSave() {
    const cl = ENGINE.consumeClick();
    if (!cl) return;
    const hit = (x, y, w, h) => cl.x >= x && cl.x <= x+w && cl.y >= y && cl.y <= y+h;
    if (hit(10, 10, 80, 30)) { this._goMode('SCENE'); return; }
    for (let i = 0; i < 3; i++) {
      if (hit(ENGINE.W/2 - 200, 180 + i * 110, 400, 90)) {
        this._saveGame(i);
        this._goMode('SCENE');
        return;
      }
    }
  },

  _updateLoad() {
    const cl = ENGINE.consumeClick();
    if (!cl) return;
    const hit = (x, y, w, h) => cl.x >= x && cl.x <= x+w && cl.y >= y && cl.y <= y+h;
    if (hit(10, 10, 80, 30)) { this._goMode(this.party.length ? 'SCENE' : 'TITLE'); return; }
    for (let i = 0; i < 3; i++) {
      if (hit(ENGINE.W/2 - 200, 180 + i * 110, 400, 90) && this.saveSlots[i]) {
        this._loadGame(i);
        return;
      }
    }
  },

  _renderSaveLoad(isSave) {
    const W = ENGINE.W, H = ENGINE.H;
    ENGINE.rect(0, 0, W, H, '#050810');
    ENGINE.panel(80, 60, W - 160, H - 120, isSave ? 'SAVE GAME' : 'LOAD GAME');
    this._menuBtn('BACK', 10, 10, 80, 30);
    for (let i = 0; i < 3; i++) {
      const s = this.saveSlots[i];
      const y = 180 + i * 110;
      const hov = ENGINE.over(W/2 - 200, y, 400, 90);
      ENGINE.rect(W/2 - 200, y, 400, 90, hov ? '#1A1028' : '#0D1117');
      ENGINE.stroke(W/2 - 200, y, 400, 90, hov ? '#D4A574' : '#8B5E3C', 2);
      ENGINE.text('SLOT ' + (i + 1), W/2 - 188, y + 10, { size: 10, col: '#D4A574' });
      if (s) {
        ENGINE.text('Lv.' + s.level + ' — ' + s.currentScene, W/2 - 188, y + 34, { size: 9, col: '#B89070' });
        ENGINE.text(new Date(s.ts).toLocaleDateString(), W/2 - 188, y + 56, { size: 8, col: '#5A4030' });
      } else {
        ENGINE.text(isSave ? '[ Click to Save ]' : '[ Empty ]', W/2 - 188, y + 34, { size: 9, col: '#3A3030' });
      }
    }
  },

  _renderSave() { this._renderSaveLoad(true); },
  _renderLoad() { this._renderSaveLoad(false); },

  // ─── Notifications ──────────────────────────────────────────────────────────

  _showNotif(text) {
    this.notif = text;
    this.notifTimer = 2.5;
  },

  _renderNotif() {
    if (!this.notif || this.notifTimer <= 0) return;
    const W = ENGINE.W;
    const alpha = Math.min(1, this.notifTimer * 2);
    ENGINE.rect(W/2 - 200, 20, 400, 30, '#1A1028', alpha * 0.95);
    ENGINE.stroke(W/2 - 200, 20, 400, 30, '#D4A574', 1);
    ENGINE.text(this.notif, W/2, 35, { size: 9, col: '#D4A574', align: 'center', base: 'middle' });
  },

  // ─── Cathedral Runner ────────────────────────────────────────────────────────

  enterCathedral() {
    this.cathedralRoom = 0;
    this._advanceCathedral();
  },

  _advanceCathedral() {
    const rooms = CATHEDRAL_ROOMS;
    if (this.cathedralRoom >= rooms.length) {
      this._startEnding(this._pickEnding());
      return;
    }
    const room = rooms[this.cathedralRoom];
    this._gotoScene(room.id);
    if (room.combat && !this.flags['cath_cleared_' + this.cathedralRoom]) {
      const roomIdx = this.cathedralRoom;
      this._startCombat(room.combat, null);
      const prevWin = COMBAT.onWin;
      COMBAT.onWin = (xp, gold) => {
        this.flags['cath_cleared_' + roomIdx] = true;
        if (prevWin) prevWin(xp, gold);
        this.cathedralRoom = roomIdx + 1;
        setTimeout(() => this._advanceCathedral(), 800);
      };
    }
  },

  _pickEnding() {
    const doubt = this.flags.doubt_condition || 0;
    if (doubt >= 3) return 'ending_3';
    if (this.flags.veyra_spared) return 'ending_2';
    return 'ending_1';
  },

  // ─── Helpers ────────────────────────────────────────────────────────────────

  _goMode(mode) {
    this.prevMode = this.mode;
    this.mode = mode;
  }
};

// Wire up keyboard input for name entry
document.addEventListener('keydown', e => {
  if (GAME.mode === 'CHAR_SELECT' && GAME.charSelectNaming) {
    if (e.key.length === 1 && GAME.charSelectName.length < 12) {
      GAME.charSelectName += e.key;
    }
  }
});

// Boot
window.addEventListener('load', () => GAME.init());
