//显示提示
!function() {
	var wsh = new ActiveXObject('WScript.Shell');
	var fso = new ActiveXObject("Scripting.FileSystemObject");
	
	this.confirm = function(strText,nType,strTitle,nSecondsToWait) {
		nSecondsToWait = nSecondsToWait ? nSecondsToWait : 0;
		strTitle = strTitle ? strTitle : "";
		nType = nType ? nType : 32 + 1;
		return wsh.Popup(strText, nSecondsToWait, strTitle, nType) == 1;
	};
	
	this.alert = function(strText,nType,strTitle,nSecondsToWait) {
		nSecondsToWait = nSecondsToWait ? nSecondsToWait : 0;
		strTitle = strTitle ? strTitle : "";
		nType = nType ? nType : 64;
		return wsh.Popup(strText, nSecondsToWait, strTitle, nType) == 1;
	};
	
	this.MsgBox = this.alert;
	
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
	xmlHttp.open(RequestType, RequestUrl,Async);
	if(RequestType.toUpperCase()=="POST")
	{
		xmlHttp.setRequestHeader("Content-Length", "93");
		xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	}
	xmlHttp.onreadystatechange = function(){
			UpdateMethod(xmlHttp);
		};
	if(SendData=='')
		SendData=null;
	xmlHttp.send(SendData);
}
//网页post完成时调用函数
function showResult()
{
	if (xmlHttp.readyState==4 && xmlHttp.status==200)
	{
		var strtemp = xmlHttp.responseBody;
		//二进制方式保存
		var adostream = new ActiveXObject("ADODB.Stream");
		adostream.Type = 1;//1=adTypeBinary
		adostream.Open();
  		adostream.write(strtemp);
        //var debug = 1;
        var reqPath;
        reqPath = (typeof(debug) != "undefined") ? WScript.ScriptName + "-response.html" : wsh.Environment("Process").Item("temp") + "\\" + WScript.ScriptName + "-response.html";
		adostream.SaveToFile(reqPath, 2);
		adostream.close;
		adostream = null;
		//从文件重新打开
		var responseText = LoadText(reqPath,"gbk");
		var stateScriptReg = /<script language="?JavaScript"?>\s*(?:<!--)?([\s\S]+?)(?:\/\/\s*-->)?\s*<\/SCRIPT>/igm;
		var stateScript = stateScriptReg.exec(responseText);
		if (stateScript != null)
		{
			var resScript = stateScript[1];
			resScript = resScript.replace(/document\.write\((.*注销成功.*)\)/igm,"alert($1,0,\"注销返回结果\",5)");
			resScript = resScript.replace(/document\.write\((.+)\)/igm,"alert($1,0,\"注销返回结果\",5)");
			resScript = resScript.replace(/<br>/igm,"\\r\\n");
			resScript = resScript.replace(/<p>[\s\D]*?<\/p>/igm,"\\r\\n");
			eval(resScript);
			DispTFM();
			if (Msg == 15)
			{
				//重新写入时间
				userInfotxt = userInfotxt.replace(/^[ \t]*lastlogin[ \t]*=[ \t]*([\S ]+)\b[ \t]*$/igm,"lastlogin=" + myDate.toLocaleString( ));
				SaveText(userInfoFilePath,userInfotxt,"UTF-16LE");
			}
		}
		else
		{
			aler("注销页面发生改变，程序无法支持");
		}
	}
}

var wsh = new ActiveXObject('WScript.Shell');
var fso =new ActiveXObject("scripting.filesystemobject");
var xmlHttp=getRequest();
DealWithData("get",false,"http://192.168.255.243/F.htm",null,showResult);