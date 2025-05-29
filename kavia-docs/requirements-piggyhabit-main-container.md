# PiggyHabit Main Container Requirements

## 1. Overview

PiggyHabit is a simple cross-platform web application designed to help users manually track their small savings, simulating a piggy bank experience. The Main Container serves as the primary user interface, offering features to log savings and withdrawals, monitor savings progress, maintain a history of transactions, set goals, and receive motivational encouragement—all with an intuitive, modern, and responsive design. The focus is on motivation and habit-building, with **no real money or banking integrations**.

## 2. Functional Requirements

### 2.1. Add Savings

- **FR-1.1:** Users must be able to manually enter and add a positive savings amount to their piggy bank balance.
- **FR-1.2:** The current balance must update immediately upon successful addition.
- **FR-1.3:** Each addition should be logged with an amount and timestamp in the savings history.

### 2.2. Withdraw Savings

- **FR-2.1:** Users must be able to manually subtract an entered amount from their piggy bank balance.
- **FR-2.2:** The app should prevent withdrawals that would result in a negative balance.
- **FR-2.3:** Each withdrawal should be logged with an amount and timestamp in the savings history.

### 2.3. Savings History

- **FR-3.1:** The app must display a chronological list of all additions (savings) and subtractions (withdrawals).
- **FR-3.2:** Each entry should include date, time, amount, and transaction type (add/withdraw).
- **FR-3.3:** The history should be accessible from the main interface, via a tab or a dedicated button.

### 2.4. Set Savings Goal

- **FR-4.1:** Users must be able to set a numeric target goal for total savings.
- **FR-4.2:** The app should display progress toward the goal, both numerically and via a visual indicator (such as a progress bar).
- **FR-4.3:** Users should be able to edit or reset the goal at any time.

### 2.5. Motivational Messages

- **FR-5.1:** The app should present users with encouraging messages or tips to promote savings behavior.
- **FR-5.2:** Motivational content may appear at the top of the main screen or as pop-up notifications (placement is flexible).
- **FR-5.3:** A basic cycle or small pool of messages is sufficient for MVP.

### 2.6. User Interface & Interactions

- **FR-6.1:** The main screen must prominently display the current piggy bank balance and a piggy bank-themed graphic.
- **FR-6.2:** Primary actions (add/withdraw) should be accessible with buttons below the balance.
- **FR-6.3:** Navigation to savings history and goal management must be clear and intuitive.
- **FR-6.4:** All UI elements must have accessible labels, and keyboard navigation must be supported.

---

## 3. Non-Functional Requirements

### 3.1. Usability

- **NFR-1.1:** The app must be simple, intuitive, and easy to use for users of all ages.
- **NFR-1.2:** Immediate feedback on actions (e.g., balance changes, error states).
- **NFR-1.3:** No onboarding or authentication is required for MVP.

### 3.2. Platform & Technology

- **NFR-2.1:** The application is a web app, built using React JS (JavaScript ES6+).
- **NFR-2.2:** No backend or server-side integration is required; all data storage for MVP can be local (e.g., browser local storage).
- **NFR-2.3:** Runs on modern browsers as defined by the project's `browserslist`.

### 3.3. Styling & Branding

- **NFR-3.1:** Uses a clean, modern UI with a dark theme.
- **NFR-3.2:** Brand colors and UI variables are defined using CSS variables:
  - Primary: `#FBC02D`
  - Secondary: `#FFF9C4`
  - Accent: `#E65100`
  - Kavia orange: `#E87A41`
  - Dark background: `#1A1A1A`
  - Text: White and secondary shades as defined in CSS
- **NFR-3.3:** All styling leverages vanilla CSS (no heavy UI frameworks). CSS classes for core components (`.btn`, `.container`, `.navbar`, `.title`, etc.) must be used as defined.

### 3.4. Performance

- **NFR-4.1:** The app must load quickly with minimal dependencies.
- **NFR-4.2:** No unnecessary network requests or slow-loading assets.

### 3.5. Accessibility & Responsiveness

- **NFR-5.1:** The UI must be fully responsive, providing a good experience on both desktop and mobile browsers.
- **NFR-5.2:** Core functions must remain accessible via keyboard navigation.
- **NFR-5.3:** Maintain WAI-ARIA best practices for all interactive elements.

### 3.6. Security & Privacy

- **NFR-6.1:** No personal information is collected, stored, or transmitted.
- **NFR-6.2:** No integrations with external services or APIs for MVP.

### 3.7. Constraints

- **NFR-7.1:** No real money transactions—application must not integrate with banks, payment services, or handle actual currency.
- **NFR-7.2:** Designed for single-user, single-device use (synchronization and accounts are not required for MVP).
- **NFR-7.3:** Simple codebase with minimal third-party dependencies for ease of maintenance.

---

## 4. Future Enhancements (Out of Scope for MVP)

- Multi-device synchronization
- User accounts or authentication
- Customization of motivational messages
- Advanced analytics on savings habits
- Integration with notifications or reminders

---

## 5. References

- Project README: piggyhabit/README.md
- Source files: piggyhabit/src/App.js, piggyhabit/src/index.js
- Styling: piggyhabit/src/App.css, piggyhabit/src/index.css

---

This requirements document defines both the minimum feature set and the constraints for the PiggyHabit Main Container React web app MVP.
