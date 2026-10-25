from pathlib import Path
import json
ROOT=Path(__file__).resolve().parent
r=ROOT.parent.parent
controls=(ROOT/'standalone.js').read_text()
base='''<!doctype html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="140单元词义与语法应用学习页"><title>词义与语法应用 · LingoAce</title>STYLE</head><body class="ua-page"><div class="ua-standalone"><div class="ua-brand">lingoace<small>词义与语法应用 · From Rachel Hu</small></div><nav class="ua-nav ua" aria-label="选择学习单元"><label for="ua-unit">选择单元</label><select id="ua-unit"></select><input id="ua-search" type="search" placeholder="搜索教材、主题、词汇或语法" aria-label="搜索单元"><span class="ua-total" id="ua-total" aria-live="polite"></span></nav><main id="ua-content"></main></div>SCRIPTS</body></html>'''
external='<script src="unit-application-data.js?v=20261025-image4k"></script><script src="unit-application-export.js?v=20261025-image4k"></script><script src="unit-application.js?v=20261025-image4k"></script><script>'+controls+'</script>'
(r/'unit-application.html').write_text(base.replace('STYLE','<link rel="stylesheet" href="unit-application.css?v=20261025-image4k"><link rel="stylesheet" href="auth.css"><script src="auth.js"></script>').replace('SCRIPTS',external))
css=(r/'unit-application.css').read_text()
data=(r/'unit-application-data.js').read_text()
js=(r/'unit-application-export.js').read_text()+'\n'+(r/'unit-application.js').read_text()
inline=base.replace('STYLE','<style>'+css+'</style>').replace('SCRIPTS','<script>window.UNIT_APPLICATION_CSS='+json.dumps(css,ensure_ascii=False)+';'+data+js+controls+'</script>')
(r/'词义与语法应用-离线完整版.html').write_text(inline)
