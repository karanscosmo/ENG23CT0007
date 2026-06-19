# Video Demo Checklist

Please follow this checklist to produce the required video documentation for the AffordMed Frontend Evaluation.

## 1. Desktop Walkthrough
- [ ] Open the application on a Desktop browser viewport.
- [ ] Show the initial load of the "All Notifications" page.
- [ ] Demonstrate navigation between "All Notifications" and "Priority Inbox" using the side drawer.

## 2. Mobile Walkthrough
- [ ] Switch the browser viewport to a mobile device size (e.g., iPhone 12 Pro).
- [ ] Show the responsive hamburger menu and app bar.
- [ ] Navigate between pages using the mobile drawer.
- [ ] Verify that cards and layouts adapt properly without horizontal scrolling.

## 3. Filtering
- [ ] On the "All Notifications" page, select different options from the Filter dropdown (Placement, Result, Event).
- [ ] Verify that the list updates accordingly.
- [ ] Repeat the filtering demonstration on the "Priority Inbox" page.

## 4. Pagination
- [ ] On the "All Notifications" page, scroll to the bottom.
- [ ] Click on page 2, page 3, etc., and observe the data refreshing.
- [ ] Ensure that filtering resets pagination to page 1.

## 5. Priority Inbox
- [ ] Navigate to the "Priority Inbox" page.
- [ ] Show the default Top 10 notifications.
- [ ] Use the "Show Top" dropdown to switch to Top 15 and Top 20.
- [ ] Highlight the visual priority score tags and priority styling.

## 6. Viewed Notifications
- [ ] Click on several unread notifications (marked with "NEW" badges and highlighted borders).
- [ ] Verify that the "NEW" badge disappears and the styling mutes instantly.
- [ ] Refresh the page (`Cmd+R` / `Ctrl+R`) and show that the viewed state persists across reloads via localStorage.

## 7. Error Handling
- [ ] Simulate an API failure or network drop (e.g., via Chrome DevTools Network tab -> Offline).
- [ ] Reload the page or trigger a fetch.
- [ ] Show the graceful error alert banner being displayed.
- [ ] Ensure no `console.log` errors leak from the custom logger logic.
