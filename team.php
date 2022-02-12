<?php
require('header.php');
$query = $pdo->prepare('SELECT * FROM team WHERE id =:id');
$query->execute([
    'id' => $_GET['id']
]);
$team = $query->fetch();
?>
<div id="app">
    <div class="l-fixed">
        <div class="l-wrapper team">
            <section class="l-team-intro" style="background: <?= $team['primary_color'] ?>">
                <div class="l-2-half-wrapper">
                    <div class="w-team-intro">
                        <p class="w-team-slogan transformation">
                            <span><?= explode(" ", $team['slogan'])[0] ?></span>
                            <span><?= explode(" ", $team['slogan'])[1] ?></span>
                        </p>
                        <img class="transformation" src="assets/<?= $team['name'] ?>.png" alt="">
                    </div>
                    <div class="w-text team">
                        <h1>
                            <span><?= $team['city'] ?></span>
                            <span><?= $team['name'] ?></span>
                        </h1>
                        <div class="w-team-grid">
                            <p>
                                <strong>Head Coach</strong>
                                <span><?= $team['coach'] ?></span>
                            </p>
                            <p>
                                <strong>Stadium</strong>
                                <span> <?= $team['arena'] ?></span>
                            </p>
                            <p>
                                <strong>Owners</strong>
                                <span><?= $team['owners'] ?></span>
                            </p>
                            <p>
                                <strong>Etablished</strong>
                                <span><?= $team['etablished'] ?></span>
                            </p>
                        </div>
                        <div class="w-team-color">
                            <h3>Main colors</h3>
                            <span style="background-color:<?= $team['primary_color']  ?>;"></span>
                            <span style="background-color:<?= $team['secondary_color']  ?>;"></span>
                            <span style="background-color:<?= $team['tertiary_color']  ?>;"></span>
                        </div>
                        <div class="w-team-championships">
                            <strong>Super Bowl</strong>
                            <span> x0</span>
                        </div>
                    </div>
                </div>
            </section>
            <section class="l-team-parcours">
                <h1 class="w-page-title"><span>History</span></h1>
                <div class="l-wrapper">
                    <div class="w-img">
                        <img src="/assets/playoffs.jpg" alt="">
                    </div>
                </div>
            </section>
            <section class="l-team-roster">
                <h1 class="w-page-title"><span>Roster</span></h1>
                <div class="l-wrapper">
                    <div class="w-team-roster"></div>
                    <div class="w-team-roster"></div>
                    <div class="w-team-roster"></div>
                </div>
            </section>
        </div>
    </div>
</div>
<?php require('footer.php') ?>