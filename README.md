Todo Item Card v2

A clean, modern, accessible, and fully testable Todo / Task Card built with vanilla HTML, CSS, and JavaScript. This version includes enhanced interactivity, status transitions, priority indicators, expand/collapse behavior, and dynamic time handling.

Preview

A single task card component featuring:

Animated priority accent bar at the top of the card
Task title with completion toggle and strikethrough
Priority dot + badge with color-coded visual indicators
Status badge synced with checkbox and status dropdown
Collapsible description with expand/collapse toggle
Live time remaining countdown with overdue detection
Inline edit mode with save/cancel and focus management
Dynamic tag management — add and remove tags
Smooth delete animation

What's New in v2

Compared to v1, this version adds:

Priority indicator bar — colored accent across the top of the card (red / amber / green)
Priority dot — small colored dot next to the priority badge
Status control dropdown — change status directly on the card without entering edit mode
Expand / collapse — long descriptions collapse by default with a toggle button
Overdue indicator badge — appears automatically with red accent when past the due date
Granular time display — shows "Due in 3 hours", "Due in 45 minutes", "Overdue by 1 hour"
Timer updates every 30 seconds — more responsive than the previous 60 second interval
Completed state — time remaining stops and shows "Completed" when status is Done
True cancel — state is deep-cloned before editing so Cancel fully restores previous values
Focus management — focus returns to Edit button after Save or Cancel
Status sync — checkbox, status badge, and status dropdown all stay in sync

Usage

Completing a Task
Click the checkbox in the top left. The title strikes through, status changes to "Done", time remaining shows "Completed", and the card dims slightly. Uncheck to revert to "Pending".
Changing Status
Use the Status dropdown directly on the card to switch between Pending, In Progress, and Done without entering edit mode. Changing to Done automatically checks the checkbox and syncs all visual states.
Expanding the Description
If the description is longer than 120 characters it collapses by default. Click Show more to reveal the full text. Click Show less to collapse again. The toggle is fully keyboard accessible.
Editing a Task
Click the Edit button. An edit panel slides open with fields for:

Title
Description
Priority (High / Medium / Low)
Due date

Click Save changes to apply. Click Cancel to discard and restore the previous values exactly. Focus automatically returns to the Edit button after closing.
Managing Tags
Type a tag name in the input field and press Enter or click + Add. Click the × button on any tag to remove it. Duplicate tags are ignored automatically.
Deleting a Task
Click the Delete button. The card fades out and scales down before being removed.

Technologies Used

HTML5 — semantic markup
CSS3 — custom properties, flexbox, transitions
Vanilla JavaScript — no frameworks or libraries
