<? require($_SERVER['DOCUMENT_ROOT'].'/bitrix/header.php');
$APPLICATION->SetTitle(""); ?><?$APPLICATION->AddViewContent('data-modifier', 'is-white');?>
    <div class="hero hero--with-overlay">
        <div class="hero__background  " data-aos="blur">
            <video muted="muted" loop="" autoplay="autoplay" poster="<?=SITE_TEMPLATE_PATH?>/img/heroBackground_1.jpg"&gt;
                <source src="<?=SITE_TEMPLATE_PATH?>/video/cooperation1.mp4" type="video/mp4">
                <source src="<?=SITE_TEMPLATE_PATH?>/video/cooperation1.webm" type="video/webm">
            </video>
        </div>
        <div class="hero__content" data-aos="fade-up">
            <div class="container container--team">
                <div class="hero__subtitle">

                    <?$APPLICATION->IncludeFile(

                        SITE_TEMPLATE_PATH."/include/history/subtitle.php",
                        Array(),
                        Array("MODE"=>"text") // text, html, php
                    );
                    ?>
                </div>
                <div class="hero__title">
                    <?$APPLICATION->IncludeFile(

                        SITE_TEMPLATE_PATH."/include/history/title.php",
                        Array(),
                        Array("MODE"=>"text") // text, html, php
                    );
                    ?>
                </div>
            </div>
        </div>
    </div>
    <!-- HISTORY-->
    <div class="history">
        <?$APPLICATION->IncludeFile(

            SITE_TEMPLATE_PATH."/include/history/nav.php",
            Array(),
            Array("MODE"=>"html") // text, html, php
        );
        ?>
        <section data-section="0">
            <div class="container">
                <div class="history__row">
                    <div class="history__image" data-aos="blur">
                        <div class="history__image-container" js-teleport="" data-teleport-to="image-mobile1" data-teleport-condition="<768" style="max-width: 85%">
                            <?$APPLICATION->IncludeFile(

                                SITE_TEMPLATE_PATH."/include/history/1940/image1.php",
                                Array(),
                                Array("MODE"=>"html") // text, html, php
                            );
                            ?>
                            <p style="max-width: 45%">
                                <?$APPLICATION->IncludeFile(

                                    SITE_TEMPLATE_PATH."/include/history/1940/image1-desc.php",
                                    Array(),
                                    Array("MODE"=>"html") // text, html, php
                                );
                                ?>
                            </p>
                        </div>
                        <div class="history__image-container history__image-container--absolute" js-teleport="" data-teleport-to="image-mobile2" data-teleport-condition="<768" style="right: 0; top: 71%; max-width: 57%">
                            <?$APPLICATION->IncludeFile(

                                SITE_TEMPLATE_PATH."/include/history/1940/image2.php",
                                Array(),
                                Array("MODE"=>"html") // text, html, php
                            );
                            ?>
                            <p>
                                <?$APPLICATION->IncludeFile(

                                    SITE_TEMPLATE_PATH."/include/history/1940/image2-desc.php",
                                    Array(),
                                    Array("MODE"=>"html") // text, html, php
                                );
                                ?>
                            </p>
                        </div>
                    </div>
                    <div class="history__info">
                        <div class="history__info-content">
                            <p class="history__date" data-aos="fade-in">
                                <?$APPLICATION->IncludeFile(

                                    SITE_TEMPLATE_PATH."/include/history/1940/title.php",
                                    Array(),
                                    Array("MODE"=>"html") // text, html, php
                                );
                                ?>
                            </p>
                            <p class="history__title" data-aos="fade-in">

                                <?$APPLICATION->IncludeFile(

                                    SITE_TEMPLATE_PATH."/include/history/1940/desc1.php",
                                    Array(),
                                    Array("MODE"=>"html") // text, html, php
                                );
                                ?>
                            </p>
                            <div class="history__image-container history__teleport" data-teleport-target="image-mobile1"></div>
                            <p class="history__description " data-aos="fade-in">
                                <?$APPLICATION->IncludeFile(

                                    SITE_TEMPLATE_PATH."/include/history/1940/desc2.php",
                                    Array(),
                                    Array("MODE"=>"html") // text, html, php
                                );
                                ?>
                                </p>
                            <div class="history__image-container history__teleport" data-teleport-target="image-mobile2"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section data-section="1">
            <div class="container">
                <div class="history__row history__row--reverse">
                    <div class="history__image">
                        <div class="history__image-container" js-teleport="" data-teleport-to="image-mobile3" data-teleport-condition="<768"><img src="/local/templates/polimerbyt/img/historyImg2.jpg" data-aos="blur" class=""></div>
                    </div>
                    <div class="history__info">
                        <div class="history__info-content">
                            <p class="history__date " data-aos="fade-in">1941 г.</p>
                            <p class="history__title " data-aos="fade-in">Вторая мировая война сильно изменила повседневную жизнь завода.</p>
                            <div class="history__image-container history__teleport" data-teleport-target="image-mobile3"></div>
                            <p class="history__description " data-aos="fade-in">В
                                период с 26 октября по 13 ноября 1941 г. часть оборудования и
                                сотрудников была эвакуирована в Нижний Тагил. Так, в Москве осталось 65
                                прессов из 110. Не смотря на военное положение, завод трудился на благо
                                фронт и выпускал элементы различных боеприпасов, а именно детонаторов,
                                баллистических колпаков, донышек для картечи, а также медальонов.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section data-section="2">
            <div class="history__full">
                <div class="history__bg " js-teleport="" data-teleport-to="image-mobile4" data-teleport-condition="<768" style="background: #5E5E60;" data-aos="blur"><img src="/local/templates/polimerbyt/img/historyImg3.png" ></div>
                <div class="history__content">
                    <div class="container">
                        <div class="history__row">
                            <div class="history__info">
                                <div class="history__info-content">
                                    <p class="history__date history__date--white" data-aos="fade-in">1945 г.</p>
                                    <p class="history__title history__title--white" data-aos="fade-in">После
                                        окончания войны заводу предстояло перейти от массового производства на
                                        крупно- и мелкосерийное, а также большее внимание уделить внешней
                                        отделке изделий.</p>
                                    <div class="history__image-container history__teleport" data-teleport-target="image-mobile4" style="background: #5E5E60;" data-aos="blur"></div>
                                    <p class="history__description history__description--white" data-aos="fade-in">Ассортимент
                                        изделий был расширен как за счет изготовления своими силами пресс-форм,
                                        так и за счет ввода в эксплуатацию около 60 единиц трофейного
                                        оборудования, и полноценной реконструкции цехов. Автопарк завода
                                        приобрел в конце войны машину «Мерседес-Бенц», на которой осуществлялась
                                        доставка производственных материалов.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section data-section="3">
            <div class="container">
                <div class="history__row history__row--reverse">
                    <div class="history__image">
                        <div class="history__image-container" js-teleport="" data-teleport-to="image-mobile5" data-teleport-condition="<768"><img src="/local/templates/polimerbyt/img/historyImg4_1.jpg" data-aos="blur" class=""></div>
                        <div class="history__image-container history__image-container--absolute" style="left: 23%; top: 50%; max-width: 44%"><img src="/local/templates/polimerbyt/img/historyImg4_2.jpg" data-aos="blur" class=""></div>
                    </div>
                    <div class="history__info">
                        <div class="history__info-content">
                            <p class="history__date " data-aos="fade-in">1985 г.</p>
                            <p class="history__title " data-aos="fade-in">К 1985 году Полимербыт является передовым предприятием химической отрасли г. Москвы.</p>
                            <div class="history__image-container history__teleport" data-teleport-target="image-mobile5"></div>
                            <p class="history__description" data-aos="fade-in">Этот
                                год стал переломным в судьбе производства – предприятие, в соответствии
                                с новыми веяниями социалистической экономики переводится на хозрасчет и
                                обретает новое, востребованное потребителями направление деятельности –
                                производство полиэтиленовых пакетов.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section data-section="4">
            <div class="history__full">
                <div class="history__bg " js-teleport="" data-teleport-to="image-mobile6" data-teleport-condition="<768" style="background: #3D3D3D;" data-aos="blur"><img src="/local/templates/polimerbyt/img/historyImg5.png" style="width: 106.5%"></div>
                <div class="history__content">
                    <div class="container">
                        <div class="history__row history__row--margin">
                            <div class="history__info">
                                <div class="history__info-content">
                                    <p class="history__date history__date--white" data-aos="fade-in">1992 г.</p>
                                    <p class="history__title history__title--white" data-aos="fade-in">В 1992 году на предприятии проводится процедура приватизации.</p>
                                    <div class="history__image-container history__teleport" data-teleport-target="image-mobile6" style="background: #3D3D3D;" data-aos="blur"></div>
                                    <p class="history__description history__description--white" data-aos="fade-in">Менеджмент
                                        и сотрудники становятся акционерами компании. Уже в 1993 году
                                        контрольный пакет акций предприятия приобретает ряд американских
                                        инвесторов, специализирующихся на инвестициях в компании, занимающиеся
                                        переработкой полимеров, в разных странах мира.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <div class="container">
            <section data-section="5">
                <div class="history__row">
                    <div class="history__info history__info--middle">
                        <div class="history__info-content" style="max-width: 560px;">
                            <p class="history__date" data-aos="fade-in">1994 г.</p>
                            <p class="history__title" data-aos="fade-in">1994
                                год был ознаменован комплексной модернизацией производственных
                                мощностей и оборудования. АО «Полимербыт» активно осваивает новые
                                технологии, наращивает конкурентоспособность.</p>
                        </div>
                    </div>
                </div>
            </section>
            <section data-section="6">
                <div class="history__row history__row--reverse">
                    <div class="history__image">
                        <div class="history__image-container" js-teleport="" data-teleport-to="image-mobile7" data-teleport-condition="<768"><img src="/local/templates/polimerbyt/img/historyImg6_1.jpg" src="/local/templates/polimerbyt/img/historyImg6_1@2x.jpg 2x" data-aos="blur" class=""></div>
                        <div class="history__image-container history__image-container--absolute" style="left: 20%; top: 64%; max-width: 57%"><img src="/local/templates/polimerbyt/img/historyImg6_2.jpg" src="/local/templates/polimerbyt/img/historyImg6_2@2x.jpg 2x" data-aos="blur" class=""></div>
                    </div>
                    <div class="history__info">
                        <div class="history__info-content">
                            <p class="history__date " data-aos="fade-in">2002 – 2005 г.</p>
                            <p class="history__title " data-aos="fade-in">Уже к 2002 году Полимербыт занимает лидирующее положение на рынке изделий из пластика.</p>
                            <div class="history__image-container history__teleport" data-teleport-target="image-mobile7"></div>
                            <p class="history__description" data-aos="fade-in">Осуществляются
                                масштабные инвестиции в оборудование и инфраструктуру. Всего через
                                несколько лет, в 2005 году происходит значительное расширение
                                ассортимента производимой продукции. В том же году руководство компании
                                принимает решение о начале прямых розничных продаж.</p>
                            <section data-section="7">
                                <p class="history__date" style="margin-top: 48px;" data-aos="fade-in">2007 – 2009 г.</p>
                                <p class="history__title" data-aos="fade-in">В 2007 – 2009 годах компания берет курс на концентрацию на производстве бытовых изделий из пластика.</p>
                                <p class="history__description history__description--mt8" data-aos="fade-in">Начинается
                                    масштабная программа внутренней оптимизации и развития.Компания активно
                                    инвестирует в развитие, новое оборудование, инфраструктуру, технологии и
                                    коллектив.</p>
                            </section>
                        </div>
                    </div>
                </div>
            </section>
            <section data-section="8">
                <div class="history__row">
                    <div class="history__image">
                        <div class="history__image-container" js-teleport="" data-teleport-to="image-mobile8" data-teleport-condition="<768"><img src="/local/templates/polimerbyt/img/historyImg7.jpg" data-aos="blur" class=""></div>
                    </div>
                    <div class="history__info">
                        <div class="history__info-content">
                            <p class="history__date" data-aos="fade-in">2010 г.</p>
                            <p class="history__title" data-aos="fade-in">В 2010 году Компания выводит на рынок десятки новых изделий, значительно расширяет свое присутствие в розничных сетях.</p>
                            <div class="history__image-container history__teleport" data-teleport-target="image-mobile8"></div>
                            <p class="history__description" data-aos="fade-in">Продолжается
                                курс на модернизацию, бережливое производство, повсеместную роботизацию
                                производства. Проводится усиление финансового и IT блоков компании,
                                появляется позиция Директора по развитию, частично обновляется рабочий
                                коллектив. Окончательно закрывается производство полиэтиленовых пакетов и
                                руководство компании полностью фокусируется на стратегически важном
                                рынке бытовых изделий из пластика.</p>
                        </div>
                    </div>
                </div>
            </section>
            <section data-section="9">
                <div class="history__row">
                    <div class="history__image">
                        <div class="history__image-container" js-teleport="" data-teleport-to="image-mobile9" data-teleport-condition="<768"><img src="/local/templates/polimerbyt/img/historyImg8.jpg" data-aos="blur" class=""></div>
                    </div>
                    <div class="history__info">
                        <div class="history__info-content">
                            <p class="history__date" data-aos="fade-in">2011 г.</p>
                            <p class="history__title" data-aos="fade-in">В
                                2011 году компания продолжает увеличивать долю рынка, ряд крупных сетей
                                и несетевых оптовых клиентов сокращает закупки у конкурентов и
                                переходит в АО «Полимербыт».</p>
                            <div class="history__image-container history__teleport" data-teleport-target="image-mobile9"></div>
                            <p class="history__description" data-aos="fade-in">Проводятся
                                масштабные инвестиции в складской комплекс, создаются тысячи метров
                                новых площадей, выкупаются в собственность земельные участки под обоими
                                производственными площадками в Москве. Компания активно рассматривает
                                варианты качественного скачка в развитии через создание или приобретение
                                новых производственных площадок.</p>
                        </div>
                    </div>
                </div>
            </section>
            <section data-section="10">
                <div class="history__row">
                    <div class="history__info history__info--middle">
                        <div class="history__info-content" style="max-width: 755px;">
                            <p class="history__date" data-aos="fade-in">2012 г.</p>
                            <p class="history__title" data-aos="fade-in">В
                                2012 году компания осуществляет самые масштабные инвестиции за свою
                                новейшую историю, ускоряется работа по обновлению и расширению
                                ассортимента продукции, начинается партнерство с Walt Disney,
                                производятся крупные поставки пластиковых изделий для нужд Олимпиады
                                Сочи-2014. Тем самым закладываются прочные основы уверенного роста
                                компании в будущем.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        <section data-section="11">
            <div class="history__full">
                <div class="history__bg" js-teleport="" data-teleport-to="image-mobile10" data-teleport-condition="<768" style="background: #3D3D3D;" data-aos="blur"><img src="/local/templates/polimerbyt/img/historyImg11.png" style="width: 106.5%"></div>
                <div class="history__content history__content--last">
                    <div class="container">
                        <div class="history__row history__row--margin">
                            <div class="history__info">
                                <div class="history__info-content">
                                    <p class="history__date history__date--white" data-aos="fade-in">2019 г.</p>
                                    <p class="history__title history__title--white" data-aos="fade-in">2019 год стал для компании Полимербыт юбилейным.</p>
                                    <div class="history__image-container history__teleport" data-teleport-target="image-mobile10" style="background: #3D3D3D;" data-aos="blur"></div>
                                    <p class="history__description history__description--white" data-aos="fade-in">В
                                        этом году 80летний опыт компании сконцентрировался в новом бренде
                                        Forma. Функциональные изделия, представленные в среднем и среднем +
                                        ценовых сегментах, предложат полное удовлетворение бытовых потребностей
                                        взыскательных потребителей. Также, в начале года Полимербыт укрепил
                                        партнерство со студией Universal Pictures, став лицензиатом сразу двух
                                        крупных проектов – «Как приручить дракона» и «Миньоны».</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
<br><? require($_SERVER['DOCUMENT_ROOT'].'/bitrix/footer.php'); ?>
