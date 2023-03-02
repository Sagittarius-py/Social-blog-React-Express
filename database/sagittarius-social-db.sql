-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 28 Lut 2023, 12:02
-- Wersja serwera: 10.4.25-MariaDB
-- Wersja PHP: 8.1.10
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */
;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */
;
/*!40101 SET NAMES utf8mb4 */
;
--
-- Baza danych: `sagittarius-social-db`
--

-- --------------------------------------------------------
--
-- Struktura tabeli dla tabeli `comments`
--

CREATE TABLE `comments` (
  `IDcomment` int(20) NOT NULL,
  `commentText` longtext NOT NULL,
  `post_id` int(20) NOT NULL,
  `user_id` int(20) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
--
-- Zrzut danych tabeli `comments`
--

INSERT INTO `comments` (`IDcomment`, `commentText`, `post_id`, `user_id`)
VALUES (17, 'Cokolweik', 210, 29),
  (19, 'Cokolwiek', 213, 32);
-- --------------------------------------------------------
--
-- Struktura tabeli dla tabeli `photos`
--

CREATE TABLE `photos` (
  `photo_id` int(11) NOT NULL,
  `photoName` varchar(255) NOT NULL,
  `post_id` int(11) DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
--
-- Zrzut danych tabeli `photos`
--

INSERT INTO `photos` (`photo_id`, `photoName`, `post_id`)
VALUES (152, 'forest-653448_1920.jpg', 210),
  (
    155,
    'china-guangxi-guilin-li-river-wallpaper-6826ddd8d0b0ac88f0cc11fe68a2849a.jpg',
    213
  );
-- --------------------------------------------------------
--
-- Struktura tabeli dla tabeli `posts`
--

CREATE TABLE `posts` (
  `title` text DEFAULT NULL,
  `post_text` text DEFAULT NULL,
  `post_id` int(20) NOT NULL,
  `likes` int(20) NOT NULL DEFAULT 0,
  `id_user` int(20) NOT NULL DEFAULT 0
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
--
-- Zrzut danych tabeli `posts`
--

INSERT INTO `posts` (
    `title`,
    `post_text`,
    `post_id`,
    `likes`,
    `id_user`
  )
VALUES ('Abba ', 'Cokolwiek', 210, 2, 29),
  ('Abba', 'Cokolweiek', 211, 0, 32),
  ('Nowy post', 'Cok', 213, 0, 32);
-- --------------------------------------------------------
--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `id_user` int(20) NOT NULL,
  `user_Login` text NOT NULL,
  `postCount` int(11) DEFAULT 0,
  `likesCount` int(11) DEFAULT 0,
  `access_lvl` int(11) DEFAULT 0,
  `about` varchar(255) DEFAULT NULL,
  `password` varchar(30) NOT NULL,
  `profilePic` varchar(200) DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
--
-- Zrzut danych tabeli `users`
--

INSERT INTO `users` (
    `id_user`,
    `user_Login`,
    `postCount`,
    `likesCount`,
    `access_lvl`,
    `about`,
    `password`,
    `profilePic`
  )
VALUES (
    29,
    'Filip',
    10,
    7,
    3,
    'Cokolwiek',
    'Sieniawski',
    'division2_orange.png'
  ),
  (
    30,
    'Kuba',
    1,
    2,
    1,
    'Bobak',
    'Bobak',
    'ac4_Wallpaper2_1920x1080.jpg'
  ),
  (
    32,
    'Maciek',
    3,
    1,
    3,
    'Cokolwiek',
    'Tabor',
    'china-guangxi-guilin-li-river-wallpaper-6826ddd8d0b0ac88f0cc11fe68a2849a.jpg'
  ),
  (
    39,
    'awd',
    0,
    0,
    2,
    'awd',
    'awd',
    '1676989805961873765.jpg'
  );
--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `comments`
--
ALTER TABLE `comments`
ADD PRIMARY KEY (`IDcomment`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `post_id` (`post_id`);
--
-- Indeksy dla tabeli `photos`
--
ALTER TABLE `photos`
ADD PRIMARY KEY (`photo_id`),
  ADD KEY `photos_ibfk_1` (`post_id`);
--
-- Indeksy dla tabeli `posts`
--
ALTER TABLE `posts`
ADD PRIMARY KEY (`post_id`) USING BTREE,
  ADD KEY `posts_ibfk_1` (`id_user`);
--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
ADD PRIMARY KEY (`id_user`);
--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `comments`
--
ALTER TABLE `comments`
MODIFY `IDcomment` int(20) NOT NULL AUTO_INCREMENT,
  AUTO_INCREMENT = 20;
--
-- AUTO_INCREMENT dla tabeli `photos`
--
ALTER TABLE `photos`
MODIFY `photo_id` int(11) NOT NULL AUTO_INCREMENT,
  AUTO_INCREMENT = 156;
--
-- AUTO_INCREMENT dla tabeli `posts`
--
ALTER TABLE `posts`
MODIFY `post_id` int(20) NOT NULL AUTO_INCREMENT,
  AUTO_INCREMENT = 214;
--
-- AUTO_INCREMENT dla tabeli `users`
--
ALTER TABLE `users`
MODIFY `id_user` int(20) NOT NULL AUTO_INCREMENT,
  AUTO_INCREMENT = 40;
--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `comments`
--
ALTER TABLE `comments`
ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `comments_ibfk_3` FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`) ON DELETE CASCADE ON UPDATE NO ACTION;
--
-- Ograniczenia dla tabeli `photos`
--
ALTER TABLE `photos`
ADD CONSTRAINT `photos_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`) ON DELETE CASCADE ON UPDATE NO ACTION;
--
-- Ograniczenia dla tabeli `posts`
--
ALTER TABLE `posts`
ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`);
COMMIT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;