/*
 * 原始登陆函数区域
 */
sv=0;sv1=0;v6='http://ip6.dr.com:9002/v6                               ';myv6ip='                                       ';v4serip='192.168.255.243';m46=0;v46ip='192.168.36.233'                         ;
ps=1;pid='1';calg='12345678';
function safe_add(x,y){
var lsw=(x&0xFFFF)+(y&0xFFFF)
var msw=(x>>16)+(y>>16)+(lsw>>16)
return(msw<<16)|(lsw&0xFFFF)}

function rol(num,cnt){return(num<<cnt)|(num>>>(32-cnt));}
function cmn(q,a,b,x,s,t){return safe_add(rol(safe_add(safe_add(a,q),safe_add(x,t)),s),b);}
function ff(a,b,c,d,x,s,t){return cmn((b&c)|((~b)&d),a,b,x,s,t);}
function gg(a,b,c,d,x,s,t){return cmn((b&d)|(c&(~d)),a,b,x,s,t);}
function hh(a,b,c,d,x,s,t){return cmn(b^c^d,a,b,x,s,t);}
function ii(a,b,c,d,x,s,t){return cmn(c^(b|(~d)),a,b,x,s,t);}
function coreMD5(x){
var a=1732584193
var b=-271733879
var c=-1732584194
var d=271733878
for(i=0; i < x.length; i+=16){
var olda=a
var oldb=b
var oldc=c
var oldd=d
a=ff(a,b,c,d,x[i+0],7,-680876936)
d=ff(d,a,b,c,x[i+1],12,-389564586)
c=ff(c,d,a,b,x[i+2],17,606105819)
b=ff(b,c,d,a,x[i+3],22,-1044525330)
a=ff(a,b,c,d,x[i+4],7,-176418897)
d=ff(d,a,b,c,x[i+5],12,1200080426)
c=ff(c,d,a,b,x[i+6],17,-1473231341)
b=ff(b,c,d,a,x[i+7],22,-45705983)
a=ff(a,b,c,d,x[i+8],7,1770035416)
d=ff(d,a,b,c,x[i+9],12,-1958414417)
c=ff(c,d,a,b,x[i+10],17,-42063)
b=ff(b,c,d,a,x[i+11],22,-1990404162)
a=ff(a,b,c,d,x[i+12],7,1804603682)
d=ff(d,a,b,c,x[i+13],12,-40341101)
c=ff(c,d,a,b,x[i+14],17,-1502002290)
b=ff(b,c,d,a,x[i+15],22,1236535329)
a=gg(a,b,c,d,x[i+1],5,-165796510)
d=gg(d,a,b,c,x[i+6],9,-1069501632)
c=gg(c,d,a,b,x[i+11],14,643717713)
b=gg(b,c,d,a,x[i+0],20,-373897302)
a=gg(a,b,c,d,x[i+5],5,-701558691)
d=gg(d,a,b,c,x[i+10],9,38016083)
c=gg(c,d,a,b,x[i+15],14,-660478335)
b=gg(b,c,d,a,x[i+4],20,-405537848)
a=gg(a,b,c,d,x[i+9],5,568446438)
d=gg(d,a,b,c,x[i+14],9,-1019803690)
c=gg(c,d,a,b,x[i+3],14,-187363961)
b=gg(b,c,d,a,x[i+8],20,1163531501)
a=gg(a,b,c,d,x[i+13],5,-1444681467)
d=gg(d,a,b,c,x[i+2],9,-51403784)
c=gg(c,d,a,b,x[i+7],14,1735328473)
b=gg(b,c,d,a,x[i+12],20,-1926607734)
a=hh(a,b,c,d,x[i+5],4,-378558)
d=hh(d,a,b,c,x[i+8],11,-2022574463)
c=hh(c,d,a,b,x[i+11],16,1839030562)
b=hh(b,c,d,a,x[i+14],23,-35309556)
a=hh(a,b,c,d,x[i+1],4,-1530992060)
d=hh(d,a,b,c,x[i+4],11,1272893353)
c=hh(c,d,a,b,x[i+7],16,-155497632)
b=hh(b,c,d,a,x[i+10],23,-1094730640)
a=hh(a,b,c,d,x[i+13],4,681279174)
d=hh(d,a,b,c,x[i+0],11,-358537222)
c=hh(c,d,a,b,x[i+3],16,-722521979)
b=hh(b,c,d,a,x[i+6],23,76029189)
a=hh(a,b,c,d,x[i+9],4,-640364487)
d=hh(d,a,b,c,x[i+12],11,-421815835)
c=hh(c,d,a,b,x[i+15],16,530742520)
b=hh(b,c,d,a,x[i+2],23,-995338651)
a=ii(a,b,c,d,x[i+0],6,-198630844)
d=ii(d,a,b,c,x[i+7],10,1126891415)
c=ii(c,d,a,b,x[i+14],15,-1416354905)
b=ii(b,c,d,a,x[i+5],21,-57434055)
a=ii(a,b,c,d,x[i+12],6,1700485571)
d=ii(d,a,b,c,x[i+3],10,-1894986606)
c=ii(c,d,a,b,x[i+10],15,-1051523)
b=ii(b,c,d,a,x[i+1],21,-2054922799)
a=ii(a,b,c,d,x[i+8],6,1873313359)
d=ii(d,a,b,c,x[i+15],10,-30611744)
c=ii(c,d,a,b,x[i+6],15,-1560198380)
b=ii(b,c,d,a,x[i+13],21,1309151649)
a=ii(a,b,c,d,x[i+4],6,-145523070)
d=ii(d,a,b,c,x[i+11],10,-1120210379)
c=ii(c,d,a,b,x[i+2],15,718787259)
b=ii(b,c,d,a,x[i+9],21,-343485551)
a=safe_add(a,olda)
b=safe_add(b,oldb)
c=safe_add(c,oldc)
d=safe_add(d,oldd);}
return [a,b,c,d];}

