@Library('deploy')
import deploy

def deployLib = new deploy()

node {
    def commitHash, commitHashShort, commitUrl
    def project = "navikt"
    def repo = "engangsstonad"
    def app = "engangsstonad"
    def committer, committerEmail, changelog, releaseVersion
    def appConfig = "nais.yaml"
    def dockerRepo = "repo.adeo.no:5443"
    def branch = "master"
    def groupId = "nais"
    def environment = 't1'
    def zone = 'sbs'
    def namespace = 'default'

    stage("Checkout") {
        cleanWs()
        withCredentials([string(credentialsId: 'OAUTH_TOKEN', variable: 'token')]) {
            withEnv(['HTTPS_PROXY=http://webproxy-utvikler.nav.no:8088']) {
                sh(script: "git clone https://${token}:x-oauth-basic@github.com/${project}/${repo}.git -b ${branch} .")
            }
        }
        commitHash = sh(script: 'git rev-parse HEAD', returnStdout: true).trim()
        commitHashShort = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
        commitUrl = "https://github.com/${project}/${repo}/commit/${commitHash}"
        committer = sh(script: 'git log -1 --pretty=format:"%an"', returnStdout: true).trim()
        committerEmail = sh(script: 'git log -1 --pretty=format:"%ae"', returnStdout: true).trim()
        changelog = sh(script: 'git log `git describe --tags --abbrev=0`..HEAD --oneline', returnStdout: true)

        releaseVersion = "${env.major_version}.${env.BUILD_NUMBER}-${commitHashShort}"
        echo "release version: ${releaseVersion}"
    }

    stage("Build & publish") {
        withEnv(['HTTPS_PROXY=http://webproxy-utvikler.nav.no:8088', 'HTTP_PROXY=http://webproxy-utvikler.nav.no:8088', 'NO_PROXY=localhost,127.0.0.1', 'NODE_TLS_REJECT_UNAUTHORIZED=0', 'PORT=8081']) {
            sh "npm install"
            //sh "npm run test"
            sh "npm run build"
            sh "npm run cypress"
        }

        sh "docker build --build-arg version=${releaseVersion} --build-arg app_name=${app} -t ${dockerRepo}/${app}:${releaseVersion} ."

        withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'nexusUser', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD']]) {
            sh "docker login -u ${env.USERNAME} -p ${env.PASSWORD} ${dockerRepo} && docker push ${dockerRepo}/${app}:${releaseVersion}"
            sh "curl --fail -v -u ${env.USERNAME}:${env.PASSWORD} --upload-file ${appConfig} https://repo.adeo.no/repository/raw/${groupId}/${app}/${releaseVersion}/nais.yaml"
        }
    }
    
    stage('Deploy to preprod') {
        callback = "${env.BUILD_URL}input/Deploy/"
        def deploy = deployLib.deployNaisApp(app, releaseVersion, environment, zone, namespace, callback, committer).key
        try {
            timeout(time: 15, unit: 'MINUTES') {
                input id: 'deploy', message: "Check status here:  https://jira.adeo.no/browse/${deploy}"
            }
        } catch (Exception e) {
            throw new Exception("Deploy feilet :( \n Se https://jira.adeo.no/browse/" + deploy + " for detaljer", e)

        }
    }

    stage("Tag") {
        // TODO: Tag only releases that go to production
        withEnv(['HTTPS_PROXY=http://webproxy-utvikler.nav.no:8088']) {
            withCredentials([string(credentialsId: 'OAUTH_TOKEN', variable: 'token')]) {
                sh ("git tag -a ${releaseVersion} -m ${releaseVersion}")
                sh ("git push https://${token}:x-oauth-basic@github.com/${project}/${repo}.git --tags")
            }
        }
    }
}
