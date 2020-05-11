//删除body
document.body.innerHTML='';

//删除css
var styles = document.getElementsByTagName('style');
for(var i = styles.length - 1; i >= 0; i--) {
    document.head.removeChild(styles[i]);
}

//删除link
var links = document.getElementsByTagName('link');
for(var i = links.length - 1; i >= 0; i--) {
    document.head.removeChild(links[i]);
}

//加载js
loadJs('https://unpkg.com/tesseract.js@2.0.0/dist/tesseract.min.js');
//loadJs('https://cdn.bootcss.com/tesseract.js/1.0.19/worker.js');
loadJs('https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js');

function heredoc(fn) {
    return fn.toString().split('\n').slice(1,-1).join('\n') + '\n'
}

//添加style
var style = document.createElement('style'); 
style.type = 'text/css'; 
style.innerHTML=  heredoc(function(){/*
    body h1 {
            font-family: Cambria, 'Hoefler Text', 'Liberation Serif', Times, 'Times New Roman', 'serif';
            color: aliceblue;
        }

        body h2 {
            font-family: Cambria, 'Hoefler Text', 'Liberation Serif', Times, 'Times New Roman', 'serif';
            color: aliceblue;
        }

        body h7 {
            font-family: Cambria, 'Hoefler Text', 'Liberation Serif', Times, 'Times New Roman', 'serif';
        }

        body h4 {
            font-family: Cambria, 'Hoefler Text', 'Liberation Serif', Times, 'Times New Roman', 'serif';
        }



*/});
document.head.appendChild(style); 


//构建网页
document.title = 'coded by AntoniotheFuture';
document.body.innerHTML= heredoc(function(){/*
<body style="width: 100%;height: 100%;padding: 0px;margin: 0px;text-align: center;">
    <div id="head" style="width: 100%;background-color: dodgerblue;height: 100px;margin-top: 0px;">
        <div id="titlediv" style="text-align: left;width: 90%;max-width:1000px;margin-left: auto;margin-right: auto;">
            <h1 style="margin-top: 0px;">Demo</h1>
            <h2>title </h2>
        </div>


    </div>
    <div id="main" style="width: 90%;max-width:1000px;border: dodgerblue solid 1px;margin: auto;height:auto;min-height: 700px">
        <div style="width: 100%;display: inline-block">
            <div id="leftpan" style="width: 100%;float: left">


                
               
                <div id="options" style="width: 100%;margin-top: 10px;text-align: left;padding-left: 2%;">
                    <label ></label>
                    <input type="text" style="" title="PasteFrom" id='splittime' value="500">
                   
                    <label>retry time</label>
                    <input type="text" style="" id='retrytime' title="PasteFrom" value="3">
                    <br>
                    <label>query type:</label>
                    <input type="checkbox" name="types" id='ualificano' value="ualificano"/> no1
                    <input type="checkbox" name="types" id='practicecode' value="practicecode" /> no2
                    <input type="checkbox" name="types" id='name' value="name"  checked="checked" />name
                    <input type="checkbox" name="types"  id='cardno' value="cardno" checked="checked" /> IDNO


                </div>
                <hr>
                <div id="Res-notice" style="text-align: left;width: 100%;padding-left: 2%;">
                    <label style="text-align: left;" >query data</label>
                </div>
                
                <div style="width: 100%;text-align: center;margin-top: 5px;position:relative">
                    
                    <div id="sourcetext" contenteditable style="width:auto;min-width: 96%; overflow-x: auto; margin-left: 2%; text-align:left;overflow-y:scroll;min-height: 300px;background-color: transparent;color:darkcyan;border: solid 1px rgba(0,0,0,0.50);;visibility:visible;height: 300px;"></div>

                </div>
                <div id="Res-notice" style="text-align: left;width: 100%;padding-left: 2%;">
                    <label style="text-align: left;" >log</label>
                </div>
                <div style="width: 100%;text-align: center;margin-top: 5px;position:relative;display: block;">
                    
                    <div id="logtext" contenteditable style="width:auto;min-width: 96%; overflow-x: auto; margin-left: 2%; text-align:left;overflow-y:scroll;min-height: 150px;background-color: transparent;color:darkcyan;border: solid 1px rgba(0,0,0,0.50);;visibility:visible;height: 150px;"></div>

                </div>
                <div id="Buttons2" style="width: 100%;margin-top: 10px;text-align: left;padding-left: 2%;">
                    <input onClick="test();" type="button" style="font-size: 16px;margin: 0px;background-color: aqua;" title="PasteFrom" value="test">
                    <input onClick="start();" type="button" style="font-size: 16px;margin: 0px;background-color: aqua;" title="PasteFrom" value="run">
                    <input onClick="stop();" type="button" style="font-size: 16px;background-color: lightsalmon;" title="PasteFrom" value="stop">
                    <input onClick="ClearInput();" type="button" style="font-size: 16px;" title="PasteFrom" value="clear">
                    <input onClick="copyresult();" id="ShowFI" type="button" style="font-size: 16px;visibility:visible" title="PasteFrom" value="copy">
                    <input onClick="showlog();" id="ShowFI" type="button" style="font-size: 16px;visibility:visible" title="PasteFrom" value="show log">


                </div>
                <hr>
                <div id='status' style="width: 100%;text-align: center;margin-top: 5px;position:relative;display: block;">
                    status
                </div>
                <div id="Res-notice" style="text-align: left;width: 100%;padding-left: 2%;">
                    <label style="text-align: left;" >result</label>
                </div>
                <div style="width: 100%;text-align: center;margin-top: 5px;position:relative">
                    
                    <div id="resulttext" contenteditable style="font-size: 10px;width:auto;min-width: 96%; overflow-x: auto; margin-left: 2%; text-align:left;overflow-y:scroll;min-height: 300px;background-color: transparent;color:darkcyan;border: solid 1px rgba(0,0,0,0.50);;visibility:visible;height: 300px;"></div>

                </div>
                <div id="Buttons" style="width: 100%;margin-top: 10px;text-align: left;padding-left: 2%;">
                    <a href=""></a>


                </div>

            </div>
        </div>

    </div>

    <hr style="margin-top: 100px;">
    <div id="Bottom">
        <div style="text-align: left;width: 60%;max-width:1000px;margin-left: auto;margin-right: auto;">

        </div>



    </div>
</body>

*/});


