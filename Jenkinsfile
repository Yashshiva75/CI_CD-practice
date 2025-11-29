pipeline {
    agent any

    environment {
        IMAGE_NAME = "my-mern-app"
        CONTAINER_NAME = "my-mern-app"
        PORT = "3000"
        TAG = "dev"
    }

    stages {
        stage('Checkout') {
            steps {
                echo "Checking out code from dev branch..."
                git branch: 'dev', url: 'https://github.com/Yashshiva75/CI_CD-practice.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo "Building Docker image..."
                sh "docker build -t ${IMAGE_NAME}:${TAG} ."
            }
        }

        stage('Deploy Container') {
            steps {
                echo "Stopping old container if exists..."
                sh "docker stop ${CONTAINER_NAME} || true"
                sh "docker rm ${CONTAINER_NAME} || true"

                echo "Running new container..."
                sh "docker run -d -p ${PORT}:${PORT} --name ${CONTAINER_NAME} ${IMAGE_NAME}:${TAG}"
            }
        }
    }

    post {
        success {
            echo "Deployment successful! Container is running on port ${PORT}."
        }
        failure {
            echo "Deployment failed!"
        }
    }
}
