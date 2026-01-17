import { z } from 'zod'
import { createFileRoute } from '@tanstack/react-router'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { profiles, teamMembers, teams } from '@/lib/db/schema/schema'

const educationDetailsSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('high_school'),
    schoolName: z.string().min(1),
    grade: z.string().min(1),
  }),
  z.object({
    type: z.literal('university'),
    university: z.string().min(1),
    faculty: z.string().min(1),
  }),
])

const createTeamSchema = z.object({
  teamName: z.string().min(3).max(50),
  track: z.enum(['agro_medicine', 'bioinnovation']),
  leaderProfile: z.object({
    phone: z.string().min(1),
    educationType: z.enum(['high_school', 'university']),
    educationDetails: educationDetailsSchema,
  }),
  members: z
    .array(
      z.object({
        name: z.string().min(1),
        phone: z.string().min(1),
        educationType: z.enum(['high_school', 'university']),
        educationDetails: educationDetailsSchema,
      }),
    )
    .min(2)
    .max(4),
})

export const Route = createFileRoute('/api/team/create')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const session = await auth.api.getSession({
            headers: request.headers,
          })

          if (!session?.session) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 })
          }

          const body = await request.json()
          const input = createTeamSchema.parse(body)

          const userId = session.user.id

          const existingTeam = await db.query.teams.findFirst({
            where: (teams, { eq }) => eq(teams.leaderId, userId),
          })

          if (existingTeam) {
            return Response.json(
              { error: 'You already have a team' },
              { status: 400 },
            )
          }

          const totalMembers = input.members.length + 1
          if (totalMembers < 3 || totalMembers > 5) {
            return Response.json(
              { error: 'Team must have 3-5 members' },
              { status: 400 },
            )
          }

          const leaderProfileData = {
            userId,
            phone: input.leaderProfile.phone,
            educationType: input.leaderProfile.educationType,
            ...(input.leaderProfile.educationDetails.type === 'high_school'
              ? {
                  schoolName: input.leaderProfile.educationDetails.schoolName,
                  grade: input.leaderProfile.educationDetails.grade,
                }
              : {
                  university: input.leaderProfile.educationDetails.university,
                  faculty: input.leaderProfile.educationDetails.faculty,
                }),
          }

          await db
            .insert(profiles)
            .values(leaderProfileData)
            .onConflictDoNothing()

          const [team] = await db
            .insert(teams)
            .values({
              leaderId: userId,
              name: input.teamName,
              track: input.track,
              status: 'registered',
            })
            .returning()

          for (const member of input.members) {
            await db.insert(teamMembers).values({
              teamId: team.id,
              name: member.name,
              phone: member.phone,
              educationType: member.educationType,
              educationDetails: JSON.stringify({
                type: member.educationDetails.type,
                ...(member.educationDetails.type === 'high_school'
                  ? {
                      schoolName: member.educationDetails.schoolName,
                      grade: member.educationDetails.grade,
                    }
                  : {
                      university: member.educationDetails.university,
                      faculty: member.educationDetails.faculty,
                    }),
              }),
            })
          }

          return Response.json({ success: true, teamId: team.id })
        } catch (error) {
          if (error instanceof z.ZodError) {
            console.log(error)
            return Response.json(
              { error: error.issues[0].message },
              { status: 400 },
            )
          }
          console.error('Create team error:', error)
          return Response.json(
            { error: 'Internal server error' },
            { status: 500 },
          )
        }
      },
    },
  },
})
