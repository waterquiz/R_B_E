import subprocess

with open('popup/index.js', 'r', encoding='utf-8', errors='ignore') as f:
    js = f.read()

# Replace search icon
old_search_node = '(0,K.Lk)("div",{class:"search-icon",textContent:"🔍"})'
new_search_node = '(0,K.CE)("div",{class:"search-icon"},[(0,K.CE)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"#22dbc7","stroke-width":"2.2","stroke-linecap":"round","stroke-linejoin":"round",style:{width:"24px",height:"24px"}},[(0,K.Lk)("circle",{cx:"11",cy:"11",r:"8"}),(0,K.Lk)("line",{x1:"21",y1:"21",x2:"16.65",y2:"16.65"})])])'

js = js.replace(old_search_node, new_search_node)

# Replace plus icon
old_add_node = '(0,K.CE)("div",{class:"add",title:"Add New Script",onClick:addNewScriptFromFile},"+")'
new_add_node = '(0,K.CE)("div",{class:"add",title:"Add New Script",onClick:addNewScriptFromFile},[(0,K.CE)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"#22dbc7","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",style:{width:"32px",height:"32px"}},[(0,K.Lk)("line",{x1:"12",y1:"5",x2:"12",y2:"19"}),(0,K.Lk)("line",{x1:"5",y1:"12",x2:"19",y2:"12"})])])'

js = js.replace(old_add_node, new_add_node)

with open('popup/index.js', 'w', encoding='utf-8') as out:
    out.write(js)

res = subprocess.run(['node', '-c', 'popup/index.js'], capture_output=True, text=True)
print("Node check exit code:", res.returncode)
print("Node stderr:", res.stderr)
