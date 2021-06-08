// 云函数入口文件
//添加云函数
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'ticecey-7gph1v5886b143e7'
})

const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  return db.collection('image').get()
}