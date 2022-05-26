pipeline {
     agent {
        docker {
            image 'node:16-alpine' 
            args '-p 3000:3000' 
        }
    }
     stages {
        stage("Build") {
            steps {
                sh "npm install"
                sh "npm run build"
            }
        }
        stage("Deploy") {
            steps {
                sshPublisher(
                    continueOnError: false,
                    failOnError: true,
                    publishers: [
                        sshPublisherDesc(
                            configName: 'ITU SSH SERVER',
                            verbose: true,
                            transfers: [
                                sshTransfer(execCommand: "/bin/rm -rf /itu/users/ozkanbe19/web.itu.edu.tr/public_html/flower-app"),
                                sshTransfer(sourceFiles: "build/**", remoteDirectory: "flower-app", removePrefix: 'build')
                            ]
                        )
                    ]
                )
            }
        }
    }
}