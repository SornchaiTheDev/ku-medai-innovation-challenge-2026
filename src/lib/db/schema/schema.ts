import { pgTable, serial, text, timestamp, pgEnum } from 'drizzle-orm/pg-core'
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

export const profiles = pgTable('profiles', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull().unique(),
  phone: text('phone').notNull(),
  educationType: educationTypeEnum('education_type').notNull(),
  schoolName: text('school_name'),
  grade: text('grade'),
  university: text('university'),
  faculty: text('faculty'),
  studentId: text('student_id'),
  createdAt: timestamp('created_at').defaultNow(),
})

export const teams = pgTable('teams', {
  id: serial('id').primaryKey(),
  leaderId: text('leader_id').notNull(),
  name: text('name').notNull(),
  track: trackEnum('track').notNull(),
  status: teamStatusEnum('status').default('registered'),
  createdAt: timestamp('created_at').defaultNow(),
})

export const teamMembers = pgTable('team_members', {
  id: serial('id').primaryKey(),
  teamId: serial('team_id').references(() => teams.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  phone: text('phone').notNull(),
  educationType: educationTypeEnum('education_type').notNull(),
  educationDetails: text('education_details').notNull(),
})

export const profilesRelations = relations(profiles, ({ many }) => ({
  teams: many(teams),
}))

export const teamsRelations = relations(teams, ({ one, many }) => ({
  leader: one(profiles, {
    fields: [teams.leaderId],
    references: [profiles.userId],
  }),
  members: many(teamMembers),
}))

export const teamMembersRelations = relations(teamMembers, ({ one }) => ({
  team: one(teams, {
    fields: [teamMembers.teamId],
    references: [teams.id],
  }),
}))

export type Profile = typeof profiles.$inferSelect
export type InsertProfile = typeof profiles.$inferInsert
export type Team = typeof teams.$inferSelect
export type InsertTeam = typeof teams.$inferInsert
export type TeamMember = typeof teamMembers.$inferSelect
export type InsertTeamMember = typeof teamMembers.$inferInsert
