
# College Career Guidance & Placement Unit (CGPU) — MVP Plan

## Design & Theme
- **Dark theme** with a blue/purple accent color
- Premium SaaS-style dashboard aesthetic
- Clean typography, card-based layouts, rounded corners, subtle shadows, smooth hover effects
- Fully responsive (mobile-friendly)

---

## 1. Landing Page (`/`)
A polished public-facing page with:
- **Hero Section** — Bold title "Career Guidance and Placement Unit", subtitle, and Login/Register CTA buttons
- **Stats Section** — Animated counters showing companies visited, students placed, highest package (dummy data)
- **About Section** — Brief description of the CGPU mission
- **Companies Section** — Grid of company logos (placeholder logos)
- **Footer** with college info

## 2. Authentication (Mock)
- **Login Page** (`/login`) — Email + password form with role selection (Student/Admin)
- **Register Page** (`/register`) — Student registration form: Name, College ID, Email, Password, Department, CGPA
- Mock auth with local state — hardcoded admin credentials, student accounts stored in memory
- Students marked as "pending" on registration; only admin-approved students can access the dashboard
- Auth context provider wrapping the app for session management

## 3. Student Dashboard (`/student`)
Protected route — only approved students can access.

- **Welcome header** with student name
- **Available Placements** — Filterable card grid showing only eligible placements (based on student's CGPA and department)
- Each placement card shows: Company Name, Job Role, Package (CTC), Eligibility criteria, and an **Apply** button
- Clicking Apply saves the application and shows an "Applied" badge
- **My Applications** tab — List of placements the student has applied to with status

## 4. Admin Dashboard (`/admin`)
Protected route — admin only.

- **Overview Cards** — Total Students, Total Placements, Total Applications (with icons)
- **Add Placement** — Form/dialog to create a new placement: Company Name, Role, Package, Min CGPA, Allowed Departments (multi-select), Description
- **Manage Students** — Table of all registered students with Approve/Reject actions and status badges
- **View Applications** — Per-placement view showing applicant table: Name, Department, CGPA, Applied Date

## 5. Data & State Management
- All data stored in React context/state with mock initial data (5-6 sample placements, a few students)
- Structured with TypeScript interfaces so swapping to a real Supabase backend later is straightforward
- Reusable components: PlacementCard, StatsCard, DataTable, StatusBadge

## 6. Navigation & Layout
- **Public layout** for landing/auth pages
- **Dashboard layout** with sidebar navigation for student and admin views
- Route guards redirecting unauthenticated or unauthorized users
