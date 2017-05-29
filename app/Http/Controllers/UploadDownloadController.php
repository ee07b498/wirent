<?php
// Include the SDK using the Composer autoloader

namespace App\Http\Controllers;
use Illuminate\http\Request;
use Aws\S3\S3Client;

class UploadDownloadController extends Controller
{
	public function upload(Request $request){
		$s3 = new S3Client([
		    'version' => '2006-03-01',
		    'region'  => 'ap-southeast-2'
		]);
		
		
		$bucket = 'wirent';
		
		$key = $request->input('key');
		$SourceFile = $request->input('SourceFile');
		$acl = $request->input('acl');
		//echo "Creating a new object with key {$key}\n";
		$s3->putObject([
		    'Bucket' => $bucket,
		    'Key'    => $key,
		    'SourceFile'   => $SourceFile,
		    'ACL' =>	$acl
		]);
	}
}