//定义常量
var captchaURL = 'http://.../captchaimg';
var queryURL = 'http://.../query';
var defaultst = 500;
var defaultrt = 3;
var OKColor = 'lightgreen';
var ErrColor = 'lightcoral';
var ShowFunctionInfo = true;
var source = []; //元数据
var logmsg = ''; //日志信息
var result = ''; //结果信息
var splittime = 500; //间隔时间
var retrytime = 3;//重试时间
var status = '';//状态信息
var types = [];
var running = false;



//获取参数
function getAttrs(){

    var sourcetext = document.getElementById('sourcetext').innerText;
    source=sourcetext.split(/[(\r\n)\r\n]+/);
    source.forEach((item,index)=>{
        if(!item){
            source.splice(index,1);//删除空项
        }
    });
    splittime = document.getElementById('splittime').value;
    retrytime = document.getElementById('retrytime').value;
    if(!isInteger(splittime)){
        splittime = defaultst;
    }
    if(splittime < 0){
        splittime = defaultst;
    }
    if(!isInteger(retrytime)){
        retrytime = defaultrt;
    }
    if(retrytime < 0){
        retrytime = defaultrt;
    }
    types.length = 0;
    //types.splice(0,types.length);
    var typesoption = document.getElementsByName("types");
    for (var i = 0; i < typesoption.length; ++i) {
        if(typesoption[i].checked) {  
            types.push(typesoption[i].value);  
        }
    }

}
//检查参数
function checkAttrs(){
    if(splittime == ''){splittime = defaultst}
    if(retrytime == ''){retrytime = defaultrt}
    if(!source){return 'input your data'}
    if(types.length < 2){return 'two type required'}
    return true;
}


//将信息显示出来
function syncmsg(){
    document.getElementById('logtext').innerHTML = logmsg;
    document.getElementById('status').innerHTML = status;
    document.getElementById('resulttext').innerHTML = result;
}

//判断整型
function isInteger(obj) {
    return obj%1 === 0
}

//清空输入框
function ClearInput(){
    document.getElementById('sourcetext').innerHTML = '';
}

//清空状态
function chearstatus(){
    var el = document.getElementById('status');
    var childs = el.childNodes; 
    for(var i = childs.length - 1; i >= 0; i--) {
        el.removeChild(childs[i]);
    }
}

//测试图片与识别
 function test(){
    //获取图片
    chearstatus();
    var img = new Image();
    img.src = captchaURL + '?v=' + Math.random();
    img.onload = function(){
        document.getElementById('status').appendChild(img);
        Tesseract.recognize(img, 'eng')
        .then(function(result){
            alert(result.text);
        });
    }
 }

//清空日志
async function clearlog(){
    var el = document.getElementById('logtext');
    var childs = el.childNodes; 
    for(var i = childs.length - 1; i >= 0; i--) {
        el.removeChild(childs[i]);
    }
}

 function addlog(content){
    document.getElementById('logtext').appendChild(content);
 }

//构建状态语
function showstatus(totaltime){
    var t = '进度:' + success + '/' + total + ' ' + Number(success/total*100).toFixed() + '%' + '<br>' +
        '识别成功率' + Number(hit/trytime*100).toFixed() + '%' + '<br>' +
        '总用时：' + totaltime + '秒；平均用时：' + Number(totaltime/total).toFixed();
        document.getElementById('status').innerHTML = t;
}

var results = [];
var sleep = function(time) {
    var startTime = new Date().getTime() + parseInt(time, 10);
    while(new Date().getTime() < startTime) {}
};

