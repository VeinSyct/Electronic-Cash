# Electronic Cash Demo

**Ecash** is an open-source electronic cash library that enables developers to build platforms for securely managing and transferring e-cash between benefactors and beneficiaries. Unlike conventional digital payment systems, this library does not rely on cryptographic signatures, centralized accounts, or blockchain ledgers. Instead, e-cash units exist as spatially referenced constructs within a virtual environment, and their state is maintained through an entropy–chaos algorithm that collapses data into an entropic form when inactive.

Developers can integrate the library to create offline-capable platforms, where e-cash is transferred directly between devices or accounts via optical or QR-based exchanges. Each transfer involves splitting and merging portions of the e-cash structure, ensuring that value cannot be duplicated or double-spent. The original e-cash data cannot be retrieved or reconstructed except through the correct virtual address, and it re-emerges only through the deterministic process of emergence defined by the algorithm.

Designed for simplicity and efficiency, the library draws inspiration from microcontroller-based implementations (such as the PIC16F84 using Assembly language), allowing secure, minimal, and lightweight e-cash operations suitable for off-grid or isolated environments, as well as integration into custom platforms for banks, merchants, or digital wallets.

Go to the [Electronic Cash Tutorials](http://ecash-tutorial.web.app) or download the [Ecash Module](https://github.com/VeinSyct/ECash-Module/tree/main/module-ecash/platform) to start building your own ecash platform.  

> **Note:**  
> This repository is not capable of creating ecash. It only stores the *virtual location* of ecash on the device, ensuring security and preventing tampering with ecash data.

![163618338-pagamento-con-codice-qr-shopping-online-portafoglio-e-concetto-di-tecnologia-senza-contanti-mano](https://github.com/user-attachments/assets/a61d67b6-cbe2-4195-aa54-01bd9e001097)

This is a demo electronic cash application that enables the secure transfer of e-cash between mobile and desktop devices. Each e-cash instance exists as a spatially referenced construct within a virtual environment and is managed by an entropy–chaos algorithm, which collapses inactive data into an unreadable entropic state.

Transfers occur through splitting and merging of e-cash structures via optical or QR-based exchanges, ensuring that once e-cash is merged with a recipient, it no longer exists in the sender’s environment. This mechanism naturally prevents double-spending, maintains transactional integrity, and preserves anonymity, without relying on cryptographic keys, centralized accounts, or blockchain ledgers.

The system’s simplicity originates from its microcontroller-based design (originally implemented on the PIC16F84 using Assembly), making it lightweight, deterministic, and suitable for offline or off-grid environments, while providing a flexible foundation for developers to experiment with custom platforms, wallets, or financial infrastructures.

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
SendTx btfss 0x1c,2
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


### What Makes This Different?

Unlike cryptocurrencies and conventional digital payment systems, this application was built for a different future — one prepared for massive wealth operating beyond the grid (offline), beyond the global to off-planet economies.

Developers and designers are invited to build upon it. Use the provided e-cash module to create complete banking systems, merchant platforms, digital wallets, and financial infrastructures. Extend it, reshape it, or rebuild it entirely — the framework is open for those ready to engineer the next phase of exchange.

Demo e-cash is available for anyone developing or testing optical transfer flows. Request access, and you’ll receive demo e-cash for simulation and integration. Work in any environment you prefer: Figma, WordPress, Laravel, or plain HTML/CSS/JS. Integration examples are included in the public/ folder.

For security researchers and hackers, this is an open challenge. The e-cash system was designed to withstand intrusion, duplication, and exploitation. You are invited to prove otherwise. Attempt to forge, double, steal, or subvert — every angle is open. If you find a way through, reveal it. Demonstrate it. Expose it if you wish. The integrity of the system depends on those willing to test it without restraint.

### Collaboration — Developers, Designers & Hackers

For developers and designers, you are encouraged to create your own platforms and infrastructures using the provided e-cash module — whether for banks, merchants, or entirely new financial ecosystems. You are free to adapt, extend, and redesign it into your own frontends or backends, with full creative control over implementation and user experience.

Demo e-cash will be provided upon request for testing optical or offline transfer scenarios. Refer to the integration examples in the public/ folder to get started.

For security researchers and hackers, this is a standing invitation — a stress test of trust and design. You are free to analyze, reverse-engineer, exploit, or expose potential flaws. Publish your findings openly or share them privately — there are no restrictions or censorship. Only one rule applies: testing must stay within provided demo or sandbox environments.

Your discoveries — whether successful exploits or confirmations of resilience — are part of the system’s evolution. Break it if you can. Strengthen it if you will. Either way, the result is progress.

---

### Challenges (testing objectives)

Try to reproduce these scenarios in a controlled test environment. When you find a working exploit or proof-of-concept, report it responsibly as described above.

1. Modify the dummy ecash balance (e.g., change `DMY 1,000.00` → `DMY 2,000.00`).
2. Duplicate an account into multiple cloned accounts, spend from one, then spend from the clones (attempt to demonstrate a double-spend).
3. Change the currency identifier (e.g., convert **DMY** to **USD** or any currency of your choice).
4. Transfer (exfiltrate) an account’s ecash data to a newly created account.

---

### About this repository

This repository includes both the electronic cash **storage** ([https://ecash-demo.web.app](https://ecash-demo.web.app)) and **supply** ([https://ecash-dummy.web.app](https://ecash-dummy.web.app)) modules, allowing developers to build and test their own electronic cash storage applications.  

The implementation is straightforward and simple, making it an excellent foundation for developing more advanced and complex e-cash systems.  

![image](https://github.com/user-attachments/assets/ae11aadc-c563-4eed-86a8-81af27a0f661)


This repository implements a basic electronic cash system that supports ecash transfers and local storage so users can perform secure, anonymous transactions without relying on a central authority or single server. Use this project as a foundation for building more advanced e-cash systems — and help us improve it by contributing UI/UX features, integrations, tests, and security research.


## How to Use This Repository

### Core Components

**Cash creation & minting**  
This project does **not** create or mint ecash. It has no capability to generate new ecash; instead, it supports splitting and transferring existing ecash to a beneficiary device.

---

### Security elements

The system uses an entropy–chaos algorithm (implemented in this repository) that collapses e-cash data into an entropic state, making it impossible to reconstruct by reversal or brute force.

Data becomes readable again only through emergence — a process where order reappears naturally within the algorithm’s deterministic chaos. This is not restoration or decryption, but a recurrence of structure predicted by the algorithm’s internal timing and sequence logic.

This method allows e-cash to exist as transient, self-validating data that cannot be copied, forged, or meaningfully analyzed outside its active state.

Instead of being stored as conventional data, each e-cash unit exists as a spatial reference — a location within a virtual environment mapped to a unique link address. The browser’s local storage retains only that reference, not the e-cash itself. When revisiting the same virtual position, the system re-activates the data through the entropy–chaos algorithm, allowing it to re-emerge into readable form.

The simplicity of this system is intentional — its architecture descends from early microcontroller implementations written in pure Assembly language (such as on the PIC16F84). Its strength lies not in cryptographic complexity, but in deterministic behavior and controlled entropy flow — minimal code, maximum consequence.

---

### Safety features

The e-cash system does not rely on blockchain encryption, cryptographic keys, or centralized banking logic. Instead, each e-cash instance is tied to a unique virtual space address, stored locally on the user’s device. This address acts as a spatial pointer rather than a key — it identifies where in the system the e-cash can re-emerge.

The e-cash data is not stored as readable information but as a collapsed entropic state. When inactive, it exists only as structured chaos — unreadable and unrecoverable without emergence through its matching virtual address.

When the correct virtual location is accessed (for example, by scanning the proper QR code or re-entering the original spatial link), the algorithm allows the data to reappear naturally through deterministic emergence. This process is not decryption or recovery but a reformation of order predicted by the entropy–chaos algorithm.

The address link stored in the browser’s local storage functions only as a coordinate reference. It does not contain the e-cash itself, only the location where the data can be reconstituted. Leaving that environment causes the data to collapse back into entropy.

The simplicity of this design comes from its origin in Assembly-level microcontroller logic — first conceived on the PIC16F84. Its safety lies not in cryptographic barriers but in deterministic behavior and the natural irreversibility of entropy collapse.

Important (design note): these mechanisms form part of the conceptual and experimental security model. Use this repository for demo, research, and development purposes only — production-grade implementations should undergo independent security review and validation.

![image](https://github.com/user-attachments/assets/bbb62090-de37-452b-aef0-04595b2f9f60)

---

### Safety measures

Ecash data is not stored as plain, directly readable files on the device. Each instance exists as an entropic construct that can only be accessed or re-emerged through its corresponding virtual space address (a link or pointer unique to that instance).

This repository provides the core primitives for storage, transfer, and emergence of ecash. Developers integrating this system should design their own additional layers — such as access control, audit mechanisms, or experimental security validation — before applying it beyond research or demonstration use.


## System Summary

**Virtual Spatial Storage**
Ecash is not stored as raw data but as a spatial construct within a simulated virtual environment. Each ecash instance occupies a distinct position — a location reference that serves as its access point — much like an object placed within a digital world that can only be found by returning to that same place.

**Origin and Simplicity**
The system’s design descends from early microcontroller logic, inspired by the PIC16F84 implementation originally written in pure Assembly. Its simplicity is deliberate — relying on minimal instruction cycles and direct memory interaction rather than complex encryption layers or blockchain dependencies.

**Collapse into Entropy**
When the virtual space is folded or exited, the ecash data collapses into entropy, losing all coherent structure. This state cannot be reversed or restored in a conventional sense; only through emergence can a form resembling the original data appear again.

**Emergence and Address Resolution**
Reconstructing ecash requires both the program capable of unfolding the virtual space and the exact spatial address that points to its location. Without this address, the data remains entropic noise — impossible to interpret or reassemble by brute computation.

**Splitting and Merging**
Ecash has no numerical quantity in the traditional sense. Value is not stored as digits but as structural wholeness. To transfer value, one must split a portion of the structure and allow it to merge with another — the act of exchange itself defining the measure of worth. 

---

### Conclusion

Even if an attacker were to locate and copy an ecash instance within its unfolded virtual space, reconstructing it into a coherent or spendable form would be virtually impossible.

- The ecash structure does not exist as readable data — only as an emergent formation that arises when its virtual space is correctly unfolded and its spatial address precisely resolved.

- No known or theoretical computation, not even across trillions of years of quantum processing, could restore its emergent order once collapsed into entropy.

- Even if the raw structure were somehow recovered, the attacker would still face the unsolvable problem of determining how its components must split, merge, or re-emerge to manifest usable value.

---

### Transactions

Transactions are the core of the system. When one user transfers ecash to another, the process involves:

- Merging and splitting ecash data between sender and receiver through the correct virtual address.

- The transfer occurs only if the receiver’s address matches and successfully absorbs the data sent via the optical (QR) exchange.

- Once merged, the transferred ecash becomes part of the recipient’s data structure — it no longer exists on the sender’s side, ensuring one-way value movement without duplication.

---

### Spending & Verification

- Once ecash is received, the holder can transfer a portion by splitting it and merging it with the recipient’s ecash data structure via the correct virtual address.

- Validity is enforced by the transfer protocol itself: ecash can only merge with the intended recipient, and once merged, it no longer exists in the sender’s structure, naturally preventing duplication or double-spending.

---

### Double-Spending Prevention

To prevent the same e-cash from being spent multiple times, the system does not rely on a ledger or record of past transactions. Instead:

- Once an e-cash unit is merged with a recipient’s data structure, it ceases to exist in the sender’s space. This naturally prevents reuse, as the original instance no longer exists to be resent.

- The virtual address-based transfer ensures that e-cash can only re-emerge at its designated location, and only when the receiver’s environment accepts and integrates it.

- Double-spending is therefore impossible under normal operation, because the e-cash state exists uniquely in one place at a time, enforced by the entropy–chaos algorithm and spatial resolution logic.  

---

### Offline Transactions

- The system supports offline transactions, enabling users to transfer e-cash without any internet or network connection. Each e-cash instance exists as a spatial construct tied to a virtual address on the sender’s device. When a transfer is initiated, the relevant portion of the e-cash structure is split from the sender and merged into the recipient’s virtual space through optical means, such as scanning a QR code or other device-to-device exchange.

- There is no centralized ledger or online database; the transaction is self-contained within the devices involved. The uniqueness of the virtual address ensures that once the e-cash is merged into the recipient’s structure, it is no longer available on the sender’s side, naturally preventing double-spending or duplication.

- Offline transfers rely on deterministic behavior of the entropy–chaos algorithm. Even if the devices remain disconnected, the system guarantees that the emergent e-cash state is valid and consistent when it appears on the recipient’s side. The data remains collapsed into entropy outside the active transfer process and re-emerges only when the correct virtual address is resolved, preserving the integrity of each transaction.

- This approach allows e-cash to function in fully off-grid scenarios, including environments with limited connectivity or for devices in physically isolated networks. Transactions are fast, lightweight, and secure because they do not depend on network latency, server validation, or blockchain consensus.


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
