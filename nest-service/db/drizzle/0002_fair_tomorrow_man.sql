ALTER TABLE `users` ADD `phone` varchar(20);--> statement-breakpoint
ALTER TABLE `users` ADD `avatar` varchar(255);--> statement-breakpoint
ALTER TABLE `users` ADD `nickname` varchar(50);--> statement-breakpoint
ALTER TABLE `users` ADD `status` int DEFAULT 1;