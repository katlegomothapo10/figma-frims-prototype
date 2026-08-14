The original project is available at https://plugin-eject-06983422.figma.site/

FRIMS Prototype README

## 1. Introduction

FRIMS stands for Field Ranger and Incident Management System. The prototype was created to demonstrate how a digital system could be used by field rangers and section rangers or managers to report, manage, and monitor incidents.

The prototype focuses on the main activities that would be performed by each type of user. It is intended to demonstrate the proposed layout, navigation, and functionality of the system rather than serve as a fully operational application.

## 2. Purpose of the Prototype

The purpose of the prototype is to show how FRIMS could improve the process of recording and managing incidents.

The system is designed around two main users:

1. Field Ranger
2. Section Ranger / Manager

Field Rangers mainly use the system to report incidents and keep track of incidents they have submitted.

Section Rangers and Managers mainly use the system to review incidents, manage their status, assign responsibility, and monitor activity.

## 3. Field Ranger

The Field Ranger section is designed for users who are working in the field and need to record an incident.

The main functions available to the Field Ranger include:

1. Logging into the system.
2. Viewing the dashboard.
3. Reporting a new incident.
4. Entering information about an incident.
5. Adding the location of an incident.
6. Adding supporting evidence where required.
7. Submitting an incident report.
8. Viewing previously reported incidents.
9. Viewing the details and status of an incident.
10. Accessing their profile.

## 4. Section Ranger / Manager

The Section Ranger or Manager section is designed for users responsible for monitoring and managing incidents.

The main functions include:

1. Viewing the management dashboard.
2. Viewing reported incidents.
3. Opening individual incident reports.
4. Reviewing incident information.
5. Updating incident priority.
6. Updating incident status.
7. Assigning incidents where required.
8. Monitoring the progress of incidents.
9. Viewing ranger information.
10. Accessing reports and other management functions.

## 5. Main Buttons and Their Intended Use

### 5.1 Login / Sign In

The Login or Sign In button allows the user to enter the FRIMS system after entering their login details. The system would use the user's role to determine which interface they should access.

### 5.2 Logout

The Logout button ends the user's current session. It is used when the user has finished using the system or wants to switch accounts.

### 5.3 Dashboard

The Dashboard button takes the user back to the main dashboard for their account. It provides access to the main information and functions available to that user.

### 5.4 Report Incident

The Report Incident button starts the process of creating a new incident report. A Field Ranger would use this whenever an incident needs to be recorded in the system.

### 5.5 My Incidents

The My Incidents button opens a list of incidents that have been reported by the current Field Ranger. It allows the user to check previous reports and see their current status.

### 5.6 View Details

The View Details button opens the selected incident. It allows the user to see the information recorded for that incident without creating or changing a report.

### 5.7 Next

The Next button moves the user to the next section of a form. It is used when the user has completed the information required on the current section.

### 5.8 Previous / Back

The Previous or Back button returns the user to the previous screen or section. It allows information to be checked or corrected before continuing.

### 5.9 Submit Incident

The Submit Incident button sends the completed incident report to the system. Once submitted, the report can be reviewed and managed by the appropriate Section Ranger or Manager.

### 5.10 Cancel

The Cancel button stops the current action without submitting the information. It is useful when the user decides not to continue with the current process.

### 5.11 Save

The Save button stores information that has been entered by the user. It can be used when the user needs to preserve their progress before completing the entire process.

### 5.12 Add Location

The Add Location button allows the user to provide the location where an incident occurred. This information helps management understand where the incident took place.

### 5.13 Add Evidence

The Add Evidence button allows the user to provide supporting material related to an incident. This could include photographs, documents, or other relevant information depending on the final implementation of the system.

### 5.14 Incidents

The Incidents button opens the incident management section. It allows authorised users, particularly Section Rangers and Managers, to view incidents that have been reported.

### 5.15 View Incident

The View Incident button opens a specific incident report. It allows the manager to review the information provided by the Field Ranger.

