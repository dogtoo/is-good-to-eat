pipeline {
    agent {
        docker {
            image 'node:6-alpine' 
            args '-p 32769:32769' 
        }
    }
    stages {
        stage('Build') { 
            steps {
                sh 'npm install' 
            }
        }
    }
}
