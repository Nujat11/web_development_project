# 10 - User Journey Map 

## 1. Journey Stages
Registration -> Login -> Add Expense -> View Dashboard -> Analyze Spends -> Logout

## 2. End-to-End Journey Table

| Stage | User Goal | User Actions | System Response | Pain Risk | Improvement Opportunity |
|---|---|---|---|---|---|
| **Registration** | Create account safely | Enter email and password | Creates user and issues login token | Form errors/Email already taken | Inline validation for easy signup |
| **Login** | Access private data | Submit credentials | Authenticates and opens Dashboard | Forgotten passwords | Social Login (Google) or "Remember Me" |
| **Add Expense** | Log a spending FAST | Input amount and pick category | Saves transaction and updates balance | Too many fields to fill | One-tap icons for common categories |
| **View Dashboard**| Check current wealth | Open home page | Displays Total Balance prominently | Dashboard looks cluttered | Large, high-contrast balance text |
| **Analyze Spends**| See where money goes | Scroll to Pie Chart | Shows category-wise visual breakdown | Chart too small or hard to read | Interactive charts with tooltips |
| **Logout** | Secure the session | Click logout button | Terminates session and redirects | Accidental logout | "Are you sure?" confirmation |

## 3. Key Journey Improvements
1. **Frictionless Logging:** Reduce the "Add Expense" step to under 3 seconds.
2. **Instant Feedback:** The balance must update in real-time without refreshing.
3. **Visual Clarity:** Use clear color-coding for categories (e.g., Red for Food, Blue for Rent).
