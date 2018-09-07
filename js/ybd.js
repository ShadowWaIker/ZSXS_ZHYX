/** 预报到 */

//预报到状态代码
var ybdzt = 0;
//基本信息保存状态
var jbxx_is_save = false;
//家庭成员表格行数
var jtcy_num = 0;
//学习简历表格行数
var xxjl_num = 0;
//社会实践表格行数
var shsj_num = 0;
//获奖情况表格行数
var hjqk_num = 0;

layui.use(['form','table','element','form','laydate','upload'], function(){
  //加载组件
  var util = layui.util, upload = layui.upload, laydate = layui.laydate, form = layui.form, $ = layui.jquery, element = layui.element, form = layui.form, table = layui.table;
  
  //固定块
  util.fixbar({
  bar1: '<b style="font-size: 18px;margin: auto;">退出</b>'
	,bar2: '<i class="layui-icon layui-icon-survey" style="font-size: 30px;margin-left: 5px;"></i>'
	,css: {right: '5%', top: '50%'}
    ,click: function(type){
      if(type === 'bar1'){
         layer.confirm('确定要退出？', {icon: 6,title: '提示'},function(index, layero) {
        	$.ajax({
	            type: "POST",
	            url: "./api/api.php",
	            data: {flag:'logout'},
	            dataType: "json",
	            success: function(data){
	              if(data.tips == "Success"){
        					layer.msg("退出成功！", {icon: 1}); 
        					setTimeout(function(){window.location.reload();},1000);
	              } else {
	                layer.msg(data.tips, {icon: 0}); 
	              }
			    }
	        });
	    });
      } else if(type === 'bar2'){
        layer.open({
	        type: 1,
	        title: "进行反馈或取得技术支持",
	        area: ['300px','170px'],
	        content: '<div style="text-align: center;margin-top: 20px;">您可以<br>拨打电话：0350-3611123<br>或<br><a href="https://jq.qq.com/?_wv=1027&amp;k=5yRjPDn">加入QQ群</a></div>'
	    });
      }
    }
  });
  
  
  //重载页面
  PageReLoad();

  /** 
   * Step1
   */
  form.render();
  //提交个人及家庭信息
  form.on("submit(grxx)", function(data){
    data.field.flag = "Update_grxx";
    $.ajax({
        type: "POST",
        url: "./api/api.php",
        data: data.field,
        dataType: "json",
        success: function(data){
          if(data.tips == "Success"){
            layer.msg("保存成功！", {icon: 1});
            jbxx_is_save = true;
          } else if(data.tips == "Not_Logged_In"){
            layer.open({
              type: 1,
              closeBtn: 0,
              shade: [1, '#393D49'],
              title: "登陆",
              area: '520px',
              content: '<link rel="stylesheet" href="./css/login.css">  <div class="xy-login"><div class="xy-title">忻州师范学院<c style="color: #0093ffd4;">智慧迎新</c></div> <form class="layui-form layui-form-pane" action=""> <div class="layui-form-item"> <label class="layui-form-label">身份证号</label> <div class="layui-input-block"> <input type="text" name="sfzh" lay-verify="required|identity" autocomplete="off" placeholder="请输入身份证号" class="layui-input"> </div> </div> <div class="layui-form-item"> <label class="layui-form-label">通知书号</label> <div class="layui-input-block"> <input type="text" name="tzsbh" lay-verify="required" autocomplete="off" placeholder="请输入录取通知书编号" class="layui-input"> </div> </div> <div class="layui-form-item"> <button class="layui-btn xy-right" lay-submit="" lay-filter="login"><i class="layui-icon layui-icon-user">&nbsp;</i>登 陆</button> </div> </form> </div> <script> layui.use("form", function(){ var $ = layui.jquery,form = layui.form; form.on("submit(login)", function(data){ data.field.flag = "login";  $.ajax({ type: "POST", url: "./api/api.php", data: data.field, dataType: "json", success: function(data){ if(data.tips == "Success"){ $(".login").hide(); $(".logout").show(); $("str").html(data.result); layer.closeAll(); layer.msg("重新登陆成功！", {icon: 1}); } else { layer.msg(data.tips, {icon: 0});  } } });   return false; }); }); </script>'
            });
            layer.msg("登陆超时！请不要刷新页面，重新登陆后可继续填写！", {icon: 0});
          } else {
            layer.msg(data.tips, {icon: 0}); 
          }
        }
    });
    return false;
  });

  //显示增加一项“家庭主要成员情况”
  $("#add_jtcy_form").click(function(){
    if(jtcy_num < 10){
      $("#jtcy_form").show();
      $("#add_jtcy_form").hide(); 
    } else {
      layer.msg("最多填写10条家庭主要成员情况！", {icon: 0}); 
    }
    return false;
  });

  //提交一项“家庭主要成员情况”
  form.on("submit(add_jtcy)", function(data){
    data.field.flag = "Add_jtcy";
    $.ajax({
        type: "POST",
        url: "./api/api.php",
        data: data.field,
        dataType: "json",
        success: function(data){
          if(data.tips == "Success"){
            layer.msg("保存成功！", {icon: 1});
            form.val('ybd-form-jtcy', {
              "xm": ""
              ,"nl": ""
              ,"ch": ""
              ,"jkzk": ""
              ,"whcd": ""
              ,"gzdw": ""
              ,"zy": ""
              ,"zw": ""
              ,"nsr": ""
              ,"lxdh": ""
              ,"bz": ""
            });
            $("#jtcy_form").hide();
            $("#add_jtcy_form").show();
            //重新加载家庭成员表格
            Load_jtcy();
            ybdzt = 1;
          } else {
            layer.msg(data.tips, {icon: 0}); 
          }
        }
    });
    /*layer.alert(JSON.stringify(data.field), {
      title: '最终的提交信息'
    })*/
    return false;
  });

  //删除一项“家庭主要成员情况”
  $(document).on("click","#Del_jtcy",function(e){
    layer.confirm('确定删除？',{icon: 3, title:'提示'}, function(index, layero){
      //提交删除
      $.ajax({
        type: "POST",
        url: "./api/api.php",
        data: {flag:'Del_jtcy', id:$(e.target).attr("value")},
        dataType: "json",
        success: function(data){
          if(data.tips == "Success"){
            layer.msg("删除成功！", {icon: 1});
            Load_jtcy();
          } else {
            layer.msg(data.tips, {icon: 0}); 
          }
        }
      });
    });
  });

  //显示增加一项“学习简历”
  $("#add_xxjl_form").click(function(){
    if(xxjl_num < 10){
      $("#xxjl_form").show();
      $("#add_xxjl_form").hide();  
      laydate.render({
        elem: '#date1'
      });
      laydate.render({
        elem: '#date2'
      });
    } else {
      layer.msg("最多填写10条学习简历！", {icon: 0}); 
    }
    return false;
  });

  //提交一项“学习简历”
  form.on("submit(add_xxjl)", function(data){
    data.field.flag = "Add_xxjl";
    $.ajax({
        type: "POST",
        url: "./api/api.php",
        data: data.field,
        dataType: "json",
        success: function(data){
          if(data.tips == "Success"){
            layer.msg("保存成功！", {icon: 1});
            form.val('ybd-form-xxjl', {
              "qsrq": ""
              ,"jzrq": ""
              ,"byxx": ""
              ,"drzw": ""
              ,"zmr": ""
            });
            $("#xxjl_form").hide();
            $("#add_xxjl_form").show();            
            //重新加载家庭成员表格
            Load_xxjl();
          } else {
            layer.msg(data.tips, {icon: 0}); 
          }
        }
    });
    return false;
  });

  //删除一项“学习简历”
  $(document).on("click","#Del_xxjl",function(e){
    layer.confirm('确定删除？',{icon: 3, title:'提示'}, function(index, layero){
      //提交删除
      $.ajax({
        type: "POST",
        url: "./api/api.php",
        data: {flag:'Del_xxjl', id:$(e.target).attr("value")},
        dataType: "json",
        success: function(data){
          if(data.tips == "Success"){
            layer.msg("删除成功！", {icon: 1});
            Load_xxjl();
          } else {
            layer.msg(data.tips, {icon: 0}); 
          }
        }
      });
    });
  });

  //显示增加一项“社会实践”
  $("#add_shsj_form").click(function(){
    $("#shsj_form").show();
    $("#add_shsj_form").hide();
    laydate.render({
      elem: '#date3'
    });
    laydate.render({
      elem: '#date4'
    });
    return false;
  });

  //监听“社会实践”上传
  var index = null;
  var object = null;
  upload.render({
    elem: '#shsj_upload_image'
    ,accept: 'image'
    ,acceptMime: 'image/*'
    ,url: './api/upload_img.php'
    ,before: function(obj){ //obj参数包含的信息，跟 choose回调完全一致，可参见上文。
      object = obj;
      index = layer.load(); //上传loading
    }
    ,done: function(res){
      layer.close(index);
      if(res.status == "Success"){
        layer.msg('上传成功！', {icon: 1}); 
        $("ybd-upload-img").hide();
        $("#shzj_zmcl").val(res.result.File_Name); //文件名复制到文本框
        object.preview(function(index, file, result){
          $(".ybd-upload-image").attr('src', result); //图片链接（base64）
          $(".ybd-upload-image").show();
        });
        } else {
          layer.msg(res.status, {icon: 0}); 
        }
    }
  });

  //提交一项“社会实践”
  form.on("submit(add_shsj)", function(data){
    data.field.flag = "Add_shsj";
    $.ajax({
        type: "POST",
        url: "./api/api.php",
        data: data.field,
        dataType: "json",
        success: function(data){
          if(data.tips == "Success"){
            layer.msg("保存成功！", {icon: 1});
            form.val('ybd-form-shsj', {
              "hdmc": ""
              ,"drjs": ""
              ,"zmcl": ""
              ,"qsrq": ""
              ,"jzrq": ""
              ,"zzdw": ""
              ,"bz": ""
            });
            $("#shsj_form").hide();
            $("#add_shsj_form").show();  
            $(".ybd-upload-image").hide();   
            $("ybd-upload-img").show();
            //重新加载家庭成员表格
            Load_shsj();
          } else {
            layer.msg(data.tips, {icon: 0}); 
          }
        }
    });
    return false;
  });

  //删除一项“社会实践”
  $(document).on("click","#Del_shsj",function(e){
    layer.confirm('确定删除？',{icon: 3, title:'提示'}, function(index, layero){
      //提交删除
      $.ajax({
        type: "POST",
        url: "./api/api.php",
        data: {flag:'Del_shsj', id:$(e.target).attr("value")},
        dataType: "json",
        success: function(data){
          if(data.tips == "Success"){
            layer.msg("删除成功！", {icon: 1});
            Load_shsj();
          } else {
            layer.msg(data.tips, {icon: 0}); 
          }
        }
      });
    });
  });

  //显示增加一项“获奖情况”
  $("#add_hjqk_form").click(function(){
    $("#hjqk_form").show();
    $("#add_hjqk_form").hide();
    laydate.render({
      elem: '#date5'
    });
    return false;
  });

  //监听“获奖情况”上传
  var index = null;
  var object = null;
  upload.render({
    elem: '#hjqk_upload_image'
    ,accept: 'image'
    ,acceptMime: 'image/*'
    ,url: './api/upload_img.php'
    ,before: function(obj){ //obj参数包含的信息，跟 choose回调完全一致，可参见上文。
      object = obj;
      index = layer.load(); //上传loading
    }
    ,done: function(res){
      layer.close(index);
      if(res.status == "Success"){
        layer.msg('上传成功！', {icon: 1}); 
        $("ybd-upload-img").hide();
        $("#hjqk_zmcl").val(res.result.File_Name); //文件名复制到文本框
        object.preview(function(index, file, result){
          $(".ybd-upload-image").attr('src', result); //图片链接（base64）
          $(".ybd-upload-image").show();
        });
        } else {
          layer.msg(res.status, {icon: 0}); 
        }
    }
  });

  //提交一项“获奖情况”
  form.on("submit(add_hjqk)", function(data){
    data.field.flag = "Add_hjqk";
    $.ajax({
        type: "POST",
        url: "./api/api.php",
        data: data.field,
        dataType: "json",
        success: function(data){
          if(data.tips == "Success"){
            layer.msg("保存成功！", {icon: 1});
            form.val('ybd-form-hjqk', {
              "jxmc": ""
              ,"jxlb": ""
              ,"zmcl": ""
              ,"hjsj": ""
              ,"zzdw": ""
              ,"hjdj": ""
              ,"bz": ""
            });
            $("#hjqk_form").hide();
            $("#add_hjqk_form").show();  
            $(".ybd-upload-image").hide();   
            $("ybd-upload-img").show();
            //重新加载家庭成员表格
            Load_hjqk();
          } else {
            layer.msg(data.tips, {icon: 0}); 
          }
        }
    });
    return false;
  });

  //删除一项“获奖情况”
  $(document).on("click","#Del_hjqk",function(e){
    layer.confirm('确定删除？',{icon: 3, title:'提示'}, function(index, layero){
      //提交删除
      $.ajax({
        type: "POST",
        url: "./api/api.php",
        data: {flag:'Del_hjqk', id:$(e.target).attr("value")},
        dataType: "json",
        success: function(data){
          if(data.tips == "Success"){
            layer.msg("删除成功！", {icon: 1});
            Load_hjqk();
          } else {
            layer.msg(data.tips, {icon: 0}); 
          }
        }
      });
    });
  });

  function PageReLoad(step = null) {
    if (step != null) {
        ybdzt = step;
    } else {
        $.ajax({
            type: "POST",
            async:false, //设置ajax为非异步（同步）执行 
            url: "./api/api.php",
            data: {
                flag: "PageReLoad"
            },
            dataType: "json",
            success: function(data) {
                if (data.tips == "Success") {
                    ybdzt = data.result.ybdzt;
                } else if (data.tips == "Not_Logged_In") {
                    //弹出登陆窗
                    layer.open({
                      type: 1,
                      closeBtn: 0,
                      shade: [1, '#393D49'],
                      title: "登陆",
                      area: '520px',
                      content: '<link rel="stylesheet" href="./css/login.css">  <div class="xy-login"><div class="xy-title">忻州师范学院<c style="color: #0093ffd4;">智慧迎新</c></div> <form class="layui-form layui-form-pane" action=""> <div class="layui-form-item"> <label class="layui-form-label">身份证号</label> <div class="layui-input-block"> <input type="text" name="sfzh" lay-verify="required|identity" autocomplete="off" placeholder="请输入身份证号" class="layui-input"> </div> </div> <div class="layui-form-item"> <label class="layui-form-label">通知书号</label> <div class="layui-input-block"> <input type="text" name="tzsbh" lay-verify="required" autocomplete="off" placeholder="请输入录取通知书编号" class="layui-input"> </div> </div> <div class="layui-form-item"> <button class="layui-btn xy-right" lay-submit="" lay-filter="login"><i class="layui-icon layui-icon-user">&nbsp;</i>登 陆</button> </div> </form> </div> <script> layui.use("form", function(){ var $ = layui.jquery,form = layui.form; form.on("submit(login)", function(data){ data.field.flag = "login";  $.ajax({ type: "POST", url: "./api/api.php", data: data.field, dataType: "json", success: function(data){ if(data.tips == "Success"){ $(".login").hide(); $(".logout").show(); $("str").html(data.result); layer.closeAll(); layer.msg("登陆成功！", {icon: 1}); setTimeout(function(){window.location.reload();},1000) } else { layer.msg(data.tips, {icon: 0});  } } });   return false; }); }); </script>'
                    });
                    ybdzt = data.tips;
                } else {
                    layer.msg(data.tips, {
                        icon: 0
                    });
                }
            }
        });
    }
    if (ybdzt == 1) {
        $.ajax({
            type: "POST",
            url: "./api/api.php",
            data: {
                flag: "Get_Address"
            },
            dataType: "json",
      			beforeSend: function(){
          	        layer.load(1);
          	},
            success: function(data) {
                if (data.tips == "Success") {
					
                    //动态生成生源所在地Select内容
                    for (key in data.result) {
                        $("#Address1").append('<option value="' + data.result[key].syszd + '">' + data.result[key].syszd + '</option>');
                        $("#Address2").append('<option value="' + data.result[key].syszd + '">' + data.result[key].syszd + '</option>');
                    }
                    //刷新表单渲染
                    form.render('select');
                    //取回已填写的表单内容
                    $.ajax({
                        type: "POST",
                        url: "./api/api.php",
                        data: {
                            flag: "Get_grxx"
                        },
                        dataType: "json",
                        success: function(data) {
                            //给姓名元素赋值
                            $("xm").text(data.result.xm);
                            //非空则给表单初始赋值
                            if (data.tips != "Empty") {
                            	jbxx_is_save = true;
                                form.val('ybd-form-jbxx', {
                                    "sg": data.result.sg,
                                    "tz": data.result.tz,
                                    "qq": data.result.qq,
                                    "jkzk": data.result.jkzk,
                                    "brdh": data.result.lxdh,
                                    "email": data.result.email,
                                    "byyx": data.result.byyx,
                                    "hklx": data.result.jthk,
                                    "jtrks": data.result.jtrks,
                                    "syszd": data.result.syszd,
                                    "jtdh": data.result.jtlxdh,
                                    "jtyb": data.result.jtyzbm,
                                    "srly": data.result.jtsrly,
                                    "ysr": data.result.jtysr,
                                    "rjysr": data.result.rjysr,
                                    "jtdz1": data.result.jtdz.split(" | ")[0],
                                    "jtdz2": data.result.jtdz.split(" | ")[1],
                                    "jtywsj": data.result.jtywsj,
                                    "jtcysyqk": data.result.jtcysyqk,
                                    "jtqzqk": data.result.jtqzqk,
                                    "qtqk": data.result.qtqk,
                                    "tc": data.result.tc,
                                    "xqah": data.result.xqah,
                                    "zygh": data.result.zygh
                                });
                                //给复选框初始赋值
                                var unitType = data.result.jtlx.split(" | ");
                                for (var j = 0; j < unitType.length; j++) {
                                    var unitTypeCheckbox = $("input[name='jtlx[]']");
                                    for (var i = 0; i < unitTypeCheckbox.length; i++) {
                                        if (unitTypeCheckbox[i].title == unitType[j]) {
                                            //unitTypeCheckbox[i].value=unitType[j];
                                            unitTypeCheckbox[i].checked = true;
                                        }
                                    }
                                }
                                //刷新复选框
                                form.render("checkbox");
                            }/* else { //上一步需求的参数Empty 导致Tips弹出异常，暂时移除Tips
                                layer.msg(data.tips, {icon: 0});
                            }*/
                        }
                    });
                    //加载家庭成员表格
                    Load_jtcy();
                    //加载学习简历表格
                    Load_xxjl();
                    //加载社会实践表格
                    Load_shsj();
                    //加载获奖情况表格
                    Load_hjqk();
                    $("#Step1-form").show();
                    $("#Step2-form").hide();
                    $("#Step3-form").hide();
                    $("#Step4-form").hide();
                    $("#Step5-form").hide();
                    $("#Step1-finish").hide();
                    $("#Step1").hide();
					layer.closeAll('loading'); 
                } else {
                    layer.msg(data.tips, {
                        icon: 0
                    });
                }
            }
        });
    } else if (ybdzt == 2) {
        $("#Step1").hide();
        $("#Step2").hide();
        $("#Step3").show();
        $("#Step4").show();
        $("#Step1-finish").show();
        $("#Step2-finish").hide();
        $("#Step1-form").hide();
        $("#Step2-form").show();
        $("#Step3-form").hide();
        $("#Step4-form").hide();
        element.progress('progress', '25%');
    } else if (ybdzt == 3) {
        $("#Step1").hide();
        $("#Step2").hide();
        $("#Step3").hide();
        $("#Step4").show();
        $("#Step1-finish").show();
        $("#Step2-finish").show();
        $("#Step3-finish").hide();
        $("#Step1-form").hide();
        $("#Step2-form").hide();
        $("#Step3-form").show();
        $("#Step4-form").hide();
        element.progress('progress', '50%');
    } else if (ybdzt == 4) {
        $("#Step1").hide();
        $("#Step2").hide();
        $("#Step3").hide();
        $("#Step4").hide();
        $("#Step1-finish").show();
        $("#Step2-finish").show();
        $("#Step3-finish").show();
        $("#Step4-finish").hide();
        $("#Step1-form").hide();
        $("#Step2-form").hide();
        $("#Step3-form").hide();
        $("#Step4-form").show();
        element.progress('progress', '75%');
    } else if (ybdzt == 5) {
        $("#Step1").hide();
        $("#Step2").hide();
        $("#Step3").hide();
        $("#Step4").hide();
        $("#Step5").hide();
        $("#Step1-finish").show();
        $("#Step2-finish").show();
        $("#Step3-finish").show();
        $("#Step4-finish").show();
        $("#Step1-form").hide();
        $("#Step2-form").hide();
        $("#Step3-form").hide();
        $("#Step4-form").hide();
        $("#Step5-form").show();
        element.progress('progress', '100%');
        $.ajax({
          type: "POST",
          url: "./api/api.php",
          data: {
              flag: 'Load_Step5'
          },
          dataType: "json",
          success: function(data) {
              if (data.tips == "Success") {
                  $("xm").text(data.result.xm);
                  $("tbody").html('<tr><td>'+data.result.xq+'</td><td>'+data.result.xh+'</td><td>'+data.result.bj+'</td><td>'+data.result.bjjc+'</td><td>'+data.result.fdy+'</td><td>'+data.result.fdy_lxfs+'</td></tr>');
              } else {
                  layer.msg(data.tips, {icon: 0});
              }
          }
        });
    } else if (ybdzt == "Not_Logged_In"){
      return ;
    } else {
      layer.msg("状态异常！请与忻州师范学院招生就业指导处联系更正！状态码：" + ybdzt, {icon: 0});
    }
  }

  //获取家庭成员列表并刷新表格
  function Load_jtcy(){
    table.render({
      elem: '#jtcy'
      ,method: 'POST'
      ,url:'./api/api.php'
      ,cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
      ,where: {flag:"Load_jtcy"}
      ,parseData: function(res){ //res 即为原始返回的数据
        //全局保存家庭成员条数
        jtcy_num = res.result.total
        return {
          "code": res.result.code, //解析接口状态
          "msg": res.result.message, //解析提示文本
          "count": res.result.total, //解析数据长度
          "data": res.result.item //解析数据列表
        };
      },cols: [[
        {field:'id', title:'操作', width:65, templet: '#jtcyTpl', unresize: true}
        ,{field:'xm', title: '姓名', sort: true}
        ,{field:'nl', title: '年龄'} 
        ,{field:'ch', title: '称呼'} 
        ,{field:'jkzk', title: '健康状况'} 
        ,{field:'whcd', title: '文化程度'} 
        ,{field:'gzdw', title: '工作单位'} 
        ,{field:'zy', title: '职业'} 
        ,{field:'zw', title: '职务'} 
        ,{field:'nsr', title: '年收入'} 
        ,{field:'lxdh', title: '联系电话'} 
        ,{field:'bz', title: '备注'} 
      ]]
    });
  }

  //获取学习简历列表并刷新表格
  function Load_xxjl(){
    table.render({
      elem: '#xxjl'
      ,method: 'POST'
      ,url:'./api/api.php'
      ,cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
      ,where: {flag:"Load_xxjl"}
      ,parseData: function(res){ //res 即为原始返回的数据
        //全局保存家庭成员条数
        xxjl_num = res.result.total
        return {
          "code": res.result.code, //解析接口状态
          "msg": res.result.message, //解析提示文本
          "count": res.result.total, //解析数据长度
          "data": res.result.item //解析数据列表
        };
      },cols: [[
        {field:'id', title:'操作', width:65, templet: '#xxjlTpl', unresize: true}
        ,{field:'qsrq', title: '自何年何月', sort: true}
        ,{field:'jzrq', title: '至何年何月'} 
        ,{field:'byxx', title: '毕业学校'} 
        ,{field:'drzw', title: '担任职务'} 
        ,{field:'zmr', title: '证明人'} 
      ]]
    });
  }

  //获取社会实践列表并刷新表格
  function Load_shsj(){
    table.render({
      elem: '#shsj'
      ,method: 'POST'
      ,url:'./api/api.php'
      ,cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
      ,where: {flag:"Load_shsj"}
      ,parseData: function(res){ //res 即为原始返回的数据
        //全局保存社会实践条数
        shsj_num = res.result.total
        return {
          "code": res.result.code, //解析接口状态
          "msg": res.result.message, //解析提示文本
          "count": res.result.total, //解析数据长度
          "data": res.result.item //解析数据列表
        };
      },cols: [[
        {field:'id', title:'操作', width:65, templet: '#shsjTpl', unresize: true}
        ,{field:'hdmc', title: '活动名称'} 
        ,{field:'drjs', title: '担任角色'} 
        ,{field:'qsrq', title: '起始日期', sort: true}
        ,{field:'jzrq', title: '结束日期'} 
        ,{field:'zzdw', title: '组织单位'} 
        ,{field:'bz', title: '备注'} 
      ]]
    });
  }

  //获取获奖情况列表并刷新表格
  function Load_hjqk(){
    table.render({
      elem: '#hjqk'
      ,method: 'POST'
      ,url:'./api/api.php'
      ,cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
      ,where: {flag:"Load_hjqk"}
      ,parseData: function(res){ //res 即为原始返回的数据
        //全局保存社会实践条数
        hjqk_num = res.result.total
        return {
          "code": res.result.code, //解析接口状态
          "msg": res.result.message, //解析提示文本
          "count": res.result.total, //解析数据长度
          "data": res.result.item //解析数据列表
        };
      },cols: [[
        {field:'id', title:'操作', width:65, templet: '#hjqkTpl', unresize: true}
        ,{field:'jxmc', title: '奖项名称'} 
        ,{field:'jxjb', title: '奖项级别'} 
        ,{field:'hjsj', title: '获奖时间', sort: true}
        ,{field:'zzdw', title: '组织单位'} 
        ,{field:'hjdj', title: '获奖等级'} 
        ,{field:'bz', title: '备注'} 
      ]]
    });
  }

  //自定义验证规则
  form.verify({
    shzj_zmcl: function(value){
      if(value.length < 10){
        return '请上传社会实践活动证明材料！';
      }
    },
    hjqk_zmcl: function(value){
      if(value.length < 10){
        return '请上传社会实践活动证明材料！';
      }
    },
    grxx_zygh: function(value){
      if(value.length < 50){
        return '职业规划请不要填写少于50字！';
      }
      if(value.length > 2000){
        return '职业规划请不要填写超过2000字！';
      }
    },
  });

  //Step1完成
  $(document).on("click","#Finish_Step1",function(e){
    layer.confirm('确定已经完成基本信息？',{icon: 3, title:'提示'}, function(index, layero){
      //提交删除
      if(!jbxx_is_save){
        layer.msg("请保存“个人及家庭信息”后再点击“完成填写”！", {icon: 0});
      } else if(jtcy_num < 1){
        layer.msg("请至少填写一条“家庭主要成员情况”后再点击“完成填写”！", {icon: 0});
      } else if(xxjl_num < 1){
        layer.msg("请至少填写一条“学生学习简历”后再点击“完成填写”！", {icon: 0});
      } else {
        $.ajax({
          type: "POST",
          url: "./api/api.php",
          data: {flag:'Finish_Step1', id:$(e.target).attr("value")},
          dataType: "json",
          success: function(data){
            if(data.tips == "Success"){
              layer.msg("提交成功！", {icon: 1});
              //关闭step1 展开step2
              PageReLoad();
            } else {
              layer.msg(data.tips, {icon: 0}); 
            }
          }
        });
      }
    });
  });

  //Step1重新填写
  $(document).on("click","#Rewirt_Step1",function(e){
    layer.confirm('确定重新填写基本信息？',{icon: 3, title:'提示'}, function(index, layero){
      PageReLoad(1);
      layer.closeAll();
    });
  });

  /** 
   * Step2
   */
  $(document).on("click","#Show_Step2_Frame",function(e){
    $.ajax({
        type: "POST",
        url: "./api/api.php",
        data: {flag:'Load_jzjy'},
        dataType: "json",
        success: function(data){
        if(data.tips == "Success"){
          layer.confirm('请您的家长扫描弹出窗口中的二维码！',{btn: ['已扫描', '去扫描'],icon: 6, title:'提示'}, function(index, layero){
            //提交状态
            layer.closeAll();
            $.ajax({
              type: "POST",
              url: "./api/api.php",
              data: {flag:'Finish_Step2'},
              dataType: "json",
              success: function(data){
                if(data.tips == "Success"){
                  PageReLoad();
                } else {
                  layer.msg(data.tips, {icon: 0}); 
                }
			  }
            });
          });
          //弹出窗口
          layer.open({
            type: 1,
            title: "家长寄语",
            area: '400px',
            content: '<img src="jjzy_background_min.jpg" style="height: 410px;width: 400px;"><img src="'+data.result+'" style="height: 150px;width: 150px;position: absolute;left: 125px;top: 225px;background:white;">'
          });
        } else {
          layer.msg(data.tips, {icon: 0}); 
        }
      }
    });
  });

  //Step2重新填写
  $(document).on("click","#Rewirt_Step2",function(e){
    layer.confirm('确定重新填写家长寄语？',{icon: 3, title:'提示'}, function(index, layero){
      PageReLoad(2);
      layer.closeAll();
    });
  });

  /** 
   * Step3
   */
  $(document).on("click","#Show_Step3_Frame",function(e){
    layer.confirm('请填写！', {btn: ['已填写', '去填写'], icon: 6,title: '提示'},function(index, layero) {
        //提交状态
        layer.closeAll();
        $.ajax({
            type: "POST",
            url: "./api/api.php",
            data: {
                flag: 'Finish_Step3'
            },
            dataType: "json",
            success: function(data) {
                if (data.tips == "Success") {
                    PageReLoad();
                } else {
                    layer.msg(data.tips, {
                        icon: 0
                    });
                }
            }
        });
    });
    //弹出窗口(iFrame页面)
    /*layer.open({
        type: 2,
        title: "中国电信校园卡（校园一卡通）",
        area: ['455px','740px'],
        content: 'http://a.189.cn/Jegbca'
    });*/
	//弹出窗口(二维码)
    layer.open({
        type: 1,
        title: "请您扫描下方二维码进行办理",
        area: '600px',
        content: '<img src="dwz.png" style="height: 300px;width: 600px;">'
    });
  });

  //Step3重新填写
  $(document).on("click","#Rewirt_Step3",function(e){
    layer.confirm('确定重新填写中国电信校园卡（校园一卡通）？',{icon: 3, title:'提示'}, function(index, layero){
      PageReLoad(3);
      layer.closeAll();
    });
  });

  /** 
   * Step4
   */
  $(document).on("click","#Show_Step4_Frame",function(e){
    layer.confirm('请填写专业满意度调查问卷！', {btn: ['已填写', '去填写'], icon: 6,title: '提示'},function(index, layero) {
        //提交状态
        layer.closeAll();
        $.ajax({
            type: "POST",
            url: "./api/api.php",
            data: {
                flag: 'Finish_Step4'
            },
            dataType: "json",
            success: function(data) {
                if (data.tips == "Success") {
                    PageReLoad();
                } else {
                    layer.msg(data.tips, {icon: 0});
                }
            }
        });
    });
    //弹出窗口
    layer.open({
        type: 1,
        title: "专业满意度调查问卷",
        area: ['560px','590px'],
        content: "<iframe src='https://www.wjx.cn/jq/27476724,i,t.aspx?width=550&source=iframe' width='560' height='540' frameborder='0' style='overflow:auto'></iframe>"
    });
  });

  //Step4重新填写
  $(document).on("click","#Rewirt_Step4",function(e){
    layer.confirm('确定重新填写专业满意度调查问卷？',{icon: 3, title:'提示'}, function(index, layero){
      PageReLoad(4);
      layer.closeAll();
    });
  });

  /** 
   * Step5
   * 暂无操作
   */
}); 