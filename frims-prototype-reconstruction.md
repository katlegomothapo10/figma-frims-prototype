# FRIMS — Figma Prototype Reconstruction

Recreate the existing FRIMS (Field Ranger & Incident Management System) web prototype as a fully editable Figma app prototype.

SOURCE OF TRUTH:

https://katlegomothapo10.github.io/frims-prototype/

The existing website is the visual and functional reference. Do not redesign the product unnecessarily. Recreate the existing interface, visual hierarchy, navigation, layouts, terminology, and user flows as accurately as possible.

## PRODUCT

FRIMS stands for Field Ranger & Incident Management System.

The application is designed for field rangers and section rangers/managers to record, monitor, manage, and respond to incidents.

The prototype contains role-specific experiences.

## PRIMARY ROLES

1. Field Ranger
2. Section Ranger / Manager

Create separate user journeys for both roles.

---

# DESIGN REQUIREMENTS

Recreate the visual language of the existing prototype.

Preserve:

* Overall layout
* Navigation structure
* Typography hierarchy
* Spacing
* Cards
* Buttons
* Forms
* Tables
* Status indicators
* Icons
* Colours
* Borders
* Shadows
* Radius
* Empty states
* Alerts
* Modals
* Headers
* Sidebars
* Mobile/responsive behaviour where applicable

Do not introduce a new visual identity.

Do not add unnecessary features.

Do not simplify the interface.

The goal is to convert the existing web prototype into an editable Figma prototype.

---

# FIGMA STRUCTURE

Organise the Figma file into these pages:

1. Cover
2. Design System
3. Components
4. Field Ranger Flow
5. Section Ranger / Manager Flow
6. All Screens
7. Prototype

---

# DESIGN SYSTEM

Create reusable Figma components for:

* Buttons
* Secondary buttons
* Destructive buttons
* Inputs
* Text areas
* Dropdowns
* Search fields
* Navigation items
* Sidebar
* Top navigation
* Cards
* Incident cards
* Status badges
* Priority badges
* Alerts
* Tables
* Table rows
* Tabs
* Modals
* Confirmation dialogs
* Toast notifications
* Empty states
* Loading states
* User/avatar components
* Form sections

Use Auto Layout wherever appropriate.

Use component variants for states such as:

* Default
* Hover
* Active
* Disabled
* Selected
* Error
* Success

---

# FIELD RANGER EXPERIENCE

Recreate the complete Field Ranger application flow.

Include the relevant screens visible in the existing prototype, including:

* Authentication / login
* Field Ranger dashboard
* Incident reporting
* Incident creation
* Incident details
* My incidents
* Incident status
* Location information
* Evidence / attachments
* Submission confirmation
* Profile/account
* Offline/synchronisation states if present

The incident reporting flow should feel like a real operational workflow rather than a generic form.

Prototype interaction:

Login
→ Field Ranger Dashboard
→ Log Incident
→ Complete Incident Form
→ Review
→ Submit
→ Confirmation
→ Incident Details
→ My Incidents

---

# SECTION RANGER / MANAGER EXPERIENCE

Recreate the manager experience from the existing prototype.

Include relevant screens such as:

* Manager dashboard
* Incident overview
* Incident list
* Incident details
* Incident monitoring
* Incident triage
* Priority/status management
* Ranger assignment
* Incident updates
* Reports
* Team/ranger management
* Settings where present

Prototype interaction:

Login
→ Manager Dashboard
→ View Incidents
→ Select Incident
→ Review Incident
→ Update Priority / Status
→ Assign Ranger
→ Save
→ Updated Incident

---

# INCIDENT DATA

Where the existing prototype displays incident information, recreate the same structure and use realistic sample data.

Examples of data categories may include:

* Incident ID
* Incident type
* Date/time
* Location
* Description
* Reporter
* Assigned ranger
* Priority
* Status
* Evidence
* Notes
* Resolution

Do not invent major functionality that does not exist in the source prototype.

---

# PROTOTYPE INTERACTIONS

Make the Figma prototype genuinely clickable.

Connect:

* Navigation
* Buttons
* Forms
* Tabs
* Incident cards
* Incident rows
* Back buttons
* Submit actions
* Confirmation actions
* Modals
* Status changes
* Assignment actions

Use appropriate Figma prototype interactions such as:

* Navigate to
* Open overlay
* Close overlay
* Back
* Change to
* Smart Animate where appropriate

The user should be able to click through the main workflows without dead ends.

---

# RESPONSIVE SCREENS

Where the original prototype supports different screen sizes, recreate the important responsive layouts.

Prioritise:

* Desktop
* Tablet
* Mobile

For mobile Field Ranger screens, prioritise usability in field conditions.

Buttons and important actions should be easy to reach and clearly identifiable.

---

# IMPORTANT

This is a reconstruction task, not a redesign task.

Use the existing FRIMS website as the source of truth.

Do not:

* Change the product name
* Change the core workflows
* Add unrelated features
* Replace the information architecture
* Create a completely different dashboard
* Add decorative UI that does not serve a purpose

The final result should look like the existing FRIMS web application has been rebuilt natively in Figma.

The final Figma prototype should be:

* Visually faithful
* Fully editable
* Component-based
* Auto Layout-based where practical
* Properly organised
* Clickable
* Presentation-ready
* Suitable for demonstrating the FRIMS concept to stakeholders
