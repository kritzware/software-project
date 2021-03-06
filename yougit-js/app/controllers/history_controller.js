angular.module('app.history_controller', []).controller('historyCtrl', function($scope, $state, repository, $rootScope) {

  $rootScope.navActive = 'history'
  $scope.commits = []
  $scope.loading = false

  const commits_to_show = 200

  init()
  .then(() => {
    $scope.loading = false
    $scope.$apply()
  })

  $scope.showDiff = (commit) => {
    const commitId = commit.id().toString()
    $state.go('repository.commit', {
      id: commitId
    })
  }

  function init() {
    $scope.loading = true
    return repository.git.getCommits(commits_to_show)
    .then((commits) => {
      $scope.commits = commits
      commits.forEach(commit => {
        commit.date = moment(commit.date()).fromNow()
        commit.msg = commit.message()
      })
    })
  }

})