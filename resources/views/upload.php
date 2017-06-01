<?php


// Include the SDK using the Composer autoloader

require realpath(base_path('vendor/autoload.php'));



$s3 = new Aws\S3\S3Client([
    'version' => '2006-03-01',
    'region'  => 'ap-southeast-2'
]);


$bucket = 'wirent';

$key = 'b4.jpg';
//echo "Creating a new object with key {$key}\n";
$s3->putObject([
    'Bucket' => $bucket,
    'Key'    => $key,
    'SourceFile'   => 'D:\\img\b4.jpg',
    'ACL'=>'public-read'
]);
