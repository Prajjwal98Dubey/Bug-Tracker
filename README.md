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

## Testing Credential

``` bash
[
  {
    "userId": "dev-001",
    "userName": "developer1",
    "password": "pass123",
    "role": "developer",
    "avatar": "https://i.pravatar.cc/150?img=1",
    "team": ["dev-002", "dev-003"],
    "manager": "mgr-001"
  },
  {
    "userId": "dev-002",
    "userName": "developer2",
    "password": "pass123",
    "role": "developer",
    "avatar": "https://i.pravatar.cc/150?img=2",
    "team": ["dev-001", "dev-003"],
    "manager": "mgr-001"
  },
  {
    "userId": "dev-003",
    "userName": "developer3",
    "password": "pass123",
    "role": "developer",
    "avatar": "https://i.pravatar.cc/150?img=3",
    "team": ["dev-002", "dev-001"],
    "manager": "mgr-001"
  },
  {
    "userId": "dev-004",
    "userName": "developer4",
    "password": "pass123",
    "role": "developer",
    "avatar": "https://i.pravatar.cc/150?img=2",
    "team": ["dev-005"],
    "manager": "mgr-002"
  },
  {
    "userId": "dev-005",
    "userName": "developer5",
    "password": "pass123",
    "role": "developer",
    "avatar": "https://i.pravatar.cc/150?img=2",
    "team": ["dev-004"],
    "manager": "mgr-002"
  },
  {
    "userId": "mgr-001",
    "userName": "manager1",
    "password": "pass123",
    "role": "manager",
    "avatar": "https://i.pravatar.cc/150?img=4",
    "team": ["dev-002", "dev-001", "dev-003"]
  },
  {
    "userId": "mgr-002",
    "userName": "manager2",
    "password": "pass123",
    "role": "manager",
    "avatar": "https://i.pravatar.cc/150?img=5",
    "team": ["dev-004", "dev-005"]
  }
]
```

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/Prajjwal98Dubey/Bug-Tracker.git
cd Bug-Tracker