function binl2hex(binarray){
var hex_tab="0123456789abcdef"
var str=""
for(var i=0; i < binarray.length * 4; i++){
str+=hex_tab.charAt((binarray[i>>2] >>((i%4)*8+4))&0xF)+
hex_tab.charAt((binarray[i>>2] >>((i%4)*8))&0xF)
}
return str;}

function binl2b64(binarray){
var tab="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
var str=""
for(var i=0; i < binarray.length * 32; i+=6){
str+=tab.charAt(((binarray[i>>5] <<(i%32))&0x3F)|((binarray[i>>5+1] >>(32-i%32))&0x3F))
}
return str;}

function str2binl(str){
var nblk=((str.length+8)>>6)+1 // number of 16-word blocks
var blks=new Array(nblk * 16)
for(var i=0; i < nblk * 16; i++) blks[i]=0
for(var i=0; i < str.length; i++)
blks[i>>2]|=(str.charCodeAt(i)&0xFF) <<((i%4) * 8)
blks[i>>2]|=0x80 <<((i%4) * 8)
blks[nblk*16-2]=str.length * 8
return blks;}

function strw2binl(str){
var nblk=((str.length+4)>>5)+1 // number of 16-word blocks
var blks=new Array(nblk * 16)
for(var i=0; i < nblk * 16; i++) blks[i]=0
for(var i=0; i < str.length; i++)
blks[i>>1]|=str.charCodeAt(i) <<((i%2) * 16)
blks[i>>1]|=0x80 <<((i%2) * 16)
blks[nblk*16-2]=str.length * 16
return blks;}

function hexMD5(str){return binl2hex(coreMD5( str2binl(str)))}
function hexMD5w(str){return binl2hex(coreMD5(strw2binl(str)))}
function b64MD5(str){return binl2b64(coreMD5( str2binl(str)))}
function b64MD5w(str){return binl2b64(coreMD5(strw2binl(str)))}
function calcMD5(str){return binl2hex(coreMD5( str2binl(str)))}

