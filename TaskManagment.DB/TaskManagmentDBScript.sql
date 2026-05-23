-- =========================================
-- TASK MANAGEMENT DATABASE
-- =========================================

CREATE DATABASE TaskManagementDB;
GO

USE TaskManagementDB;
GO

-- =========================================
-- USERS TABLE (Authentication)
-- =========================================

CREATE TABLE Users (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Username NVARCHAR(100) NOT NULL UNIQUE,
    Password NVARCHAR(100) NOT NULL
);
GO

-- =========================================
-- TASKS TABLE (CRUD)
-- =========================================

CREATE TABLE Tasks (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Title NVARCHAR(200) NOT NULL,
    Description NVARCHAR(500) NULL,
    IsCompleted BIT NOT NULL DEFAULT 0,
    Priority INT NOT NULL DEFAULT 1,
    DueDate DATETIME NULL,
    CreatedDate DATETIME NOT NULL DEFAULT GETDATE()
);
GO

-- =========================================
-- SAMPLE DATA - USERS
-- =========================================

INSERT INTO Users (Username, Password)
VALUES ('User', 'user123');
GO