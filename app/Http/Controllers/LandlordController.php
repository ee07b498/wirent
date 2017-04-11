<?php

namespace App\Http\Controllers;

use Illuminate\http\Request;
use Illuminate\Support\Facades\DB;
/*
 * 基本功能：登录注册站内信与customer相同，房产管理以房为单位
 * 业主第二电话列暂时为空，以后可改为其他参数如已签约合作年数：promote依据等
 */
class LandlordController extends Controller
{
    /**
     * login
     */
    public function login(Request $request)
    {			
        $LLEmail = $request->input('LLEmail');
		$LLPassword = $request->input('LLPassword');
		//get array of object from db
        $getPassword = DB::select("call login_Landlord('{$LLEmail}')");
		//verify using php coding function
		if(password_verify($LLPassword,$getPassword[0]->LLPassword))
		{
			$landlordInfo = DB::select("call check_LandlordInfo_by_LLEmail('{$LLEmail}')");			
			//添加session 登陆信息	
			foreach($landlordInfo[0] as $key=>$value)
			{app('session')->put([$key=>$value]);}
			app('session')->put('landlord_login_status',1);									
			return ['LLEmail'=>$LLEmail,'stat'=>1];
		}
        return ['LLEmail'=>$LLEmail,'stat'=>0];
    }
	/*
	 * logout
	 */
	public function logout()
	{
		app('session')->flush();
		return ['stat'=>0];
	}
	
	/*
	 * register
	 */
	public function register(Request $request)
	{
		$LLEmail = $request->input('LLEmail');
		$LLPassword = password_hash($request->input('LLPassword'),PASSWORD_DEFAULT);
		$proc_Name = 'proc_Insert_LandlordInfo';
		$result = DB::insert("call $proc_Name('','{$LLPassword}','','','{$LLEmail}')");		
		return ['LLEmail'=>$LLEmail,'stat'=>$result];
	}
	
	/*
	 * profile check
	 */
 	public function profile_check(Request $request)
	{
		$LLEmail = $request->input('LLEmail');
		$proc_name = 'check_LandlordInfo_by_LLEmail';
		$dataset = DB::select("call $proc_Name('{$LLEmail}')");		
		return json_encode($dataset);
	}
	
