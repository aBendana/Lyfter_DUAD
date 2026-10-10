# Fit Tracker

Fit Tracker is a client-side application built with React, TypeScript, and Vite to create a weekly exercise routine, record sessions, and review training statistics.

## Stack

- React 19
- TypeScript
- Vite 8
- CSS
- react-hook-form
- react-router-dom
- ESLint

## Requirements

- Node.js 18+
- npm 9+

## Installation

1. Clone the repository:

```bash
git clone https://github.com/aBendana/Lyfter_DUAD
```

2. Enter the project directory:

```bash
cd module_3/typescript/fit-tracker
```

3. Install dependencies:

```bash
npm install
```

## Run Locally

```bash
npm run dev
```

The application is available at the URL shown by Vite, normally `http://localhost:5173`.

## Available Scripts

- `npm run dev`: starts Vite in development mode.
- `npm run build`: runs the TypeScript build and creates a production build.
- `npm run preview`: previews the local production build.
- `npm run lint`: runs ESLint.

## Functional Architecture

The application separates UI concerns from reusable domain logic. React components handle forms and presentation, while context providers manage shared session state and utility modules handle calculations, descriptions, identifiers, and exercise construction.

## Navigation

The application uses `react-router-dom` with `BrowserRouter` and centralized route constants.

- `/`: Home
- `/user-profile`: create or update the user profile.
- `/exercise-routine`: define a routine name and add exercise sessions.
- `/weekly-routine-resume`: review profile information, exercises, and weekly statistics.

### Global State

The Context API keeps member, instructor, and weekly routine data available between routes during the current session. All state is held in memory and is lost after a full browser refresh.

- `MemberRoutineContext` and `MemberRoutineProvider` manage member records, the active member, and member profile updates. Each record combines a member profile with that member's weekly routine. The provider supports adding and selecting members, starting a new member session, updating a profile, and updating the active member's routine.
- `InstructorContext` and `InstructorProvider` manage instructor records and the active instructor. They support creating, selecting, and updating instructors, as well as assigning and unassigning members. The instructor dashboard is derived from the active instructor's assigned member IDs and the member records.
- `WeeklyRoutineContext` and `WeeklyRoutineProvider` expose the active member's routine ID, name, start date, and exercise entries. Their setters update the routine stored in that member's record; routine updates require an active member.
- `useMemberRoutine`, `useInstructor`, and `useWeeklyRoutine` provide typed access to their respective contexts and throw an error if called outside the matching provider.

`App` nests `MemberRoutineProvider` outside `InstructorProvider` and `WeeklyRoutineProvider`, because both inner providers consume member state. Contexts, providers, and custom hooks are kept in separate modules to comply with the `react-refresh/only-export-components` ESLint rule and to keep each responsibility clear.

### Forms

Forms use `react-hook-form` for field handling, validation, and submission feedback.

- The member profile form supports creating a new member or selecting an existing profile to update. It collects full name, email, age (12–120), experience level, and membership contract; required fields and email format are validated. When an existing member is selected, their current values prefill the form.
- The instructor profile form supports creating or selecting an instructor to update. It collects full name, email, age (18–120), and years of experience (0–80); required fields, email format, and whole-number limits are validated. Existing instructor data is prefilled.
- The weekly routine name form requires a name and trims surrounding whitespace before saving it.
- The exercise session form requires a day, category, exercise, duration (at least one whole minute), and calories per minute (at least one). Its exercise list changes with the selected category, and changing category clears the selected exercise. Cardio adds required distance (at least 0.1 km) and an optional heart-rate zone (1–5); strength adds required sets and repetitions (at least one each) and optional weight (at least one lb); flexibility adds required positions (at least one) and optional comments. Every session also has a completed/incomplete checkbox, defaulting to completed, and optional day-session comments.
- Successful profile and exercise submissions show confirmation feedback. The exercise form resets after submission so another exercise can be entered.

### Exercise Catalog

The weekly resume organizes registered exercises into three categories through the reusable `GroupExercises` component:

- Cardio: distance, pace, and heart rate zone.
- Strength: sets, repetitions, and weight.
- Flexibility: positions.

Each category displays its registered exercises with duration and calorie details, category-specific fields, and a generated textual description for the individual exercise and the category summary.

### Calculations

The calculation utilities build exercise metrics and summarize the active member's weekly routine:

