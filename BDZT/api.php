<?php
/** Powerd by RebetaStudio
 *
 *  http://www.rebeta.cn
 *
 * 20180909
 *
 */
//die(); //暂停页面刷新
require_once './public.php';
$pdo = new DataBase;
$db = $pdo->mysqlconn();

//检查参数
if($_POST["flag"]){
    if($_POST["flag"] == "basic"){
        $sql = "SELECT COUNT(*) wbd FROM tdd WHERE sfbd = '0' AND nf = '2018' AND xz <> '2';";
        $rs = $db->query($sql);
        $info = $rs->fetch(PDO::FETCH_ASSOC);
        $wbd = $info["wbd"];
        $sql = "SELECT COUNT(*) ybd FROM tdd WHERE sfbd <> '0' AND nf = '2018' AND xz <> '2';";
        $rs = $db->query($sql);
        $info = $rs->fetch(PDO::FETCH_ASSOC);
        $ybd = $info["ybd"];
        $sql = "SELECT COUNT(*) boy FROM tdd WHERE sfbd <> '0' AND nf = '2018' AND xbdm = '1' AND xz <> '2';";
        $rs = $db->query($sql);
        $info = $rs->fetch(PDO::FETCH_ASSOC);
        $boy = $info["boy"];
        $sql = "SELECT COUNT(*) girl FROM tdd WHERE sfbd <> '0' AND nf = '2018' AND xbdm = '2' AND xz <> '2';";
        $rs = $db->query($sql);
        $info = $rs->fetch(PDO::FETCH_ASSOC);
        $girl = $info["girl"];
        $res = array("ybd"=>$ybd,"bdl"=>str_pad(round($ybd/($ybd+$wbd)*100,2),6," ",STR_PAD_LEFT),"boy"=>str_pad($boy,4,"0",STR_PAD_LEFT),"girl"=>str_pad($girl,4,"0",STR_PAD_LEFT));
        $tips = "Success";
    } elseif ($_POST["flag"] == "department") {
        $sql = "SELECT DISTINCT(xi) FROM xzh ORDER BY xi ASC;";
        $rs = $db->query($sql);
        $info = $rs->fetchall(PDO::FETCH_ASSOC);
        $res = array();
        foreach ($info as $departmentinfo) {
            $sql = "SELECT xzh FROM xzh WHERE xi = '".$departmentinfo["xi"]."';";
            $rs = $db->query($sql);
            $info = $rs->fetchall(PDO::FETCH_ASSOC);
            foreach ($info as $tempinfo){
                $sql = "SELECT COUNT(*) num FROM tdd WHERE xzh = '".$tempinfo["xzh"]."' AND nf = '2018' AND xz <> '2';";
                $rs = $db->query($sql);
                $info = $rs->fetch(PDO::FETCH_ASSOC);
                $num += $info["num"];
                $sql = "SELECT COUNT(*) ybd FROM tdd WHERE xzh = '".$tempinfo["xzh"]."' AND nf = '2018' AND sfbd <> '0' AND xz <> '2';";
                $rs = $db->query($sql);
                $info = $rs->fetch(PDO::FETCH_ASSOC);
                $ybd += $info["ybd"];
            }
            $tempres = array("title"=>$departmentinfo["xi"],"num"=>$num,"ybd"=>$ybd,"bdl"=>round($ybd/$num*100,2));
            array_push($res,$tempres);
            //重置计数器
            $num = 0;
            $ybd = 0;
        }
		//根据报到率排序
		foreach($res as $val){
			$key_arrays[]=$val['bdl'];
		}
		array_multisort($key_arrays,SORT_DESC,SORT_NUMERIC,$res);
		
        $tips = "Success";
    } elseif ($_POST["flag"] == "new_student") {
        $sql = "SELECT xm,bdsj,bdsx FROM tdd WHERE nf = '2018' ORDER BY bdsj DESC LIMIT 3;";
        $rs = $db->query($sql);
        $res = $rs->fetchall(PDO::FETCH_ASSOC);
        foreach ($res as &$tempres){
            $tempres["bdsj"] = date('H时i分s秒',strtotime($tempres["bdsj"]));
        }
        $tips = "Success";
    } elseif ($_POST["flag"] == "trend") {
        $res = array();
        $day = date("Y-m-d");
        //$day = "2017-09-16";
        for($h = 7;$h < 19;$h++){
            for($m = 0;$m <6;$m++){
                $time = str_pad($h,2,"0",STR_PAD_LEFT).":".$m."0";
                $parameter = $day." ".str_pad($h,2,"0",STR_PAD_LEFT).":".$m."%";
                $sql = "SELECT COUNT(*) AS num FROM tdd WHERE bdsj LIKE '".$parameter."'";
                $rs = $db->query($sql);
                $info = $rs->fetch(PDO::FETCH_ASSOC);
                $tempres = array("0"=>$time,"1"=>intval($info["num"]));
                array_push($res,$tempres);
            }
        }
        $tips = "Success";
    } else {
        $tips = "参数有误！";
        $res = NULL;
    }
} else {
    $tips = "参数错误";
    $res = NULL;
}

$result = json_encode(array("tips"=>$tips,"result"=>$res));
die($result);
?>