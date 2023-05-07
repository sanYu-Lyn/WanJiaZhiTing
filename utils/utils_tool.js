const isEmpty = text => {
  return text == null || text.length == 0;
}

const generateTarget = type => {
  switch (type) {
    case 1:
      return {
        'to': 'bind_to_pay'
      };
    case 2:
      return {
        'to': 'bind_to_rent'
      }
  }
}

const checkPhone = phone => {
  return /^1[3456789]\d{9}$/.test(phone)
}

const encriptPhone = phone => {
  if (phone == undefined || phone.length == 0) {
    return "";
  }
  var length = phone.length;
  if (length >= 3 + 4) {
    return phone.substring(0, 3) + "****" + phone.substring(length - 4, length);
  } else {
    return phone;
  }
}

const getUrlParam = (url, name) => {
  var reg = new RegExp("(^|&?)" + name + "=([^&]*)(&|$)");
  var r = url.substr(26).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

const diffDays = (start, end) => {
  var etime = Date.parse(end);
  var stime = Date.parse(start);
  var usedTime = etime - stime; //两个时间戳相差的毫秒数
  var days = Math.floor(usedTime / (24 * 3600 * 1000)) + 1;
  return days
}


const nextDate = (date, day) => {
  var dd = new Date(date);
  dd.setDate(dd.getDate() + day);
  var y = dd.getFullYear();
  var m = dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
  var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
  return y + "-" + m + "-" + d;
};

const provinceMap = province => {
  if (province == "北京市")
    return "京";
  else if (province == "天津市")
    return "津";
  else if (province == "重庆市")
    return "渝";
  else if (province == "上海市")
    return "沪";
  else if (province == "河北省")
    return "冀";
  else if (province == "山西省")
    return "晋";
  else if (province == "辽宁省")
    return "辽";
  else if (province == "吉林省")
    return "吉";
  else if (province == "黑龙江省")
    return "黑";
  else if (province == "江苏省")
    return "苏";
  else if (province == "浙江省")
    return "浙";
  else if (province == "安徽省")
    return "皖";
  else if (province == "福建省")
    return "闽";
  else if (province == "江西省")
    return "赣";
  else if (province == "山东省")
    return "鲁";
  else if (province == "河南省")
    return "豫";
  else if (province == "湖北省")
    return "鄂";
  else if (province == "湖南省")
    return "湘";
  else if (province == "广东省")
    return "粤";
  else if (province == "海南省")
    return "琼";
  else if (province == "四川省")
    return "川/蜀";
  else if (province == "贵州省")
    return "黔/贵";
  else if (province == "云南省")
    return "云/滇";
  else if (province == "陕西省")
    return "陕/秦";
  else if (province == "甘肃省")
    return "甘/陇";
  else if (province == "青海省")
    return "青";
  else if (province == "台湾省")
    return "台";
  else if (province == "内蒙古自治区")
    return "内蒙古";
  else if (province == "广西壮族自治区")
    return "桂";
  else if (province == "宁夏回族自治区")
    return "宁";
  else if (province == "新疆维吾尔自治区 ")
    return "新";
  else if (province == "西藏自治区")
    return "藏";
  else if (province == "香港特别行政区")
    return "港";
  else if (province == "澳门特别行政区")
    return "澳";
  return null
}

const getScale = mapScale => {
  switch (mapScale) {
    case 20:
    case 19:
    case 18:
      return 0.05;
    case 17:
    case 16:
    case 15:
      return 0.2;
    case 14:
    case 13:
    case 12:
      return 1;
    case 11:
    case 10:
    case 9:
      return 1.5;
    case 8:
    case 7:
    case 6:
      return 2;
    case 5:
    case 4:
    case 3:
    case 2:
    case 1:
    default:
      return 3
  }
}


exports.isEmpty = isEmpty;
exports.generateTarget = generateTarget;
exports.checkPhone = checkPhone
exports.encriptPhone = encriptPhone
exports.provinceMap = provinceMap;
exports.getUrlParam = getUrlParam
exports.getScale = getScale;
exports.diffDays = diffDays;
exports.nextDate = nextDate;