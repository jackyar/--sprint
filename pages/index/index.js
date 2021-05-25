// index.js
// 获取应用实例
const app = getApp()
const db = wx.cloud.database()
const userDB = db.collection("user")

Page({
  data: {
    userInfo: {},
    showModal: false,
    inputValue: null,
    stuNo: null,
    showStuInfo: false,
    idExist: null,
    image: null,
    // 用户信息数据
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
 
  onLoad() {
    var _this = this;

    wx.cloud.callFunction({
      name: 'getStuno',
      success(res){
        console.log(res)
        _this.setData({
          stuNo: res.result.data[0].stu_no,
          inputValue: res.result.data[0].stu_no
        })
      }
    })

    // ============================== //
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  // warningHandler: function() {
  //   wx.showModal({
  //     title: '请输入学号',
  //     content: '这是一个模态弹窗',
  //     success (res) {
  //     }
  //   })
  // },

  // 扫码借书
  scanCode: function() {
    wx.scanCode({
      success (res) {
        console.log(res)
      }
    })
  },

  // =============================================//
  /**
     * 弹窗
     */
    showDialogBtn: function() {
      this.setData({
          showModal: true
      })

      // console.log(no)
    },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function() {
      return
  },
  /**
   * 隐藏模态对话框
   */
  hideModal: function() {
      this.setData({
          showModal: false,
          showStuInfo: false
      });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function() {
      this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function() {
    var _this = this
    this.hideModal()
    // console.log(this.data.inputValue)
    // console.log(this.data.stuNo)
    // 插入
    if(this.data.stuNo == null && this.data.inputValue != null){
      wx.cloud.callFunction({
        name: 'addStuno',
        data: {
          stu_no: _this.data.inputValue
        },
        success(res){
          console.log("插入数据")
          _this.setData({
            stuNo: _this.data.inputValue
          })
        }
      })
    }
    // 更新
    if(this.data.inputValue != this.data.stuNo){
      console.log("update")
      wx.cloud.callFunction({
        name: 'updateStuno',
        data: {
          stu_no: _this.data.inputValue
        },
        success(res){
          console.log("更新数据")
          _this.setData({
            stuNo: _this.data.inputValue
          })
        }
      })
    }
  },

  /**
   * 获取输入框中输入的值
   */
  inputChange:function(option){
      /* 把文本框输入的内容方到 data 里面 */
      this.setData({
          inputValue: option.detail.value
      })
  },
  // ============================================//

  /**
   * 个人信息展示模态弹窗
   */
  showStuInfoBtn: function(){
    this.setData({
      showStuInfo: true
    })
  },
  queryBtn: function(){
    // console.log(this.data.image)
    // console.log(app.globalData.imageData)
    // wx.navigateTo({
    //   url: '../show2/show2',
    //   success: function (res) {
    //     console.log("jump")
    //   }
    // })
  },

  bookInfoBtn: function(){
    // var _this = this;
    // wx.cloud.callFunction({
    //   name: "getImage",
    //   success(res){
    //     app.globalData.imageData = res.result.data
    //   }
    // })

    wx.navigateTo({
      url: '../show2/show2',
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        // res.eventChannel.emit('acceptDataFromOpenerPage', {data: 'test' })
        //触发事件
      }
    })
  }
})
// 数据库操作函数封装
