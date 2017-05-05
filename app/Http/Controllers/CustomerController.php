<?php

namespace App\Http\Controllers;

use Illuminate\http\Request;
use Illuminate\Support\Facades\DB;

/*
 * return 默认stdClass, 根据前端需求修改。
 * stdClass 成员变量直接以对象形式表示及赋值：$a->b=c, 无key=>value格式：$a['b']=c
 * 执行存储过程方式只与返回值有关，DB::select($sql)返回stdClass||false，其他返回true||false,
 * $sql 内 int类型参数不加''变字符型，其他都加
 * 对于json格式[] Hbuilder 认为格式错误无法折叠，注销（ctrl+/）后才可以折叠，当前使用方法由login|logout|register
 */
class CustomerController extends Controller
{
    /*
     * login
     */
    public function login(Request $request)
    {			
        $CEmail = $request->input('CEmail');
		$CPassword = $request->input('CPassword');
		//get array of object from db
        $getPassword = DB::select("call login_Customer('{$CEmail}')");
		//verify using php coding function
		if(password_verify($CPassword,$getPassword[0]->CPassword))
		{
			$customerInfo = DB::select("call check_CustomerInfo_by_CEmail('{$CEmail}')");			
			//添加session 登陆信息	
			foreach($customerInfo[0] as $key=>$value)
			{app('session')->put([$key=>$value]);}
			app('session')->put('customer_login_status',1);									
			return ['CEmail'=>$CEmail,'stat'=>1];
		}
        return ['CEmail'=>$CEmail,'stat'=>0];
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
		$CEmail = $request->input('CEmail');
		$CPassword = password_hash($request->input('CPassword'),PASSWORD_DEFAULT);
		$status = "seeking";
		$today = date("Y-m-d");
		$proc_Name = 'proc_Insert_CustomerInfo';
		$result = DB::insert("call $proc_Name('','{$CPassword}','','{$CEmail}','{$status}','{$today}','1','0')");		
		return ['CEmail'=>$CEmail,'stat'=>$result];
	}

	/*
	 * profile check
	 */
 	public function profile_check(Request $request)
	{
		return app('session')->all();
	}
	
	/*
	 * profile update
	 * 不允许修改部分由session添加
	 * date 不能为空， num 不能为空且不字符串化‘’加入调用的存储过程
	 */
 	public function profile_update(Request $request)
	{
		$CID=$request->input('CID');  	//不允许用户修改
		$CName=$request->input('CName'); 
		if ($request->input('CPassword')!=''){$CPassword=password_hash($request->input('CPassword'), PASSWORD_DEFAULT);}
		else $CPassword='';
		$CPhone=$request->input('CPhone'); 
		$CEmail=$request->input('CEmail'); //不允许用户从此过程修改邮箱		
		$CCurrStat=$request->input('CCurrStat'); //不允许用户修改租买状态		
		$CLastContDate=$request->input('CLastContDate'); //不允许用户最后一次员工管理日期		
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
		return response($result) ; //0:失败或无更新；1：成功
	} 
	 
	/*address check
	 * 
	 */
	public function filt_address(Request $request)
	{
		$inputStr = $request->input('inputStr');
		$proc = 'filt_Check_postcode';
		$sql = "call $proc('{$inputStr}')";
		$result = DB::select($sql);
		return $result;
	} 
	 
