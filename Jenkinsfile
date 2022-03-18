pipeline {
  agent none

  options {
    timeout(time: 30, unit: "MINUTES")
    buildDiscarder(
      logRotator(
        numToKeepStr:   env.BRANCH_NAME ==~ /master/ ? '15' :
                        env.BRANCH_NAME ==~ /develop/ ?  '15' : '5'
      )
    )
  }

  environment {
    AWS_REGION = "ap-northeast-1"
    PROJECT = "rses"
    COMPONENT = "api"
    BUCKET = "rses"
  }

  stages {
    stage('Deploy qa') {
      agent {
        docker {
          label 'ec2-fleet'
          image '977934108529.dkr.ecr.ap-northeast-1.amazonaws.com/angular:12x'
          alwaysPull true
        }
      }

      when {
        allOf {
          branch 'develop';
          expression { sh(returnStdout: true, script: 'git tag --sort=-creatordate --points-at ${GIT_COMMIT} | head -n 1 || :').trim() =~ /(qa\/)/ };
        }
      }

      environment {
        ENV = "qa"
      }

      steps {
        sh '''
          aws --region=${AWS_REGION} deploy push --application-name ${PROJECT}-${COMPONENT}-${ENV} \
                                                 --s3-location s3://${BUCKET}-${ENV}/codedeploy/${GIT_COMMIT}.zip
          aws --region=${AWS_REGION} deploy create-deployment --application-name ${PROJECT}-${COMPONENT}-${ENV} \
                                                 --s3-location bucket=${BUCKET}-${ENV},key=codedeploy/${GIT_COMMIT}.zip,bundleType=zip \
                                                 --deployment-group-name ${PROJECT}-${COMPONENT}-${ENV}
        '''
      }

      post {
        always {
          cleanWs(
            deleteDirs: true
          )
        }
      }
    }
  }
}