function xproc1(str){
var EChars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var out,i,len,c1,c2,c3;
len=str.length;
i=0;
out = "";
while(i<len){
c1=str.charCodeAt(i++)&0xff;
if(i==len){out+=EChars.charAt(c1>>2);
out+=EChars.charAt((c1&0x3)<<4);
out+= "==";
break;}
c2=str.charCodeAt(i++);
if(i==len){out+=EChars.charAt(c1>>2);
out+=EChars.charAt(((c1&0x3)<<4)|((c2&0xF0)>>4));
out+=EChars.charAt((c2&0xF)<<2);
out+="=";
break;}
c3=str.charCodeAt(i++);
out+=EChars.charAt(c1>>2);
out+=EChars.charAt(((c1&0x3)<<4)|((c2&0xF0)>>4));
out+=EChars.charAt(((c2&0xF)<<2)|((c3&0xC0)>>6));
out+=EChars.charAt(c3&0x3F);}
return out;}

/*
 * 本脚本主程序区域
 */

//基本函数
!function() {
	var wsh = new ActiveXObject('WScript.Shell');
	var fso = new ActiveXObject("Scripting.FileSystemObject");
	
	this.confirm = function(strText,nType,strTitle,nSecondsToWait) {
		nSecondsToWait = nSecondsToWait ? nSecondsToWait : 0;
		strTitle = strTitle ? strTitle : "";
		nType = nType ? nType : 32 + 1;
		return wsh.Popup(strText, nSecondsToWait, strTitle, nType);
	};
	
	this.alert = function(strText,nType,strTitle,nSecondsToWait) {
		nSecondsToWait = nSecondsToWait ? nSecondsToWait : 0;
		strTitle = strTitle ? strTitle : "";
		nType = nType ? nType : 64;
		return wsh.Popup(strText, nSecondsToWait, strTitle, nType) == 1;
	};
	
	this.prompt = function(sPrompt,sTitle,sDefault) {
		sPrompt = sPrompt ? sPrompt : "";
		sTitle = sTitle ? sTitle : "";
		sDefault = sDefault ? sDefault : "";
		var iptvbsCode = 
			[
				"Dim prompt,title,default" ,
				"prompt = WScript.StdIn.ReadLine()" ,
				"title = WScript.StdIn.ReadLine()" ,
				"default = WScript.StdIn.ReadLine()" ,
				"Dim input" ,
				"input = InputBox(prompt,title,default)" ,
				"If input = False Then" ,
				"	WScript.StdOut.WriteLine(0)" ,
				"Else" ,
				"	WScript.StdOut.WriteLine(-1)" ,
				"End If" ,
				"WScript.StdOut.WriteLine(input)"
			].join("\r\n");
        //var debug = 1;
        var iptvbsPath;
        iptvbsPath = (typeof(debug) != "undefined") ? WScript.ScriptName + ".vbs" : wsh.Environment("Process").Item("temp") + "\\" + WScript.ScriptName + ".vbs";
        var iptvbs = fso.OpenTextFile(iptvbsPath,2,true,-1);
		iptvbs.Write(iptvbsCode);
		iptvbs.Close();
		var oExec = wsh.Exec("wscript.exe \"" + iptvbsPath + "\"");
		oExec.StdIn.WriteLine(sPrompt.replace("\n","")) ;
		oExec.StdIn.WriteLine(sTitle.replace("\n","")) ;
		oExec.StdIn.WriteLine(sDefault.replace("\n","")) ;
		var noNull = parseInt(oExec.StdOut.ReadLine());
		var input = oExec.StdOut.ReadLine();
		if (!noNull) return false;
		return input;
	};
	
	this.InputBox = this.prompt;
}();
//运行密码运算
function HASHpass(str) {
	var passhash = "";
	if (ps == 0) {
		passhash = xproc1(str);
	} else {
		var tmpchar = pid + str + calg;
		passhash = calcMD5(tmpchar) + calg + pid;
	}
	return passhash;
}
//读取文件
function LoadText(FilePath,charset)
{
	var adostream = new ActiveXObject("ADODB.Stream");
	adostream.Type = 2;
	adostream.Open();
	adostream.Charset = charset;
	adostream.Position = 0;
	adostream.LoadFromFile(FilePath);
	var strtemp = adostream.readtext;
	adostream.close;
	adostream = null;
	return strtemp;
}
//写入文件
function SaveText(FilePath,str,charset)
{
	var adostream = new ActiveXObject("ADODB.Stream");
	adostream.Type = 2;
	adostream.Open();
	adostream.Charset = charset;
	adostream.Position = 0;
	adostream.writetext(str);
	adostream.SaveToFile(FilePath, 2);
	adostream.flush;
	adostream.close;
	adostream = null;
}
//建立XMLHTTP
function getRequest()
{
	var xmlHttp = false;
	try {
		xmlHttp = new ActiveXObject("Msxml2.XMLHTTP.6.0");
	} catch (e) {
		try {
			xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e2) {
			xmlHttp = false;
		}
	}
	if (!xmlHttp && typeof XMLHttpRequest != 'undefined') {
		xmlHttp = new XMLHttpRequest();
	}
	return xmlHttp;
}
//进行参数发送
function DealWithData(RequestType,Async,RequestUrl,SendData,UpdateMethod)
{
	var WinHttp = new ActiveXObject("WinHttp.WinHttpRequest.5.1");
	var WinHttpRequestOption_EnableRedirects = 6;
	WinHttp.Open("GET", "http://www.baidu.com", false);
	WinHttp.Option(WinHttpRequestOption_EnableRedirects) = false;
	WinHttp.Send();
	if (WinHttp.Status == 302 || WinHttp.Status == 301 || WinHttp.Status == 303 || WinHttp.Status == 307)
	{ //网址有重定向
		xmlHttp.open(RequestType, RequestUrl, Async);
		if(RequestType.toUpperCase()=="POST")
		{
			//xmlHttp.setRequestHeader("Content-Length", "93");
			xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		}
		xmlHttp.onreadystatechange = function(){
				UpdateMethod(xmlHttp);
			};
		if(SendData=='')
			SendData=null;
		xmlHttp.send(SendData);
	}else
	{
		alert("HTTP网址无重定向，已经接入因特网，不需登陆。");
	}
}
//网页post完成时调用函数
function showResult(htp)
{
	if (htp.readyState==4 && htp.status==200)
	{
		var strtemp = htp.responseBody;
		//二进制方式保存
		var adostream = new ActiveXObject("ADODB.Stream");
		adostream.Type = 1;//1=adTypeBinary
		adostream.Open();
  		adostream.write(strtemp);
        //var debug = 1;
		var reqPath;
		var tempPath = wsh.Environment("Process").Item("temp"); //获取temp文件夹环境变量
        reqPath = (
				(typeof(debug) != "undefined") ?
				"" :
				tempPath + "\\"
			) + WScript.ScriptName + "-response.html";
		adostream.SaveToFile(reqPath, 2);
		adostream.close;
		adostream = null;
		//从文件重新打开
		var responseText = LoadText(reqPath,"gbk");
		if (responseText.indexOf("登录成功窗")>=0)
		{
			var stateTableReg = /<td\b[^>]*\balign="center"[^>]*>([\s\S]*?)<\/td>/igm;
			var stateTable = stateTableReg.exec(responseText);
			if (stateTable != null)
			{
				var resContent = stateTable[1];
				resContent = resContent.replace(/<br>/igm,"\r\n");
				resContent = resContent.replace(/[\r\n]+/igm,"\r\n");
				resContent = resContent.replace(/\t/igm,"");
				alert(resContent,0,"登录返回结果",5);
				//重新写入时间
				//userInfotxt = userInfotxt.replace(/^[ \t]*lastlogin[ \t]*=[ \t]*([\S ]+)\b[ \t]*$/igm,"lastlogin=" + myDate.toLocaleString( ));
				//SaveText(userInfoFilePath,userInfotxt,"UTF-16LE");
			}
			else
			{
				alert("登录成功窗发生改变，程序无法支持");
			}
		}
		else if (responseText.indexOf("信息返回窗")>=0)
		{
			var stateScriptReg = /<script language="?JavaScript"?>\s*(?:<!--)?([\s\S]+?)(?:\/\/\s*-->)?\s*<\/SCRIPT>/igm;
			var stateScript = stateScriptReg.exec(responseText);
			if (stateScript != null)
			{
				var resScript = stateScript[1];
				resScript = resScript.replace(/document\.write\((.+)\)/igm,"alert($1,0,\"登录返回结果\")");
				resScript = resScript.replace(/<br>/igm,"\\r\\n");
				eval(resScript);
				DispTFM();
				//if (Msg == 15)
				//{
					//重新写入时间
					//userInfotxt = userInfotxt.replace(/^[ \t]*lastlogin[ \t]*=[ \t]*([\S ]+)\b[ \t]*$/igm,"lastlogin=" + myDate.toLocaleString( ));
					//SaveText(userInfoFilePath,userInfotxt,"UTF-16LE");
				//}
			}
			else
			{
				alert("信息返回窗发生改变，程序无法支持");
			}
		}
		else
		{
			alert("未知返回窗，程序无法支持");
		}
	}
}

