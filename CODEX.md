# CODEX.md — Chicken on Wheels

## Mission

Transform the existing **Chicken on Wheels** food-truck/event-booking application into a polished, modern, production-quality platform.

**This is an existing application. Do not rebuild it from scratch.**

Your highest priorities are:

1. Preserve existing functionality.
2. Preserve existing database/data.
3. Improve UX/UI.
4. Complete the booking experience.
5. Add customer/vendor/admin experiences where applicable.
6. Improve security, responsiveness, accessibility, and performance.

---

# 1. BEFORE CODING — AUDIT

Before changing anything, inspect the repository thoroughly.

Inspect:

* `package.json`
* project structure
* routes/pages
* components
* layouts
* API routes
* server actions
* hooks/utilities
* authentication
* authorization/roles
* Supabase configuration
* database queries
* database migrations
* booking system
* existing dashboards
* existing responsive UI
* environment variable usage
* styling/Tailwind configuration
* Git status

Determine:

```text
Current framework:
Current frontend:
Current backend:
Database:
Authentication:
Roles:
Main routes:
Booking flow:
Existing features:
Existing problems:
```

Do not guess.

If information can be determined from the repository, inspect it rather than assuming.

---

# 2. DATABASE SAFETY — NON-NEGOTIABLE

The existing database is the source of truth.

NEVER:

* drop tables
* reset Supabase
* delete existing records
* delete existing columns
* rename columns casually
* replace existing tables
* destroy migrations
* overwrite production data

Prefer extending the current schema.

Only create migrations when necessary.

Migrations must be:

* additive
* backward-compatible
* safe
* documented
* reversible where practical

Before using any database column, verify that it actually exists.

### Important existing issue

The project previously encountered:

```text
Could not find the 'event_time' column of 'booking_requests' in the schema cache
```

Therefore:

**Never assume `event_time` exists.**

Inspect the actual `booking_requests` schema first.

If the column doesn't exist, determine which existing field represents event date/time before changing anything.

Do not create duplicate fields just to fix an error.

---

# 3. PRESERVE EXISTING FEATURES

Before implementing new features, identify everything currently working.

At minimum check:

* Login
* Registration
* Logout
* User profile
* Booking requests
* Booking history
* Existing navigation
* Food truck data
* Existing dashboards
* Supabase queries
* Existing responsive behavior

New code must integrate with existing code.

Prefer:

```text
EXTEND → existing implementation
```

over:

```text
REPLACE → existing implementation
```

unless replacement is genuinely necessary.

---

# 4. PRODUCT EXPERIENCE

The final product should feel like a real modern food/event platform rather than a basic college CRUD application.

Design inspiration can come from the quality of:

* Airbnb
* Uber Eats
* DoorDash
* Swiggy
* Zomato
* Stripe dashboards
* modern SaaS products

Do not copy their UI.

Create an original Chicken on Wheels design system.

The interface should feel:

* premium
* clean
* trustworthy
* modern
* fast
* easy to understand

Avoid excessive gradients, glassmorphism, shadows, and animations.

---

# 5. DESIGN SYSTEM

Create consistent:

* typography
* spacing
* buttons
* inputs
* cards
* badges
* modals
* dropdowns
* tabs
* toast messages
* loading states
* error states
* empty states

Use reusable components where appropriate.

Do not create unnecessary abstractions.

---

# 6. RESPONSIVE DESIGN

The application must work properly on:

* mobile
* tablet
* laptop
* desktop
* large screens

Do not merely shrink desktop layouts.

Mobile must be intentionally designed.

Ensure:

* comfortable forms
* thumb-friendly buttons
* usable dashboards
* responsive cards
* readable tables
* mobile-friendly navigation
* smooth booking experience

---

# 7. HOMEPAGE

Upgrade the landing page into a professional product page.

Recommended structure:

```text
Navbar
Hero
Trust / Statistics
Featured Food Trucks
Popular Dishes
How It Works
Event Types
Why Choose Chicken on Wheels
Reviews
FAQ
Final CTA
Footer
```

The hero must immediately explain:

* what Chicken on Wheels does
* who it is for
* what the user can do

Primary CTA:

```text
Book a Food Truck
```

Secondary CTA:

```text
Explore Food Trucks
```

Use real application data whenever possible.

Never fabricate production statistics.

---

# 8. FOOD TRUCK DISCOVERY

Create a polished discovery experience.

Users should be able to:

* search
* browse
* filter
* sort
* open food truck profiles

Potential filters:

* Cuisine
* Price
* Rating
* Location
* Availability
* Event type
* Vegetarian
* Vegan

Sorting:

* Recommended
* Highest Rated
* Most Popular
* Price Low → High
* Price High → Low

Only expose filters supported by real data.

---

# 9. FOOD TRUCK PROFILE

Create a professional vendor profile.

Show available real information such as:

* images
* name
* rating
* cuisine
* location
* description
* pricing
* menu
* popular items
* availability
* event types
* service area
* reviews
* booking CTA

Never invent vendor information.

---

# 10. BOOKING FLOW

Make booking a first-class experience.

Prefer a multi-step flow:

