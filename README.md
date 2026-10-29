# Automated Scholarship Application Workflow

A web-based scholarship management system developed using DevOps practices to streamline scholarship applications, manage student submissions, and automate the build and testing process.

## 📌 Project Overview

The **Automated Scholarship Application Workflow** provides a centralized platform where students can register, log in, view available scholarships, submit applications, and track their application status.

The project demonstrates how DevOps tools and practices can be used to automate software integration, testing, and containerized application execution.

## 🎯 Objectives

- Develop a web-based scholarship application system.
- Simplify the scholarship application process for students.
- Store student, scholarship, and application information in a PostgreSQL database.
- Implement version control using Git and GitHub.
- Automate build and testing stages using Jenkins.
- Containerize application services using Docker.
- Manage multiple containers using Docker Compose.
- Perform automated backend and browser testing.

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| React | Frontend user interface |
| Vite | Frontend development and production builds |
| Node.js | Backend JavaScript runtime |
| Express.js | Backend REST API |
| PostgreSQL | Relational database |
| Git | Version control |
| GitHub | Source code hosting |
| Jenkins | Continuous Integration pipeline |
| Docker | Application containerization |
| Docker Compose | Multi-container management |
| Jest | Backend testing |
| Supertest | HTTP API testing |
| Selenium | Browser automation testing |
| Maven | Dependency management and execution of Selenium tests |

## ✨ Features

- Student registration and login
- Authentication using the backend API
- Scholarship listing
- Scholarship application submission
- Application status tracking
- PostgreSQL database integration
- Automated frontend production build
- Automated backend tests
- Browser-based Selenium tests
- Containerized application services

## 🏗️ System Architecture

```text
                 Developer
                     |
                     v
                Git / GitHub
                     |
                     v
              Jenkins Pipeline
                     |
          +----------+----------+
          |          |          |
          v          v          v
       Install     Build      Testing
     Dependencies  Frontend   Jest / Supertest
                               Selenium
                     |
                     v
              Docker Compose
                     |
          +----------+----------+
          |          |          |
          v          v          v
       Frontend    Backend   PostgreSQL
       React/Vite  Express     Database
```

## ⚙️ DevOps Workflow

1. **Version Control:** Source code is managed using Git.
2. **Code Hosting:** The project repository is hosted on GitHub.
3. **Continuous Integration:** Jenkins checks out the source code and executes the pipeline defined in the `Jenkinsfile`.
4. **Dependency Installation:** npm installs the frontend and backend dependencies.
5. **Build:** Vite creates the production frontend build.
6. **Automated Testing:** Jest and Supertest run backend tests, while Maven executes the Selenium test suite.
7. **Containerization:** Docker packages application services into containers.
8. **Container Management:** Docker Compose manages the frontend, backend, and database services.
9. **Pipeline Reporting:** Jenkins displays the status of the pipeline stages.

## 🧪 Testing

The project uses multiple testing tools:

- **Jest:** Executes automated backend tests.
- **Supertest:** Tests backend HTTP endpoints.
- **Selenium:** Automates browser interactions for application testing.
- **Maven:** Runs the Selenium tests and manages their dependencies.
- **Jenkins:** Orchestrates the build and testing stages.

## 🚀 Getting Started

### Prerequisites

Install the following tools:

- Node.js and npm
- Git
- Docker Desktop
- Docker Compose

Java and Maven are also required to run the Selenium test suite separately.

### 1. Clone the Repository

```bash
git clone https://github.com/Aryan457-dev/automated-scholarship-application-workflow.git
cd automated-scholarship-application-workflow
```

### 2. Configure Environment Variables

Review the backend environment configuration and provide the required database credentials, authentication secrets, and application settings.

Do not commit `.env` files, passwords, or secret keys to GitHub.

### 3. Start the Application

From the project root, run:

```bash
docker compose up -d --build
```

Check the container status:

```bash
docker compose ps
```

View service logs:

```bash
docker compose logs -f
```

### 4. Access the Application

When using the configured local port mappings:

- **Frontend:** http://localhost:8081
- **Backend health endpoint:** http://localhost:5001/api/health
- **Jenkins dashboard:** http://localhost:8080, if Jenkins is running locally

### 5. Run Backend Tests

Navigate to the backend directory:

```bash
cd backend
npm ci
npm test
```

### 6. Run Selenium Tests

Navigate to the directory containing the Selenium test project's `pom.xml` file, then run:

```bash
mvn test
```

The Selenium tests require the application and the relevant browser/WebDriver setup to be available.

## 🔄 Jenkins CI Pipeline

The project includes a `Jenkinsfile` defining the CI pipeline.

The pipeline includes stages for:

- Checking out source code
- Checking Node.js and npm
- Installing frontend dependencies
- Building the frontend
- Installing backend dependencies
- Running backend tests
- Validating backend JavaScript
- Starting Docker services
- Running Selenium tests
- Reporting the final pipeline status

The pipeline can be executed through the Jenkins dashboard. Automatic execution on every GitHub push depends on the configured webhook or pipeline trigger.

## 📁 Project Structure

```text
automated-scholarship-application-workflow/
├── backend/
│   ├── src/
│   ├── package.json
│   └── package-lock.json
├── frontend/
│   ├── src/
│   ├── package.json
│   └── package-lock.json
├── test/
│   └── Selenium test files
├── docs/
├── Jenkinsfile
├── docker-compose.yml
└── README.md
```

*Note: The structure above is representative. Adjust it to match the actual files and directories in your repository.*

## 🔒 Security Considerations

- Store credentials and secrets in environment variables.
- Never commit `.env` files or authentication tokens.
- Validate user input on the backend.
- Use appropriate authentication and authorization checks.
- Restrict database access to authorized services.

## 🔮 Future Enhancements

- Automated deployment to a cloud platform
- GitHub webhook integration for automatic pipeline triggers
- Scholarship eligibility checks
- Email notifications for application status changes
- Administrative dashboard for reviewing applications
- Database migrations and automated schema initialization
- Improved test coverage and security scanning

## 👨‍💻 Author

**Aryan Dabholkar**

GitHub: [Aryan457-dev](https://github.com/Aryan457-dev)

## 📄 License

This project was developed for academic and educational purposes. Add a specific open-source license if you intend to distribute the project under one.
