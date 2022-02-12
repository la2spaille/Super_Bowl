<?php
require('header.php');
?>
<div id="app">
    <div class="w-center transformation">
        <img src="/assets/logo.png" alt="">
        <p>
            <span>LOS ANGELES</span>
            <span>2.13.22, 6:30PMET</span>
        </p>
    </div>
    <div class="l-2-half-wrapper">
        <?php
        $sql = 'SELECT * FROM team';
        $t_team = $pdo->prepare($sql);
        $t_team->execute();
        $teams = $t_team->fetchAll();
        ?>
        <?php foreach ($teams as $team) : ?>
            <div class="w-team-intro" style="background: <?= $team['primary_color'] ?>;">
                <p class="w-team-slogan transformation">
                    <span><?= explode(" ", $team['slogan'])[0] ?></span>
                    <span><?= explode(" ", $team['slogan'])[1] ?></span>
                </p>
                <img class="transformation" src="assets/<?= $team['name'] ?>.png" alt="">
            </div>
        <?php endforeach ?>
    </div>
</div>
<?php require('footer.php') ?>