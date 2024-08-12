let proxyConfig = {
    mode: "fixed_servers",
    rules: {
        singleProxy: {
            scheme: "http",
            host: "ВАШ IP",
            port: 3128
        }
    }
};

let defaultConfig = {mode: "direct"};

chrome.storage.local.get(["proxyInUse"]).then((result) => {
    if(result.proxyInUse) {
        activateProxy();
    } else {
        deactivateProxy();
    }
})

function activateProxy() {
    chrome.storage.local.set({ proxyInUse: true }).then(() => {
        chrome.proxy.settings.set({value: proxyConfig, scope: "regular"}, function() {});    
        chrome.action.setBadgeText({ text: 'ON' });
        document.getElementById("isRunnning").innerHTML = "RUNNING"
    });
}

function deactivateProxy() {
    chrome.storage.local.set({ proxyInUse: false }).then(() => {
        chrome.proxy.settings.set({value: defaultConfig, scope: "regular"}, function() {});    
        chrome.action.setBadgeText({ text: 'OFF' });
        document.getElementById("isRunnning").innerHTML = "NOT RUNNING"
    });
}

function toggleProxy() {
    chrome.storage.local.get(["proxyInUse"]).then((result) => {
        if(!result.proxyInUse) {
            activateProxy();
        } else {
            deactivateProxy();
        }
    });
}

document.getElementById('toggle_button').addEventListener('click', toggleProxy);