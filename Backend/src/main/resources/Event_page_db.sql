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
  `description` TEXT                      DEFAULT NULL,
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
  PRIMARY KEY (`id`),
  KEY `fk_user_role_id_idx` (`role_id`),
  CONSTRAINT `fk_book_role_id` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

CREATE TABLE `comment` (
  `id`       INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `comment`  VARCHAR(255)              DEFAULT NULL,
  `user_id`  INT(10) UNSIGNED          DEFAULT NULL,
  `event_id` INT(10) UNSIGNED          DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_comment_user_id_idx` (`user_id`),
  KEY `fk_comment_event_id_idx` (`event_id`),
  CONSTRAINT `fk_comment_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_comment_event_id` FOREIGN KEY (`event_id`) REFERENCES `event` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

CREATE TABLE `grade` (
  `id`       INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `grade`    INT(10)                   DEFAULT NULL,
  `user_id`  INT(10) UNSIGNED          DEFAULT NULL,
  `event_id` INT(10) UNSIGNED          DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_grade_user_id_idx` (`user_id`),
  KEY `fk_grade_event_id_idx` (`event_id`),
  CONSTRAINT `fk_grade_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_grade_event_id` FOREIGN KEY (`event_id`) REFERENCES `event` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

CREATE TABLE `status` (
  `id`       INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `status`   VARCHAR(255)              DEFAULT NULL,
  `user_id`  INT(10) UNSIGNED          DEFAULT NULL,
  `event_id` INT(10) UNSIGNED          DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_status_user_id_idx` (`user_id`),
  KEY `fk_status_event_id_idx` (`event_id`),
  CONSTRAINT `fk_status_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_status_event_id` FOREIGN KEY (`event_id`) REFERENCES `event` (`id`)
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
  (1, "MyFace", "Najbolja muzika u gradu je kod nas", 1);
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

INSERT INTO event (id, name, description, category_id, place_id) VALUES
  (1, "Rada Manojlović u MyFaceu",
   "Samo za vas, 04.05.2018. dovodimo u Sarajevo jednu od najvećih pjevačica Balkana u MyFace", 1,
   1);
INSERT INTO event (id, name, description, category_id, place_id) VALUES
  (2, "Katarina Grujić u MyFaceu",
   "U klub MyFace, u petak,  11.05.2018. dolazi Katarina Grujić. Dođite na Kaću da ludujemoo", 1,
   1);
INSERT INTO event (id, name, description, category_id, place_id) VALUES
  (3, "Student night u Slogi",
   "U četvrtak, 10.05.2018. Cinemas club Sloga organizuje student night. Studenti, dođite na najbolji provod u gradu!",
   1, 2);
INSERT INTO event (id, name, description, category_id, place_id) VALUES
  (4, "Utakmica BiH - Crna Gora",
   "Na stadionu Bilino polje će, u ponedjeljak, 28.05.2018. snage odmjeriti reprezentacije BiH i Crne Gore. Ovaj utakmica će takođe biti oproštaj naših reprezentativaca Emira Spahića, Vedada Ibiševića, te Zvjezdana Misimovića od reprezentativnog dresa.",
   2, 8);
INSERT INTO event (id, name, description, category_id, place_id) VALUES
  (5, "Utakmica BiH - Belgija u košarci",
   "U dvorani Mejdan, naša reprezentacija dočekuje reprezentaciju Belgije. Dođite i podržite naše reprezentativce u borbi za svjetsko prvenstvo.",
   2, 9);
INSERT INTO event (id, name, description, category_id, place_id) VALUES
  (6, "Utjecaj moderne fizike na život običnog čovjeka",
   "Imamo priliku da slušamo poznatog BH fizičara Emira Baručiju, koji će nam govoriti o tome kako moderna fizika utiče na život običnog čovjeka",
   3, 5);
INSERT INTO event (id, name, description, category_id, place_id) VALUES
  (7, "Koji fakultet upisati?",
   "Amra Mujčinović, uspješna studentica Elektrotehničkog fakulteta u Sarajevu, će 12.05.2018. godine u Velikoj sali Grada Zenica održati predavanje na temu: Koji fakultet upisati? Predavanje je posvećeno maturantima srednjih škola, te ih pozivamo da dođu u što većem broju.",
   3, 5);
INSERT INTO event (id, name, description, category_id, place_id) VALUES
  (8, "Opera Labuđe jezero",
   "U narodnom pozorištu Sarajevo će se 10.04.2018. održati opera Labuđe jezero Pjotra Iljiča Čajkovskog.",
   4, 3);
INSERT INTO event (id, name, description, category_id, place_id) VALUES
  (9, "Predstava Hamlet u selu Mrđuša donja",
   "U Sartru će se 05.06.2018. godine održati predstava Hamlet u selu Mrđuša donja, spisatelja Ive Brešana",
   4, 4);
INSERT INTO event (id, name, description, category_id, place_id) VALUES
  (10, "SFF otvaranje", "Prva noć otvaranja SFF-a, ispred Narodnog pozorišta.", 4, 3);
INSERT INTO event (id, name, description, category_id, place_id) VALUES
  (11, "Igre za najmlađe",
   "Dođite 12.05.2018. u Shopping centar Džananović, jer priređujemo puno igara i zabave za vaše najmlađe",
   5, 6);
INSERT INTO event (id, name, description, category_id, place_id) VALUES
  (12, "Premijera filma Fast and Furious 9",
   "Premijerno u Multiplexu Ekran predstavljamo najnoviji nastavak franšize Fast and Furoius, dođite da zajedno gledamo Vin Diesela u akciji!!!",
   5, 7);

INSERT INTO role (id, role) VALUES (1, "ROLE_ADMIN");
INSERT INTO role (id, role) VALUES (2, "ROLE_USER");

INSERT INTO user (id, username, password, email, ime, prezime, role_id) VALUES
  (1, "emir", "$2a$10$Bu.YiMq3oEfBacnDzmQTXuCOp1pbdrLKfANDCl0HSxhP18k1sFIBW", "emir@etf.unsa.ba",
   "Emir", "Baručija",
   2);
INSERT INTO user (id, username, password, email, ime, prezime, role_id) VALUES
  (2, "amra", "$2a$10$xAAg86.kvnnViZSJk12dSuE11eA2tSvI3RfH1sHxVxokH3LCe6H8S", "amra@etf.unsa.ba",
   "Amra", "Mujčinović",
   1);
INSERT INTO user (id, username, password, email, ime, prezime, role_id) VALUES
  (3, "berina", "$2a$10$GGn8m1qsJqqu2skTJQ5Nt.varlE1kKInQ/nz2oUStoqlrdvkECBtq",
   "berina@etf.unsa.ba", "Berina",
   "Muhović", 2);

INSERT INTO status (id, status, user_id, event_id) VALUES (1, "idem", 1, 1);
INSERT INTO status (id, status, user_id, event_id) VALUES (2, "idem", 1, 2);
INSERT INTO status (id, status, user_id, event_id) VALUES (3, "možda", 3, 10);
INSERT INTO status (id, status, user_id, event_id) VALUES (4, "možda", 1, 9);
INSERT INTO status (id, status, user_id, event_id) VALUES (5, "idem", 3, 2);
INSERT INTO status (id, status, user_id, event_id) VALUES (6, "idem", 3, 8);
INSERT INTO status (id, status, user_id, event_id) VALUES (7, "idem", 1, 6);

INSERT INTO comment (id, comment, user_id, event_id) VALUES (1, "Odličnoo ekstra provod", 1, 1);
INSERT INTO comment (id, comment, user_id, event_id)
VALUES (2, "Kaćaa ekstra vrh hvalaa MyFace", 1, 2);
INSERT INTO comment (id, comment, user_id, event_id) VALUES (3, "Super provod", 3, 2);
INSERT INTO comment (id, comment, user_id, event_id)
VALUES (4, "Super je što je opera došla i u Sarajevo", 3, 8);
INSERT INTO comment (id, comment, user_id, event_id) VALUES (5, "Odlično predavanje", 1, 6);

INSERT INTO grade (id, grade, user_id, event_id) VALUES (1, 5, 1, 1);
INSERT INTO grade (id, grade, user_id, event_id) VALUES (2, 5, 1, 2);
INSERT INTO grade (id, grade, user_id, event_id) VALUES (3, 5, 3, 2);
INSERT INTO grade (id, grade, user_id, event_id) VALUES (4, 4, 3, 8);
INSERT INTO grade (id, grade, user_id, event_id) VALUES (5, 5, 1, 6);
