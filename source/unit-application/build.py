from pathlib import Path
import json,re,collections
ROOT=Path(__file__).resolve().parent
DIST=ROOT.parent.parent
catalog=json.loads((DIST/'catalog.json').read_text())
profiles=json.loads((ROOT/'profiles.json').read_text())
senses={}
for line in (ROOT/'senses.tsv').read_text().splitlines():
    c=line.split('|'); assert (len(c)-1)%5==0,c
    senses[c[0]]={'word':c[0],'meanings':[dict(zip(['meaning','icon','scene','en','zh'],c[i:i+5])) for i in range(1,len(c),5)]}
rows=collections.defaultdict(list)
for file in ['grammar.tsv','grammar-extra.tsv']:
    for line in (ROOT/file).read_text().splitlines():
        c=line.split('|'); assert len(c)==9,c
        unit,key,scene,en1,zh1,en2,zh2,task,answer=c
        p=profiles[key]
        rows[unit].append({'profile':key,'title':p[0],'rule':p[1],'scene':scene,'examples':[{'en':en1,'zh':zh1},{'en':en2,'zh':zh2}],'task':task,'answer':answer,'correct':p[2],'incorrect':p[3],'reason':p[4]})
def match(w):
    v=(w.get('say') or w['en']).lower().strip()
    v=re.sub(r'\s*\(.*','',v).strip().replace('*','')
    variants=[v,v.split(' ')[0]]
    if v.startswith(('a piece of','a bottle of','a glass of')):variants.append(v.split(' ')[1])
    if v=='feet':variants+=['foot']
    if 'film' in v.split(' '):variants+=['film']
    if v=='flies':variants+=['fly']
    if v.endswith('s'):variants+=[v[:-1]]
    return next((senses[k] for k in variants if k in senses),None)
units=[]
for u in catalog:
    assert rows[u['id']],u['id']
    found=[]
    for w in u['words']:
        s=match(w)
        if s and s['word'] not in [p['word'] for p in found]:found.append(s)
    # Keep a manageable set; prioritize genuine distinct meanings over basic word-class shifts.
    priority={'light':0,'good':0,'play':0,'book':0,'current':0,'scale':0,'mean':0,'right':0,'state':0,'form':0,'spring':0,'change':0,'patient':0,'cold':0,'mouse':0,'present':0,'square':0,'rock':0,'object':0,'value':0,'power':0,'ground':0}
    found.sort(key=lambda s:priority.get(s['word'],1))
    inferred=u['id'].startswith('P_L3_') and u['no']>=5
    lexical=u['id'] in ['R_L6_U05','R_L7_U07']
    note='本包缺少该单元原始课次句型；以下为围绕单元主题编写的拓展，不标为教材原有语法。' if inferred else ('本单元原记录侧重词义学习；以下语法为配合主题新增的应用句型。' if lexical else '依据本包已有单元课序与句型编写；以下例句、任务与答案均为新增教学拓展。')
    if u['id']=='R_L5_U02':
        rows[u['id']][0]['task']='用are说这些动物在它们的栖息地中很安全。'
        rows[u['id']][0]['answer']='These animals are safe in their habitat.'
    units.append({'id':u['id'],'material':u['material'],'level':u['level'],'no':u['no'],'title':u['title'],'low':u['low'],'note':note,'kind':'主题拓展' if inferred or lexical else '课序对应','lessons':[l['title'] for l in u['lessons'] if l.get('patterns') and not l.get('isReview')], 'grammar':rows[u['id']],'senses':found[:2]})
out={'version':'20261025-application-1','units':units}
(DIST/'unit-application-data.json').write_text(json.dumps(out,ensure_ascii=False,indent=2))
(DIST/'unit-application-data.js').write_text('window.UNIT_APPLICATION_DATA='+json.dumps(out,ensure_ascii=False,separators=(',',':'))+';\n')
print(json.dumps({'units':len(units),'grammar_groups':sum(len(u['grammar']) for u in units),'polysemy_units':sum(bool(u['senses']) for u in units),'polysemy_groups':sum(len(u['senses']) for u in units),'without_polysemy':[u['id'] for u in units if not u['senses']]},ensure_ascii=False))
