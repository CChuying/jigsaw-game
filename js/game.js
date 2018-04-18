/**
 * @author cy
 * @description 拼图小游戏
 */
 var timer = null, t1 = null ,process = null, count1 = null , count2 = null ,count3 = null;
;(function () {
    function Map() {
        $(window).width() > 749 ? this.winW = 750 : this.winW = $(window).width();
        this.winH = $(window).height();
        this.scale = this.winW / 750;   // 图片缩放的比例  750是原图的宽
       
        this.canvas = document.getElementById('map');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = this.winW;
        this.canvas.height = this.winW / 1.2376237623762376;   // 750/606

        this.r = document.getElementById('result-canvas');
        this.rctx = this.r.getContext('2d');
        this.r.width = this.winW;
        this.r.height = this.winH;

        this.canvas1 = document.getElementById('map1');
        this.ctx1 = this.canvas1.getContext('2d');
        this.canvas2 = document.getElementById('map2');
        this.ctx2 = this.canvas2.getContext('2d');
        this.canvas3 = document.getElementById('map3');
        this.ctx3 = this.canvas3.getContext('2d');
        this.currenCanvas_1 = [];
        this.currenCanvas_2 = [];
        this.currenCanvas_3 = [];

        this.start_btn = $(".start-btn");
        this.ranking_btn = $(".ranking-btn");
        this.share_btn = $(".share-btn");
        this.close_btn = $(".close-btn");
        this.rule_btn = $(".rule-btn");
        this.close_rule = $(".close-rule-btn");
        this.gameover = 0;   // 累计数组的长度为0的次数  == map的个数
        this.finishArr = [];


        process =setInterval(function(){
            $("#progress").removeClass('running').delay(10).queue(function(next){
                $(this).addClass('running');
                next();
            });
        },2500)
    }

    Map.prototype = {
        init: function () {
            var self = this;
            var h = $("canvas").height(), w = self.winW;   // 已750/606的比例为标准计算距离
            var t = 45;
            self.imgArr = [{
                src  : 'img/1.png',
                name : '湛江',
                posX : 20 / 750 * w,       // 地图上面的坐标
                posY : 400 / 606 * h,
                range: [116,170,590,670]
            },{
                src  : 'img/2.png',
                name : '茂名',
                posX : 84 / 750 * w,
                posY : 318 / 606 * h,
                range: [170,250,490,560]
            },{
                src  : 'img/3.png',
                name : '阳江',
                posX : 175 / 750 * w,
                posY : 324 / 606 * h,
                range: [250,310,470,582]
            },{
                src  : 'img/4.png',
                name : '云浮',
                posX : 154 / 750 * w,
                posY : 257 /606 * h,
                range: [230,302,414,478]
            },{
                src  : 'img/5.png',
                name : '江门',
                posX : 243 / 750 * w,
                posY : 307 /606 * h,
                range: [315,400,460,544],
            },
            {
                src  : 'img/6.png',
                name : '肇庆',
                posX : 183 / 750 * w,
                posY : 150 /606 * h,
                range: [272,340,334,410],
            },
            {
                src  : 'img/7.png',
                name : '韶关',
                posX : 322 / 750 * w,
                posY : 32 /606 * h,
                range: [430,500,220,300]
            },
            {
                src  : 'img/8.png',
                name : '清远',
                posX : 230 / 750 * w,
                posY : 65 /606 * h,
                range: [340,415,260,330]
            },
            {
                src  : 'img/9.png',
                name : '广州',
                posX : 334 / 750 * w,
                posY : 164 /606 * h,
                range: [400,472,325,425]
            },
            {
                src  : 'img/10.png',
                name : '佛山',
                posX : 280 / 750 * w,
                posY : 219 /606 * h,
                range: [350,410,388,450]
            },
            {
                src  : 'img/11.png',
                name : '中山',
                posX : 350 / 750 * w,
                posY : 296 /606 * h,
                range: [400,480,420,552]
            },
            {
                src  : 'img/12.png',
                name : '珠海',
                posX : 340 / 750 * w,
                posY : 344 /606 * h,
                range: [396,450,490,556]
            },
            {
                src  : 'img/13.png',
                name : '潮州',
                posX : 653 / 750 * w,
                posY : 164 /606 * h,
                range: [714,764,310,382]
            },
            {
                src  : 'img/14.png',
                name : '梅州',
                posX : 555 / 750 * w,
                posY : 92 /606 * h,
                range: [656,716,280,340]
            },
            {
                src  : 'img/15.png',
                name : '汕头',
                posX : 640 / 750 * w,
                posY : 226 /606 * h,
                range: [680,760,340,436]
            },
            {
                src  : 'img/16.png',
                name : '揭阳',
                posX : 582 / 750 * w,
                posY : 210 /606 * h,
                range: [630,705,340,428]
            },
            {
                src  : 'img/17.png',
                name : '河源',
                posX : 453 / 750 * w,
                posY : 108 /606 * h,
                range: [540,602,290,375]
            },
            {
                src  : 'img/18.png',
                name : '汕尾',
                posX : 518 / 750 * w,
                posY : 229 /606 * h,
                range: [600,660,400,460]
            },
            {
                src  : 'img/19.png',
                name : '惠州',
                posX : 413 / 750 * w,
                posY : 191 /606 * h,
                range: [510,568,376,436]
            },
            {
                src  : 'img/20.png',
                name : '东莞',
                posX : 386 / 750 * w,
                posY : 272 /606 * h,
                range: [420,492,400,464]
            },
            {
                src  : 'img/21.png',
                name : '深圳',
                posX : 408 / 750 * w,
                posY : 278 /606 * h,
                range:[458,522,406,482]
            },
            ]

            document.onreadystatechange = self.loadingChange;//当页面加载状态改变的时候执行这个方法.    
          
            var map = new Image();
            map.src = 'img/map.png';
            map.onload = function(){
               self.ctx.drawImage(map,0,0,map.width*self.scale,map.height*self.scale); 
               self.ctx.globalCompositeOperation = 'source-over';  // 目标图像位于源图像的上方 
            }
            self.ctx.save();    
            self.randomImg();    // 随机生成下面的小地图
            self.start_btn.on('click',function(){
                $(".count-down-img .t").addClass('show').removeClass('hide');
                count1 = setTimeout(function(){
                    $(".count-down-img .t").addClass('hide').removeClass('show');
                    $(".count-down-img .s").addClass('show').removeClass('hide');
                },1000);
                count2 = setTimeout(function(){
                    $(".count-down-img .s").addClass('hide').removeClass('show');
                    $(".count-down-img .f").addClass('show').removeClass('hide');
                },2000);
                count3 = setTimeout(function(){
                    $(".count-down-img .f").addClass('hide').removeClass('show');
                    self.startGame();    // 开始游戏
                },3000);
                self.start_btn.unbind('click');
            })
            self.ranking_btn.on('click',function(){
                if($(this).hasClass('ranking-btn')){
                    $(this).removeClass('ranking-btn').addClass('return-btn');
                    $(".ranking-box").addClass('show').removeClass('hide');
                    self.getRankingLists();
                    return;
                }
                if($(this).hasClass('return-btn')){
                    $(this).removeClass('return-btn').addClass('ranking-btn');
                    $(".ranking-box").addClass('hide').removeClass('show');
                    return;
                }
            })
            self.share_btn.on('click',function(){
                self.shareLinks();
            })
            self.close_btn.on('click',function(){
                window.location.href = "map.html";
            })
            self.rule_btn.on('click',function(){               
                $(".rule-box, .mask").addClass('show').removeClass('hide');
            })
            self.close_rule.on('click',function(){
                $(".rule-box, .mask").addClass('hide').removeClass('show');
            })
        },
        loadingChange : function(){     
            if(document.readyState == "complete"){//当页面加载状态为完全结束时进入     
                clearInterval(process);
                $(".loading").addClass('hide');
            }     
        },
        shareLinks : function(){
            $(".top-btn").addClass('show').removeClass('hide');
            setTimeout(function(){
               $(".top-btn").addClass('hide').removeClass('show');
            },1000);
        },
        startGame : function() {
            var self = this;
            console.log('start----game');
            self.dragEvent();
            // 开始计时
            var min = 0 ,sec = 0 , ms = 0;
            clearInterval(timer);
            timer = setInterval(function(){
                showTime();
            },10)
            function showTime(){
                ms++;
                if(sec==60) {min++;sec=0;}
                if(ms==100) {sec++;ms=0;}
                var msStr=ms;
                if(ms<10) msStr="0"+ms;
                var secStr=sec;
                if(sec<10) secStr="0"+sec;
                var minStr=min;
                if(min<10) minStr="0"+min;
                $(".time").html(minStr+":"+secStr+":"+msStr);
            }
        },
        //滑动开始
        start : function(event,arr){
            event.preventDefault();
            var self = this;
            var pos = self.getPosition(event);
            //var index =  arr[arr.length-1];
            //self.draw(index,0.8,0.8,self.ctx1);
        },
        //移动
        move : function(event,target,ele){
            event.preventDefault();
            var self = this;
            //当屏幕有多个touch或者页面被缩放过，就不执行move操作
            if(event.targetTouches.length > 1 || event.scale && event.scale !== 1) return;
            var pos = self.getPosition(event);
            // console.log(pos.x,pos.y);
            self.moveCanvas(target,pos.x,pos.y);  
        },
        //滑动释放
        end : function(event,target,arr,ele,l){  // target是指当前对象的id ， ele 是指当前的canvas
            var self = this;
            // console.log(arr);
            event.preventDefault();
            var touch = event.changedTouches[0],
                index = arr[arr.length-1];
　　        var x = touch.pageX ,
                y = touch.pageY ;
            var xmin = self.imgArr[index-1].range[0],
                xmax = self.imgArr[index-1].range[1],
                ymin = self.imgArr[index-1].range[2],
                ymax = self.imgArr[index-1].range[3];
            if(x > xmin && x < xmax && y > ymin && y < ymax){
                // 在范围内
                self.putTrue(target,ele,arr,l);
            }else{
                $(target).css({
                    left : l,
                    top  :  '63.5%',
                });
                var i = $.inArray(index-1,self.finishArr); // 判断是否有在完成的数组里面，已经存在表示重复——这是一个拦截判断
                if(i != -1){ $(target).remove(); return; } // 如果有，表示这个canvas所生成的图片已经完成，canvas删除，防止再添加
                self.draw(index,1,1,ele);   // 错误的要重新生成一次
            }
           
        },
        dragEvent : function(){
            var self = this;
            self.canvas1.ontouchstart = function(e){
                self.start(e,self.currenCanvas_1);
            }
            self.canvas1.ontouchmove = function(e){
                self.move(e,$("#map1"),self.ctx1);          
            }
            self.canvas1.ontouchend = function(e){
                self.end(e,$("#map1"),self.currenCanvas_1,self.ctx1,'10%');
            }
            self.canvas2.ontouchstart = function(e){
                self.start(e,self.currenCanvas_2);
            }
            self.canvas2.ontouchmove = function(e){
                self.move(e,$("#map2"),self.ctx2);          
            }
            self.canvas2.ontouchend = function(e){
                self.end(e,$("#map2"),self.currenCanvas_2,self.ctx2,'38%');
            }
            self.canvas3.ontouchstart = function(e){
                self.start(e,self.currenCanvas_3);
            }
            self.canvas3.ontouchmove = function(e){
                self.move(e,$("#map3"),self.ctx3);          
            }
            self.canvas3.ontouchend = function(e){
                self.end(e,$("#map3"),self.currenCanvas_3,self.ctx3,'65%');
            }
        },
        moveCanvas : function(target,x,y){
            var self = this ;
            $(target).css({
                left : x - 150,
                top  : y - 150,
            })
        },
        putTrue : function (target,ele,arr,l) {
            var self = this,
                index = arr[arr.length-1];
            $(target).css({
                left :  l,
                top  :  '63.5%',
            });  
            ele.clearRect(0,0,200,200);  
            var i = $.inArray(index-1,self.finishArr);
            if(i == -1){
                self.finishArr.push(index-1);
                self.renderImg(self.imgArr[index-1],false);   // 显示对应的地图
                $(".success-word").removeClass('hide').addClass('show');// 显示乡村振兴的文字
                clearInterval(t1);
                t1 = setTimeout(function(){
                    $(".success-word").removeClass('show').addClass('hide');
                },1200);
                if(self._num.length ==  0){
                    self.gameOver();
                    return;
                } 
                self.draw(self._num[0],1,1,ele);// 增加新的地图
                arr.push(self._num[0]);// 把这个值放到相应的数组里面，重新更换当前的current值
                self._num.splice(0,1); 
            }else{
                $(target).remove();
            }             
        },
        gameOver : function (argument) {
            var self = this;
            self.gameover ++ ;
            if(self.gameover == 3){
                console.log('gameOver!you win!');
                clearInterval(timer);
                self.saveUserInfo($(".time").html());
            }
        },
        completeResult : function(){
            var self = this;
            //console.log('completeResult');
            var img = new Image();img.src = 'img/bb.jpg';  // 作者本身
            var rfrm = document.getElementById('rfrm'),pfrm = document.getElementById('pfrm'),
                no1 = document.getElementById('no1'),no2 = document.getElementById('no2'),no3 = document.getElementById('no3'),
                time = document.getElementById('time-icon');
            var fir = new Image();fir.src = "img/yangmi.jpg" ;var sec = new Image();sec.src = 'img/bb.jpg'; var thi = new Image();thi.src="img/yangmi.jpg";
            var frm = document.getElementById('frame'), l = (750 - frm.width) / 2, t = $(".time").html() , s = 99 , t1 = '02:13:14', t2 = '02:14:10' , t3 = '02:15:00',
                f24 = self.f(24),f38 = self.f(38), f32 = self.f(32) , f42 = self.f(42),
                c1 =self.c(14796663) , c2 = self.c(16777215) ;
            img.onload = function(){  
                self.rctx.beginPath();self.rctx.arc(375,340,110,0,2*Math.PI);self.rctx.fillStyle = '#fff';self.rctx.closePath();self.rctx.fill();
                self.rctx.globalCompositeOperation = 'source-atop';
                self.rctx.drawImage(img,265,230,220,220);
                self.rctx.globalCompositeOperation = 'source-over'; 
                self.rctx.drawImage(frm,l,70); 
                self.rctx.fillStyle = c1;self.rctx.font = f38;self.rctx.fillText(t,325,545);
                self.rctx.fillStyle = c2;self.rctx.font = f32;self.rctx.fillText('恭喜！你已打败了',150,650);
                self.rctx.fillStyle = c1;self.rctx.font = f42;self.rctx.fillText(s,410,650);
                self.rctx.fillStyle = c2;self.rctx.font = f32;self.rctx.fillText('%的网友',465,650);              
           
                self.rctx.beginPath();self.rctx.arc(180,800,60,0,2*Math.PI);self.rctx.fillStyle = '#fff';self.rctx.closePath();self.rctx.fill();
                self.rctx.globalCompositeOperation = 'source-atop';
                self.rctx.drawImage(fir,120,740,120,120);
                self.rctx.globalCompositeOperation = 'source-over';
                self.rctx.drawImage(pfrm,110,736); 
                self.rctx.globalCompositeOperation = 'source-over';
                self.rctx.drawImage(no1,100,820);
                self.rctx.fillStyle = c2;self.rctx.font = f24;self.rctx.fillText('排行第一网友名',100,900);
                self.rctx.drawImage(time,120,918);
                self.rctx.fillStyle = c1;self.rctx.font = f24;self.rctx.fillText(t1,146,940);

                self.rctx.beginPath();self.rctx.arc(380,800,60,0,2*Math.PI);self.rctx.fillStyle = '#fff';self.rctx.closePath();self.rctx.fill();
                self.rctx.globalCompositeOperation = 'source-atop';
                self.rctx.drawImage(sec,320,740,120,120);
                self.rctx.globalCompositeOperation = 'source-over';
                self.rctx.drawImage(pfrm,310,736); 
                self.rctx.globalCompositeOperation = 'source-over';
                self.rctx.drawImage(no2,300,820);
                self.rctx.fillStyle = c2;self.rctx.font = f24;self.rctx.fillText('排行第二网友名',300,900);
                self.rctx.drawImage(time,310,918);
                self.rctx.fillStyle = c1;self.rctx.font = f24;self.rctx.fillText(t2,336,940);

                self.rctx.beginPath();self.rctx.arc(580,800,60,0,2*Math.PI);self.rctx.fillStyle = '#fff';self.rctx.closePath();self.rctx.fill();
                self.rctx.globalCompositeOperation = 'source-atop';
                self.rctx.drawImage(thi,520,740,120,120);
                self.rctx.globalCompositeOperation = 'source-over';
                self.rctx.drawImage(pfrm,510,736); 
                self.rctx.globalCompositeOperation = 'source-over';
                self.rctx.drawImage(no3,500,820);
                self.rctx.fillStyle = c2;self.rctx.font = f24;self.rctx.fillText('排行第三网友名',500,900);
                self.rctx.drawImage(time,505,918);
                self.rctx.fillStyle = c1;self.rctx.font = f24;self.rctx.fillText(t3,531,940);

                self.rctx.globalCompositeOperation = 'destination-over';
                self.rctx.drawImage(rfrm,(750-rfrm.width)/2,700);    

                $(".result,.mask").addClass('show').removeClass('hide');

            }
        },
        f: function(f){
            return f+'px Microsoft Yahei';
        },
        c: function(c){
            return "#" + ("00000" + (0 | c).toString(16)).substr(-6);
        },
        saveUserInfo : function(t){
            var self = this;
            // console.log(t);
            self.completeResult();
        },
        getRankingLists : function(){
            console.log('getRankingLists');
        },
        getPosition : function(ev){
            var x, y;
            x = ev.touches[0].pageX;
            y = ev.touches[0].pageY;
            return {x: x,y: y};
        },
        randomImg : function(){
            // 打乱数组,三张为一组，一个参数储存当前3个canvas相应的src / 正确的范围区间（事先计算）, 已放置的数字要去掉
            var self = this;
            self._num = [1,2,3,4,5,6,7,12,13,14,15,17]; 
            self._num.sort(function(){ return 0.5 - Math.random() });
            self._num.push(8,9,10,11,16,18,19,20,21);
            var _index1 = self._num[0],
                _index2 = self._num[1],
                _index3 = self._num[2],
                _index4 = self._num[3];
            self.draw(_index1,1,1,self.ctx1);
            self.currenCanvas_1.push(_index1);
            self.draw(_index2,1,1,self.ctx2);
            self.currenCanvas_2.push(_index2);
            self.draw(_index3,1,1,self.ctx3);
            self.currenCanvas_3.push(_index3);
            self._num.splice(0,3);
        },
        draw : function(index,num1,num2,ele){
            // 选项框的图片渲染
            var self = this;
            ele.clearRect(0,0,100,100);
            var map = new Image(),x,y;
            map.src = self.imgArr[index-1].src;
            map.onload = function(){
                w = map.width*self.scale/num1;
                h = map.height*self.scale/num2;
                x = ( 200 - w )/2;
                y = ( 200 - h )/2;
                ele.drawImage(map,x,y,w,h);              
            }
        },
        renderImg : function(data,flag){  // flag暂时没起作用
            var self = this,
                _src = data.src,
                _posX = data.posX,   
                _posY = data.posY;
            var img = new Image();
            img.src = _src;
            img.onload = function(){
                // 上方的区域画图
                self.ctx.drawImage(img,_posX,_posY,img.width*self.scale,img.height*self.scale);
            }
        }  
    }      
//调用
    var map = new Map();
    map.init();
})();




