import { createFileRoute } from '@tanstack/react-router'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { profiles, teams } from '@/lib/db/schema/schema'

export const Route = createFileRoute('/api/team/get')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        return new Response()
        //     try {
        //       const session = await auth.api.getSession({
        //         headers: request.headers,
        //       })
        //
        //       if (!session?.session || !session?.user) {
        //         return Response.json({ error: 'Unauthorized' }, { status: 401 })
        //       }
        //
        //       const userId = session.user.id
        //
        //       const team = await db.query.teams.findFirst({
        //         where: (teams, { eq }) => eq(teams.leaderId, userId),
        //         with: {
        //           members: true,
        //         },
        //       })
        //
        //       if (!team) {
        //         return Response.json({ error: 'Team not found' }, { status: 404 })
        //       }
        //
        //       const profile = await db.query.profiles.findFirst({
        //         where: (profiles, { eq }) => eq(profiles.userId, userId),
        //       })
        //
        //       if (!profile) {
        //         return Response.json(
        //           { error: 'Profile not found' },
        //           { status: 404 },
        //         )
        //       }
        //
        //       return Response.json({ team, profile })
        //     } catch (error) {
        //       console.error('Get team error:', error)
        //       return Response.json(
        //         { error: 'Internal server error' },
        //         { status: 500 },
        //       )
        //     }
      },
    },
  },
})
