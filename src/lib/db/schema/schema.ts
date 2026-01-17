import {
  boolean,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

export const educationTypeEnum = pgEnum('education_type', [
  'high_school',
  'university',
])

export const trackEnum = pgEnum('track', ['agro_medicine', 'bioinnovation'])

export const teamStatusEnum = pgEnum('status', [
  'registered',
  'submitted',
  'finalized',
])

export const teams = pgTable('teams', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  track: trackEnum('track').notNull(),
  status: teamStatusEnum('status').default('registered'),
  createdAt: timestamp('created_at').defaultNow(),
})

export const teamMembers = pgTable('team_members', {
  id: serial('id').primaryKey(),
  userId: text('user_id'),
  teamId: serial('team_id').references(() => teams.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  phone: text('phone').notNull(),
  educationType: educationTypeEnum('education_type').notNull(),
  educationDetails: text('education_details').notNull(),
  isLeader: boolean('is_leader').default(false),
})

export const teamsRelations = relations(teams, ({ many }) => ({
  members: many(teamMembers),
}))

export const teamMembersRelations = relations(teamMembers, ({ one }) => ({
  team: one(teams, {
    fields: [teamMembers.teamId],
    references: [teams.id],
  }),
}))

export type Team = typeof teams.$inferSelect
export type InsertTeam = typeof teams.$inferInsert
export type TeamMember = typeof teamMembers.$inferSelect
export type InsertTeamMember = typeof teamMembers.$inferInsert
