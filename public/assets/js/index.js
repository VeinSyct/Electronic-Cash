// START OF API CONNECTION
let windowEvent = (e) => {
    if (e.type.match(/(message)/)) try {
        _uz.session = !_uz.session ? e.data.session : _uz.session;
        if (e.data.action && e.data.action.match(/(ecash-api)/)) {
            if (e.data.action && e.data.action.match(/(ready)/)) {
                readBalance();
                readAccount();
            };
            if (e.data.action && e.data.action.match(/(response)/)) {
                apiResponses({ data: e.data });
            };
        };
    } catch (error) {};
},
_uz = { api: document.createElement("iframe"), offline: !0 };
_uz.api.src = "https://ecash-icons.web.app";
document.getElementById("api-404").appendChild(_uz.api);
_uz.api.onload = function() {
    // api is ready
};
window.addEventListener("message", windowEvent);
// END OF API CONNECTION

// START OF API OPERATION
function readBalance() {
    _uz.api.contentWindow.postMessage({ action: "ecash-api-read-balance" }, _uz.api.src);
};

function readAccount() {
    _uz.api.contentWindow.postMessage({ action: "ecash-api-read-account" }, _uz.api.src);
};

function apiResponses(data) {
    data = data.data;
    if (data.action && data.action.match(/(read-balance)/)) {
        document.querySelector(".ex-balance").innerHTML = data.balance;
    };
    if (data.action && data.action.match(/(read-account)/)) {
        for (let i = 0, j = ["name", "number", "protocol"]; i < j.length; i++) 
            document.querySelector(".account-" + j[i]).innerHTML = data.account[j[i]] ? data.account[j[i]] : "***";
    };
    if (data.action && data.action.match(/(hash-account)/)) {
        createQr({
            s: data.hash 
        });
    };
    if (data.action && data.action.match(/(hash-fragment)/)) {
        for (let i = 0; i < data.hash.length; i++) drawQr({ id: ".qr-cont", piece: data.hash[i] });
        _uz.z.cvs = { e: [], i: 0 };
        for (let i = 0, j = document.querySelector(".qr-cont").getElementsByTagName("canvas"); i < j.length; i++) {
            j[i].style.display = "none";
            j[i].style[window.innerWidth < window.innerHeight ? "width" : "height"] = "75%";
            _uz.z.cvs.e.push(j[i]);
        };
        if (_uz.z.cvs.e.length > 1) autoSlide({ t: _uz.qr.delay });
        document.getElementById("show-qr-cont").style.display = "block";
    };
    if (data.action && data.action.match(/(hash-assemble)/)) {
        let d = JSON.parse(data.object);
        if (d.r) {
            if (d.r && d.ah) {
                document.querySelector(".beneficiary-name").innerHTML = d.ah.name;
                document.querySelector(".beneficiary-number").innerHTML = d.ah.number;
                document.querySelector(".beneficiary-currency").innerHTML = _uz.local.account.currency;
            };
            if (d.l) {
                if (d.r && d.l.amount > 0) {
                    alert(`Electronic Cash ${d.l.currency}${d.l.amount}`);
                    readBalance();
                } else alert(`Electronic Cash is Spent`);
            }
            delete _uz.z.qrScan.hashes;
            delete _uz.z.qrScan.arr;
        } else alert(`Wrong QR`);
    };
    if (data.action && data.action.match(/(transfer-amount)/)) {
        createQr({ s: data.hash });
    };
    if (data.action && data.action.match(/(dialog-message)/)) {
        if (data.message == "m001") alert("There is no benificiary");
    };
};

if (navigator.onLine && _uz.offline && "serviceWorker" in navigator)
    navigator.serviceWorker
        .register("index.js")
        .then((registration) => {})
        .catch((err) => {});
// END OF API OPERATION