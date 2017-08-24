/**
 * @Date:   2017-08-22T10:58:54+10:00
 * @Email:  yiensuen@gmail.com
 * @Last modified time: 2017-08-24T15:02:35+10:00
 */

/**/
app.controller('FileUploadCtrl', ['$scope', 'S3UploadService', function ($scope, S3UploadService) {

     $scope.uploadFiles = function (files) {
         $scope.Files = files;
         console.log(files);
         if (files && files.length > 0) {
             angular.forEach($scope.Files, function (file, key) {
                 S3UploadService.Upload(file).then(function (result) {
                     // Mark as success
                     file.Success = true;
                 }, function (error) {
                     // Mark the error
                     $scope.Error = error;
                 }, function (progress) {
                     // Write the progress as a percentage
                     file.Progress = (progress.loaded / progress.total) * 100;
                 });
             });
         }
     };
 }]);
