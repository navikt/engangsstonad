@Library('deploy')
import deploy

def deployLib = new deploy()

node {
    def commitHash, commitHashShort, commitUrl, currentVersion
    def project = "navikt"
    def repo = "p2-selvbetjening-frontend"
    def committer, committerEmail, changelog, pom, releaseVersion, nextVersion // metadata
    def appConfig = "nais.yaml"
    def dockerRepo = "docker.adeo.no:5000"
    def branch = "master"
    def groupId = "nais"
    def environment = 't1'
    def zone = 'sbs'
    def namespace = 'default'

    stage("Checkout") {
        cleanWs()
        withEnv(['HTTPS_PROXY=http://webproxy-utvikler.nav.no:8088']) {
            sh(script: "git clone https://github.com/${project}/${repo}.git .")
        }
        commitHash = sh(script: 'git rev-parse HEAD', returnStdout: true).trim()
        commitHashShort = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
        commitUrl = "https://github.com/${project}/${repo}/commit/${commitHash}"
        committer = sh(script: 'git log -1 --pretty=format:"%an"', returnStdout: true).trim()
        committerEmail = sh(script: 'git log -1 --pretty=format:"%ae"', returnStdout: true).trim()
        changelog = sh(script: 'git log `git describe --tags --abbrev=0`..HEAD --oneline', returnStdout: true)
        // slackSend([
        //         color: 'good',
        //         message: "Build <${env.BUILD_URL}|#${env.BUILD_NUMBER}> (<${commitUrl}|${commitHashShort}>) of ${project}/${repo}@master by ${committer} passed  (${changelog})"
        // ])
    }

    stage("Initialize") {
        releaseVersion = "${env.major_version}.${env.BUILD_NUMBER}-${commitHash}"
        echo "release version: ${releaseVersion}"
    }

    stage("Build, test and install artifact") {
        withEnv(['HTTPS_PROXY=http://webproxy-utvikler.nav.no:8088']) {
            sh "npm install"
            sh "npm run test"
            sh "npm run build"
        }
    }

    stage("Release") {
        sh "docker build --build-arg version=${releaseVersion} --build-arg app_name=${repo} -t ${dockerRepo}/${repo}:${releaseVersion} ."
    }
    
    stage("Publish artifact") {
        sh "docker push ${dockerRepo}/${repo}:${releaseVersion}"
    }

    stage("publish yaml") {
        withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'nexusUser', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD']]) {
            sh "curl -s -F r=m2internal -F hasPom=false -F e=yaml -F g=${groupId} -F a=${repo} -F v=${releaseVersion} -F p=yaml -F file=@${appConfig} -u ${env.USERNAME}:${env.PASSWORD} http://maven.adeo.no/nexus/service/local/artifact/maven/content"
        }
    }
    
    stage('Deploy to t') {
        callback = "${env.BUILD_URL}input/Deploy/"
        deployLib.testCmd(releaseVersion)
        deployLib.testCmd(committer)
        def deploy = deployLib.deployNaisApp(repo, releaseVersion, environment, zone, namespace, callback, committer).key
        echo "Check status here:  https://jira.adeo.no/browse/${deploy}"
    }
}