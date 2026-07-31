import re

with open('popup/index.js', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

# Replace header block G,[...]
header_old = '(0,K.Lk)("div",G,[(0,K.Lk)("div",{class:"ext-header-left"},[(0,K.Lk)("div",{class:"logo"},[(0,K.Lk)("img",{src:"/public/images/icon128.png"})]),(0,K.Lk)("div",{class:"ext-title-group"},[(0,K.Lk)("div",{class:"ext-title-main",textContent:"Hanomonkey"}),(0,K.Lk)("div",{class:"ext-title-sub",textContent:"MV3"})])]),(0,K.Lk)("div",{class:"ext-plus-btn",title:"Add New Script",onClick:addNewScriptFromFile},"+")])'

header_new = '(0,K.CE)("div",{class:"header"},[(0,K.CE)("div",{class:"profile-section"},[(0,K.CE)("div",{class:"avatar"},[(0,K.Lk)("img",{src:"/public/images/icon128.png"})]),(0,K.CE)("div",{class:"title-group"},[(0,K.Lk)("span",{class:"main-title",textContent:"Hanomonkey"}),(0,K.Lk)("span",{class:"sub-title",textContent:"MV3"})])]),(0,K.CE)("div",{class:"plus-icon-container",title:"Add New Script",onClick:addNewScriptFromFile},[(0,K.CE)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"1.8","stroke-linecap":"round","stroke-linejoin":"round"},[(0,K.Lk)("line",{x1:"12",y1:"5",x2:"12",y2:"19"}),(0,K.Lk)("line",{x1:"5",y1:"12",x2:"19",y2:"12"})])])])'

text = text.replace(header_old, header_new)

# Replace search block
search_old = '(0,j.R1)(q).injectable?(0,K.bo)(((0,K.uX)(),(0,K.CE)("div",J,[(0,K.Lk)("div",z,[((0,K.uX)(!0),(0,K.CE)(K.FK,null,(0,K.pI)(Ze.value,(e,t,n)=>((0,K.uX)(),(0,K.CE)(K.FK,{key:e},[(0,K.Lk)("a",{target:"_blank",class:(0,S.C4)({ellipsis:!n,"mr-1":!n,"ml-1":n}),href:e,"data-message":e.split("://")[1],tabIndex:tt.value},[n?(0,K.Q3)("",!0):((0,K.uX)(),(0,K.Wv)((0,j.R1)(D.A),{key:0,name:"search"})),(0,K.eW)((0,S.v_)(t),1)],10,Z),n?(0,K.Q3)("",!0):((0,K.uX)(),(0,K.CE)(K.FK,{key:0},[(0,K.eW)("/")],64))],64))),128))])],512)),[[$.aG,(0,j.R1)(q).domain]]):(0,K.Q3)("",!0)'

search_new = '(0,K.CE)("div",{class:"search-container"},[(0,K.CE)("div",{class:"search-icon"},[(0,K.CE)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2.2","stroke-linecap":"round","stroke-linejoin":"round"},[(0,K.Lk)("circle",{cx:"11",cy:"11",r:"8"}),(0,K.Lk)("line",{x1:"21",y1:"21",x2:"16.65",y2:"16.65"})])]),(0,K.Lk)("div",{class:"search-placeholder",textContent:"Find scripts for this site (GF) / OUJS"})])'

text = text.replace(search_old, search_new)

# Replace script row block
script_old_prefix = '((0,K.uX)(),(0,K.CE)("div",{key:n.id,class:(0,S.C4)([{disabled:!n.config.enabled,failed:n.failed,removed:n.config.removed,runs:n.runs,"extras-shown":T.value===n,"excludes-shown":n.excludes},"script"])},['

idx_start = text.find(script_old_prefix)
if idx_start != -1:
    idx_end = text.find('],40,ce)', idx_start)
    old_item_block = text[idx_start:idx_end + len('],40,ce)')]
    
    new_item_block = '((0,K.uX)(),(0,K.CE)("div",{key:n.id,class:"item-row"},[(0,K.CE)("div",{class:"item-left"},[n.safeIcon?(0,K.Lk)("img",{class:"script-icon",src:n.safeIcon}):(0,K.Lk)("div",{class:"currency-icon",textContent:"₽"}),(0,K.CE)("label",{class:"switch",onClick:e=>{e.stopPropagation();pt(n)}},[(0,K.Lk)("input",{type:"checkbox",checked:!!n.config.enabled}),(0,K.Lk)("span",{class:"slider"})]),(0,K.Lk)("div",{class:"item-text",textContent:n.name,onClick:e=>{e.stopPropagation();ct(n)}})]),(0,K.CE)("div",{class:"item-actions"},[(0,K.CE)("button",{class:"action-btn code-btn",title:"View Code",onClick:e=>{e.stopPropagation();ct(n)}},[(0,K.CE)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[(0,K.Lk)("polyline",{points:"16 18 22 12 16 6"}),(0,K.Lk)("polyline",{points:"8 6 2 12 8 18"})])]),(0,K.CE)("button",{class:"action-btn delete-btn",title:"Delete",onClick:e=>{e.stopPropagation();removeScriptById(n)}},[(0,K.CE)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[(0,K.Lk)("polyline",{points:"3 6 5 6 21 6"}),(0,K.Lk)("path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"}),(0,K.Lk)("line",{x1:"10",y1:"11",x2:"10",y2:"17"}),(0,K.Lk)("line",{x1:"14",y1:"11",x2:"14",y2:"17"})])])])]))'
    
    text = text.replace(old_item_block, new_item_block)
    print("Replaced script item row block successfully!")
else:
    print("Could not find script_old_prefix!")

with open('popup/index.js', 'w', encoding='utf-8') as f:
    f.write(text)

print("Updated popup/index.js successfully!")
