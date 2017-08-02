<?php
# @Date:   2017-07-03T22:25:24+10:00
# @Email:  yiensuen@gmail.com
# @Last modified time: 2017-07-28T11:31:41+10:00



namespace App\Http\Controllers;
use Illuminate\http\Request;
use Illuminate\Support\Facades\DB;

/**
 * staff may has rights to delete inval items from db
 * but will add records to stafflogbook at the same time
 * mainly to record the timestamp
 * for seeking the deleted items in db backup
 *
 * form model generated by angularjs, msg text model generated by stafflogbook
 */
class StaffController extends Controller
{
	/**
	 * self admin:login|logout|profile_check|update| logbook
	 */
	public function login(Request $request) {
        $user_name = $request->input('user_name');
		$password = $request->input('password');
        $getPassword = DB::select("call login_Staff('{$user_name}')");
		if(password_verify($password,$getPassword[0]->SPassWord))
		{
			$staffInfo = DB::select("call check_StaffInfo_by_SUserName('{$user_name}')");
			foreach($staffInfo[0] as $key=>$value)
			{
				app('session')->put([$key=>$value]); //语法验证器问题无法执行json验证
			}
			$staffRights = DB::select("call check_rights_by_SRank({$staffInfo[0]->SRank})");
			app('session')->put(['rights'=>$staffRights]);
			app('session')->put('staff_login_status',1);
			return 1;
		}
        return 0;
	}

	public function logout() {
		app('session')->flush();
		return 0;
	}

	public function profile_check(Request $request) {
		return app('session')->all();
	}