	/*
	 * profile update
	 * 不允许修改部分由session添加
	 * date 不能为空， num 不能为空且不字符串化‘’加入调用的存储过程
	 */
 	public function profile_update(Request $request)
	{
		$LLID=$request->input('LLID');  	//不允许用户修改
		$LLName=$request->input('LLName'); 
		if ($request->input('LLPassword')!=''){$LLPassword=password_hash($request->input('LLPassword'), PASSWORD_DEFAULT);}
		else $LLPassword='';
		$LLPhone=$request->input('LLPhone'); 
		$LLCellphone =$request->input('LLCellphone'); 	
		$LLEmail=$request->input('LLEmail'); //不允许用户从此过程修改邮箱		
		$proc_Name = 'proc_Update_LandlordInfo';
		$sql = "call $proc_Name(
									'{$LLID}'，'{$LLName}'，'{$LLPassword}'，'{$LLPhone}'，'{$LLCellphone}'，'{$LLEmail}'
								)"; 
		$result = DB::update($sql);		
		return response($result) ; //0:失败或无更新；1：成功
	} 
	
	/*
	 * property management
	 */
	public function balance(Request $request)
	{
		//赋值参数	
		$CID = 0;										//所有;
		$ER_ID = $request->input('ER_ID');
		$BillType = $request->input('BillType');		//'balance';
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
	
	public function check(Request $request)
	{			
		$LLID=$request->input('LLID'); 	
		$proc_name = 'check_EntireRentInfo_by_LLID';
		$sql = "call $proc_name('{$LLID}')";	
		$result = DB::select($sql);
		return $result;	
	}
	/*
	 * 合同思路是人与房之间的关系，出租即业主将房ER_ID委托给物业CID,租买即物业将房ER_ID交付给租客CID
	 */
	public function stat_on(Request $request){
		//赋值参数
		$ER_ID = $request->input('ER_ID');
		$CLType = $request->input('CLType'); 					//'promotion';
		$CID = $request->input('CID');							//物业;
		$CLDateMin = $request->input('CLDateMin');				//'2000-01-01';
		$CLDateMax = $request->input('CLDateMax');				//'3000-01-01';
		$ContractComment = $request->input('ContractComment');	//'';
		
		$proc_name = 'filt_Check_ContractLibrary';
		$sql = "call $proc_name({$ER_ID},'{$CLType}',{$CID},'{$CLDateMin}','{$CLDateMax}','{$ContractComment}')";						
		$result = DB::select($sql);
		return $result;		
	}

	public function stat_pre(Request $request){
		$LLID=$request->input('LLID');	
		$ER_ID = $request->input('ER_ID');
		$proc_name = 'check_msg_insp_booking';
		$sql = "call $proc_name({$LLID},{$ER_ID})";	
		$result = DB::select($sql);
		return $result;					
	}

	public function insert(Request $request){
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
			return $result;						
		}	
		else{return false;} 		//该地址已注册
	}

	public function update(Request $request){
		//声明及获取参数
		$ER_ID = $request->input('ER_ID');
		$ER_No = $request->input('ER_No');
		$ER_St = $request->input('ER_St');
		$ER_Suburb=$request->input('ER_Suburb');
		$ER_Region = $request->input('ER_Region');
		$postcode = $request->input('postcode');
		$ER_Area = $request->input('ER_Area');
		$ER_BedRoom = $request->input('ER_BedRoom');
		$ER_BathRoom = $request->input('ER_BathRoom');
		$ER_Kitchen = $request->input('ER_Kitchen');
		$ER_Dining = $request->input('ER_Dining');
		$ER_Parking = $request->input('ER_Parking');
		$ER_Price = $request->input('ER_Price');
		$ER_Stat = '';	
		$ER_AvailableDate = $request->input('ER_AvailableDate');
		$LLID = $request->input('LLID');
		$ER_InspRep = '';
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
		return $result;	
	}				
	/*
	 * msg	relate to customer so id~CID
	 */
	public function msg_notice(Request $request)
	{
		$IdReceiver=$request->input('LLID');  
		$msg_direct_comment = $request->input('msg_direct_comment');			//e.g.租客检查未读邮件$msg_direct_comment = '% to customer';
		$proc_Name = 'msg_unreadCount';	
		$sql = "call $proc_Name({$IdReceiver},'{$msg_direct_comment}')";  
		$result = DB::select($sql);
		return $result;
	}
	
	public function msg_confirm(Request $request)
	{
	//声明及获取参数
		$idMsg_sr = $request->input('idMsg_sr');
	//已读
		$proc_Name = 'msg_readconfirm';
		$sql = "call $proc_Name({$idMsg_sr})"; 
		 
		$result = DB::update($sql);
		return $result;
	}
	
	public function msg_received(Request $request)
	{
		$IdReceiver=$request->input('LLID');  
		$msg_direct_comment = $request->input('msg_direct_comment');			//e.g.租客检查未读邮件$msg_direct_comment = '% to customer';
		$proc_Name = 'msg_receive';	
		$sql = "call $proc_Name({$IdReceiver},'{$msg_direct_comment}')";  
		$result = DB::select($sql);
		return $result;
	}	

	public function msg_write(Request $request)
	{
		$title = $request->input('title');
		$content = $request->input('content');
		$createTime =  date("Y-m-d h:i:sa");
		$IdSender = $request->input('LLID');
		$IdReceiver = $request->input('IdReceiver');						
		$msg_direct_comment = $request->input('msg_direct_comment'); 	//e.g.'Landlord to Staff';
		$proc_Name = 'msg_write';
		$sql = "call $proc_Name('{$title}','{$content}','{$createTime}',{$IdSender},{$IdReceiver},'{$msg_direct_comment}')";  
		$result = DB::insert($sql);
		return $result;
	}			
}

?>