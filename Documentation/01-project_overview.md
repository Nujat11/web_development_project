# Personal Expense Tracker - Project Overview

## 1. Executive Summary
Personal Expense Tracker is a secure, cloud-based financial management platform designed to help individuals monitor, analyze, and optimize their spending habits. The application combines intuitive transaction logging, automated category-wise insights, and visual budget tracking to empower users with financial literacy and better savings management.

## 2. Project Background
Financial mismanagement often stems from a lack of visibility into small, daily expenditures. Traditional methods like paper logging or complex spreadsheets are either tedious or inaccessible on the go. Market research shows that users need a unified tool that bridges the gap between raw bank statements and actionable financial insights.

## 3. Business Problem
Current financial habits are often inefficient because:
*   Manual tracking is inconsistent, leading to "hidden" expenses.
*   Category-wise spending (e.g., Food vs. Utilities) is not easily visualized.
*   Overspending occurs due to the lack of real-time budget alerts.
*   Data privacy is a concern with many free, unverified tracking apps.

## 4. Proposed Solution
Deliver a robust, minimalist financial cockpit with:
*   **Transaction Lifecycle Management:** Effortless logging of income and expenses.
*   **Smart Categorization:** Tagging transactions by type (Rent, Groceries, Salary, etc.).
*   **Data Visualization:** Interactive charts (Pie/Line) for monthly trend analysis.
*   **Budgeting Engine:** Setting monthly limits and tracking progress.
*   **Tech Stack:** JWT-secured **FastAPI** backend, **React (Vite)** frontend, **PostgreSQL** for relational data integrity, and **Dockerized** deployment capability.

## 5. Project Scope
| **In Scope** | **Description** |
| :--- | :--- |
| **User Authentication** | Secure register, login, and JWT-based session management. |
| **Expense Management** | Full CRUD operations for daily expenses and income. |
| **Financial Analytics** | Dashboard summary of total balance, income vs. expense ratios. |
| **Data Visualization** | Real-time charts showing spending distribution by category. |
| **Budget Tracking** | Implementation of monthly category-wise budget limits. |
| **Responsive UI** | Mobile-first web design for tracking on the go. |

## 6. Stakeholders
| **Stakeholder Group** | **Primary Interest** |
| :--- | :--- |
| **End Users** | Financial clarity, ease of use, and data security. |
| **Product Developers** | Scalable architecture and efficient database queries. |
| **Data Analysts** | Accuracy of spending trends and report generation. |
| **Security/Compliance** | Ensuring financial data protection and encryption. |

## 7. Business Value
*   **Enhanced Savings:** Identifies unnecessary spending patterns to increase net savings.
*   **Financial Discipline:** Real-time visibility encourages budget adherence.
*   **Reduced Anxiety:** Automated totals and balances reduce the stress of manual calculations.
*   **Data Portability:** Structured data allows for future export to tax or accounting tools.

## 8. Success Metrics
| **Metric ID** | **Metric** | **Target (6 Months)** |
| :--- | :--- | :--- |
| **SM-01** | User engagement frequency | At least 5 logs per week (Active users). |
| **SM-02** | Budget adherence rate | >= 60% of users staying within budget. |
| **SM-03** | Data accuracy | 100% reconciliation between logs and balance. |
| **SM-04** | API Response time (P95) | <= 300 ms for transaction retrieval. |
| **SM-05** | UI Accessibility score | >= 90% on Lighthouse/Web Vitals. |

## 9. Assumptions
*   Users have access to modern browsers and a stable internet connection.
*   Manual entry is the primary mode (no direct bank API integration in MVP).
*   The primary currency is fixed based on user profile settings.

## 10. Constraints
*   **Timeframe:** Must be completed within the academic/professional semester.
*   **Technical:** Limited to React and FastAPI as per core project requirements.
*   **Security:** Must adhere to secure password hashing (BCrypt) standards.

## 11. Out Of Scope
*   Direct integration with bank APIs (Phase 2).
*   AI-driven expense predictions (Phase 3).
*   Multi-user/Family shared accounts.
*   Currency conversion (limited to single currency per user).
