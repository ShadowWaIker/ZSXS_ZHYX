<?php 
session_start();

if(isset($_GET["id"])){
    if($_GET["flag"] == "like"){
        if(empty($_SESSION["flag"]) && empty($_COOKIE["flag"])){
            $_SESSION["flag"] = $_GET["id"];
            setcookie("flag",$_GET["id"]);
            echo "<script>alert('点赞成功！')</script>";
        
        } else {
            echo "<script>alert('您已经给".$_SESSION['flag']."号志愿者点过赞！！');window.location.href='index.php?id=".$_GET["id"]."';</script>";
            //echo "您已经给".$_SESSION['flag']."号志愿者点过赞！";
        }
    } else {
        //其他操作
    }
} else {
    die("参数有误！");
}
/*
echo "<br>";
var_dump($_GET);
echo "<br>";
var_dump($_COOKIE);
*/
?>


<!DOCTYPE html>
<html lang="zh-CN">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
<title>迎新志愿者丨智慧迎新丨忻州师范学院</title>
<link rel="stylesheet" href="../jz/css/style.css">
<link rel="stylesheet" href="../jz/css/app.css">
<link rel="stylesheet" href="../jz/css/loading.css">
<script src="http://libs.baidu.com/jquery/1.10.2/jquery.min.js"></script>
<script src="../jz/js/jquery.validate.min.js?var1.14.0"></script>
<script src="../jz/js/common.js"></script>
<body>

<div class="login-container">
	<h1>忻州师范学院</h1>
	<div class="connect">
		<p>智慧迎新&nbsp;|&nbsp;迎新志愿者</p>
	</div>
	<div class="content">
		我是<?php echo $_GET["id"];?>号志愿者，请给我的服务点赞！
		<!-- <div class="skype-loader" style="margin-top: 40%;">
			<div class="dot">
				<div class="first"></div>
			</div>
			<div class="dot"></div>
			<div class="dot"></div>
			<div class="dot"></div>
		</div> -->
		<div>
			<button onclick="window.location.href='index.php?id=<?php echo $_GET["id"];?>&flag=like'" type="button" class="button-g">赞一下！</button>
		</div>
	</div>
	<div style="height:30px;padding-bottom: 80px;"></div>
	<div class="footer">
		<div class="footer-zsxs">
			<image src="../jz/images/logo-icon-w.png"></image>
			<p>掌上忻师</p>
		</div>
		<div class="footer-other">招生就业指导处 · 大学生就业创业小组</div>
		<div class="footer-other">Copyright © 2016-2018 XZTC. All Rights Reserved</div>
	</div>
</div>
</body>
</html>