Electronic Cash Demo

This is an open source demo electronic cash app that allows the transfer of ecash between mobile or desktop devices.

![image](https://github.com/user-attachments/assets/ae11aadc-c563-4eed-86a8-81af27a0f661)


What separates this electronic cash from cryptos and other digital payment, this app was develop for future purpose to handle massive wealth in preparation for off grid and off planet economy, the concept was cenceived from the idea of space economy as the existing digital currencies do not posses. This electronic cash is intended to solve the basic necessities of electronic economies.

For web developers and designers we welcome and invite you to collaborate with us creating electronic cash front end and back end features, for better user experiences, let us know if when you need to develop the optical transfer of demo ecash, we will provide demo ecash upon request.



How to use the ECash functions (iframe)

```ruby
let iframe = document.createElement("iframe");
iframe.src = "https://ecash-icons.web.app";
document.body.appendChild(iframe);
iframe.onload = function() {
    // ecash is ready
};
```


How to send message request to the ecash (iframe)

1. Read ECash Balance - display your ecash balance

   ![image](https://github.com/user-attachments/assets/55c266eb-55e7-4ffc-b189-08b50857437d)

```ruby
function readBalance() {
    iframe.contentWindow.postMessage({ action: "ecash-api-read-balance" }, iframe.src);
};
```


2. Read Account - display your ecash account number

   ![image](https://github.com/user-attachments/assets/944603f8-5770-4ca2-81b1-3cf4201a0ce0)

```ruby
function readAccount() {
    iframe.contentWindow.postMessage({ action: "ecash-api-read-account" }, iframe.src);
};
```


3. Show your accout QR code - for the benefactors to scan for transfering ecash to your account

   ![image](https://github.com/user-attachments/assets/df15927a-9381-47e0-9846-b14b7ba33d17)

```ruby
window.hashAccount = function(d) {
    iframe.contentWindow.postMessage({ action: "ecash-api-hash-account" }, iframe.src);
};
```


4. Scan QR code - scan either account or ecash QR codes

   ![image](https://github.com/user-attachments/assets/8d2e3b43-f7c0-4a8b-8bf9-d53da7391f0b)

```ruby
window.scanQRCode = function(d) {
    iframe.contentWindow.postMessage({ action: "ecash-api-hash-assemble", qrScan: _uz.z.qrScan }, iframe.src);
};
```


5. Transfer ecash - first scan the beneficiary QR code and then set the amount, if the amount is valid the ecash QR code will display in rapid successing for fast transfer

   ![image](https://github.com/user-attachments/assets/fbbf2e83-5edf-45dd-9611-5b4cc3ac4e5f)

```ruby
iframe.contentWindow.postMessage({
        action: "ecash-api-transfer-amount",
        currency: document.querySelector(".beneficiary-currency").value,
        range: document.querySelector(".beneficiary-amount").value
    },
    iframe.api.src
);
```

How to receive message from the ecash (iframe) - after the ecash (iframe) processing the request it will return the result back to your app, you can receive the result by adding a event listerner as shown below: 

```ruby
window.addEventListener("message", () => {
    if (e.data.action && e.data.action.match(/(ecash-api)/)) {
        if (e.data.action && e.data.action.match(/(ready)/)) {
            readBalance();
            readAccount();
        };
        if (e.data.action && e.data.action.match(/(response)/)) {
            apiResponses({ data: e.data });
        };
    };
});
```

```ruby
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
```

To test the ecash live open the demo url https://ecash-demo.web.app

Enjoy!
