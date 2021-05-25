// pages/show2/show2.js
const innerAudioContext = wx.createInnerAudioContext();

Page({
  data: {
    animation:'',
    scrollindex:0, //当前页面的索引值
    totalnum:6, //总共页面数
    starty:0, //开始的位置x
    endy:0, //结束的位置y
    critical: 100, //触发翻页的临界值
    margintop:0, //滑动下拉距离
    },
    onLoad: function () {
    },
    scrollTouchstart:function(e){
    let py = e.touches[0].pageY;
    this.setData({
    starty: py,
    endy: py
    })
    },
    scrollTouchmove:function(e){
    let py = e.touches[0].pageY;
    let d = this.data;
    this.setData({
    endy: py,
    })
    if(py-d.starty<100 && py-d.starty>-100){ 
    this.setData({
    margintop: py - d.starty
    })
    }
    },
    scrollTouchend:function(e){
    let d = this.data;
    if(d.endy-d.starty >100 && d.scrollindex>0){
    this.setData({
    scrollindex: d.scrollindex-1
    })
    }else if(d.endy-d.starty <-100 && d.scrollindex<this.data.totalnum-1){
    this.setData({
    scrollindex: d.scrollindex+1
    })
    }
    this.setData({
    starty:0,
    endy:0,
    margintop:0
    })
    },
    onShow: function() {
      console.log('index---------onShow()')
        this.animation = wx.createAnimation({
        duration: 1400,
        timingFunction: 'linear', // "linear","ease","ease-in","ease-in-out","ease-out","step-start","step-end"
        delay: 0,
        transformOrigin: '50% 50% 0',
        success: function(res) {
          console.log("res")
        }
      })
      var n = 0,
      that = this;
      this.interval = setInterval(function () {
            n++;
            that.rotateAni(n);
      }, 1400)
      
      // innerAudioContext.autoplay = true;
      // innerAudioContext.src = 'http://m10.music.126.net/20210522172358/c03632567e0be4b4e4a38d8a781a5a17/ymusic/020c/5652/075e/5fcded78c7a8df3f91e404ddbdaf226b.mp3';
      // innerAudioContext.loop = true;
      // innerAudioContext.play();
      // console.log("onshow")
},
onHide: function(){
  console.log("onhide")
  innerAudioContext.pause()
},
onUnLoad: function(){
  console.log("onUnload")
  innerAudioContext.pause()
},
  rotateAni: function (n) {
      console.log("rotate=="+n)
      this.animation.rotate(180*(n)).step()
      this.setData({
        animation: this.animation.export()
      })
},
})

/**  
  data: {
    
}) 
*/