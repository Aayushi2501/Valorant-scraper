-- CreateTable
CREATE TABLE `PlayerStats` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `playerName` VARCHAR(191) NOT NULL,
    `org` VARCHAR(191) NULL,
    `agents` VARCHAR(191) NOT NULL,
    `roundsPlayed` VARCHAR(191) NOT NULL,
    `rating` VARCHAR(191) NOT NULL,
    `averageCombatScore` VARCHAR(191) NOT NULL,
    `killDeaths` VARCHAR(191) NOT NULL,
    `killAssistsSurvivedTraded` VARCHAR(191) NOT NULL,
    `averageDamagePerRound` VARCHAR(191) NOT NULL,
    `killsPerRound` VARCHAR(191) NOT NULL,
    `assistsPerRound` VARCHAR(191) NOT NULL,
    `firstKillsPerRound` VARCHAR(191) NOT NULL,
    `firstDeathsPerRound` VARCHAR(191) NOT NULL,
    `headshotPercentage` VARCHAR(191) NOT NULL,
    `clutchSuccessPercentage` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
