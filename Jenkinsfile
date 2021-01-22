pipeline {
    agent {
        docker {
            image 'node:14.15.4' 
            args '-p 32769:32769 -u root' 
        }
    }
    stages {
        stage('Build') { 
            steps {
                sh 'npm install' 
            }
        }
        stage('start') {
            steps {
                sh 'npm run start'   
            }
        }
    }
}
