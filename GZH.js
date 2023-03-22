let api = 'https://pay.szzkc.com/PMasterAPI/api/Pay';
let search = window.location.search;
let obj = strUrlObj(search.substr(search.indexOf('?') + 1));
let ua = window.navigator.userAgent;

(_ => {
	console.log(location.href);
	console.log(location.href.substr(0,location.href.indexOf('code') - 1));
	if (!/MicroMessenger/.test(ua)){
		alert('请用微信扫码打开！');
		return
	}
	if (obj.code == '' || obj.code == undefined) {
		WXAuthorizeCode(location.href);
		return;
	}
	// alert(JSON.stringify(obj));
	let xmlhttpdata = '';
	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = _ => {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			console.log(xmlhttp.responseText);
			xmlhttpdata = xmlhttp.responseText;
		}
	}
	xmlhttp.open('GET', `${api}/GetGHZOpenid?PCode=${obj.code}`, false);
	xmlhttp.send();
	let httpdata = '';
	let response = new XMLHttpRequest();
	response.onreadystatechange = _ => {
		if (response.readyState == 4 && response.status == 200) {
			console.log(response.responseText);
		}
	}
	response.open('GET', `https://pay.szzkc.com/PMasterAPI/api/PMaster/SaveGZHCOpenid?GZHOpenid=${xmlhttpdata}&UnionID=${obj.unionid}&carNo=${obj.carNo}`, true);
	response.send();
	location.href = "https://mp.weixin.qq.com/s/rfh9THRWz780-4zBI8mtcw";
})()

function WXAuthorizeCode(href){
	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = _ => {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			console.log(xmlhttp.responseText);
			location.href = xmlhttp.responseText;
		} else {
			location.href = "https://mp.weixin.qq.com/s/rfh9THRWz780-4zBI8mtcw";
		}
	}
	xmlhttp.open('GET', `${api}/WXAuthorizeCode?url=${encodeURIComponent(href)}`, false);
	xmlhttp.send();
}

// 把 url 字符串转为对象
function strUrlObj(string) {
	// 获取去掉字符串中的 & 符号的数组
	let strArray = string.split('&');

	let obj = {};

	for (let i = 0; i < strArray.length; i++) {
		// 定义一个新的数组来接收去掉字符串中的 = 符号的数组
		let newArray = strArray[i].split('=');

		// 然后遍历添加每个数组中对应的添加到对象中
		obj[newArray[0]] = newArray[1];
	}

	return obj;
}

// 把对象转为 url 字符串
function objUrlStr(obj) {
	// 定义一个新的字符串
	let newStr = '';

	// 遍历对象里面的数据
	for (let key in obj) {
		newStr += key + '=' + obj[key] + '&';
	}

	// 记得去掉最后一个 & 符号
	newStr = newStr.substr(0,newStr.length - 1);
	return newStr;
}