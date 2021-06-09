// 云函数入口文件
const cloud = require('wx-server-sdk')

//在这里初始化一个东西
//大概是一个什么环境叭
cloud.init({
  env: 'ticecey-7gph1v5886b143e7'
})

const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  await db.collection('user').where({
      _openid: wxContext.OPENID
    }).update({
    data: {
      stu_no: event.stu_no
    }
  })
}


//                              _ooOoo_
//                             o8888888o
//                             88" . "88
//                             (| -_- |)
//                              O\ = /O
//                          ____/`---'\____
//                        .   ' \\| |// `.
//                         / \\||| : |||// \
//                       / _||||| -:- |||||- \
//                         | | \\\ - /// | |
//                       | \_| ''\---/'' | |
//                        \ .-\__ `-` ___/-. /
//                     ___`. .' /--.--\ `. . __
//                  ."" '< `.___\_<|>_/___.' >'"".
//                 | | : `- \`.;`\ _ /`;.`/ - ` : | |
//                   \ \ `-. \_ __\ /__ _/ .-` / /
//           ======`-.____`-.___\_____/___.-`____.-'======
//                              `=---='
//
//           .............................................
//                    佛祖镇楼                 BUG辟易