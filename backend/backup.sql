-- MySQL dump 10.13  Distrib 8.0.33, for Linux (x86_64)
--
-- Host: localhost    Database: jeans_shop
-- ------------------------------------------------------
-- Server version	8.0.33-0ubuntu0.22.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `article`
--

DROP TABLE IF EXISTS `article`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `article` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `size` varchar(255) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `is_adult` tinyint NOT NULL,
  `colour` varchar(255) DEFAULT NULL,
  `is_favourite` tinyint NOT NULL,
  `price` int NOT NULL,
  `discount` int DEFAULT NULL,
  `quantity_stock` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article`
--

LOCK TABLES `article` WRITE;
/*!40000 ALTER TABLE `article` DISABLE KEYS */;
INSERT INTO `article` VALUES (1,'Levi\'s Kidssssst 505 Regular Fit Jeans','Pants','S','Male',0,'Blue',0,3499,15,55),(2,'G-Star RAW Kids Rovic Loose Shorts','Shorts','M','Male',0,'Khaki',0,2599,10,40),(3,'Levi\'s Women\'s Classic Trucker Jacket','Jackets','M','Female',1,'Light Blue',0,8999,25,60),(4,'Levi\'s Men\'s 511 Slim Fit Jeans','Pants','L','Male',1,'Dark Blue',0,6999,20,50),(5,'G-Star RAW Men\'s Rovic Zip 3D Tapered Pants','Pants','XL','Male',1,'Olive',1,7499,30,30),(6,'Levi\'s Men\'s 505 Regular Fit Jeans','Pants','XXL','Male',1,'Medium Wash',0,6499,15,90),(7,'G-Star RAW Women\'s Lynn Mid Waist Skinny Jeans','Pants','S','Female',1,'Dark Indigo',0,8499,20,40),(8,'Levi\'s Men\'s Short Sleeve Classic Western Shirt','Shirts','L','Male',1,'Red',0,4999,10,120),(9,'Levi\'s Kids 710 Super Skinny Jeans','Pants','S','Female',0,'Black',0,3899,10,35),(10,'G-Star RAW Women\'s Logo Graphic T-Shirt','T-shirts','M','Female',1,'White',1,2999,15,150),(13,'Levi\'s Kidsss 505 Regular Fit Jeans','Pantss','S','Male',0,'Blue',0,3499,15,50);
/*!40000 ALTER TABLE `article` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_details`
--

