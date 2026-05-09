'use strict';

// ─── ITEMS ────────────────────────────────────────────────────────────────────
const ITEMS = {
  healing_draught:   { name: 'Healing Draught',     type: 'consumable', hp: 30,  gold: 50,  icon: '🍶', desc: 'Restore 30 HP to one ally.' },
  greater_healing:   { name: 'Greater Healing',     type: 'consumable', hp: 80,  gold: 150, icon: '🍶', desc: 'Restore 80 HP to one ally.' },
  dreamwort_tea:     { name: 'Dreamwort Tea',        type: 'consumable', cure: 'dreamtouched', gold: 30, icon: '🍵', desc: 'Remove Dreamtouched from one ally.' },
  brine_salt:        { name: 'Brine Salt',           type: 'consumable', cure: 'blind',        gold: 20, icon: '🧂', desc: 'Remove Brine-blind from one ally.' },
  revive_herb:       { name: 'Revive Herb',          type: 'consumable', revive: true,         gold: 200, icon: '🌿', desc: 'Revive a fallen ally with 1 HP.' },
  anchor_fragment:   { name: 'Anchor Fragment',      type: 'consumable', wisBoost: 5,          gold: 100, icon: '🪨', desc: '+5 WIS for one combat.' },
  hound_pendant:     { name: 'Hound Pendant',        type: 'quest',      gold: 0,  desc: 'A carved stone: a circle with a mouth.' },
  hound_signet:      { name: 'Hound Signet',         type: 'quest',      gold: 80, desc: "A Pale Hound officer's gold signet ring." },
  courier_strap:     { name: "Courier's Strap",      type: 'quest',      gold: 0,  desc: 'A courier pouch strap, cut clean.' },
  sealed_letter:     { name: 'Sealed Letter',        type: 'quest',      gold: 0,  desc: "Sereth's seal. A forged assassination order." },
  eddik_journal:     { name: "Eddik's Journal",      type: 'quest',      gold: 0,  desc: 'A pre-Fall fragment. "we are the cracks."' },
  kessith_journal:   { name: "Kessith's Journal",    type: 'quest',      gold: 0,  desc: 'Dreams of a kind voice. Proof of Veyra.' },
  calvix_dossier:    { name: "Calvix's Dossier",     type: 'quest',      gold: 0,  desc: "The spymaster's three years of evidence." },
  aratha_journal:    { name: "Aratha-Sin's Journal", type: 'key',        gold: 0,  desc: 'The original binding ritual. Written 10,000 years ago.' },
  recording_1:       { name: 'Recording (I)',         type: 'key',        gold: 0,  desc: 'Pre-Fall voices speak the binding ritual.' },
  recording_2:       { name: 'Recording (II)',        type: 'key',        gold: 0,  desc: 'Pre-Fall voices speak the binding ritual.' },
  recording_3:       { name: 'Recording (III)',       type: 'key',        gold: 0,  desc: 'Pre-Fall voices speak the binding ritual.' },
  binder_token:      { name: "Binder's Token",       type: 'key',        gold: 0,  desc: 'A carved stone disk, warm to the touch.' },
  tomas_scroll_dm:   { name: 'Scroll of Detect Magic', type: 'consumable', gold: 40, desc: 'Reveals magical auras. One use.' },
  tomas_scroll_cl:   { name: 'Scroll of Comprehend Lang', type: 'consumable', gold: 40, desc: 'Read any language for 1 hour. One use.' },
  pale_blade:        { name: 'Pale Blade',           type: 'weapon',     atk: 4, gold: 120, desc: 'A Hound weapon. +4 ATK, deals psychic edge.' },
  cloak_protection:  { name: 'Cloak of Protection',  type: 'armor',      def: 2, gold: 180, desc: '+2 DEF, +1 to all saves.' },
  obsidian_shard:    { name: 'Obsidian Shard',       type: 'consumable', gold: 0,  desc: 'Advantage on first WIS save vs. Veyra. One use.' },
};

// ─── CHARACTER CLASSES ────────────────────────────────────────────────────────
const CLASSES = {
  warden: {
    name: 'Warden', sprite: 'warden',
    desc: 'An ex-soldier who survived something they will not name.',
    baseStats: { hp: 120, mp: 40, str: 14, def: 12, mag: 6, res: 8, spd: 10, wis: 14 },
    hpPerLevel: 18, mpPerLevel: 5,
    skills: ['shield_bash','rallying_cry','iron_will','guardians_stand','anchor_blow'],
    skillLevels: [1, 2, 3, 5, 7]
  },
  scholar: {
    name: 'Scholar', sprite: 'scholar',
    desc: 'A student of forbidden texts, traveling under a false identity.',
    baseStats: { hp: 70, mp: 90, str: 6, def: 4, mag: 16, res: 10, spd: 11, wis: 12 },
    hpPerLevel: 10, mpPerLevel: 14,
    skills: ['binding_bolt','arcane_insight','dispel','dream_pierce','seal_fragment'],
    skillLevels: [1, 2, 3, 5, 7]
  },
  blade: {
    name: 'Blade', sprite: 'blade',
    desc: 'A mercenary with a reputation for finishing the job.',
    baseStats: { hp: 90, mp: 50, str: 16, def: 6, mag: 5, res: 6, spd: 16, wis: 8 },
    hpPerLevel: 14, mpPerLevel: 7,
    skills: ['crippling_strike','shadow_step','exploit_weakness','precise_shot','vanish'],
    skillLevels: [1, 2, 3, 5, 7]
  },
  hedge_witch: {
    name: 'Hedge-Witch', sprite: 'hedge_witch',
    desc: 'A hedge-mage operating illegally in the Ashen Vale.',
    baseStats: { hp: 85, mp: 75, str: 7, def: 7, mag: 12, res: 8, spd: 10, wis: 15 },
    hpPerLevel: 12, mpPerLevel: 11,
    skills: ['mend','dreamwort_remedy','warding_charm','blight_curse','second_sight'],
    skillLevels: [1, 2, 3, 5, 7]
  }
};

// ─── SKILLS ───────────────────────────────────────────────────────────────────
const SKILLS = {
  // Warden
  shield_bash:      { name: 'Shield Bash',    mp: 5,  target: 'enemy',  effect: 'stun',   power: 0,   desc: 'Stun one enemy for 1 turn.' },
  rallying_cry:     { name: 'Rallying Cry',   mp: 8,  target: 'allies', effect: 'defbuff', power: 2,  desc: 'All allies +2 DEF for 3 turns.' },
  iron_will:        { name: 'Iron Will',       mp: 10, target: 'self',   effect: 'immuneDream', turns: 3, desc: 'Immune to Dreamtouched, 3 turns.' },
  guardians_stand:  { name: "Guardian's Stand",mp: 12, target: 'self',   effect: 'guard', desc: 'Next ally attack is redirected to you.' },
  anchor_blow:      { name: 'Anchor Blow',     mp: 18, target: 'enemy',  effect: 'heavy',  power: 1.5, desc: 'Heavy hit, +50% damage, removes Shielded.' },
  // Scholar
  binding_bolt:     { name: 'Binding Bolt',    mp: 8,  target: 'enemy',  effect: 'magic',  power: 1.5, desc: 'Magic attack, 1.5× MAG damage.' },
  arcane_insight:   { name: 'Arcane Insight',  mp: 5,  target: 'enemy',  effect: 'reveal', desc: 'Reveal enemy stats and weaknesses.' },
  dispel:           { name: 'Dispel',          mp: 10, target: 'any',    effect: 'dispel', desc: 'Remove 1 buff (enemy) or debuff (ally).' },
  dream_pierce:     { name: 'Dream-Pierce',    mp: 15, target: 'enemy',  effect: 'magic_paralyze', power: 1.2, desc: 'Magic, ignores RES. Causes Paralyzed.' },
  seal_fragment:    { name: 'Seal Fragment',   mp: 20, target: 'enemy',  effect: 'seal',   desc: 'Weaken Hollow-type enemies: -20% all stats for 3 turns.' },
  // Blade
  crippling_strike: { name: 'Crippling Strike',mp: 5,  target: 'enemy',  effect: 'slow',   power: 1.0, desc: 'Hit + -4 SPD for 3 turns.' },
  shadow_step:      { name: 'Shadow Step',     mp: 8,  target: 'self',   effect: 'evade',  turns: 1,   desc: '+30 evasion for 1 turn.' },
  exploit_weakness: { name: 'Exploit Weakness',mp: 10, target: 'enemy',  effect: 'bonusDmg', power: 1.75, cond: 'stunned', desc: '+75% damage vs. stunned/paralyzed.' },
  precise_shot:     { name: 'Precise Shot',    mp: 12, target: 'enemy',  effect: 'sureHit', power: 1.0, desc: 'Ranged, always hits, full STR damage.' },
  vanish:           { name: 'Vanish',          mp: 15, target: 'self',   effect: 'vanish', desc: 'Untargetable 1 turn, +50% dmg next attack.' },
  // Hedge-Witch
  mend:             { name: 'Mend',            mp: 8,  target: 'ally',   effect: 'heal',   power: 0.4, desc: 'Restore 40% max HP to one ally.' },
  dreamwort_remedy: { name: 'Dreamwort Remedy',mp: 10, target: 'ally',   effect: 'cure',   cure: ['dreamtouched','paralyzed'], desc: 'Remove Dreamtouched and Paralyzed.' },
  warding_charm:    { name: 'Warding Charm',   mp: 12, target: 'ally',   effect: 'wisUp',  power: 6, turns: 3, desc: '+6 WIS, +25% psychic resist, 3 turns.' },
  blight_curse:     { name: 'Blight Curse',    mp: 14, target: 'enemy',  effect: 'debuff', power: 4, turns: 3, desc: '-4 DEF, -4 RES for 3 turns.' },
  second_sight:     { name: 'Second Sight',    mp: 18, target: 'enemy',  effect: 'secondSight', desc: 'Reveal all hidden abilities + trigger Doubt effect.' },
  // Kael unique
  detached_limb:    { name: 'Detached Limb',   mp: 0,  target: 'enemy',  effect: 'rangePhys', power: 1.2, desc: 'Hurl arm as ranged weapon, 1.2× STR. Free reattach.' },
  // Yssen unique
  flash_fire:       { name: 'Flash Fire',      mp: 12, target: 'all_enemies', effect: 'fire', power: 0.8, desc: 'Fire all enemies, 0.8× MAG each.' },
};

