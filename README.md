# API Testing Assignment

This project is an API testing framework designed to perform tests on mock APIs. It uses **Mocha** for testing, **Axios** for making HTTP requests, and **Express** for mocking API responses.

---

## Project Setup

### Prerequisites

Before starting, ensure that the following tools are installed on your machine:

- **Node.js** (v16 or above)
- **npm**
- **Git**

---

### Step 1: Clone the Repository

```git clone https://github.com/bmukund21/api-testing-project.git ```
cd api-testing-project 

### Step 2: Install Dependencies
Run the following command to install all required dependencies:
```npm install```

This will install the following dependencies:
chai: Assertion library for testing
mocha: Test framework to run tests
axios: HTTP client for making API requests
node-fetch: Fetch API for making requests in Node.js
express: Web framework for creating the mock API server

### Step 3: Set Up Mock APIs
To mock the APIs, I’ve created a mock server using Express. The mock API runs on http://localhost:3000.

Navigate to the mock-apis directory:
```cd mock-apis```

Start the mock server:
```node source/mock-api.js```
You will see a message indicating that the mock API server is running:
Mock API server running on http://localhost:3000


### Step 4: Running the Tests
Once the mock API is up and running, you can run the tests using Mocha. The tests are located in the tests directory.

To run the tests, execute:
```npm test```

Mocha will run all tests in the tests directory and output the results in the terminal.

### Step 5: CI Pipeline Configuration
To automate the testing process, we’ll configure a CI/CD pipeline using Jenkins. This pipeline will trigger the tests on each commit.

1. Install Jenkins
If Jenkins is not already installed, follow the official Jenkins documentation to download and install it.

2. Create a New Jenkins Pipeline
In Jenkins, create a new pipeline project.
Under the Pipeline section, set SCM to Git and provide the repository URL for your project.
``` In the Pipeline script field, add the following:

pipeline {
  agent any
  stages {
    stage('Install Dependencies') {
      steps {
        script {
          sh 'npm install'
        }
      }
    }
    stage('Run Tests') {
      steps {
        script {
          sh 'npm test'
        }
      }
    }
  }
}

```
This pipeline script installs the dependencies and runs the tests using npm test. You can expand this pipeline to include additional steps, such as building, deploying, and notifying teams about the results.