	/*
	 * filt entire rent
	 */ 	
	public function filt_entire(Request $request)
	{
		//赋值参数
		$ER_Suburb = $request->input('ER_Suburb');
		$ER_Region = $request->input('ER_Region');
		$ER_Type = $request->input('ER_Type');
		$ER_BedRoomMin = $request->input('ER_BedRoomMin');
		$ER_BedRoomMax = $request->input('ER_BedRoomMax');
		$ER_BathRoomMin = $request->input('ER_BathRoomMin');
		$ER_BathRoomMax = $request->input('ER_BathRoomMax');
		$ER_ParkingMin = $request->input('ER_ParkingMin');
		$ER_ParkingMax = $request->input('ER_ParkingMax');
		$ER_Feature = $request->input('ER_Feature');    		//feature暂定furnitured or unfurnitured
		$ER_Description = $request->input('ER_Description');	//Description 参数要使用%a%b%... 顺序必须与insert至表内顺序一致
		$ER_AreaMin = $request->input('ER_AreaMin');
		$ER_AreaMax = $request->input('ER_AreaMax');
		$ER_PriceMin = $request->input('ER_PriceMin');
		$ER_PriceMax = $request->input('ER_PriceMax');
		$ER_AvailableDate = $request->input('ER_AvailableDate');
		
		$data = array();
		$dataSet = array();
	
		//执行存储过程
		try{
			$proc_name = 'filt_Check_EntireRent';
			$sql = "call $proc_name(
									'{$ER_Suburb}','{$ER_Region}','{$ER_Type}','{$ER_BedRoomMin}','{$ER_BedRoomMax}',
									'{$ER_BathRoomMin}','{$ER_BathRoomMax}','{$ER_ParkingMin}','{$ER_ParkingMax}','{$ER_Feature}',
									'{$ER_Description}','{$ER_AreaMin}','{$ER_AreaMax}','{$ER_PriceMin}','{$ER_PriceMax}',
									'{$ER_AvailableDate}'
									)";
			$data = DB::select($sql);

			//循环查询图片库
			$proc_Name = 'check_EntireRentPicture_by_ERID';	
			foreach($data as $item)
			{
				$ER_ID = $item->ER_ID;
				$sql = "call $proc_Name('{$ER_ID}')";	
				$itempic = DB::select($sql);
				$item->picset = $itempic;	
			}
			return $data;
		}
		catch(exception $e)
		{
			return $e;
		}	
	}
	
	/*
	 * filt entire rent
	 */ 	
	public function filt_share(Request $request)
	{
		//赋值参数
		$ER_Suburb = $request->input('ER_Suburb');
		$ER_Region = $request->input('ER_Region');
		$ER_Type = $request->input('ER_Type');
	
		$SRName = $request->input('SRName');
		$SRAreaMin = $request->input('SRAreaMin');
		$SRAreaMax = $request->input('SRAreaMax');
		$SRPriceMin = $request->input('SRPriceMin');
		$SRPriceMax = $request->input('SRPriceMax');
		$SRAvailableDate = $request->input('SRAvailableDate');
		
		$ER_Feature = $request->input('ER_Feature');    		//feature暂定furnitured or unfurnitured
		$ER_Description = $request->input('ER_Description');	//Description 参数要使用%a%b%... 顺序必须与insert至表内顺序一致
		
		$proc_name = 'filt_Check_SharingRent';
		$sql = "call $proc_name(
								'{$ER_Suburb}','{$ER_Region}','{$ER_Type}','{$SRName}','{$SRAreaMin}',
								'{$SRAreaMax}','{$SRPriceMin}','{$SRPriceMax}','{$SRAvailableDate}','{$ER_Feature}',
								'{$ER_Description}'
								)";
		$data = DB::select($sql);	
		//循环查询图片库
		$proc_Name = 'check_EntireRentPicture_by_ERID';	
		foreach($data as $item)
		{
			$ER_ID = $item->ER_ID;
			$sql = "call $proc_Name('{$ER_ID}')";	
			$itempic = DB::select($sql);
			//循环筛选SRID相同的房间图片及图片SRID为null的公共空间图片
			$partial = array();
			foreach ($itempic as $total)
			{				
				if ($total->SRID==$item->SRID||$total->SRID==null)
				{
					$partial[]=$total;
				}
			}
			$item->picset = $partial;	
		}
		return $data;						
	}

	/*
	 * bill check
	 */
	public function bill_check(Request $request)
	{
		//赋值参数
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

	/*
	 * maintenance check
	 */
	public function maintenance_check(Request $request)
	{
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
	
	public function maintenance_apply(Request $request)
	{
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
			$sql = "call $proc_name('{$MType}','{$ER_ID}','{$CID}','{$MApplyForm}','{$MStat}','{$MApplyDate}')";					
			$result = DB::insert($sql);
			return $result;
		}
		catch(exception $e)
		{
			return $e;
		}	
	}
	
	public function rent_check(Request $request)
	{
		//赋值参数
		$CID = $request->input('CID');
		//执行存储过程
		try
		{
			$proc_name = 'check_CustomerRentInfo_by_CID';
			$sql = "call $proc_name({$CID})";					
			$result = DB::select($sql);
			return $result;
		}
		catch(exception $e)
		{
			return $e;
		}	
	}
	
	public function service_check(Request $request)
	{
		//赋值参数
		$CID = $request->input('CID');
		$ER_ID = $request->input('ER_ID');
		$ServiceType = $request->input('ServiceType');
		$ServiceStat = $request->input('ServiceStat');
		$ServiceDateMin = $request->input('ServiceDateMin');
		$ServiceDateMax = $request->input('ServiceDateMax');
		//执行存储过程
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
	
	public function shortlist_check(Request $request)
	{
		//赋值参数
		$CID = $request->input('CID');
		$CLType = $request->input('CLType');
		//执行存储过程
		try
		{
			$proc_name = 'check_CustomerLogbook_by_CIDCLType';
			$sql = "call $proc_name({$CID},'{$CLType}')";				
			$result = DB::select($sql);
			return $result;
		}
		catch(exception $e)
		{
			return $e;
		}	
		
	}
	
	public function shortlist_delete(Request $request)
	{
		//赋值参数
		$CID = $request->input('CID');
		$CLType = $request->input('CLType');
		$CLDetail=$request->input('CLDetail');
		//执行存储过程
		$proc_name = 'proc_Delete_CustomerLogbook';
		$sql = "call $proc_name({$CID},'{$CLType}','{$CLDetail}')";
		$result = DB::select($sql);
		return $result;
	}
	
	public function shortlist_insert(Request $request)
	{
		//赋值参数
		$CID = $request->input('CID');
		$CLType = $request->input('CLType');
		$CLDetail=$request->input('CLDetail');
		$CLTime = $request->input('CLTime');
		//执行存储过程
		$proc_name = 'proc_Insert_CustomerLogbook';
		$sql = "call $proc_name({$CID},'{$CLType}','{$CLDetail}','{$CLTime}')";
		$result = DB::select($sql);
		return $result;
		
	}
	
	/*
	 * msg	relate to customer so id~CID
	 */
	public function msg_notice(Request $request)
	{
		$IdReceiver=$request->input('CID');  
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
		$IdReceiver=$request->input('CID');  
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
		$IdSender = $request->input('CID');
		$IdReceiver = $request->input('IdReceiver');						
		$msg_direct_comment = $request->input('msg_direct_comment'); 	//e.g.'Landlord to Staff';
		$proc_Name = 'msg_write';
		$sql = "call $proc_Name('{$title}','{$content}','{$createTime}',{$IdSender},{$IdReceiver},'{$msg_direct_comment}')";  
		$result = DB::insert($sql);
		return $result;
	}	
		
}
