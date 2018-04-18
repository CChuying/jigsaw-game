/**
 * @author cy
 * @description 拼图小游戏
 */
 var timer = null, t1 = null ,process = null;
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
        this.r.width = 600;
        this.r.height = 360;


        this.ranking_btn = $(".ranking-btn");
        this.share_btn = $(".share-btn");
        this.close_btn = $(".close-btn");
        this.rule_btn = $(".rule-btn");
        this.close_rule = $(".close-rule-btn");
        this.close_city = $(".close-btn-red");

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
                range: [4,120,484,684]
            },{
                src  : 'img/2.png',
                name : '茂名',
                posX : 84 / 750 * w,
                posY : 318 / 606 * h,
                range: [80,200,420,566]
            },{
                src  : 'img/3.png',
                name : '阳江',
                posX : 175 / 750 * w,
                posY : 324 / 606 * h,
                range: [176,278,420,550]
            },{
                src  : 'img/4.png',
                name : '云浮',
                posX : 154 / 750 * w,
                posY : 257 /606 * h,
                range: [156,292,346,470]
            },{
                src  : 'img/5.png',
                name : '江门',
                posX : 243 / 750 * w,
                posY : 307 /606 * h,
                range: [256,330,380,526],
            },
            {
                src  : 'img/6.png',
                name : '肇庆',
                posX : 183 / 750 * w,
                posY : 150 /606 * h,
                range: [186,300,240,410],
            },
            {
                src  : 'img/7.png',
                name : '韶关',
                posX : 322 / 750 * w,
                posY : 32 /606 * h,
                range: [342,462,108,234]
            },
            {
                src  : 'img/8.png',
                name : '清远',
                posX : 230 / 750 * w,
                posY : 65 /606 * h,
                range: [214,424,140,260]
            },
            {
                src  : 'img/9.png',
                name : '广州',
                posX : 334 / 750 * w,
                posY : 164 /606 * h,
                range: [378,400,274,330]
            },
            {
                src  : 'img/10.png',
                name : '佛山',
                posX : 280 / 750 * w,
                posY : 219 /606 * h,
                range: [300,380,300,360]
            },
            {
                src  : 'img/11.png',
                name : '中山',
                posX : 350 / 750 * w,
                posY : 296 /606 * h,
                range: [330,420,364,460]
            },
            {
                src  : 'img/12.png',
                name : '珠海',
                posX : 340 / 750 * w,
                posY : 344 /606 * h,
                range: [320,412,424,520]
            },
            {
                src  : 'img/13.png',
                name : '潮州',
                posX : 653 / 750 * w,
                posY : 164 /606 * h,
                range: [634,740,240,310]
            },
            {
                src  : 'img/14.png',
                name : '梅州',
                posX : 555 / 750 * w,
                posY : 92 /606 * h,
                range: [546,726,180,300]
            },
            {
                src  : 'img/15.png',
                name : '汕头',
                posX : 640 / 750 * w,
                posY : 226 /606 * h,
                range: [622,720,310,400]
            },
            {
                src  : 'img/16.png',
                name : '揭阳',
                posX : 582 / 750 * w,
                posY : 210 /606 * h,
                range: [558,676,294,412]
            },
            {
                src  : 'img/17.png',
                name : '河源',
                posX : 453 / 750 * w,
                posY : 108 /606 * h,
                range: [500,550,220,300]
            },
            {
                src  : 'img/19.png',
                name : '惠州',
                posX : 413 / 750 * w,
                posY : 191 /606 * h,
                range: [406,520,250,340]
            },
            {
                src  : 'img/18.png',
                name : '汕尾',
                posX : 518 / 750 * w,
                posY : 229 /606 * h,
                range: [482,660,296,450]
            },
         
            {
                src  : 'img/20.png',
                name : '东莞',
                posX : 386 / 750 * w,
                posY : 272 /606 * h,
                range: [374,464,338,424]
            },
            {
                src  : 'img/21.png',
                name : '深圳',
                posX : 408 / 750 * w,
                posY : 278 /606 * h,
                range:[390,548,352,462]
            },
            ]

            document.onreadystatechange = self.loadingChange;//当页面加载状态改变的时候执行这个方法.    
          
            var map = new Image();
            map.src = 'img/map.png';
            map.onload = function(){
               self.ctx.drawImage(map,0,0,map.width*self.scale,map.height*self.scale); 
               self.ctx.globalCompositeOperation = 'source-over';  // 目标图像位于源图像的上方 
               for(var i = 0 ;i < 21 ; i++ ){
                    self.renderImg(self.imgArr[i]);
               }
            }
            self.ctx.save();    
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
                //window.location.href = "map.html";
            })
            self.rule_btn.on('click',function(){               
                $(".rule-box, .mask").addClass('show').removeClass('hide');
            })
            self.close_rule.on('click',function(){
                $(".rule-box, .mask").addClass('hide').removeClass('show');
            })
            self.close_city.on('click',function(){
                $(".city-box, .mask").addClass('hide').removeClass('show');
            })
            self.canvas.onclick = function(e){
                self.checkByCityId(e);
            }
            self.completeResult();
        },
        checkByCityId : function(e){
            var self = this ;
            var pos = self.getPosition(e);  
            console.log(pos);          
            var i = self.findId(pos);
            console.log(i);
            $(".city-name").html(self.imgArr[i].name)
            $(".city-box, .mask").addClass('show').removeClass('hide');
        },
        findId : function(pos){
            var self = this;
            var x = pos.x, y = pos.y, xmin , xmax ,  ymin , ymax;
            for(var  i = 0 ;i < 21 ; i++ ){
                xmin = self.imgArr[i].range[0];
                xmax = self.imgArr[i].range[1];
                ymin = self.imgArr[i].range[2];
                ymax = self.imgArr[i].range[3];
                if(x>xmin&x<xmax&y>ymin&y<ymax){
                    return i;
                }
            }
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
        completeResult : function(){
            var self = this;
            var rfrm = document.getElementById('rfrm'),pfrm = document.getElementById('pfrm'),
                no1 = document.getElementById('no1'),no2 = document.getElementById('no2'),no3 = document.getElementById('no3'),
                time = document.getElementById('time-icon');
            var fir = new Image();fir.src = "img/yangmi.jpg" ;var sec = new Image();sec.src = 'img/bb.jpg'; var thi = new Image();thi.src="img/yangmi.jpg";
            var frm = document.getElementById('frame'), l = (750 - frm.width) / 2, t = $(".time").html() , s = 99 , t1 = '02:13:14', t2 = '02:14:10' , t3 = '02:15:00',
                f24 = self.f(24),f38 = self.f(38), f32 = self.f(32) , f42 = self.f(42),
                c1 =self.c(14796663) , c2 = self.c(16777215) ;
            fir.onload = function(){
                self.rctx.beginPath();self.rctx.arc(105,90,60,0,2*Math.PI);self.rctx.fillStyle = '#fff';self.rctx.closePath();self.rctx.fill();
                self.rctx.globalCompositeOperation = 'source-atop';
                self.rctx.drawImage(fir,45,30,120,120);
                self.rctx.globalCompositeOperation = 'source-over';
                self.rctx.drawImage(pfrm,35,26); 
                self.rctx.globalCompositeOperation = 'source-over';
                self.rctx.drawImage(no1,15,110);
                self.rctx.fillStyle = c2;self.rctx.font = f24;self.rctx.fillText('排行第一网友名',15,190);
                self.rctx.drawImage(time,45,206);
                self.rctx.fillStyle = c1;self.rctx.font = f24;self.rctx.fillText(t1,71,228);

                self.rctx.beginPath();self.rctx.arc(305,90,60,0,2*Math.PI);self.rctx.fillStyle = '#fff';self.rctx.closePath();self.rctx.fill();
                self.rctx.globalCompositeOperation = 'source-atop';
                self.rctx.drawImage(fir,245,30,120,120);
                self.rctx.globalCompositeOperation = 'source-over';
                self.rctx.drawImage(pfrm,235,26); 
                self.rctx.globalCompositeOperation = 'source-over';
                self.rctx.drawImage(no2,215,110);
                self.rctx.fillStyle = c2;self.rctx.font = f24;self.rctx.fillText('排行第二网友名',215,190);
                self.rctx.drawImage(time,232,206);
                self.rctx.fillStyle = c1;self.rctx.font = f24;self.rctx.fillText(t1,258,228);
                
                self.rctx.beginPath();self.rctx.arc(505,90,60,0,2*Math.PI);self.rctx.fillStyle = '#fff';self.rctx.closePath();self.rctx.fill();
                self.rctx.globalCompositeOperation = 'source-atop';
                self.rctx.drawImage(fir,445,30,120,120);
                self.rctx.globalCompositeOperation = 'source-over';
                self.rctx.drawImage(pfrm,435,26); 
                self.rctx.globalCompositeOperation = 'source-over';
                self.rctx.drawImage(no3,415,110);
                self.rctx.fillStyle = c2;self.rctx.font = f24;self.rctx.fillText('排行第三网友名',415,190);
                self.rctx.drawImage(time,430,206);
                self.rctx.fillStyle = c1;self.rctx.font = f24;self.rctx.fillText(t1,452,228);
                
            }
        },
        f: function(f){
            return f+'px Microsoft Yahei';
        },
        c: function(c){
            return "#" + ("00000" + (0 | c).toString(16)).substr(-6);
        },
        getRankingLists : function(){
            console.log('getRankingLists');
        },
        getPosition : function(ev){
            var x, y;
            x = ev.clientX;
            y = ev.clientY;
            return {x: x,y: y};
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




