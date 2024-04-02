-- MySQL dump 10.13  Distrib 8.3.0, for macos13.6 (arm64)
--
-- Host: localhost    Database: eigen-backend-test
-- ------------------------------------------------------
-- Server version	8.3.0

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
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `books` (
  `id` char(36) NOT NULL,
  `code` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `stock` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_books_CODE` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES ('3b674245-3add-445e-9347-77be0c782f5f','HT-102','Atomic Habits','Muhamad zain',1),('54a7ff7b-91c6-48f4-a7c3-a5eaac553c69','HOB-83','The Hobbit, or There and Back Again','J.R.R. Tolkien',1),('5576b81c-2e65-43a6-aa35-fb0483920f0b','NRN-7','The Lion, the Witch and the Wardrobe','C.S. Lewis',1),('711de82d-5173-4ff4-a1ee-f296d46b0051','HT-102','Atomic Habits','Muhamad zain',1),('7ec69da4-872c-4f68-afb9-f7241f8cf2f9','HT-102','Atomic Habits','Muhamad zain',1),('92533d72-af55-49ed-b6bc-d81ca80188fe','JK-45','Harry Potter','J.K Rowling',1),('9c88415a-f684-49d5-8678-7e6fe0128b43','HT-102','Atomic Habits','Muhamad zain',1),('9dbe3c21-2438-44d7-813f-63be3e0f0072','HT-102','Atomic Habits','Muhamad zain',1),('e121c0bf-4dca-42f0-ba40-df71446be88c','TW-11','Twilight','Stephenie Meyer',1),('e6f682db-24da-4293-9881-9711048cf476','HT-102','Atomic Habits','Muhamad zain',1),('f7e4d583-5165-4c5d-b850-21dd1b0a662c','SHR-1','A Study in Scarlet','Arthur Conan Doyle',1);
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `borrowed_items`
--

DROP TABLE IF EXISTS `borrowed_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `borrowed_items` (
  `id` char(36) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `member_id` char(36) NOT NULL,
  `book_id` char(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_25999f5fbad759dc6772cad2eeb` (`member_id`),
  KEY `FK_3366fae03d638ba1d850b5ac940` (`book_id`),
  CONSTRAINT `FK_25999f5fbad759dc6772cad2eeb` FOREIGN KEY (`member_id`) REFERENCES `members` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_3366fae03d638ba1d850b5ac940` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `borrowed_items`
--

LOCK TABLES `borrowed_items` WRITE;
/*!40000 ALTER TABLE `borrowed_items` DISABLE KEYS */;
INSERT INTO `borrowed_items` VALUES ('c52fb98d-58fc-4801-8bb5-be56832bc0da','2024-04-02 06:10:21','4cf4d413-434b-4558-a6d1-2c9668fbd567','5576b81c-2e65-43a6-aa35-fb0483920f0b');
/*!40000 ALTER TABLE `borrowed_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `members`
--

DROP TABLE IF EXISTS `members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `members` (
  `id` char(36) NOT NULL,
  `code` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `penalty_status` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `IDX_members_CODE` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `members`
--

LOCK TABLES `members` WRITE;
/*!40000 ALTER TABLE `members` DISABLE KEYS */;
INSERT INTO `members` VALUES ('4cf4d413-434b-4558-a6d1-2c9668fbd567','M001','Angga',0),('76f3b17a-38fa-487e-8b76-70aad5a75fc8','M002','Ferry',0),('97e5893e-d591-4b05-838c-46e0ef7a748c','M004','string',0),('a3355fc9-c8b4-4a07-ac10-1f529e4c4fb1','M003','Putri',0),('d8b6054a-36ec-45d1-94f7-74e124db4127','M004','string',0);
/*!40000 ALTER TABLE `members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `timestamp` bigint NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,1712024730507,'Members1712024730507'),(2,1712024738003,'Books1712024738003'),(3,1712024837678,'BorrowedItems1712024837678'),(5,1712024849779,'BorrowedItems1712024849779');
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'eigen-backend-test'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-02 17:13:57