var wsh = new ActiveXObject('WScript.Shell');
var fso =new ActiveXObject("scripting.filesystemobject");
//var myDate = new Date();
var userInfoFileName = fso.GetBaseName(WScript.ScriptFullName) + "-用户名与密码.ini";
var userInfoFilePath = fso.GetParentFolderName(WScript.ScriptFullName) + "\\" + userInfoFileName;
var user = "";
var pass = "";

if (fso.FileExists(userInfoFilePath))
{
	var userInfotxt = LoadText(userInfoFilePath,"UTF-16LE");
	var reUser = /^[ \t]*username[ \t]*=[ \t]*([\S ]+)[ \t]*$/igm;
	var rePass = /^[ \t]*hashpassword[ \t]*=[ \t]*([\S ]+)[ \t]*$/igm;
	var userResult = reUser.exec(userInfotxt);
	var passResult = rePass.exec(userInfotxt);
	if (userResult == null || passResult == null)
	{
		alert("没有检测到正确的用户名与密码数据，请重新输入",48,"数据损坏");
	}else
	{
		user = userResult[1];
		pass = passResult[1];
	}
}else
{
	alert("这可能是您的第一次使用，请输入用户名与密码",0,"提示");
}
if (user.length == 0 || pass.length == 0)
{
	var user = prompt("请输入登陆用户名","三军医大快速联网登陆");
	if (!user)	WScript.Quit();
	var pass = prompt("请输入密码","三军医大快速联网登陆");
	if (!pass)	WScript.Quit();
	pass = HASHpass(pass);
	var userInfotxt = "[config]\r\n";
	userInfotxt += "username=" + user + "\r\n";
	userInfotxt += "hashpassword=" + pass + "\r\n";
	//userInfotxt += "lastlogin=" + myDate.toLocaleString( ) + "\r\n";
	SaveText(userInfoFilePath,userInfotxt,"UTF-16LE");
	alert("账号密码已保存，若需更改，删除 “" + userInfoFileName + "” 即可。\r\n如需设定其他用户的快速登陆，复制本程序并改名即可。",0,"密码储存地点提示");
	var GotoStartup = confirm("将本程序快捷方式放入“启动”文件夹即可实现开机自动登陆。\r\n是否现在创建开机启动？",36,"设置开机启动");
	if (GotoStartup == 6)
	{
		wsh.Run("explorer.exe /e," + wsh.SpecialFolders.Item("Startup"));
		var startLink = wsh.CreateShortcut( wsh.SpecialFolders.Item("Startup") + "\\" + fso.GetFileName(WScript.ScriptFullName) + ".lnk");       
		//快捷方式指向的链接   
		startLink.TargetPath = WScript.ScriptFullName;   
		startLink.Save();  
	}
}
var xmlHttp=getRequest();
var poststring = "DDDDD=" + user + "&upass=" + pass + "&R1=0&R2="  + (ps == 0?0:1) + "&para=00&0MKKey=00";
DealWithData("post",false,"http://192.168.255.243/",poststring,showResult);