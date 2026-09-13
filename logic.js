'use strict';
const CFG={ACCESS_CODE:'fartsheetai',DAILY_LIMIT:12,COOLDOWN_SEC:30,BASE_URL:'https://api.b.ai/v1',MODEL:'qwen3.8-flash',MAXT:{summary:350,devices:450,vocab:400,connections:450},CHUNKS:[[1,11],[12,23],[24,35],[36,49]]};
const API_KEY='';
function unlockOk(input){return String(input).trim().toLowerCase()===CFG.ACCESS_CODE;}
function todayStr(now){const d=now?new Date(now):new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');}
function defaultPages(part){const c=CFG.CHUNKS[part-1];return[c[0],c[1]];}
function ebookVerifiable(access){return access==='public_scan';}
function nextIncompletePart(parts){for(let p=1;p<=4;p++){const part=parts[String(p)];if(!part||!part.completed)return p;}return null;}
function sentenceCount(t){const m=String(t).trim().match(/[^.!?]+[.!?]+/g);return m?m.length:0;}
function usageAllowed(usage,nowMs){const now=nowMs||Date.now();const u={day:todayStr(now),calls:0,lastCallTs:0};Object.assign(u,usage||{});if(u.day!==todayStr(now)){u.day=todayStr(now);u.calls=0;}if(u.calls>=CFG.DAILY_LIMIT)return{ok:false,reason:'limit',u:u};const wait=CFG.COOLDOWN_SEC*1000-(now-u.lastCallTs);if(wait>0)return{ok:false,reason:'cooldown',retrySec:Math.ceil(wait/1000),u:u};return{ok:true,u:u};}
function parseSectionJSON(text){if(!text)return null;let t=String(text).trim();if(t.startsWith('```')){t=t.replace(/^```[a-zA-Z]*\n?/,'').replace(/\n?```\s*$/,'');}try{const o=JSON.parse(t);return(o&&typeof o==='object')?o:null;}catch(e){return null;}}
function buildSystemPrompt(book,pages,section,verifiable){
const head='You are drafting one section of a classroom F.A.R.T. (Friends All Reading Together) reading sheet for the book "'+book.title+'" by '+(book.author||'unknown author')+'. Today\'s reading: pages '+pages[0]+'-'+pages[1]+'. Output ONLY a single JSON object exactly matching the requested shape. No markdown fences, no commentary, no trailing text.';
const honesty=verifiable?' The full text of this book is publicly available online: keep quotes faithful to the real text.':' You cannot see the student\'s copy of the book, so this is a best-effort draft from general knowledge of the plot: never invent chapter names, keep quoted sentences short and plausible, and write complete self-contained sentences. The student must fix quotes against the sentences they actually read.';
const rules={
summary:'Section: SUMMARY. JSON shape: {"summary":"one paragraph summarizing the main points of what happens in these pages, written for a student, at least 5 sentences"}.',
devices:'Section: LITERARY DEVICES. JSON shape: {"devices":[{"name":"device name","quote":"one sentence from these pages containing the device, quoted correctly","effect":"complete sentence: how this device affects the reader understanding, emotions, or engagement","mood":"complete sentence: how this device contributes to the mood or tone of the passage"}]} with exactly 2 entries using DIFFERENT devices chosen from: simile, metaphor, personification, onomatopoeia, hyperbole, alliteration, allusion, or similar.',
vocab:'Section: VOCABULARY. JSON shape: {"words":[{"word":"a word from these pages that is new, funny, interesting, hard, uncommon, strange, or important","definition":"plain dictionary definition of the word","quote":"one sentence from these pages that uses the word, quoted correctly"}]} with exactly 3 entries.',
connections:'Section: CONNECTIONS. JSON shape: {"connections":[{"pages":"page number(s) inside the reading range","quote":"one quoted sentence or short passage from these pages that stands out","connection":"2 or more sentences, first person as a student: why the quote stood out, what you thought or felt reading it, and what it clarifies about the story, a character, a conflict, or a theme"}]} with exactly 2 entries.'};
return head+honesty+' '+rules[section];}
function buildUserPrompt(book,section){return 'Write the '+section+' section for "'+book.title+'". Remember: one JSON object only.';}
