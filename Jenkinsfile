pipeline {
    agent any

    options {
        timestamps()
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Starting CI pipeline for Automated Scholarship Application Workflow'
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                dir('frontend') {
                    sh 'npm ci'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm run build'
                }
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                dir('backend') {
                    sh 'npm ci'
                }
            }
        }

        stage('Validate Backend JavaScript') {
            steps {
                dir('backend') {
                    sh 'node --check src/server.js'
                    sh 'node --check src/routes/auth.js'
                    sh 'node --check src/routes/scholarships.js'
                    sh 'node --check src/routes/applications.js'
                    sh 'node --check src/routes/admin.js'
                }
            }
        }
    }

    post {
        success {
            echo 'CI pipeline completed successfully.'
        }
        failure {
            echo 'CI pipeline failed. Check the stage logs.'
        }
    }
}