// ─── ENEMIES ──────────────────────────────────────────────────────────────────
const ENEMIES = {
  pale_hound: {
    name: 'Pale Hound', sprite: 'pale_hound', xp: 45, gold: 15,
    stats: { hp: 32, mp: 20, str: 12, def: 8, mag: 4, res: 4, spd: 14, wis: 10 },
    skills: ['dream_step_passive'],
    specialOnDeath: 'gray_blood_cloud',
    ai: 'aggressive',
    weaknesses: ['fire', 'radiant'],
    desc: 'Pale soldiers, dreamtouched. They coordinate without speaking.',
    flavor: 'Gray blood. Eyes wrong. Something changed them from the inside.'
  },
  pale_hound_elite: {
    name: 'Pale Hound Elite', sprite: 'pale_hound', xp: 65, gold: 25,
    stats: { hp: 48, mp: 30, str: 14, def: 10, mag: 5, res: 5, spd: 14, wis: 10 },
    skills: ['dream_step_passive'],
    specialOnDeath: 'gray_blood_cloud',
    ai: 'aggressive',
    weaknesses: ['fire', 'radiant'],
    desc: 'An elite Pale Hound. Better trained, more deeply changed.',
    flavor: ''
  },
  hound_captain: {
    name: 'Captain Vorrel', sprite: 'hound_captain', xp: 250, gold: 80,
    stats: { hp: 95, mp: 60, str: 18, def: 12, mag: 6, res: 8, spd: 12, wis: 14 },
    skills: ['commanders_will','dream_step_passive','the_last_word'],
    specialOnDeath: 'last_word',
    ai: 'commander',
    weaknesses: ['fire'],
    desc: 'Captain Vorrel. Mostly still a man. The worst kind.',
    flavor: '"I take no satisfaction in this. I never have."'
  },
  cinder_eel: {
    name: 'Cinder Eel', sprite: 'cinder_eel', xp: 60, gold: 10,
    stats: { hp: 45, mp: 0, str: 14, def: 6, mag: 0, res: 4, spd: 8, wis: 4 },
    skills: ['hot_blood'],
    ai: 'ambush',
    weaknesses: ['ice'],
    desc: 'Pre-Fall mutated catfish. Twelve feet long. Warm to the touch.',
    flavor: 'Internal heat from genetic damage. The Cinder River is full of them.'
  },
  salt_drinker: {
    name: 'Salt Drinker', sprite: 'salt_drinker', xp: 35, gold: 5,
    stats: { hp: 22, mp: 10, str: 10, def: 4, mag: 3, res: 2, spd: 10, wis: 4 },
    skills: ['brine_tears'],
    ai: 'pack',
    weaknesses: ['fire', 'radiant'],
    desc: 'The drowned dead, reanimated by anchor-stone leakage.',
    flavor: 'They drowned and came back wrong.'
  },
  hollow_fragment: {
    name: 'Hollow-Fragment', sprite: 'hollow_fragment', xp: 55, gold: 0,
    stats: { hp: 35, mp: 999, str: 0, def: 2, mag: 16, res: 12, spd: 0, wis: 20 },
    skills: ['mind_touch_whisper'],
    ai: 'passive_attacker',
    weaknesses: ['binding_magic'],
    desc: 'A piece of the Hollow that has bled through. Anchored to a place.',
    flavor: 'Cannot move. Can reach you from thirty feet.'
  },
  mirror_self: {
    name: 'Mirror-Self', sprite: null, xp: 0, gold: 0,
    stats: { hp: 0, mp: 0, str: 0, def: 0, mag: 0, res: 0, spd: 0, wis: 0 }, // set dynamically
    ai: 'mirror',
    weaknesses: [],
    desc: 'Your reflection, wearing the Hollow like a coat.',
    flavor: 'It smiles. You are not smiling.'
  },
  choir_member: {
    name: 'Choir Member', sprite: 'choir_member', xp: 40, gold: 8,
    stats: { hp: 28, mp: 60, str: 8, def: 3, mag: 12, res: 8, spd: 8, wis: 16 },
    skills: ['hollow_touch','dissonant_whispers','hold_person','linked_mind'],
    specialOnDeath: 'linked_mind_buff',
    ai: 'support',
    weaknesses: ['radiant'],
    desc: 'Dreamtouched advisors. They believe they are saving the world.',
    flavor: '"She hears it like a kind voice."'
  },
  brother_peytar: {
    name: 'Brother Peytar', sprite: 'choir_member', xp: 200, gold: 40,
    stats: { hp: 65, mp: 80, str: 10, def: 8, mag: 14, res: 10, spd: 10, wis: 14 },
    skills: ['sacred_mace','healing_word_enemy','hold_person'],
    ai: 'cleric_enemy',
    weaknesses: ['radiant'],
    desc: 'The cleric you trusted. He never wanted this.',
    flavor: '"Please don\'t make this harder."'
  },
  veyra_vessel: {
    name: 'Magus Veyra', sprite: 'veyra_boss', xp: 0, gold: 0,
    stats: { hp: 180, mp: 200, str: 14, def: 14, mag: 22, res: 18, spd: 12, wis: 20 },
    skills: ['the_voice','binding_aura','counterspell','dominate_person','finger_of_death','wall_of_force'],
    specialOnDeath: 'hollow_rises',
    ai: 'boss_veyra',
    weaknesses: ['doubt_condition'],
    desc: 'Magus Veyra of the Ashen Vale. The vessel.',
    flavor: '"I would have hated to do this alone."',
    phase2At: 90 // HP where Doubt can be triggered
  }
};

// ─── COMBAT ENCOUNTERS ────────────────────────────────────────────────────────
const ENCOUNTERS = {
  bridge_hound:    { enemies: ['pale_hound'], bg: 'bridge_road', music: 'combat', intro: 'He draws without speaking.' },
  ford_eels:       { enemies: ['cinder_eel','cinder_eel'], bg: 'cinder_ford', music: 'combat', intro: 'The shapes beneath the water lunge.' },
  forest_hounds:   { enemies: ['pale_hound','pale_hound','pale_hound'], bg: 'forest_ambush', music: 'combat', intro: 'Three figures rise from the undergrowth.', kael_join: true },
  eddik_hounds:    { enemies: ['pale_hound','pale_hound'], bg: 'eddik_flophouse', music: 'tense', intro: 'The door bursts. Two Pale Hounds.', cramped: true },
  salt_library:    { enemies: ['salt_drinker','salt_drinker','salt_drinker','salt_drinker'], bg: 'salt_coast', music: 'combat', intro: 'Shapes rise from the flooded floor.' },
  vorrel_fight:    { enemies: ['hound_captain','pale_hound_elite','pale_hound_elite','pale_hound_elite','pale_hound_elite'], bg: 'salt_coast', music: 'boss', intro: '"I have been told to take the journal."', collapsing: true },
  peytar_betrayal: { enemies: ['brother_peytar','pale_hound','pale_hound','pale_hound','pale_hound','pale_hound','pale_hound','pale_hound','pale_hound'], bg: 'spymaster_crypt', music: 'betrayal', intro: '"I am so sorry. I really am."', calvix_at_risk: true },
  summit_chaos:    { enemies: ['pale_hound','pale_hound','pale_hound','pale_hound','pale_hound','pale_hound'], bg: 'summit_hall', music: 'chaos', intro: 'The Hall burns. Hounds everywhere.', chaos_mode: true },
  cathedral_3:     { enemies: ['mirror_self','mirror_self','mirror_self'], bg: 'cathedral_3', music: 'hollow', intro: 'Your reflection steps off the wall.' },
  cathedral_4:     { enemies: ['salt_drinker','salt_drinker'], bg: 'cathedral_4', music: 'hollow', intro: 'Something stirs in the deep water.' },
  cathedral_6:     { enemies: ['hollow_fragment'], bg: 'cathedral_6', music: 'hollow', intro: 'The corridor breathes.', paralyze_risk: true },
  cathedral_7:     { enemies: ['choir_member','choir_member','choir_member','choir_member','choir_member','choir_member','choir_member'], bg: 'cathedral_7', music: 'hollow', intro: 'All seven smiles, at the same moment.' },
  cathedral_8:     { enemies: ['pale_hound','pale_hound','pale_hound','pale_hound','pale_hound','pale_hound','pale_hound','pale_hound'], bg: 'cathedral_8', music: 'combat', intro: 'Eight shapes rise from the cots.', stealth_bypass: true },
  final_boss:      { enemies: ['veyra_vessel'], bg: 'cathedral_12', music: 'final', intro: '"I knew you would come. I\'m so glad you did."', doubt_mechanic: true }
};

