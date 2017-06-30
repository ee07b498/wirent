<?php

namespace App\Http\Controllers;

use Illuminate\http\Request;
use Illuminate\Support\Facades\DB;


use Aws\S3\S3Client;
use Aws\Credentials\CredentialProvider;

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
//		echo $CLastContDate;
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
		//重写session
		app('session')->flush();
		$customerInfo = DB::select("call check_CustomerInfo_by_CEmail('{$CEmail}')");
		//添加session 登陆信息
		foreach($customerInfo[0] as $key=>$value)
		{app('session')->put([$key=>$value]);}
		app('session')->put('customer_login_status',1);
		return response($result) ; //0:失败或无更新；1：成功
	}

	/*
	 * hot rent
	 */
	public function hotrent_check()
	{
		$proc_name = 'proc_Check_HotRent';
		$sql = "call $proc_name()";
		$data = DB::select($sql);

		//循环查询图片库及编辑文字叙述部分
		$proc_Name = 'check_EntireRentPicture_by_ERID';
		$proc_Name1 = 'check_EntireRentDetail_by_ERID';
		foreach($data as $item)
		{
			$ER_ID = $item->ER_ID;
			$sql = "call $proc_Name('{$ER_ID}')";
			$sql1 = "call $proc_Name1('{$ER_ID}')";
			$itempic = DB::select($sql);
			$itemdetail = DB::select($sql1);
			$item->picset = $itempic;
			$item->details = $itemdetail;
		}
		return $data;
	}

	/*
	 * relative rent limit 0,4
	 */

	public function relative_rent(Request $request)
	{
		$ER_Suburb = $request->input('ER_Suburb');
		$ER_Region = $request->input('ER_Region');
		$ER_Type = $request->input('ER_Type');
		$ER_BedRoom = $request->input('ER_BedRoom');
		$ER_BathRoom = $request->input('ER_BathRoom');
		$ER_Parking = $request->input('ER_Parking');
		$ER_Feature = $request->input('ER_Feature');    		//feature暂定furnitured or unfurnitured
		$ER_Description = $request->input('ER_Description');	//Description 参数要使用%a%b%... 顺序必须与insert至表内顺序一致
		$ER_Price = $request->input('ER_Price');
		$ER_AvailableDate = $request->input('ER_AvailableDate');

		$proc_name = 'proc_Check_RelativeEntireRent';
		$sql = "call $proc_name(
									'{$ER_Suburb}','{$ER_Region}','{$ER_Type}','{$ER_BedRoom}',
									'{$ER_BathRoom}','{$ER_Parking}','{$ER_Feature}',
									'{$ER_Description}','{$ER_Price}',
									'{$ER_AvailableDate}'
								)";
		$data = DB::select($sql);

		//循环查询图片库及编辑文字叙述部分
		$proc_Name = 'check_EntireRentPicture_by_ERID';
		$proc_Name1 = 'check_EntireRentDetail_by_ERID';
		foreach($data as $item)
		{
			$ER_ID = $item->ER_ID;
			$sql = "call $proc_Name('{$ER_ID}')";
			$sql1 = "call $proc_Name1('{$ER_ID}')";
			$itempic = DB::select($sql);
			$itemdetail = DB::select($sql1);
			$item->picset = $itempic;
			$item->details = $itemdetail;
		}
		return $data;
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

	public function filt_entire_count(Request $request)
	{
		$include_area = $request->input('include_area');
		$ER_Suburb = $request->input('ER_Suburb');				//检查房源所在区被包含在客户选择的多个区拼接成中 i.e. 'epping,eastwood' 注意分隔符为逗号
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

		if ($include_area==true)
		{
			$proc_name = 'include_area';
			$sql = "call $proc_name('{$ER_Suburb}')";
			$SuburbSet = DB::select($sql);
			$ER_Suburb = '';
			foreach($SuburbSet as $Suburb)
			{
				$ER_Suburb = $ER_Suburb+','+$Suburb->suburb;
			}
			$proc_name = 'filt_Check_EntireRent_Count';
			$sql = "call $proc_name(
									'{$ER_Suburb}','{$ER_Region}','{$ER_Type}','{$ER_BedRoomMin}','{$ER_BedRoomMax}',
									'{$ER_BathRoomMin}','{$ER_BathRoomMax}','{$ER_ParkingMin}','{$ER_ParkingMax}','{$ER_Feature}',
									'{$ER_Description}','{$ER_AreaMin}','{$ER_AreaMax}','{$ER_PriceMin}','{$ER_PriceMax}',
									'{$ER_AvailableDate}'
									)";
			$data = DB::select($sql);
      return $data;
		}
		else
		{
			$proc_name = 'filt_Check_EntireRent_Count';
			$sql = "call $proc_name(
									'{$ER_Suburb}','{$ER_Region}','{$ER_Type}','{$ER_BedRoomMin}','{$ER_BedRoomMax}',
									'{$ER_BathRoomMin}','{$ER_BathRoomMax}','{$ER_ParkingMin}','{$ER_ParkingMax}','{$ER_Feature}',
									'{$ER_Description}','{$ER_AreaMin}','{$ER_AreaMax}','{$ER_PriceMin}','{$ER_PriceMax}',
									'{$ER_AvailableDate}'
									)";
			$data = DB::select($sql);
        return $data;
		}
	}

	// 非会员有shortlist的查询
	public function filt_entire(Request $request)
	{
		//赋值参数
		$include_area = $request->input('include_area');
		$ER_Suburb = $request->input('ER_Suburb');				//检查房源所在区被包含在客户选择的多个区拼接成中 i.e. 'epping,eastwood' 注意分隔符为逗号
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
			//分页查询参数
		$OrderBy = $request->input('OrderBy');
		$PageID = $request->input('PageID');

		$data = array();
		$dataSet = array();

		//执行存储过程
		try{
			if ($include_area==true)
				{
					$proc_name = 'include_area';
					$sql = "call $proc_name('{$ER_Suburb}')";
					$SuburbSet = DB::select($sql);
					$ER_Suburb = '';
					foreach($SuburbSet as $Suburb)
					{
						$ER_Suburb = $ER_Suburb+','+$Suburb->suburb;
					}
					$proc_name = 'filt_Check_EntireRent';
					$sql = "call $proc_name(
											'{$ER_Suburb}','{$ER_Region}','{$ER_Type}','{$ER_BedRoomMin}','{$ER_BedRoomMax}',
											'{$ER_BathRoomMin}','{$ER_BathRoomMax}','{$ER_ParkingMin}','{$ER_ParkingMax}','{$ER_Feature}',
											'{$ER_Description}','{$ER_AreaMin}','{$ER_AreaMax}','{$ER_PriceMin}','{$ER_PriceMax}',
											'{$ER_AvailableDate}','{$OrderBy}','{$PageID}'
											)";
					$data = DB::select($sql);
				}
			else
			{
				$proc_name = 'filt_Check_EntireRent';
				$sql = "call $proc_name(
										'{$ER_Suburb}','{$ER_Region}','{$ER_Type}','{$ER_BedRoomMin}','{$ER_BedRoomMax}',
										'{$ER_BathRoomMin}','{$ER_BathRoomMax}','{$ER_ParkingMin}','{$ER_ParkingMax}','{$ER_Feature}',
										'{$ER_Description}','{$ER_AreaMin}','{$ER_AreaMax}','{$ER_PriceMin}','{$ER_PriceMax}',
										'{$ER_AvailableDate}','{$OrderBy}','{$PageID}'
										)";
				$data = DB::select($sql);
			}
			/*
			 * 查询无结果解决办法:
			 * step1:检查所有条件,排序,并设置默认值
			 * step2:将最后一个非默认值条件设为默认值，查询
			 * step3:有结果返回结果集无结果返回step2
			 */
			//step1:
			$optionlist_init = [
				'','','','2200-01-01','','',10000,0,
				20,0,10,0,10,0,50000,0
			];

			$optionlist_input = [
				$ER_Region,$ER_Suburb,$ER_Type,$ER_AvailableDate,$ER_Description,$ER_Feature,$ER_PriceMax,$ER_PriceMin,
				$ER_BedRoomMax,$ER_BedRoomMin,$ER_BathRoomMax,$ER_BathRoomMin,$ER_ParkingMax,$ER_ParkingMin,$ER_AreaMax,$ER_AreaMin
			];
			$i=15;
			//step 2,3
			while($data == null && $i>=0){
				if ($optionlist_input[$i]==$optionlist_init[$i])
				{$i--; }
				else{
					$optionlist_input[$i]=$optionlist_init[$i];
					$proc_name = 'filt_Check_EntireRent';
					$sql = "call $proc_name(
											'{$optionlist_input[1]}','{$optionlist_input[0]}','{$optionlist_input[2]}','{$optionlist_input[9]}','{$optionlist_input[8]}',
											'{$optionlist_input[11]}','{$optionlist_input[10]}','{$optionlist_input[13]}','{$optionlist_input[12]}','{$optionlist_input[5]}',
											'{$optionlist_input[4]}','{$optionlist_input[15]}','{$optionlist_input[14]}','{$optionlist_input[7]}','{$optionlist_input[6]}',
											'{$optionlist_input[3]}','{$OrderBy}','{$PageID}'
											)";
					$data = DB::select($sql);
					$i--;
				}
			}
			if ($data==''){return Exception("error:404|error:500'");}

			//循环查询图片库及编辑文字叙述部分
			$proc_Name = 'check_EntireRentPicture_by_ERID';
			$proc_Name1 = 'check_EntireRentDetail_by_ERID';
			foreach($data as $item)
			{
				$ER_ID = $item->ER_ID;
				$sql = "call $proc_Name('{$ER_ID}')";
				$sql1 = "call $proc_Name1('{$ER_ID}')";
				$itempic = DB::select($sql);
				$itemdetail = DB::select($sql1);
				$item->saved = FALSE;
				$item->picset = $itempic;
				$item->details = $itemdetail;
			}
			return $data;


			//domain 新增查询无结果解决办法 在房源足够多的情况下
			//if ($data==''){return '没有与您查询条件完全匹配的房源';}
		}
		catch(exception $e)
		{
			return $e;
		}
	}

	// 会员有shortlist的查询
	public function filt_entire_by_tenant(Request $request)
	{
		//赋值参数
		$CID = $request->input('CID');
		$include_area = $request->input('include_area');
		$ER_Suburb = $request->input('ER_Suburb');				//检查房源所在区被包含在客户选择的多个区拼接成中 i.e. 'epping,eastwood' 注意分隔符为逗号
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
			//分页查询参数
		$OrderBy = $request->input('OrderBy');
		$PageID = $request->input('PageID');

		$data = array();
		$dataSet = array();

		//执行存储过程
		try{
			if ($include_area==true)
				{
					$proc_name = 'include_area';
					$sql = "call $proc_name('{$ER_Suburb}')";
					$SuburbSet = DB::select($sql);
					$ER_Suburb = '';
					foreach($SuburbSet as $Suburb)
					{
						$ER_Suburb = $ER_Suburb+','+$Suburb->suburb;
					}
					$proc_name = 'filt_Check_EntireRent';
					$sql = "call $proc_name(
											'{$ER_Suburb}','{$ER_Region}','{$ER_Type}','{$ER_BedRoomMin}','{$ER_BedRoomMax}',
											'{$ER_BathRoomMin}','{$ER_BathRoomMax}','{$ER_ParkingMin}','{$ER_ParkingMax}','{$ER_Feature}',
											'{$ER_Description}','{$ER_AreaMin}','{$ER_AreaMax}','{$ER_PriceMin}','{$ER_PriceMax}',
											'{$ER_AvailableDate}','{$OrderBy}','{$PageID}'
											)";
					$data = DB::select($sql);
				}
			else
			{
				$proc_name = 'filt_Check_EntireRent';
				$sql = "call $proc_name(
										'{$ER_Suburb}','{$ER_Region}','{$ER_Type}','{$ER_BedRoomMin}','{$ER_BedRoomMax}',
										'{$ER_BathRoomMin}','{$ER_BathRoomMax}','{$ER_ParkingMin}','{$ER_ParkingMax}','{$ER_Feature}',
										'{$ER_Description}','{$ER_AreaMin}','{$ER_AreaMax}','{$ER_PriceMin}','{$ER_PriceMax}',
										'{$ER_AvailableDate}','{$OrderBy}','{$PageID}'
										)";
				$data = DB::select($sql);
			}
			/*
			 * 查询无结果解决办法:
			 * step1:检查所有条件,排序,并设置默认值
			 * step2:将最后一个非默认值条件设为默认值，查询
			 * step3:有结果返回结果集无结果返回step2
			 */
			//step1:
			$optionlist_init = [
				'','','','2200-01-01','','',10000,0,
				20,0,10,0,10,0,50000,0
			];

			$optionlist_input = [
				$ER_Region,$ER_Suburb,$ER_Type,$ER_AvailableDate,$ER_Description,$ER_Feature,$ER_PriceMax,$ER_PriceMin,
				$ER_BedRoomMax,$ER_BedRoomMin,$ER_BathRoomMax,$ER_BathRoomMin,$ER_ParkingMax,$ER_ParkingMin,$ER_AreaMax,$ER_AreaMin
			];
			$i=15;
			//step 2,3
			while($data == null && $i>=0){
				if ($optionlist_input[$i]==$optionlist_init[$i])
				{$i--; }
				else{
					$optionlist_input[$i]=$optionlist_init[$i];
					$proc_name = 'filt_Check_EntireRent';
					$sql = "call $proc_name(
											'{$optionlist_input[1]}','{$optionlist_input[0]}','{$optionlist_input[2]}','{$optionlist_input[9]}','{$optionlist_input[8]}',
											'{$optionlist_input[11]}','{$optionlist_input[10]}','{$optionlist_input[13]}','{$optionlist_input[12]}','{$optionlist_input[5]}',
											'{$optionlist_input[4]}','{$optionlist_input[15]}','{$optionlist_input[14]}','{$optionlist_input[7]}','{$optionlist_input[6]}',
											'{$optionlist_input[3]}','{$OrderBy}','{$PageID}'
											)";
					$data = DB::select($sql);
					$i--;
				}
			}
			if ($data==''){return Exception("error:404|error:500'");}
			//查詢興趣列表
			$shortlist = [];
			$proc_Name2 = "check_CustomerLogbook_by_CIDCLType";
			$sql2 = "call $proc_Name2({$CID},'FavorSave')";
			$shortlist = DB::select($sql2);
			//循环查询图片库及编辑文字叙述部分
			$proc_Name = 'check_EntireRentPicture_by_ERID';
			$proc_Name1 = 'check_EntireRentDetail_by_ERID';
			foreach($data as $item)
			{
				$ER_ID = $item->ER_ID;
				$sql = "call $proc_Name('{$ER_ID}')";
				$sql1 = "call $proc_Name1('{$ER_ID}')";
				$itempic = DB::select($sql);
				$itemdetail = DB::select($sql1);
				$item->saved = FALSE;
				$item->picset = $itempic;
				$item->details = $itemdetail;
				foreach ($shortlist as $savedid)
				{
					if ($savedid->CLDetail==$ER_ID)
					{$item->saved = TRUE;}
				}
			}
			return $data;
		}
		catch(exception $e)
		{
			return $e;
		}
	}

	public function filt_entire_detail(Request $request)
	{
		$ER_ID = $request->input('ER_ID');
		$proc_Name = 'check_EntireRentInfo_by_ERID';
		$sql = "call $proc_Name({$ER_ID})";
		$data = DB::select($sql);

		//循环查询图片库及编辑文字叙述部分
		$proc_Name = 'check_EntireRentPicture_by_ERID';
		$proc_Name1 = 'check_EntireRentDetail_by_ERID';
		foreach($data as $item)
		{
			$ER_ID = $item->ER_ID;
			$sql = "call $proc_Name('{$ER_ID}')";
			$sql1 = "call $proc_Name1('{$ER_ID}')";
			$itempic = DB::select($sql);
			$itemdetail = DB::select($sql1);
			$item->picset = $itempic;
			$item->details = $itemdetail;
		}
		return $data;
	}

	public function filt_share_count(Request $request)
	{
		//赋值参数
		$include_area = $request->input('include_area');
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

		if ($include_area==true)
		{
			$proc_name = 'include_area';
			$sql = "call $proc_name('{$ER_Suburb}')";
			$SuburbSet = DB::select($sql);
			$ER_Suburb = '';
			foreach($SuburbSet as $Suburb)
			{
				$ER_Suburb = $ER_Suburb+','+$Suburb->suburb;
			}
			$proc_name = 'filt_Check_SharingRent_Count';
			$sql = "call $proc_name(
							'{$ER_Suburb}','{$ER_Region}','{$ER_Type}','{$SRName}','{$SRAreaMin}',
							'{$SRAreaMax}','{$SRPriceMin}','{$SRPriceMax}','{$SRAvailableDate}','{$ER_Feature}',
							'{$ER_Description}'
							)";
			$data = DB::select($sql);
      return $data;
		}
		else
		{
			$proc_name = 'filt_Check_SharingRent_Count';
			$sql = "call $proc_name(
									'{$ER_Suburb}','{$ER_Region}','{$ER_Type}','{$SRName}','{$SRAreaMin}',
									'{$SRAreaMax}','{$SRPriceMin}','{$SRPriceMax}','{$SRAvailableDate}','{$ER_Feature}',
									'{$ER_Description}'
									)";
			$data = DB::select($sql);
      return $data;
		}
	}


	//会员有shortlist查询
	public function filt_share_by_tenant(Request $request)
	{
		//赋值参数
		$CID = $request->input('CID');
		$include_area = $request->input('include_area');
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

		//分页查询参数
		$OrderBy = $request->input('OrderBy');
		$PageID = $request->input('PageID');


		if ($include_area==true)
		{
			$proc_name = 'include_area';
			$sql = "call $proc_name('{$ER_Suburb}')";
			$SuburbSet = DB::select($sql);
			$ER_Suburb = '';
			foreach($SuburbSet as $Suburb)
			{
				$ER_Suburb = $ER_Suburb+','+$Suburb->suburb;
			}
			$proc_name = 'filt_Check_SharingRent';
			$sql = "call $proc_name(
							'{$ER_Suburb}','{$ER_Region}','{$ER_Type}','{$SRName}','{$SRAreaMin}',
							'{$SRAreaMax}','{$SRPriceMin}','{$SRPriceMax}','{$SRAvailableDate}','{$ER_Feature}',
							'{$ER_Description}','{$OrderBy}','{$PageID}'
							)";
			$data = DB::select($sql);
		}
		else
		{
			$proc_name = 'filt_Check_SharingRent';
			$sql = "call $proc_name(
									'{$ER_Suburb}','{$ER_Region}','{$ER_Type}','{$SRName}','{$SRAreaMin}',
									'{$SRAreaMax}','{$SRPriceMin}','{$SRPriceMax}','{$SRAvailableDate}','{$ER_Feature}',
									'{$ER_Description}','{$OrderBy}','{$PageID}'
									)";
			$data = DB::select($sql);
		}


			/*
			 * 查询无结果解决办法:
			 * step1:检查所有条件,排序,并设置默认值
			 * step2:将最后一个非默认值条件设为默认值，查询
			 * step3:有结果返回结果集无结果返回step2
			 */
			//step1:
			$optionlist_init = [
				'','','','','2200-01-01','','',0,
				2000,0,1000
			];

			$optionlist_input = [
				$ER_Region,$ER_Suburb,$ER_Type,$SRName,$SRAvailableDate,$ER_Description,$ER_Feature,$SRPriceMin,$SRPriceMax,
				$SRAreaMin,$SRAreaMax
			];
			$i=10;
			//step 2,3
			while($data == null && $i>=0){
				if ($optionlist_input[$i]==$optionlist_init[$i])
				{$i--; }
				else{
					$optionlist_input[$i]=$optionlist_init[$i];
					$proc_name = 'filt_Check_SharingRent';
					$sql = "call $proc_name(
											'{$optionlist_input[1]}','{$optionlist_input[0]}','{$optionlist_input[2]}','{$optionlist_input[3]}','{$optionlist_input[9]}',
											'{$optionlist_input[10]}','{$optionlist_input[7]}','{$optionlist_input[8]}','{$optionlist_input[4]}','{$optionlist_input[6]}',
											'{$optionlist_input[5]}','{$OrderBy}','{$PageID}'
											)";
					$data = DB::select($sql);
					$i--;
				}
			}
			if ($data==''){return Exception("error:404|error:500'");}



		//循环查询图片库及文字编辑details
		$proc_Name = 'check_EntireRentPicture_by_ERID';
		$proc_Name1 = 'check_SharingRentDetail_by_ERIDandSRID';
		foreach($data as $item)
		{
			$ER_ID = $item->ER_ID;
			$sql = "call $proc_Name('{$ER_ID}')";
			$itempic = DB::select($sql);
			//查詢興趣列表
			$proc_Name2 = "check_CustomerLogbook_by_CIDCLType";
			$sql2 = "call $proc_Name2({$CID},'FavorSave')";
			$shortlist = DB::select($sql2);
			$item->saved = FALSE;
			foreach ($shortlist as $savedid)
			{
				if ($savedid->CLDetail==$ER_ID)
				{$item->saved = TRUE;}
			}
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
			//文字编辑details
			$SRID = $item->SRID;
			$sql1 = "call $proc_Name1('{$ER_ID}','{$SRID}')";
			$itemdetail = DB::select($sql1);
			$item->details = $itemdetail;

		}
		return $data;
	}

	/*
	 * filt share rent
	 */
	public function filt_share(Request $request)
	{
		//赋值参数
		$include_area = $request->input('include_area');
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

		//分页查询参数
		$OrderBy = $request->input('OrderBy');
		$PageID = $request->input('PageID');


		if ($include_area==true)
		{
			$proc_name = 'include_area';
			$sql = "call $proc_name('{$ER_Suburb}')";
			$SuburbSet = DB::select($sql);
			$ER_Suburb = '';
			foreach($SuburbSet as $Suburb)
			{
				$ER_Suburb = $ER_Suburb+','+$Suburb->suburb;
			}
			$proc_name = 'filt_Check_SharingRent';
			$sql = "call $proc_name(
							'{$ER_Suburb}','{$ER_Region}','{$ER_Type}','{$SRName}','{$SRAreaMin}',
							'{$SRAreaMax}','{$SRPriceMin}','{$SRPriceMax}','{$SRAvailableDate}','{$ER_Feature}',
							'{$ER_Description}','{$OrderBy}','{$PageID}'
							)";
			$data = DB::select($sql);
		}
		else
		{
			$proc_name = 'filt_Check_SharingRent';
			$sql = "call $proc_name(
									'{$ER_Suburb}','{$ER_Region}','{$ER_Type}','{$SRName}','{$SRAreaMin}',
									'{$SRAreaMax}','{$SRPriceMin}','{$SRPriceMax}','{$SRAvailableDate}','{$ER_Feature}',
									'{$ER_Description}','{$OrderBy}','{$PageID}'
									)";
			$data = DB::select($sql);
		}

			/*
			 * 查询无结果解决办法:
			 * step1:检查所有条件,排序,并设置默认值
			 * step2:将最后一个非默认值条件设为默认值，查询
			 * step3:有结果返回结果集无结果返回step2
			 */
			//step1:
			$optionlist_init = [
				'','','','','2200-01-01','','',0,
				2000,0,1000
			];

			$optionlist_input = [
				$ER_Region,$ER_Suburb,$ER_Type,$SRName,$SRAvailableDate,$ER_Description,$ER_Feature,$SRPriceMin,$SRPriceMax,
				$SRAreaMin,$SRAreaMax
			];
			$i=10;
			//step 2,3
			while($data == null && $i>=0){
				if ($optionlist_input[$i]==$optionlist_init[$i])
				{$i--; }
				else{
					$optionlist_input[$i]=$optionlist_init[$i];
					$proc_name = 'filt_Check_SharingRent';
					$sql = "call $proc_name(
											'{$optionlist_input[1]}','{$optionlist_input[0]}','{$optionlist_input[2]}','{$optionlist_input[3]}','{$optionlist_input[9]}',
											'{$optionlist_input[10]}','{$optionlist_input[7]}','{$optionlist_input[8]}','{$optionlist_input[4]}','{$optionlist_input[6]}',
											'{$optionlist_input[5]}','{$OrderBy}','{$PageID}'
											)";
					$data = DB::select($sql);
					$i--;
				}
			}
			if ($data==''){return Exception("error:404|error:500'");}



		//循环查询图片库及文字编辑details
		$proc_Name = 'check_EntireRentPicture_by_ERID';
		$proc_Name1 = 'check_SharingRentDetail_by_ERIDandSRID';
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
			//文字编辑details
			$SRID = $item->SRID;
			$sql1 = "call $proc_Name1('{$ER_ID}','{$SRID}')";
			$itemdetail = DB::select($sql1);
			$item->details = $itemdetail;
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
			return [$result];
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
			$infoSet =[];
			$result = DB::select($sql);
			if($CLType=='FavorSave')
			{
				//循环查询ERinfo
				$proc_Name = 'check_EntireRentInfo_by_ERID';
				foreach($result as $item)
				{
					$ER_ID = $item->CLDetail;
					$sql = "call $proc_Name({$ER_ID})";
					$ERinfo = DB::select($sql);
					$infoSet[] = $ERinfo;
				}
				return $infoSet;
			}
			elseif($CLType=='ShareSave')
			{
				$proc_Name = 'check_SharingRoomInfo_by_SRID';
				foreach($result as $item)
				{
					$SRID = $item->CLDetail;
					$sql = "call $proc_Name({$SRID})";
					$SRinfo = DB::select($sql);
					$infoSet[] = $SRinfo;
				}
				return $infoSet;
			}
			else
			{
				return "shortlist_type_unknown";
			}
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
//		$CLTime = $request->input('CLTime');
		//执行存储过程
		$proc_name = 'proc_Delete_CustomerLogbook';
		$sql = "call $proc_name({$CID},'{$CLType}','{$CLDetail}')";
		$result = DB::select($sql);
		return json_encode($result);
	}

	public function shortlist_insert(Request $request)
	{
		//赋值参数
		$CID = $request->input('CID');
		$CLType = $request->input('CLType');
		$CLDetail=$request->input('CLDetail');
		$CLTime = $request->input('CLTime');
		//查询数据库内是否存在相同信息
		$proc_name = 'check_CustomerLogbook_by_CIDCLType';
		$sql = "call $proc_name({$CID},'{$CLType}')";
		$result = DB::select($sql);
		foreach($result as $shortlist_item)
		{
			if ($shortlist_item->CLDetail==$CLDetail)
			{return 'shortlist_insert_repeat';}
		}
		//执行添加存储过程
		$proc_name = 'proc_Insert_CustomerLogbook';
		$sql = "call $proc_name({$CID},'{$CLType}','{$CLDetail}','{$CLTime}')";
		$result = DB::insert($sql);
		return json_encode($result);

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
		$createTime =  $request->input('createTime');
		$IdSender = $request->input('CID');
		$IdReceiver = $request->input('IdReceiver');
		$msg_direct_comment = $request->input('msg_direct_comment'); 	//e.g.'Landlord to Staff';
		$proc_Name = 'msg_write';
		$sql = "call $proc_Name('{$title}','{$content}','{$createTime}',{$IdSender},{$IdReceiver},'{$msg_direct_comment}')";
		$result = DB::insert($sql);
		return json_encode($result);
	}

	public function filt_thirdparty(Request $request)
	{
		$TPDetail=$request->input('TPDetail');
		$TPServLoc = $request->input('TPServLoc');			//e.g.租客检查未读邮件$msg_direct_comment = '% to customer';
		$proc_Name = 'filt_Check_ThirdParty';
		$sql = "call $proc_Name('{$TPDetail}','{$TPServLoc}')";
		$result = DB::select($sql);
		return $result;
	}

}
