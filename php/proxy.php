<?php
	if(isset($_GET["req"])) {
		$res = array();
		switch($_GET["req"]) {
			case "time": $res = array("d" => date("Y-m-d H:i:s"));
				break;
			case "msg" : $res = array("m" => "Hello World!");
				break;
		}
		header('Content-Type: application/json; charset=utf8');
		if(isset($_GET["callback"])) {
			echo $_GET["callback"]."(".json_encode($res).")";
		} else {
			echo json_encode($res);
		}
	}
?>
