CREATE TABLE `config` (
	`key` text PRIMARY KEY NOT NULL,
	`value` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `config_key_unique` ON `config` (`key`);--> statement-breakpoint
CREATE TABLE `vs_account` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text NOT NULL,
	`player_name` text NOT NULL,
	`player_uid` text NOT NULL,
	`player_entitlements` text NOT NULL,
	`session_key` text NOT NULL,
	`session_signature` text NOT NULL,
	`mptoken` text,
	`host_game_server` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `vs_account_id_unique` ON `vs_account` (`id`);--> statement-breakpoint
CREATE TABLE `vs_instance` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`path` text NOT NULL,
	`version` text NOT NULL,
	`start_params` text NOT NULL,
	`backups_limit` integer NOT NULL,
	`backups_auto` integer NOT NULL,
	`compression_level` integer NOT NULL,
	`last_time_played` integer NOT NULL,
	`total_time_played` integer NOT NULL,
	`mesa_gl_thread` integer NOT NULL,
	`env_vars` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `vs_instance_id_unique` ON `vs_instance` (`id`);--> statement-breakpoint
CREATE TABLE `vs_instance_backup` (
	`id` text PRIMARY KEY NOT NULL,
	`vs_instance_id` integer,
	`date` integer NOT NULL,
	`path` text NOT NULL,
	FOREIGN KEY (`vs_instance_id`) REFERENCES `vs_instance`(`id`) ON UPDATE cascade ON DELETE set null
);
--> statement-breakpoint
CREATE UNIQUE INDEX `vs_instance_backup_id_unique` ON `vs_instance_backup` (`id`);--> statement-breakpoint
CREATE TABLE `vs_version` (
	`version` text PRIMARY KEY NOT NULL,
	`path` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `vs_version_version_unique` ON `vs_version` (`version`);