// ─── DIALOGUE TREES ───────────────────────────────────────────────────────────
const DIALOGUE = {

  // ── Vess (Old Man at the Well) ────────────────────────────────────────────
  vess_initial: {
    portrait: 'vess', emotion: 'neutral',
    lines: ['You passing through or staying?', 'Used to know the difference by how folks looked at the inn.', 'Passing-through types look hungry. Staying types look like they\'re already sorry.'],
    choices: [
      { text: 'Just passing through.', next: 'vess_passingthrough' },
      { text: 'Tell us about this place.', next: 'vess_about' },
      { text: 'We\'re looking into the dead courier.', next: 'vess_courier' }
    ]
  },
  vess_passingthrough: {
    portrait: 'vess', emotion: 'neutral',
    lines: ['Sure you are. They all are.', 'Then the road south feels wrong and they stay.', "I've lived here sixty years. Everyone's passing through."],
    choices: [{ text: 'Back.', next: null }]
  },
  vess_about: {
    portrait: 'vess', emotion: 'neutral',
    lines: ["Village of Hollowdrift. Five hundred and eleven years old.", "Built on the bones of something older. Lady Veyra's realm.", "Nice enough, if you don't ask questions."],
    choices: [
      { text: 'What questions shouldn\'t we ask?', next: 'vess_questions' },
      { text: 'Thanks.', next: null }
    ]
  },
  vess_questions: {
    portrait: 'vess', emotion: 'worried',
    lines: ['About the birds. About why the children all have the same nightmare.', 'About the green hour.'],
    pause: true,
    lines2: ['I need another drink.'],
    choices: [
      { text: 'What is the green hour?', next: 'vess_greenhour_locked', flag_needed: 'HAS_BRANDY', flag_fail: 'vess_needbrandy' },
      { text: 'We\'ll leave it.', next: null }
    ]
  },
  vess_needbrandy: {
    portrait: 'vess', emotion: 'neutral',
    lines: ['Get me a bottle of the cheap brandy from the inn. The real cheap one. Then we\'ll talk.'],
    choices: [{ text: 'All right.', next: null }]
  },
  vess_greenhour_locked: {
    portrait: 'vess', emotion: 'neutral',
    lines: ['Ah. You remembered.'],
    action: 'consume_brandy',
    next: 'vess_greenhour'
  },
  vess_greenhour: {
    portrait: 'vess', emotion: 'sad',
    lines: ['Sixty years ago. I was seven.', 'There was a night when the sky went green. Just for a few hours.', 'Every adult in the village started screaming in their sleep. Same time. Same sound.', 'Then they stopped. And they didn\'t remember.', 'I remember. I was the only one who was awake.', 'I saw something come out of the ground. Not through it. Out of it. Like the earth was a door.'],
    pause: true,
    lines2: ['I drink to make it blurry. Some days it works.', 'Don\'t go south. Don\'t go to the sea.'],
    choices: [{ text: 'Thank you, Vess.', next: null, flag: 'VESS_TOLD_STORY' }]
  },
  vess_courier: {
    portrait: 'vess', emotion: 'sad',
    lines: ['Oh. Him. Young man. King\'s courier livery. Came in at night. Dead by morning.', "Captain says it was a robbery.", "Robbery. My aunt's knee."],
    choices: [
      { text: 'Did you see anything?', next: 'vess_saw' },
      { text: 'Do you know about his daughter?', next: 'vess_mira' },
      { text: 'Back.', next: null }
    ]
  },
  vess_saw: {
    portrait: 'vess', emotion: 'worried',
    lines: ['Didn\'t see the killing. Heard it — didn\'t know what I was hearing.', 'What I saw was after. Three men. Very pale. Moving wrong.', 'They walked past me like I wasn\'t there.', 'One of them was bleeding. Gray, it was. The blood.'],
    choices: [{ text: 'Thank you.', next: null, flag: 'VESS_DESCRIBED_HOUNDS' }]
  },
  vess_mira: {
    portrait: 'vess', emotion: 'sad',
    lines: ['Little girl. His daughter. Hastha at the inn has her hid.', 'Smart child. Sharp as a blade.', "Don't tell the guard I said so. Captain's a good woman but she takes orders too seriously."],
    choices: [{ text: 'We\'ll be careful.', next: null, flag: 'MIRA_LOCATION_KNOWN' }]
  },

  // ── Hastha Torren ─────────────────────────────────────────────────────────
  hastha_initial: {
    portrait: 'hastha', emotion: 'neutral',
    lines: ["Tea or beer. Tea's free.", "[She sets a cup in front of you without waiting.]"],
    choices: [
      { text: 'We\'re investigating the courier\'s death.', next: 'hastha_courier_r1' },
      { text: 'Who owns this place?', next: 'hastha_owner' },
      { text: 'Can we get rooms?', next: 'hastha_rooms' }
    ]
  },
  hastha_owner: {
    portrait: 'hastha', emotion: 'neutral',
    lines: ["I do. Twenty-three years. Before the purges, before the magistrates.", "It's mine. Don't make trouble in it."],
    choices: [{ text: 'Back.', next: 'hastha_initial' }]
  },
  hastha_rooms: {
    portrait: 'hastha', emotion: 'neutral',
    lines: ["Two silver each, per night. You'll sleep well. Everybody does.", "[She sets two more cups of tea on the bar.]", "Drink the tea."],
    choices: [{ text: 'Thank you.', next: null }]
  },
  hastha_courier_r1: {
    portrait: 'hastha', emotion: 'neutral',
    lines: ["A courier died here. Robbery, they say."],
    choices: [
      { text: 'What do you say?', next: 'hastha_courier_r2' },
      { text: 'Who handled the investigation?', next: 'hastha_loyar' }
    ]
  },
  hastha_loyar: {
    portrait: 'hastha', emotion: 'neutral',
    lines: ["Captain Loyar. Quick work. Case closed same day.", "[Her tone is flat. Too flat for someone who found the body.]", "Very efficient."],
    choices: [{ text: 'That seems fast.', next: 'hastha_courier_r2' }]
  },
  hastha_courier_r2: {
    portrait: 'hastha', emotion: 'worried',
    lines: ["He was killed indoors.", "Robbers wait on the road. They don't follow you through a door, past twelve witnesses, and do their work by the third table."],
    choices: [
      { text: 'Someone cleaned up for them.', next: 'hastha_stain_r3' },
      { text: 'That stain on the floor — that\'s his?', next: 'hastha_stain_r3' }
    ]
  },
  hastha_stain_r3: {
    portrait: 'hastha', emotion: 'sad',
    lines: ["Yes. His.", "He bled out in... twenty minutes. Maybe more. Nobody heard it. The fire was loud.", "[Her eyes flick to the stain. One second. Then back to you.]", "He wasn't alone. His daughter was with him."],
    choices: [
      { text: 'Where is she now?', next: 'hastha_mira' },
      { text: 'Did you see who did it?', next: 'hastha_saw_killers' }
    ]
  },
  hastha_mira: {
    portrait: 'hastha', emotion: 'sad',
    lines: ["Her name is Mira. Twelve. She's hiding. I've been feeding her.", "She will not speak to anyone in uniform.", "She might speak to you."],
    pause: true,
    lines2: ["She saw the killers. Before they noticed her.", "Come back this evening."],
    choices: [{ text: 'We\'ll come back.', next: null, flag: 'MIRA_LOCATION_KNOWN' }]
  },
  hastha_saw_killers: {
    portrait: 'hastha', emotion: 'angry',
    lines: ["I saw what came after.", "They sent two men back the next night to tidy up.", "Gray blood. The both of them.", "I put them in the root cellar."],
    choices: [
      { text: 'Can we see them?', next: 'hastha_cellar' },
      { text: 'You killed two of them?', next: 'hastha_killed' }
    ]
  },
  hastha_killed: {
    portrait: 'hastha', emotion: 'neutral',
    lines: ["My husband was a wizard.", "Twenty-three years ago they came for him. He didn't lie down for them.", "They killed him for it. I learned what I needed to learn.", "[She touches the knife at her hip. Just a touch. Then away.]"],
    choices: [{ text: 'Show us the cellar.', next: 'hastha_cellar' }]
  },
  hastha_cellar: {
    portrait: 'hastha', emotion: 'neutral',
    lines: ["Root cellar, below the kitchen. Come."],
    choices: [{ text: 'Lead the way.', next: null, action: 'goto_root_cellar' }]
  },

  // ── Captain Loyar ─────────────────────────────────────────────────────────
  loyar_initial: {
    portrait: 'loyar', emotion: 'neutral',
    lines: ["Travelers. What brings you to Hollowdrift?"],
    choices: [
      { text: 'We heard about the courier\'s death.', next: 'loyar_courier' },
      { text: 'Just passing through.', next: 'loyar_passing' },
      { text: 'What are the Pale Hounds?', next: 'loyar_hounds' }
    ]
  },
  loyar_passing: {
    portrait: 'loyar', emotion: 'neutral',
    lines: ["Then pass through. Nothing to delay you here.", "[She pauses.]", "Drink the dreamwort tea. Long road south is better slept through."],
    choices: [{ text: 'Thank you.', next: null }]
  },
  loyar_courier: {
    portrait: 'loyar', emotion: 'neutral',
    lines: ["That matter is closed. Robbery. The perpetrators were dealt with.", "[Her jaw tightens. Something unsaid behind that word: dealt.]", "No need for outside attention."],
    choices: [
      { text: 'Dealt with how?', next: 'loyar_dealt' },
      { text: 'We\'re not from outside. We knew him.', next: 'loyar_knew_him' }
    ]
  },
  loyar_dealt: {
    portrait: 'loyar', emotion: 'angry',
    lines: ["I said the matter is closed.", "If you're not guests of this village, I suggest you move along."],
    choices: [{ text: 'We\'ll move along.', next: null }]
  },
  loyar_knew_him: {
    portrait: 'loyar', emotion: 'neutral',
    lines: ["Then I'm sorry for your loss.", "[Something shifts. Just a little.]", "It was a robbery. There's nothing more to know."],
    choices: [
      { text: 'You don\'t believe that.', next: 'loyar_truth', check: 'insight', dc: 14 },
      { text: 'Thank you, Captain.', next: null }
    ]
  },
  loyar_truth: {
    portrait: 'loyar', emotion: 'worried',
    lines: ["[She looks at you for a long moment.]", "I believe what I was told to believe.", "[Very quietly:]", "He was stabbed inside the inn. Robbers don't do that.", "[Then:]", "That's all I'm saying. That's all I can say."],
    choices: [{ text: 'Thank you.', next: null, flag: 'LOYAR_HINT_RECEIVED' }]
  },
  loyar_hounds: {
    portrait: 'loyar', emotion: 'neutral',
    lines: ["I don't know that name.", "[Her hand moves toward her scar. Stops.]", "Where did you hear it?"],
    choices: [
      { text: 'Around. Who are they?', next: 'loyar_deny_hounds' },
      { text: 'Never mind.', next: null }
    ]
  },
  loyar_deny_hounds: {
    portrait: 'loyar', emotion: 'angry',
    lines: ["I said I don't know that name.", "Mind your road."],
    choices: [{ text: 'All right.', next: null }]
  },

  // ── Mira Hollen ───────────────────────────────────────────────────────────
  mira_first: {
    portrait: 'mira', emotion: 'neutral',
    lines: ["My da said don't talk to strangers.", "He's dead now, so."],
    choices: [
      { text: 'We\'re sorry about your father.', next: 'mira_sorry' },
      { text: 'We\'re trying to find who killed him.', next: 'mira_investigators' }
    ]
  },
  mira_sorry: {
    portrait: 'mira', emotion: 'sad',
    lines: ["I know. You look it.", "Some people look like they mean it and some don't. You do."],
    choices: [{ text: 'What can you tell us?', next: 'mira_main' }]
  },
  mira_investigators: {
    portrait: 'mira', emotion: 'neutral',
    lines: ["Captain says it was robbers. Three men came in, Da wouldn't give them the pouch, they stabbed him and ran.", "[A beat.]", "That's not what happened."],
    choices: [{ text: 'Tell us.', next: 'mira_main' }]
  },
  mira_main: {
    portrait: 'mira', emotion: 'neutral',
    lines: ["What do you want to know?"],
    choices: [
      { text: 'What did you see?', next: 'mira_saw' },
      { text: 'Did your father carry anything important?', next: 'mira_letter' }
    ]
  },
  mira_saw: {
    portrait: 'mira', emotion: 'sad',
    lines: ["Three men. Pale. Like they'd been inside all winter.", "They didn't talk. They just... moved together. Like they were thinking the same thing.", "They came from the back. Da reached for his pouch — to give it to them, I think — and they stabbed him before he could.", "Like they didn't want the pouch. They wanted him not to talk."],
    choices: [
      { text: 'And you hid.', next: 'mira_hid' },
      { text: 'Did you see what they took?', next: 'mira_took' }
    ]
  },
  mira_hid: {
    portrait: 'mira', emotion: 'neutral',
    lines: ["Under the stairs. I can fit.", "Da used to say I was too skinny.", "[She doesn't cry. She's past crying.]", "I watched them go through his things."],
    choices: [{ text: 'What did they take?', next: 'mira_took' }]
  },
  mira_took: {
    portrait: 'mira', emotion: 'neutral',
    lines: ["A letter. A sealed one. And they left."],
    choices: [{ text: 'What about the letter you have?', next: 'mira_letter' }]
  },
  mira_letter: {
    portrait: 'mira', emotion: 'neutral',
    lines: ["They took one. I took the other.", "Da had two. He always said: the smart courier carries the real letter close and the copy loose.",
    "[She reaches into the oversized coat.]",
    "[She produces a sealed envelope. The seal is Magus Sereth's — a black iron fist.]"],
    choices: [{ text: 'Take the letter.', next: 'mira_open_letter', action: 'give_item:sealed_letter' }]
  },
  mira_open_letter: {
    portrait: 'mira', emotion: 'neutral',
    lines: ["What does it say?"],
    choices: [
      { text: 'Open it.', next: 'mira_letter_read' },
      { text: 'We should keep it sealed.', next: 'mira_keep_sealed' }
    ]
  },
  mira_keep_sealed: {
    portrait: 'mira', emotion: 'angry',
    lines: ["My da is dead. I want to know what he died for.", "Open it."],
    choices: [{ text: 'Open it.', next: 'mira_letter_read' }]
  },
  mira_letter_read: {
    portrait: 'mira', emotion: 'sad',
    lines: ["[You break the seal. Sereth's seal — black iron fist.]",
    "A letter in Magus Sereth's hand: ordering the assassination of Magus Iolen by 'my agents in the Ashen Vale, by whatever means necessary.'",
    "Signed. Sealed."],
    pause: true,
    lines2: ["He killed Iolen. The Magus who burned up in his tower.", "Da was carrying proof of that?"],
    choices: [
      { text: 'It looks like it.', next: 'mira_realization' },
      { text: 'That\'s what it says.', next: 'mira_realization' }
    ]
  },
  mira_realization: {
    portrait: 'mira', emotion: 'neutral',
    lines: ["Then why did Veyra's men want it gone?",
    "If it proves Sereth is a murderer — why would her men kill Da to hide it?",
    "[She looks at you. Just for a moment.]",
    "I can't help you anymore. But you've got the letter. Do something with it."],
    choices: [{ text: 'We will. Thank you, Mira.', next: null, flag: 'MIRA_COMPLETE' }]
  },

  // ── Kael the Quiet ────────────────────────────────────────────────────────
  kael_intro: {
    portrait: 'kael', emotion: 'neutral',
    lines: ["Who are you, and why are you killing Hounds?"],
    choices: [
      { text: 'We\'re investigating the courier\'s death in Hollowdrift.', next: 'kael_investigation' },
      { text: 'Who are you first?', next: 'kael_who_he_is' }
    ]
  },
  kael_who_he_is: {
    portrait: 'kael', emotion: 'neutral',
    lines: ["Kael. I find people. Living, dead, or somewhere uncomfortable in between.", "Triple rates for the third.", "[His arm reattaches with a click that shouldn't be as casual as he makes it sound.]"],
    choices: [{ text: 'What\'s your interest in the Hounds?', next: 'kael_hound_interest' }]
  },
  kael_hound_interest: {
    portrait: 'kael', emotion: 'sad',
    lines: ["They killed someone I knew. Six years ago.", "I was at the village after. I know what they did.", "[He doesn't elaborate. He doesn't need to.]", "I've been returning the favor ever since."],
    choices: [
      { text: 'We\'re looking into them too. Share information?', next: 'kael_alliance' },
      { text: 'What do you know about them?', next: 'kael_knows' }
    ]
  },
  kael_knows: {
    portrait: 'kael', emotion: 'neutral',
    lines: ["They're not soldiers. I've seen soldiers.", "These coordinate without talking. Don't break. Bleed wrong.", "I took one apart once, after. There were stones in their pockets. Little carved things."],
    choices: [{ text: 'Like these?', next: 'kael_pendant', action: 'show_item:hound_pendant' }]
  },
  kael_pendant: {
    portrait: 'kael', emotion: 'neutral',
    lines: ["Yeah.", "[He picks it up. Turns it over. Doesn't shudder, but his grip tightens.]", "I have a contact in Vael Auren. Knows where the Hounds stage out of.", "I can get you inside. But I lead. And when I say run, we run."],
    choices: [
      { text: 'Agreed. We work together.', next: null, flag: 'KAEL_ALLIED', action: 'kael_joins' },
      { text: 'We work alone.', next: null }
    ]
  },
  kael_investigation: {
    portrait: 'kael', emotion: 'neutral',
    lines: ["Dead courier. Hollowdrift.", "[He doesn't seem surprised. He's been watching you since before the ambush.]", "And you followed it all the way here. To three Hounds on a forest road."],
    choices: [{ text: 'We\'re in over our heads and we know it.', next: 'kael_alliance' }]
  },
  kael_alliance: {
    portrait: 'kael', emotion: 'neutral',
    lines: ["At least you know it.", "[He looks at the pendant again.]", "Vael Auren. The Glass City. I've got a lead on where they stage."],
    choices: [{ text: 'Let\'s go together.', next: null, flag: 'KAEL_ALLIED', action: 'kael_joins' }]
  },

  // ── Yssen Mar ─────────────────────────────────────────────────────────────
  yssen_initial: {
    portrait: 'yssen', emotion: 'neutral',
    lines: ["Strangers crossing my river.", "Tell me who you serve, and I'll tell you whether you live."],
    choices: [
      { text: 'We serve ourselves.', next: 'yssen_serve_themselves' },
      { text: 'We\'re investigating the courier\'s death.', next: 'yssen_courier' },
      { text: '[Show her the sealed letter]', next: 'yssen_letter', cond_item: 'sealed_letter' }
    ]
  },
  yssen_serve_themselves: {
    portrait: 'yssen', emotion: 'neutral',
    lines: ["Expensive answer. Try again with evidence."],
    choices: [
      { text: 'We\'re looking into the Pale Hounds.', next: 'yssen_hounds' },
      { text: '[Show her the sealed letter]', next: 'yssen_letter', cond_item: 'sealed_letter' }
    ]
  },
  yssen_hounds: {
    portrait: 'yssen', emotion: 'interested',
    lines: ["Now we're talking.", "[The flame in her fingers dances a little higher.]", "What do you know about them?"],
    choices: [{ text: 'They bleed gray and carry stone pendants.', next: 'yssen_letter', flag_needed: 'FOUND_CELLAR_BODIES' }]
  },
  yssen_courier: {
    portrait: 'yssen', emotion: 'neutral',
    lines: ["One courier among thousands. Why does that bring you to my camp?"],
    choices: [{ text: '[Show her the letter]', next: 'yssen_letter', cond_item: 'sealed_letter' }]
  },
  yssen_letter: {
    portrait: 'yssen', emotion: 'interested',
    lines: ["[She reads. A long pause. Her jaw tightens.]", "Sereth. Right. It's always Sereth."],
    pause: true,
    lines2: ["You know this letter is forged."],
    choices: [
      { text: 'You recognized the seal?', next: 'yssen_forgery' },
      { text: 'How do you know?', next: 'yssen_forgery' }
    ]
  },
  yssen_forgery: {
    portrait: 'yssen', emotion: 'angry',
    lines: ["I know Sereth's seal. I've stolen seventeen things from his courier routes.", "This is close. It is not his.",
    "[She folds it carefully and hands it back.]", "Who would forge it?"],
    choices: [
      { text: 'We think it was Veyra\'s people.', next: 'yssen_veyra' },
      { text: 'We don\'t know yet.', next: 'yssen_veyra' }
    ]
  },
  yssen_veyra: {
    portrait: 'yssen', emotion: 'neutral',
    lines: ["[Something shifts in her expression. Very slight. Gone in an instant.]", "Someone wants a war."],
    pause: true,
    lines2: ["We want the same thing. An end to the Conclave.",
    "If someone's toppling Magi — that's either the best thing happening or the worst.",
    "I want to know which."],
    choices: [
      { text: 'Alliance.', next: 'yssen_alliance' },
      { text: 'We\'re not joining your rebellion.', next: 'yssen_refuse' }
    ]
  },
  yssen_alliance: {
    portrait: 'yssen', emotion: 'warm',
    lines: ["There's a man in Vael Auren. Eddik. Former advisor to Veyra. He fled six months ago.", "Find him. Find out what he knows.",
    "[She produces a map. Marks a location in the Glass Wells.]", "Amber door. Ask for it by that name.",
    "Safehouse, two hundred gold expense fund, and a guide through the city.", "Don't make me regret this."],
    choices: [{ text: 'We won\'t.', next: null, flag: 'YSSEN_ALLIED', action: 'give_item:gold_200' }]
  },
  yssen_refuse: {
    portrait: 'yssen', emotion: 'angry',
    lines: ["Then find your own way to the Glass City.", "Don't come back to my camp."],
    choices: [{ text: 'Understood.', next: null, flag: 'YSSEN_HOSTILE' }]
  },

  // ── Eddik (dying revelation) ──────────────────────────────────────────────
  eddik_initial: {
    portrait: null, emotion: null,
    lines: ["[The man on the cot is younger than you expected. Maybe thirty.]",
    "[He is dying. There is too much blood for him not to be.]",
    "[His eyes find yours. He tries to laugh.]",
    '"She caught up with me. I thought I had three more days. I always think I have three more days."'],
    choices: [
      { text: 'Who poisoned you?', next: 'eddik_poisoned' },
      { text: 'What do you know about Veyra?', next: 'eddik_revelation1' }
    ]
  },
  eddik_poisoned: {
    portrait: null, emotion: null,
    lines: ['"A Hound. An hour ago. They\'re thorough."', "[He coughs.]", '"You\'re here about Veyra."'],
    choices: [{ text: 'Yes. Tell us everything.', next: 'eddik_revelation1' }]
  },
  eddik_revelation1: {
    portrait: null, emotion: null,
    lines: ['"I was an advisor. Twelve years. Inner circle."',
    '"I heard things."',
    "[He forces himself upright against the wall.]",
    '"Veyra is not behind the assassinations alone. She works for something she calls the dreamer. A voice she hears."',
    '"She believes it\'s her own ambition. It isn\'t."'],
    choices: [{ text: 'Continue.', next: 'eddik_revelation2' }]
  },
  eddik_revelation2: {
    portrait: null, emotion: null,
    lines: ['"The peace summit — it\'s a trap."',
    '"She will gather the remaining Magi and use them to feed whatever is below the Sea."',
    '"She will sacrifice them to strengthen it."'],
    choices: [{ text: 'What is the dreamer?', next: 'eddik_revelation3' }]
  },
  eddik_revelation3: {
    portrait: null, emotion: null,
    lines: ['"There are journals. Real ones. Written by whoever bound it the first time."',
    '"Somewhere beneath the Shattered Sea."',
    '"She\'s been looking for them. If she finds them first—"',
    '[He breaks off. Swallows hard.]',
    '"I don\'t know what the dreamer is. Only that when she hears it, she smiles."',
    '"And when she smiled — these last three years — she smiled like something that had forgotten it lived in a person."'],
    choices: [{ text: 'How do we stop it?', next: 'eddik_last' }]
  },
  eddik_last: {
    portrait: null, emotion: null,
    lines: ["[He reaches into his pack. He produces a small leather book, pre-Fall, damaged.]",
    "[He hands it to you.]",
    '"I took this from her private study three years ago. The last page."',
    '"The translation says: the binding holds. it dreams. we are the cracks."',
    '[He is fading.]',
    '"Don\'t kill her."',
    '[His eyes go distant.]',
    '"Killing her gives the dreamer the rest of what it wants. A dead vessel frees it."',
    '"Find the journals. Find the journals beneath—"',
    '[He is gone.]',
    "[Two Pale Hounds burst through the door.]"],
    choices: [{ text: '[COMBAT]', next: null, action: 'trigger_combat:eddik_hounds', flag: 'EDDIK_DIED' }]
  },

  // ── Calvix Marn (the confession) ─────────────────────────────────────────
  calvix_initial: {
    portrait: 'calvix', emotion: 'sad',
    lines: ["[He doesn't turn when you enter. He's sitting on a stone sarcophagus, back to the entrance.]",
    '"Show me what you have."',
    '"And then I will tell you whether I have the courage I have been asked to find."'],
    choices: [{ text: 'Show him everything.', next: 'calvix_sees_evidence' }]
  },
  calvix_sees_evidence: {
    portrait: 'calvix', emotion: 'sad',
    lines: ["[You show him the forged letter. He recognizes the forgery instantly — Veyra ordered it from him.]",
    "[You show him Kessith's journal. His hands don't shake, but they should.]",
    "[You show him Vorrel's letter, which Calvix himself wrote.]",
    "[You show him Eddik's journal fragment.]",
    "[Long silence.]"],
    choices: [{ text: 'Wait.', next: 'calvix_breaks' }]
  },
  calvix_breaks: {
    portrait: 'calvix', emotion: 'sad',
    lines: ["\"I've known.\"", "\"For three years. I've known she was changing.\"",
    "\"I told myself it was grief. Power. The pressure of the Conclave.\"",
    "[He opens his coat. Produces a thick leather folder. Sets it on the sarcophagus.]",
    "\"Her movements. For three years. Dates. Locations. The ritual site. Everything I could find.\"",
    "\"I've been waiting for someone strong enough to do something about it.\""],
    choices: [{ text: 'We can stop this. Will you help?', next: 'calvix_condition' }]
  },
  calvix_condition: {
    portrait: 'calvix', emotion: 'sad',
    lines: ["\"One condition.\"",
    "\"You try to save her. You don't kill her unless there is no other path.\"",
    "\"I have served Veyra since she was nineteen. I love her like a daughter.\"",
    "\"Whatever she has become — whatever has been done to her — she didn't choose it.\"",
    "\"Promise me you try.\""],
    choices: [
      { text: 'We promise.', next: 'calvix_agrees', flag: 'PROMISED_CALVIX' },
      { text: 'We can\'t promise that.', next: 'calvix_no_promise' }
    ]
  },
  calvix_agrees: {
    portrait: 'calvix', emotion: 'neutral',
    lines: ["[He nods. He takes the dossier off the sarcophagus and hands it to you.]",
    "\"The summit is in three weeks. Vael Auren. She will perform the ritual on the second day, during her formal address.\"",
    "\"There is a focus — a small obsidian disk on the table. The ritual channels through it.\"",
    "\"Destroy it, or interrupt her. Don't let her speak the binding-words to completion.\"",
    "[From the entrance:]",
    "\"I'm so sorry. I really am.\"",
    "[Brother Peytar's voice.]",
    "[COMBAT BEGINS]"],
    choices: [{ text: '[COMBAT: THE BETRAYAL]', next: null, action: 'trigger_combat:peytar_betrayal', flag: 'CALVIX_DOSSIER_SAVED' }]
  },
  calvix_no_promise: {
    portrait: 'calvix', emotion: 'sad',
    lines: ["[He is quiet for a very long time.]",
    "\"Then I can't help you.\"",
    "[But he doesn't leave. He just sits there, staring at the lantern.]"],
    choices: [
      { text: 'What if we try? No guarantee, but we try.', next: 'calvix_agrees_partial' },
      { text: 'We understand.', next: null }
    ]
  },
  calvix_agrees_partial: {
    portrait: 'calvix', emotion: 'sad',
    lines: ["[Another long silence.]", "\"All right.\""],
    choices: [{ text: 'Continue.', next: 'calvix_agrees' }]
  },

  // ── Magus Sereth ─────────────────────────────────────────────────────────
  sereth_initial: {
    portrait: 'sereth', emotion: 'neutral',
    lines: ["[He doesn't look up when you are announced. He is studying a map.]",
    "\"Speak. You have until I look up.\""],
    choices: [
      { text: '[Show him the letter]', next: 'sereth_letter', cond_item: 'sealed_letter' },
      { text: '[Show him the journal fragment]', next: 'sereth_journal', cond_item: 'eddik_journal' },
      { text: 'Someone is framing you for the assassinations.', next: 'sereth_framing' }
    ]
  },
  sereth_letter: {
    portrait: 'sereth', emotion: 'angry',
    lines: ["[He looks up.]",
    "\"Where did you get this?\"",
    "[He examines the seal. A muscle works in his jaw.]",
    "\"That's not my seal. It's close. It is not mine.\"",
    "[He looks at you fully now.]", "\"Sit down.\""],
    choices: [{ text: 'Continue.', next: 'sereth_interested' }]
  },
  sereth_journal: {
    portrait: 'sereth', emotion: 'neutral',
    lines: ["[He reads the fragment. The line: 'the binding holds. it dreams. we are the cracks.']",
    "\"This is — you need more than this. A dying man's last words are evidence of nothing.\"",
    "[He puts it down.]", "\"But keep talking.\""],
    choices: [{ text: 'There\'s more.', next: 'sereth_interested' }]
  },
  sereth_framing: {
    portrait: 'sereth', emotion: 'angry',
    lines: ["\"I know I'm being framed.\"",
    "\"Someone killed Kessith and is hanging it on me. My realm is mobilizing because of it.\"",
    "\"What I need is evidence. Not speculation.\""],
    choices: [{ text: '[Show him the letter]', next: 'sereth_letter', cond_item: 'sealed_letter' }]
  },
  sereth_interested: {
    portrait: 'sereth', emotion: 'neutral',
    lines: ["\"You want resources. To investigate further.\"", "\"And you want Veyra to be the one behind this.\"",
    "[He drinks black tea. A long swallow.]",
    "\"If it were anyone else, I'd throw you out. But the timing of this — Iolen, Kessith, now Sereth guilty of all of it —\"",
    "[He stops. Chooses his next words very carefully.]",
    "\"I'll give you a writ of passage through the Iron Reach. And three of my scouts.\"",
    "\"Find me proof. Real proof.\""],
    choices: [{ text: 'We will.', next: null, flag: 'SERETH_GAVE_PASSAGE', action: 'give_item:iron_reach_writ' }]
  },

  // ── Veyra (Final Confrontation speeches) ─────────────────────────────────
  veyra_speech: {
    portrait: 'veyra', emotion: 'vessel',
    lines: ["\"I knew you would come.\"",
    "\"I'm so glad you did. I would have hated to do this alone.\"",
    "[The green light gathers around her. The sigils on the floor begin to crawl.]",
    "\"You've been chasing the wrong story.\"",
    "\"The Magi system is broken. It has always been broken. What I am doing will save more lives than it ends.\"",
    "[She looks at you with absolute sincerity.]",
    "\"Join me. Or at least — stand aside. Let me give the world the peace I've been promised.\""],
    choices: [
      { text: 'The Hollow promised you nothing. It\'s using you.', next: 'veyra_denial' },
      { text: '[WIS Save DC 18 — resist her conviction]', next: 'veyra_combat_start', action: 'wis_check:18' }
    ]
  },
  veyra_denial: {
    portrait: 'veyra', emotion: 'vessel',
    lines: ["[She shakes her head. Almost pitying.]",
    "\"There is no Hollow. There are no strings. I have worked for this for forty years.\"",
    "\"Every step. Every decision. Mine.\"",
    "[But something flickers. Behind her eyes. Just for a moment.]",
    "\"Mine.\""],
    choices: [
      { text: '[Show her Aratha-Sin\'s Journal + the Vision + make your case]', next: 'veyra_doubt_attempt', cond_items: ['aratha_journal'], cond_flag: 'VISION_SEEN' },
      { text: 'Fight.', next: 'veyra_combat_start' }
    ]
  },
  veyra_doubt_attempt: {
    portrait: 'veyra', emotion: 'vessel',
    lines: ["[You hold up the journal. You tell her about Aratha-Sin. About the binding ten thousand years ago.]",
    "[You tell her about the child in a barn, alone in a rainstorm, having her first dream of a kind voice.]",
    "[You show her the sea-eye vision.]",
    "\"[She freezes.]\"",
    "\"That... I remember that night. I was twelve. I was afraid of the thunder and—\"",
    "[The green light flickers. The Hollow shrieks — not from her, but through her.]",
    "[She staggers. For just a moment, her eyes are entirely hers.]"],
    choices: [{ text: 'Speak to her now. [DC 18 Persuasion]', next: 'veyra_persuasion', action: 'persuasion_check:18' }]
  },
  veyra_persuasion_fail: {
    portrait: 'veyra', emotion: 'vessel',
    lines: ["[The green floods back. She screams — rage, or grief, or both.]",
    "\"No. No. I chose this.\"",
    "[Fight. But the Doubt Condition has been partially met. Something is different.]"],
    choices: [{ text: 'Fight.', next: 'veyra_combat_start' }]
  },
  veyra_persuasion_success: {
    portrait: 'veyra', emotion: 'sad',
    lines: ["[The light stutters. All of it. The sigils go dark.]",
    "\"...oh.\"",
    "[She looks at her hands. At the dais. At you.]",
    "\"Oh. How long has it—\"",
    "[She is crying. The most human thing you have seen from her.]",
    "\"Tell me there is something I can do. Tell me there is a way to fix this.\""],
    choices: [{ text: 'There is. The binding.', next: 'veyra_willing_vessel', flag: 'DOUBT_CONDITION_MET' }]
  },
  veyra_willing_vessel: {
    portrait: 'veyra', emotion: 'sad',
    lines: ["\"The vessel dies, doesn't it.\"",
    "[Not a question.]",
    "\"And if I do it — if I choose — it stays bound.\"",
    "[A long silence. The green light has faded to nothing. She looks exhausted.]",
    "\"Will you tell them — will you tell them I'm sorry?\"",
    "\"I did love them. I did.\"",
    "\"Begin the ritual. Please.\""],
    choices: [{ text: 'Begin the binding.', next: null, action: 'trigger_ending:1' }]
  },
  veyra_combat_start: {
    portrait: null, emotion: null,
    lines: ["[Combat begins.]"],
    choices: [{ text: '[COMBAT]', next: null, action: 'trigger_combat:final_boss' }]
  },

  // ── Brother Peytar (betrayal scene) ──────────────────────────────────────
  peytar_betrayal: {
    portrait: 'peytar', emotion: 'traitor',
    lines: ["\"I'm so sorry. I really am.\"",
    "\"I asked for it to be someone else. She said it had to be me, because you trusted me.\"",
    "[He raises his hand. The lantern light dims.]",
    "\"Please don't make this harder. Some of you can still walk away.\""],
    choices: [{ text: 'There\'s nothing to say. [COMBAT]', next: null, action: 'trigger_combat:peytar_betrayal' }]
  },
  peytar_surrender: {
    portrait: 'peytar', emotion: 'traitor',
    lines: ["[He's on his knees. The fight has gone out of him.]",
    "\"I love you. All of you.\"",
    "\"I love Veyra. I don't know how to hold both of those things.\"",
    "\"She's going to win. You know that. She was always going to win.\""],
    choices: [
      { text: 'Help us stop her.', next: 'peytar_no_help' },
      { text: 'We\'re going to stop her anyway.', next: 'peytar_just_sad' }
    ]
  },
  peytar_no_help: {
    portrait: 'peytar', emotion: 'traitor',
    lines: ["[He shakes his head.]", "\"I can't. Even now, I can't.\"", "\"I'm sorry.\""],
    choices: [{ text: 'Go.', next: null }]
  },
  peytar_just_sad: {
    portrait: 'peytar', emotion: 'traitor',
    lines: ["[He almost smiles.]", "\"I hope so. I really do.\""],
    choices: [{ text: 'Go.', next: null }]
  },

  // ── Endings ───────────────────────────────────────────────────────────────
  ending_1: {
    portrait: null, emotion: null,
    lines: ["[The ritual begins. The party forms the circle. The Binder's Tokens pulse.]",
    "[The words come from the Recording — voices of the dead, speaking through pre-Fall glass.]",
    "[Veyra stands at the center. She is crying, but she is smiling too.]",
    "[\"Thank you,\" she says. \"I'm so tired.\"]",
    "[\"Will you tell them — will you tell them I'm sorry?\"]",
    "[The green light gathers around her. Folds inward.]",
    "[Smaller. Smaller.]",
    "[A single point of white light where she stood.]",
    "[And nothing.]",
    "",
    "[From outside, on the black sand beach, the surviving ally watches the cathedral go still.]",
    "[The aurora fades. For the first time in years, the sky is dark. Just dark. No green.]",
    "[A crow flies north.]",
    "",
    "[The world will not remember most of what happened here.]",
    "[Three Magi remain. A new political order must form. Historians will call it a summit gone wrong.]",
    "[But the children stop drawing circles with mouths.]",
    "[And the old man in Hollowdrift stops drinking.]",
    "[And the birds come back.]",
    "",
    "THE BINDING.",
    "The Hollow sleeps for ten thousand years.",
    "It is enough."]
  },
  ending_2: {
    portrait: null, emotion: null,
    lines: ["[Veyra is defeated. She is not dead. You held to that.]",
    "[She lies on the dais, the Hollow still curling at the edges of her eyes.]",
    "[Someone steps forward.]",
    "[\"I'll do it.\" Whoever you brought inside. \"I'll be the anchor.\"]",
    "[You want to argue. The math doesn't allow it.]",
    "",
    "[They step onto the dais. The green light reaches for them.]",
    "[They look back at the party — once — and smile.]",
    "[\"Make it count.\"]",
    "[The chant begins.]",
    "",
    "[The binding holds. But it is younger. Weaker. An anchor without centuries of preparation.]",
    "[Scholars will later estimate two hundred years. Perhaps five hundred.]",
    "[Perhaps more, if the world is careful.]",
    "",
    "[The world is rarely careful.]",
    "",
    "THE NEW VESSEL.",
    "The Hollow sleeps, for now.",
    "Someone else will face this. You bought them time."]
  },
  ending_3: {
    portrait: null, emotion: null,
    lines: ["[Veyra is dead.]",
    "[You feel it before you see it — a release of pressure, the way a room feels when a fire goes out.]",
    "[Except this fire was the binding.]",
    "",
    "[The dais cracks. The sigils activate all at once, burning the wrong color — not green but white, the color of something burning from within.]",
    "[The Hollow is free. It does not take form. It doesn't need to.]",
    "[It is in the floor. In the walls. In the air you breathe.]",
    "[It is in you, briefly, searching for purchase, and finding your WIS check, and sliding past.]",
    "[This time.]",
    "",
    "[You run. The cathedral collapses behind you into the Shattered Sea.]",
    "[On the black sand beach, you watch the green light begin to spread north.]",
    "[Slow at first. Then faster.]",
    "",
    "[The birds are gone.]",
    "[The old man in Hollowdrift drinks himself to sleep for the last time.]",
    "[The children stop drawing because there is nothing left to warn.]",
    "",
    "THE BREAKING.",
    "You could not save the world.",
    "But you survived. For now.",
    "It will have to be enough."]
  }
};

