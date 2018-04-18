/**
 * bgmusci.js
 * @authors huangguanhua_gz (kiros1986@qq.com.com)
 * @date    2014-07-15 15:57:12
 * 依赖于zepto或者jquery
 * 播放背景音乐
 */


(function(){
  // Browser capabilities
  isAndroid = (/android/gi).test(navigator.appVmoveersion),
  isIDevice = (/iphone|ipad/gi).test(navigator.appVersion),
  isPlaybook = (/playbook/gi).test(navigator.appVersion),
  isTouchPad = (/hp-tablet/gi).test(navigator.appVersion),
  hasTouch = 'ontouchstart' in window && !isTouchPad,
  // Events
  RESIZE_EV = 'onorientationchange' in window ? 'orientationchange' : 'resize',
  START_EV = hasTouch ? 'touchstart' : 'mousedown',
  MOVE_EV = hasTouch ? 'touchmove' : 'mousemove',
  END_EV = hasTouch ? 'touchend' : 'mouseup',
  CANCEL_EV = hasTouch ? 'touchcancel' : 'mouseup',

// Constructor
Bgmusic=function(options){
    var that=this;

    // Default options
    that.options = {
      musicSrc:null,
      musicBtnId:null,
      autoPlay:true,
    };

    // User defined options
    for (i in options) that.options[i] = options[i];
    

    that.musciBtn=$('#'+that.options.musicBtnId);
    that.music=$('<audio id="music" loop="loop" src="'+ that.options.musicSrc  +'" ></audio>' ) 
    $('body').append(that.music);

    that.musciBtn.bind('touchstart',function(e){
      e.preventDefault();
      e.stopPropagation();
      that.togglePlay();
      that.options.autoPlay=false;
    })
    that._init();
    // that._bind(START_EV);
    // that._bind(MOVE_EV);
    // that._bind(END_EV);


        
}
// Prototype
Bgmusic.prototype={
  handleEvent: function (e) {
    var that = this;
    switch(e.type) {
      case START_EV:
        if (!hasTouch && e.button !== 0) return;
        that._start(e);
        break;
      case MOVE_EV: that._move(e); break;
      case END_EV:
      case CANCEL_EV: that._end(e); break;
      case RESIZE_EV: that._resize(); break;
      case WHEEL_EV: that._wheel(e); break;
      case 'mouseout': that._mouseout(e); break;
      case 'webkitTransitionEnd': that._transitionEnd(e); break;
    }
  },
  // _bind: function (type, el, bubble) {
  //   (el || this.canvas).addEventListener(type, this, !!bubble);
  // },

  // _unbind: function (type, el, bubble) {
  //   (el || this.canvas).removeEventListener(type, this, !!bubble);
  // }, 
  _init: function (type, el, bubble) {
      var that=this;
      if(that.options.autoPlay){
        that.play();
        $('body').bind('touchstart',function(){
          if(that.options.autoPlay){
            that.play();
          }
        })

        that.music.get(0).addEventListener("play", function() {
            that.musciBtn.show();
            that.options.autoPlay=false;
            that.musciBtn.removeClass("pause");
        })
        that.music.get(0).addEventListener("pause", function() {
            that.musciBtn.addClass("pause");
            that.options.autoPlay=false;
        })
      }
  },
  play:function(){
     var that=this;
     that.music.get(0).play();
    // console.log('play')
  },  
  pause:function(){
     var that=this;
     that.music.get(0).pause();
  },
  togglePlay:function(){
     var that=this;
     if (that.music.get(0).paused) {
         that.music.get(0).play();

     } else {
         that.music.get(0).pause();
     }
  } 
}

window.Bgmusic=Bgmusic;
})()