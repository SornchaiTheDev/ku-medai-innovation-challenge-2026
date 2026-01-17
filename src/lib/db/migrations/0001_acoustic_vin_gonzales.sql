DROP TABLE "profiles" CASCADE;--> statement-breakpoint
ALTER TABLE "team_members" ADD COLUMN "user_id" text;--> statement-breakpoint
ALTER TABLE "team_members" ADD COLUMN "is_leader" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "teams" DROP COLUMN "leader_id";