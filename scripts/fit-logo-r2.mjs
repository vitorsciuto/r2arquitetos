// Ferramenta de conferência usada uma vez, em 03/10/2026, para recuperar o enquadramento
// do monograma a partir do recorte recebido do Wix. Os resultados daquele dia estão em
// marca/identidade-r2/qa/historico/fit-*.json; se rodar de novo, grava qa/fit-*.json.
// Não define a posição atual do glifo: a regra vigente é 0,64 da largura do quadrado,
// centrado pela borda visível, aplicada por scripts/gerar-logos-r2.mjs.
// Uso, a partir da raiz do repositório: node scripts/fit-logo-r2.mjs <recorte.png>
// Lê marca/r2-avatar-cinza.svg, avatar antigo que fica no acervo de marca/.
import sharp from 'sharp';
import fs from 'node:fs/promises';
const source = process.argv[2];
if (!source) throw new Error('Pass the reference PNG path.');
const original = await fs.readFile('marca/r2-avatar-cinza.svg', 'utf8');
const glyphs = [...original.matchAll(/<path d="([^"]+)"/g)].map(m=>m[1]);
const {data,info}=await sharp(source).removeAlpha().greyscale().raw().toBuffer({resolveWithObject:true});
const w=info.width,h=info.height;
const visited=new Uint8Array(w*h), components=[];
for(let p=0;p<data.length;p++){
  if(visited[p]||data[p]<194) continue;
  const points=[p];visited[p]=1;
  for(let i=0;i<points.length;i++){
    const q=points[i],x=q%w,y=Math.floor(q/w);
    for(const n of [x>0?q-1:-1,x<w-1?q+1:-1,y>0?q-w:-1,y<h-1?q+w:-1]){
      if(n>=0&&!visited[n]&&data[n]>=194){visited[n]=1;points.push(n);}
    }
  }
  if(points.length>100)components.push(points);
}
components.sort((a,b)=>Math.min(...a)-Math.min(...b));
console.log('components',components.map(c=>({size:c.length,xmin:Math.min(...c.map(p=>p%w)),xmax:Math.max(...c.map(p=>p%w)),ymin:Math.min(...c.map(p=>Math.floor(p/w))),ymax:Math.max(...c.map(p=>Math.floor(p/w)))})));
for(let g=0;g<2;g++){
  const target = new Uint8Array(w*h);
  for(const p of components[g]) target[p]=255;
  const score=async p=>{
    const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><path fill="white" transform="translate(${p[0]} ${p[1]}) scale(${p[2]} ${p[3]})" d="${glyphs[g]}"/></svg>`;
    const pixels=await sharp(Buffer.from(svg)).ensureAlpha().raw().toBuffer();
    let total=0;
    for(let i=0;i<w*h;i++){const d=pixels[i*4+3]-target[i];total+=d*d;}
    return total;
  };
  let p=g===0?[-38,-88,4.4,4.4]:[-86,-226,5.86,5.86];
  let best=await score(p);
  for(const step of [2,1,.5,.25,.1,.05,.02,.01,.005]){
    for(let pass=0;pass<150;pass++){
      let improved=false;
      for(let i=0;i<4;i++)for(const s of [-1,1]){
        const q=[...p];q[i]+=s*(i<2?step:step/30);
        const e=await score(q);
        if(e<best){best=e;p=q;improved=true;}
      }
      if(!improved)break;
    }
  }
  console.log(g,{p,best});
  await fs.writeFile(`marca/identidade-r2/qa/fit-${g}.json`,JSON.stringify({path:glyphs[g],transform:p,score:best},null,2));
}