	public function profile_update(Request $request) {
		//声明及获取参数
		$StaffID = $request->input('StaffID');
		if ($request->input('SPassWord')!=''){$SPassWord=password_hash($request->input('SPassWord'), PASSWORD_DEFAULT);}
		else {$SPassWord='';}
		$SRank = $request->input('SRank');											//不允许从个人资料更新中更新，只能在员工管理中更新
		$SLoginStat = $request->input('SLoginStat');
		$SName = $request->input('SName');
		$SPhone = $request->input('SPhone');
		$SEmail = $request->input('SEmail');
		$SWorkStat = $request->input('SWorkStat');									//不允许从个人资料更新中更新，只能在员工管理中更新
		$SCurrLoc = $request->input('SCurrLoc');										//不允许从个人资料更新中更新，只能在员工管理中更新
		$SComment = $request->input('SComment');

		$proc_Name = 'proc_Update_StaffInfo';
		$sql = "call $proc_Name(
									'{$StaffID}'，'{$SPassWord}'，'{$SRank}'，'{$SLoginStat}'，'{$SName}'，'{$SPhone}',
									'{$SEmail}'，'{$SWorkStat}'，'{$SCurrLoc}'，'{$SComment}'
								)";
		$result = DB::update($sql);
		return json_encode($result) ; //0:失败或无更新；1：成功
	}

	public function logbook(Request $request) {
		$StaffID = $request->input('StaffID');
		$SLType = $request->input('SLType');
		$SLDetail = $request->input('SLDetail');
		$SLTime = date("Y-m-d h:i:sa");
		$proc = 'proc_Insert_StaffLogbook';
		$sql = "call $proc({$StaffID},'{$SLType}','{$SLDetail}','{$SLTime}')";
		$result = DB::insert($sql);
		return json_encode($result);
	}
	/**
	 * admin staff
	 * register|update
	 */
	public function admin_staff_register(Request $request) {
		$user_name=$request->input('user_name');
		$password=password_hash($request->input('password'), PASSWORD_DEFAULT);
		$rankname = $request->input('rankname');
		$proc_Name = 'proc_Insert_StaffInfo';
		$sql = "call $proc_Name('{$user_name}','{$password}','{$rankname}')";
		$result = DB::insert($sql);
		return json_encode($result) ; //0:失败或无添加；1：成功
	}

	public function admin_staff_update(Request $request) {
		//声明及获取参数
		$StaffID = $request->input('StaffID');
		if ($request->input('SPassWord')!=''){$SPassWord=password_hash($request->input('SPassWord'), PASSWORD_DEFAULT);}
		else {$SPassWord='';}
		$SRank = $request->input('SRank');
		$SLoginStat = $request->input('SLoginStat');
		$SName = $request->input('SName');
		$SPhone = $request->input('SPhone');
		$SEmail = $request->input('SEmail');
		$SWorkStat = $request->input('SWorkStat');
		$SCurrLoc = $request->input('SCurrLoc');
		$SComment = $request->input('SComment');

		//staff_info表更新用户信息
		$proc_Name = 'proc_Update_StaffInfo';
		$sql = "call $proc_Name(
									'{$StaffID}'，'{$SPassWord}'，'{$SRank}'，'{$SLoginStat}'，'{$SName}'，'{$SPhone}',
									'{$SEmail}'，'{$SWorkStat}'，'{$SCurrLoc}'，'{$SComment}'
								)";
		$result = DB::update($sql);
		return json_encode($result) ; //0:失败或无更新；1：成功
	}

	/**
	 *admin rank_rights
	 */
 
	 
	public function admin_rankrights_add_rankname(Request $request) { //1
		$SRankName = $request->input('SRankName');	//e.g. '物业管理员';
		$proc_Name = 'proc_Insert_RankName';
		$sql = "call $proc_Name('{$SRankName}')";
		$result = DB::insert($sql);
		return json_encode($result) ; 							//0:失败或无添加；1：成功
	}

	public function admin_rankrights_delete_rankname(Request $request) {
		$SRankName = $request->input('SRankName');
		$proc_Name = 'proc_Delete_RankName';
		$sql = "call $proc_Name('{$SRankName}')";
		$result = DB::delete($sql);
		return json_encode($result) ;
	}

	public function admin_rankrights_add_rankrights(Request $request) {//2
		$SRankName = $request->input('SRankName');
		$Right_Name = $request->input('Right_Name');
		$proc_Name = 'proc_Insert_RankRight';
		$sql = "call $proc_Name('{$SRankName}','{$Right_Name}')";
		$result = DB::insert($sql);
		return json_encode($result) ;
	}

	public function admin_rankrights_delete_rankrights(Request $request) {
		$SRankName = $request->input('SRankName');
		$Right_Name = $request->input('Right_Name');
		$proc_Name = 'proc_Delete_RankRight';
		$sql = "call $proc_Name('{$SRankName}','{$Right_Name}')";
		$result = DB::delete($sql);
		return json_encode($result) ;
	}

	/**
	 * admin landlord|properties info
	 * manage properties info
	 */
	public function admin_landlord_check(Request $request) {
		$str = $request->input('str');
		$proc = 'check_LandlordInfo_by_LLNameorLLEmail';
		$sql = "call $proc('{$str}')";
		$result = DB::select($sql);
		return $result;
	}

	public function admin_landlord_insert(Request $request) {
		$LLName = $request->input('LLName');
		$LLPhone = $request->input('LLPhone');
		$LLCellphone = $request->input('LLCellphone');
		$LLEmail = $request->input('LLEmail');
		$LLPassword = password_hash($request->input('LLPassword'),PASSWORD_DEFAULT);
		$proc_Name = 'proc_Insert_LandlordInfo';
		$result = DB::insert("call $proc_Name('{$LLName}','{$LLPassword}','{$LLPhone}','{$LLCellphone}','{$LLEmail}')");
		return json_encode($result);
	}

	public function admin_landlord_update(Request $request) {
		$LLID=$request->input('LLID');
		$LLName=$request->input('LLName');
		if ($request->input('LLPassword')!=''){$LLPassword=password_hash($request->input('LLPassword'), PASSWORD_DEFAULT);}
		else $LLPassword='';
		$LLPhone=$request->input('LLPhone');
		$LLCellphone =$request->input('LLCellphone');
		$LLEmail=$request->input('LLEmail');
		$proc_Name = 'proc_Update_LandlordInfo';
		$sql = "call $proc_Name(
									'{$LLID}'，'{$LLName}'，'{$LLPassword}'，'{$LLPhone}'，'{$LLCellphone}'，'{$LLEmail}'
								)";
		$result = DB::update($sql);
		return json_encode($result) ; //0:失败或无更新；1：成功
	}
	//requirements to define inval landlord
	public function admin_landlord_delete(Request $request) {

	}

	public function admin_landlord_er_check(Request $request) {
		$LLID = $request->input('LLID');
		$proc = 'check_EntireRentInfo_by_LLID';
		$sql = "call $proc($LLID)";
		$result = DB::select($sql);
		return $result;
	}

	public function admin_landlord_er_insert(Request $request) {
		//赋值参数
		$ER_No = $request->input('ER_No');
		$ER_St = $request->input('ER_St');
		$ER_Suburb=$request->input('ER_Suburb');
		$ER_Region = $request->input('ER_Region');
		$ER_Area = $request->input('ER_Area');
		$ER_BedRoom = $request->input('ER_BedRoom');
		$ER_BathRoom = $request->input('ER_BathRoom');
		$ER_Kitchen = $request->input('ER_Kitchen');
		$ER_Dining = $request->input('ER_Dining');
		$ER_Parking = $request->input('ER_Parking');
		$ER_Price = $request->input('ER_Price');
		$ER_AvailableDate = $request->input('ER_AvailableDate');
		$LLID = $request->input('LLID');
		$ER_Description = $request->input('ER_Description');
		$ER_Type = $request->input('ER_Type');
		$ER_Feature = $request->input('ER_Feature');
		$ER_Stat = 'Pending';

		$proc_check = 'check_EntireRentInfo_by_ERAddress';
		$check_sql = "call $proc_check('{$ER_No}','{$ER_St}','{$ER_Suburb}','{$ER_Region}')";
		$check_result = DB::select($check_sql);
		if ($check_result==null)
		{
			$proc_name = 'proc_Insert_ERInfo';
			$sql = "call $proc_name(
								'{$ER_No}','{$ER_St}','{$ER_Suburb}','{$ER_Region}',
								{$ER_Area},{$ER_BedRoom},{$ER_BathRoom},{$ER_Kitchen},
								{$ER_Dining},{$ER_Parking},{$ER_Price},'{$ER_AvailableDate}',
								{$LLID},'{$ER_Description}','{$ER_Type}','{$ER_Feature}',
								'{$ER_Stat}'
								)";
			$result = DB::insert($sql);
			return json_encode($result);
		}
		else{return false;} 		//该地址已注册
	}

	public function admin_landlord_er_update(Request $request) {
		$ER_ID = $request->input('ER_ID');
		$ER_No = $request->input('ER_No');
		$ER_St = $request->input('ER_St');
		$ER_Suburb=$request->input('ER_Suburb');
		$ER_Region = $request->input('ER_Region');
		$ER_Area = $request->input('ER_Area');
		$ER_BedRoom = $request->input('ER_BedRoom');
		$ER_BathRoom = $request->input('ER_BathRoom');
		$ER_Kitchen = $request->input('ER_Kitchen');
		$ER_Dining = $request->input('ER_Dining');
		$ER_Parking = $request->input('ER_Parking');
		$ER_Price = $request->input('ER_Price');
		$ER_Stat = $request->input('ER_Stat');
		$ER_AvailableDate = $request->input('ER_AvailableDate');
		$LLID = $request->input('LLID');
		$ER_InspRep = $request->input('ER_InspRep');
		$ER_Description = $request->input('ER_Description');
		$ER_Type = $request->input('ER_Type');
		$ER_Feature = $request->input('ER_Feature');

		$proc_name = 'proc_Update_ERInfo';
		$sql = "call $proc_name(
							'{$ER_No}','{$ER_St}','{$ER_Suburb}','{$ER_Region}',{$postcode},
							{$ER_Area},{$ER_BedRoom},{$ER_BathRoom},{$ER_Kitchen},
							{$ER_Dining},{$ER_Parking},{$ER_Price},'{$ER_Stat}',
							'{$ER_AvailableDate}',{$LLID},'{$ER_InspRep}',
							'{$ER_Description}','{$ER_Type}','{$ER_Feature}'
							)";
		$result = DB::update($sql);
		return json_encode($result);
	}

	public function admin_landlord_er_delete(Request $request) {
		$ER_ID = $request->input('ER_ID');
		$proc = 'proc_Delete_ER';
		$sql = 'call $proc($ER_ID)';
		$result = DB::delete($sql);
		return json_encode($result);
	}

	/**
	 * admin properties
	 * manage properties service such as bill|insp|check via properties' id
	 */
	//search er by partial addr like google map
	public function admin_er_check(Request $request) {
		$inputStr = $request->input('inputStr');
		$proc = 'check_EntireRentInfo_by_partialAddr';
		$sql = "call $proc('{$inputStr}')";
		$result = DB::select($sql);
		return $result;
	}

	public function admin_er_landlord_check(Request $request) {
		$ER_ID = $request->input('ER_ID');
		$proc = 'check_LandlordInfo_by_ERID';
		$sql = 'call $proc($ER_ID)';
		$result = DB::select($sql);
		return $result;
	}
	//after checking basic info of a property, book a inspection with landlord
	//by recording in stafflogbook, and then msg to landlord via 'msg'
	public function admin_er_insp_booking(Request $request) {
		$this->logbook($request);
	}
	//share room info
	public function admin_sr_check(Request $request) {
		$ER_ID = $request->input('ER_ID');
		$proc = 'check_SharingRoomInfo_by_ERID';
		$sql = 'call $proc($ER_ID)';
		$result = DB::select($sql);
		return $result;
	}

	public function admin_sr_insert(Request $request) {
		$ER_ID = $request->input('ER_ID');
		$SRArea= $request->input('SRArea');
		$SRStat= $request->input('SRStat');
		$SRAvailableDate= $request->input('SRAvailableDate');
		$SRPrice= $request->input('SRPrice');
		$SRName= $request->input('SRName');
		$proc = 'proc_Insert_SRInfo';
		$sql = "call $proc({$ER_ID},{$SRArea},'{$SRStat}','{$SRAvailableDate}',{$SRPrice},'{$SRName}')";
		$result = DB::insert($sql);
		return json_encode($result);
	}

	public function admin_sr_update(Request $request) {
		$SRID = $request->input('SRID');
		$ER_ID = $request->input('ER_ID');
		$SRArea= $request->input('SRArea');
		$SRStat= $request->input('SRStat');
		$SRAvailableDate= $request->input('SRAvailableDate');
		$SRPrice= $request->input('SRPrice');
		$SRName= $request->input('SRName');
		$proc = 'proc_Update_SRInfo';
		$sql = "call $proc({$SRID},{$ER_ID},{$SRArea},'{$SRStat}','{$SRAvailableDate}',{$SRPrice},'{$SRName}')";
		$result = DB::update($sql);
		return json_encode($result);
	}
	//requirements to inval sr
	public function admin_sr_delete(Request $request) {

	}

	//picLibrary
	//upload and view pic only after insp
	//after pic file upload, pic relative path record into|delete from db
	public function admin_pic_insert(Request $request) {
		$ER_ID= $request->input('ER_ID');
		$SRID= $request->input('SRID');
		$PicFile= $request->input('PicFile');
		$PicDescription= $request->input('PicDescription');
		$proc = 'proc_Insert_PicLibrary';
		$sql = "call $proc({$ER_ID},{$SRID},'{$PicFile}','{$PicDescription}')";
		$result = DB::insert($sql);
		return json_encode($result);
	}
	public function admin_pic_delete(Request $request) {
		$PLID = $request->input('PLID');
		$proc = 'proc_Delete_PicLibrary';
		$sql = 'call $proc({$PLID})';
		$result = DB::delete($sql);
		return json_encode($result);
	}
	// all income and expense of properties included in billLibrary table
	// staff has more options to filter bill but mainly with admin_er_check
	public function admin_er_bill_check(Request $request) {
		$this->admin_bill_check($request);
	}

	public function admin_er_bill_insert(Request $request) {
		$CID = $request->input('CID');
		$ER_ID = $request->input('ER_ID');
		$BillType = $request->input('BillType');
		$BillCopy = $request->input('BillCopy');
		$BillDate = $request->input('BillDate');
		$BillAmount = $request->input('BillAmount');
		$BillReceipt = $request->input('BillReceipt');
        $BillComment = $request->input('BillComment');

		$proc = 'proc_Insert_BillLibrary';
		$sql = "call $proc({$CID},{$ER_ID},'{$BillType}','{$BillCopy}','{$BillDate}',{$BillAmount},'{$BillReceipt}','{$BillComment}')";
		$result = DB::insert($sql);
		return json_encode($result);
	}

	public function admin_er_bill_update(Request $request) {
		$BLID = $request->input('BLID');
		$CID = $request->input('CID');
		$ER_ID = $request->input('ER_ID');
		$BillType = $request->input('BillType');
		$BillCopy = $request->input('BillCopy');
		$BillDate = $request->input('BillDate');
		$BillAmount = $request->input('BillAmount');
		$BillReceipt = $request->input('BillReceipt');
        $BillComment = $request->input('BillComment');

		$proc = 'proc_Update_BillLibrary';
		$sql = "call $proc({$BLID},{$CID},{$ER_ID},'{$BillType}','{$BillCopy}','{$BillDate}',{$BillAmount},'{$BillReceipt}','{$BillComment}')";
		$result = DB::insert($sql);
		return json_encode($result);
	}

	public function admin_er_bill_delete(Request $request) {
		$BLID = $request->input('BLID');
		$proc = 'proc_Delete_BillLibrary';
		$sql = 'call $proc({$BLID})';
		$result = DB::delete($sql);
		return json_encode($result);
	}
	//生成balance
	public function admin_er_balance(Request $request) {
		//math function to calculate monthly balance with certain BLtype bill or uncertain...
	}
	//定期查房
	public function admin_er_regularly_insp(Request $request) {

	}


	/**
	 * admin customer
	 */
	public function admin_customer_check(Request $request) { //模糊查询用户信息,数据库不限制检索条件最小字段长度，由前端限制
		$inputStr = $request->input('inputStr');
		$proc = 'check_CustomerInfo_fuzzy';
		$sql = "call $proc('{$inputStr}')";
		$result = DB::select($sql);
		return $result;
	}

	public function admin_customer_insert(Request $request) {
		$CEmail = $request->input('CEmail');
		$CPassword = password_hash($request->input('CPassword'),PASSWORD_DEFAULT);
		$status = "seeking";
		$today = date("Y-m-d");
		$proc_Name = 'proc_Insert_CustomerInfo';
		$result = DB::insert("call $proc_Name('','{$CPassword}','','{$CEmail}','{$status}','{$today}','1','0')");
		return json_encode($result);
	}

	public function admin_customer_update(Request $request) {
		$CID=$request->input('CID');  	//不允许用户修改
		$CName=$request->input('CName');
		if ($request->input('CPassword')!=''){$CPassword=password_hash($request->input('CPassword'), PASSWORD_DEFAULT);}
		else $CPassword='';
		$CPhone=$request->input('CPhone');
		$CEmail=$request->input('CEmail');
		$CCurrStat=$request->input('CCurrStat');
		$CLastContDate=$request->input('CLastContDate');
		$CIDType=$request->input('CIDType');
		$CIDProfile=$request->input('CIDProfile');
		$CIncomeProfile=$request->input('CIncomeProfile');
		$CSavingProfile=$request->input('CSavingProfile');
		$CPartenerID=$request->input('CPartenerID');
		$CSex=$request->input('CSex');
		$CAge=$request->input('CAge');
		$CWorking=$request->input('CWorking');
		$CPet=$request->input('CPet');
		$CSmoking=$request->input('CSmoking');
		$CPhoto=$request->input('CPhoto');
		$CBudget=$request->input('CBudget');

		$proc_Name = 'proc_Update_CustomerInfo';
		$sql = "call $proc_Name(
							{$CID},'{$CName}','{$CPassword}','{$CPhone}','{$CEmail}','{$CCurrStat}',
							'{$CLastContDate}','{$CIDType}','{$CIDProfile}','{$CIncomeProfile}','{$CSavingProfile}',{$CPartenerID},
							'{$CSex}',{$CAge},'{$CWorking}','{$CPet}','{$CSmoking}','{$CPhoto}',
							{$CBudget}
						);";
		$result = DB::update($sql);
		return json_encode($result); //0:失败或无更新；1：成功
	}
	//table has foreign key limitation so can only delete pending customer account
	//the account used to rent or has records such as shortlists in db need to join delete from db use another method
	public function admin_customer_delete(Request $request) {
		$CID = $request->input('CID');
		$proc = 'proc_Delete_CustomerInfo';
		$sql = 'call $proc({$CID})';
		$result = DB::delete($sql);
		return json_encode($result);
	}

	public function admin_customer_er_check(Request $request) {
		$CID = $request->input('CID');
		$proc = 'check_ERAddr_by_CID';
		$sql = 'call $proc({$CID})';
		$result = DB::select($sql);
		return $result;
	}
	//after sign contract, insert contract to library and er change to stat: rent
	public function admin_customer_er_insert(Request $request) {
		$this->admin_customer_contract_insert($request);
	}

	public function admin_customer_contract_insert(Request $request) {
		$ER_ID= $request->input('ER_ID');
		$CLType= $request->input('CLType');
		$CID= $request->input('CID');
		$CLDate= $request->input('CLDate');
		$ContractFile= $request->input('ContractFile');
		$ContractComment= $request->input('ContractComment');

		$proc = 'proc_Insert_ContractLibrary';
		$sql = "call $proc({$ER_ID},'{$CLType}',{$CID},'{$CLDate}','{$ContractFile}','{$ContractComment}')";
		$result = DB::insert($sql);
		return json_encode($result);
	}

	public function admin_customer_contract_delete(Request $request) {
		$ER_ID = $request->input('ER_ID');
		$CLType = $request->input('CLType');
		$CID = $request->input('CID');
		$CLDate = $request->input('CLDate');
		$proc = 'proc_Delete_ContractLibrary';
		$sql = "call $proc({$ER_ID},'{$CLType}',{$CID},'{$CLDate}')";
		$result = DB::delete($sql);
		return json_encode($result);
	}
	//rent success and all info recorded into db, send msg to customer for another record
	public function admin_customer_er_notice(Request $request) {

	}
	//customer rent bill management
	public function admin_customer_bill_check(Request $request) {
		$this->admin_bill_check($request);
	}

	public function admin_customer_bill_insert(Request $request) {
		$this->admin_bill_insert($request);
	}

	public function admin_customer_bill_update(Request $request) {
		$this->admin_bill_update($request);
	}

	public function admin_customer_bill_delete(Request $request) {
		$this->admin_bill_delete($request);
	}
	//sent msg to notice customer for payment
	public function admin_customer_bill_notice(Request $request) {

	}

	//customer service management
	public function admin_customer_service_check(Request $request) {
		$CID = $request->input('CID');
		$ER_ID = $request->input('ER_ID');
		$ServiceType = $request->input('ServiceType');
		$ServiceStat = $request->input('ServiceStat');
		$ServiceDateMin = $request->input('ServiceDateMin');
		$ServiceDateMax = $request->input('ServiceDateMax');
		try
		{
		$proc_name = 'filt_Check_ServiceLibrary';
		$sql = "call $proc_name(
								{$CID},{$ER_ID},'{$ServiceType}','{$ServiceStat}','{$ServiceDateMin}',
								'{$ServiceDateMax}'
								)";
			$result = DB::select($sql);
			return $result;
		}
		catch(exception $e)
		{
			return $e;
		}
	}

	public function admin_customer_service_insert(Request $request) {
		$ER_ID = $request->input('ER_ID');
		$CID = $request->input('CID');
		$ServiceType = $request->input('ServiceType');
		$ServiceFile = $request->input('ServiceFile');
		$ServiceComment = $request->input('ServiceComment');
		$ServiceDate = $request->input('ServiceDate');
		$ServiceStat = $request->input('ServiceStat');

		$proc = 'proc_Insert_ServiceLibrary';
		$sql = "call $proc({$ER_ID},{$CID},'{$ServiceType}','{$ServiceFile}','{$ServiceComment}','{$ServiceDate}','{$ServiceStat}')";
		$result = DB::insert($sql);
		return $result;
	}

	public function admin_customer_service_update(Request $request) {
		$SLID = $request->input('SLID');
		$ER_ID = $request->input('ER_ID');
		$CID = $request->input('CID');
		$ServiceType = $request->input('ServiceType');
		$ServiceFile = $request->input('ServiceFile');
		$ServiceComment = $request->input('ServiceComment');
		$ServiceDate = $request->input('ServiceDate');
		$ServiceStat = $request->input('ServiceStat');

		$proc = 'proc_Update_ServiceLibrary';
		$sql = "call $proc({$SLID},{$ER_ID},{$CID},'{$ServiceType}','{$ServiceFile}','{$ServiceComment}','{$ServiceDate}','{$ServiceStat}')";
		$result = DB::update($sql);
		return $result;
	}

	public function admin_customer_service_delete(Request $request) {
		$SLID = $request->input('SLID');
		$proc = 'proc_Delete_ServiceLibrary';
		$sql = "call $proc({$SLID})";
		$result = DB::delete($sql);
		return $result;
	}

	public function admin_customer_service_notice(Request $request) {

	}

	//customer maintenance management
	public function admin_customer_maintenance_check(Request $request) {
		//赋值参数
		$CID = $request->input('CID');
		$ER_ID = $request->input('ER_ID');
		$MType = $request->input('MType');
		$MStat = $request->input('MStat');
		$MApplyDateMin = $request->input('MApplyDateMin');
		$MApplyDateMax = $request->input('MApplyDateMax');

		//执行存储过程
		try
		{
			$proc_name = 'filt_Check_MaintenanceLibrary';
			$sql = "call $proc_name(
									{$CID},{$ER_ID},'{$MType}','{$MStat}','{$MApplyDateMin}',
									'{$MApplyDateMax}'
									)";
			$result = DB::select($sql);
			return $result;
		}
		catch(exception $e)
		{
			return $e;
		}
	}

	public function admin_customer_maintenance_insert(Request $request) {
		//赋值参数
		$CID = $request->input('CID');
		$ER_ID = $request->input('ER_ID');
		$MType = $request->input('MType');
		$MStat = $request->input('MStat');
		$MApplyForm = $request->input('MApplyForm');
		$MApplyDate = $request->input('MApplyDate');

		//执行存储过程
		try
		{
			$proc_name = 'proc_Insert_MaintenanceLibrary';
			$sql = "call $proc_name('{$MType}',{$ER_ID},{$CID},'{$MApplyForm}','{$MStat}','{$MApplyDate}')";
			$result = DB::insert($sql);
			return json_encode($result);
		}
		catch(exception $e)
		{
			return $e;
		}
	}

	public function admin_customer_maintenance_update(Request $request) {
		$MLID = $request->input('MLID');
		$CID = $request->input('CID');
		$ER_ID = $request->input('ER_ID');
		$MType = $request->input('MType');
		$MStat = $request->input('MStat');
		$MApplyForm = $request->input('MApplyForm');
		$MConfirm = $request->input('MConfirm');

		$proc_name = 'proc_Insert_MaintenanceLibrary';
		$sql = "call $proc_name({$MLID},'{$MType}',{$ER_ID},{$CID},'{$MApplyForm}','{$MStat}','{$MConfirm}')";
		$result = DB::update($sql);
		return json_encode($result);
	}

	public function admin_customer_maintenance_delete(Request $request) {
		$MLID = $request->input('MLID');
		$proc_name = 'proc_Delete_MaintenanceLibrary';
		$sql = "call $proc_name({$MLID})";
		$result = DB::delete($sql);
		return json_encode($result);
	}

	public function admin_customer_maintenance_notice(Request $request) {

	}

	/**
	 * admin thirdparty
	 */

	/**
	 * admin bill
	 * convenient method to notice unpaid bill to payment role
	 */

	public function admin_bill_check(Request $request) {
		$CID = $request->input('CID');
		$ER_ID = $request->input('ER_ID');
		$BillType = $request->input('BillType');
		$BillDateMin = $request->input('BillDateMin');
		$BillDateMax = $request->input('BillDateMax');
		//执行存储过程
		try{
			$proc_name = 'filt_Check_BillLibrary';
			$sql = "call $proc_name({$CID},{$ER_ID},'{$BillType}','{$BillDateMin}','{$BillDateMax}')";
			$result = DB::select($sql);
			return $result;
		}
		catch(exception $e)
		{
			return $e;
		}
	}

	public function admin_bill_insert(Request $request) {
		$CID = $request->input('CID');
		$ER_ID = $request->input('ER_ID');
		$BillType = $request->input('BillType');
		$BillCopy = $request->input('BillCopy');
		$BillDate = $request->input('BillDate');
		$BillAmount = $request->input('BillAmount');
		$BillReceipt = $request->input('BillReceipt');
        $BillComment = $request->input('BillComment');

		$proc = 'proc_Insert_BillLibrary';
		$sql = "call $proc({$CID},{$ER_ID},'{$BillType}','{$BillCopy}','{$BillDate}',{$BillAmount},'{$BillReceipt}','{$BillComment}')";
		$result = DB::insert($sql);
		return json_encode($result);
	}

	public function admin_bill_update(Request $request) {
		$BLID = $request->input('BLID');
		$CID = $request->input('CID');
		$ER_ID = $request->input('ER_ID');
		$BillType = $request->input('BillType');
		$BillCopy = $request->input('BillCopy');
		$BillDate = $request->input('BillDate');
		$BillAmount = $request->input('BillAmount');
		$BillReceipt = $request->input('BillReceipt');
        $BillComment = $request->input('BillComment');

		$proc = 'proc_Update_BillLibrary';
		$sql = "call $proc({$BLID},{$CID},{$ER_ID},'{$BillType}','{$BillCopy}','{$BillDate}',{$BillAmount},'{$BillReceipt}','{$BillComment}')";
		$result = DB::insert($sql);
		return json_encode($result);
	}

	public function admin_bill_delete(Request $request) {
		$BLID = $request->input('BLID');
		$proc = 'proc_Delete_BillLibrary';
		$sql = 'call $proc({$BLID})';
		$result = DB::delete($sql);
		return json_encode($result);
	}


