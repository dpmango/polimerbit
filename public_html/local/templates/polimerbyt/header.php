<?
if(!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true)
	die();
?>
<!DOCTYPE html>
<html lang="en"><head>
    <meta http-equiv="Content-Type" content="text/html; charset=<?=LANG_CHARSET;?>">
    <META NAME="ROBOTS" content="ALL">
    <?$APPLICATION->ShowMeta("keywords")?>
    <?$APPLICATION->ShowMeta("description")?>
    <title><?$APPLICATION->ShowTitle()?></title>
    <?$APPLICATION->ShowCSS();?>
    <?$APPLICATION->ShowHead();?>
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
    <meta name="theme-color" content="#fff">
    <meta name="format-detection" content="telephone=no">
    <!-- appstore links-->
    <link rel="apple-touch-icon" sizes="180x180" href="<?=SITE_TEMPLATE_PATH?>/img/fav/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="<?=SITE_TEMPLATE_PATH?>/img/fav/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="<?=SITE_TEMPLATE_PATH?>/img/fav/favicon-16x16.png">
    <link rel="manifest" href="<?=SITE_TEMPLATE_PATH?>/img/fav/site.webmanifest">
    <meta name="msapplication-TileColor" content="#da532c">

    <!-- remove for production-->
    <meta name="robots" content="noindex">
    <link rel="stylesheet" media="all" href="<?=SITE_TEMPLATE_PATH?>/css/app.css?<?=time()?>"><!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script><![endif]-->
</head>

<body>
<?$APPLICATION->ShowPanel();?>
<!-- place where pjax bindings happen's-->
<div id="barba-wrapper">
    <!-- HEADER :: START-->
    <header class="header" data-modifier="<?$APPLICATION->ShowViewContent('data-modifier');?>">

        <div class="container container--full">
            <div class="header__wrapper"><a class="header__logo" href="/">
                    <svg class="ico ico-mono-logo">
                        <use xlink:href="<?=SITE_TEMPLATE_PATH?>/img/sprite-mono.svg#ico-mono-logo"></use>
                    </svg></a>
                <ul class="header__menu">
                    <?$APPLICATION->IncludeComponent("bitrix:menu",".default",Array(
                            "ROOT_MENU_TYPE" => "top",
                            "MAX_LEVEL" => "1",
                            "CHILD_MENU_TYPE" => "top",
                            "USE_EXT" => "Y",
                            "DELAY" => "N",
                            "ALLOW_MULTI_SELECT" => "Y",
                            "MENU_CACHE_TYPE" => "N",
                            "MENU_CACHE_TIME" => "3600",
                            "MENU_CACHE_USE_GROUPS" => "Y",
                            "MENU_CACHE_GET_VARS" => ""
                        )
                    );?>
                </ul>
                <div class="header__hamburger">
                    <div class="hamburger hamburger--squeeze" js-hamburger>
                        <div class="hamburger-box">
                            <div class="hamburger-inner"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </header>
    <!-- MOBILE NAVI-->
    <div class="mobile-navi">
        <div class="mobile-navi__wrapper"><a class="mobile-navi__logo" href="/">
                <svg class="ico ico-mono-logo">
                    <use xlink:href="<?=SITE_TEMPLATE_PATH?>/img/sprite-mono.svg#ico-mono-logo"></use>
                </svg></a>
            <ul class="mobile-navi__menu">
                <?$APPLICATION->IncludeComponent("bitrix:menu",".default",Array(
                        "ROOT_MENU_TYPE" => "top",
                        "MAX_LEVEL" => "1",
                        "CHILD_MENU_TYPE" => "top",
                        "USE_EXT" => "Y",
                        "DELAY" => "N",
                        "ALLOW_MULTI_SELECT" => "Y",
                        "MENU_CACHE_TYPE" => "N",
                        "MENU_CACHE_TIME" => "3600",
                        "MENU_CACHE_USE_GROUPS" => "Y",
                        "MENU_CACHE_GET_VARS" => ""
                    )
                );?>
            </ul>
        </div>
    </div>
    <!-- what should be changed with every pjax-->
    <div class="page">
        <div class="page__content">
            <a id="section-top" href="#"></a>
            <a class="scroll-top" href="#section-top"></a>

            <?if($APPLICATION->GetViewContent('data-modifier') !== 'false'):?>

                <div js-header-class="" data-class="<?$APPLICATION->ShowViewContent('data-modifier');?>"></div>

            <?endif?>
