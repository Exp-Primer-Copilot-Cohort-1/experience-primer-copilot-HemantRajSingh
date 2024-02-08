function skillsMember() {
  return {
    name: 'skillsMember',
    restrict: 'E',
    scope: {
      member: '='
    },
    templateUrl: 'member.html'
  };
}