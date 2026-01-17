# KU MedAI Innovation Challenge 2026 - Registration Page Plan

**Last Updated:** January 17, 2026

## Overview

A team-based registration system for the KU MedAI Innovation Challenge 2026, integrated with the existing landing page at `/register`.

**Stack:**

- **Auth:** BetterAuth (Google OAuth)
- **Database:** PostgreSQL via Docker (Drizzle ORM)
- **Framework:** TanStack Start + React 19
- **UI:** Shadcn UI + Tailwind CSS v4

---

## Architecture

```
src/
├── components/
│   ├── auth/
│   │   ├── AuthButton.tsx        # Google sign in button
│   │   └── ProtectedRoute.tsx    # Guard authenticated routes
│   └── registration/
│       ├── StepTeamInfo.tsx
│       ├── StepTeamLead.tsx
│       ├── StepTeamMembers.tsx
│       ├── StepConsent.tsx
│       └── RegistrationSummary.tsx
├── routes/
│   ├── /register.tsx             # Main registration wizard
│   ├── /dashboard.tsx            # Post-registration dashboard
│   └── /login.tsx                # Login page
├── lib/
│   ├── auth.ts                   # BetterAuth config
│   └── db/                       # Drizzle schema + migrations
│       ├── schema.ts
│       └── migrations/
├── env.ts                        # Environment validation
└── server/
    └── functions/                # TanStack Start RPC functions
```

---

## Database Schema (Drizzle ORM)

```typescript
// profiles table (extends BetterAuth user)
profiles: {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().unique(),
  phone: text("phone").notNull(),
  educationType: enum("education_type", ["high_school", "university"]).notNull(),
  schoolName: text("school_name"),
  grade: text("grade"),
  university: text("university"),
  faculty: text("faculty"),
  studentId: text("student_id"),
  createdAt: timestamp("created_at").defaultNow(),
}

// teams table
teams: {
  id: serial("id").primaryKey(),
  leaderId: text("leader_id").notNull().references(() => users.id),
  name: text("name").notNull(),
  track: enum("track", ["agro_medicine", "bioinnovation"]).notNull(),
  status: enum("status", ["registered", "submitted", "finalized"]).default("registered"),
  createdAt: timestamp("created_at").defaultNow(),
}

// team_members join table
team_members: {
  id: serial("id").primaryKey(),
  teamId: integer("team_id").notNull().references(() => teams.id),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  educationType: enum("education_type", ["high_school", "university"]).notNull(),
  educationDetails: json("education_details").notNull(), // { schoolName, grade } or { university, faculty, studentId }
}
```

---

## Registration Flow

### 1. Login Page (`/login`)

- Full-screen Google OAuth button
- "Sign in to register or manage your team"
- Redirect to `/register` after successful auth

### 2. Registration Wizard (`/register`)

**Step 1: Team Info**

- Team Name (text input, required)
- Competition Track (radio select)
  - Agro-medicine (Smart Health for Agriculture)
  - Bioinnovation (Medical AI & Tech)

**Step 2: Team Lead (You)**

- Read-only: Name, Email (from Google)
- Phone Number (text input, Thai format validation)
- Education Type (radio: High School / University)
  - If High School: School Name, Grade (M.4/M.5/M.6)
  - If University: University Name, Faculty, Student ID

**Step 3: Add Team Members**

- Add 2-4 members
- For each member:
  - Full Name (Thai + English)
  - Phone Number
  - Education Type (same conditional logic)
- Remove button for each member
- "Add another member" button

**Step 4: Consent**
Checkboxes:

- [ ] I agree to competition rules and timeline
- [ ] I consent to photo/video capture for promotional use
- [ ] I allow my data to be used for registration purposes

**Step 5: Review & Submit**

- Summary of all entered data
- "Confirm Registration" button

### 3. Dashboard (`/dashboard`)

**View Mode:**

- Team info (name, track)
- Team lead details
- Team members list
- Registration status badge

**Actions:**

- Edit registration (before submission deadline)
- Logout

---

## Validation Rules

| Field     | Rule                       |
| --------- | -------------------------- |
| Team Size | 3-5 members total          |
| Phone     | Thai format (0xx-xxx-xxxx) |
| Team Name | 3-50 characters            |
| Track     | Required selection         |
| Consent   | All 3 checkboxes required  |

---

## Environment Variables

```typescript
// .env.example
DATABASE_URL = 'postgresql://postgres:postgres@localhost:5432/ku_medai'
GOOGLE_CLIENT_ID = 'your-google-client-id'
GOOGLE_CLIENT_SECRET = 'your-google-client-secret'
BETTER_AUTH_SECRET = 'your-secret-key'
BETTER_AUTH_URL = 'http://localhost:3000'
```

---

## API / Server Functions

```typescript
// Create team with members
createTeam(input: {
  teamName: string
  track: "agro_medicine" | "bioinnovation"
  leaderProfile: ProfileData
  members: TeamMemberData[]
})

// Get user's team
getUserTeam(userId: string): TeamWithMembers | null

// Update team
updateTeam(teamId: string, input: Partial<TeamData>)

// Update team members
updateTeamMembers(teamId: string, members: TeamMemberData[])
```

---

## Milestones

1. **Setup:** Docker Compose + PostgreSQL + Drizzle config
2. **Auth:** BetterAuth with Google OAuth
3. **Schema:** Create and migrate database schema
4. **Forms:** Build registration wizard components
5. **Backend:** Implement server functions for CRUD
6. **Dashboard:** Build user dashboard
7. **Testing:** End-to-end flow testing

---

## Related Pages

- Landing Page: `/` (see `plans/innovation_challenge_landing_page_plan.md`)
- Registration: `/register` (this page)
- Dashboard: `/dashboard` (post-registration)