DROP TABLE IF EXISTS `order_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `article_id` int NOT NULL,
  `order_id` int NOT NULL,
  `quantity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_article_has_order_order1_idx` (`order_id`),
  KEY `fk_article_has_order_article1_idx` (`article_id`),
  CONSTRAINT `fk_article_has_order_article1` FOREIGN KEY (`article_id`) REFERENCES `article` (`id`),
  CONSTRAINT `fk_article_has_order_order1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_details`
--

LOCK TABLES `order_details` WRITE;
/*!40000 ALTER TABLE `order_details` DISABLE KEYS */;
INSERT INTO `order_details` VALUES (1,1,1,25),(2,3,1,1),(3,2,2,1),(4,4,3,3),(5,6,4,2),(6,10,5,5),(8,10,9,5);
/*!40000 ALTER TABLE `order_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `status` varchar(155) NOT NULL,
  `card_no` varchar(16) DEFAULT NULL,
  `expiration_date` date DEFAULT NULL,
  `cvv_code` int DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `card_no_UNIQUE` (`card_no`),
  KEY `fk_order_user1_idx` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,'2023-08-31','created','1234567890123146','2024-08-31',923,1),(2,'2023-09-02','purchased','9876543210123456','2024-09-02',456,2),(3,'2023-09-03','delivered','4567890123456789','2024-09-03',789,3),(4,'2023-09-04','created','2345678901234567','2024-09-04',234,4),(5,'2023-09-05','purchased','7654321098765432','2024-09-05',567,5),(6,'2023-09-08','purchased','7654321098768432','2024-09-03',574,2),(9,'2023-08-31','created','1231567890123456','2024-08-31',183,13);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(155) NOT NULL,
  `last_name` varchar(155) NOT NULL,
  `birth_date` date NOT NULL,
  `phone` varchar(15) NOT NULL,
  `email` varchar(155) NOT NULL,
  `address` varchar(155) NOT NULL,
  `zip_code` int NOT NULL,
  `city` varchar(155) NOT NULL,
  `password` varchar(155) NOT NULL,
  `is_admin` tinyint NOT NULL,
  `subscription_date` date NOT NULL,
  `expo_push_token` varchar(255) DEFAULT NULL,
  `password_token` varchar(255) DEFAULT NULL,
  `password_token_expiration` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `phone_UNIQUE` (`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'John','Doe','1990-05-15','0612345678','john.doe@email.com','123 Main St',12345,'New York','test',1,'2023-09-10',NULL,NULL,NULL),(2,'Jane','Smith','1985-08-20','0623456789','jane.smith@email.com','456 Elm St',54321,'Los Angeles','test',0,'2023-08-15',NULL,NULL,NULL),(3,'Mike','Johnson','1995-03-10','0634567890','mike.johnson@email.com','789 Oak St',67890,'Chicago','test',0,'2023-09-01',NULL,NULL,NULL),(4,'Emily','Williams','1988-11-25','0645678901','emily.williams@email.com','101 Pine St',98765,'Houston','test',0,'2023-08-28',NULL,NULL,NULL),(5,'Chris','Brown','1992-09-30','0656789012','chris.brown@email.com','222 Maple St',13579,'Miami','test',0,'2023-09-05',NULL,NULL,NULL),(11,'John','Doe','1990-05-13','0612344547','john.doeeere@email.com','123 Main St',12345,'New Yorkkky','test',1,'2023-09-08',NULL,NULL,NULL),(13,'Adrian','Mark','1989-02-14','0616152715','adrian.markkk@email.com','123 Main Sttt',38111,'New Yorkyyy','$argon2id$v=19$m=65536,t=3,p=4$0qeeczCYz6yE6kpjzwrdpw$0Yf19C+fTlVbTugk9r/0WdjeoIGQ1KKGFkDJsOcv1HI',1,'2023-09-01',NULL,NULL,NULL),(17,'John','Doe','1990-05-13','0612344544','john.doeeer@email.com','123 Main St',12345,'New Yorkkky','test',1,'2023-09-08',NULL,NULL,NULL),(19,'John','Doe','1990-05-14','0612348644','john.doeeeetyrttr@email.com','123 Main St',12345,'New York','test',1,'2023-09-09',NULL,NULL,NULL),(22,'John','Doe','1990-05-14','0612345444','test@test.com','123 Main St',12345,'New York','$argon2id$v=19$m=65536,t=3,p=4$2ieFx3U3xqx9Ro8F2IhDtQ$1+TTatQOmOHkJyJb18s1+zmE1I1csgeoqeA5MUiB+l8',1,'2023-09-09',NULL,'fchpcdyal7ijoeoq8e1gwk','2023-09-20'),(23,'John','Doe','1990-05-14','061237894','test999@test.com','123 Main St',12345,'New York','$argon2id$v=19$m=65536,t=3,p=4$NO9NL2T9YvD5yvgclQ/zSg$IC/2RUC3RfRaOvn2SWwGpOBAq0LOKPGK+tcBzrsD6vc',1,'2023-09-13',NULL,NULL,NULL),(24,'John','Doe','1990-05-14','061237884','test9949@test.com','123 Main St',12345,'New York','$argon2id$v=19$m=65536,t=3,p=4$LdEovJ+swmDWNVE0gPIavA$7fQln9W8oqryms3gmloHLNBn6iypKbOyYg/HyZIxhGc',1,'2023-09-13',NULL,NULL,NULL),(25,'Adrian','Marculescu','1988-08-01','0616152895','test1@test.com','123 Main St',69000,'lyon','$argon2id$v=19$m=65536,t=3,p=4$j4w1bAgiXvvb6jUa7gsFOg$QNTK0pHhqyJ2qQIZp3KZWKp7DrtmPYlfA4cZyLl2zhw',0,'2023-09-13',NULL,NULL,NULL),(27,'Adrian','Marculescu','1988-08-01','0616152898','test2@test.com','123 Main St',69000,'lyon','$argon2id$v=19$m=65536,t=3,p=4$kSODFo1TQqFWvU+djlbdZA$CnAQb4a3gi1YRaU6S3mj9E/TG9Rdj5ePtrewqPUrQ+s',0,'2023-09-13',NULL,NULL,NULL),(28,'Adrian','Marculescu','1988-08-01','0616152899','test11@test.com','123 Main St',69000,'lyon','$argon2id$v=19$m=65536,t=3,p=4$9WPO1A/WkkOR1QByAPybwA$RFMjLYR9wzOrtFpNiSU5US5d0YMM3SA9J5fRp/3KvYc',0,'2023-09-13',NULL,NULL,NULL),(29,'Adrian','Marculescu','1988-08-01','0616152878','test11@test.comm','123 Main St',69000,'lyon','$argon2id$v=19$m=65536,t=3,p=4$jUq5sk1vZo/2A8xTGbXjGA$uEQvBE3omTzLse1lh7lXwhTcXbSifmuj143tTgzRs/E',0,'2023-09-13',NULL,NULL,NULL),(31,'Adrian','Marculescu','1988-08-01','0616157891','testr11@test.comr','123 Main St',69000,'lyon','$argon2id$v=19$m=65536,t=3,p=4$nkirYhoFl5G+jaeu2r+B4w$FGrPoUiuyZ5dJrh7irI6uMzklO+O0wdj56KUHIRLn90',0,'2023-09-13',NULL,NULL,NULL),(32,'Adrian','Marculescu','1988-08-01','0617157891','testr11@test.comra','123 Main St',69000,'lyon','$argon2id$v=19$m=65536,t=3,p=4$gmHYPKudfNqiqE6KNLsasA$OozPz6cBpP9iIpAssxeuVjf5hLEGkxLuBozZt/gGV+I',0,'2023-09-13',NULL,NULL,NULL),(33,'Adrian','Marculescu','1988-08-01','0617157891a','testr11@test.comraa','123 Main St',69000,'lyon','$argon2id$v=19$m=65536,t=3,p=4$0F8Um1Ie3pgXWS8JrzKY7w$lGtbv84hi6ntjznHS0FejmX7yX6krJqtYew+sY7qYWA',0,'2023-09-13',NULL,NULL,NULL),(34,'Adrian','Marculescu','1988-08-01','0617157891aa','testr11@test.comraaa','123 Main St',69000,'lyon','$argon2id$v=19$m=65536,t=3,p=4$ABdLYKcAgMReZphMoUqq2A$4EsbxuodOw0oJPKhTYqe5qHF9k/3a2Y/TRtMdwPJYTQ',0,'2023-09-13',NULL,NULL,NULL),(35,'Adrian','Marculescu','1988-08-01','0616157899az','testr11@test.comaz','123 Main St',69000,'lyon','$argon2id$v=19$m=65536,t=3,p=4$FIlu8ldo5sDxvAZZQXAZ2w$pMotIRaRKMQBwioxMsgBgdeo4pS6A1KbwCJsvNfCix4',0,'2023-09-13',NULL,NULL,NULL),(36,'Adrian','Marculescu','1988-08-01','0616157899azr','testr11@test.comaza','123 Main St',69000,'lyon','$argon2id$v=19$m=65536,t=3,p=4$8ZdloDlXZP8PTl0GaOGH8A$qS6nbviNtQ6avRED0rc/zmJ7Q5UMOOaP08eAr+mumPQ',0,'2023-09-13',NULL,NULL,NULL),(37,'Adrian','Marculescu','1988-08-01','0616157899azrz','testr11@test.comazaz','123 Main St',69000,'lyon','$argon2id$v=19$m=65536,t=3,p=4$A6kMK9pFPs29/Fm4z3S5Ug$JzF6x3q7UB5q3yCeyARoE9NPzBEqus4YgXy37yXgAh0',0,'2023-09-13',NULL,NULL,NULL),(38,'Adrian','Marculescu','1988-08-01','06161475899','testr6@test.com','123 Main St',69000,'lyon','$argon2id$v=19$m=65536,t=3,p=4$ZdwQG3P2ZgODjy3ae5Cwdg$jrMjj4/MrdGJxpZzeMb0hI37sWXytkQxgiD+rNXOnt0',0,'2023-09-13',NULL,NULL,NULL),(39,'Adrian','Marculescu','1988-07-31','06161475156','test66@test.com','123 Main St',69000,'lyon','$argon2id$v=19$m=65536,t=3,p=4$RLc0Cos3OBPOP+NRsp9ZVA$98W1ZxGDi4SylLOFDNoXTLpezlzX6DX/r5+gladppH0',0,'2023-09-18',NULL,NULL,NULL),(40,'Adrian','Marculescu','1988-08-01','0618157899','testr22@test.com','123 Main St',69000,'lyon','$argon2id$v=19$m=65536,t=3,p=4$GTeDp7GAZwsTgrLp+KZv+A$uqxzWyYU6cTf7PxiDbKkDMj217emBdFysq5PPaDhjN4',0,'2023-09-18',NULL,NULL,NULL),(41,'Adriannnn','Marculescu','1988-07-31','061754557899','testr129@test.com','123 Main St',69000,'lyon','test',0,'2023-09-19',NULL,NULL,NULL),(44,'Adrian','Marculescu','1988-08-01','0616157899','testr11@test.com','123 Main St',69000,'lyon','$argon2id$v=19$m=65536,t=3,p=4$ipi8s3EWtV/1cnMD4YaqXw$WiF257NlEr6EKAdE5P69jgrg0OCBL2WMRW2W4biFBjw',0,'2023-09-20',NULL,NULL,NULL),(45,'Johnny','Doe','1990-05-14','061558497','test555@test.com','123 Main St',12345,'New York','$argon2id$v=19$m=65536,t=3,p=4$Sg2AsYRIv4sDVSuF3AaaOQ$Gy86jBno4Ot5YpVrHGlKIElC5a3mmiEhT2+1dYZyjFY',1,'2023-09-22',NULL,NULL,NULL),(51,'Adrian','Marculescu','1988-07-31','0616157814','test888@test.com','123 Main St',69000,'lyontttt','$argon2id$v=19$m=65536,t=3,p=4$37Cor6wnGja7mmCvqqQ9Pg$Gu9KsP8CGiL/j12Kl3f83hnyhenoED5jHmgSZcRtWUc',0,'2023-09-21',NULL,NULL,NULL),(52,'Jane','Smith','1985-08-19','0623456','jane.smiththyrrtt@email.com','456 Elm St',54321,'Los Angeles','$argon2id$v=19$m=65536,t=3,p=4$C3VOmH+AOYGCcK8+4wStSg$vu0Ej+4Smd0Dc8d2AVW7I2GYchdICqTIoQqGn5NJYI8',0,'2023-09-22',NULL,NULL,NULL),(55,'Jane','Smith','1985-08-19','0623456478','jane.smitht@email.com','456 Elm St',54321,'Los Angeles','$argon2id$v=19$m=65536,t=3,p=4$dEPtgXaeFoa5ZjCaE5059Q$HBcPCS9q2omHy2VDvTHdK6GT7mJEgZQhuB9MpIVFJzg',0,'2023-09-22',NULL,NULL,NULL),(58,'Janeedd','Smith','1985-08-18','062347456478','jane.smithtese@email.com','456 Elm St',54321,'Los Angeles','$argon2id$v=19$m=65536,t=3,p=4$04DCDhCZczoMwUb34lflrA$oqHgSlX9y1G5afRqlKLAS8VhfalKn+kYPDxwkCM6NiI',0,'2023-09-22',NULL,NULL,NULL),(60,'John','Doe','1990-05-14','06178','john@email.com','123 Main St',12345,'New York','$argon2id$v=19$m=65536,t=3,p=4$pRSu8WEouycFTTR/j5IaBA$b36TfebsWrA8IySaG6LSQ/4q6Bq6aE2iZE2bWu459Qg',1,'2023-09-09',NULL,NULL,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-25 11:04:55
