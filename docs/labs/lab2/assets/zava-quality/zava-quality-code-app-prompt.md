# Zava Quality Incident Tracker prompt

Create a responsive Power Apps code app called **Zava Quality Incident Tracker** for Zava's quality operations team.

Build a simple maker-friendly experience with:

- A dashboard showing synthetic quality incidents.
- Summary cards for Open, On hold, Critical, and Closed incidents.
- A table or card list with:
  - Incident ID
  - Batch ID
  - ZavaCore product
  - Issue summary
  - Severity
  - Status
  - Owner
- Filters for product, severity, and status.
- A new-incident form with required batch ID, product, issue summary, and severity fields.
- A detail view for each incident.
- Clear Zava branding without external logos or images.
- Responsive layouts and accessible labels.

Use local synthetic sample data only. Do not add a connector, database, authentication system, backend service, secret, or sensitive data. Keep the implementation small enough to build and demonstrate during a workshop.

Create at least six sample incidents across ZavaCore Field and ZavaCore Systems products. Include a mixture of observation, hold, critical, and closed examples.

Present the implementation plan for approval before creating files. For this exercise, do not run `pa app init`, `pa auth login`, `pa app push`, or any deployment command. Run the linter and production build, then stop so the attendee can validate locally and publish explicitly to a Power Platform solution.
