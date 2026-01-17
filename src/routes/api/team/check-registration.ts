import { createFileRoute } from '@tanstack/react-router'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'

export const Route = createFileRoute('/api/team/check-registration')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          const session = await auth.api.getSession({
            headers: request.headers,
          })

          if (!session?.session) {
            return Response.json({ isRegistered: false })
          }

          const userId = session.user.id

          const existingTeam = await db.query.teamMembers.findFirst({
            where: (teamMembers, { eq, and }) =>
              and(
                eq(teamMembers.userId, userId),
                eq(teamMembers.isLeader, true),
              ),
          })

          return Response.json({ isRegistered: !!existingTeam })
        } catch (error) {
          console.error('Check registration error:', error)
          return Response.json({ isRegistered: false })
        }
      },
    },
  },
})
