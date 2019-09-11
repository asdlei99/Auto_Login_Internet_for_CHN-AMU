const softname = "三军医大快速联网登陆";
process.title = softname;

const fs = require('fs'); //文件操作
const path = require('path'); //路径
const crypto = require('crypto'); //HASH加密
const http = require("http"); //网络获取
const querystring = require("querystring"); //post代码格式化
const iconv = require("iconv-lite"); //读取GBK依赖项，第三方模块
const stdin=process.stdin;
const stdout=process.stdout;

var ScriptFullName = process.argv[1]; //本脚本路径
var ScriptParseName = path.parse(ScriptFullName); //本脚本路径分解
var userInfoFileName = ScriptParseName.name + "-用户名与密码.json"; //储存用户名密码的文件名
var userInfoFilePath = ScriptParseName.dir + path.sep + userInfoFileName; //该文件的具体路径
const waitS = 5;
const ps=1,pid='1',calg='12345678';

var Account = function(user,pass){
	this.username = user || null;
	this.hashpassword = pass || null;
};
Account.prototype.newAccount = function(callback)
{
	let _this = this;
	stdin.setEncoding('utf8');
	stdout.write("请输入登陆用户名:\n");
	stdin.on('data',(input)=>{
		if(typeof input === 'string')
		{
			input = input.toString().replace(/[\r\n]/g,""); //不同系统下去掉最后的回车
		}
		if(!_this.username)
		{ //没有用户名
			if(input.length>0){
				stdout.write("请输入登陆密码:\n");
				_this.username=input;
			}
			else 
			{
				stdout.write("用户名不能为空，请重新输入:\n");
			}
		}else if(!_this.hashpassword)
		{ //没有密码
			if(input.length>0){
				_this.hashpassword = HASHpass(input);
				//console.log("本账户为：",_this);
				if (callback) callback(_this);
				stdin.emit('end');
			}
			else{
				stdout.write("密码不能为空，请重新输入:\n");
			}
			
		}
	});
}
Account.prototype.login = function()
{
	http.get('http://www.taobao.com', (getres) => {
		//console.log(getres.statusCode,getres.headers)
		if (getres.statusCode == 302 && getres.headers.server.indexOf('DrcomServer')>=0)
		{ //网址有重定向到登录页
			getres.resume();
			var postData=querystring.stringify({
				"DDDDD":this.username,
				"upass":this.hashpassword,
				"R1":0,
				"R2":1,
				"para":00,
				"0MKKey":123456
			});
			var options={
				hostname:"192.168.255.243",
				port:80,
				path:"/0.htm",
				method:"POST",
				headers:{
					"Cache-Control": "no-cache",
					"Pragma": "no-cache",
					"Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,*\/*;q=0.8",
					"Accept-Encoding":"gzip, deflate",
					"Accept-Language":"zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2",
					"Connection":"keep-alive",
					"Content-Length":Buffer.byteLength(postData),
					"Content-Type":"application/x-www-form-urlencoded",
					"Host":"192.168.255.243",
					"Referer":"http://192.168.255.243/0.htm",
					"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:69.0) Gecko/20100101 Firefox/69.0",
				}
			}
			var req=http.request(options,(res)=>{
				//let out = fs.createWriteStream("test.html");
				res.on("data",(chunk)=>{
					//out.write(chunk, function () {});
					chunk = iconv.decode(chunk, 'GBK');
					if (chunk.indexOf("登录成功窗")>=0)
					{
						process.title = softname + "-登陆成功";
						var stateTableReg = /<td\b[^>]*\balign="center"[^>]*>([\s\S]*?)<\/td>/igm;
						var stateTable = stateTableReg.exec(chunk);
						if (stateTable != null)
						{
							var resContent = stateTable[1];
							resContent = resContent.replace(/<br>/igm,"\r\n");
							resContent = resContent.replace(/[\r\n]+/igm,"\r\n");
							resContent = resContent.replace(/\t/igm,"");
							console.log("\x1b[92m" + resContent + "\x1B[0m");
							console.log(`\n\x1B[93m${waitS} 秒后自动退出。\x1B[0m`);
							setTimeout(function() {
								process.exit();
							}, waitS*1000);
						}
						else
						{
							console.log("登录成功窗发生改变，程序无法支持");
							return;
						}
					}else if (chunk.indexOf("信息返回窗")>=0)
					{
						process.title = softname + "-登陆失败";
						var stateScriptReg = /<script language="?JavaScript"?>\s*(?:<!--)?([\s\S]+?)(?:\/\/\s*-->)?\s*<\/SCRIPT>/igm;
						var stateScript = stateScriptReg.exec(chunk);
						if (stateScript != null)
						{
							console.log("登录返回信息：");
							var resScript = stateScript[1];
							resScript = resScript.replace(/document\.write\((.+)\)/igm,'console.log("\x1b[91m" + $1 + "\x1B[0m")');
							resScript = resScript.replace(/<br>/igm,"\\n");
							eval(resScript);
							DispTFM();
						}
						else
						{
							console.log("信息返回窗发生改变，程序无法支持");
							return;

						}
					}
					else
					{
						process.title = softname + "-登陆失败";
						console.log("未知返回窗，程序无法支持。");
						return;
					}
					console.log("\n按回车键立即退出");
					stdin.on('readable', () => {
						stdin.emit('end');
						process.exit();
						return;
					})
				});
				res.on("end",()=>{
					//out.end();
					//console.log("### end ##");
				});
			});
			
			req.on("error",function(err){
				console.log("访问登陆网页失败",err);
				console.log("\n按回车键立即退出");
				stdin.on('readable', () => {
					stdin.emit('end');
					process.exit();
					return;
				})
			})
			req.write(postData);
			req.end();
		}else
		{
			console.log(`\x1B[92m已联网，不需登陆。\x1B[0m`);
			console.log(`\n\x1B[93m${waitS} 秒后自动退出。\x1B[0m`);
			setTimeout(function() {
				process.exit();
			}, waitS*1000);
			console.log("\n按回车键立即退出");
			stdin.on('readable', () => {
				stdin.emit('end');
				process.exit();
				return;
			})
		}
	}).on('error', (e) => {
		console.log(`获取网址是否重定向失败：`,e.message);
		console.log("\n按回车键立即退出");
		stdin.on('readable', () => {
			stdin.emit('end');
			process.exit();
			return;
		})
	})
}

