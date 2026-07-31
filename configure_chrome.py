import urllib.request
import json
import time
import os
import websocket

def configure():
    print("=== Chrome Configuration Agent ===")
    
    # 1. Wait for Chrome debug port to open
    debug_url = "http://127.0.0.1:9222/json/version"
    connected = False
    for i in range(30):
        try:
            urllib.request.urlopen(debug_url, timeout=2)
            connected = True
            print("Connected to Chrome debugging port!")
            break
        except Exception as e:
            print(f"Waiting for Chrome debugging port to be ready... ({i}/30)")
            time.sleep(1)
            
    if not connected:
        print("Error: Could not connect to Chrome debugging port.")
        return False

    # 2. Dynamically load the unpacked extension using CDP Extensions.loadUnpacked
    try:
        response = urllib.request.urlopen("http://127.0.0.1:9222/json/version", timeout=5)
        version_info = json.loads(response.read().decode())
        browser_ws_url = version_info.get("webSocketDebuggerUrl")
        if browser_ws_url:
            print("Connecting to browser target to dynamically load extension...")
            browser_ws = websocket.create_connection(browser_ws_url, timeout=10)
            
            # Send loadUnpacked command
            load_cmd = {
                "id": 101,
                "method": "Extensions.loadUnpacked",
                "params": {
                    "path": "/app/extensions/violentmonkey"
                }
            }
            print(f"Sending Extensions.loadUnpacked to {browser_ws_url}...")
            browser_ws.send(json.dumps(load_cmd))
            load_res = json.loads(browser_ws.recv())
            print(f"Extensions.loadUnpacked result: {load_res}")
            browser_ws.close()
        else:
            print("Warning: Could not find webSocketDebuggerUrl in json/version.")
    except Exception as e:
        print(f"Failed to dynamically load extension via CDP: {e}")

    # 3. Open chrome://extensions page
    try:
        req = urllib.request.Request("http://127.0.0.1:9222/json/new?chrome://extensions/", method="PUT")
        urllib.request.urlopen(req, timeout=5)
        print("Opened chrome://extensions page.")
    except Exception as e:
        print(f"Note: chrome://extensions may already be open or error occurred: {e}")

    time.sleep(3)

    # 3. Find the WebSocket URL for the extensions page
    ws_url = None
    for i in range(10):
        try:
            response = urllib.request.urlopen("http://127.0.0.1:9222/json/list", timeout=5)
            pages = json.loads(response.read().decode())
            for page in pages:
                if "chrome://extensions" in page.get("url", ""):
                    ws_url = page.get("webSocketDebuggerUrl")
                    break
            if ws_url:
                break
        except Exception as e:
            print(f"Searching for extensions page WebSocket... ({i}/10)")
        time.sleep(1)

    if not ws_url:
        print("Error: Could not find chrome://extensions page WebSocket URL.")
        return False

    print(f"Found WebSocket URL: {ws_url}")

    # 4. Connect to the WebSocket and send our configuration script
    try:
        ws = websocket.create_connection(ws_url, timeout=10)
        
        # Bring tab to front to ensure it loads/renders
        print("Activating chrome://extensions tab...")
        ws.send(json.dumps({"id": 999, "method": "Page.bringToFront"}))
        ws.recv()
        time.sleep(2)
        
        js_code = """
        (async () => {
            const sleep = (ms) => new Promise(r => setTimeout(r, ms));
            
            // 1. Enable Developer Mode globally
            await new Promise((resolve) => {
                chrome.developerPrivate.updateProfileConfiguration({ inDeveloperMode: true }, resolve);
            });
            
            await sleep(1000);
            
            // 2. Fetch all extensions info
            let extensions = [];
            for (let i = 0; i < 15; i++) {
                extensions = await new Promise((resolve) => {
                    chrome.developerPrivate.getExtensionsInfo({ includeDisabled: true, includeTerminated: true }, resolve);
                });
                if (extensions && extensions.length > 0) break;
                await sleep(1000);
            }
            
            // 3. Find our extension
            const ext = extensions.find(e => 
                e.name.toLowerCase().includes("hanomonkey") || 
                e.name.toLowerCase().includes("vilan monkey") || 
                e.name.toLowerCase().includes("violentmonkey") || 
                (e.path && e.path.toLowerCase().includes("violentmonkey")) ||
                (e.path && e.path.toLowerCase().includes("vilan monkey"))
            );
            
            if (ext) {
                // Enable user scripts access
                await new Promise((resolve) => {
                    chrome.developerPrivate.updateExtensionConfiguration({
                        extensionId: ext.id,
                        userScriptsAccess: true
                    }, resolve);
                });
                return { "status": "success", "extension": ext.name, "id": ext.id };
            } else {
                return { "status": "error", "message": "Extension not found", "available": extensions.map(e => e.name) };
            }
        })()
        """
        
        payload = {
            "id": 1,
            "method": "Runtime.evaluate",
            "params": {
                "expression": js_code,
                "awaitPromise": True,
                "returnByValue": True
            }
        }
        
        ws.send(json.dumps(payload))
        result_raw = ws.recv()
        result = json.loads(result_raw)
        ws.close()
        
        print("CDP Response:", json.dumps(result, indent=2))
        
        # Check result
        exception_details = result.get("result", {}).get("exceptionDetails")
        if exception_details:
            print("JavaScript Execution Exception:", exception_details)
            return False
            
        value = result.get("result", {}).get("result", {}).get("value", {})
        if value.get("status") == "success":
            print(f"Successfully configured Chrome: {value.get('extension')} ({value.get('id')})")
            return True
        else:
            print("Failed to configure Chrome extension:", value.get("message"), "Available extensions:", value.get("available"))
            return False
            
    except Exception as e:
        print(f"WebSocket execution failed: {e}")
        return False

if __name__ == "__main__":
    # Run the configuration
    success = configure()
    
    # Also do the file preferences pinning fallback
    print("Running Toolbar Pinning utility...")
    prefs_file = '/app/chrome_profile/Default/Preferences'
    if not os.path.exists(prefs_file):
        prefs_file = os.path.expanduser('~/.config/google-chrome/Default/Preferences')
        
    for i in range(15):
        if os.path.exists(prefs_file):
            try:
                with open(prefs_file, 'r') as f:
                    prefs = json.loads(f.read())
                
                # Make sure we enable developer mode in Preferences too as a backup
                prefs['extensions'] = prefs.get('extensions', {})
                prefs['extensions']['ui'] = prefs['extensions'].get('ui', {})
                prefs['extensions']['ui']['developer_mode'] = True
                
                ext_settings = prefs.get('extensions', {}).get('settings', {})
                modified = False
                for ext_id, settings in ext_settings.items():
                    if ext_id and ext_id != '__MSG__':
                        path = settings.get('path', '')
                        if 'violentmonkey' in path.lower() or 'vilan' in path.lower() or 'hanomonkey' in path.lower():
                            settings['pin_to_toolbar'] = True
                            settings['toolbar_pin'] = True
                            print(f'Pinned extension in Preferences: {ext_id}')
                            modified = True
                if modified:
                    with open(prefs_file, 'w') as f:
                        json.dump(prefs, f, indent=2)
                    print('Extension pinned and developer mode enabled in Preferences successfully')
                else:
                    print('Extension not found in preferences JSON yet')
            except Exception as e:
                print(f"Error modifying preferences JSON: {e}")
        time.sleep(1)
