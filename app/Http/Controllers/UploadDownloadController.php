<?php


namespace App\Http\Controllers;
// Include the SDK using the Composer autoloader
use Illuminate\http\Request;
use Aws\S3\S3Client;
require realpath(base_path('vendor/autoload.php'));

class UploadDownloadController extends Controller
{
	public function upload(Request $request){
		$s3 = new S3Client([
		    'version' => '2006-03-01',
		    'region'  => 'ap-southeast-2',
		    'credentials' => [
		    	'key'    => 'AKIAI5VNHGFA5KY4H6IQ',
        		'secret' => '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',
		    ]
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