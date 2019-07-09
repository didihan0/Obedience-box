(function init(){
    var map=document.getElementById("map");
    var boxlist=[];
    for(var i=0;i<100;i++){
        boxlist.push('<div class="mapbox"></div>')
    }
    map.innerHTML=boxlist.join('');
})();
(function(){
    var diamond=document.getElementById("diamond");
    var come=document.getElementById("come");
    var Delete=document.getElementById("Delete");
    var rowid=document.getElementById("rowId");
    var area=document.getElementById("area");
    var index=0;
    var error=true;
    var xy={
        x:5,
        y:5,
        face:0//0是向上，1是向右，2是下，3是左
    }
    
    var operation={ 
        go: function(){ 
            if(xy.face===0&&xy.y>0){
                xy.y--;
            }else if(xy.face===1&&xy.x<10){
                xy.x++;
            }else if(xy.face===2&&xy.y<10){
                xy.y++;
            }else if(xy.face===3&&xy.x>0){
                xy.x--;
            }
            
        },
        tunleft: function(){
            xy.face--;
        },
        tunright: function(){
            xy.face++;
        },
        traleft: function(){
            if(xy.x>1){
                xy.x--;
            }
        },
        traright: function(){
            if(xy.x<10){
                xy.x++;
            }
        },
        tratop: function(){
            if(xy.y>1){
                xy.y--;
            }
        },
        trabot: function(){
            if(xy.y<10){
                xy.y++;
            }
        },
        movleft: function(){
            if(xy.x>1){
                xy.face=3;
                xy.x--;
            }
        },
        movtop: function(){
            if(xy.y>1){
                xy.face=0;
                xy.y--;
            }
        },
        movright: function(){
            if(xy.x<10){
                xy.face=1;
                xy.x++;
            }
        },
        movbot: function(){
            if(xy.y<10){
                xy.face=2;
                xy.y++;
            }
        }
    }
    
    function ready(){
        index++;
        diamond.style.left=54+xy.x*40+"px";
        diamond.style.top=55+xy.y*40+"px";
        diamond.style.transform="rotate(" + (xy.face * 90) + "deg)";
        diamond.addEventListener("transitionend",End);
    }
    function End(){
        xy.face=xy.face%4+(xy.face%4>=0?0:4);
        diamond.style.transition="0";
        diamond.style.transform="rotate(" + (xy.face * 90) + "deg)";
        setTimeout( function(){
            diamond.style.transition="";
        }, 0);
    }
    come.addEventListener('click',onclick);
    function onclick(){
        
        var value=area.value;
        value=value.toLowerCase();
        var arr=value.split("\n");
        var i=1;
        command(arr[0], 0);
		var timer = setInterval(function(){
			if(i<arr.length){
				command(arr[i], i);	//执行指定命令条
				++i;
			} else {
				clearInterval(timer)
			}
		}, 800)
    }
    function command(arr,i){
        var date=arr[arr.length-1];
        var arrlist=arr.split(" ");
        if(!isNaN(date)){
            arrlist.pop();
            arrlist=arrlist.join(" ");
            for(var i=0;i<date;i++){
                if(!error){
                    error=true;
                    break;
                }
                Move(arrlist);
            }
        }else{
            arrlist=arrlist.join(" ");
            Move(arrlist);
        }
    }
    function Move(arr){
        index++;
        if (arr == "go") {
            operation.go();
            ready();
        }else if (arr == "tun lef") {
            operation.tunleft();
            ready();
        }else if (arr == "tun rig") {
            operation.tunright();
            ready();
        }else if (arr == "tun bac") {
            operation.tunright();
            operation.tunright();
            ready();
        }else if (arr == "tra lef") {
            operation.traleft();
            ready();
        }else if (arr == "tra top") {
            operation.tratop();
            ready();
        }else if (arr == "tra rig") {
            operation.traright();
            ready();
        }else if (arr == "tra bot") {
            operation.trabot();
            ready();
        }else if (arr == "mov lef") {
            operation.movleft();
            ready();
        }else if (arr == "mov rig") {
            operation.movright();
            ready();
        }else if (arr=="mov top") {
            operation.movtop();
            ready();
        }else if (arr == "mov bot") {
            operation.movbot();
            ready();
        }else{
            error=false;
            console.log("第"+index+"条指令出现错误");
            
        }
    }
    Delete.addEventListener("click", function(){
        index=0;
		area.value="";
		rowid.innerHTML = "";
    })
    area.addEventListener('keyup',function(){
        rowchange();
    })
    function rowchange(){
        var areavalue=area.value;
        var rows=areavalue.split("\n");
        var arr=[];
        var top=area.scrollTop;
        for(var i=1;i<=rows.length;i++){
            arr.push("<div class='partrow'>"+i+"</div>");
        }
        rowid.innerHTML=arr.join("");
        rowid.scrollTop=top;
    }
    area.addEventListener('scroll',function(){
        var top=area.scrollTop;
        rowid.scrollTop=top;
    })
    
})();   