- Each exercise's calories are calculated as calories per minute × duration and rounded to two decimal places. Cardio pace is duration ÷ distance in minutes per kilometer, also rounded to two decimal places.
- Weekly statistics include total exercise count and counts and duration by category, total routine duration, total calories, average calories per active day, the longest day session by combined duration, and the day session with the most calories plus its percentage of weekly calories. The average excludes sessions without exercises of positive duration; it is zero when there are no active days.
- The weekly resume also counts exercises marked incomplete. Calorie and duration totals include all registered exercises, including those marked incomplete.
- Recommendations use the number of active training days and total routine minutes: they encourage at least 3 days and 150 minutes, advise rest when activity exceeds 5 days or 300 minutes, and otherwise report good consistency. An empty routine gets a separate prompt.
- Exercise descriptions format durations as hours and minutes where applicable; cardio details include distance and pace.

Exercise construction and calculations are implemented in reusable utilities, separate from the page components.

### Implemented Features

- Member profile creation, selection, and update, including membership contract and status dates.
- Per-member weekly routine naming and exercise-session tracking across the days of the week.
- Cardio, strength, and flexibility exercise registration with category-specific details, completion status, and session or flexibility comments.
- Client-side form validation, submission feedback, and exercise form reset after successful submission.
- Weekly exercise resume grouped by category, with session details and generated exercise and category descriptions.
- Weekly statistics for exercise counts and time by category, total duration and calories, average calories per active day, longest session, highest-calorie day, and incomplete exercises.
- Routine-based activity recommendations based on workout days and total exercise time.
- Instructor profile creation, selection, and update.
- Member assignment management for instructors, preventing a member from being assigned to multiple instructors.
- Instructor dashboard with assigned member profiles and weekly progress summaries.
- Separate member and instructor dashboards with navigation between their respective workflows.
- Responsive layouts for the member, instructor, routine, and resume views.

### Project Structure

```text
fit-tracker/
	src/
		components/
			Dashboard/
				Dashboard.tsx
				Dashboard.css
			Forms/
				DailyRoutineForm/
					DailyRoutineForm.tsx
					DailyRoutineForm.css
				InstructorProfileForm/
					InstructorProfileForm.tsx
				UserProfileForm/
					UserProfileForm.tsx
					UserProfileForm.css
				WeeklyRoutineNameForm/
					WeeklyRoutineNameForm.tsx
			GroupCategory/
				GroupCategories.tsx
				GroupExercises.tsx
			InstructorDashboard/
				InstructorDashboard.tsx
			ListedRoutines/
				ListedRoutines.tsx
				ListedRoutines.css
			Observations/
				IncompleteRoutines.tsx
				Recommendations.tsx
			UserProfileSummary/
				UserProfileSummary.tsx
			WeeklySummary/
				WeeklySummary.tsx
		context/
			InstructorContext.ts
			InstructorProvider.tsx
			MemberRoutineContext.ts
			MemberRoutineProvider.tsx
			WeeklyRoutineContext.ts
			WeeklyRoutineProvider.tsx
		hooks/
			useInstructor.ts
			useMemberRoutine.ts
			useWeeklyRoutine.ts
		index.css
		pages/
			ExcercisesResume/
				ExercisesResume.tsx
				ExercisesResume.css
			Home/
				Home.tsx
				Home.css
			InstructorMembersResume/
				InstructorMembersResume.tsx
				InstructorMembersResume.css
			InstructorProfile/
				InstructorProfile.tsx
			MembersAssignment/
				MembersAssignment.tsx
				MembersAssignment.css
			UserProfile/
				UserProfile.tsx
				UserProfile.css
			UserRoutine/
				UserRoutine.tsx
				UserRoutine.css
			WeeklyRoutineResume/
				WeeklyRoutineResume.tsx
				WeeklyRoutineResume.css
		routes/
			AppRoutes.tsx
			routes.ts
		types/
			exerciseCatalog.ts
			exerciseTypes.ts
			idsTypes.ts
			routineTypes.ts
			userTypes.ts
			weeklyRoutineTypes.ts
		utils/
			calculations.ts
			createRoutineEntry.ts
			generateDates.ts
			generateDescriptions.ts
			generateIds.ts
			generateRecommendations.ts
		App.tsx
		main.tsx
	eslint.config.js
	index.html
	package.json
	package-lock.json
	README.md
	tsconfig.app.json
	tsconfig.node.json
	tsconfig.json
	vite.config.ts
```

### Current Scope

Fit Tracker is a client-side application for tracking member profiles and weekly exercise routines, with separate workflows for members and instructors. Members can create and update profiles, record categorized exercises and completion status, and review exercise details, weekly statistics, and activity recommendations. Instructors can manage their profiles, assign registered members, and review assigned members' profiles and routine summaries. Member records, instructor records, assignments, and routines are held in React context in memory; they remain available while navigating the app but are lost after a full browser refresh. The project does not currently use an API, authentication, or persistent storage.