```text
Event Details
      ↓
Food Preferences
      ↓
Budget / Requirements
      ↓
Review
      ↓
Submit
      ↓
Confirmation
```

Potential event information:

* Event type
* Date
* Time
* Location
* Guest count
* Cuisine/preferences
* Dietary requirements
* Special requests
* Budget

BUT:

Use the existing database schema.

Do not assume column names.

Do not introduce duplicate fields.

---

# 11. BOOKING STATUS

Use database-backed booking status.

Possible states:

```text
Pending
Confirmed
Preparing
Completed
Cancelled
Rejected
```

Only use states appropriate for the existing application.

Show a visual timeline:

```text
✓ Request Submitted
      ↓
✓ Vendor Accepted
      ↓
● Preparing
      ↓
○ Event Completed
```

Never hardcode booking status in the frontend.

---

# 12. CUSTOMER DASHBOARD

Create or improve the customer dashboard.

Include:

* welcome message
* upcoming event
* upcoming bookings
* recent bookings
* booking statistics
* favorites
* notifications
* quick actions

Quick actions:

```text
Book Food Truck
View Bookings
Edit Profile
```

All information must come from real data.

---

# 13. BOOKING MANAGEMENT

Customers should be able to:

* view bookings
* view booking details
* see status
* view event information
* cancel when permitted
* see booking history
* review completed bookings

Use proper confirmation dialogs.

Prevent duplicate submissions.

---

# 14. FAVORITES

If compatible with the current architecture, allow users to save food trucks.

For authenticated users, persist favorites in the database.

Do not rely only on localStorage for persistent user data.

---

# 15. NOTIFICATIONS

Add a notification system if one does not already exist.

Navbar should have:

```text
🔔
```

Support:

* unread count
* mark as read
* mark all as read
* notification list
* empty state

Potential notifications:

* Booking submitted
* Booking confirmed
* Booking rejected
* Booking cancelled
* Event reminder
* Review reminder

---

# 16. VENDOR EXPERIENCE

If vendors/food-truck owners exist in the application, provide a professional vendor dashboard.

Sections:

```text
Overview
Bookings
Availability
Menu
Profile
Reviews
Customers
Revenue
Settings
```

Show real database information.

Vendor actions may include:

* accept booking
* reject booking
* update booking status
* manage profile
* manage menu where supported
* manage availability where supported

---

# 17. ADMIN EXPERIENCE

If an admin role exists, provide a professional admin dashboard.

Sections:

```text
Dashboard
Bookings
Users
Vendors
Reviews
Analytics
Notifications
Settings
```

Possible real metrics:

* users
* vendors
* bookings
* pending bookings
* completed events
* revenue

Possible analytics:

* bookings over time
* revenue over time
* event types
* popular vendors

Never use fake analytics in production.

---

# 18. AUTHORIZATION

Support existing roles correctly.

Potential roles:

```text
Customer
Vendor
Admin
```

A user must not gain access to another role by changing a URL.

Authorization must be enforced server-side/database-side where appropriate.

Frontend route protection alone is insufficient.

---

# 19. AUTHENTICATION

Improve existing authentication without unnecessarily replacing it.

Where compatible, support:

* login
* registration
* logout
* forgot password
* password reset
* email verification
* protected routes
* profile management

Do not break existing sessions.

---

# 20. LOADING / ERROR / EMPTY STATES

Every asynchronous experience needs proper UX.

Use:

* skeleton loaders
* button loading states
* page loading states
* error states
* empty states
* retry buttons

Examples:

```text
Loading bookings...
```

```text
Something went wrong.
We couldn't load your bookings.
[Try Again]
```

```text
No bookings yet.
Ready to plan your next event?
[Book a Food Truck]
```

Never expose raw database errors to users.

---

# 21. TOASTS

Use professional toast notifications for successful actions:

* Booking submitted
* Booking confirmed
* Profile updated
* Favorite saved
* Booking cancelled

Avoid browser `alert()` for normal application interactions.

---

# 22. FORM VALIDATION

Validate on both:

```text
Frontend
+
Server
```

Validate:

* required fields
* dates
* times
* guest count
* email
* phone where used
* budget
* text length
* invalid values

Never trust client-side validation alone.

---

# 23. ACCESSIBILITY

Ensure:

* semantic HTML
* proper labels
* keyboard navigation
* visible focus states
* accessible buttons
* useful alt text
* sufficient contrast
* accessible modals
* understandable validation

Do not communicate status using color alone.

---

# 24. SECURITY

Audit:

* Supabase RLS
* authorization
* API routes
* server actions
* database access
* user input
* exposed environment variables
* admin access
* vendor access
* booking ownership

Never expose:

```text
SUPABASE_SERVICE_ROLE_KEY
private API keys
secrets
credentials
```

to the client.

Do not weaken RLS just to make functionality work.

---

# 25. PERFORMANCE

Look for:

* duplicate database requests
* unnecessary API calls
* unnecessary re-renders
* oversized images
* unnecessary client components
* inefficient queries
* unnecessary dependencies
* large bundles

Use appropriate server-side fetching and caching.

Do not sacrifice correctness for premature optimization.

---

# 26. SEO

