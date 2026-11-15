# Fit Tracker

Fit Tracker is a client-side app for creating weekly exercise routines, tracking workout status, and reviewing training summaries. It provides separate workflows for members and instructors, plus an admin dashboard with the state of the whole system.

## Features

- Create and update member profiles and weekly routines.
- Record cardio, strength, and flexibility exercises, including session details, comments, and pending, completed, or skipped status.
- Review exercises by category, weekly statistics, incomplete sessions, and activity recommendations.
- Create instructor profiles, assign members, and review assigned members' profiles and weekly progress.
- Search api-ninjas exercises by muscle, with optional name, type, and difficulty filters, and add selected results to the exercise catalog for the current session.
- Review the whole system from the admin dashboard: counts, memberships with weekly load and recommendations, instructors with their assigned members, the exercise catalog by source and category, and recent activity.
- Export members, instructors, and the exercise catalog as downloadable JSON files.

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
- `npm run build`: run the TypeScript build (`strict` mode) and create a production build.
- `npm run preview`: preview the production build locally.
- `npm run lint`: run ESLint.

## Application routes

| Route                        | Purpose                                                  |
| ---------------------------- | -------------------------------------------------------- |
| `/`                          | Home and workflow selection                              |
| `/user-profile`              | Create or update a member profile                        |
| `/user-routine`              | Create a weekly routine and record exercises             |
| `/exercises-resume`          | Review registered exercises                              |
| `/weekly-statistics`         | Review weekly statistics and recommendations             |
| `/ninja-exercises`           | Search and add api-ninjas exercises                      |
| `/unified-report`            | Review local and api-ninjas exercises by category        |
| `/instructor-profile`        | Create or update an instructor profile                   |
| `/members-assignment`        | Assign or unassign members                               |
| `/instructor-members-resume` | Review assigned members and their progress               |
| `/admin`                     | System overview: members, instructors, catalog, routines |
| `/admin/memberships`         | Every member with weekly load and recommendation         |
| `/admin/instructors`         | Every instructor with their assigned members             |
| `/admin/catalog`             | Exercise catalog by source and category                  |
| `/admin/activity`            | The latest 10 changes made in the app                    |

## App flow

Start at the home page and choose the member, instructor, or admin workflow.

- **Member:** Create or select a profile, then create a weekly routine and add exercise sessions by day and category. Exercises can be entered in the routine form or searched through api-ninjas and added to the catalog. Review the exercise list, update completion status, and check weekly statistics and recommendations.

- **Instructor:** Create or select an instructor profile, assign registered members, then review assigned members' profiles and routine progress from the instructor dashboard.

- **Admin:** Review the whole system and the latest activity, export data, and open the member or instructor area from the sidebar. The admin pages start empty until members, instructors, or exercises are added.

## Data storage

Members, instructors, the exercise catalog (local and api-ninjas exercises), and the activity log all go through one generic store, `Store<T extends { id: number }>` in `src/store/Store.ts`. It is the single source of truth while the app runs: it adds, lists (as a copy), finds by id (reporting a missing id instead of throwing), updates only the fields sent, removes, and searches with a custom criterion.

Routines do not have a store of their own. Each member has exactly one weekly routine, so it lives inside the member (`member.routine`) and is saved with a partial update, `memberStore.update(id, { routine })`. Routines still go through the unified store, and a separate routine store would only duplicate that one-to-one link and risk the two copies drifting apart. Active routines are found with the same store: `memberStore.findBy(hasActiveRoutine)`.

`remove(id)` is implemented and returns whether an entity was deleted, but no screen uses it yet: the app's workflows do not ask for deleting anything. It is ready for a future feature, such as deleting a member or an api-ninjas exercise from the catalog.

## Exporting data

The Memberships, Instructors, and Exercise Catalog admin pages end with an export button that downloads a JSON file named like `fit-tracker-members-2026-11-14.json`. The button is disabled while the list is empty, and every export is recorded in the activity log.

Every file shares the same wrapper:

```json
{
  "exportedAt": "2026-11-14T22:10:05.000Z",
  "count": 1,
  "items": [
    {
      "id": 1,
      "fullName": "Ana García",
      "email": "ana@mail.com",
      "age": 28,
      "experienceLevel": "Intermediate",
      "membership": {
        "contract": "Gold",
        "startDate": "2026-11-14T22:01:00.000Z",
        "endDate": "2027-11-14T22:01:00.000Z",
        "state": "Active"
      },
      "instructor": "Carlos Ruiz",
      "routine": {
        "name": "Full Body Plan",
        "active": true,
        "workoutDays": 4,
        "minutes": 180,
        "calories": 1640,
        "incompleteExercises": 1
      }
    }
  ]
}
```

- **Members:** profile, membership, instructor name (`null` when unassigned), and a routine summary.
- **Instructors:** profile and `assignedMembers` as `{ "id", "found": true, "fullName" }`, or `{ "id", "found": false }` when the member no longer exists.
- **Catalog:** every exercise with `id`, `name`, `category`, and `source` (`local` or `api`); api-ninjas exercises also include `muscle`, `difficulty`, and `equipments`. The file adds a `summary` with counts by source and by category.

## Scope and limitations

Fit Tracker supports member, instructor, and admin workflows in a single browser session. Members can manage their profile and weekly exercises; instructors can manage their profile, assign members, and review those members' progress; the admin dashboard shows and exports the state of the whole system. The exercise search is an optional integration with api-ninjas.

The app is client-side only. Member and instructor profiles, assignments, routines, user-added exercises, and the activity log are kept in memory in the generic store: they survive navigation but are lost after a full browser refresh. There is no backend, authentication, authorization, or persistent storage. The API key is exposed to the browser when used, so this setup is suitable for development and demonstration.

## Project structure

```text
fit-tracker/
├── public/
├── src/
│   ├── components/
│   │   ├── AdminDashboard/
│   │   ├── AdminPageHeader/
│   │   ├── Dashboard/
│   │   ├── ExportButton/
│   │   ├── Forms/
│   │   │   ├── DailyRoutineForm/
│   │   │   ├── InstructorProfileForm/
│   │   │   ├── NinjaSearchForm/
│   │   │   ├── UserProfileForm/
│   │   │   └── WeeklyRoutineNameForm/
│   │   ├── GroupCategory/
│   │   ├── IncompleteExerciseItem/
│   │   ├── InstructorDashboard/
│   │   ├── ListedRoutines/
│   │   ├── MemberResumeCard/
│   │   ├── Observations/
│   │   ├── SearchHistory/
│   │   ├── StatTiles/
│   │   ├── UserProfileSummary/
│   │   └── WeeklySummary/
│   ├── context/
│   ├── hooks/
│   ├── pages/
│   │   ├── AdminActivity/
│   │   ├── AdminCatalog/
│   │   ├── AdminInstructors/
│   │   ├── AdminMemberships/
│   │   ├── AdminOverview/
│   │   ├── ExcercisesResume/
│   │   ├── Home/
│   │   ├── InstructorMembersResume/
│   │   ├── InstructorProfile/
│   │   ├── MembersAssignment/
│   │   ├── NinjaExercises/
│   │   ├── UnifiedReport/
│   │   ├── UserProfile/
│   │   ├── UserRoutine/
│   │   └── WeeklyRoutineResume/
│   ├── routes/
│   ├── services/
│   ├── store/
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

`components` and `pages` contain the reusable UI and route screens. `store` holds the generic store and its instances, `context` and `hooks` give the UI access to them, `routes` maps URLs to screens, `services` handles the external API, and `types` and `utils` hold domain types and logic.
