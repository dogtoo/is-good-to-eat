pipeline {
    agent {
        docker {
            image 'node:14.15.4' 
            args '-p 32769:32769' 
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
                sh 'PORT=32769 HTTPS=true react-scripts start'   
            }
        }
    }
}