For public pages, improve:

* title
* description
* metadata
* Open Graph metadata
* semantic headings
* image alt text
* SEO-friendly routes where appropriate

---

# 27. CODE QUALITY

Maintain clean code.

Avoid:

* giant components
* duplicated logic
* hardcoded production data
* unnecessary dependencies
* unused imports
* dead code
* magic strings
* console spam
* temporary hacks

Use reusable components when they genuinely improve maintainability.

If TypeScript is used:

* maintain strong typing
* avoid unnecessary `any`
* type database responses
* type forms
* type component props
* type API responses

---

# 28. TECHNOLOGY STACK

Do not migrate the technology stack without a strong technical reason.

Do not unnecessarily change:

* React
* Next.js
* Supabase
* Tailwind
* existing database architecture

The objective is to improve the current project, not replace it.

---

# 29. IMPLEMENTATION ORDER

Implement in this order:

## Phase 1 — Audit

Inspect everything.

Report:

* current architecture
* current features
* current routes
* database/schema
* authentication
* roles
* booking flow
* problems
* risks
* recommended implementation plan

Do not make destructive changes.

## Phase 2 — Foundation

Improve:

* design system
* navbar
* footer
* responsive layout
* reusable UI
* loading states
* error states
* empty states
* toast system

## Phase 3 — Customer

Improve:

* homepage
* discovery
* search
* filters
* vendor profiles
* booking flow
* booking details
* customer dashboard
* booking history
* favorites

## Phase 4 — Vendor

Improve:

* vendor dashboard
* booking management
* vendor profile
* menu
* availability
* booking statuses

## Phase 5 — Admin

Improve:

* admin dashboard
* users
* vendors
* bookings
* analytics
* reviews
* management

## Phase 6 — Polish

Improve:

* animations
* micro-interactions
* accessibility
* SEO
* mobile UX
* performance
* visual consistency

## Phase 7 — Security + Testing

Test everything.

---

# 30. TESTING

Inspect `package.json` and run the project's actual validation commands.

Typical commands:

```bash
npm run lint
npm run typecheck
npm run build
```

Only run commands that actually exist.

Fix errors introduced by your changes.

Verify this flow:

```text
Register
 ↓
Login
 ↓
Explore
 ↓
Food Truck Profile
 ↓
Create Booking
 ↓
Confirmation
 ↓
Dashboard
 ↓
Booking Details
```

If vendor functionality exists:

```text
Vendor Login
 ↓
Vendor Dashboard
 ↓
Booking Request
 ↓
Accept/Reject
 ↓
Status Update
```

If admin functionality exists:

```text
Admin Login
 ↓
Admin Dashboard
 ↓
Manage Users
 ↓
Manage Vendors
 ↓
Manage Bookings
```

---

# 31. GIT SAFETY

If Git is available:

Check status before modifying.

Create checkpoints before major changes.

Never delete existing Git history.

Prefer meaningful commits such as:

```text
feat: improve booking experience
feat: improve customer dashboard
feat: improve vendor dashboard
feat: improve admin dashboard
fix: booking schema compatibility
refactor: improve shared UI
```

---

# 32. ERROR DEBUGGING

Never blindly patch errors.

For an error such as:

```text
Could not find the 'event_time' column of 'booking_requests' in the schema cache
```

Follow:

```text
Inspect schema
↓
Find actual field
↓
Inspect related code
↓
Understand intended behavior
↓
Make smallest safe change
↓
Test
```

Never create random database fields simply to eliminate an error.

---

# 33. REAL DATA RULE

Never fabricate:

* users
* bookings
* revenue
* ratings
* vendors
* availability
* reviews
* analytics

Use actual database data.

If temporary mock data is required during development, isolate it clearly and ensure production code does not depend on it.

---

# 34. NO GIANT REWRITE

Do not implement everything in one uncontrolled change.

Work incrementally:

```text
Inspect
↓
Implement
↓
Test
↓
Fix
↓
Verify existing features
↓
Continue
```

Keep the application runnable locally throughout the process.

---

# 35. FINAL QUALITY BAR

Before declaring the project complete, verify:

* Existing features still work.
* Existing database data is intact.
* No destructive migrations were performed.
* Booking flow works.
* Authentication works.
* Authorization works.
* RLS remains secure.
* Customer UX is polished.
* Vendor UX works where applicable.
* Admin UX works where applicable.
* Mobile UX is excellent.
* Loading states exist.
* Error states exist.
* Empty states exist.
* Forms validate correctly.
* No fake production data exists.
* No secrets are exposed.
* Lint/typecheck/build pass where available.
* UI is visually consistent.
* The application feels like a real product.

---

# STARTING INSTRUCTION

When I ask you to work on this project, your FIRST ACTION must be:

**AUDIT THE EXISTING PROJECT.**

Do not immediately rewrite files.

After auditing, summarize what you found and identify the safest first phase to implement.

Then proceed incrementally.

The core rule is:

> **Improve what exists. Do not destroy what already works.**
> """
> path = Path("/mnt/data/CODEX.md")
> path.write_text(content, encoding="utf-8")
> print(path)
> print(path.stat().st_size)
> caved?
