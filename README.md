# 🐞 Tira Tracker

A bug tracking system (only frontend)

## ⚠️ Warning

- If someone has used this application before the final production deployment, please clear "localStorage" of your web application and then use the application.

## ✏️ Implementation Assumptions (MVP)

- Instead of state management library like redux, currently I am using localStorage to store the details about all the task and user authentication.
- Developer can set two status: "Pending" and "Approval", approval request will go the respective manager.
- status like: "completed" and "closed" will only be accepted if the manager does so.
- Manager can reject, approve, re-open the task/bug.
- Developer/Manager can filter the tickets based on priority, status.
- As of now only a developer can assign a task/bug to the other developer or to itself.

## 🚀 Features

- User authentication (hard coded)
- Create, update, delete bug reports
- Assign bugs to users
- Set bug status and priority
- Filter and view all bugs
- Responsive and minimal UI

## 🛠️ Tech Stack

- **Frontend**: HTML, CSS, JS, React.js, TailwindCSS

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/Prajjwal98Dubey/Bug-Tracker.git
cd Bug-Tracker
