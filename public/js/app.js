/* global $, angular */
angular.module('dragApp', [])
.controller('dragCtrl', function ($scope, $http) {
  $scope.drag = []
  $scope.addDrag = function (day) {
    var countOfDrag = $scope.drag.length
    $scope.drag.push({days: day, counts: countOfDrag, css: {top: 200, left: 250, position: 'absolute'}})
  }
  $scope.dragCir = function (index) {
    $scope.drag[index].css = $('#' + index).position()
  }
  $scope.init = function () {
    $scope.drag.forEach(function (item) {
      console.log(item)
      $('#' + item.counts).draggable()
      $('#' + item.counts).css(item.css)
    })
  }
  $scope.addDragCustom = function () {
    $('#modal1').openModal()
  }
  $scope.customDay = function (date) {
    var countOfDrag = $scope.drag.length
    var now = new Date()
    var datePick = new Date(date)
    var datePicked = datePick.getDate() + (datePick.getMonth() * 30)
    var dateNow = now.getDate() + (now.getMonth() * 30)
    $scope.drag.push({days: datePicked - dateNow, counts: countOfDrag, css: {top: 200, left: 250, position: 'absolute'}})
  }

  //  move from remask controller
  $scope.flipStatus = false
  $scope.click = function () {
    console.log('Snapshot!')
    $http.get('/click').success(function (response) {
      $scope.data = response
      console.log(response)
      setTimeout(function () {
        window.location = 'index.html'
      }, 1500)
    }).error(function (data, status, headers, config) {
      console.log('error')
    })
  }
  $scope.flip = function () {
    if ($scope.flipStatus === false) {
      $scope.flipStatus = true
      console.log($scope.flipStatus)
    } else {
      $scope.flipStatus = false
      console.log($scope.flipStatus)
    }
    console.log('flip')
  }
})