// ─── SCENE DEFINITIONS ────────────────────────────────────────────────────────
const SCENES = {
  road_arrival: {
    name: 'Road to Hollowdrift',
    art: 'road_arrival',
    hotspots: [
      { id: 'sign', x: 590, y: 310, w: 80, h: 80, label: 'Village Sign',
        action: 'examine', text: "The sign reads 'HOLLOWDRIFT — 312 souls — VEYRA'S PEACE.' Below it, in small angry letters: 'not here.'" },
      { id: 'tree', x: 60, y: 260, w: 90, h: 200, label: 'Dead Tree',
        action: 'examine', text: 'The tree leans south. They all lean south. You put your hand on the bark and feel something — almost a vibration. Very low. Below hearing.' },
      { id: 'crow', x: 400, y: 380, w: 40, h: 30, label: 'Crow',
        action: 'examine', text: 'The crow watches you. Then it lifts off and flies north. Away from the village.' },
      { id: 'continue', x: 380, y: 480, w: 200, h: 80, label: '► Enter Village',
        action: 'goto', dest: 'road_village' }
    ]
  },

  road_village: {
    name: 'Hollowdrift',
    art: 'road_village',
    hotspots: [
      { id: 'child', x: 260, y: 395, w: 50, h: 50, label: 'Child Drawing',
        action: 'examine', text: "She's drawing a circle with a mouth in it. When she sees you looking, she scuffs it out with her boot and runs.", flag: 'SAW_CHILD_DRAWING' },
      { id: 'vess', x: 100, y: 355, w: 60, h: 60, label: 'Old Man (Vess)',
        action: 'dialogue', dialogue: 'vess_initial' },
      { id: 'woman', x: 560, y: 365, w: 50, h: 60, label: 'Woman with Basket',
        action: 'examine', text: "She pulls her basket tighter. 'Passing through?' She doesn't wait for an answer. 'Good.'" },
      { id: 'well', x: 430, y: 330, w: 100, h: 70, label: 'Village Well',
        action: 'examine', text: "A notice nailed to the post: 'DREAMWORT TEA SERVED FREE AT THE DRIFT HOUSE.' Below in different handwriting: 'Drink it. You'll sleep better. We all do.'" },
      { id: 'inn', x: 30, y: 240, w: 230, h: 250, label: '► Drift House Inn',
        action: 'goto', dest: 'drift_house_exterior' },
      { id: 'guard', x: 730, y: 240, w: 200, h: 250, label: '► Guard Station',
        action: 'goto', dest: 'guard_station' }
    ]
  },

  guard_station: {
    name: 'Guard Station',
    art: 'guard_station',
    hotspots: [
      { id: 'swords', x: 690, y: 100, w: 150, h: 200, label: 'Sword Rack',
        action: 'examine', text: 'Standard-issue Ashen Vale swords. One is missing from the rack. Blood on the hilt of the nearest one — recently cleaned, not quite clean enough.' },
      { id: 'papers', x: 290, y: 280, w: 380, h: 50, label: 'Desk Papers',
        action: 'examine', text: "Reports. Orders. You can make out a few words: 'courier,' 'closed,' 'Veyra's seal.' The rest is face-down." },
      { id: 'loyar', x: 430, y: 270, w: 140, h: 60, label: 'Captain Loyar',
        action: 'dialogue', dialogue: 'loyar_initial' },
      { id: 'back', x: 860, y: 540, w: 100, h: 50, label: '◄ Back',
        action: 'goto', dest: 'road_village' }
    ]
  },

  drift_house_exterior: {
    name: 'Drift House (Exterior)',
    art: 'drift_house_exterior',
    hotspots: [
      { id: 'stable', x: 640, y: 280, w: 230, h: 220, label: 'Stable',
        action: 'examine', text: 'Empty. No horses. The straw is fresh. Something was here recently and has been moved.' },
      { id: 'enter', x: 270, y: 380, w: 120, h: 120, label: '► Enter Inn',
        action: 'goto', dest: 'drift_house_interior' },
      { id: 'back', x: 860, y: 540, w: 100, h: 50, label: '◄ Back',
        action: 'goto', dest: 'road_village' }
    ]
  },

  drift_house_interior: {
    name: 'Drift House Inn',
    art: 'drift_house_interior',
    hotspots: [
      { id: 'stain', x: 330, y: 395, w: 100, h: 40, label: 'Floor Stain',
        action: 'examine', text: "Someone scrubbed hard and almost succeeded. The stain is long and dark. Whatever made it was on the floor for a while before anyone cleaned it. This is not a spill.", flag: 'FOUND_STAIN' },
      { id: 'fire', x: 820, y: 200, w: 140, h: 200, label: 'Hearth',
        action: 'examine', text: "Hot. Someone feeds this fire all night. On the mantle: a small carved figure, arms spread, the kind of offering you make when you're afraid of something specific." },
      { id: 'drunk', x: 280, y: 330, w: 60, h: 60, label: 'Local Man',
        action: 'examine', text: "'I don't know anything,' he says before you've spoken." },
      { id: 'woman', x: 500, y: 335, w: 60, h: 60, label: 'Local Woman',
        action: 'examine', text: "She shakes her head. 'Wasn't here that night. Not me. Ask Hastha.'" },
      { id: 'stairs', x: 720, y: 280, w: 100, h: 150, label: 'Stairs (roped off)',
        action: 'examine', text: 'A rope across the stairs. A sign: GUEST FLOOR — INQUIRE AT BAR. The rope is a recent addition.', cond_flag: 'MIRA_LOCATION_KNOWN', cond_action: 'goto:mira_room' },
      { id: 'hastha', x: 70, y: 240, w: 150, h: 80, label: 'Hastha Torren',
        action: 'dialogue', dialogue: 'hastha_initial' },
      { id: 'exit', x: 0, y: 440, w: 60, h: 100, label: '◄ Exit',
        action: 'goto', dest: 'drift_house_exterior' }
    ]
  },

  root_cellar: {
    name: 'Root Cellar',
    art: 'root_cellar',
    hotspots: [
      { id: 'body1', x: 270, y: 370, w: 170, h: 80, label: 'Body (1st)',
        action: 'examine', text: 'A man in Ashen Vale guard uniform — but no insignia. Clean stab wounds from Hastha\'s knife. The blood has dried gray. Strange gray. Not quite any color you\'ve seen in a person before.', flag: 'FOUND_CELLAR_BODIES' },
      { id: 'pendant', x: 270, y: 370, w: 170, h: 80, label: 'Take Pendant',
        action: 'take', item: 'hound_pendant', cond_flag: 'FOUND_CELLAR_BODIES',
        text: 'A small carved stone pendant — a circle with a mouth. The same thing the child was drawing in the dirt.' },
      { id: 'body2', x: 450, y: 375, w: 170, h: 75, label: 'Body (2nd)',
        action: 'examine', text: "A scrap of paper in his boot: 'HD - confirmed - return.' HD. Hound... something.", flag: 'FOUND_HD_NOTE' },
      { id: 'hastha_voice', x: 440, y: 180, w: 80, h: 100, label: 'Listen to Hastha',
        action: 'examine', text: "'My husband was a wizard. When the magistrates came for him, he didn't lie down. They killed him for it. I learned what I needed to learn.'" },
      { id: 'boxes', x: 800, y: 380, w: 80, h: 80, label: 'Hidden Boxes',
        action: 'examine', cond_flag: 'FOUND_CELLAR_BODIES',
        text: 'Behind a barrel — a hollow in the wall. Two locked boxes. Hastha pries them open. Tomas\'s things. A scroll of Detect Magic. A scroll of Comprehend Languages.', flag: 'FOUND_TOMAS_BOOKS',
        give_items: ['tomas_scroll_dm','tomas_scroll_cl'] },
      { id: 'back', x: 420, y: 460, w: 120, h: 80, label: '◄ Back',
        action: 'goto', dest: 'drift_house_interior' }
    ]
  },

  road_village_wood: {
    name: 'Hollowdrift — Forest Edge',
    art: 'road_village',
    hotspots: [
      { id: 'woods', x: 340, y: 240, w: 280, h: 200, label: '► Whispering Wood',
        action: 'goto', dest: 'whispering_wood' },
      { id: 'back', x: 860, y: 540, w: 100, h: 50, label: '◄ Back',
        action: 'goto', dest: 'road_village' }
    ]
  },

  whispering_wood: {
    name: 'Whispering Wood',
    art: 'whispering_wood',
    hotspots: [
      { id: 'trees', x: 0, y: 40, w: 200, h: 500, label: 'Leaning Trees',
        action: 'examine', text: 'They lean. You put your hand on the bark and feel something — almost a vibration. Very low. Below hearing. Whatever it is, it\'s coming from far below.' },
      { id: 'moss', x: 420, y: 360, w: 100, h: 80, label: 'Flattened Moss',
        action: 'examine', text: 'A man-shaped impression in the moss. He lay here for some time, then was dragged. You can see the drag marks leading back toward town.', flag: 'FOUND_MOSS_IMPRESSION' },
      { id: 'strap', x: 510, y: 400, w: 60, h: 30, label: 'Leather Strap',
        action: 'take', item: 'courier_strap', text: "A courier's pouch strap, cut clean. This is where they intercepted him first.", flag: 'FOUND_COURIER_STRAP' },
      { id: 'sigil', x: 130, y: 185, w: 70, h: 70, label: 'Carved Sigil',
        action: 'examine', text: 'At chest height on the tree: a circle with a mouth, carved deep. The same symbol as the pendant. A rally mark — you think. Something for them to find each other by.', flag: 'SIGIL_FOUND_IN_WOOD' },
      { id: 'gray', x: 610, y: 380, w: 30, h: 20, label: 'Gray Drop',
        action: 'examine', cond_flag: 'FOUND_CELLAR_BODIES',
        text: 'Gray. Viscous. The same color as the blood in the root cellar. One of them was wounded before they left.' },
      { id: 'back', x: 860, y: 540, w: 100, h: 50, label: '◄ Back',
        action: 'goto', dest: 'road_village' }
    ]
  },

  mira_room: {
    name: "Mira's Room",
    art: 'mira_room',
    hotspots: [
      { id: 'mira', x: 680, y: 340, w: 140, h: 160, label: 'Mira Hollen',
        action: 'dialogue', dialogue: 'mira_first' }
    ]
  },

  cinder_ford: {
    name: 'Cinder River Ford',
    art: 'cinder_ford',
    hotspots: [
      { id: 'water', x: 0, y: 270, w: 960, h: 160, label: 'The River',
        action: 'examine', text: 'Warm when you touch it. Black with minerals. The sunken road below is fitted stone — ancient, pre-Fall. Someone built this to last.' },
      { id: 'eels', x: 0, y: 290, w: 960, h: 100, label: 'Shapes in Water',
        action: 'examine', text: 'Something large moves in the current. Something the size of cattle, slow and deliberate. It tracks you.' },
      { id: 'patrol', x: 720, y: 380, w: 100, h: 80, label: 'Ashen Vale Patrol',
        action: 'examine', text: 'Two guards moving away. You have maybe ten minutes before they loop back.' },
      { id: 'cross', x: 350, y: 500, w: 260, h: 80, label: '► Cross the River',
        action: 'skill_check', check: 'stealth', dc: 14, pass: 'ford_crossed', fail: 'combat:ford_eels' }
    ]
  },

  ember_camp: {
    name: 'Ember Cell Camp',
    art: 'ember_camp',
    hotspots: [
      { id: 'yssen', x: 400, y: 310, w: 100, h: 80, label: 'Yssen Mar',
        action: 'dialogue', dialogue: 'yssen_initial' },
      { id: 'rebels', x: 170, y: 335, w: 100, h: 80, label: 'Ember Cell Fighter',
        action: 'examine', text: "He looks at you with the eyes of someone who has committed to something and is pretending they don't regret it." },
      { id: 'fire', x: 420, y: 330, w: 120, h: 60, label: 'Campfire',
        action: 'examine', text: 'The fire burns low. Around it, fifteen people who have chosen a hard path and are still choosing it, every day.' }
    ]
  },

  vael_city: {
    name: 'Vael Auren — Market District',
    art: 'glass_city',
    hotspots: [
      { id: 'shop', x: 220, y: 320, w: 180, h: 100, label: '► Merchant Stall',
        action: 'shop', items: ['healing_draught','greater_healing','dreamwort_tea','brine_salt','revive_herb'] },
      { id: 'scholar', x: 400, y: 340, w: 80, h: 80, label: 'Scholar',
        action: 'examine', text: "He's reading six books simultaneously. 'Veyra's proposed peace summit,' he says without looking up. 'Remarkable initiative. She's proposing the Magi gather to stabilize the seal network. If they all show up, it's the first full Conclave in twenty years.'" },
      { id: 'board', x: 450, y: 270, w: 90, h: 80, label: 'Notice Board',
        action: 'examine', text: "Six notices. Three routine. One: the peace summit, venue Vael Auren, date in two weeks. One: TREASON — YSSEN MAR — 500g REWARD. And one handwritten, new, on cheap paper: 'EDDIK — AMBER DOOR — DON'T COME AFTER DARK.'" },
      { id: 'chapter', x: 0, y: 300, w: 100, h: 200, label: '► Quiet Hand',
        action: 'goto', dest: 'chapter_house' },
      { id: 'slum', x: 860, y: 300, w: 100, h: 200, label: '► Glass Wells',
        action: 'goto', dest: 'eddik_flophouse', cond_flag: 'MET_ORENNA' }
    ]
  },

  chapter_house: {
    name: 'Order of the Quiet Hand',
    art: 'chapter_house',
    hotspots: [
      { id: 'orenna', x: 360, y: 280, w: 100, h: 80, label: 'Sister Orenna',
        action: 'dialogue', dialogue: 'orenna_initial', flag: 'MET_ORENNA' },
      { id: 'thess', x: 580, y: 270, w: 100, h: 80, label: 'High Scholar Thess Varn',
        action: 'dialogue', dialogue: 'thess_initial', flag: 'MET_THESS_VARN' },
      { id: 'books', x: 0, y: 40, w: 200, h: 250, label: 'The Collection',
        action: 'examine', text: 'Thousands of texts. Pre-Fall fragments, translations, linguistic analyses. The Order has spent five centuries collecting knowledge most people have forgotten they lost.' },
      { id: 'back', x: 860, y: 540, w: 100, h: 50, label: '◄ Back',
        action: 'goto', dest: 'vael_city' }
    ]
  },

  eddik_flophouse: {
    name: "Eddik's Room",
    art: 'eddik_flophouse',
    hotspots: [
      { id: 'eddik', x: 500, y: 310, w: 280, h: 130, label: 'Eddik',
        action: 'dialogue', dialogue: 'eddik_initial', flag: 'MET_EDDIK' },
      { id: 'pack', x: 160, y: 405, w: 100, h: 80, label: "Eddik's Pack",
        action: 'examine', cond_flag: 'EDDIK_DIED',
        text: 'His pack. Sparse. He was ready to run at any moment. Inside: a purse of coin, and a small book he wanted someone to find.', give_items: ['eddik_journal'] },
      { id: 'coin', x: 160, y: 405, w: 100, h: 80, label: 'Take Coin',
        action: 'take', item: 'gold_100', cond_flag: 'EDDIK_DIED', text: '100 gold, sewn into the pack lining.' }
    ]
  },

  iron_reach: {
    name: "Karvath — Sereth's Hall",
    art: 'iron_reach',
    hotspots: [
      { id: 'sereth', x: 430, y: 280, w: 120, h: 80, label: 'Magus Sereth',
        action: 'dialogue', dialogue: 'sereth_initial', flag: 'MET_SERETH' },
      { id: 'map', x: 280, y: 316, w: 400, h: 80, label: 'War Table',
        action: 'examine', text: "A tactical map of the Cinder River border. Pins show troop positions. Sereth's forces are mobilized but haven't crossed yet. He's waiting for something — provocation, or proof." },
      { id: 'banner', x: 420, y: 40, w: 120, h: 160, label: 'Iron Reach Banner',
        action: 'examine', text: "The Iron Reach sigil: a closed fist. The same shape as Sereth's seal. Distinctive. Unmistakable. And the seal on the letter is close, but not quite." }
    ]
  },

  salt_coast: {
    name: 'Salt Coast Ruins',
    art: 'salt_coast',
    hotspots: [
      { id: 'citadel', x: 0, y: 220, w: 500, h: 420, label: 'The Citadel',
        action: 'examine', text: 'Half-collapsed into the sea. Salt has gotten into everything. The eastern wall has slipped into the surf and taken two centuries of records with it.' },
      { id: 'library', x: 285, y: 330, w: 150, h: 200, label: '► Kessith\'s Library',
        action: 'goto_combat', dest: 'salt_library_interior', combat: 'salt_library' },
      { id: 'crystals', x: 60, y: 415, w: 50, h: 60, label: 'Salt Crystals',
        action: 'take', item: 'brine_salt', text: 'Natural brine salt, crystallized from the sea spray.' }
    ]
  },

  spymaster_crypt: {
    name: 'The Chapel Crypt',
    art: 'spymaster_crypt',
    hotspots: [
      { id: 'calvix', x: 420, y: 260, w: 120, h: 80, label: 'Calvix Marn',
        action: 'dialogue', dialogue: 'calvix_initial', flag: 'MET_CALVIX',
        cond_flag: 'FOUND_KESSITH_JOURNAL' }
    ]
  },

  cathedral_exterior: {
    name: 'The Sunken Cathedral',
    art: 'cathedral_exterior',
    hotspots: [
      { id: 'door', x: 390, y: 330, w: 180, h: 250, label: '► The Tide-Door',
        action: 'goto', dest: 'cathedral_1' },
      { id: 'water', x: 0, y: 380, w: 960, h: 100, label: 'The Shattered Sea',
        action: 'examine', text: 'The sea is still, except for where the cathedral broke the surface. The water around the exposed stones is the wrong temperature — cold on one side, warm on the other. Something below is still running.' },
      { id: 'spires', x: 150, y: 50, w: 600, h: 350, label: 'The Spires',
        action: 'examine', text: 'Not human architecture. The proportions are wrong — the angles are wrong. Whatever built this did not build it to be entered by human beings. It was built to be sealed.' }
    ]
  }
};

