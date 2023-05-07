/**
 * 申请权限
 */
const open = function (authorize, success, error) {
  return check(authorize, success, error);
}

/**
 * 查询权限
 */
const check = function (authorize, success, error) {
  wx.getSetting({
    withSubscriptions: false,
    success(res) {
      if (res.authSetting[authorize] == undefined) { //未申请过权限
        auth(authorize, success, error)
      } else if (res.authSetting[authorize]) { //有权限
        if (success) success("有权限")
      } else { //权限被拒绝
        jump(authorize, success, error)
      }
    }
  })
}

/**
 * 申请权限
 */
const auth = function (authorize, success, error) {
  wx.authorize({
    scope: authorize,
    success(res) {
      if (success) success(res)
    },
    fail(res) {
      if (error) error('auth ： ' + res.errMsg)
    }
  })
}

/**
 * 打开权限设置界面
 */
const jump = function (authorize, success, error) {
  wx.openSetting({
    withSubscriptions: true,
  })
}

module.exports = {
  open: open
}