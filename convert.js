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

function FormatDateTime(DateTime) {
  let now;
  if (DateTime) {
    now = new Date(DateTime);
  } else {
    now = new Date();
  }
  let year = now.getFullYear(); // 得到年份
  let month = now.getMonth() + 1; // 得到月份
  let date = now.getDate(); // 得到日期
  let hour = now.getHours(); // 得到小时
  let minute = now.getMinutes(); // 得到小时
  let second = now.getSeconds(); // 得到小时
  let time = year + '-' + addZero(month) + '-' + addZero(date) + ' ' + addZero(hour) + ':' + addZero(minute) + ':' + addZero(second); // (格式化“YYYY-MM-DD hh:mm:ss”)
  return time;
}

function addZero(num) {
  return num < 10?'0' + num:num;
}

function compareVersion(v1,v2) {	// 对比版本
	console.log(v1,v2);
	v1 = v1.split('.');
	v2 = v2.split('.');
	const len = Math.max(v1.length,v2.length);
	while (v1.length < len) {
		v1.push("0");
	}

	while (v2.length < len) {
		v2.push("0");
	}

	for (let i = 0; i < len; i++) {
		const num1 = parseInt(v1[i]);
		const num2 = parseInt(v2[i]);
		console.log(num1,num2);
		if (num1 > num2) {	// v1版本大于v2版本
			return 1;
		} else if (num1 < num2) {	// v1版本小于v2版本
			return -1;
		}
	}
	
	return 0;	// v1版本等于v2版本
}

function getOsVersion() {
	let u = navigator.userAgent, version = ''
	if (u.indexOf('Mac OS X') > -1) {
		// ios
		let regStr_saf = /OS [\d._]*/gi;
		let verinfo = u.match(regStr_saf);
		version = (verinfo + '').replace(/[^0-9|_.]/ig, '').replace(/_/ig, '.');
	} else if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
		// android
		version = u.substr(u.indexOf('Android') + 8, u.indexOf(';', u.indexOf('Android')) - u.indexOf('Android') - 8)
	} else if (u.indexOf('BB10') > -1) {
		// 黑莓bb10系统
		version = 'blackberry' + u.substr(u.indexOf('BB10') + 5, u.indexOf(';', u.indexOf('BB10')) - u.indexOf('BB10') - 5)
	} else if (u.indexOf('IEMobile') > -1) {
		// windows phone
		version = 'winphone' + u.substr(u.indexOf('IEMobile') + 9, u.indexOf(';', u.indexOf('IEMobile')) - u.indexOf('IEMobile') - 9)
	} else {
		let userAgent = navigator.userAgent.toLowerCase()
		if (userAgent.indexOf('windows nt 5.0') > -1) {
			version = 'Windows 2000';
		} else if (userAgent.indexOf('windows nt 5.1') > -1 || userAgent.indexOf('windows nt 5.2') > -1) {
			version = 'Windows XP';
		} else if (userAgent.indexOf('windows nt 6.0') > -1) {
			version = 'Windows Vista';
		} else if (userAgent.indexOf('windows nt 6.1') > -1 || userAgent.indexOf('windows 7') > -1) {
			version = 'Windows 7';
		} else if (userAgent.indexOf('windows nt 6.2') > -1 || userAgent.indexOf('windows 8') > -1) {
			version = 'Windows 8';
		} else if (userAgent.indexOf('windows nt 6.3') > -1) {
			version = 'Windows 8.1';
		} else if (userAgent.indexOf('windows nt 6.2') > -1 || userAgent.indexOf('windows nt 10.0') > -1) {
			version = 'Windows 10';
		} else {
			version = 'Unknown';
		}
	}
	return version;
}