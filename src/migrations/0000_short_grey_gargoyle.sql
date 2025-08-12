CREATE TABLE `config` (
	`key` text NOT NULL,
	`value` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `config_key_unique` ON `config` (`key`);