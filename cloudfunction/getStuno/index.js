// 云函数入口文件
const cloud = require('wx-server-sdk')
//我有freestyle bug，你有吗？
//skr skr skr...

cloud.init({
  env: 'ticecey-7gph1v5886b143e7'
})

const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  return db.collection('user').where({
    _openid: wxContext.OPENID
  }).get()
  
}