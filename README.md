# HTUFoundIt Frontend Application

**HTUFoundIt** is an advanced, scalable, and user-friendly React-based web application specifically developed to manage lost-and-found items at Al-Hussein Technical University (HTU). The application ensures a smooth, secure, and intuitive experience for both students and administrators.

---

## 🚀 Features

### 🔑 Role-Based Authentication

* Secure route protection based on specific roles (Student/Admin).
* Simplified login, registration, and profile management through **Auth0**.

### 🎨 Modular UI Components

* Consistent and reusable headers, footers, sidebars, post cards, search filters, and error-handling components.
* Avatar selection and customization via **Dicebear API**.

### 📊 Comprehensive Admin Dashboards

* Administrators have powerful tools to track and manage all lost-and-found item statuses including Pending, Matched, Delivered, and Archived.
* Real-time updates and comprehensive management features.

### ⚡ Performance and Stability

* Integrated application performance monitoring with **Web Vitals**.
* Optimized for responsive design and efficient page loading.

---

## 📋 User Requirements

### Students

Students can:

* Register securely and log in.
* Report lost items, including uploading detailed images and descriptions.
* Browse and search through found items.
* Manage and view the status of their own reported lost items.
* Receive real-time updates regarding their reports.

### Administrators

Administrators can:

* View all student-submitted lost item reports.
* Add newly found items with detailed descriptions and images.
* Update item statuses dynamically (Pending, Matched, Delivered, Archived).
* Delete or edit existing posts and found item entries.
* Manage user interactions, permissions, and configurations.
* Utilize comprehensive dashboards that provide system updates, analytics, and insights.

---

## 🛠 Technologies

* **Frontend Framework:** React
* **Routing & Authentication:** React Router, Auth0
* **Image Handling:** Multer (Backend integration)
* **Avatar Customization:** Dicebear API
* **Styling:** Modular CSS
* **Version Control:** Git & GitHub

---

## 📂 Project Structure

The project's organized structure ensures easy collaboration and maintainability:

```
HTUFoundItFrontend/
├── public/
├── src/
│   ├── Auth/
│   │   ├── Callback.jsx
│   │   └── ProtectedRoute.jsx
│   ├── Components/
│   │   ├── AdminHeader.jsx
│   │   ├── FooterSection.jsx
│   │   ├── HeaderSection.jsx
│   │   ├── SideBarSection.jsx
│   │   ├── PostCard.jsx
│   │   ├── SearchFilterSection.jsx
│   │   └── NotFound.jsx
│   ├── CSS-Files/
│   │   ├── CSS-AdminDashboard.css
│   │   ├── CSS-AdminFoundItemsPage.css
│   │   ├── CSS-AdminRecentRequests.css
│   │   ├── CSS-AdminSettings.css
│   │   ├── CSS-AvatarAPIPage.css
│   │   ├── CSS-FooterSection.css
│   │   ├── CSS-HeaderSection.css
│   │   ├── CSS-HomePage.css
│   │   ├── CSS-PostCard.css
│   │   ├── CSS-PostPage.css
│   │   └── CSS-SignUpPage.css
│   ├── Pages/
│   │   ├── AdminArchivedItems.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── AdminDeliveredItems.jsx
│   │   ├── AdminFoundItemsPage.jsx
│   │   ├── AdminMatchedItems.jsx
│   │   ├── AdminRecentRequests.jsx
│   │   ├── AdminSettings.jsx
│   │   ├── AvatarAPIPage.jsx
│   │   ├── HomePage.jsx
│   │   ├── LogInPage.jsx
│   │   ├── PostPage.jsx
│   │   ├── SignUpPage.jsx
│   │   └── SubmitSuccessPage.jsx
│   ├── api.js
│   ├── App.js
│   └── index.js
├── .env.sample
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

* **Node.js and npm**
* **Git**

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/abdullatam/HTUFoundIt-Frontend
```

2. **Navigate to the project:**

```bash
cd HTUFoundIt-Frontend
```

3. **Install dependencies:**

```bash
npm install
```

### Running the App

* Start the application:

```bash
npm start
```

* Access via your browser: `http://localhost:3000`

### Testing

* Execute tests:

```bash
npm test
```

---

## 🗺️ Roadmap

* [x] User authentication and registration
* [x] Role-based access control
* [x] Admin Dashboard
* [x] Image uploads with Multer
* [x] Modular React components
* [x] Avatar customization
* [ ] Real-time notifications
* [ ] Advanced analytics and reporting

---

## 💡 Contribution

Contributions are welcome! Steps to contribute:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/YourFeature`.
3. Commit changes: `git commit -m 'Add YourFeature'`.
4. Push branch: `git push origin feature/YourFeature`.
5. Open a Pull Request describing your changes.

---

## 📜 License

Distributed under the MIT License. Refer to the `LICENSE` file for detailed information.

---

## 🙌 Acknowledgements

Special thanks to:

* React and React Router community
* Auth0 for authentication simplicity
* Dicebear for customizable avatars
* Al-Hussein Technical University for ongoing support and project inspiration

---

⭐ **Thank you for exploring HTUFoundIt Frontend Application!**
