pipeline {
    agent any

    environment {
        AWS_ACCESS_KEY_ID = credentials('aws-access-key') // AWS credentials stored in Jenkins
        AWS_SECRET_ACCESS_KEY = credentials('aws-secret-key')
        AWS_DEFAULT_REGION = 'ap-south-1'
    }

    tools {
        nodejs 'NodeJS_16' // Replace 'NodeJS_16' with the name configured in Jenkins for Node.js
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/mehediemon/FlaireFrontend.git'
            }
        }

        stage('Build Frontend') {
            steps {
                nodejs('NodeJS_16') {
                    dir('frontend') {
                        npmInstall()
                        npm('run build') // Use the NodeJS plugin's npm function
                    }
                }
            }
        }

        stage('Deploy Frontend to S3') {
            steps {
                script {
                    awsS3Sync()
                }
            }
        }
    }
}

def awsS3Sync() {
    sh """
    aws s3 sync frontend/build/ s3://testnodebucket/ --delete
    aws s3 website s3://testnodebucket/ --index-document index.html --error-document index.html
    """
}
