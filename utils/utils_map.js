/**
 * 
 * 根据关键词查询指定车市的POI信息
 *
 * @param {关键词} key 
 * @param {城市} city 
 * @param {成功函数} success 
 * @param {失败函数} error 
 */
const searchByKey = async function (key, city, success, error) {
  var that = this;
  const invokeRes = await wx.serviceMarket.invokeService({
    service: 'wxc1c68623b7bdea7b',
    api: 'poiSuggestion',
    data: {
      'keyword': key,
      "region": city,
    },
  }).then(res => {
    success(res.data.data)
  }).catch(err => {
    error(err)
  });
}

/**
 * 根据经纬度查询用户的POI信息
 * @param {纬度} latitude 
 * @param {经度} longitude 
 * @param {成功函数} success 
 * @param {失败函数} error 
 */
const searchByLocaton = async function (latitude, longitude, success, error) {
  var that = this;
  const invokeRes = await wx.serviceMarket.invokeService({
    service: 'wxc1c68623b7bdea7b',
    api: 'rgeoc',
    data: {
      'location': latitude + "," + longitude,
    },
  }).then(res => {
    success(res)
  }).catch(err => {
    error(err)
  });
}

exports.searchByLocaton = searchByLocaton;
exports.searchByKey = searchByKey;