<?php
try {
    $pdo = new PDO('mysql:host=localhost;dbname=super-bowl;charset=utf8', 'root', 'root');
} catch (Exception $e) {
    die('Erreur : ' . $e->getMessage());
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style.css">
    <meta charset="UTF-8">
    <link rel="shortcut icon" href="/assets/512.png" type="image/x-icon">
    <link rel="preload" href="assets/arena.jpg" as="image">
    <link rel="preload" href="assets/logo.png" as="image">
    <link rel="preload" href="assets/bengals.png" as="image">
    <link rel="preload" href="assets/rams.png" as="image">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="theme-color" content="#0B0D17" />
    <link rel="manifest" href="manifest.json">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Dosis:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <title>Super Bowl</title>
    <script>
        window.addEventListener('load', () => {
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('/sw.js');
            }
        })
    </script>
</head>

<body>
    <main>