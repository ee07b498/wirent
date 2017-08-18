<?php
# @Date:   2017-07-12T15:18:25+10:00
# @Email:  yiensuen@gmail.com
# @Last modified time: 2017-08-18T16:02:43+10:00




/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

/*
 * index page
 */
$app->get('/',function () {
	return view('index');
});
$app->get('/admin',function () {
	return view('admin');
});

/*
 *  view group:customer|landlord|thirdparty|staff
 */
$app->group(['prefix' => '/tpl/page'], function () use ($app){
	$app->get('/app',function () {
		return view('page.app');
	});
	$app->get('/signup',function () {
		return view('page.signup');
	});
	$app->get('/adminlogin',function () {
		return view('page.login');
	});
	$app->get('/login',function () {
		return view('page.login');
	});
	$app->get('/profile',function () {
		return view('page.profile');
	});
	$app->get('/shortlist',function () {
		return view('page.shortlist');
	});
	$app->get('/admin',function () {
		return view('page.admin');
	});
});

/*
 *  route controller
 */
//customer entrance
$app->group(['prefix' => 'customer'], function () use ($app){

	$app->post('/login',			'CustomerController@login');
	$app->post('/register',			'CustomerController@register');
	$app->post('/logout',			'CustomerController@logout');
	$app->get('/hotrent', 			'CustomerController@hotrent_check');
	$app->post('/filt/entire/count', 		'CustomerController@filt_entire_count');
	$app->post('/filt/entire', 		'CustomerController@filt_entire');
	$app->post('/filt/entire/tenant',['middleware' => 'id','uses'=>'CustomerController@filt_entire_by_tenant']);
	$app->post('/filt/share/count', 		'CustomerController@filt_share_count');
	$app->post('/filt/share', 		'CustomerController@filt_share');
	$app->post('/filt/share/tenant', ['middleware' => 'id','uses'=>'CustomerController@filt_share_by_tenant']);
	$app->post('/filt_address', 	'CustomerController@filt_address');
	$app->post('/filt_thirdparty', 	'CustomerController@filt_thirdparty');
	$app->get('/profile', 			['middleware' => 'cus','uses'=>'CustomerController@profile_check']);
	$app->post('/profile/update',	['middleware' => 'cus','uses'=>'CustomerController@profile_update']);
	$app->post('/bill',				['middleware' => 'cus','uses'=>'CustomerController@bill_check']);
	$app->post('/maintenance',		['middleware' => 'cus','uses'=>'CustomerController@maintenance_check']);
	$app->post('/maintenance/apply',	['middleware' => 'cus','uses'=>'CustomerController@maintenance_apply']);
	$app->post('/rent',				['middleware' => 'cus','uses'=>'CustomerController@rent_check']);
	$app->post('/service',			['middleware' => 'cus','uses'=>'CustomerController@service_check']);
	$app->post('/shortlist',			['middleware' => 'cus','uses'=>'CustomerController@shortlist_check']);
	$app->post('/shortlist/delete',	['middleware' => 'cus','uses'=>'CustomerController@shortlist_delete']);
	$app->post('/shortlist/insert',	['middleware' => 'cus','uses'=>'CustomerController@shortlist_insert']);

	$app->get('/test', 			'CustomerController@multi_suburb_surrounding');

	$app->group(['prefix' => 'msg'], function () use ($app){
		$app->post('/notice',		['middleware' => 'cus','uses'=>'CustomerController@msg_notice']);
		$app->get('/confirm',		['middleware' => 'cus','uses'=>'CustomerController@msg_confirm']);
		$app->post('/received',		['middleware' => 'cus','uses'=>'CustomerController@msg_received']);	//msg_receive is php function
		$app->post('/write',			'CustomerController@msg_write');
	});
});
//landlord entrance
$app->group(['prefix' => 'landlord'], function () use ($app){

	$app->post('/login',			'LandlordController@login');
	$app->post('/register',			'LandlordController@register');
	$app->get('/logout',			'LandlordController@logout');

	$app->get('/profile', 			['middleware' => 'lord','uses'=>'LandlordController@profile_check']);
	$app->post('/profile/update',	['middleware' => 'lord','uses'=>'LandlordController@profile_update']);

	$app->group(['prefix'=>'pm'], function () use ($app){
		$app->get('/balance',		['middleware' => 'lord','uses'=>'LandlordController@balance']);
		$app->get('/check',			['middleware' => 'lord','uses'=>'LandlordController@check']);
		$app->get('/stat_on',		['middleware' => 'lord','uses'=>'LandlordController@stat_on']);
		$app->get('/stat_pre',		['middleware' => 'lord','uses'=>'LandlordController@stat_pre']);
		$app->get('/insert',		['middleware' => 'lord','uses'=>'LandlordController@insert']);
		$app->get('/update',		['middleware' => 'lord','uses'=>'LandlordController@update']);
	});

	$app->group(['prefix' => 'msg'], function () use ($app){
		$app->get('/notice',		['middleware' => 'lord','uses'=>'LandlordController@msg_notice']);
		$app->get('/confirm',		['middleware' => 'lord','uses'=>'LandlordController@msg_confirm']);
		$app->get('/received',		['middleware' => 'lord','uses'=>'LandlordController@msg_received']);	//msg_receive is php function
		$app->post('/write',			['middleware' => 'lord','uses'=>'LandlordController@msg_write']);
	});
});
//thirdparty entrance

