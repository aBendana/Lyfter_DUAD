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

## Navigation

The application uses `react-router-dom` with `BrowserRouter` and centralized route constants.

- `/`: Home
- `/user-profile`: create or update the user profile.
- `/exercise-routine`: define a routine name and add exercise sessions.
- `/weekly-routine-resume`: review profile information, exercises, and weekly statistics.

### Global State

The Context API keeps application data available between routes during the current session.

- `UserProfileContext`: stores the user's full name, age, and experience level.
- `WeeklyRoutineContext`: stores the routine name and its exercise entries.

### Forms

Forms use `react-hook-form` for validation and field handling.

- The user profile form validates full name, age from 12 to 120, and experience level. Existing profile data appears as the form's initial values.
- The routine form validates the day, exercise, duration, calories per minute, and distance when the selected exercise requires it.
- Distance is requested only for distance-based exercises.

### Calculations

The weekly resume calculates data from the registered exercise sessions:

- Total calories burned.
- Average calories burned on active days.
- Longest session.
- Day with the highest calorie burn and its percentage of the weekly total.
- Duration, calories, distance, and pace for individual sessions when applicable.

## Implemented Features

- User profile creation and update through prefilled form values.
- Weekly routine naming.
- Exercise registration by day.
- Distance-based and non-distance exercise categories.
- Client-side form validation with feedback messages.
- Exercise session success feedback and form reset after submission.
- Weekly exercise list with session details.
- Weekly statistics summary.
- Responsive layouts for the profile, exercise routine, and weekly resume pages.

## Project Structure

```text
fit-tracker/
	src/
		components/
			Forms/
				DailyRoutineForm/
				UserProfileForm/
				WeeklyRoutineNameForm/
		context/
			UserProfileContext.tsx
			WeeklyRoutineContext.tsx
		pages/
			ExerciseRoutine/
			Home/
			UserProfile/
			WeeklyRoutineResume/
		routes/
			AppRoutes.tsx
			routes.ts
		types/
			exerciseCatalog.ts
			exerciseTypes.ts
			routineTypes.ts
			userTypes.ts
			weeklyRoutineTypes.ts
		utils/
			calculations.ts
		App.tsx
		main.tsx
	eslint.config.js
	package.json
	README.md
	tsconfig.json
	vite.config.ts
```

## Current Scope

The application is fully client-side. Profile and routine data are held in React context, so they are available while navigating the application but are lost after a full browser refresh. It does not currently use an API, authentication, or persistent storage.
