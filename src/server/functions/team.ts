import { z } from 'zod'
import { db } from '@/lib/db'
import { profiles, teams, teamMembers } from '@/lib/db/schema/schema'
import { auth } from '@/lib/auth'

const educationDetailsSchema = z.union([
  z.object({
    type: z.literal('high_school'),
    schoolName: z.string().min(1),
    grade: z.string().min(1),
  }),
  z.object({
    type: z.literal('university'),
    university: z.string().min(1),
    faculty: z.string().min(1),
    studentId: z.string().min(1),
  }),
])

const teamMemberInputSchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(1),
  educationType: z.enum(['high_school', 'university']),
  educationDetails: educationDetailsSchema,
})

export const createTeam = async (input: {
  teamName: string
  track: 'agro_medicine' | 'bioinnovation'
  leaderProfile: {
    phone: string
    educationType: 'high_school' | 'university'
    educationDetails: z.infer<typeof educationDetailsSchema>
  }
  members: z.infer<typeof teamMemberInputSchema>[]
}) => {
  const session = await auth.api.getSession({
    headers: new Headers(),
  })

  if (!session?.session || !session?.user) {
    throw new Error('Unauthorized')
  }

  const userId = session.user.id

  const existingTeam = await db.query.teams.findFirst({
    where: (teams, { eq }) => eq(teams.leaderId, userId),
  })

  if (existingTeam) {
    throw new Error('You already have a team')
  }

  const totalMembers = input.members.length + 1
  if (totalMembers < 3 || totalMembers > 5) {
    throw new Error('Team must have 3-5 members')
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
          studentId: input.leaderProfile.educationDetails.studentId,
        }),
  }

  await db.insert(profiles).values(leaderProfileData).onConflictDoNothing()

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
              studentId: member.educationDetails.studentId,
            }),
      }),
    })
  }

  return { success: true, teamId: team.id }
}

export const getUserTeam = async () => {
  const session = await auth.api.getSession({
    headers: new Headers(),
  })

  if (!session?.session || !session?.user) {
    return null
  }

  const userId = session.user.id

  const team = await db.query.teams.findFirst({
    where: (teams, { eq }) => eq(teams.leaderId, userId),
    with: {
      members: true,
    },
  })

  if (!team) {
    return null
  }

  const profile = await db.query.profiles.findFirst({
    where: (profiles, { eq }) => eq(profiles.userId, userId),
  })

  return {
    team,
    profile,
  }
}
