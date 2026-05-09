'use strict';

const COMBAT = {
  active: false,
  encounter: null,
  party: [],
  enemies: [],
  turnOrder: [],
  currentTurn: 0,
  phase: 'player_select', // player_select | skill_select | item_select | enemy_select | anim | enemy_turn | log | win | lose
  selectedAction: null,
  selectedSkill: null,
  selectedItem: null,
  log: [],
  logDisplay: '',
  logTimer: 0,
  menuScroll: 0,
  floorCollapse: false,
  collapseTimer: 0,
  choirCount: 0,
  linkedMindStacks: 0,
  doubtStage: 0,    // for final boss: 0=not started, 1=journal shown, 2=vision shown, 3=persuasion done
  onWin: null,
  onLose: null,
  animQueue: [],
  animTimer: 0,

  // Combat state for one fighter
  _makeFighter(source, isEnemy) {
    const s = isEnemy ? { ...source.stats } : source;
    return {
      name: source.name,
      sprite: source.sprite,
      isEnemy,
      maxHp: s.maxHp || s.hp, hp: s.hp,
      maxMp: s.maxMp || s.mp || 0, mp: s.mp || 0,
      str: s.str, def: s.def, mag: s.mag, res: s.res,
      spd: s.spd, wis: s.wis,
      skills: source.skills ? [...source.skills] : [],
      items: source.items ? [...source.items] : [],
      status: [], // [{name, turns}]
      buffs: {},  // {stat: value}
      evasion: 0,
      vanishing: false,
      guarding: false,
      revealed: false,
      alive: true,
      xp: source.xp || 0,
      gold: source.gold || 0,
      ai: source.ai || 'aggressive',
      weaknesses: source.weaknesses || [],
      specialOnDeath: source.specialOnDeath || null,
      phase2At: source.phase2At || null,
      classRef: source.classRef || null,
      level: source.level || 1
    };
  },

  startEncounter(encounterId, partyMembers, callbacks = {}) {
    const enc = ENCOUNTERS[encounterId];
    if (!enc) return;
    this.encounter = enc;
    this.active = true;
    this.log = [];
    this.phase = 'player_select';
    this.currentTurn = 0;
    this.doubtStage = 0;
    this.linkedMindStacks = 0;
    this.choirCount = 0;
    this.animQueue = [];
    this.onWin = callbacks.win || null;
    this.onLose = callbacks.lose || null;

    // Build party fighters
    this.party = partyMembers.map(m => ({
      ...this._makeFighter(m, false),
      skills: m.skills,
      items: [...(GAME.inventory || [])],
      classRef: m
    }));

    // Build enemy fighters
    this.enemies = enc.enemies.map(eid => {
      const edata = ENEMIES[eid];
      const f = this._makeFighter(edata, true);
      // Mirror-self: copy from first living party member
      if (eid === 'mirror_self') {
        const src = this.party[0];
        f.maxHp = Math.floor(src.maxHp / 2);
        f.hp = f.maxHp;
        f.str = src.str; f.def = src.def; f.mag = src.mag;
        f.spd = src.spd;
      }
      return f;
    });
    this.choirCount = this.enemies.filter(e => e.name === 'Choir Member').length;

    this._buildTurnOrder();
    this._addLog(enc.intro || 'Combat begins!');
  },

  _buildTurnOrder() {
    const all = [...this.party, ...this.enemies]
      .filter(f => f.alive)
      .map(f => ({ fighter: f, initiative: f.spd + Math.floor(Math.random() * 6) }))
      .sort((a, b) => b.initiative - a.initiative);
    this.turnOrder = all;
    this.currentTurn = 0;
  },

  _addLog(msg) {
    this.log.push(msg);
    this.logDisplay = msg;
    this.logTimer = 120;
  },

  _hasStatus(fighter, statusName) {
    return fighter.status.some(s => s.name === statusName);
  },

  _addStatus(fighter, name, turns) {
    if (!this._hasStatus(fighter, name)) fighter.status.push({ name, turns });
  },

  _removeStatus(fighter, name) {
    fighter.status = fighter.status.filter(s => s.name !== name);
  },

  _tickStatus(fighter) {
    fighter.status = fighter.status.map(s => ({ ...s, turns: s.turns - 1 })).filter(s => s.turns > 0);
  },

  _calcPhysDmg(attacker, defender) {
    const base = attacker.str * 1.5 + Math.floor(Math.random() * 8) + 4;
    const reduced = Math.max(1, base - defender.def * 0.6);
    return Math.round(reduced);
  },

  _calcMagDmg(attacker, defender, power = 1.5) {
    const base = attacker.mag * power + Math.floor(Math.random() * 6) + 2;
    const reduced = Math.max(1, base - defender.res * 0.4);
    return Math.round(reduced);
  },

  _applyDmg(target, amount, type = 'physical') {
    if (target.guarding) amount = Math.floor(amount / 2);
    if (this._hasStatus(target, 'shielded')) amount = Math.floor(amount / 2);
    // Fire weakness
    if (type === 'fire' && target.weaknesses.includes('fire')) amount = Math.round(amount * 1.5);
    target.hp = Math.max(0, target.hp - amount);
    if (target.hp === 0) this._knockOut(target);
    return amount;
  },

  _heal(target, amount) {
    target.hp = Math.min(target.maxHp, target.hp + amount);
  },

  _knockOut(fighter) {
    fighter.alive = false;
    fighter.hp = 0;
    this._addLog(`${fighter.name} is down!`);
    if (fighter.specialOnDeath === 'gray_blood_cloud') {
      // psychic pulse to adjacent
      this.party.forEach(p => {
        if (p.alive && Math.random() < 0.5) {
          const dmg = Math.floor(Math.random() * 6) + 1;
          this._applyDmg(p, dmg, 'psychic');
          this._addLog(`Gray mist: ${p.name} -${dmg} psychic!`);
        }
      });
    }
    if (fighter.specialOnDeath === 'last_word') {
      this.party.forEach(p => {
        if (p.alive) {
          const dmg = Math.floor(Math.random() * 6) * 4;
          const wisRoll = Math.floor(Math.random() * 20) + 1 + Math.floor((p.wis - 10) / 2);
          const final = wisRoll >= 15 ? Math.floor(dmg / 2) : dmg;
          this._applyDmg(p, final, 'psychic');
          this._addLog(`The Last Word: ${p.name} -${final}!`);
        }
      });
    }
    if (fighter.specialOnDeath === 'linked_mind_buff') {
      this.linkedMindStacks++;
      this.enemies.filter(e => e.alive && e.name === 'Choir Member').forEach(e => {
        e.str += 1; e.mag += 1;
      });
      if (this.enemies.filter(e => e.alive).length > 0) {
        this._addLog(`Linked Mind: remaining Choir gain +1 attack!`);
      }
    }
    if (fighter.specialOnDeath === 'hollow_rises' && !GAME.flags['DOUBT_CONDITION_MET']) {
      // Ending 3
      setTimeout(() => {
        if (this.onWin) this.onWin('ending_3');
      }, 2000);
    }
  },

  // Player performs action
  doAttack(attacker, target) {
    if (this._hasStatus(attacker, 'paralyzed')) {
      this._addLog(`${attacker.name} is paralyzed and cannot act!`);
      this._endTurn(); return;
    }
    if (this._hasStatus(attacker, 'dreamtouched') && Math.random() < 0.3) {
      this._addLog(`${attacker.name} is confused!`);
      const randomTarget = [...this.party, ...this.enemies].filter(f => f.alive)[Math.floor(Math.random() * 2)];
      target = randomTarget;
    }
    let dmg = this._calcPhysDmg(attacker, target);
    if (attacker.vanishing) { dmg = Math.round(dmg * 1.5); attacker.vanishing = false; }
    const actual = this._applyDmg(target, dmg);
    this._addLog(`${attacker.name} attacks ${target.name} for ${actual} damage!`);
    this._endTurn();
  },

  doSkill(attacker, skillId, targets) {
    const skill = SKILLS[skillId];
    if (!skill) { this._endTurn(); return; }
    if (attacker.mp < skill.mp) {
      this._addLog('Not enough MP!'); return;
    }
    attacker.mp = Math.max(0, attacker.mp - skill.mp);

    switch (skill.effect) {
      case 'stun':
        if (targets[0]) { this._addStatus(targets[0], 'stunned', 1); this._addLog(`${targets[0].name} is stunned!`); }
        break;
      case 'defbuff':
        this.party.filter(p => p.alive).forEach(p => { p.def += skill.power || 2; this._addLog(`${p.name} DEF up!`); });
        break;
      case 'immuneDream':
        if (targets[0]) { this._addStatus(targets[0], 'immune_dream', skill.turns || 3); this._addLog(`${targets[0].name} immune to Dreamtouched!`); }
        break;
      case 'guard':
        attacker.guarding = true; this._addLog(`${attacker.name} guards!`);
        break;
      case 'heavy': {
        const t = targets[0];
        if (t) { const d = Math.round(this._calcPhysDmg(attacker, t) * (skill.power || 1.5)); const a = this._applyDmg(t, d); this._removeStatus(t,'shielded'); this._addLog(`${attacker.name} anchor blow: ${t.name} -${a}!`); }
        break;
      }
      case 'magic': {
        const t = targets[0];
        if (t) { const d = this._calcMagDmg(attacker, t, skill.power || 1.5); const a = this._applyDmg(t, d, 'magic'); this._addLog(`${attacker.name} casts ${skill.name}: ${t.name} -${a}!`); }
        break;
      }
      case 'reveal':
        if (targets[0]) { targets[0].revealed = true; this._addLog(`${targets[0].name} stats revealed!`); }
        break;
      case 'dispel':
        if (targets[0]) {
          if (targets[0].isEnemy && targets[0].status.length > 0) { targets[0].status.pop(); this._addLog(`Dispelled buff from ${targets[0].name}!`); }
          else if (!targets[0].isEnemy && targets[0].status.some(s => ['dreamtouched','paralyzed','blind'].includes(s.name))) {
            targets[0].status = targets[0].status.filter(s => !['dreamtouched','paralyzed','blind'].includes(s.name));
            this._addLog(`Dispelled status from ${targets[0].name}!`);
          }
        }
        break;
      case 'magic_paralyze': {
        const t = targets[0];
        if (t) { const d = this._calcMagDmg(attacker, t, skill.power || 1.2); const a = this._applyDmg(t, d, 'magic'); this._addStatus(t,'paralyzed',1); this._addLog(`${t.name} -${a} and paralyzed!`); }
        break;
      }
      case 'seal':
        if (targets[0] && targets[0].weaknesses.includes('binding_magic')) {
          targets[0].str = Math.round(targets[0].str * 0.8);
          targets[0].mag = Math.round(targets[0].mag * 0.8);
          targets[0].def = Math.round(targets[0].def * 0.8);
          this._addLog(`Seal Fragment weakens ${targets[0].name}!`);
        }
        break;
      case 'slow': {
        const t = targets[0];
        if (t) { const d = this._calcPhysDmg(attacker, t); const a = this._applyDmg(t, d); t.spd = Math.max(1, t.spd - (skill.power || 4)); this._addLog(`${t.name} -${a} and slowed!`); }
        break;
      }
      case 'evade':
        attacker.evasion += 30; this._addStatus(attacker, 'evading', 1); this._addLog(`${attacker.name} evades!`);
        break;
      case 'bonusDmg': {
        const t = targets[0];
        if (t) {
          const bonus = (this._hasStatus(t,'stunned') || this._hasStatus(t,'paralyzed')) ? skill.power : 1.0;
          const d = Math.round(this._calcPhysDmg(attacker, t) * bonus);
          const a = this._applyDmg(t, d);
          this._addLog(`${attacker.name} exploits weakness: ${t.name} -${a}!`);
        }
        break;
      }
      case 'sureHit': {
        const t = targets[0];
        if (t) { const d = Math.round(attacker.str * (skill.power || 1.0) + 6); const a = this._applyDmg(t, d); this._addLog(`Precise shot: ${t.name} -${a}!`); }
        break;
      }
      case 'vanish':
        attacker.vanishing = true; this._addStatus(attacker, 'vanishing', 1); this._addLog(`${attacker.name} vanishes!`);
        break;
      case 'heal': {
        const t = targets[0];
        if (t) { const h = Math.round(t.maxHp * (skill.power || 0.4)); this._heal(t, h); this._addLog(`${attacker.name} mends ${t.name} for ${h} HP!`); }
        break;
      }
      case 'cure':
        if (targets[0]) {
          (skill.cure || []).forEach(s => this._removeStatus(targets[0], s));
          this._addLog(`${targets[0].name} cured!`);
        }
        break;
      case 'wisUp':
        if (targets[0]) { targets[0].wis += skill.power || 6; this._addStatus(targets[0], 'warding', skill.turns || 3); this._addLog(`${targets[0].name} WIS up!`); }
        break;
      case 'debuff':
        if (targets[0]) {
          targets[0].def -= skill.power || 4; targets[0].res -= skill.power || 4;
          this._addStatus(targets[0], 'blighted', skill.turns || 3);
          this._addLog(`${targets[0].name} weakened!`);
        }
        break;
      case 'secondSight':
        this.enemies.forEach(e => { e.revealed = true; });
        this._addLog('All enemy weaknesses revealed!');
        // Special: in final boss, advance doubt stage
        if (this.encounter && this.encounter.doubt_mechanic) {
          this.doubtStage = Math.max(this.doubtStage, 1);
        }
        break;
      case 'fire': {
        const targets_ = this.enemies.filter(e => e.alive);
        targets_.forEach(t => {
          const d = this._calcMagDmg(attacker, t, skill.power || 0.8);
          const a = this._applyDmg(t, d, 'fire');
          this._addLog(`Flash Fire: ${t.name} -${a}!`);
        });
        break;
      }
      case 'rangePhys': {
        const t = targets[0];
        if (t) { const d = Math.round(this._calcPhysDmg(attacker, t) * (skill.power || 1.2)); const a = this._applyDmg(t, d); this._addLog(`${attacker.name} hurls arm: ${t.name} -${a}!`); }
        break;
      }
      default:
        this._addLog(`${attacker.name} uses ${skill.name}!`);
    }
    this._endTurn();
  },

  doItem(user, itemId, target) {
    const item = ITEMS[itemId];
    if (!item) { this._endTurn(); return; }
    if (item.hp) { this._heal(target, item.hp); this._addLog(`${user.name} uses ${item.name}: ${target.name} +${item.hp} HP!`); }
    if (item.cure) { this._removeStatus(target, item.cure); this._addLog(`${target.name} cured of ${item.cure}!`); }
    if (item.revive && !target.alive) { target.alive = true; target.hp = 1; this._addLog(`${target.name} revived!`); }
    if (item.wisBoost) { target.wis += item.wisBoost; this._addLog(`${target.name} WIS +${item.wisBoost}!`); }
    // Remove from inventory
    const inv = GAME.inventory;
    const idx = inv.indexOf(itemId);
    if (idx !== -1) inv.splice(idx, 1);
    this._endTurn();
  },

  doDefend(fighter) {
    fighter.guarding = true;
    fighter.evasion += 10;
    this._addLog(`${fighter.name} defends!`);
    this._endTurn();
  },

  // ── Enemy AI ──────────────────────────────────────────────────────────────
  _doEnemyTurn(enemy) {
    if (!enemy.alive) { this._endTurn(); return; }
    this._tickStatus(enemy);

    if (this._hasStatus(enemy, 'paralyzed') || this._hasStatus(enemy, 'stunned')) {
      this._addLog(`${enemy.name} is immobilized!`);
      this._endTurn(); return;
    }

    const livingParty = this.party.filter(p => p.alive);
    if (livingParty.length === 0) { this._checkVictory(); return; }

    switch (enemy.ai) {
      case 'aggressive':
      case 'commander': {
        const target = livingParty[Math.floor(Math.random() * livingParty.length)];
        // Commander's Will for captain
        let dmg = this._calcPhysDmg(enemy, target);
        if (enemy.ai === 'commander') {
          this.enemies.forEach(e => { if (e.alive && e !== enemy) e.str = Math.min(e.str + 2, enemy.str); });
        }
        // Dream-Step at half HP
        if (enemy.hp <= enemy.maxHp / 2 && !this._hasStatus(enemy, 'dream_stepped')) {
          this._addStatus(enemy, 'dream_stepped', 1);
          this._addStatus(enemy, 'vanishing', 1);
          this._addLog(`${enemy.name} vanishes!`);
          this._endTurn(); return;
        }
        const evadeRoll = Math.random() * 100;
        if (evadeRoll < target.evasion) { this._addLog(`${enemy.name} misses ${target.name}!`); this._endTurn(); return; }
        const actual = this._applyDmg(target, dmg);
        // Psychic edge for Pale Blade
        const psychic = Math.floor(Math.random() * 4) + 1;
        this._applyDmg(target, psychic, 'psychic');
        this._addLog(`${enemy.name} strikes ${target.name} for ${actual}+${psychic} psychic!`);
        // Chance to inflict dreamtouched
        if (Math.random() < 0.15) { this._addStatus(target, 'dreamtouched', 2); this._addLog(`${target.name} is Dreamtouched!`); }
        break;
      }
      case 'support': {
        // Choir — crowd control and linked mind
        const roll = Math.random();
        const target = livingParty[Math.floor(Math.random() * livingParty.length)];
        if (roll < 0.3) {
          this._addStatus(target, 'paralyzed', 1);
          this._addLog(`${enemy.name} whispers: ${target.name} paralyzed!`);
        } else if (roll < 0.5) {
          const dmg = this._calcMagDmg(enemy, target, 0.8);
          const actual = this._applyDmg(target, dmg, 'psychic');
          this._addLog(`${enemy.name} hollow touch: ${target.name} -${actual}!`);
        } else {
          const dmg = this._calcPhysDmg(enemy, target);
          const actual = this._applyDmg(target, dmg);
          this._addLog(`${enemy.name} attacks ${target.name} for ${actual}!`);
        }
        break;
      }
      case 'cleric_enemy': {
        const roll = Math.random();
        if (roll < 0.25) {
          this._addStatus(livingParty[0], 'paralyzed', 1);
          this._addLog(`${enemy.name}: ${livingParty[0].name} is held!`);
        } else if (roll < 0.45) {
          const healTarget = this.enemies.find(e => e.alive && e.hp < e.maxHp * 0.6);
          if (healTarget) { const h = 20; this._heal(healTarget, h); this._addLog(`${enemy.name} heals ${healTarget.name} for ${h}!`); break; }
        }
        const target = livingParty[Math.floor(Math.random() * livingParty.length)];
        const dmg = this._calcPhysDmg(enemy, target);
        const actual = this._applyDmg(target, dmg);
        this._addLog(`${enemy.name} mace: ${target.name} -${actual}!`);
        break;
      }
      case 'pack': {
        const target = livingParty.sort((a, b) => a.def - b.def)[0];
        const dmg = this._calcPhysDmg(enemy, target);
        const actual = this._applyDmg(target, dmg, 'cold');
        this._addLog(`${enemy.name} bites ${target.name} for ${actual}!`);
        if (Math.random() < 0.35) { this._addStatus(target, 'blind', 1); this._addLog(`${target.name} is Brine-blind!`); }
        break;
      }
      case 'ambush': {
        const target = livingParty[Math.floor(Math.random() * livingParty.length)];
        const dmg = this._calcPhysDmg(enemy, target);
        const actual = this._applyDmg(target, dmg, 'fire');
        this._addLog(`${enemy.name} bites ${target.name} for ${actual} (fire)!`);
        if (this._hasStatus(target, 'grappled')) { const fd = 2; this._applyDmg(target, fd, 'fire'); this._addLog(`Hot blood: ${target.name} -${fd}!`); }
        break;
      }
      case 'passive_attacker': {
        const paralyzed = this.party.filter(p => p.alive && this._hasStatus(p, 'paralyzed'));
        const tlist = paralyzed.length > 0 ? paralyzed : [];
        if (tlist.length > 0) {
          const target = tlist[Math.floor(Math.random() * tlist.length)];
          const dmg = enemy.mag * 2 + 8;
          const actual = this._applyDmg(target, dmg, 'psychic');
          this._addLog(`${enemy.name} mind-touch: ${target.name} -${actual}!`);
        } else {
          this._addLog(`${enemy.name} whispers. All make WIS save or...`);
          this.party.filter(p => p.alive).forEach(p => {
            const roll = Math.floor(Math.random() * 20) + 1 + Math.floor((p.wis - 10) / 2);
            if (roll < 13) { this._addStatus(p, 'paralyzed', 1); this._addLog(`${p.name} is paralyzed!`); }
          });
        }
        break;
      }
      case 'mirror': {
        const target = this.party.filter(p => p.alive)[0];
        if (target) {
          const dmg = Math.floor(target.str * 1.2 + 4);
          const actual = this._applyDmg(target, dmg);
          this._addLog(`Mirror-Self attacks ${target.name} for ${actual}!`);
        }
        break;
      }
      case 'boss_veyra': {
        this._veyraAI(enemy);
        break;
      }
      default: {
        const target = livingParty[Math.floor(Math.random() * livingParty.length)];
        const dmg = this._calcPhysDmg(enemy, target);
        const actual = this._applyDmg(target, dmg);
        this._addLog(`${enemy.name} attacks ${target.name} for ${actual}!`);
      }
    }
    this._endTurn();
  },

  _veyraAI(veyra) {
    const livingParty = this.party.filter(p => p.alive);
    if (livingParty.length === 0) { this._checkVictory(); return; }

    // Binding Aura — psychic damage to all
    livingParty.forEach(p => {
      const roll = Math.floor(Math.random() * 10) + 1;
      const a = this._applyDmg(p, roll, 'psychic');
      this._addLog(`Binding Aura: ${p.name} -${a} psychic!`);
    });

    const roll = Math.random();
    const target = livingParty[Math.floor(Math.random() * livingParty.length)];

    if (roll < 0.2) {
      // The Voice — stun one
      const wisRoll = Math.floor(Math.random() * 20) + 1 + Math.floor((target.wis - 10) / 2);
      if (wisRoll < 18) { this._addStatus(target, 'stunned', 1); this._addLog(`The Voice: ${target.name} stunned!`); }
      else { this._addLog(`${target.name} resists The Voice!`); }
    } else if (roll < 0.4) {
      // Dominate Person
      const wisRoll = Math.floor(Math.random() * 20) + 1 + Math.floor((target.wis - 10) / 2);
      if (wisRoll < 18) { this._addStatus(target, 'dreamtouched', 2); this._addLog(`${target.name} dominated!`); }
    } else if (roll < 0.6) {
      // Finger of Death on lowest HP
      const lowestHp = [...livingParty].sort((a,b) => a.hp - b.hp)[0];
      const dmg = veyra.mag * 2;
      const actual = this._applyDmg(lowestHp, dmg, 'psychic');
      this._addLog(`Finger of Death: ${lowestHp.name} -${actual}!`);
    } else {
      // Hollow Touch multiattack
      const targets = livingParty.slice(0, 2);
      targets.forEach(t => {
        const dmg = this._calcMagDmg(veyra, t, 2.0);
        const actual = this._applyDmg(t, dmg, 'psychic');
        this._addLog(`Hollow Touch: ${t.name} -${actual}!`);
      });
    }
  },

  _endTurn() {
    // Tick status on current fighter
    const cur = this.turnOrder[this.currentTurn]?.fighter;
    if (cur) { this._tickStatus(cur); cur.guarding = false; }

    this.currentTurn = (this.currentTurn + 1) % this.turnOrder.length;
    // Skip dead fighters
    let safety = 0;
    while (this.turnOrder[this.currentTurn] && !this.turnOrder[this.currentTurn].fighter.alive) {
      this.currentTurn = (this.currentTurn + 1) % this.turnOrder.length;
      if (++safety > 20) break;
    }
    // Check if all enemies or all party dead
    if (this._checkVictory()) return;
    // Remove dead from turn order and rebuild if needed
    if (!this.turnOrder[this.currentTurn]?.fighter.alive) {
      this.turnOrder = this.turnOrder.filter(t => t.fighter.alive);
      this.currentTurn = 0;
    }
    const next = this.turnOrder[this.currentTurn]?.fighter;
    if (next && next.isEnemy) {
      this.phase = 'enemy_turn';
    } else {
      this.phase = 'player_select';
      this.selectedAction = null;
    }
  },

  _checkVictory() {
    const allEnemiesDead = this.enemies.every(e => !e.alive);
    const allPartyDead = this.party.every(p => !p.alive);

    if (allEnemiesDead) {
      this.phase = 'win';
      // Award XP and gold
      const xpGained = this.enemies.reduce((sum, e) => sum + (e.xp || 0), 0);
      const goldGained = this.enemies.reduce((sum, e) => sum + (e.gold || 0), 0);
      GAME.gold = (GAME.gold || 0) + goldGained;
      GAME.awardXP(xpGained);
      this._addLog(`Victory! ${xpGained} XP, ${goldGained} gold!`);
      setTimeout(() => { if (this.onWin) this.onWin('victory'); }, 2000);
      return true;
    }
    if (allPartyDead) {
      this.phase = 'lose';
      this._addLog('The party falls...');
      setTimeout(() => { if (this.onLose) this.onLose(); }, 2000);
      return true;
    }
    return false;
  },

  // ── Rendering ─────────────────────────────────────────────────────────────
  render() {
    if (!this.active) return;
    const E = ENGINE;
    E.frame++;

    // Background
    SCENES_ART.drawBackground(this.encounter?.bg || 'road_arrival');
    // Dark overlay
    E.rect(0, 0, E.W, E.H, '#000000', 0.4);

    // Enemy area (top 280px)
    this._renderEnemies();

    // Party area (middle)
    this._renderParty();

    // Turn order sidebar
    this._renderTurnOrder();

    // Command menu / log (bottom)
    this._renderCommandMenu();

    // Log overlay
    if (this.logTimer > 0) {
      this.logTimer--;
      E.panel(10, E.H - 120, 780, 90);
      E.text(this.logDisplay, 30, E.H - 100, { size: 11, col: '#E8D8C0', maxW: 740, lineH: 18 });
    }

    // Win/lose screen
    if (this.phase === 'win') {
      E.rect(0, 0, E.W, E.H, '#000000', 0.7);
      E.text('VICTORY', E.W/2, E.H/2 - 40, { size: 32, col: '#D4A574', align: 'center', shadow: '#D4A574', shadowBlur: 20 });
    }
    if (this.phase === 'lose') {
      E.rect(0, 0, E.W, E.H, '#000000', 0.8);
      E.text('DEFEATED', E.W/2, E.H/2 - 40, { size: 32, col: '#AA2222', align: 'center', shadow: '#AA2222', shadowBlur: 20 });
      E.text('Your party will revive at the last save.', E.W/2, E.H/2 + 20, { size: 10, col: '#888888', align: 'center' });
    }

    // Handle enemy turn
    if (this.phase === 'enemy_turn') {
      const cur = this.turnOrder[this.currentTurn]?.fighter;
      if (cur && cur.isEnemy) {
        this.phase = 'animating';
        setTimeout(() => {
          this._doEnemyTurn(cur);
        }, 800);
      }
    }

    E.scanlines();
  },

  _renderEnemies() {
    const E = ENGINE;
    const living = this.enemies.filter(e => e.alive);
    const totalW = living.length * 160;
    const startX = (E.W - totalW) / 2;

    living.forEach((enemy, i) => {
      const ex = startX + i * 160 + 30;
      const ey = 60;
      // Sprite
      const spr = SPRITES[enemy.sprite];
      if (spr) E.sprite(spr, ex, ey, 5);
      else E.rect(ex, ey, 80, 80, '#AA2222');

      // HP bar
      E.rect(ex - 10, ey + 90, 100, 10, '#333333');
      E.rect(ex - 10, ey + 90, Math.floor(100 * enemy.hp / enemy.maxHp), 10, '#CC2222');
      E.stroke(ex - 10, ey + 90, 100, 10, '#555555', 1);

      // Name
      E.text(enemy.name, ex + 40, ey + 104, { size: 7, col: '#DDDDDD', align: 'center' });

      // Stats if revealed
      if (enemy.revealed) {
        E.text(`HP:${enemy.hp}/${enemy.maxHp}`, ex - 10, ey + 114, { size: 6, col: '#AAAAAA' });
        E.text(`AT:${enemy.str} DF:${enemy.def}`, ex - 10, ey + 124, { size: 6, col: '#AAAAAA' });
      }

      // Status icons
      enemy.status.forEach((s, si) => {
        const col = s.name === 'dreamtouched' ? '#9966CC' : s.name === 'paralyzed' ? '#6699CC' : '#CCAA33';
        E.rect(ex - 10 + si * 16, ey + 84, 14, 6, col);
      });

      // Selected flash
      if (this.phase === 'enemy_select' && E.over(ex - 10, ey, 100, 110)) {
        E.rect(ex - 10, ey, 100, 110, '#FFCC00', 0.2);
        if (E.click && E.clicked(ex - 10, ey, 100, 110)) {
          this._onEnemyClicked(enemy);
        }
      }
    });
  },

  _renderParty() {
    const E = ENGINE;
    this.party.forEach((member, i) => {
      const px = 40 + i * 200;
      const py = 340;

      if (!member.alive) {
        E.text('KO', px + 30, py + 40, { size: 12, col: '#AA2222', align: 'center' });
        E.rect(px, py, 100, 70, '#220000', 0.5);
        return;
      }

      // Sprite
      const spr = SPRITES[member.sprite || member.classRef?.sprite];
      if (spr) E.sprite(spr, px, py, 3);
      else E.rect(px, py, 48, 48, '#2244AA');

      // HP bar
      E.rect(px - 5, py + 56, 100, 8, '#222222');
      E.rect(px - 5, py + 56, Math.floor(100 * member.hp / member.maxHp), 8, member.hp < member.maxHp * 0.25 ? '#CC2222' : '#22CC44');
      // MP bar
      E.rect(px - 5, py + 66, 100, 6, '#111122');
      E.rect(px - 5, py + 66, Math.floor(100 * (member.mp / member.maxMp || 0)), 6, '#2244CC');

      // Name and HP
      E.text(member.name, px + 48, py + 56, { size: 7, col: '#E8D8C0', align: 'center' });
      E.text(`${member.hp}/${member.maxHp}`, px + 48, py + 74, { size: 6, col: '#AAAAAA', align: 'center' });

      // Status
      member.status.forEach((s, si) => {
        const col = s.name === 'dreamtouched' ? '#9966CC' : '#6699CC';
        E.rect(px - 5 + si * 16, py + 82, 14, 5, col);
        E.text(s.name[0].toUpperCase(), px - 5 + si * 16 + 4, py + 82, { size: 4, col: '#FFFFFF' });
      });

      // Current turn highlight
      const curFighter = this.turnOrder[this.currentTurn]?.fighter;
      if (curFighter === member) E.stroke(px - 4, py - 4, 108, 100, '#FFD700', 2);
    });
  },

  _renderTurnOrder() {
    const E = ENGINE;
    E.panel(820, 40, 140, 300, 'TURN');
    this.turnOrder.slice(0, 8).forEach((t, i) => {
      if (!t.fighter.alive) return;
      const ty = 70 + i * 30;
      const col = t.fighter.isEnemy ? '#CC4444' : '#4488CC';
      E.rect(830, ty, 120, 22, i === 0 ? col : '#111111');
      E.rect(832, ty + 2, Math.floor(120 * t.fighter.hp / t.fighter.maxHp), 18, col, i === 0 ? 0.6 : 0.3);
      E.text(t.fighter.name.substring(0, 12), 842, ty + 6, { size: 7, col: i === 0 ? '#FFFFFF' : '#888888' });
    });
  },

  _renderCommandMenu() {
    const E = ENGINE;
    if (this.phase !== 'player_select' && this.phase !== 'skill_select' && this.phase !== 'item_select' && this.phase !== 'enemy_select') return;

    const curFighter = this.turnOrder[this.currentTurn]?.fighter;
    if (!curFighter || curFighter.isEnemy) return;

    E.panel(10, 440, 400, 190, curFighter.name);

    if (this.phase === 'player_select') {
      const actions = ['FIGHT','SKILL','ITEM','DEFEND'];
      actions.forEach((act, i) => {
        const bx = 20 + (i % 2) * 190, by = 470 + Math.floor(i / 2) * 60;
        if (E.button(act, bx, by, 170, 50, { size: 12 })) {
          this.selectedAction = act;
          if (act === 'FIGHT') { this.phase = 'enemy_select'; E.consumeClick(); }
          else if (act === 'SKILL') { this.phase = 'skill_select'; this.menuScroll = 0; E.consumeClick(); }
          else if (act === 'ITEM') { this.phase = 'item_select'; this.menuScroll = 0; E.consumeClick(); }
          else if (act === 'DEFEND') { this.doDefend(curFighter); E.consumeClick(); }
        }
      });
    }

    if (this.phase === 'skill_select') {
      E.text('SELECT SKILL', 30, 458, { size: 9, col: '#D4A574' });
      const skills = curFighter.skills || [];
      skills.slice(this.menuScroll, this.menuScroll + 4).forEach((sid, i) => {
        const skill = SKILLS[sid];
        if (!skill) return;
        const by = 476 + i * 38;
        const canUse = curFighter.mp >= skill.mp;
        const col = canUse ? '#D4A574' : '#555544';
        if (E.button(`${skill.name} (${skill.mp}MP)`, 20, by, 380, 32, { size: 8, col })) {
          if (canUse) {
            this.selectedSkill = sid;
            this.phase = skill.target === 'ally' || skill.target === 'allies' || skill.target === 'self' ? 'ally_select' : 'enemy_select';
            if (skill.target === 'self') { this.doSkill(curFighter, sid, [curFighter]); E.consumeClick(); }
            else if (skill.target === 'allies') { this.doSkill(curFighter, sid, this.party.filter(p => p.alive)); E.consumeClick(); }
            else if (skill.target === 'all_enemies') { this.doSkill(curFighter, sid, this.enemies.filter(e => e.alive)); E.consumeClick(); }
            else if (skill.target === 'any') {
              this.phase = 'enemy_select'; E.consumeClick();
            }
            else { this.phase = 'enemy_select'; E.consumeClick(); }
          }
        }
      });
      if (E.button('◄ BACK', 20, 598, 100, 28, { size: 8 })) { this.phase = 'player_select'; E.consumeClick(); }
    }

    if (this.phase === 'item_select') {
      E.text('SELECT ITEM', 30, 458, { size: 9, col: '#D4A574' });
      const inv = (GAME.inventory || []);
      const usable = inv.filter(id => ITEMS[id] && (ITEMS[id].hp || ITEMS[id].cure || ITEMS[id].revive || ITEMS[id].wisBoost));
      usable.slice(this.menuScroll, this.menuScroll + 4).forEach((id, i) => {
        const item = ITEMS[id];
        const by = 476 + i * 38;
        if (E.button(item.name, 20, by, 380, 32, { size: 8 })) {
          this.selectedItem = id;
          this.phase = 'ally_for_item';
          E.consumeClick();
        }
      });
      if (usable.length === 0) E.text('No usable items.', 30, 490, { size: 9, col: '#555544' });
      if (E.button('◄ BACK', 20, 598, 100, 28, { size: 8 })) { this.phase = 'player_select'; E.consumeClick(); }
    }

    // Ally selection for items/heal skills
    if (this.phase === 'ally_for_item') {
      E.text('SELECT ALLY', 30, 458, { size: 9, col: '#D4A574' });
      this.party.forEach((p, i) => {
        const by = 476 + i * 38;
        const label = `${p.name}  HP:${p.hp}/${p.maxHp}`;
        if (E.button(label, 20, by, 380, 32, { size: 8, col: p.alive ? '#D4A574' : '#555544' })) {
          if (p.alive || ITEMS[this.selectedItem]?.revive) {
            this.doItem(curFighter, this.selectedItem, p);
            E.consumeClick();
          }
        }
      });
      if (E.button('◄ BACK', 20, 598, 100, 28, { size: 8 })) { this.phase = 'item_select'; E.consumeClick(); }
    }

    // Doubt mechanic panel (final boss)
    if (this.encounter?.doubt_mechanic && curFighter && !curFighter.isEnemy) {
      E.panel(420, 440, 380, 190, 'DOUBT CONDITION');
      const items = [
        { label: 'Show Aratha-Sin\'s Journal', done: this.doubtStage >= 1, flag: 'aratha_journal', action: () => { this.doubtStage = Math.max(1, this.doubtStage); this._addLog('You show Veyra the binding journals...'); this._endTurn(); } },
        { label: 'Share the Vision', done: this.doubtStage >= 2, flag_needed: 'VISION_SEEN', action: () => { this.doubtStage = Math.max(2, this.doubtStage); this._addLog('You describe what you saw in the sea-eye pool...'); this._endTurn(); } },
        { label: 'Make Your Case (DC 18 Persuasion)', done: this.doubtStage >= 3, needs: [1,2], action: () => { this._attemptDoubt(curFighter); } }
      ];
      items.forEach((item, i) => {
        const by = 468 + i * 50;
        const canUse = !item.done && (item.flag ? GAME.inventory?.includes(item.flag) || GAME.flags?.[item.flag] : true) && (!item.needs || item.needs.every(n => this.doubtStage >= n)) && (!item.flag_needed || GAME.flags?.[item.flag_needed]);
        const col = item.done ? '#44AA44' : canUse ? '#D4A574' : '#555544';
        if (E.button(item.label, 430, by, 360, 40, { size: 7, col })) {
          if (canUse) { item.action(); E.consumeClick(); }
        }
        if (item.done) E.text('✓', 430 + 345, by + 12, { size: 12, col: '#44AA44' });
      });
    }
  },

  _onEnemyClicked(enemy) {
    const curFighter = this.turnOrder[this.currentTurn]?.fighter;
    if (!curFighter || curFighter.isEnemy) return;

    if (this.selectedAction === 'FIGHT') {
      this.doAttack(curFighter, enemy);
    } else if (this.selectedAction === 'SKILL' && this.selectedSkill) {
      this.doSkill(curFighter, this.selectedSkill, [enemy]);
    }
    ENGINE.consumeClick();
  },

  _attemptDoubt(attacker) {
    if (this.doubtStage < 2) { this._addLog('You need the journal and the vision first.'); return; }
    const roll = Math.floor(Math.random() * 20) + 1 + Math.floor((attacker.wis - 10) / 2);
    if (roll >= 18) {
      this.doubtStage = 3;
      GAME.flags['DOUBT_CONDITION_MET'] = true;
      this._addLog('Veyra freezes. The Hollow shrieks. Something is changing...');
      setTimeout(() => {
        COMBAT.active = false;
        GAME._startDialogue('veyra_persuasion_success');
      }, 2000);
    } else {
      this._addLog(`The words don't reach her. Roll was ${roll}, needed 18.`);
      this.phase = 'player_select';
    }
    ENGINE.consumeClick();
  }
};
