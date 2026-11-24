const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const { test } = require("node:test");
const source = fs.readFileSync("src/static/theme.js", "utf8");
function setup(saved, prefersDark, blocked = false) {
  const root = { dataset: {} }, attrs = {}, handlers = {};
  const button = { setAttribute: (key, value) => attrs[key] = value, addEventListener: (key, fn) => handlers[key] = fn };
  const storage = {getItem: () => { if (blocked) throw Error("blocked"); return saved; },setItem: (_,v) => { if (blocked) throw Error("blocked"); saved=v; }};
  vm.runInNewContext(source,{document:{documentElement:root,getElementById:()=>button},localStorage:storage,matchMedia:()=>({matches:prefersDark,addEventListener:(k,f)=>handlers.media=f})});
  return {root,attrs,handlers,button,getSaved:()=>saved};
}
test("system preference, click, persistence and ARIA",()=>{ const s=setup(null,true); assert.equal(s.root.dataset.theme,"dark"); assert.equal(s.attrs["aria-pressed"],"true"); s.handlers.click(); assert.equal(s.root.dataset.theme,"light"); assert.equal(s.getSaved(),"light"); assert.equal(s.attrs["aria-pressed"],"false"); s.handlers.media({matches:true}); assert.equal(s.root.dataset.theme,"light"); });
test("saved preference and blocked storage",()=>{const s=setup("light",true);assert.equal(s.root.dataset.theme,"light"); const b=setup(null,false,true); b.handlers.click();assert.equal(b.root.dataset.theme,"dark");});
