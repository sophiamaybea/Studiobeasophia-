const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const url = 'https://studio-bea-sophia-somewhere-down-th.vercel.app/';
const outDir = path.resolve('studio-world-audit');
fs.mkdirSync(outDir, {recursive:true});
(async()=>{
 const browser=await chromium.launch({headless:true,args:['--no-sandbox','--disable-dev-shm-usage','--enable-webgl','--use-gl=angle','--use-angle=swiftshader']});
 try{
  const results=[];
  for(const vp of [{width:1440,height:900},{width:390,height:844}]){
   const context=await browser.newContext({viewport:vp,deviceScaleFactor:1,reducedMotion:'no-preference',ignoreHTTPSErrors:true});
   const page=await context.newPage();
   const errors=[], bad=[];
   page.on('pageerror',e=>errors.push(String(e.message).slice(0,500)));
   page.on('response',r=>{if(r.status()>=400)bad.push({status:r.status(),url:r.url().slice(0,100)});});
   const res=await page.goto(url,{waitUntil:'domcontentloaded',timeout:60000});
   await page.waitForTimeout(9000);
   const status=await page.evaluate(()=>({
     loaderHidden:document.getElementById('loading').classList.contains('hidden'),
     background:document.body.className,
     fallback:document.getElementById('fallback').style.display,
     webglCanvas:document.querySelector('#world')?.width,
     text:document.body.textContent.includes('Millions of people.'),
     scrollHeight:document.documentElement.scrollHeight
   }));
   const atlas=await page.request.get(url+'assets/illustration-atlas.b64');
   const atlasLen=(await atlas.text()).length;
   for(const f of [0,.2,.42,.58,.75,.91]){
     await page.evaluate(f=>scrollTo({top:(document.documentElement.scrollHeight-innerHeight)*f,behavior:'instant'}),f);
     await page.waitForTimeout(2400);
     await page.screenshot({path:path.join(outDir,'studio-'+vp.width+'-'+Math.round(f*100)+'.png'),animations:'disabled'});
   }
   const item={viewport:vp,status:res.status(),runtime:status,atlasStatus:atlas.status(),atlasLen,errors,bad};
   results.push(item);
   await context.close();
  }
  fs.writeFileSync(path.join(outDir,'report.json'),JSON.stringify(results,null,2));
  for(const x of results){
   console.log('WORLD_CHECK',JSON.stringify(x));
   if(x.status!==200||!x.runtime.loaderHidden||!x.runtime.webglCanvas||x.runtime.fallback==='block'||x.atlasStatus!==200||x.atlasLen<60000||x.errors.length){
    process.exitCode=1;
   }
  }
 }finally{await browser.close();}
})().catch(e=>{console.error('FAILED',e.stack);process.exitCode=1;});
