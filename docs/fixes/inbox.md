# Inbox

**Problem:** Send opens the visitor’s mail client (`mailto:`). On a corporate laptop that often does nothing. There is no confirmation that you received anything. Phone is in `person` (unused in this app, but keep it off the site).

**Goal:** Recruiter can reach you without leaving the browser, or copy email in one click (already works). Do not collect a phone number on a public page.

## Files

- `src/components/apps/Contact.jsx` — form, mailto, copy-email
- `src/data/portfolio.js` — `person.email` (keep); remove `person.phone`
- `src/data/filesystem.js` — Inbox `reach-me.txt`

## Steps

1. **Keep Copy email.** It is the most reliable path. Make sure the toolbar button stays obvious (it already toggles “Copied”).

2. **Replace Send with a real inbox, or drop Send.** Pick one:

   **A. Form backend (recommended, ~15 min)**  
   Use [Formspree](https://formspree.io) or [Web3Forms](https://web3forms.com) (free tier).

   - Create a form, get the endpoint / access key.
   - Put the key in `.env` as `VITE_FORM_ENDPOINT` (Formspree URL) or `VITE_WEB3FORMS_KEY`.
   - In GitHub Actions / Vercel / Pages, add the same secret so production builds see it.
   - In `handleSend`, `POST` JSON `{ name, email, subject, body }` instead of `window.open(mailto)`.
   - On HTTP 200, set `sent` true. On failure, show “Copy email instead” — do not silently fail.

   **B. Calendar link**  
   If you would rather take meetings: add a `Book 15 min` button next to Copy email pointing at a Cal.com / Calendly URL in `person`. Keep the form as optional.

   **C. Mailto only**  
   If you refuse a backend, remove the Send button so you do not pretend the form delivers. Leave Copy email + `mailto:` link in the footer.

3. **Do not add phone** to Inbox, My Computer `reach-me.txt`, or the form.

4. **Subject default.** Change the mailto fallback subject from `Hello from your portfolio!` to something you will search: `gfedolfi.dev — <their subject>`.

5. **`.gitignore`.** Confirm `.env` is ignored (it should be). Never commit the form key.

## Verify

- Copy email writes `fedolficarlo@gmail.com` to the clipboard.
- Submit with a real backend: message arrives in your inbox.
- Disconnect network / bad key: UI tells you to copy email.
- Mobile Inbox tab still submits.
- View source / built JS: no phone number, no secret key in the bundle if you used a server-side-only secret (Formspree endpoint URLs in `VITE_*` are public by nature — that is OK; Web3Forms access keys in the client are also public, so enable their domain allowlist).
