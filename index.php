<?php
session_set_cookie_params([
    'lifetime' => 0,
    'path' => '/',
    'domain' => '.popol.website',
    'secure' => true,
    'httponly' => true,
    'samesite' => 'None'
]);
session_start();

// 리소스 캐시 업데이트를 위한 값 준비
$cache_ver = time();
?>

<!DOCTYPE html>
<html>
<head>
<title>sol915</title>
<link rel="shortcut icon" href="/media/favicon.ico" type="image/x-icon" />
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />

<link href="/src/portfolio.css?<?=$cache_ver?>" type="text/css" rel="stylesheet" />
<link href="/src/prepare.css?<?=$cache_ver?>" type="text/css" rel="stylesheet" />
<link href="/src/core.css?<?=$cache_ver?>" type="text/css" rel="stylesheet" />
<link href="/src/core_wide.css?<?=$cache_ver?>" media="screen and (min-width: 801px)" type="text/css" rel="stylesheet" />
<link href="/src/core_narrow.css?<?=$cache_ver?>" media="screen and (max-width: 800px)" type="text/css" rel="stylesheet" />
<!-- 터치 기반 입력장치에서 사용 -->
<link href="/src/pointer_coarse.css?<?=$cache_ver?>" media="(pointer: coarse)" type="text/css" rel="stylesheet" />
<!-- 마우스 기반 입력장치에서 사용 -->
<link href="/src/pointer_fine.css?<?=$cache_ver?>" media="(pointer: fine)" type="text/css" rel="stylesheet" />

<script type="module" src="/src/intro.js?<?=$cache_ver?>"></script>
<script type="module" src="/src/planet.js?<?=$cache_ver?>"></script>
<script type="module" src="/src/contact.js?<?=$cache_ver?>"></script>
<script type="module" src="/src/works.js?<?=$cache_ver?>"></script>
</head>


<body>
<div id="intro" class="intro"><?php include_once "./components/begin.html";?></div>

<div class="header-wrap">
    <?php include_once "./_include/header.php" ?>
</div>

<div class="main-wrap">
    <main class="main orbit">
        <?php
        include_once "./components/profile.html";
        include_once "./components/skills.html";
        include_once "./components/works.html";
        include_once "./components/works_details.html";
        include_once "./components/contact.html";
        include_once "./components/planet.html";
        ?>
    </main>
</div>


<dialog id="content_dialog">
    <button id="content_dialog_close" type="button">X</button>
    <div id="dialog_content"></div>
</dialog>
</body>
</html>