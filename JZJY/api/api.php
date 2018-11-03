<?php
/** Powerd by RebetaStudio
 *
 *  http://www.rebeta.cn
 *
 * 20180829
 *
 */

session_start();
require_once './public.php';
$pdo = new DataBase;
$lqcxk = $pdo->mysqlconn(MySqlDSN_lqcxk);
$datacenter = $pdo->mysqlconn(MySqlDSN_DataCenter);
$wechat = $pdo->mysqlconn(MySqlDSN_WeChat);
$tips = "";
$html = NULL;
$year = date("Y");

if(empty($_SESSION['user'])){
    //未登录
    if($_POST["flag"] == "login"){
        $sfzh = dowith_sql($_POST["sfzh"]);
        $sql = "SELECT sfzh, tzsbh FROM tdd WHERE sfzh = '".$sfzh."' AND nf = '".$year."';";
        $rs = $lqcxk->query($sql);
        $info = $rs->fetch(PDO::FETCH_ASSOC);
        if($_POST["tzsbh"] === $info["tzsbh"]){
            //进行预注册操作，提取已有信息建档
            $sql = "SELECT * FROM XJ_XS_JBXX WHERE sfzh = '".$sfzh."'";
            $rs = $datacenter->query($sql);
            $info = $rs->fetch(PDO::FETCH_ASSOC);
            if(empty($info["sfzh"])){
                //抽取信息
                $sql = "SELECT xh, ksh, tzsbh, xm, bj, zymc, kslx, xzh FROM tdd WHERE sfzh = '".$sfzh."' AND nf = '".$year."';";
                $rs = $lqcxk->query($sql);
                $info1 = $rs->fetch(PDO::FETCH_ASSOC);
                $sql = "SELECT XBMC, CSNY, MZMC, ZZMMMC FROM T_TDD WHERE SFZH = '".$sfzh."' AND NF = '".$year."';";
                $rs = $lqcxk->query($sql);
                $info2 = $rs->fetch(PDO::FETCH_ASSOC);
                $sql = "SELECT xi FROM xzh WHERE xzh='".$info1["xzh"]."';";
                $rs = $lqcxk->query($sql);
                $info3 = $rs->fetch(PDO::FETCH_ASSOC);
                //拼接建档
                $sql = "INSERT INTO `DataCenter`.`XJ_XS_JBXX` (`xh`, `ksh`, `sfzh`, `tzsbh`, `xm`, `xb`, `csny`, `xi`, `zp_gk`, `zp_xj`, `zp_byz`, `bh`, `zymc`, `mz`, `kslx`, `zzmm`) VALUES ('".$info1["xh"]."', '".$info1["ksh"]."', '".$sfzh."', '".$info1["tzsbh"]."', '".$info1["xm"]."', '".$info2["XBMC"]."', '".$info2["CSNY"]."', '".$info3["xi"]."', '".$info1["ksh"]."', '".$info1["xh"]."', '".$sfzh."', '".$info1["bj"]."', '".$info1["zymc"]."', '".$info2["MZMC"]."', '".$info1["kslx"]."', '".$info2["ZZMMMC"]."');";
                $success = $datacenter->exec($sql);
                if($success){
                    $sql = "UPDATE tdd SET ybdzt = '1' WHERE sfzh = '".$sfzh."' AND nf = '".$year."';";
                    $success = $lqcxk->exec($sql);
                    if(!$success){
                        LogOut();
                        $tips = "更新标志失败！身份证号码：".$sfzh;
                    } else {
						$_SESSION['user'] = $sfzh;
						$res = NULL;
						$tips = "Success";
					}
                } else {
                    LogOut();
                    $tips = "初始化数据失败！";
                }
            } else {
				$_SESSION['user'] = $info["sfzh"];
				$res = NULL;
				$tips = "Success";
			}
        } else {
            $tips = "身份证号码或录取通知书编号不正确！";
        }
    } elseif($_POST["flag"] == "PageReLoad" || $_POST["flag"] == "Update_grxx"){
        $tips = "Not_Logged_In";
    } else {
        $tips = "参数有误！";
    }
} else {
    //已登录
    if($_POST["flag"] == "logout"){
        LogOut();
		$tips = "Success";
    } elseif($_POST["flag"] == "PageReLoad"){
        $sfzh = dowith_sql($_SESSION["user"]);
        $sql = "SELECT ybdzt FROM tdd WHERE sfzh = '".$sfzh."' AND nf = '".$year."';";
        $rs = $lqcxk->query($sql);
        $res = $rs->fetch(PDO::FETCH_ASSOC);
        $tips = "Success";
    } elseif($_POST["flag"] == "Get_Address"){
        $sfzh = dowith_sql($_SESSION["user"]);
        $sql = "SELECT syszd FROM DM_GB_SYSZD;";
        $rs = $datacenter->query($sql);
        $res = $rs->fetchall(PDO::FETCH_ASSOC);
        $tips = "Success";
    } elseif($_POST["flag"] == "Update_grxx"){
        $sfzh = dowith_sql($_SESSION["user"]);
        $sql = "UPDATE `DataCenter`.`XJ_XS_JBXX` SET `syszd`='".dowith_sql($_POST["syszd"])."', `sg`='".dowith_sql($_POST["sg"])."', `tz`='".dowith_sql($_POST["tz"])."', `qq`='".dowith_sql($_POST["qq"])."', `jkzk`='".dowith_sql($_POST["jkzk"])."', `email`='".dowith_sql($_POST["email"])."', `lxdh`='".dowith_sql($_POST["brdh"])."', `byyx`='".dowith_sql($_POST["byyx"])."', `tc`='".dowith_sql($_POST["tc"])."', `xqah`='".dowith_sql($_POST["xqah"])."', `zygh`='".dowith_sql($_POST["zygh"])."', `jtdz`='".dowith_sql($_POST["jtdz1"])." | ".dowith_sql($_POST["jtdz2"])."', `jtyzbm`='".dowith_sql($_POST["jtyb"])."', `jtlxdh`='".dowith_sql($_POST["jtdh"])."', `jtlx`='".implode(" | ",dowith_sql($_POST["jtlx"]))."', `jtrks`='".dowith_sql($_POST["jtrks"])."', `jthk`='".dowith_sql($_POST["hklx"])."', `jtsrly`='".dowith_sql($_POST["srly"])."', `jtnsr`='".(dowith_sql($_POST["ysr"])*12)."', `jtysr`='".dowith_sql($_POST["ysr"])."', `rjysr`='".dowith_sql($_POST["rjysr"])."', `jtywsj`='".dowith_sql($_POST["jtywsj"])."', `jtcysyqk`='".dowith_sql($_POST["jtcysyqk"])."', `jtqzqk`='".dowith_sql($_POST["jtqzqk"])."', `qtqk`='".dowith_sql($_POST["qtqk"])."', `bz`=NULL WHERE sfzh = '".$sfzh."';";
        $success = $datacenter->exec($sql);
        if($success){
            $tips = "Success";
        } else {
            $tips = "提交失败,请检查输入的内容是否合规！"; //$sql;
        }
    } elseif($_POST["flag"] == "Get_grxx"){
        $sfzh = dowith_sql($_SESSION["user"]);
        $sql = "SELECT `xm`, `syszd` , `jkzk`, `sg` , `tz` , `qq` , `email` , `lxdh` , `byyx` , `tc` , `xqah` , `zygh` , `jtdz` , `jtyzbm` , `jtlxdh` , `jtlx` , `jtrks` , `jthk` , `jtsrly` , `jtysr` , `rjysr` , `jtywsj` , `jtcysyqk` , `jtqzqk` , `qtqk` FROM XJ_XS_JBXX WHERE sfzh = '".$sfzh."';";
        $rs = $datacenter->query($sql);
        $res = $rs->fetch(PDO::FETCH_ASSOC);
        if(empty($res["email"])){
            $tips = "Empty";
        }
    } elseif($_POST["flag"] == "Add_jtcy"){
        $sfzh = dowith_sql($_SESSION["user"]);
        $sql = "SELECT xh FROM tdd WHERE sfzh = '".$sfzh."' AND nf = '".$year."';";
        $rs = $lqcxk->query($sql);
        $info = $rs->fetch(PDO::FETCH_ASSOC);
        $sql = "INSERT INTO `DataCenter`.`XJ_XS_JTCY` (`xh`, `xm`, `nl`, `ch`, `gzdw`, `whcd`, `zy`, `zw`, `nsr`, `jkzk`, `lxdh`, `bz`) VALUES ('".$info["xh"]."', '".dowith_sql($_POST["xm"])."', '".dowith_sql($_POST["nl"])."', '".dowith_sql($_POST["ch"])."', '".dowith_sql($_POST["gzdw"])."', '".dowith_sql($_POST["whcd"])."', '".dowith_sql($_POST["zy"])."', '".dowith_sql($_POST["zw"])."', '".dowith_sql($_POST["nsr"])."', '".dowith_sql($_POST["jkzk"])."', '".dowith_sql($_POST["lxdh"])."', '".dowith_sql($_POST["bz"])."');";
        $success = $datacenter->exec($sql);
        if($success){
            $tips = "Success";
        } else {
            $tips = "提交失败,请检查输入的内容是否合规！";
        }
    } elseif($_POST["flag"] == "Load_jtcy"){
        $sfzh = dowith_sql($_SESSION["user"]);
        $sql = "SELECT xh FROM tdd WHERE sfzh = '".$sfzh."' AND nf = '".$year."';";
        $rs = $lqcxk->query($sql);
        $info = $rs->fetch(PDO::FETCH_ASSOC);
        $sql = "SELECT * FROM XJ_XS_JTCY WHERE xh = '".$info["xh"]."' AND deleted = 'False';";
        $rs = $datacenter->query($sql);
        $info = $rs->fetchall(PDO::FETCH_ASSOC);
        $res = array("code"=>'0',"message"=>'',"total"=>count($info),"item"=>$info);
        $tips = "Success";
    } elseif($_POST["flag"] == "Del_jtcy"){
        $sfzh = dowith_sql($_SESSION["user"]);
        $sql = "SELECT xh FROM tdd WHERE sfzh = '".$sfzh."' AND nf = '".$year."';";
        $rs = $lqcxk->query($sql);
        $info = $rs->fetch(PDO::FETCH_ASSOC);
        $sql = "UPDATE XJ_XS_JTCY SET `deleted` = 'True' WHERE xh = '".$info["xh"]."' AND id = '".dowith_sql($_POST["id"])."';";
        $success = $datacenter->exec($sql);
        if($success){
            $tips = "Success";
        } else {
            $tips = "删除失败！";
        }
    } elseif($_POST["flag"] == "Add_xxjl"){
        $sfzh = dowith_sql($_SESSION["user"]);
        $sql = "SELECT xh FROM tdd WHERE sfzh = '".$sfzh."' AND nf = '".$year."';";
        $rs = $lqcxk->query($sql);
        $info = $rs->fetch(PDO::FETCH_ASSOC);
        $sql = "INSERT INTO `DataCenter`.`XJ_XS_XXJL` (`xh` ,`qsrq`, `jzrq`, `byxx`, `drzw`, `zmr`) VALUES ('".$info["xh"]."', '".dowith_sql($_POST["qsrq"])."', '".dowith_sql($_POST["jzrq"])."', '".dowith_sql($_POST["byxx"])."', '".dowith_sql($_POST["drzw"])."', '".dowith_sql($_POST["zmr"])."');";
        $success = $datacenter->exec($sql);
        if($success){
            $tips = "Success";
        } else {
            $tips = "提交失败,请检查输入的内容是否合规！";
        }
    } elseif($_POST["flag"] == "Load_xxjl"){
        $sfzh = dowith_sql($_SESSION["user"]);
        $sql = "SELECT xh FROM tdd WHERE sfzh = '".$sfzh."' AND nf = '".$year."';";
        $rs = $lqcxk->query($sql);
        $info = $rs->fetch(PDO::FETCH_ASSOC);
        $sql = "SELECT * FROM XJ_XS_XXJL WHERE xh = '".$info["xh"]."' AND deleted = 'False' ORDER BY qsrq ASC;";
        $rs = $datacenter->query($sql);
        $info = $rs->fetchall(PDO::FETCH_ASSOC);
        $res = array("code"=>'0',"message"=>'',"total"=>count($info),"item"=>$info);
        $tips = "Success";
    } elseif($_POST["flag"] == "Del_xxjl"){
        $sfzh = dowith_sql($_SESSION["user"]);
        $sql = "SELECT xh FROM tdd WHERE sfzh = '".$sfzh."' AND nf = '".$year."';";
        $rs = $lqcxk->query($sql);
        $info = $rs->fetch(PDO::FETCH_ASSOC);
        $sql = "UPDATE XJ_XS_XXJL SET `deleted` = 'True' WHERE xh = '".$info["xh"]."' AND id = '".dowith_sql($_POST["id"])."';";
        $success = $datacenter->exec($sql);
        if($success){
            $tips = "Success";
        } else {
            $tips = "删除失败！";
        }
    } elseif($_POST["flag"] == "Add_shsj"){
        $sfzh = dowith_sql($_SESSION["user"]);
        $sql = "SELECT xh FROM tdd WHERE sfzh = '".$sfzh."' AND nf = '".$year."';";
        $rs = $lqcxk->query($sql);
        $info = $rs->fetch(PDO::FETCH_ASSOC);
        $sql = "INSERT INTO `DataCenter`.`XJ_XS_SHSJ` (`xh` ,`hdmc`, `drjs`, `qsrq`, `jzrq`, `zzdw`, `zmcl`, `bz`) VALUES ('".$info["xh"]."', '".dowith_sql($_POST["hdmc"])."', '".dowith_sql($_POST["drjs"])."', '".dowith_sql($_POST["qsrq"])."', '".dowith_sql($_POST["jzrq"])."', '".dowith_sql($_POST["zzdw"])."', '".dowith_sql($_POST["zmcl"])."', '".dowith_sql($_POST["bz"])."');";
        $success = $datacenter->exec($sql);
        if($success){
            $tips = "Success";
        } else {
            $tips = "提交失败,请检查输入的内容是否合规！";
        }
    } elseif($_POST["flag"] == "Load_shsj"){
        $sfzh = dowith_sql($_SESSION["user"]);
        $sql = "SELECT xh FROM tdd WHERE sfzh = '".$sfzh."' AND nf = '".$year."';";
        $rs = $lqcxk->query($sql);
        $info = $rs->fetch(PDO::FETCH_ASSOC);
        $sql = "SELECT * FROM XJ_XS_SHSJ WHERE xh = '".$info["xh"]."' AND deleted = 'False' ORDER BY qsrq ASC;";
        $rs = $datacenter->query($sql);
        $info = $rs->fetchall(PDO::FETCH_ASSOC);
        $res = array("code"=>'0',"message"=>'',"total"=>count($info),"item"=>$info);
        $tips = "Success";
    } elseif($_POST["flag"] == "Del_shsj"){
        $sfzh = dowith_sql($_SESSION["user"]);
        $sql = "SELECT xh FROM tdd WHERE sfzh = '".$sfzh."' AND nf = '".$year."';";
        $rs = $lqcxk->query($sql);
        $info = $rs->fetch(PDO::FETCH_ASSOC);
        $sql = "UPDATE XJ_XS_SHSJ SET `deleted` = 'True' WHERE xh = '".$info["xh"]."' AND id = '".dowith_sql($_POST["id"])."';";
        $success = $datacenter->exec($sql);
        if($success){
            $tips = "Success";
        } else {
            $tips = "删除失败！";
        }
    } elseif($_POST["flag"] == "Add_hjqk"){
        $sfzh = dowith_sql($_SESSION["user"]);
        $sql = "SELECT xh FROM tdd WHERE sfzh = '".$sfzh."' AND nf = '".$year."';";
        $rs = $lqcxk->query($sql);
        $info = $rs->fetch(PDO::FETCH_ASSOC);
        $sql = "INSERT INTO `DataCenter`.`XJ_XS_HJQK` (`xh` ,`jxmc`, `jxjb`, `hjsj`, `zzdw`, `hjdj`, `zmcl`, `bz`) VALUES ('".$info["xh"]."', '".dowith_sql($_POST["jxmc"])."', '".dowith_sql($_POST["jxjb"])."', '".dowith_sql($_POST["hjsj"])."', '".dowith_sql($_POST["zzdw"])."', '".dowith_sql($_POST["hjdj"])."', '".dowith_sql($_POST["zmcl"])."', '".dowith_sql($_POST["bz"])."');";
        $success = $datacenter->exec($sql);
        if($success){
            $tips = "Success";
        } else {
            $tips = "提交失败,请检查输入的内容是否合规！";
        }
    } elseif($_POST["flag"] == "Load_hjqk"){
        $sfzh = dowith_sql($_SESSION["user"]);
        $sql = "SELECT xh FROM tdd WHERE sfzh = '".$sfzh."' AND nf = '".$year."';";
        $rs = $lqcxk->query($sql);
        $info = $rs->fetch(PDO::FETCH_ASSOC);
        $sql = "SELECT * FROM XJ_XS_HJQK WHERE xh = '".$info["xh"]."' AND deleted = 'False' ORDER BY hjsj ASC;";
        $rs = $datacenter->query($sql);
        $info = $rs->fetchall(PDO::FETCH_ASSOC);
        $res = array("code"=>'0',"message"=>'',"total"=>count($info),"item"=>$info);
        $tips = "Success";
    } elseif($_POST["flag"] == "Del_hjqk"){
        $sfzh = dowith_sql($_SESSION["user"]);
        $sql = "SELECT xh FROM tdd WHERE sfzh = '".$sfzh."' AND nf = '".$year."';";
        $rs = $lqcxk->query($sql);
        $info = $rs->fetch(PDO::FETCH_ASSOC);
        $sql = "UPDATE XJ_XS_HJQK SET `deleted` = 'True' WHERE xh = '".$info["xh"]."' AND id = '".dowith_sql($_POST["id"])."';";
        $success = $datacenter->exec($sql);
        if($success){
            $tips = "Success";
        } else {
            $tips = "删除失败！";
        }
    } elseif($_POST["flag"] == "Finish_Step1"){
        $sfzh = dowith_sql($_SESSION["user"]);
        $sql = "SELECT ybdzt FROM tdd WHERE sfzh = '".$sfzh."' AND nf = '".$year."';";
        $rs = $lqcxk->query($sql);
        $info = $rs->fetch(PDO::FETCH_ASSOC);
        if($info["ybdzt"] < 2){
            //更新状态
            $sfzh = dowith_sql($_SESSION["user"]);
            $sql = "UPDATE tdd SET `ybdzt` = '2' WHERE sfzh = '".$sfzh."' AND nf = '".$year."';";
            $success = $lqcxk->exec($sql);
            if($success){
                $tips = "Success";
            } else {
                $tips = "发生错误！SQL执行失败！";
            }
        } else {
            $tips = "Success";
        }
        $tips = "Success";
    } elseif($_POST["flag"] == "Load_jzjy"){
        $sfzh = dowith_sql($_SESSION["user"]);
        $sql = "SELECT tzsbh FROM tdd WHERE sfzh = '".$sfzh."' AND nf = '".$year."';";
        $rs = $lqcxk->query($sql);
        $info = $rs->fetch(PDO::FETCH_ASSOC);
        
        $res = "http://file.xzsyzjc.cn/Photos/qrcode/jzjy/".$info["tzsbh"].'.png'; //二维码url
        $tips = "Success";
    } elseif($_POST["flag"] == "Finish_Step2"){
        $sfzh = dowith_sql($_SESSION["user"]);
        $sql = "SELECT ybdzt FROM tdd WHERE sfzh = '".$sfzh."' AND nf = '".$year."';";
        $rs = $lqcxk->query($sql);
        $info = $rs->fetch(PDO::FETCH_ASSOC);
        if($info["ybdzt"] < 3){
            //更新状态
            $sfzh = dowith_sql($_SESSION["user"]);
            $sql = "UPDATE tdd SET `ybdzt` = '3' WHERE sfzh = '".$sfzh."' AND nf = '".$year."';";
            $success = $lqcxk->exec($sql);
            if($success){
                $tips = "Success";
            } else {
                $tips = "发生错误！SQL执行失败！";
            }
        } else {
            $tips = "Success";
        }
        $tips = "Success";
    } elseif($_POST["flag"] == "Finish_Step3"){
        $sfzh = dowith_sql($_SESSION["user"]);
        $sql = "SELECT ybdzt FROM tdd WHERE sfzh = '".$sfzh."' AND nf = '".$year."';";
        $rs = $lqcxk->query($sql);
        $info = $rs->fetch(PDO::FETCH_ASSOC);
        if($info["ybdzt"] < 4){
            //更新状态
            $sfzh = dowith_sql($_SESSION["user"]);
            $sql = "UPDATE tdd SET `ybdzt` = '4' WHERE sfzh = '".$sfzh."' AND nf = '".$year."';";
            $success = $lqcxk->exec($sql);
            if($success){
                $tips = "Success";
            } else {
                $tips = "发生错误！SQL执行失败！";
            }
        } else {
            $tips = "Success";
        }
        $tips = "Success";
    } elseif($_POST["flag"] == "Finish_Step4"){
        $sfzh = dowith_sql($_SESSION["user"]);
        $sql = "SELECT ybdzt FROM tdd WHERE sfzh = '".$sfzh."' AND nf = '".$year."';";
        $rs = $lqcxk->query($sql);
        $info = $rs->fetch(PDO::FETCH_ASSOC);
        if($info["ybdzt"] < 5){
            //更新状态
            $sfzh = dowith_sql($_SESSION["user"]);
            $sql = "UPDATE tdd SET `ybdzt` = '5' WHERE sfzh = '".$sfzh."' AND nf = '".$year."';";
            $success = $lqcxk->exec($sql);
            if($success){
                $tips = "Success";
            } else {
                $tips = "发生错误！SQL执行失败！";
            }
        } else {
            $tips = "Success";
        }
        $tips = "Success";
    } elseif($_POST["flag"] == "Load_Step5"){
        $sfzh = dowith_sql($_SESSION["user"]);
        $sql = "SELECT xh, xm, xq, bj, bjjc FROM tdd WHERE sfzh = '".$sfzh."' AND nf = '".$year."';";
        $rs = $lqcxk->query($sql);
        $info = $rs->fetch(PDO::FETCH_ASSOC);
		$sql = "SELECT name, phone FROM Instructor WHERE class like '%".$info["bj"]."%' AND year = '".$year."';";
        $rs = $wechat->query($sql);
        $teacher_info = $rs->fetch(PDO::FETCH_ASSOC);
		$info["fdy"] = $teacher_info["name"];
		$info["fdy_lxfs"] = $teacher_info["phone"];
        $res = $info;
        $tips = "Success";
    } else {
        $tips = "参数有误！".var_dump($_POST); //调试参数
    }
}

$result = json_encode(array("tips"=>$tips,"result"=>$res));
die($result);

function LogOut() {
    //1、清空session信息
    $_SESSION = array();
    //2、清楚客户端sessionid
    if(isset($_COOKIE[session_name()])){
        setCookie(session_name(),'',time()-3600,'/');
    }
    //3、彻底销毁session
    session_destroy();
}
?>