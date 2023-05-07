const normal = desc => {
  setTimeout(() => {
    wx.showToast({
      title: desc,
      duration: 2000,
      icon: 'none'
    })
  }, 300)
}

const show = (desc, time) => {
  setTimeout(() => {
    wx.showToast({
      title: desc,
      duration: time,
      icon: 'none'
    })
  }, 300)
}

module.exports = {
  normal: normal,
  show: show
}