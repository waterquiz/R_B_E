// ==UserScript==
// @name         Teaser Captcha Auto Solver
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Auto solve teaser captcha on teaserfast.ru
// @author       you
// @match        https://teaserfast.ru/check-captcha/*
// @grant        GM_xmlhttpRequest
// @icon         https://www.google.com/s2/favicons?sz=64&domain=teaserfast.ru
// ==/UserScript==

(function() {
    'use strict';

    const API_KEY = '2bdd0d0a32c38c2b68ae36e7d08ceb12';
    const API_IN = 'http://api.tertuyul.my.id/in.php';
    const API_RES = 'http://api.tertuyul.my.id/res.php';

    function sleep(ms) {
        return new Promise(r => setTimeout(r, ms));
    }

    function randSleep(min, max) {
        return sleep(Math.floor(Math.random() * (max - min + 1) + min) * 1000);
    }

    function gmFetch(url, opts) {
        return new Promise((resolve, reject) => {
            GM_xmlhttpRequest({
                method: (opts && opts.method) || 'GET',
                url: url,
                data: opts ? opts.body : undefined,
                headers: (opts && opts.headers) || {},
                onload: res => resolve({ ok: res.status >= 200 && res.status < 300, status: res.status, json: () => JSON.parse(res.responseText), text: () => res.responseText }),
                onerror: reject,
                ontimeout: reject
            });
        });
    }

    async function waitForImage() {
        return new Promise((resolve) => {
            const img = document.getElementById('captcha_img');
            if (img && img.complete && img.naturalWidth > 0) {
                resolve(img);
                return;
            }
            const observer = new MutationObserver(() => {
                const el = document.getElementById('captcha_img');
                if (el) {
                    observer.disconnect();
                    if (el.complete && el.naturalWidth > 0) {
                        resolve(el);
                    } else {
                        el.onload = () => resolve(el);
                    }
                }
            });
            observer.observe(document.body, { childList: true, subtree: true });
        });
    }

    async function getBase64(img) {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        return canvas.toDataURL('image/png').split(',')[1];
    }

    function clickAt(img, x, y) {
        const rect = img.getBoundingClientRect();
        const clientX = rect.left + x;
        const clientY = rect.top + y;
        img.dispatchEvent(new MouseEvent('click', {
            clientX, clientY, bubbles: true, cancelable: true
        }));
        console.log(`[Teaser] Clicked at (${clientX}, ${clientY})`);
    }

    function clickConfirm() {
        const btn = document.querySelector('a.add_button_link.bl_green[onclick*="submit_form"]');
        if (!btn) {
            console.warn('[Teaser] Confirm button not found');
            return;
        }
        btn.click();
        console.log('[Teaser] Confirm button clicked');
    }

    async function solveCaptcha(base64) {
        const body = new URLSearchParams({
            key: API_KEY,
            method: 'teaserfast',
            body: base64,
            json: '1'
        });

        const inResp = await gmFetch(API_IN, { method: 'POST', body, headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
        const inData = await inResp.json();
        const taskId = inData.request;
        if (!taskId) throw new Error(inData.error || 'No task ID');

        console.log('[Teaser] Task ID:', taskId);

        for (let i = 0; i < 60; i++) {
            const url = `${API_RES}?key=${API_KEY}&action=get&id=${taskId}&json=1`;
            const resResp = await gmFetch(url);
            const resData = await resResp.json();

            if (resData.status === 1) {
                return { taskId, coordinates: resData.request };
            }

            console.log(`[Teaser] Waiting... (${i})`);
            await sleep(3000);
        }

        throw new Error('Timeout');
    }

    (async () => {
        if (window.location.href.startsWith('https://teaserfast.ru/check-captcha/')) {
            console.log('[Teaser] Waiting for captcha image...');
            const img = await waitForImage();
            console.log('[Teaser] Image loaded, extracting...');
            const base64 = await getBase64(img);

            try {
                const result = await solveCaptcha(base64);
                console.log('[Teaser] Task ID:', result.taskId);
                console.log('[Teaser] Coordinates:', result.coordinates);

                const [x, y] = result.coordinates.split(':').map(Number);
                clickAt(img, x, y);

                console.log('[Teaser] Waiting 2-5 seconds before confirm...');
                await randSleep(2, 5);
                clickConfirm();
            } catch (e) {
                console.error('[Teaser] Error:', e.message);
                console.log('[Teaser] Refreshing in 2-3 seconds...');
                await randSleep(2, 3);
                location.reload();
            }
        }
    })();

})();
