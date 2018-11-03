var first_load = true;
$(document).ready(function(){
	//圆环内容发生改变时修改文字
	/*$(".circleChart#0").circleChart({
		size: 300,
		value: 50,
		text: 0,
		onDraw: function(el, circle) {
			circle.text(Math.round(circle.value) + "%");
		}
	});*/
	
	
    //设置半饼图样式
    var gaugeOptions = {
        chart: {
            type: 'solidgauge',
            backgroundColor: 'rgba(0,0,0,0)'
        },
        title: null,
        pane: {/*
            center: ['50%', '85%'],
            size: '140%',
            startAngle: -90,
            endAngle: 90,*/
            background: {
                backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
                innerRadius: '60%',
                outerRadius: '100%',
                shape: 'arc'
            }
        },
        tooltip: {
            enabled: false
        },
        // the value axis
        yAxis: {
            stops: [
                [0.1, '#DF5353'], // red
                [0.5, '#DDDF0D'], // yellow
                [0.9, '#55BF3B'] // green
            ],
            lineWidth: 0,
            minorTickInterval: null,
            tickAmount: 2,
            title: {
                y: -70
            },
            labels: {
                y: 16
            }
        },
        plotOptions: {
            solidgauge: {
                dataLabels: {
                    y: 5,
                    borderWidth: 0,
                    useHTML: true
                }
            }
        }
    };

    //生成半饼图
    var chartSpeed = Highcharts.chart('container-percent', Highcharts.merge(gaugeOptions, {
        yAxis: {
            min: 0,
            max: 100,
            title: {
                text: null
            }
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'Speed',
            data: [80],
            dataLabels: {
                format: '<div style="text-align:center;margin-top:-50px;"><span style="font-size:20px;color:silver">报到率</span><br/>'+
                '<span style="font-size:35px;color:' +
                ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'white') + '">{y}%</span></div>'
            },
            tooltip: {
                valueSuffix: '报到率'
            }
        }]
    }));

    //初始化数据
    basic(chartSpeed.series[0].points[0]);
    department();
    new_student();
    trend();
    
    //定时更新时间
    setInterval(function(){
        var nowTime=new Date().Format("yyyy年MM月dd日 HH时mm分ss秒"); 
        $(".clock").text(nowTime);
        //console.log(nowTime);
    },1000);
    //定时更新基本情况
    setInterval(function(){
        basic(chartSpeed.series[0].points[0]);
    },3*1000);
    //定时更新各系报到情况
    setInterval(function(){
        department();
    },3*1000);
    //定时更新报到情况弹幕
    setInterval(function(){
        new_student();
    },1*1000);
    //定时更新报到趋势
    setInterval(function(){
        trend();
    },5*1000);
});

Date.prototype.Format = function (fmt) {  
    var o = {  
        "M+": this.getMonth() + 1, //月份   
        "d+": this.getDate(), //日   
        "H+": this.getHours(), //小时   
        "m+": this.getMinutes(), //分   
        "s+": this.getSeconds(), //秒   
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度   
        "S": this.getMilliseconds() //毫秒   
    };  
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));  
    for (var k in o)  
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));  
    return fmt;  
}

function basic(chartSpeed){
    $.ajax({
        type: "POST",
        url: "../bdzt/api.php",
        data: {flag:'basic'},
        dataType: "json",
        success: function(data){
            if(data.tips == "Success"){
                chartSpeed.update(parseFloat(data.result.bdl));
				/*$("#0").circleChart({
					value:data.result.bdl
				});*/
                $("num").text(data.result.ybd);
                $("boy").text(data.result.boy);
                $("girl").text(data.result.girl);
            } else {
                //layer.msg(data.tips, {icon: 0}); 
            }
        }
    });
}