// Orenna dialogue
DIALOGUE.orenna_initial = {
  portrait: 'orenna', emotion: 'warm',
  lines: ['"Travelers with questions — the Order\'s bread and butter. What can we help you with?"'],
  choices: [
    { text: 'We\'re looking for a man named Eddik.', next: 'orenna_eddik' },
    { text: 'What do you know about the Hollow Below?', next: 'orenna_hollow' },
    { text: 'Do you know Veyra\'s summit is a trap?', next: 'orenna_summit' }
  ]
};
DIALOGUE.orenna_eddik = {
  portrait: 'orenna', emotion: 'worried',
  lines: ['"Eddik. A former Veyra advisor. He came to us briefly, a few months ago, then disappeared again."',
  '"He was... frightened. Beyond what I would expect from political exile."',
  '"If you find him — please tell him we mean him no harm."'],
  choices: [{ text: 'Thank you.', next: null, flag: 'ORENNA_TOLD_EDDIK' }]
};
DIALOGUE.orenna_hollow = {
  portrait: 'orenna', emotion: 'interested',
  lines: ['"Old texts. Pre-Fall scholarship."',
  '"The Hollow Below is mentioned in a handful of fragmentary sources. All agree it was something bound beneath the Shattered Sea."',
  '"Most scholars consider it mythology. But—"',
  '[She hesitates.]',
  '"The sea has been receding. Two years. We can\'t explain it."'],
  choices: [{ text: 'What if it\'s not mythology?', next: 'orenna_serious' }]
};
DIALOGUE.orenna_serious = {
  portrait: 'orenna', emotion: 'worried',
  lines: ['"Then we are all in considerably more trouble than I had previously supposed."',
  '"The texts say it can only be re-bound by a willing vessel."',
  '"They also say it will be patient. That it has always been patient."'],
  choices: [{ text: 'Thank you, Sister Orenna.', next: null }]
};
DIALOGUE.orenna_summit = {
  portrait: 'orenna', emotion: 'worried',
  lines: ['"That is a serious allegation."',
  '"If you have evidence, we should—"',
  '[Thess Varn appears behind her, very quietly.]',
  '"Sister Orenna, we shouldn\'t burden our guests with internal matters. Let me help them with what they\'ve come for."',
  '[His smile never wavers.]'],
  choices: [{ text: 'Tell Orenna directly, away from Thess.', next: 'orenna_warned' },
            { text: 'Trust Thess with this.', next: 'orenna_thess_hears', flag: 'THESS_KNOWS_PLANS' }]
};
DIALOGUE.orenna_warned = {
  portrait: 'orenna', emotion: 'worried',
  lines: ['"I will look into this. Carefully."',
  '"And... quietly."'],
  choices: [{ text: 'Good.', next: null }]
};
DIALOGUE.orenna_thess_hears = {
  portrait: 'thess', emotion: 'warm',
  lines: ['"How remarkable. Thank you for bringing this to us."',
  '"We will investigate through proper channels. I\'ll make sure Orenna is fully briefed."',
  '"[Ten minutes after you leave, he sends a sealed letter to Veyra with your plans.]"'],
  choices: [{ text: '(Continue)', next: null, flag: 'THESS_KNOWS_PLANS' }]
};