function calcMD5(password)
{ //计算MD5
    var md5 = crypto.createHash('md5');
    return md5.update(password).digest('hex');
}
function HASHpass(password)
{ //计算登陆用的hashpass
	let tmpchar = pid + password + calg;
	let passhash = calcMD5(tmpchar) + calg + pid;
	return passhash + calg + pid;
}
function writeNewAccount(account)
{ //保存账号密码的文件
    let outstr = JSON.stringify(account,null,"\t");
    fs.writeFileSync(userInfoFilePath,outstr);
	console.log("账号密码已保存，若需更改，删除 “" + userInfoFileName + "” 即可。");
}

var account; //储存账号
fs.readFile(userInfoFilePath,{encoding:'utf-8'}, function (err,jsonStr) {
	if (!err)
	{ //文件存在
		try{
			let json = JSON.parse(jsonStr);//将字符串转换为json对象
			account = new Account(json.username,json.hashpassword);
			account.login();
			return;
		}catch(e){
			console.log("用户名与密码数据损坏，请重新输入。",e);
		}
	}else
	{ //发生错误
		if (err.code == 'ENOENT')
		{ //文件不存在
			console.log("这可能是您的第一次使用，请输入用户名与密码");
		}else
		{ //其他错误
			console.log(err);
			return;
		}
	}
	account = new Account();
	account.newAccount(function(_account){
		writeNewAccount(_account);
		_account.login();
	});
});