//staff entrance: cms, move to another framework future with different .env config to db
		$app->group(['prefix' => 'staff'], function () use ($app){
		$app->post('/login',			'StaffController@login');
		$app->get('/profile', 			['uses'=>'StaffController@profile_check']);
		$app->get('/rankname', 			['uses'=>'StaffController@admin_rankrights_check_rankname']);
		$app->get('/rightname', 			['uses'=>'StaffController@admin_rankrights_check_rightname']);
		$app->post('/rankright', 			['uses'=>'StaffController@admin_rankrights_check_rankright']);
		$app->post('/add_rankname', 			['uses'=>'StaffController@admin_rankrights_add_rankname']);
		$app->post('/delete_rankname', 			['uses'=>'StaffController@admin_rankrights_delete_rankname']);
		$app->post('/add_rankrights', 			['uses'=>'StaffController@admin_rankrights_add_rankrights']);
		$app->post('/delete_rankrights', 			['uses'=>'StaffController@admin_rankrights_delete_rankrights']);
		$app->post('/staff_register', 			['uses'=>'StaffController@admin_staff_register']);
		$app->post('/staff_filt_check', 			['uses'=>'StaffController@admin_staff_filt_check']);
		$app->post('/admin_staff_update', 			['uses'=>'StaffController@admin_staff_update']);
		$app->post('/admin_landlord_check', 			['uses'=>'StaffController@admin_landlord_check']);
		$app->post('/admin_landlord_insert', 			['uses'=>'StaffController@admin_landlord_insert']);
		$app->post('/admin_landlord_update', 			['uses'=>'StaffController@admin_landlord_update']);
		$app->post('/admin_landlord_er_check', 			['uses'=>'StaffController@admin_landlord_er_check']);
		$app->post('/admin_landlord_er_insert', 			['uses'=>'StaffController@admin_landlord_er_insert']);
		$app->post('/admin_landlord_er_update', 			['uses'=>'StaffController@admin_landlord_er_update']);
		$app->post('/admin_landlord_er_delete', 			['uses'=>'StaffController@admin_landlord_er_delete']);
		$app->post('/admin_er_check', 			['uses'=>'StaffController@admin_er_check']);
		$app->post('/admin_sr_check', 			['uses'=>'StaffController@admin_sr_check']);
		$app->post('/admin_sr_list_check', 			['uses'=>'StaffController@admin_sr_list_check']);
		// customer start
		$app->post('/admin_customer_check', 			['uses'=>'StaffController@admin_customer_check']);
		$app->post('/admin_customer_insert', 			['uses'=>'StaffController@admin_customer_insert']);

		$app->post('/admin_customer_update', 			['uses'=>'StaffController@admin_customer_update']);
		$app->post('/admin_customer_delete', 			['uses'=>'StaffController@admin_customer_delete']);
		$app->post('/admin_customer_er_check', 			['uses'=>'StaffController@admin_customer_er_check']);
		//find landlord by ER_ID
		$app->post('/admin_er_landlord_check', 			['uses'=>'StaffController@admin_er_landlord_check']);
		//bill check
		$app->post('/admin_bill_check', 			['uses'=>'StaffController@admin_bill_check']);
		//bill insert
		$app->post('/admin_er_bill_insert', 			['uses'=>'StaffController@admin_er_bill_insert']);
		$app->post('/admin_customer_contract_check', 			['uses'=>'StaffController@admin_customer_contract_check']);
		//service check
		$app->post('/admin_customer_service_check', 			['uses'=>'StaffController@admin_customer_service_check']);
		$app->post('/admin_customer_maintenance_check', 			['uses'=>'StaffController@admin_customer_maintenance_check']);
		//msg check
		$app->get('/msg_direct_check', 			['uses'=>'StaffController@msg_direct_check']);
		$app->post('/msg_received', 			['uses'=>'StaffController@msg_received']);
		$app->post('/msg_write', 			['uses'=>'StaffController@msg_write']);

		$app->get('/admin_thirdparty_promotion_check', 			['uses'=>'StaffController@admin_thirdparty_promotion_check']);
});
