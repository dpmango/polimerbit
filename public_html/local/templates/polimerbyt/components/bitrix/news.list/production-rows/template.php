<? foreach ($arResult["ITEMS"] as $arIndex => $arItem): ?>

    <div class="cooperation__row<?if ($arIndex%2 == 0):?> cooperation__row--reverse<?endif;?>">
        <div class="cooperation__info" data-aos="fade-up">
            <div class="cooperation__icon">
                <svg class="ico <?=$arItem["PROPERTIES"]["ICON_SVG_CLASS"]["VALUE"]?>">
                    <use xlink:href="<?=SITE_TEMPLATE_PATH?>/img/sprite-color.svg#<?=$arItem["PROPERTIES"]["ICON_SVG_CLASS"]["VALUE"]?>"></use>
                </svg>
            </div>
            <p class="cooperation__info-main"><?=$arItem["PREVIEW_TEXT"]?></p>
        </div>
        <div class="cooperation__image" data-aos="fade-left">
            <div class="cooperation__video">
                <video muted="muted" loop="" autoplay="autoplay" poster="<?=$arItem["PREVIEW_PICTURE"]["SRC"]?>">
                    <source src="<?=$arItem["PROPERTIES"]["VIDEO_MP4"]["VALUE"]["path"]?>" type="video/mp4">
                    <source src="<?=$arItem["PROPERTIES"]["VIDEO_WEBM"]["VALUE"]["path"]?>" type="video/webm">
                </video>
            </div>
        </div>
    </div>

<? endforeach; ?>

