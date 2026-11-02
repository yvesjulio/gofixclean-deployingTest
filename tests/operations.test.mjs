import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
const source=fs.readFileSync(new URL('../src/lib/operations.ts',import.meta.url),'utf8').replace(/^import .*\n/,'');
const compiled=ts.transpileModule(source,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.CommonJS}}).outputText;
function operations(supabase={}){const exports={};vm.runInNewContext(compiled,{exports,supabase,URL,Intl,Date});return exports;}
test('phone links preserve Rwanda international and local formats',()=>{const op=operations();for(const n of ['0780000000','780000000','+250 780 000 000'])assert.equal(op.phone(n),'250780000000');});
test('only HTTPS media can be opened from admin',()=>{const op=operations();assert.equal(op.safeMedia(['javascript:alert(1)','http://example.invalid/a.jpg','https://example.invalid/a.jpg']).length,1);assert.equal(op.safeMedia(null).length,0);});
test('bookings beyond the API first page are retained',async()=>{const ranges=[];const rows=Array.from({length:501},(_,i)=>({id:String(i)}));const client={from:()=>{const q={select(){return q},order(){return q},range(start,end){ranges.push([start,end]);return Promise.resolve({data:rows.slice(start,end+1),error:null});}};return q;}};const data=await operations(client).allRows('bookings');assert.equal(data.length,501);assert.deepEqual(ranges,[[0,499],[500,999]]);});
test('database read errors are surfaced rather than shown as empty data',async()=>{const error={message:'permission denied'};const client={from:()=>{const q={select(){return q},order(){return q},range:async()=>({data:null,error})};return q;}};await assert.rejects(()=>operations(client).allRows('bookings'),e=>e===error);});
test('zero-row updates do not report success',async()=>{const client={from:()=>{const q={update(){return q},eq(){return q},select(){return q},single:async()=>({data:null,error:null})};return q;}};await assert.rejects(()=>operations(client).saveBooking('missing',{status:'completed'}),/No booking updated/);});
test('completed and cancelled jobs do not appear as active',()=>{const op=operations();assert.equal(op.active({status:'completed'}),false);assert.equal(op.active({status:'cancelled'}),false);assert.equal(op.active({status:'pending'}),true);assert.equal(op.active({status:null}),true);assert.match(op.today(),/^\d{4}-\d{2}-\d{2}$/);});
