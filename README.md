# Electronic Cash Demo

**Ecash** is an open-source electronic cash library that allows developers to create an ecash platform for facilitating the secure location and transfer of ecash between benefactors and beneficiaries.

Go to the [Electronic Cash Tutorials](http://ecash-tutorial.web.app) or download the [Ecash Module](https://github.com/VeinSyct/ECash-Module/tree/main/module-ecash/platform) to start building your own ecash platform.  

> **Note:**  
> This repository is not capable of creating ecash. It only stores the *virtual location* of ecash on the device, ensuring security and preventing tampering with ecash data.

![163618338-pagamento-con-codice-qr-shopping-online-portafoglio-e-concetto-di-tecnologia-senza-contanti-mano](https://github.com/user-attachments/assets/a61d67b6-cbe2-4195-aa54-01bd9e001097)

This is a demo **open-source** electronic cash application that enables the transfer of ecash between mobile and desktop devices. It ensures **data security**, **transaction anonymity**, and prevents fraud such as **double spending** through the use of an *entropy chaos algorithm* for transferring ecash data between devices.

---

## Electronic Cash Development History

The **E-Cash** system is a descendant of several early electronic cash prototypes, originating from the **PICF84MT13** prototype developed in 2003 at AMA Computer College, Cagayan de Oro. This prototype utilized a **PIC16F84** microcontroller, powered by a lithium battery to preserve RAM data memory, and transferred electronic cash data through a single-wire interface, as well as LED-LDR and IR transmitter-receiver communication channels using UART assembly routines. Its firmware was written entirely in Assembly language.

![picinf84mt13](https://github.com/user-attachments/assets/45bd1abf-69a3-4b94-9928-999f9afd32cf)

![f84mt1314case](https://github.com/user-attachments/assets/49b8854e-a978-4112-baf9-d5ad4c887353)


### PIC16F84 UART Source Code:

```ruby
W_Temp equ 0ch
	SaveB0 equ 14h
	SaveB1 equ 15h
	SaveB2 equ 16h
	SaveB3 equ 17h
	SendB0 equ 18h
	SendB1 equ 19h
	SendB2 equ 1Ah
	SendB3 equ 1Bh
	OpFlag equ 1Ch
	btfss status,not_pd
	retfie
	goto 0x07d
	sleep
	movwf 0x0c
	movf status,w
	movwf 0x0d
	movf 0x0e,w
	movwf status
	btfsc intcon,t0if
	goto 0x011
	bcf intcon,inte
	bsf intcon,t0ie
	bsf status,rp0
	bcf 0x01,5
	movlw 0x2a
	movwf 0x0f
	bcf status,rp0
	movlw 0xdf
	movwf 0x01
	clrf pclath
	btfsc 0x1c,1
	goto 0x042
	bcf status,rp0
	btfss 0x1c,2
	goto 0x025
	decfsz 0x0f,w
	incf pcl,f
	bsf status,c
	clrw
	btfss status,c
	movlw 0x02
	addwf pcl,f
	bsf 0x05,0
	goto 0x02c
	bcf 0x05,0
	goto 0x02c
	clrw
	btfss 0x06,0
	movlw 0x02
	addwf pcl,f
	bsf status,c
	goto 0x02c
	bcf status,c
	decfsz 0x0f,f
	goto 0x04b
	btfss 0x1c,2
	goto 0x033
	bsf 0x1c,1
	goto 0x053
	goto 0x042
	btfss status,c
	goto 0x042
	movlw d'0'
	subwf 0x1d,w
	btfss status,z
	goto 0x042
	movf 0x10,w
	movwf 0x14
	movf 0x11,w
	movwf 0x15
	movf 0x12,w
	movwf 0x16
	movf 0x13,w
	movwf 0x17
	goto 0x042
	clrf 0x01
	bcf 0x1c,1
	bsf status,rp0
	bsf 0x01,5
	bcf 0x1c,3
	btfss 0x1c,2
	bcf intcon,t0ie
	bsf intcon,inte
	goto 0x053
	rrf 0x10,f
	rrf 0x11,f
	rrf 0x12,f
	rrf 0x13,f
	btfss 0x1c,2
	rrf 0x1d,f
	btfsc 0x1c,2
	rrf 0x1e,f
	bcf status,rp0
	movf status,w
	movwf 0x0e
	movf 0x0d,w
	movwf status
	movf 0x0c,w
	bcf intcon,intf
	bcf intcon,t0if
	retfie
SendTx	btfss 0x1c,2
	return
	btfsc 0x1c,3
	return
	bsf 0x1c,3
	bcf 0x0e,0
	movf 0x18,w
	movwf 0x10
	movf 0x19,w
	movwf 0x11
	movf 0x1a,w
	movwf 0x12
	movf 0x1b,w
	movwf 0x13
	movlw d'0'
	movwf 0x1e
	bcf intcon,gie
	call 0x004
	return
ModeSw	btfsc 0x1c,3
	return
	bcf 0x1c,0
	btfsc 0x1c,2
	goto 0x07a
	bsf 0x1c,2
	bcf status,rp0
	bsf 0x05,0
	bsf status,rp0
	bcf 0x05,0
	return
	bcf 0x1c,2
	bsf intcon,inte
	return
	movf status,w
	movwf 0x0d
	movwf 0x0e
	movlw 0x0c
	movwf fsr
	clrf indf
	incf fsr,f
	movlw 0x4f
	subwf fsr,w
	btfss status,z
	goto 0x082
	bsf intcon,t0ie
	bsf status,rp0
	bcf 0x01,6
	movlw 0xf0
	andwf 0x01,f
	call 0x042
	goto VxdOrg
VxdOrg 	nop
```

C Version (2004):
In 2004, the microcontroller assembly code was migrated to the Turbo C programming language for desktop computers (MS-DOS), as requested by the **Land Bank of the Philippines**. The transition was made for convenience, being more practical and easier to use than the handheld prototype microcontroller version, which was too bulky and impractical for real use.

Basic Version (2013):
The system was later translated into Visual Basic and integrated with MySQL for data storage. However, with Microsoft discontinuing support for Visual Basic in 2013, this version quickly became obsolete.

Python & JavaScript Version (2016):
With the rise of web applications and Python's popularity as an engineering-friendly language, the Turbo C source code was migrated to Python in 2016 for a proposal to Emirates NBD in Dubai, United Arab Emirates. However, Python proved unsuitable for hardware-level programming and failed to meet E-Cash requirements. Since Python code was often decompiled into either WebAssembly or JavaScript, the Python version was scrapped. The project was then fully rewritten in WebAssembly and JavaScript, ensuring greater efficiency and practicality.

---

## About This Repository

This repository includes both the electronic cash **storage** ([https://ecash-demo.web.app](https://ecash-demo.web.app)) and **supply** ([https://ecash-dummy.web.app](https://ecash-dummy.web.app)) modules, allowing developers to build and test their own electronic cash storage applications.  

The implementation is straightforward and simple, making it an excellent foundation for developing more advanced and complex e-cash systems.  

![image](https://github.com/user-attachments/assets/ae11aadc-c563-4eed-86a8-81af27a0f661)

---

### What Makes This Different?  

Unlike cryptocurrencies and conventional digital payment systems, this application was designed with a **future-oriented purpose**: to handle massive wealth in preparation for **off-grid** and **off-planet economies**.  

The concept originated from the idea of a **space economy**, addressing fundamental needs that current digital currencies are not equipped to support. This electronic cash aims to provide the essential infrastructure for sustaining electronic economies in both terrestrial and extraterrestrial environments.


## Collaboration — Frontend, Backend & Security

For **web developers** and designers: we welcome and invite you to collaborate on building frontend and backend features to improve the ecash user experience. If you need demo ecash to develop or test optical transfer flows, let us know — we will provide demo ecash on request.

1. Create your frontend (Figma, WordPress, Laravel, or plain HTML/CSS/JS).
2. Interface with the electronic cash implementation using the examples in the `public/` folder.

For **security researchers** and enthusiasts: we invite you to help harden the system by finding vulnerabilities, logic flaws, or bugs. Please share any findings so we can improve and strengthen ecash data security. We encourage responsible disclosure — provide reproduction steps, test accounts, and a short demo (video or logs) so issues can be fixed quickly.

**Responsible disclosure:** submit vulnerabilities privately with clear reproduction steps, the affected component, and suggested mitigations. Do **not** publish exploits publicly before a fix is available.

---

### Challenges (testing objectives)

Try to reproduce these scenarios in a controlled test environment. When you find a working exploit or proof-of-concept, report it responsibly as described above.

1. Modify the dummy ecash balance (e.g., change `DMY 1,000.00` → `DMY 2,000.00`).
2. Duplicate an account into multiple cloned accounts, spend from one, then spend from the clones (attempt to demonstrate a double-spend).
3. Change the currency identifier (e.g., convert **DMY** to **USD** or any currency of your choice).
4. Transfer (exfiltrate) an account’s ecash data to a newly created account.

---

### About this repository

This repository implements a basic electronic cash system that supports ecash transfers and local storage so users can perform secure, anonymous transactions without relying on a central authority or single server. Use this project as a foundation for building more advanced e-cash systems — and help us improve it by contributing UI/UX features, integrations, tests, and security research.


## How to Use This Repository

### Core Components

**Cash creation & minting**  
This project does **not** create or mint ecash. It has no capability to generate new ecash; instead, it supports splitting and transferring existing ecash to a beneficiary device.

---

### Security elements

- The system relies on an **entropy-chaos algorithm** (implemented in this repository) to store ecash metadata and ensure that ecash can only be transferred by the device that currently holds it.  
- Ecash is designed for **transaction anonymity** and **data integrity**. Transactions are signed with private keys to provide authenticity and to help prevent double-spending.

---

### Safety features

- The ecash model used here does **not** depend on traditional blockchain encryption or on centralized bank accounts. Rather, each ecash instance is referenced by a **unique virtual space address** stored locally on the user’s device. This address acts as a pointer to the ecash data location.  
- The ecash data itself is represented as a **virtual quantum address** in the system design; the original data can be accessed only by resolving the corresponding virtual space address. When a user exits the virtual space, the representation collapses and the data is compressed into entropy.  
- The design intentionally makes raw data retrieval infeasible to interpret without the original virtual address: even if the raw bytes were discovered, reconstructing meaningful, usable state without the pointer is intended to be computationally infeasible.

> **Important (design note):** these mechanisms are conceptual and part of the system’s security model. Use this repository for demo, research, and development purposes — do not assume production-grade cryptographic guarantees without independent review and hardening.

![image](https://github.com/user-attachments/assets/bbb62090-de37-452b-aef0-04595b2f9f60)

---

### Safety measures

- Ecash data is **not stored as plain, directly usable files** on the device. To retrieve or resolve an ecash instance you must have the corresponding virtual space address (link/pointer).  
- This repository provides the storage and transfer primitives; it is the developer’s responsibility to integrate additional layers (secure key management, audit logging, and responsible disclosure practices) before using in any production environment.


## System Summary

1. **Virtual Quantum Space Storage**  
   Ecash data is stored within an **unfolded virtual quantum space** — a complex, non-linear data environment.  

2. **Collapse into Entropy**  
   When the virtual quantum space is folded back into a singularity (a point), the ecash data collapses into entropy, making it unreadable and undecodable by conventional means.  

3. **Recovery Requirements**  
   To recover ecash data, a specialized program is required to **unfold the virtual quantum space**. Additionally, a precise **navigation link (address)** is needed to locate and reconstruct the data in its plaintext form.  

4. **Non-Numerical Structure**  
   The plaintext representation of ecash is not a simple numeric value. Instead, it is an **intricate data structure**, where its value emerges from the richness and completeness of its internal content.  

5. **Splitting & Merging**  
   Ecash cannot be incremented, decremented, summed, or subtracted like traditional numerical values. To transfer value, the data must be **split and merged** with the recipient's ecash data structure.  

---

### Conclusion

Even if an attacker managed to locate and copy ecash data inside the unfolded virtual quantum space, reconstructing it into its original, meaningful order would be **virtually impossible**.  

- No existing or foreseeable computational method could restore its emergent structure.  
- Even if trillions of years of quantum computing were applied to reconstruct plaintext ecash, the attacker would still face the **unsolvable challenge** of understanding how to correctly split or merge its content to spend or manipulate value.  

---

### Transactions

Transactions are the **core of the system**. When one user transfers ecash to another, the process involves:  
- Verifying the authenticity of the ecash being transferred.  
- Updating the balances of both the sender and recipient.  

---

### Spending & Verification

- Once ecash is received, the holder can spend it by **splitting and transferring** their balance to another user or device running the same backend.  
- The system verifies each transfer to ensure validity and prevent **double-spending**.  

---

### Double-Spending Prevention

To prevent the same ecash from being spent multiple times, the system maintains a **record of spent ecash instances**. Every transaction checks against this record to ensure a user cannot reuse the same funds.  

---

### Offline Transactions

- The system supports **offline transaction simulation**, where users can transfer ecash without an internet connection using locally stored records (e.g., local databases or files).  
- Once the system reconnects online, these records are **synchronized** with the central ledger or server.  


### ECash backend usage (iframe)

```ruby
let iframe = document.createElement("iframe");
iframe.src = "https://ecash-icons.web.app";
document.body.appendChild(iframe);
iframe.onload = function() {
    // ecash is ready
};
```


**How to send message request to the ecash backend (iframe)**

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
    iframe.contentWindow.postMessage({ action: "ecash-api-hash-assemble", qrScan: qrScan }, iframe.src);
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
        let cvs = { e: [], i: 0 };
        for (let i = 0, j = document.querySelector(".qr-cont").getElementsByTagName("canvas"); i < j.length; i++) {
            j[i].style.display = "none";
            j[i].style[window.innerWidth < window.innerHeight ? "width" : "height"] = "75%";
            cvs.e.push(j[i]);
        };
        if (cvs.e.length > 1) autoSlide({ t: delay });
        document.getElementById("show-qr-cont").style.display = "block";
    };
    
    if (data.action && data.action.match(/(hash-assemble)/)) {
        let d = JSON.parse(data.object);
        if (d.r) {
            if (d.r && d.ah) {
                document.querySelector(".beneficiary-name").innerHTML = d.ah.name;
                document.querySelector(".beneficiary-number").innerHTML = d.ah.number;
                document.querySelector(".beneficiary-currency").innerHTML = d.ah.currency;
            };
            
            if (d.l) {
                if (d.r && d.l.amount > 0) {
                    alert(`Electronic Cash ${d.l.currency}${d.l.amount}`);
                    readBalance();
                } else alert(`Electronic Cash is Spent`);
            }
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

For development use the dummy electronic cash to test transfer from one device to another while developing your ecash front and back end.

You can get dummy electronic cash from https://ecash-dummy.web.app

![Screenshot 2025-01-03 125509](https://github.com/user-attachments/assets/a04452aa-ef13-46c3-a31e-6a2faf844987)

No need to enter username or password just click the button "Log in".

![Screenshot 2025-01-03 125524](https://github.com/user-attachments/assets/9641fb41-298b-4158-93b0-4139440470ec)

Click the button "Scan QR" - open your app or try https://ecash-demo.web.app or https://qpod-demo.web.app transferring dummy ecash into your account.

For https://ecash-demo.web.app find the button "Show QR" and click.

For https://qpod-demo.web.app scroll down and find the button "Claim" and click.

![Screenshot 2025-01-03 125606](https://github.com/user-attachments/assets/335b378d-33de-49fe-b45c-720feefa182c)

Scan your app or https://ecash-demo.web.app or https://qpod-demo.web.app account QR codes until the dialog below appears.

![Screenshot 2025-01-03 125637](https://github.com/user-attachments/assets/039f81d2-cc60-4f47-b751-efb9324878f6)

When the dialog above appears click the button "Release" to release the dummy electronic cash QR codes.

![Screenshot 2025-01-03 125702](https://github.com/user-attachments/assets/70f08730-ce3c-4308-b348-377f8e2276ec)

Scan the dummy ecash QR codes until a dialog appears "You have received a dummy ecash amount DMY 1,..0.00

During your app development make sure you set the "offline to flase" to disable your caching.

```ruby
let offline: !1; or let offline: false; 
```

or comment out the cache service lines;

```ruby
if (navigator.onLine && offline && "serviceWorker" in navigator) {
    navigator.serviceWorker
        .register("index.js")
        .then((registration) => {})
        .catch((err) => {});
};
```

We look forward to see your ecahs apps and get it become a a working electronic cash platform.

Enjoy!