### 5.16 Assign

The Assign button allows a manager to assign an incident to an appropriate ranger or responsible person. This helps ensure that incidents are given to someone who can respond to them.

### 5.17 Update Status

The Update Status button allows the current status of an incident to be changed. This can be used as an incident moves from being reported to being investigated, resolved, or closed.

### 5.18 Update Priority

The Update Priority button allows the manager to change the priority of an incident. This helps distinguish incidents that require immediate attention from those that can be handled later.

### 5.19 Resolve

The Resolve button is used when the required response to an incident has been completed. It indicates that the incident no longer requires active attention.

### 5.20 Close Incident

The Close Incident button completes the incident management process. It should be used once the incident has been handled and all required information has been recorded.

### 5.21 Rangers

The Rangers button opens the section containing information about field rangers. Managers can use this area to view or manage ranger information.

### 5.22 Reports

The Reports button opens the reporting section of the system. It is intended to provide management with information that can be used to review incident activity and system usage.

### 5.23 Settings

The Settings button opens the available system or account settings. This area would contain configuration options that are relevant to the current user.

### 5.24 Search

The Search button allows the user to look for specific information within the system. Depending on the screen, this could be used to find an incident, ranger, or other available record.

### 5.25 Filter

The Filter button allows the user to narrow down the information displayed on the screen. For example, incidents could be filtered according to their status, priority, date, or type.

### 5.26 Clear

The Clear button removes the search or filter options currently being applied. It returns the user to the standard list of available information.

### 5.27 Close

The Close button closes an open window, menu, notification, or other temporary section of the interface. It returns the user to the screen they were previously viewing.

## 6. Incident Reporting Process

The intended Field Ranger incident reporting process is:

1. The Field Ranger logs into FRIMS.
2. The Field Ranger opens the dashboard.
3. The Field Ranger selects Report Incident.
4. The Field Ranger enters the required incident information.
5. The Field Ranger provides the incident location.
6. The Field Ranger adds evidence where applicable.
7. The Field Ranger reviews the information.
8. The Field Ranger submits the incident.
9. The incident becomes available for management and further action.
10. The Field Ranger can later view the incident through My Incidents.

## 7. Incident Management Process

The intended management process is:

1. The Section Ranger or Manager logs into FRIMS.
2. The user opens the management dashboard.
3. The user reviews the reported incidents.
4. The user selects an incident.
5. The user reviews the incident information.
6. The user determines the appropriate priority.
7. The user assigns responsibility where required.
8. The user updates the incident status as work progresses.
9. The incident is marked as resolved once the required action has been completed.
10. The incident is closed once the process has been completed and documented.

## 8. Figma Prototype

The existing FRIMS prototype can be recreated in Figma as an interactive application prototype.

Each major screen should be created as a separate Figma frame. Buttons should then be connected to the relevant frames so that the user can move through the same processes demonstrated in the original prototype.

The Figma prototype should contain the main Field Ranger and Section Ranger or Manager journeys.

The recommended Figma structure is:

1. Login
2. Field Ranger Dashboard
3. Report Incident
4. Incident Form
5. Incident Confirmation
6. My Incidents
7. Incident Details
8. Manager Dashboard
9. Incident Management
10. Manager Incident Details
11. Ranger Management
12. Reports
13. Settings

## 9. Prototype Limitations

The current prototype is intended to demonstrate the proposed design and user experience.

It does not represent a complete production system. Features such as real authentication, database storage, live location tracking, notifications, file storage, user permissions, offline synchronisation, and backend processing would need to be implemented separately.

The prototype should therefore be viewed as a demonstration of how FRIMS could operate rather than a finished software application.

## 10. Intended Use

The prototype can be used to demonstrate the proposed FRIMS system to stakeholders, developers, designers, project managers, academic assessors, and potential users.

It provides a visual representation of how Field Rangers and Section Rangers or Managers would interact with the system and how an incident would move from initial reporting through to management and resolution.



  
