pipeline {
    agent any

    environment {
        AWS_ACCESS_KEY_ID = credentials('aws-acces-key') // AWS credentials stored in Jenkins
        AWS_SECRET_ACCESS_KEY = credentials('aws-secret-key')
        AWS_DEFAULT_REGION = 'ap-south-1'

    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/mehediemon/frontend.git'
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Deploy Frontend to S3') {
            steps {
                script {
                    sh """
                    aws s3 sync frontend/build/ s3://testnodebucket/ --delete
                    aws s3 website s3://testnodebucket/ --index-document index.html --error-document index.html
                    """
                }
            }
        }

    }
}