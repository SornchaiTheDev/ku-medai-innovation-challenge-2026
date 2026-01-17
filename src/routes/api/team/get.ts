import { createFileRoute } from '@tanstack/react-router'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'

export const Route = createFileRoute('/api/team/get')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          const session = await auth.api.getSession({
            headers: request.headers,
          })

          if (!session?.session || !session?.user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 })
          }

          const team = await db.query.teams.findFirst({
            with: {
              members: true,
            },
          })

          if (!team) {
            return Response.json({ error: 'Team not found' }, { status: 404 })
          }

          return Response.json({ team })
        } catch (error) {
          console.error('Get team error:', error)
          return Response.json(
            { error: 'Internal server error' },
            { status: 500 },
          )
        }
      },
    },
  },
})