async function start(){
    //构建参数
    getAttrs();
    checkresult = checkAttrs();
    if(checkresult != true){
        console.log(checkresult);
    }
    clearlog();
    var i;
    total = source.length;
    success = 0;
    trytime = 0;
    workerscount = 0;
    hit = 0;
    results.length = 0;
    var t1 = (new Date()).valueOf()/1000;
    var worker = new Tesseract.createWorker();
    console.log('新线程创建完毕')
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');

    for(i = 0;i < total;i++){
        var t2 = (new Date()).valueOf()/1000;
        showstatus(t2 - t1);
        /*
        do{
            console.log('正在等待分配任务线程');
            sleep(3000);
            var t3 = (new Date()).valueOf()/1000;
            if(t3 - t2 > 60){
                alert('等待的时间太长，请检查网络状态');
                return;
            }
        }
        while(workerscount > 10);
        */
        document.getElementById('logtext').innerHTML = '';
        await loadandreg(source[i],worker);
        showstatus(t2 - t1);
    }
    t2 = (new Date()).valueOf()/1000;
    showstatus(t2 - t1);
    alert('执行完毕');
}

//判断验证码是否符合要求
function checkcap(cap){
    if(cap.length != 4){
        return false;
    }
    for (var i in cap) {
        var asc = cap.charCodeAt(i);
        if (!(asc >= 48 && asc <= 57 || asc >= 65 && asc <= 90 || asc >= 97 && asc <= 122)) {
            return false;
        }
    }
    return true;
}

//ajax同步
function fetch(url,querydata) {
    const p = new Promise((resolve, reject) => {
      $.ajax(url, {
        dataType: 'json',
        processData: false,
        contentType: false, 
        timeout: 10000,
        type : "post",
        data: querydata,
        dataType : "json",
        success: function (data) {
            resolve(data);
        },
        error: function () {
            resolve('返回错误');
          //reject(new Error('返回错误'))
        }
      })
    })
    return p
  }

function updateview(){
    var t = '';
    document.getElementById('resulttext').innerHTML = '';
    for(var i =0;i<results.length;i++){
        t += results[i];
    }
    document.getElementById('resulttext').innerHTML = t;

}

//单独变量记录状态
var total = 0;
var success = 0;
var trytime = 0;
var hit = 0;
var workerscount = 0;
  
//调用并识别一次
async function loadandreg(q,worker){
    workerscount ++;
    
    var querydata = {};
    var img = new Image();
    var ishit = false;
    var tryc = 0;
    var fdata = new FormData();

    
    for(i = 0;i<types.length;i++){
        querydata[types[i]] = '';
    }
    querydata['captcha'] = '';
    s = q.split('\t');
    for(ii = 0;ii < s.length;ii++){
        fdata.append(Object.keys(querydata)[ii],s[ii]);
        querydata[Object.keys(querydata)[ii]] = s[ii];
    }
    do {
        //todo:加入延时
        trytime ++;
        tryc ++;
        
        var promise = new Promise((reslove)=>{
            img.onload = async function(){

                var newcans = document.createElement("canvas");
                var ctr = newcans.getContext('2d');
                newcans.width = img.width + 40;
                newcans.height = img.height + 40;
                ctr.fillStyle = '#808080';
                ctr.fillRect(0,0,newcans.width,newcans.height);
                ctr.drawImage(img,20,20);//,img.width,img.height
                addlog(newcans);
                
                var checkc = false;
                var nospace = '';
                var cc = 0;
                do {
                    const { data } = await worker.recognize(newcans);
                    nospace = data.text.replace(/\s+/g,"");
                    checkc = checkcap(nospace);
                    cc++;
                }
                while(!checkc && cc < 5);
                querydata['captcha'] = nospace.substring(0,4);
                if(fdata.has('captcha')){fdata.delete('captcha');}
                fdata.append('captcha',querydata['captcha']);
                console.log(JSON.stringify(querydata));
                var ele = document.createElement('a');
                ele.innerHTML = querydata['captcha'];
                addlog(ele);
                addlog(document.createElement('br'));
                var queryresult = await fetch(queryURL + "?checkcaptch&time="+new Date(),fdata);
                    if (queryresult.result === "succeed") {
                        console.log('识别成功');
                        hit ++;
                        ishit = true;	
                        if(queryresult.dataGrid.total >= 1){
                            for(r = 0;r < queryresult.dataGrid.total; r++){
                                results.push(q + ',' +  JSON.stringify(queryresult.dataGrid.rows[r]) + '<br>');
                            }
                        }else{
                            results.push(q +  ',无信息<br>');
                        }
                    } else{
                        console.log('识别失败');
                    }
                    reslove();
            },
            img.onerror = async function(){
                //setInterval(function(){
                    console.log('加载图片失败');
                    tryc --;
                    reslove();
                    sleep(1000);
                //},1000)
            }
        });
        img.src = captchaURL + '?v=' + new Date();
        await promise
        
    }
    while(!ishit && tryc < retrytime);
    if(!ishit){
        results.push(q + ',查询失败<br>');
    }
    updateview();
    success ++;
    //worker.terminate();
    workerscount --;

}