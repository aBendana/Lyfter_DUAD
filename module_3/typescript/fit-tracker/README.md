# Fit Tracker

Fit Tracker is a client-side app for creating weekly exercise routines, tracking workout status, and reviewing training summaries. It also provides separate workflows for members and instructors.

## Features

- Create and update member profiles and weekly routines.
- Record cardio, strength, and flexibility exercises, including session details, comments, and pending, completed, or skipped status.
- Review exercises by category, weekly statistics, incomplete sessions, and activity recommendations.
- Create instructor profiles, assign members, and review assigned members' profiles and weekly progress.
- Search api-ninjas exercises by muscle, with optional name, type, and difficulty filters, and add selected results to the exercise catalog for the current session.

## Requirements

- Node.js `^20.19.0` or `>=22.12.0`
- npm

## Get started

From the repository root, open the app directory and install dependencies:

```bash
cd module_3/typescript/fit-tracker
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL printed by Vite, normally `http://localhost:5173`.

## Exercise search setup

Exercise search uses the [api-ninjas Exercises API](https://api-ninjas.com/api/exercises) and requires an API key. The rest of the app works without one.

Copy `.env.example` to `.env.local` (on Windows PowerShell, use `Copy-Item .env.example .env.local`) and set the key:

```env
VITE_API_NINJAS_KEY=your_api_key
```

Get a key from [api-ninjas](https://api-ninjas.com/profile), then restart the development server. Vite exposes `VITE_` variables in client-side code, so this key is visible in the browser and must not be treated as a secret. Use a server-side proxy if it needs to remain confidential.

Search requires selecting a muscle group; name, API exercise type, and difficulty are optional filters. The API exercise type is separate from the app's exercise category: `olympic_weightlifting`, `powerlifting`, and `strongman` are accepted and mapped to the `Strength` category, along with `strength` and `plyometrics`. This mapping is implemented in `src/utils/validateApiExercises.ts`; supported API types are declared in `src/types/apiExerciseTypes.ts`, and the search form's type options are in `src/pages/NinjaExercises/NinjaExercises.tsx`.

Results are validated before they can be added. Incomplete results are shown separately, and only exercises the user adds become available in the routine form. These additions are held in memory and do not persist after a page refresh.

## Available scripts

- `npm run dev`: start the development server.
- `npm run build`: run the TypeScript build and create a production build.
- `npm run preview`: preview the production build locally.
- `npm run lint`: run ESLint.

## Application routes

| Route                        | Purpose                                      |
| ---------------------------- | -------------------------------------------- |
| `/`                          | Home and workflow selection                  |
| `/user-profile`              | Create or update a member profile            |
| `/user-routine`              | Create a weekly routine and record exercises |
| `/exercises-resume`          | Review registered exercises                  |
| `/weekly-statistics`         | Review weekly statistics and recommendations |
| `/ninja-exercises`           | Search and add api-ninjas exercises          |
| `/instructor-profile`        | Create or update an instructor profile       |
| `/members-assignment`        | Assign or unassign members                   |
| `/instructor-members-resume` | Review assigned members and their progress   |

## App flow

Start at the home page and choose the member or instructor workflow.

- **Member:** Create or select a profile, then create a weekly routine and add exercise sessions by day and category. Exercises can be entered in the routine form or searched through api-ninjas and added to the catalog. Review the exercise list, update completion status, and check weekly statistics and recommendations.

- **Instructor:** Create or select an instructor profile, assign registered members, then review assigned members' profiles and routine progress from the instructor dashboard.

## Scope and limitations

Fit Tracker currently supports member and instructor workflows in a single browser session. Members can manage their profile and weekly exercises; instructors can manage their profile, assign members, and review those members' progress. The exercise search is an optional integration with api-ninjas.

The app is client-side only. Member and instructor profiles, assignments, routines, and user-added exercises are kept in React context in memory: they survive navigation but are lost after a full browser refresh. There is no backend, authentication, authorization, or persistent storage. The API key is exposed to the browser when used, so this setup is suitable for development and demonstration, not for keeping a credential private.

## Project structure

```text
fit-tracker/
├── public/
├── src/
│   ├── components/
│   │   ├── Dashboard/
│   │   ├── Forms/
│   │   │   ├── DailyRoutineForm/
│   │   │   ├── InstructorProfileForm/
│   │   │   ├── UserProfileForm/
│   │   │   └── WeeklyRoutineNameForm/
│   │   ├── GroupCategory/
│   │   ├── InstructorDashboard/
│   │   ├── ListedRoutines/
│   │   ├── Observations/
│   │   ├── UserProfileSummary/
│   │   └── WeeklySummary/
│   ├── context/
│   ├── hooks/
│   ├── pages/
│   │   ├── ExcercisesResume/
│   │   ├── Home/
│   │   ├── InstructorMembersResume/
│   │   ├── InstructorProfile/
│   │   ├── MembersAssignment/
│   │   ├── NinjaExercises/
│   │   ├── UserProfile/
│   │   ├── UserRoutine/
│   │   └── WeeklyRoutineResume/
│   ├── routes/
│   ├── services/
│   ├── types/
│   ├── utils/
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── .env.example
├── index.html
├── package.json
└── vite.config.ts
```

`components` and `pages` contain the reusable UI and route screens. `context` and `hooks` manage shared in-memory state, `routes` maps URLs to screens, `services` handles the external API, and `types` and `utils` hold domain types and logic.