//	/**
//	 * file upload use front end angularJs upload file to server and return the store path to request for db update
//	 */
//	public function file_upload(Request $request) {
//		if ($request->hasFile('photo')) {
//		    $request->photo->store($savePath, $fileName, $diskName);	//para1 必填，2可以自动生成唯一名称，3默认.env配置位置
//		}
//	}


	/**
	 * msg
	 */
	public function msg_notice(Request $request) {
		$IdReceiver=$request->input('StaffID');
		$msg_direct_comment = $request->input('msg_direct_comment');
		$proc_Name = 'msg_unreadCount';
		$sql = "call $proc_Name({$IdReceiver},'{$msg_direct_comment}')";
		$result = DB::select($sql);
		return $result;
	}

	public function msg_confirm(Request $request) {
	//声明及获取参数
		$idMsg_sr = $request->input('idMsg_sr');
	//已读
		$proc_Name = 'msg_readconfirm';
		$sql = "call $proc_Name({$idMsg_sr})";

		$result = DB::update($sql);
		return json_encode($result);
	}

	public function msg_received(Request $request) {
		$IdReceiver=$request->input('StaffID');
		$msg_direct_comment = $request->input('msg_direct_comment');
		$proc_Name = 'msg_receive';
		$sql = "call $proc_Name({$IdReceiver},'{$msg_direct_comment}')";
		$result = DB::select($sql);
		return $result;
	}

	public function msg_write(Request $request) {
		$title = $request->input('title');
		$content = $request->input('content');
		$createTime =  date("Y-m-d h:i:sa");
		$IdSender = $request->input('StaffID');
		$IdReceiver = $request->input('IdReceiver');
		$msg_direct_comment = $request->input('msg_direct_comment'); 	//e.g.'Landlord to Staff';
		$proc_Name = 'msg_write';
		$sql = "call $proc_Name('{$title}','{$content}','{$createTime}',{$IdSender},{$IdReceiver},'{$msg_direct_comment}')";
		$result = DB::insert($sql);
		return json_encode($result);
	}

}
?>