DIALOGUE.thess_initial = {
  portrait: 'thess', emotion: 'warm',
  lines: ['"Ah, students of the old world. Tell me what you seek and I\'ll share what we know."'],
  choices: [
    { text: 'The Hollow Below.', next: 'thess_hollow' },
    { text: 'The binding network — the anchor stones.', next: 'thess_anchors' }
  ]
};
DIALOGUE.thess_hollow = {
  portrait: 'thess', emotion: 'warm',
  lines: ['"A fascinating creature of legend."',
  '"The ancient texts call it Vehl-Aratur-Im — \'the hunger that dreams.\'"',
  '"But it\'s mythology, of course. No scholarly consensus supports the literal interpretation."',
  '[DC 18 Insight: He is calmer than he should be. A scholar asked about their specialty should be enthusiastic. He is performing calm.]'],
  choices: [
    { text: 'What if it\'s literal?', next: 'thess_deflect' },
    { text: '[Insight: He\'s hiding something]', next: 'thess_revealed', check: 'insight', dc: 18 }
  ]
};
DIALOGUE.thess_deflect = {
  portrait: 'thess', emotion: 'warm',
  lines: ['"An interesting thought experiment. But the evidence simply isn\'t—"',
  '[He smiles. The smile does not reach his eyes in quite the right way.]',
  '"Mythology serves a purpose even when not literally true. Perhaps especially then."'],
  choices: [{ text: '(End)', next: null }]
};
DIALOGUE.thess_revealed = {
  portrait: 'thess', emotion: 'revealed',
  lines: ['[You confront him. Directly. You show him what you know.]',
  '[For just a moment — his composure fractures. The green flickers behind his eyes.]',
  '[Then it\'s gone, and the smile is back, and he says:]',
  '"I think this conversation is over."'],
  choices: [
    { text: 'Detain him and extract information.', next: 'thess_extract' },
    { text: 'Let him go — he\'ll warn her anyway.', next: null }
  ]
};
DIALOGUE.thess_extract = {
  portrait: 'thess', emotion: 'revealed',
  lines: ['[With... persuasion — and the right pressure — he talks.]',
  '"The ritual requires she speak the binding-words herself. In her own voice."',
  '"She must be fully present in her body. If she doubts — if she genuinely doubts — the ritual collapses."',
  '"You cannot make her doubt. She has been shielded from doubt for forty years."',
  '[He looks at you with something almost like pity.]',
  '"Almost cannot. There may be something in the cathedral that would help. The original binders\' work."'],
  choices: [{ text: 'Thank you.', next: null, flag: 'THESS_REVEALED_WEAKNESS' }]
};
DIALOGUE.thess_anchors = {
  portrait: 'thess', emotion: 'warm',
  lines: ['"The anchor stone theory. Yes. A discredited interpretation of Ardovan\'s Fragments."',
  '"If they existed — the theory goes — each stone would correspond to one of the ten realms\' founding locations."',
  '"But we have no physical evidence." [He pauses just a beat too long.] "Precisely."'],
  choices: [{ text: '(End)', next: null }]
};

