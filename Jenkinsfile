pipeline {
    agent any

    environment {
        PATH = "/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin:/usr/sbin:/sbin:${env.PATH}"
    }

    options {
        timestamps()
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Starting CI pipeline for Automated Scholarship Application Workflow'
            }
        }

        stage('Check Node.js and npm') {
            steps {
                sh 'node -v'
                sh 'npm -v'
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

        stage('Run Backend Tests') {
            steps {
                dir('backend') {
                    sh 'npm test -- --runInBand'
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

        stage('Start Docker Services') {
            steps {
                withCredentials([
                    string(credentialsId: 'scholarship-db-password', variable: 'DB_PASSWORD'),
                    string(credentialsId: 'scholarship-jwt-secret', variable: 'JWT_SECRET')
                ]) {
                    sh 'docker compose up -d --build'
                }
            }
        }

        stage('Run Selenium Tests') {
            steps {
                dir('test') {
                    sh 'mvn test'
                }
            }
        }
    }

    post {
        always {
            junit allowEmptyResults: true, testResults: 'test/target/surefire-reports/*.xml'
        }

        success {
            echo 'CI pipeline completed successfully.'
        }

        failure {
            echo 'CI pipeline failed. Check the stage logs.'
        }
    }
}