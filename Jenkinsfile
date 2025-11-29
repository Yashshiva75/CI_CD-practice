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
                git url: 'https://github.com/Yashshiva75/CI_CD-practice.git', branch: 'dev'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo "Building Docker image..."
                sh "docker build -t ${IMAGE_NAME}:${TAG} ."
            }
        }

        stage('Run Container') {
            steps {
                echo "Running Docker container..."
                sh "docker stop ${CONTAINER_NAME} || true"
                sh "docker rm ${CONTAINER_NAME} || true"
                sh "docker run -d -p ${PORT}:${PORT} --name ${CONTAINER_NAME} ${IMAGE_NAME}:${TAG}"
            }
        }
    }
}
