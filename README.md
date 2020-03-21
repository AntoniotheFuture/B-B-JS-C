# B-B-JS-C
Simple browser-based JS crawler
Injecting JS into target pages and identificate captcha using third party library.

1. Open your browser.
2. Press F12 and enter console.
3. Paste the ready code.
4. Start to use.

##ready code:

```javascript
function loadJs(url,callback){
var script=document.createElement('script');
script.type="text/javascript";
if(typeof(callback)!="undefined"){
    if(script.readyState){
        script.onreadystatechange=function(){
            if(script.readyState == "loaded" || script.readyState == "complete"){
                script.onreadystatechange=null;
                callback();
            }
        }
    }else{
    script.onload=function(){
        callback();
    }
    }
}
script.src=url;
document.body.appendChild(script);
};

loadJs('https://your-cdn.com/main.js');
```
