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
document.title = '批量查询-coded by AntoniotheFuture';
document.body.innerHTML= heredoc(function(){/*
<body style="width: 100%;height: 100%;padding: 0px;margin: 0px;text-align: center;">
    <div id="head" style="width: 100%;background-color: dodgerblue;height: 100px;margin-top: 0px;">
        <div id="titlediv" style="text-align: left;width: 90%;max-width:1000px;margin-left: auto;margin-right: auto;">
            <h1 style="margin-top: 0px;">Demo</h1>
            <h2>爬虫   </h2>
        </div>


    </div>
    <div id="main" style="width: 90%;max-width:1000px;border: dodgerblue solid 1px;margin: auto;height:auto;min-height: 700px">
        <div style="width: 100%;display: inline-block">
            <div id="leftpan" style="width: 100%;float: left">


                
               
                <div id="options" style="width: 100%;margin-top: 10px;text-align: left;padding-left: 2%;">
                    <label >设置间隔（毫秒、防止被检测）</label>
                    <input type="text" style="" title="PasteFrom" id='splittime' value="500">
                   
                    <label>验证码识别重试次数</label>
                    <input type="text" style="" id='retrytime' title="PasteFrom" value="3">
                    <br>
                    <label>查询方式:</label>
                    <input type="checkbox" name="types" id='ualificano' value="ualificano"/> 号码
                    <input type="checkbox" name="types" id='practicecode' value="practicecode" /> 编号
                    <input type="checkbox" name="types" id='name' value="name"  checked="checked" /> 姓名
                    <input type="checkbox" name="types"  id='cardno' value="cardno" checked="checked" /> 身份证后四位


                </div>
                <hr>
                <div id="Res-notice" style="text-align: left;width: 100%;padding-left: 2%;">
                    <label style="text-align: left;" >在这里粘贴要查询的数据(可直接复制Excel中数据)</label>
                </div>
                
                <div style="width: 100%;text-align: center;margin-top: 5px;position:relative">
                    
                    <div id="sourcetext" contenteditable style="width:auto;min-width: 96%; overflow-x: auto; margin-left: 2%; text-align:left;overflow-y:scroll;min-height: 300px;background-color: transparent;color:darkcyan;border: solid 1px rgba(0,0,0,0.50);;visibility:visible;height: 300px;"></div>

                </div>
                <div id="Res-notice" style="text-align: left;width: 100%;padding-left: 2%;">
                    <label style="text-align: left;" >日志</label>
                </div>
                <div style="width: 100%;text-align: center;margin-top: 5px;position:relative;display: block;">
                    
                    <div id="logtext" contenteditable style="width:auto;min-width: 96%; overflow-x: auto; margin-left: 2%; text-align:left;overflow-y:scroll;min-height: 150px;background-color: transparent;color:darkcyan;border: solid 1px rgba(0,0,0,0.50);;visibility:visible;height: 150px;"></div>

                </div>
                <div id="Buttons2" style="width: 100%;margin-top: 10px;text-align: left;padding-left: 2%;">
                    <input onClick="test();" type="button" style="font-size: 16px;margin: 0px;background-color: aqua;" title="PasteFrom" value="测试">
                    <input onClick="start();" type="button" style="font-size: 16px;margin: 0px;background-color: aqua;" title="PasteFrom" value="开始执行">
                    <input onClick="stop();" type="button" style="font-size: 16px;background-color: lightsalmon;" title="PasteFrom" value="停止执行">
                    <input onClick="ClearInput();" type="button" style="font-size: 16px;" title="PasteFrom" value="清空输入框">
                    <input onClick="copyresult();" id="ShowFI" type="button" style="font-size: 16px;visibility:visible" title="PasteFrom" value="复制结果">
                    <input onClick="showlog();" id="ShowFI" type="button" style="font-size: 16px;visibility:visible" title="PasteFrom" value="显示/隐藏日志框">


                </div>
                <hr>
                <div id='status' style="width: 100%;text-align: center;margin-top: 5px;position:relative;display: block;">
                    这里用于显示验证码图片和识别结果/运行状态
                </div>
                <div id="Res-notice" style="text-align: left;width: 100%;padding-left: 2%;">
                    <label style="text-align: left;" >查询结果</label>
                </div>
                <div style="width: 100%;text-align: center;margin-top: 5px;position:relative">
                    
                    <div id="resulttext" contenteditable style="font-size: 10px;width:auto;min-width: 96%; overflow-x: auto; margin-left: 2%; text-align:left;overflow-y:scroll;min-height: 300px;background-color: transparent;color:darkcyan;border: solid 1px rgba(0,0,0,0.50);;visibility:visible;height: 300px;"></div>

                </div>
                <div id="Buttons" style="width: 100%;margin-top: 10px;text-align: left;padding-left: 2%;">


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
var captchaURL = 'http://somesite/captchacn.svl';
var queryURL = 'http://somesite/query.do';
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
    if(!source){return '请输入要查询的数据'}
    if(types.length < 2){return '至少需要两个查询方式'}
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
function clearlog(){
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
function showstatus(total,success,trytime,hit,totaltime){
    var t = '进度:' + success + '/' + total + ' ' + Number(success/total*100).toFixed() + '%' + '<br>' +
        '识别成功率' + Number(hit/trytime*100).toFixed() + '%' + '<br>' +
        '总用时：' + totaltime + '秒；平均用时：' + Number(totaltime/total).toFixed();
        document.getElementById('status').innerHTML = t;
}

async function start(){
    //构建参数
    getAttrs();
    checkresult = checkAttrs();
    if(checkresult != true){
        alert(checkresult);
    }
    clearlog();
    var total = source.length;
    var success = 0;
    var trytime = 0;
    var hit = 0;
    var img = new Image();
    var querydata = {};
    var ishit = false;
    var tryc = 0;
    var i;
    var ii;
    var r;
    var cap;
    var cans = document.createElement("canvas");

    cans.style.backgroundColor = "#808080";
    var ctrx = cans.getContext('2d');
    var t1 = (new Date()).valueOf()/1000;

    var worker = new Tesseract.createWorker();
    for(i = 0;i<types.length;i++){
        querydata[types[i]] = '';
    }
    querydata['captcha'] = '';
    result = '';
    
    for(i = 0;i < total;i++){
        var t2 = (new Date()).valueOf()/1000;
        showstatus(total,success,trytime,hit,t2 - t1);
        s = source[i].split('\t');
        var fdata = new FormData();
        for(ii = 0;ii < s.length;ii++){
            fdata.append(Object.keys(querydata)[ii],s[ii]);
            querydata[Object.keys(querydata)[ii]] = s[ii];
        }
        
        ishit = false;
        tryc = 0;
        do {
            //todo:加入延时
            trytime ++;
            tryc ++;
            img.src = captchaURL + '?v=' + new Date();
            var promise = new Promise((reslove)=>{
                img.onload = async function(){
                    cans.width = img.width;
                    cans.height = img.height;
                    
                    ctrx.drawImage(img,0,0);//,img.width+20,img.height+20
                    //var logimg = new Image();
                    var newcans = document.createElement("canvas");
                    newcans.width = img.width;
                    newcans.height = img.height;
                    newcans.getContext('2d').drawImage(img,0,0);//,img.width,img.height
                    addlog(newcans);
                    await worker.load();
                    await worker.loadLanguage('eng');
                    await worker.initialize('eng');
                    var checkc = false;
                    var nospace = '';
                    var cc = 0;
                    do {
                        const { data } = await worker.recognize(cans);
                        //去除空格
                        nospace = data.text.replace(/\s+/g,"");
                        checkc = checkcap(nospace);
                        cc++;
                    }
                    while(!checkc && cc < 5);
                    querydata['captcha'] = nospace.substring(0,4);
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
                                result += source[i] + ',' +  JSON.stringify(queryresult.dataGrid.rows[r]) + '<br>';
                            }
                        }else{
                            result += source[i] +  ',无信息<br>';
                        }
                    } else{
                        console.log('识别失败');
                    }
                    reslove();
                }
            })
            await promise
            
        }
        while(!ishit && tryc < retrytime);
        if(!ishit){
            result += source[i] + ',查询失败<br>';
        }
        success ++;
        document.getElementById('resulttext').innerHTML = result;

    }
    t2 = (new Date()).valueOf()/1000;
    showstatus(total,success,trytime,hit,t2 - t1);
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
        timeout: 5000,
        type : "post",
        data: querydata,
        dataType : "json",
        success: function (data) {
            resolve(data);
        },
        error: function () {
          reject(new Error('返回错误'))
        }
      })
    })
    return p
  }
  