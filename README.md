# Chicken on Wheels — Vercel + Supabase

This project keeps the Chicken on Wheels website style and adds:
- Supabase email/password authentication
- User registration/login/logout
- Booking requests stored in Supabase
- User dashboard with request status
- Simple admin dashboard
- Row Level Security (RLS)

## 1. Create a Supabase project

Create a project at https://supabase.com.

Then open SQL Editor and run:

`supabase/schema.sql`

## 2. Configure Supabase

In Supabase:
- Authentication → URL Configuration:
  - Set Site URL to your Vercel URL, e.g. `https://your-project.vercel.app`
  - Add the same URL to Redirect URLs.
- Authentication → Providers → Email:
  - Enable Email provider.
  - For a simple demo, you may disable Confirm email. For a real public site, keep email confirmation enabled.

## 3. Add your Supabase key

Open `public/config.js` and replace:
- `SUPABASE_URL`
- `SUPABASE_PUBLISHABLE_KEY`

Use the Supabase **Publishable key** (or legacy `anon` key), not the secret/service-role key.

Because this is a static HTML/JS frontend, Vercel environment variables are not automatically injected into browser files. Do not put a secret/service-role key in `config.js`.

If you later add server-side email/API functions, put their secret keys in Vercel Environment Variables instead.

## 4. Make yourself admin

After creating your account, open Supabase Table Editor → profiles and change your user's `role` from `user` to `admin`.

## 5. Email notifications

This starter intentionally does not put an email-provider secret in browser JavaScript.
For automatic Gmail notifications after approval/rejection, connect a server-side email provider such as Resend to a Vercel Function. Keep that API key in Vercel Environment Variables.

The booking request itself is already saved in Supabase, so the admin can process it even before email automation is configured.

## 6. Deploy

Push this folder to GitHub, import the repository into Vercel, add the environment variables, and deploy.

The Vercel Hobby plan and Supabase Free plan have usage limits; free hosting is suitable for a small/student project but is not unlimited.
