pipeline {
    agent any

    tools {
        nodejs 'nodejs' // Replace 'NodeJS_16' with the correct name of your Node.js installation in Jenkins
    }

    environment {
        AWS_ACCESS_KEY_ID = credentials('aws-access-key') // AWS credentials stored in Jenkins
        AWS_SECRET_ACCESS_KEY = credentials('aws-secret-key')
        AWS_DEFAULT_REGION = 'ap-south-1'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/mehediemon/FlaireFrontend.git'
            }
        }

        stage('Build Frontend') {
            steps {
                dir('mehedi-flaire-frontend') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Deploy Frontend to S3') {
            steps {
                script {

                        sh '''
                        # Sync build folder with the S3 bucket
                        aws s3 sync build/ s3://${bucketName}/ --delete
                        
                        # Configure the S3 bucket for static website hosting
                        aws s3 website s3://${bucketName}/ --index-document index.html --error-document index.html
                        '''

                }
            }
        }
    }
}
