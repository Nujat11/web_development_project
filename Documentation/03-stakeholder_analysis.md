# Personal Expense Tracker - Stakeholder Analysis

## 1. Stakeholder Categories

### Primary Stakeholders
| Stakeholder | Role | Key Expectation |
| :--- | :--- | :--- |
| **End Users** | Daily financial logging | Privacy, simple UI, and accurate balance reporting |
| **Project Owner** | Feature prioritization | Timely delivery of a functional and secure MVP |

### Secondary Stakeholders
| Stakeholder | Role | Key Expectation |
| :--- | :--- | :--- |
| **Academic Instructor** | Project Evaluator | Clear documentation and adherence to best practices |
| **Peer Reviewers** | Quality check | Readable code and standardized API folder structure |

### Internal Stakeholders
*   **Full Stack Developer:** Handles development for both React (Frontend) and FastAPI (Backend).
*   **UI Designer:** Responsible for making the dashboard intuitive and accessible.
*   **QA Tester:** Ensures calculations and data persistence work correctly.

### External Stakeholders
*   **Database Provider (PostgreSQL):** Reliability and data persistency.
*   **GitHub:** Source control and project management hosting.

## 2. Stakeholder Influence-Interest Matrix

| Stakeholder | Influence | Interest |
| :--- | :--- | :--- |
| **Project Owner** | High | High |
| **Full Stack Developer** | High | High |
| **Academic Instructor** | High | Medium |
| **End Users** | Medium | High |
| **QA/Tester** | Medium | Medium |

## 3. RACI Matrix (Simplified)

| Deliverable | Owner | Architect | Development | QA | Reviewer |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Documentation (PrD/SRS)** | A/R | C | C | I | C |
| **Architecture Design** | A | R | R | C | I |
| **Backend API Implementation** | I | C | A/R | C | I |
| **Frontend Development** | I | C | A/R | C | I |
| **Testing & Validation** | C | I | C | A/R | I |
| **Final Signoff** | A | C | C | C | R |

**Legend:** R = Responsible, A = Accountable, C = Consulted, I = Informed.
