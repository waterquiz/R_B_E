import subprocess

# Read clean working popup/index.js
with open('popup/index.js', 'r', encoding='utf-8', errors='ignore') as f:
    js = f.read()

# Replace header block G,[...]
old_header = '(0,K.Lk)("div",G,[(0,K.Lk)("div",{class:"ext-header-left"},[(0,K.Lk)("div",{class:"logo"},[(0,K.Lk)("img",{src:"/public/images/icon128.png"})]),(0,K.Lk)("div",{class:"ext-title-group"},[(0,K.Lk)("div",{class:"ext-title-main",textContent:"Hanomonkey"}),(0,K.Lk)("div",{class:"ext-title-sub",textContent:"MV3"})])]),(0,K.Lk)("div",{class:"ext-plus-btn",title:"Add New Script",onClick:addNewScriptFromFile},"+")])'

new_header = '(0,K.CE)("div",{class:"header"},[(0,K.CE)("div",{class:"brand"},[(0,K.CE)("div",{class:"logo"},[(0,K.Lk)("img",{src:"/public/images/icon128.png",style:{width:"50px",height:"50px",borderRadius:"50%"}})]),(0,K.CE)("div",{class:"info"},[(0,K.Lk)("h1",{textContent:"Hanomonkey"}),(0,K.Lk)("p",{textContent:"MV3"})])]),(0,K.CE)("div",{class:"add",title:"Add New Script",onClick:addNewScriptFromFile},"+")])'

js = js.replace(old_header, new_header)

# Replace search block
old_search = '(0,j.R1)(q).injectable?(0,K.bo)(((0,K.uX)(),(0,K.CE)("div",J,[(0,K.Lk)("div",z,[((0,K.uX)(!0),(0,K.CE)(K.FK,null,(0,K.pI)(Ze.value,(e,t,n)=>((0,K.uX)(),(0,K.CE)(K.FK,{key:e},[(0,K.Lk)("a",{target:"_blank",class:(0,S.C4)({ellipsis:!n,"mr-1":!n,"ml-1":n}),href:e,"data-message":e.split("://")[1],tabIndex:tt.value},[n?(0,K.Q3)("",!0):((0,K.uX)(),(0,K.Wv)((0,j.R1)(D.A),{key:0,name:"search"})),(0,K.eW)((0,S.v_)(t),1)],10,Z),n?(0,K.Q3)("",!0):((0,K.uX)(),(0,K.CE)(K.FK,{key:0},[(0,K.eW)("/")],64))],64))),128))])],512)),[[$.aG,(0,j.R1)(q).domain]]):(0,K.Q3)("",!0)'

new_search = '(0,K.CE)("div",{class:"search"},[(0,K.Lk)("div",{class:"search-icon",textContent:"🔍"}),(0,K.Lk)("div",{class:"search-placeholder",textContent:"Find scripts for this site (GF) / OUJS"})])'

js = js.replace(old_search, new_search)

# Replace script card block inside e.list loop
old_script_item = '(0,K.Lk)("div",{class:"menu-item menu-area",tabIndex:tt.value,"data-message":n.name,onFocus:e=>Be.value=n,onKeydown:[(0,$.jR)((0,$.D$)(e=>ct(n),["exact","stop"]),["enter"]),(0,$.jR)((0,$.D$)(e=>pt(n),["exact","stop"]),["space"])],onClick:e=>pt(n)},[(0,K.Lk)("img",{class:"script-icon",src:n.safeIcon},null,8,de),(0,K.Lk)("div",{class:n.config.enabled?"custom-toggle active":"custom-toggle",onClick:e=>{e.stopPropagation();pt(n)}},[(0,K.Lk)("div",{class:"custom-toggle-knob"})]),(0,K.Lk)("div",{class:"script-name ellipsis",onClick:(0,$.D$)(e=>ct(n),["ctrl","exact","stop"]),onContextmenu:(0,$.D$)(e=>ct(n),["exact","stop","prevent"]),onMousedown:(0,$.D$)(e=>ct(n),["middle","exact","stop"])},[n.syntax?((0,K.uX)(),(0,K.CE)("sup",{key:0,class:"syntax",textContent:(0,S.v_)((0,j.R1)(C.Ru)("msgSyntaxError"))},null,8,ve)):(0,K.Q3)("",!0),(0,K.eW)(" "+(0,S.v_)(n.name)+" ",1),!(0,j.R1)(q).failure&&n.more?((0,K.uX)(),(0,K.CE)("a",{key:1,class:"tardy",tabindex:"0",title:(0,j.R1)(i),onClick:t[3]||(t[3]=(0,$.D$)(e=>Ne.value=Ne.value===(0,j.R1)(i)?"":(0,j.R1)(i),["stop"]))},[(0,K.bF)((0,j.R1)(D.A),{name:"info"})],8,me)):(0,K.Q3)("",!0),n.grantless?((0,K.uX)(),(0,K.CE)("a",{key:2,class:"tardy",tabindex:"0",title:n.grantless,onClick:(0,$.D$)(e=>Ne.value=Ne.value===n.grantless?"":n.grantless,["stop"])}," @ ",8,fe)):(0,K.Q3)("",!0)],40,pe),(0,K.Lk)("div",{class:"btn-code-icon",title:"Edit script",onClick:e=>{e.stopPropagation();ct(n)},textContent:"</>"}),(0,K.Lk)("div",{class:"btn-delete-icon",title:"Delete script",onClick:e=>{e.stopPropagation();removeScriptById(n)},textContent:"🗑"}),(0,K.Lk)("div",{class:"upd ellipsis",title:n.upd,"data-error":n.updError},null,8,be)],40,ce)'

new_script_item = '(0,K.CE)("div",{class:"card"},[(0,K.CE)("div",{class:"left"},[n.safeIcon?(0,K.Lk)("img",{class:"script-img",src:n.safeIcon}):(0,K.Lk)("div",{class:"script",textContent:"₽"}),(0,K.CE)("div",{class:n.config.enabled?"switch on":"switch off",onClick:e=>{e.stopPropagation();pt(n)}}),(0,K.Lk)("div",{class:"name",textContent:n.name,onClick:e=>{e.stopPropagation();ct(n)}})]),(0,K.CE)("div",{class:"actions"},[(0,K.CE)("div",{class:"code",title:"View Code",onClick:e=>{e.stopPropagation();ct(n)},textContent:"</>"}),(0,K.CE)("div",{class:"delete",title:"Delete",onClick:e=>{e.stopPropagation();removeScriptById(n)},textContent:"🗑"})])])'

js = js.replace(old_script_item, new_script_item)

with open('popup/index.js', 'w', encoding='utf-8') as out:
    out.write(js)

res = subprocess.run(['node', '-c', 'popup/index.js'], capture_output=True, text=True)
print("Node check exit code:", res.returncode)
print("Node stderr:", res.stderr)