// XP TABLE
const XP_TABLE = [0, 100, 250, 450, 700, 1000, 1350, 1800];

// WORLD MAP LOCATIONS
const MAP_LOCATIONS = {
  hollowdrift:    { x: 240, y: 420, name: 'Hollowdrift',      scene: 'road_village', unlocked: true },
  cinder_river:   { x: 320, y: 350, name: 'Cinder River',     scene: 'cinder_ford',  unlocked: false },
  ember_camp:     { x: 360, y: 310, name: 'Ember Cell Camp',   scene: 'ember_camp',   unlocked: false },
  vael_auren:     { x: 480, y: 200, name: 'Vael Auren',        scene: 'vael_city',    unlocked: false },
  iron_reach:     { x: 580, y: 280, name: 'Iron Reach',        scene: 'iron_reach',   unlocked: false },
  salt_coast:     { x: 680, y: 360, name: 'Salt Coast',        scene: 'salt_coast',   unlocked: false },
  black_coast:    { x: 240, y: 500, name: 'Black Coast',       scene: 'black_coast',  unlocked: false },
  cathedral:      { x: 240, y: 560, name: 'Sunken Cathedral',  scene: 'cathedral_exterior', unlocked: false }
};

// Cathedral rooms sequence
const CATHEDRAL_ROOMS = [
  { id: 'cathedral_1', name: 'The Tide-Door',         next: 'cathedral_2', combat: null },
  { id: 'cathedral_2', name: 'Vestibule of Names',    next: 'cathedral_3', combat: null, item: 'aratha_journal' },
  { id: 'cathedral_3', name: 'Hall of Mirrors',       next: 'cathedral_4', combat: 'cathedral_3' },
  { id: 'cathedral_4', name: 'Drowned Library',       next: 'cathedral_5', combat: 'cathedral_4', items: ['recording_1','recording_2','recording_3'] },
  { id: 'cathedral_5', name: 'Garden of Stones',      next: 'cathedral_6', combat: null, puzzle: 'stone_circle' },
  { id: 'cathedral_6', name: 'Corridor of Dreams',    next: 'cathedral_7', combat: 'cathedral_6' },
  { id: 'cathedral_7', name: 'Antechamber of the Choir', next: 'cathedral_8', combat: 'cathedral_7' },
  { id: 'cathedral_8', name: 'Pale Hound Reserve',    next: 'cathedral_9', combat: 'cathedral_8', stealth_bypass: true, treasure: ['greater_healing','greater_healing','greater_healing','cloak_protection'] },
  { id: 'cathedral_9', name: 'Vault of the First Binders', next: 'cathedral_10', combat: null, items_x12: 'binder_token' },
  { id: 'cathedral_10', name: 'The Threshold',        next: 'cathedral_11', combat: null, trap: 'fireball_glyph' },
  { id: 'cathedral_11', name: 'The Sea-Eye',          next: 'cathedral_12', combat: null, optional_check: 'sea_eye_vision' },
  { id: 'cathedral_12', name: 'The Binding Chamber',  next: null, combat: 'final_boss', final: true }
];
