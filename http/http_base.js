/**
 * function: 封装网络请求
 * @url URL地址
 * @params 请求参数
 * @method 请求方式：GET/POST
 * @onStart 开始请求,初始加载loading等处理
 * @onSuccess 成功回调
 * @onFailed  失败回调
 */
function request(url, needToken, params, method, onStart, onSuccess, onFailed) {
  onStart(); //request start
  wx.request({
    url: url,
    data: dealParams(params),
    method: method,
    header: dealHeaders(needToken),
    timeout: 15000,

    success: function (res) {
      console.log('========================success==================================');
      console.log(url);
      console.log(res);
      console.log('=================================================================');
      if (res.statusCode == 200) {
        if (res.data.code == 0) {
          onSuccess(res); //request success
        } else {
          onFailed(res.data);
        }
      } else {
        onFailed({
          msg: "错误： " + res.statusCode,
          code: -1
        }); //request failed
      }
    },

    fail: function (res) {
      console.log('========================error==================================');
      console.log(url);
      console.log(res);
      console.log('===============================================================');
      onFailed({
        msg: res.errMsg,
        code: -1
      }); //request failed
    }
  })
}

function upload(url, path, params, name, onStart, onSuccess, onFailed) {
  onStart(); //request start
  wx.uploadFile({
    filePath: path,
    name: name,
    url: url,
    formData: params,
    header: {
      'Authorization': getApp().globalData.userInfo ? 'Bearer ' + getApp().globalData.userInfo.token : '',
      'content-type': 'x-www-form-urlencoded',
    },
    success: function (res) {
      console.log('========================success==================================');
      console.log(url);
      console.log(res);
      console.log('=================================================================');
      if (res.statusCode == 200) {
        res.data = JSON.parse(res.data)
        if (res.data.code == 0) {
          onSuccess(res); //request success
        } else {
          onFailed(res.data);
        }
      } else {
        onFailed({
          msg: res.data,
          code: -1
        }); //request failed
      }
    },

    fail: function (res) {
      console.log('========================error==================================');
      console.log(url);
      console.log(error);
      console.log('===============================================================');
      onFailed({
        msg: res.errMsg,
        code: -1
      }); //request failed
    }
  })
}

function getImage(url, onStart, onSuccess, onFailed) {
  onStart(); //request start
  wx.request({
    url: url,
    method: "get",
    responseType: 'arraybuffer',
    success(res) {
      console.log('========================success==================================');
      console.log(url);
      console.log(res);
      console.log('=================================================================');

      if (res.statusCode == 200) {
        let url = 'data:image/jpeg;base64,' + wx.arrayBufferToBase64(res.data)
        onSuccess(url); //request success
      } else {
        onFailed({
          msg: res.errMsg,
          code: -1
        }); //request failed
      }
    },
    fail(res) {
      console.log('========================error==================================');
      console.log(url);
      console.log(error);
      console.log('===============================================================');
      onFailed({
        msg: res.errMsg,
        code: -1
      }); //request failed
    }
  })
}

/**
 * function: 根据需求处理请求参数：添加固定参数配置等
 * @params 请求参数
 */
function dealParams(params) {
  return params;
}

function dealHeaders(needToken) {
  if (!needToken) {
    return {
      'content-type': 'application/x-www-form-urlencoded'
    };
  } else {
    return {
      'content-type': 'application/x-www-form-urlencoded',
      'token': getApp().globalData.userInfo ? getApp().globalData.userInfo.token : 'InvalidToken'
    };
  }
}

module.exports = {
  request: request,
  upload: upload,
  getImage: getImage
}