#SPENDAID - Nico Krekelberg - Mobile Web Apps - Howest

**What the app is supposed to do**<br/>
The app has  two main features. 
1) A currency converter (for example: USD -> EUR) and set an amount to convert (for example 20)<br/>
This will show you how much that currency with that amount is worth in the desired currency.

2) A cost management feature mainly about fixed costs.<br/><br/> First you fill in a fixed cost (give it a name, cost price, frequence [weekly, monthly, yearly] and a color). <br/>
The color is mainly to group costs (for example red is every cost about your house)<br/>
There is a paragraph that will tell you your total cost weekly, monthly and yearly based on all your fixed costs. <br/>
They also have the possibility to remove costs.

**What was used to build it**
* HTML, CSS, JS
* jQuery and webfonts/fontawesome
* Service worker
* Indexeddb
* Manifest
* API to get the rates from currencies: https://api.latest.io ("https://api.fixer.io/latest?base="+currency)
* Domain 
* Digitalocean droplet with apache
* Let's Encrypt for the ssl certificate


**Github repository**<br/>
https://github.com/KrekelbergNico/KrekelbergNico.github.io <br/>

**Hosted at:**<br/>
 https://spendaid.be **and** https://KrekelbergNico.github.io

**Security headers**

Header always set Strict-Transport-Security "max-age=63072000; includeSubdomains"<br/>
-> Can only interact with HTTPS, serve all subdomains over HTTPS<br/>
    
Header always set X-Frame-Options SAMEORIGIN <br/>
-> Defense against clickjacking<br/>

Header always set X-Content-Type-Options nosniff<br/>
-> The MIME types advertised in the content-type should not be changed and be followed<br/>
-> Tell the browser to shut up and set the damn content type to what I tell you, thank you<br/>

Header always set Referrer-Policy "same-origin"<br/>
-> governs which referrer information should be included with the requests made<br/>

Header always set X-XSS-Protection "1; mode=block" <br/>
-> X-XSS-Protection (cross-site scripting protection)<br/>
      
Header always set Content-Security-Policy: "default-src 'self' https://api.fixer.io; script-src 'self'; img-src 'self'; style-src 'self'; font-src 'self'; frame-ancestors 'self'"<br/>
-> declares which resources are allowed. Also included my api call his resources<br/>


**'Observatory by mozilla'-scan results**<br/>
Tests passed: 11/11<br/>
Score 115/100<br/>
Will put screenshots under "Observatory_results" folder (in the zip)<br/>
or go to: https://observatory.mozilla.org/analyze/spendaid.be

**Extra information**<br/>
My API ends at 1 june. So the converter might not work anymore if this is tested on a later date.<br/>
To see the working of it, take a look at the demo named Spendaid_KrekelbergNico.mp4 (in the zip)<br/>
I'm aware that the HTML is not valid and that it responses with an error about the media for the apple splash page. But unfortunatly this is the only way to make it work on iOS. I've tried other methods but they were no success. So I'm forced to implement them and make my HTML unvalid because of it.



