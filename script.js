function e(e) {
    return e && e.__esModule ? e.default : e;
}

var t = globalThis,
    n = {},
    a = {},
    o = t.parcelRequirefbde;

if (null == o) {
    o = function (e) {
        if (e in n) return n[e].exports;
        if (e in a) {
            var t = a[e];
            delete a[e];
            var o = { id: e, exports: {} };
            n[e] = o;
            t.call(o.exports, o, o.exports);
            return o.exports;
        }
        var i = Error("Cannot find module '" + e + "'");
        throw ((i.code = "MODULE_NOT_FOUND"), i);
    };

    o.register = function (e, t) {
        a[e] = t;
    };

    t.parcelRequirefbde = o;
}

(0, o.register)("27Lyk", function (e, t) {
    Object.defineProperty(e.exports, "register", {
        get: () => n,
        set: (e) => (n = e),
        enumerable: !0,
        configurable: !0
    });

    var n,
        a = new Map;

    n = function (e, t) {
        for (var n = 0; n < t.length - 1; n += 2) {
            a.set(t[n], { baseUrl: e, path: t[n + 1] });
        }
    };
});

o("27Lyk").register(new URL("", import.meta.url).toString(), JSON.parse('["gvBVN","index.db60a46a.js","jkrgM","48MX7"]'));

let i = 0;

function executeCommand(e, t) {
    return (
        void 0 === t && (t = {}),
        new Promise((n, a) => {
            let o = `exec_callback_${Date.now()}_${i++}`;

            function c(e) {
                delete window[e];
            }

            window[o] = (e, t, a) => {
                n({ errno: e, stdout: t, stderr: a });
                c(o);
            };

            try {
                ksu.exec(e, JSON.stringify(t), o);
            } catch (e) {
                a(e);
                c(o);
            }
        })
    );
}

function EventEmitter() {
    this.listeners = {};
}

const randomMessages = [
    "Cihuyyy",
    "Arienaiiii",
    "Joy adalah jungler terkuat",
];

function showRandomMessage() {
    const messageElement = document.getElementById("pesan");
    const randomIndex = Math.floor(Math.random() * randomMessages.length);
    const message = randomMessages[randomIndex];
    messageElement.textContent = message;
}

window.onload = showRandomMessage;

function Process() {
    this.listeners = {};
    this.stdin = new EventEmitter();
    this.stdout = new EventEmitter();
    this.stderr = new EventEmitter();
}

function showToast(message) {
    ksu.toast(message);
}

EventEmitter.prototype.on = function (event, listener) {
    this.listeners[event] || (this.listeners[event] = []);
    this.listeners[event].push(listener);
};

EventEmitter.prototype.emit = function (event, ...args) {
    this.listeners[event] && this.listeners[event].forEach((listener) => listener(...args));
};

Process.prototype.on = function (event, listener) {
    this.listeners[event] || (this.listeners[event] = []);
    this.listeners[event].push(listener);
};

Process.prototype.emit = function (event, ...args) {
    this.listeners[event] && this.listeners[event].forEach((listener) => listener(...args));
};

var u = {};

async function checkModuleVersion() {
    let { errno: e, stdout: t } = await executeCommand('grep "version=" /data/adb/modules/Argylaxx/module.prop | awk -F\'=\' \'{print $2}\'');
    if (0 === e) {
        document.getElementById("moduleVer").textContent = t.trim();
    }
}

async function checkServiceStatus() {
    let { errno: t, stdout: n } = await executeCommand("pgrep -f Argylaxxed");
    if (0 === t) {
        let t = document.getElementById("serviceStatus");
        "0" != n.trim()
            ? ((t.textContent = "Running!"), document.getElementById("servicePID").textContent = "Service PID: " + n.trim())
            : ((t.textContent = "Inactive..."), document.getElementById("servicePID").textContent = "Service PID: null");
    }
}

async function checkTrimmingStatus() {
    let { errno: e, stdout: t } = await executeCommand("cat /data/Argylaxx/Voltoptimizer");
    if (0 === e) {
        document.getElementById("trimming").checked = "1" === t.trim();
    }
}

async function setTrimmingStatus(enabled) {
    showToast("Reboot devices");
    await executeCommand(enabled ? "echo 1 >/data/Argylaxx/Voltoptimizer" : "echo 0 >/data/Argylaxx/Voltoptimizer");
}

async function checkDND() {
    let { errno: e, stdout: t } = await executeCommand("cat /data/Argylaxx/dnd");
    if (0 === e) {
        document.getElementById("DoNoDis").checked = "1" === t.trim();
    }
}

async function setDND(enabled) {
    showToast("DND active");
    await executeCommand(enabled ? "echo 1 >/data/Argylaxx/dnd" : "echo 0 >/data/Argylaxx/dnd");
}

async function startService() {
    await executeCommand("nohup sh /data/adb/modules/Argylaxx/service/Argylaxx_Toggler start_service");
    await checkServiceStatus();
}

async function stopService() {
    await executeCommand("pkill -f Argylaxxed");
    await checkServiceStatus();
}

async function saveLogs() {
    await executeCommand("sh /data/adb/modules/Argylaxx/service/Argylaxx_Toggler save_logs");
    showToast("Logs saved on /sdcard/stellar_log");
}

document.addEventListener("DOMContentLoaded", async () => {
    await checkModuleVersion();
    await checkServiceStatus();
    await checkTrimmingStatus();
    await checkDND();

    document.getElementById("saveLogsButton").addEventListener("click", async function () {
        await saveLogs();
    });

    document.getElementById("startButton").addEventListener("click", async function () {
        await startService();
    });

    document.getElementById("killService").addEventListener("click", async function () {
        await stopService();
    });

    document.getElementById("trimming").addEventListener("change", async function () {
        await setTrimmingStatus(this.checked);
    });

    document.getElementById("DoNoDis").addEventListener("change", async function () {
        await setDND(this.checked);
    });
});