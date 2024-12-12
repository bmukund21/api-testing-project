API Testing Assignment
This project is an API testing framework designed to perform tests on mock APIs. It uses Mocha for testing, Axios for making HTTP requests, and Express for mocking the API responses.

**Project Setup**
*Prerequisites*
Before starting, ensure that the following tools are installed on your machine:

Node.js (v16 or above)
npm
Git

**Step 1: Clone the Repository**
Start by cloning this repository:

git clone https://github.com/bmukund21/api-testing-project.git
cd api-testing-project

**Step 2: Install Dependencies**
Run the following command to install all required dependencies:

npm install

This will install the following dependencies:

chai: Assertion library for testing.
mocha: Test framework to run tests.
axios: HTTP client for making API requests.
node-fetch: Fetch API for making requests in a Node.js environment.
express: Web framework for creating the mock API server.

**Step 3: Set up Mock APIs**
To mock the APIs, we’ve created a mock server using Express. The mock API runs on http://localhost:3000. Here's how to start it:

Navigate to the mock-apis directory:
cd mock-apis
Start the mock server by running:

node source/mock-api.js
This will start the mock API server, with a message indicating that it's running:

Mock API server running on http://localhost:3000

**Step 4: Running the Tests**
Once the mock API is up and running, run the tests using Mocha. The tests are located in the tests directory.

To run the tests, execute the following command:

npm test
This will run all the tests in the tests directory. Mocha will output the results in the terminal.

**Step 5: CI Pipeline Configuration**
To automate the testing process, we’ll configure a CI/CD pipeline using Jenkins. This pipeline will trigger the tests on each commit.

1. Install Jenkins
If you don’t already have Jenkins installed, you can download and install it.

1. Create a New Jenkins Pipeline
In Jenkins, create a new pipeline project.

Under the "Pipeline" section, configure it as follows:

Set the SCM to Git and provide the repository URL for your project.

In the "Pipeline" script, add the following script:

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
This pipeline script installs the dependencies and runs the tests using the npm test command. Expand the pipeline to include additional steps such as building, deploying, and notifying teams about the results.