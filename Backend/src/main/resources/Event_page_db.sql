DROP DATABASE IF EXISTS `event_page`;
CREATE DATABASE IF NOT EXISTS `event_page`;
USE `event_page`;

CREATE TABLE `city` (
  `id`   INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(30)      NOT NULL,
  PRIMARY KEY (`id`)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

CREATE TABLE `address` (
  `id`      INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name`    VARCHAR(50)      NOT NULL,
  `city_id` INT(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_address_city_id_idx` (`city_id`),
  CONSTRAINT `fk_address_city_id` FOREIGN KEY (`city_id`) REFERENCES `city` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

CREATE TABLE `place` (
  `id`          INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name`        VARCHAR(50)      NOT NULL,
  `description` VARCHAR(255)              DEFAULT NULL,
  `address_id`  INT(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_place_address_id_idx` (`address_id`),
  CONSTRAINT `fk_place_address_id` FOREIGN KEY (`address_id`) REFERENCES `address` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

CREATE TABLE `category` (
  `id`          INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name`        VARCHAR(255)     NOT NULL,
  `description` VARCHAR(255),
  PRIMARY KEY (`id`)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

CREATE TABLE `event` (
  `id`          INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name`        VARCHAR(50)      NOT NULL,
  `date_time`   DATETIME         NOT NULL,
  `description` TEXT                      DEFAULT NULL,
  `picture_url` VARCHAR(200)              DEFAULT NULL,
  `category_id` INT(10) UNSIGNED NOT NULL,
  `place_id`    INT(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_category_id12_idx` (`category_id`),
  CONSTRAINT `fk_category12_id` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  KEY `fk_place_id11_idx` (`place_id`),
  CONSTRAINT `fk_place11_id` FOREIGN KEY (`place_id`) REFERENCES `place` (`id`)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

CREATE TABLE `role` (
  `id`   INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `role` VARCHAR(255)     NOT NULL,
  PRIMARY KEY (`id`)
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 1
  DEFAULT CHARSET = utf8;

CREATE TABLE `user` (
  `id`       INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(255)              DEFAULT NULL,
  `password` VARCHAR(255)              DEFAULT NULL,
  `email`    VARCHAR(255)              DEFAULT NULL,
  `ime`      VARCHAR(255)              DEFAULT NULL,
  `prezime`  VARCHAR(255)              DEFAULT NULL,
  `role_id`  INT(10) UNSIGNED          DEFAULT NULL,
  `place_id` INT(10) UNSIGNED          DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_role_id_idx` (`role_id`),
  CONSTRAINT `fk_book_role_id` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

-- Inserting values
INSERT INTO city (id, name) VALUES (1, "Sarajevo");
INSERT INTO city (id, name) VALUES (2, "Zenica");
INSERT INTO city (id, name) VALUES (3, "Tuzla");

INSERT INTO address (id, name, city_id) VALUES (1, "Vilsonovo šetalište 8", 1);
INSERT INTO address (id, name, city_id) VALUES (2, "Mehmeda Spahe 20", 1);
INSERT INTO address (id, name, city_id) VALUES (3, "Obala Kulina bana 9", 1);
INSERT INTO address (id, name, city_id) VALUES (4, "Gabelina 16", 1);
INSERT INTO address (id, name, city_id) VALUES (5, "Trg BiH 6", 2);
INSERT INTO address (id, name, city_id) VALUES (6, "Kamberovića čikma 10", 2);
INSERT INTO address (id, name, city_id) VALUES (7, "Trg Alije Izetbegovića 86", 2);
INSERT INTO address (id, name, city_id) VALUES (8, "Bulevar Kulina bana bb", 2);
INSERT INTO address (id, name, city_id) VALUES (9, "Bosne Srebrene bb", 3);

INSERT INTO place (id, name, description, address_id) VALUES
  (1, "My Face", "Najbolja muzika u gradu je kod nas", 1);
INSERT INTO place (id, name, description, address_id) VALUES
  (2, "Cinemas Sloga", "Klub sa širokim spektrom muzike, kod nas pjevaju samo najbolji", 2);
INSERT INTO place (id, name, description, address_id) VALUES
  (3, "Narodno pozorište Sarajevo",
   "Narodno pozorište u Sarajevu, mjesto brojnih predstava i kulturnoumjetničkih dešavanja", 3);
INSERT INTO place (id, name, description, address_id) VALUES
  (4, "SARTR", "Sarajevski ratni teatar", 4);
INSERT INTO place (id, name, description, address_id) VALUES
  (5, "Velika sala grada Zenice",
   "Velika sala grada Zenica, u njoj se održavaju sjednice gradskog vijeća i slično", 5);
INSERT INTO place (id, name, description, address_id) VALUES
  (6, "Shopping centar Džananović",
   "Najveći shopping centar u Zenici, sa velikim brojem svjetskih brendova", 6);
INSERT INTO place (id, name, description, address_id) VALUES
  (7, "Multiplex Ekran", "Najbolje kino u gradu", 7);
INSERT INTO place (id, name, description, address_id) VALUES
  (8, "Stadion Bilino polje", "Dom BH Zmajeva!!!", 8);
INSERT INTO place (id, name, description, address_id) VALUES
  (9, "Dvorana Mejdan", "Poznata tuzlanska dvorana, dom brojnih naših reprezentacija", 9);

INSERT INTO category (id, name, description) VALUES (1, "Muzika", "Svi muzički eventi");
INSERT INTO category (id, name, description) VALUES (2, "Sport", "Svi sportski eventi");
INSERT INTO category (id, name, description) VALUES (3, "Nauka", "Svi naučni eventi");
INSERT INTO category (id, name, description) VALUES (4, "Kultura", "Svi kulturni eventi");
INSERT INTO category (id, name, description) VALUES (5, "Zabava", "Svi zabavni eventi");

INSERT INTO event (id, name, date_time, picture_url, description, category_id, place_id) VALUES
  (1, "Rada Manojlović u My Faceu", "2018-08-10 22:00:00",
   "http://www.kupikartu.ba/img/sd2/850x370/usr/karte/RADASFFWEB.jpg",
   "Samo za vas, 10.08.2018. dovodimo u Sarajevo jednu od najvećih pjevačica Balkana u My Face, na otvorenje SFF-a", 1,
   1);
INSERT INTO event (id, name, date_time, picture_url, description, category_id, place_id) VALUES
  (2, "Katarina Grujić u My Faceu", "2018-04-20 22:00:00", "https://www.kupikartu.ba/img/sd2/850x370/usr/karte/COVER-KATARINA.JPG",
   "U klub My Face, u petak,  20.04.2018. dolazi Katarina Grujić. Dođite na Kaću da ludujemoo", 1,
   1);
INSERT INTO event (id, name, date_time, picture_url, description, category_id, place_id) VALUES
  (3, "Student night u Slogi", "2017-11-09 22:00:00", "https://adriafest.com/wp-content/uploads/2017/11/22687547_1872015086171800_2211100755000367299_n-740x274.png",
   "U četvrtak, 09.11.2014. Cinemas club Sloga organizuje student night. Studenti, dođite na najbolji provod u gradu!",
   1, 2);
INSERT INTO event (id, name, date_time, picture_url, description, category_id, place_id) VALUES
  (4, "Utakmica BiH - Crna Gora", "2015-11-05 14:29:36", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNMyKQmbMGaEycwDovTA_-k8wGyu-b5uda-5aMpmhoN9VlH3pC",
   "Na stadionu Bilino polje će, u ponedjeljak, 28.05.2018. snage odmjeriti reprezentacije BiH i Crne Gore. Ovaj utakmica će takođe biti oproštaj naših reprezentativaca Emira Spahića, Vedada Ibiševića, te Zvjezdana Misimovića od reprezentativnog dresa.",
   2, 8);
INSERT INTO event (id, name, date_time, picture_url, description, category_id, place_id) VALUES
  (5, "Utakmica BiH - Belgija u košarci", "2015-11-05 14:29:36", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg7NdYD4y_wFXy_pJBWUEx24Hbxb6cOcXwCUIQs53XBu37sjiaaQ",
   "U dvorani Mejdan, naša reprezentacija dočekuje reprezentaciju Belgije. Dođite i podržite naše reprezentativce u borbi za svjetsko prvenstvo.",
   2, 9);
INSERT INTO event (id, name, date_time, picture_url, description, category_id, place_id) VALUES
  (6, "Utjecaj moderne fizike na život običnog čovjeka", "2015-11-05 14:29:36", "http://1.bp.blogspot.com/-r5l2qxYmdi0/WJDg5XdB0RI/AAAAAAAAGmE/3c3GZR893WYQ5qfSiqKQVGVkQ47gQ4_6gCK4B/s1600/high-school-physics-curriculum-resource-lesson-plans_138308_large.jpg",
   "Imamo priliku da slušamo poznatog BH fizičara Emira Baručiju, koji će nam govoriti o tome kako moderna fizika utiče na život običnog čovjeka",
   3, 5);
INSERT INTO event (id, name, date_time, picture_url, description, category_id, place_id) VALUES
  (7, "Koji fakultet upisati?", "2015-11-05 14:29:36", "https://storage.radiosarajevo.ba/image/339192/1180x732/kampus_univerzitet_sarajevo_RSA8.JPG",
   "Amra Mujčinović, uspješna studentica Elektrotehničkog fakulteta u Sarajevu, će 12.05.2018. godine u Velikoj sali Grada Zenica održati predavanje na temu: Koji fakultet upisati? Predavanje je posvećeno maturantima srednjih škola, te ih pozivamo da dođu u što većem broju.",
   3, 5);
INSERT INTO event (id, name, date_time, picture_url, description, category_id, place_id) VALUES
  (8, "Opera Labuđe jezero", "2015-11-05 14:29:36", "https://1.bp.blogspot.com/-OCegwwiunEo/V2ZgNCHvJ5I/AAAAAAAAPuA/Y6fXcKofxN4XAGHkwWeUCBDwFZ3QwEjmQCLcB/s1600/20160618_222521.jpg",
   "U narodnom pozorištu Sarajevo će se 10.04.2018. održati opera Labuđe jezero Pjotra Iljiča Čajkovskog.",
   4, 3);
INSERT INTO event (id, name, date_time, picture_url, description, category_id, place_id) VALUES
  (9, "Predstava Hamlet u selu Mrđuša donja", "2015-11-05 14:29:36", "https://sarajevo.travel/assets/photos/events/original/hamlet-in-the-village-of-mrdusa-donja-or-hamlet-knows-what-people-dont-know-1445246774.jpg",
   "U Sartru će se 05.06.2018. godine održati predstava Hamlet u selu Mrđuša donja, spisatelja Ive Brešana",
   4, 4);
INSERT INTO event (id, name, date_time, picture_url, description, category_id, place_id) VALUES
  (10, "SFF otvaranje", "2015-11-05 14:29:36", "http://media.zagrebdox.net/zagreb_dox/news_item_translations/img/000/001/026/lightbox/Sarajevo_Film_Festival.jpg?1532529205",
   "Prva noć otvaranja SFF-a, ispred Narodnog pozorišta.", 4, 3);
INSERT INTO event (id, name, date_time, picture_url, description, category_id, place_id) VALUES
  (11, "Igre za najmlađe", "2015-11-05 14:29:36", "http://cdn.dubrovniknet.hr/mdata2014/1511349330_241_velika_lunapark003.jpg",
   "Dođite 12.05.2018. u Shopping centar Džananović, jer priređujemo puno igara i zabave za vaše najmlađe",
   5, 6);
INSERT INTO event (id, name, date_time, picture_url, description, category_id, place_id) VALUES
  (12, "Premijera filma Fast and Furious 9", "2015-11-05 14:29:36", "https://i.ytimg.com/vi/J0iuDbpmjSk/hqdefault.jpg",
   "Premijerno u Multiplexu Ekran predstavljamo najnoviji nastavak franšize Fast and Furoius, dođite da zajedno gledamo Vin Diesela u akciji!!!",
   5, 7);
INSERT INTO event (id, name, date_time, picture_url, description, category_id, place_id) VALUES
  (13, "OC JAHORINA - JahorinSKI Retro Opening @Jahorina", "2015-11-05 14:29:36", "https://www.kupikartu.ba/img/sd2/850x370/usr/karte/banerJAHORINA.jpg",
   "Prodajna mjesta
   Pored online kupovine svoje karte možete kupiti i na našim prodajnim mjestima. Potražite nas i u Vašem gradu!",
   2, 9);
INSERT INTO event (id, name, date_time, picture_url, description, category_id, place_id) VALUES
  (14, "OSNOVNI PRINCIPI UI-A I UX-A", "2018-12-05 14:29:36", "https://webbootcamp.eu/wp-content/uploads/2016/09/ux.png",
  "Aleksandra je u dizajn vodama preko pet godina i trenutno radi u Namics-u, vodećoj švajcerskoj web agenciji. Interesuje je UX, dok u slobodno vreme istražuje rodnu perspektivu dizajna i dizajn metodologia rada.


U svom detaljnom predavanju Aleksandra će objasniti sledeće pojmove:

Šta je UI
UI standardi
Šta je UX
Istraživačke metode UX-a
Styleguide
Persone
Wireframe
Protototip",
   3, 5);
INSERT INTO event (id, name, date_time, picture_url, description, category_id, place_id) VALUES
  (15, "Toni Cetinski u Zetri", "2019-03-09 20:00:00",
   "https://www.kupikartu.ba/img/sd2/850x370/usr/karte/850x370zetra.jpg",
   "Tony Cetinski će 9. marta s početkom u 20 sati na zadovoljstvo njegovih brojnih fanova iz BiH održati veliki koncert u sarajevskoj dvorani Zetra.
Dok teku pripreme za veliki koncert u Sarajevu Tony je nekoliko dana proveo u Johanesburgu gdje je snimio dvije pjesme i spot u saradnji sa klapom Ova klapa sa Korčule. ", 1,
   1);

INSERT INTO event (id, name, date_time, picture_url, description, category_id, place_id) VALUES
  (16, "Bijelo Dugme na Bjelašnici", "2018-12-29 14:00:00",
   "https://cdn-az.allevents.in/banners/6a075ce0-07a0-11e9-857a-334ae117f478-rimg-w300-h300-gmir.jpg",
   "Hajdemo u planine jer tamo nema zime...
Legendarni Sarajlija Goran Bregović zajedno s Alenom Islamovićem i Mladenom Vojičićem Tifom tim koncertom će upotpunit slavljeničku atmosferu

Promocija povodom otvorenja zimske ski sezone ”Bjelašnica-Igman 2018/2019” bit će održana sutra na Bjelašnici.


Bit će predstavljen program manifestacije „Hajdemo u planine“ u okviru koje će u subotu, 29. decembra, na otvorenom prostoru (Babin do) biti održan koncert grupe Bijelo dugme, s početkom u 14.00 sati.

Legendarni Sarajlija Goran Bregović zajedno s Alenom Islamovićem i Mladenom Vojičićem Tifom tim koncertom će upotpunit slavljeničku atmosferu povodom 35. rođendana ZOI'84.

Na promociji će se obratiti direktor ZOI'84 Nevres Alispahić, Midhat Hubijar direktor Turističke zajednice KS, Mevludin Halilović komesar MUP-a KS, kao i lider grupe ”Bijelo Dugme” Goran Bregović s rediteljem Ademirom Kenovićem – prijateljem projekta i autorom teksta ”Hajdemo u planine”, saopćili su organizatori.", 1,
   1);

INSERT INTO role (id, role) VALUES (1, "ROLE_ADMIN");
INSERT INTO role (id, role) VALUES (2, "ROLE_USER");

INSERT INTO user (id, username, password, email, ime, prezime, role_id, place_id) VALUES
  (1, "emir", "$2a$10$Bu.YiMq3oEfBacnDzmQTXuCOp1pbdrLKfANDCl0HSxhP18k1sFIBW", "emir@etf.unsa.ba",
   "Emir", "Baručija",
   2, 1);
INSERT INTO user (id, username, password, email, ime, prezime, role_id, place_id) VALUES
  (2, "amra", "$2a$10$xAAg86.kvnnViZSJk12dSuE11eA2tSvI3RfH1sHxVxokH3LCe6H8S", "amra@etf.unsa.ba",
   "Amra", "Mujčinović",
   1, NULL);
INSERT INTO user (id, username, password, email, ime, prezime, role_id, place_id) VALUES
  (3, "berina", "$2a$10$GGn8m1qsJqqu2skTJQ5Nt.varlE1kKInQ/nz2oUStoqlrdvkECBtq",
   "berina@etf.unsa.ba", "Berina",
   "Muhović", 2, 2);