function department(){
    $.ajax({
        type: "POST",
        url: "../bdzt/api.php",
        data: {flag:'department'},
        dataType: "json",
        success: function(data){
            if(data.tips == "Success"){
                if(first_load){
                    //初次加载进度条
                    jQuery.each(data.result, function(i, val) {
                        eval('$("#progress'+i+'_content").html(\''+val.title+'<div class="progress_content_proportion">'+val.ybd+'/'+val.num+'</div>\');');
                        if(val.bdl < 33){
                            eval('progress'+i+'=$("#progress'+i+'").ProgressBarWars({porcentaje:'+val.bdl+',estilo:"vader",alto:"10px",color:"#FD4275"});');
                        } else if(val.bdl < 66){
                            eval('progress'+i+'=$("#progress'+i+'").ProgressBarWars({porcentaje:'+val.bdl+',estilo:"vader",alto:"10px",color:"#00E5FF"});');
                        } else {
                            eval('progress'+i+'=$("#progress'+i+'").ProgressBarWars({porcentaje:'+val.bdl+',estilo:"vader",alto:"10px",color:"#3B8CF8"});');
                        }
                    });
                    first_load = false;
                } else {
                    //更新进度条
                    jQuery.each(data.result, function(i, val) {
                        //到达临界值则修改颜色
                        if(val.bdl > 32 && val.bdl < 34){
                            eval('$("#progress'+i+'").html(\'<div id="progress'+i+'_content">'+val.title+'<div class="progress_content_proportion">'+val.ybd+'/'+val.num+'</div></div>\');');
                            eval('progress'+i+'=$("#progress'+i+'").ProgressBarWars({porcentaje:'+val.bdl+',estilo:"vader",alto:"10px",color:"#00E5FF"});');
                        } else if(val.bdl > 65 && val.bdl < 67){
                            eval('$("#progress'+i+'").html(\'<div id="progress'+i+'_content">'+val.title+'<div class="progress_content_proportion">'+val.ybd+'/'+val.num+'</div></div>\');');
                            eval('progress'+i+'=$("#progress'+i+'").ProgressBarWars({porcentaje:'+val.bdl+',estilo:"vader",alto:"10px",color:"#3B8CF8"});');
                        } else {
                            //没有到达临界值，直接修改进度
                            eval('$("#progress'+i+'_content").html(\''+val.title+'<div class="progress_content_proportion">'+val.ybd+'/'+val.num+'</div>\');');
                            eval("progress"+i+".mover("+val.bdl+");");
                        }
                    });
                }
            } else {
                //layer.msg(data.tips, {icon: 0}); 
            }
        }
    });
}

function new_student(){
    $.ajax({
        type: "POST",
        url: "../bdzt/api.php",
        data: {flag:'new_student'},
        dataType: "json",
        success: function(data){
            if(data.tips == "Success"){
                var new_content = '';
                jQuery.each(data.result, function(i, val) {
					//console.log(parseInt(val.bdsj.substring(0,2)+val.bdsj.substring(3,5))) //取报到时间（时分）
					var nowTime=new Date().Format("HHmm"); 
					//console.log(parseInt(nowTime)-5);//取当前时间（时分）五分钟前
					//判断报到时间为（当前时间-5分钟）之后的条目设置颜色为红色。
					if((parseInt(nowTime)-5) < parseInt(val.bdsj.substring(0,2)+val.bdsj.substring(3,5))){
						new_content = "<student style='color:red;'>["+val.bdsx+"]&nbsp;"+val.xm+val.bdsj+"完成报到。</student></br>"+new_content
					} else {
						new_content = "["+val.bdsx+"]&nbsp;"+val.xm+val.bdsj+"完成报到。</br>"+new_content
					}
                });
                $(".new_student_content").html(new_content);
            } else {
                //layer.msg(data.tips, {icon: 0}); 
            }
        }
    });
}

function trend(){
    $.ajax({
        type: "POST",
        url: "../bdzt/api.php",
        data: {
            flag: 'trend'
        },
        dataType: "json",
        success: function(data) {
            if (data.tips == "Success") {
                //console.log(typeof(data.result[0][1]));
                Highcharts.chart('container', {
                    chart: {
                        zoomType: 'x',
                        backgroundColor: 'rgba(0,0,0,0)'
                    },
                    title: {
                        text: null //设置标题为空可以不显示
                    },
                    xAxis: {
                        type: 'category',
						labels:{
							style:{
								color: '#ffffff'
							}
						},
                    },
                    yAxis: {
                        title: {
                            text: null
                        },
						labels:{
							style:{
								color: '#ffffff'
							}
						},
                    },
                    legend: {
                        enabled: false
                    },
                    plotOptions: {
                        area: {
                            fillColor: {
                                linearGradient: {
                                    x1: 0,
                                    y1: 0,
                                    x2: 0,
                                    y2: 1
                                },
                                stops: [[0, Highcharts.getOptions().colors[0]], [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]]
                            },
                            marker: {
                                radius: 2
                            },
                            lineWidth: 1,
                            states: {
                                hover: {
                                    lineWidth: 1
                                }
                            },
                            threshold: null
                        }
                    },
                    series: [{
                        type: 'area',
                        name: '报到人数',
                        data: data.result
                    }]
                });
            } else {
                //layer.msg(data.tips, {icon: 0}); 
            }
        }
    });
}