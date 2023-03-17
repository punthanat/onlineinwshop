pipeline {
    agent any
    stages {
      
        stage('stop and remove container, image') {
            steps {
                script {
                    def imageExists = sh(script: 'docker images -q frontend', returnStdout: true) == ""
                    println imageExists
                    
                    if( !imageExists ){
                           sh 'docker stop frontend'
                           sh 'docker rm frontend'
                           sh 'docker image rm frontend'
                    }else {
                        echo 'Skip this stage '
                    }
                }
            }
        }
      
        stage('remove whole data') {
            steps {   
                sh 'rm -rf *'
            }
        }
        
        stage('git clone') {
            steps {       
                git branch: 'master',
                    credentialsId: 'punthanatGit',
                    url: 'https://github.com/int222-36-37-58/FrontEnd.git'
            }
        }  
        
        stage('deploy') {
            steps {
                sh 'docker-compose up -d'
            }
        }
      
    }
}
