<div class="profile" ng-controller="ProfileController">
	<section class="main-area content-wrap">
		<div class="inner-wrap">
			<div class="row">
				<div class="col-sm-12">
                	<h3 translate="profile.TITLE"></h3>
            	</div>
			</div>
			<div class="row">
                <div class="col-sm-12 feedback success fadeInUp" role="alert" ng-show="success">
                    <h4 translate="profile.UPDATE.Success.header"></h4>    
                    <p translate="profile.UPDATE.Success.details"></p>
                </div>
                <div class="col-sm-12 w-full feedback error" role="alert" ng-show="error">
                    <h4 translate="profile.UPDATE.Error.header"></h4>             
                    <p translate="profile.UPDATE.Error.details"></p>
                </div>
            </div>
            <div class="row">
            	<div class="col-sm-3 profile-nav">
                    <ul class="tabNav" role="tablist">
                        <li ng-class="{'selected': tabs[0]}" class="active selected" role="presentation">
                            <a href ng-click="tab(0);" class="f-icon with-text " id="tab-myProfile" role="tab" aria-active="true" tabindex="0">
                                <span class="icon flaticon-man-user1"></span>
                                <span class="copy" translate="profile.SECTION.Profile.header"></span>
                            </a>
                        </li>
                        <li ng-class="{'selected': tabs[1]}" role="presentation">
                            <a href ng-click="tab(1);myPayment()" class="f-icon with-text" id="tab-emailPreferences" role="tab" aria-active="false" tabindex="-1">
                                <span class="icon "><i class="flaticon-banknote1" aria-hidden="true"></i></span>
                                <span class="copy" translate="profile.SECTION.Bill.title">My Payments</span>
                            </a>
                        </li>
                         <li ng-class="{'selected': tabs[2]}" role="presentation">
                            <a href ng-click="tab(2);propMgm()" class="f-icon with-text" id="tab-emailPreferences" role="tab" aria-active="false" tabindex="-1">
                                <span class="icon "><i class="flaticon-properties-information1" aria-hidden="true"></i></span>
                                <span class="copy" translate="profile.SECTION.Property.title">Property Management</span>
                            </a>
                        </li>
                        <li ng-class="{'selected': tabs[3]}" role="presentation">
                            <a href ng-click="tab(3);mtApply()" class="f-icon with-text" id="tab-emailPreferences" role="tab" aria-active="false" tabindex="-1">
                                <span class="icon "><i class="flaticon-tool1" aria-hidden="true"></i></span>
                                <span class="copy" translate="profile.SECTION.Maintenance.apply.title">Maintenance&nbsp;Apply</span>
                            </a>
                        </li>
                        <li ng-class="{'selected': tabs[4]}" role="presentation">
                            <a href ng-click="tab(4);mtCheck()" class="f-icon with-text" id="tab-emailPreferences" role="tab" aria-active="false" tabindex="-1">
                                <span class="icon "><i class="flaticon-spanner1" aria-hidden="true"></i></span>
                                <span class="copy" translate="profile.SECTION.Maintenance.history.title">Maintenance&nbsp;History</span>
                            </a>
                        </li>
                        <li ng-class="{'selected': tabs[5]}" role="presentation">
                            <a href ng-click="tab(5)" class="f-icon with-text" id="tab-emailPreferences" role="tab" aria-active="false" tabindex="-1">
                                <span class="icon "><i class="flaticon-businesswoman1" aria-hidden="true"></i></span>
                                <span class="copy" translate="profile.SECTION.Service.apply.title">Service&nbsp;Apply</span>
                            </a>
                        </li>
						 <li ng-class="{'selected': tabs[6]}" role="presentation">
                            <a href ng-click="tab(6);svHistory()" class="f-icon with-text" id="tab-emailPreferences" role="tab" aria-active="false" tabindex="-1">
                                <span class="icon "><i class="flaticon-conversation1" aria-hidden="true"></i></span>
                                <span class="copy" translate="profile.SECTION.Service.history.title">Service&nbsp;History</span>
                            </a>
                        </li>
                        <li ng-class="{'selected': tabs[7]}" role="presentation">
                            <a href ng-click="tab(7);msg()" class="f-icon with-text" id="tab-emailPreferences" role="tab" aria-active="false" tabindex="-1">
                                <span class="icon "><i class="flaticon-close-envelope1" aria-hidden="true"></i></span>
                                <span class="copy" translate="profile.SECTION.Message.title">Message</span>
                            </a>
                        </li>
                    </ul>
                </div>
                
                <div class="col-sm-9 tab-content"> 
                <div class="tab-pane tabPanel active profile-detail" ng-class="{'active': tabs[0]}">
                    <div class="tab-pane tabPanel active" id="myProfile" role="tabpanel" aria-hidden="false" aria-labelledby="tab-myProfile">
                    <div class="card">
                        <div class="inner-wrap clear">
                            <header>
                                <h3 translate="profile.SECTION.Profile.header"></h3>                               
                            </header>
							<!--file upload to s3 first and display real path in input label with path upload to db-->
                            <div class="content-wrap">
                                <div class="frm-main no-indent">
                                    <div class="inner-wrap">
                                    	<img ng-src="[:data.CPhoto:]">
                                        <a id="myBtn" class="btn lowlight" translate="profile.SECTION.Profile.photo_upload"></a>
                                    </div>                                   
                                </div>
                            </div>
							<!--end-->
                            <div class="content-wrap profile-detail clear">
                                <div class="half">
                                    <fieldset>
										<!--readonly part-->
                                    	<div class="frm-main no-indent" ng-show="he">
                                            <label for="CID">CID</label>
                                            <div class="inner-wrap">
                                                <input aria-required="false" id="CID" name="CID"   ng-readonly="readonly" type="text" ng-model="data.CID">
                                            </div>
                                        </div>
                                        <div class="frm-main no-indent">
                                            <label for="EmailAddress" translate="profile.SECTION.Profile.table.email"></label>
                                            <div class="inner-wrap">
                                                <input aria-required="true" id="EmailAddress" name="EmailAddress" ng-readonly="readonly" type="text" ng-model="data.CEmail">
                                            </div>
                                        </div>                                       
										<!--readonly end-->
										
                                        <div class="frm-main no-indent">
                                            <label for="Password" translate="profile.SECTION.Profile.table.password"></label>
                                            <div class="inner-wrap">
                                                <input aria-required="false" id="Password" name="Password"  ng-readonly="readonly" value="123456" type="password" ng-model="data.CPassword" >
                                            </div>
                                        </div>  
                                                                              
                                        <div class="frm-main no-indent">
                                            <label for="FirstName" translate="profile.SECTION.Profile.table.name"></label>
                                            <div class="inner-wrap">
                                                <input aria-required="false" id="FirstName" name="FirstName" ng-readonly="readonly" type="text" ng-model="data.CName">
                                            </div>
                                        </div>
                                        <div class="frm-main no-indent">
                                            <label for="Phone" translate="profile.SECTION.Profile.table.phone"></label>
                                            <div class="inner-wrap">
                                                <input aria-required="false" id="Phone" name="Phone" ng-readonly="readonly" type="text" ng-model="data.CPhone">
                                            </div>
                                        </div>
                                        <div class="frm-main no-indent">
                                            <label for="CurrStat" translate="profile.SECTION.Profile.table.currentStatus"></label>
                                            <div class="inner-wrap">
                                                <input aria-required="false" id="CurrStat" name="CurrStat" ng-readonly="readonly" type="text" ng-model="data.CCurrStat">
                                            </div>
                                        </div>
                                        <div class="frm-main no-indent">
                                            <label for="IDType" translate="profile.SECTION.Profile.table.idType.title"></label>
                                            <div class="inner-wrap">
                                        		<select ng-model="data.CIDType">
                                        			<option value="Citizen" translate="profile.SECTION.Profile.table.idType.option_1"></option>
                                        			<option value="Permanent Resident" translate="profile.SECTION.Profile.table.idType.option_2"></option>
                                        			<option value="Overseas" translate="profile.SECTION.Profile.table.idType.option_3"></option>
                                        		</select> 
                                        		<input aria-required="false" id="CIDProfile" ng-readonly="readonly" type="text" ng-model="data.CIDProfile" style="width: 308px; display: inline-block;">
                                        		<button id="btn_CIDProfile" class="flaticon-banknote20 inline" ></button>                                            
                                           </div>                                            
                                        </div>
                                        
                                        <!--income|save file upload to s3 first and display real path in input label with path upload to db-->
                                         <div class="frm-main no-indent">
                                            <label for="Income" translate="profile.SECTION.Profile.table.incomeProfile"></label>
                                            <div class="inner-wrap">
                                                <input aria-required="false" id="Income" name="Income" ng-readonly="readonly" type="text" ng-model="data.CIncomeProfile">
                                            	<button id="Income" class="flaticon-banknote20 inline" ng-model="data.CIncomeProfile"></button>                                             
                                            </div>
                                        </div>
                                        <div class="frm-main no-indent">
                                            <label for="Saving" translate="profile.SECTION.Profile.table.savingProfile"></label>
                                            <div class="inner-wrap">
                                                <input aria-required="false" id="Saving" name="Saving" ng-readonly="readonly" type="text"  ng-model="data.CSavingProfile"/>
                                                <button id="Income" class="flaticon-banknote20 inline" ng-model="data.CSavingProfile"></button>  
                                            </div>
                                        </div>
                                        <!--end-->                                       
                                    </fieldset>
                                </div>

                                <div class="half">
                                    <fieldset>
                                        <div class="frm-main no-indent">
                                            <label for="PartenerID" translate="profile.SECTION.Profile.table.partnerID"></label>
                                            <div class="inner-wrap">
                                                <input aria-required="false" id="PartenerID" name="PartenerID"  ng-readonly="readonly" type="text" ng-model="data.CPartenerID">
                                            </div>
                                        </div>
                                        <div class="frm-main no-indent">
                                            <label for="CLastContDate" translate="profile.SECTION.Profile.table.lastContactDate"></label>
                                            <div class="inner-wrap">
                                                <input aria-required="false" id="CLastContDate"  ng-readonly="readonly" type="text" ng-model="data.CLastContDate"/>
                                            </div>
                                        </div>                                    	                                    	
                                    	<div class="frm-main no-indent">
                                            <label for="Gender" translate="profile.SECTION.Profile.table.gender.title"></label>
                                    		<select ng-model="data.CSex">
                                    			<option value="Female" translate="profile.SECTION.Profile.table.gender.option_2"></option>
                                    			<option value="Male" translate="profile.SECTION.Profile.table.gender.option_1"></option>
                                    		</select> 
                                        </div>
                                        <div class="frm-main no-indent">
                                            <label for="Age" translate="profile.SECTION.Profile.table.age"></label>
                                            <div class="inner-wrap">
                                                <input aria-required="false" id="Age" name="Age" ng-readonly="readonly" type="text"  ng-model="data.CAge">
                                            </div>
                                        </div>
                                         <div class="frm-main no-indent">
                                            <label for="Work" translate="profile.SECTION.Profile.table.work.title"></label>
                                     		<select ng-model="data.CWorking">
                                    			<option value="Yes" translate="profile.SECTION.Profile.table.work.option_1"></option>
                                    			<option value="Not yet" translate="profile.SECTION.Profile.table.work.option_2"></option>
                                    			<option value="Retired" translate="profile.SECTION.Profile.table.work.option_3"></option>
                                    		</select>                                           
                                        </div>
                                        <div class="frm-main no-indent">
                                            <label for="Pet" translate="profile.SECTION.Profile.table.pet.title"></label>
                                    		<select ng-model="data.CPet">
                                    			<option value="No" translate="profile.SECTION.Profile.table.pet.option_1"></option>
                                    			<option value="Yes" translate="profile.SECTION.Profile.table.pet.option_2"></option>
                                    		</select>                                            
                                        </div>
                                        <div class="frm-main no-indent">
                                            <label for="Smoking" translate="profile.SECTION.Profile.table.smoking.title"></label>
                                    		<select ng-model="data.CSmoking">
                                    			<option value="No" translate="profile.SECTION.Profile.table.smoking.option_1"></option>
                                    			<option value="Yes" translate="profile.SECTION.Profile.table.smoking.option_2"></option>
                                    		</select>                                            
                                        </div>
                                        <div class="frm-main no-indent">
                                            <label for="Budget" translate="profile.SECTION.Profile.table.budget"></label>
                                            <div class="inner-wrap">
                                                <input aria-required="false" id="Budget" name="Budget"  ng-readonly="readonly" type="text" ng-model="data.CBudget">
                                            </div>
                                        </div>

                                        <div class="frm-main no-indent">
                                            <div class="inner-wrap">
                                                <a class="btn lowlight " ng-click="readonly=!readonly" translate="profile.SECTION.Profile.table.reset"></a>
                                                <a class="btn lowlight"  ng-click="saveProfile()" translate="profile.SECTION.Profile.table.save"></a>
                                            </div>                                            
                                        </div>                                        
                                    </fieldset>
                                </div>
                            </div>                           
                         </div>
                    </div>
                </div>
                    
                </div>
                <div class="tab-pane tabPanel" ng-class="{'active': tabs[1]}">
                    <div class="col-sm-12 tabPanel" id="myProfile" role="tabpanel" aria-hidden="false" aria-labelledby="tab-myProfile">
						<div class="card">
							 <div class="inner-wrap clear">
								<header>
									<h3 translate="profile.SECTION.Bill.title"></h3>
								</header>
								
								<div class="content-wrap clear">
								  <div class="wrapper-md">
							 	 	<div class="panel panel-default">
										<div class="panel-body b-b b-light" translate="profile.SECTION.Bill.search.title">
											<!--billdate filter BillDateMin|BillDateMax need to build model for calenders-->
											<div class="col-sm-4">
		                            			<p class="input-group">
									              <input type="text" class="form-control input-lg" datepicker-popup="[:format:]" ng-model="billSearchStart.dt" is-open="opened" min-date="'2017-06-01'" max-date="maxDate" datepicker-options="dateOptions"  ng-required="true" close-text="Close" />
									              <span class="input-group-btn">
									                <button type="button" class="btn btn-lg btn-default" ng-click="open($event)"><i class="glyphicon glyphicon-calendar"></i></button>
									              </span>
									            </p>  
		                            		</div> 
											<div class="col-sm-4">
		                            			<p class="input-group">
									              <input type="text" class="form-control input-lg" datepicker-popup="[:format:]" ng-model="billSearchEnd.dt" is-open="opened" min-date="minDate" max-date="maxDate" datepicker-options="dateOptions"  ng-required="true" close-text="Close" />
									              <span class="input-group-btn">
									                <button type="button" class="btn btn-lg btn-default" ng-click="open($event)"><i class="glyphicon glyphicon-calendar"></i></button>
									              </span>
									            </p>  
		                            		</div> 
		                            		<!--end date filter-->
										</div>
										<div class="table-responsive">
										  <table class="table m-b-none"  data-filter="#filter" data-page-size="5" >
											<thead>
											  <tr>
											  	  <th ng-show="false">
													 BLID
												  </th>
												  <th ng-show="false">
													 CID
												  </th>
												  <th ng-show="false">
													 ER_ID
												  </th>
												  
												  <th translate="profile.SECTION.Bill.table.col1"></th>
												  <th translate="profile.SECTION.Bill.table.col2"></th>
												  <th translate="profile.SECTION.Bill.table.col3"></th>
												  <th translate="profile.SECTION.Bill.table.col4"></th>
												  <th translate="profile.SECTION.Bill.table.col5"></th>
												  <th translate="profile.SECTION.Bill.table.col6"></th>
											  </tr>
											</thead>
											<tbody>
											  <tr>
												  <td  ng-show="false">[:payment.BLID:]</td>
												  <td  ng-show="false">[:payment.CID:]</td>
												  <td  ng-show="false">[:payment.ER_ID:]</td>
												  <td>[:payment.BillType:]</td>
												  <td>[:payment.BillAmount:]</td>
												  <td><span>[:payment.BillCopy:]</span></td>
												  <td>[:payment.BillDate:]</td>
												  <td>[:payment.BillReceipt:]</td>
												  <td data-value="1"><span class="label bg-success" title="Active">paid</span></td>
											  </tr>										  
											</tbody>
											<tfoot class="hide-if-no-paging">
											  <tr>
												  <td colspan="5" class="text-center">
													  <ul class="pagination">
													  	<li class="footable-page-arrow">
															<a data-page="first" href="#first">«</a>
														</li>
														<li class="footable-page-arrow">
															<a data-page="prev" href="#prev">‹</a>
														</li>
														<li class="footable-page">
															<a data-page="0" href="#">1</a>
														</li>
														<li class="footable-page active">
															<a data-page="1" href="#">2</a>
														</li>
														<li class="footable-page-arrow disabled">
															<a data-page="next" href="#next">›</a>
														</li>
														<li class="footable-page-arrow disabled">
															<a data-page="last" href="#last">»</a>
														</li>
													  </ul>
												  </td>
											  </tr>
											</tfoot>
										  </table>
										</div>
								  	</div>
								  </div>
								</div>
							 </div>						
						</div>
					</div>
			 	</div>			 
			 	<div class="tab-pane tabPanel" ng-class="{'active': tabs[2]}">
                    <div class="col-sm-12 tabPanel" id="myProfile" role="tabpanel" aria-hidden="false" aria-labelledby="tab-myProfile">
						<div class="card">
							 <div class="inner-wrap clear">
								<!--租客租房合同信息的查询及合同文本文件电子备份的下载-->
								<header>
									<h3 translate="profile.SECTION.Property.title">My Rental</h3>									
								</header>
								<div class="wrapper-md">
									 <div class="panel panel-default">									
										<div class="table-responsive">
										  <table class="table table-striped b-t b-light" >
											<thead>
											  <tr>
												<th translate="profile.SECTION.Property.table.col1">CLID</th>
												<th translate="profile.SECTION.Property.table.col2">Contract File</th>
												<th translate="profile.SECTION.Property.table.col3">CLDate</th>
												<th translate="profile.SECTION.Property.table.col4">Contract Comment</th>
												<th translate="profile.SECTION.Property.table.col5">Address</th>
												<!--后续增加到期续租提醒功能-->
												<!--<th style="width:30px;">state</th>-->
											  </tr>
											</thead>
											<tbody>
											  <tr>
												<td>[:management.CLID:]</td>
												<!--改为文件图标btn供客户下载文件，路径赋值给btn-->
												<td>[:management.ContractFile:]</td>
												<!--end-->
												<td>[:management.CLDate:]</td>
												<td>[:management.ContractComment:]</td>
												<td>[:management.ER_No+" "+management.ER_St+" "+management.ER_Suburb+","+management.ER_Region+" "+management.postcode:]</td>
												<!--<td>
												  <a href class="active" ui-toggle-class><i class="fa fa-check text-success text-active"></i><i class="fa fa-times text-danger text"></i></a>
												</td>-->
											  </tr>
											</tbody>
										  </table>
										</div>
									 </div>
								</div>
							</div>
						</div>
					</div>
					</div>
				 <div class="tab-pane tabPanel" ng-class="{'active': tabs[3]}">
                    <div class="col-sm-12 tabPanel" id="myProfile" role="tabpanel" aria-hidden="false" aria-labelledby="tab-myProfile">
						<div class="card">
							<div class="inner-wrap ">
								<header>
									<h3 translate="profile.SECTION.Maintenance.apply.title">Maintenance&nbsp;Apply</h3>									
								</header>
								<div class="content-wrap">
                                <div class="">
                                    <fieldset>
                                        <div class="frm-main no-indent">
                                            <label for="Name" translate="profile.SECTION.Maintenance.apply.table.name">Name</label>
                                            <div class="inner-wrap">
                                                <input aria-required="false" id="Name" name="Name"  readonly="readonly" type="text" ng-model="data.CName">
                                            </div>
                                        </div>
										 <div class="frm-main no-indent">
                                            <label for="Address" translate="profile.SECTION.Maintenance.apply.table.address">Property Address</label>
                                            <div class="inner-wrap">
                                                <input aria-required="false" id="Address" name="Address"  readonly="readonly" type="text" ng-model='management.address'>
                                            </div>
                                        </div>
                                        <div class="frm-main no-indent">
                                            <label for="Phone" translate="profile.SECTION.Maintenance.apply.table.phone">Phone</label>
                                            <div class="inner-wrap">
                                                <input aria-required="false" id="Phone" name="Phone" readonly="readonly" type="text" ng-model="data.CPhone">
                                            </div>
                                        </div>
                                        <div class="frm-main no-indent">
                                            <label for="EmailAddress" translate="profile.SECTION.Maintenance.apply.table.email">Email address</label>
                                            <div class="inner-wrap">
                                                <input aria-required="true" id="EmailAddress" name="EmailAddress" readonly="readonly" type="text" ng-model="data.CEmail">
                                            </div>
                                        </div>
                                        <div class="frm-main no-indent">
                                        	<div class="row">
                                        		<!--将public/js/home/profile.js中的model($scope.MType)转回此页中，使用l10n内json翻译-->
                                        		<div class="col-sm-3 m-b-xs">
										    		<label style="color: #979da7;" translate="profile.SECTION.Maintenance.apply.table.type.title">Property type</label>
										       		<!--<select class="input-lg form-control w-sm inline v-middle" ng-model="MType"  ng-options="mType.MType as mType.MType for mType in MTypes">
        											</select>-->
		                                    		<select ng-model="MType">
		                                    			<option value="Furniture" translate="profile.SECTION.Maintenance.apply.table.type.option_1"></option>
		                                    			<option value="Appliances" translate="profile.SECTION.Maintenance.apply.table.type.option_2"></option>
		                                    			<option value="Water Supply and Drainage" translate="profile.SECTION.Maintenance.apply.table.type.option_3"></option>
		                                    			<option value="Others" translate="profile.SECTION.Maintenance.apply.table.type.option_4"></option>
		                                    		</select> 
									    		</div>
									    		<!--end-->
									    		<div class="col-sm-9 m-b-xs">
									    			<label for="Feature" style="color: #979da7;" translate="profile.SECTION.Maintenance.apply.table.form.feature">Feature</label>
		                                            <div class="inner-wrap">
		                                                <input aria-required="true" id="Feature" name="Feature"  type="text" ng-model="maintenance.feature">
		                                            </div>
									    		</div>									    		
                                        	</div>
                                        	
                                        </div>
										 <div class="frm-main no-indent">
                                            <label for="Maintenance_Application_Q1" translate="profile.SECTION.Maintenance.apply.table.form.q1">When did the problem start?</label>
                                            <div class="inner-wrap">
                                                <input aria-required="false" id="LastName" name="LastName"   type="text" ng-model="maintenance.q1">
                                            </div>
                                        </div>
                                        <div class="frm-main no-indent">
                                            <label for="Maintenance_Application_Q2" translate="profile.SECTION.Maintenance.apply.table.form.q2">Do you have any idea what cause the problem?</label>
                                            <div class="inner-wrap">
                                                <input aria-required="false" id="LastName" name="LastName"   type="text" ng-model="maintenance.q2">
                                            </div>
                                        </div>
                                        <div class="frm-main no-indent">
                                            <label for="Maintenance_Application_Q3" translate="profile.SECTION.Maintenance.apply.table.form.q3">What were you doing when the problem occurred?</label>
                                            <div class="inner-wrap">
                                                <input aria-required="false" id="LastName" name="LastName"   type="text" ng-model="maintenance.q3">
                                            </div>
                                        </div>
                                        <div class="frm-main no-indent">
                                            <label for="Maintenance_Application_DatePick" translate="profile.SECTION.Maintenance.apply.table.form.date">Available time for a technician comes (please list 3 periods of time):</label>
                                            <div class="inner-wrap">
                                            	<div class="row">
                                            		<div class="col-sm-4">
                                            			<p class="input-group">
											              <input type="text" class="form-control input-lg" datepicker-popup="[:format:]" ng-model="maintenance.dt1" is-open="opened" min-date="minDate" max-date="'2018-06-22'" datepicker-options="dateOptions"  ng-required="true" close-text="Close" />
											              <span class="input-group-btn">
											                <button type="button" class="btn btn-lg btn-default" ng-click="open($event)"><i class="glyphicon glyphicon-calendar"></i></button>
											              </span>
											            </p>  
                                            		</div>
                                            		<div class="col-sm-4">
                                            			<p class="input-group">
											              <input type="text" class="form-control input-lg" datepicker-popup="[:format:]" ng-model="maintenance.dt2" is-open="opened2" min-date="minDate" max-date="'2018-06-22'" datepicker-options="dateOptions"  ng-required="true" close-text="Close" />
											              <span class="input-group-btn">
											                <button type="button" class="btn btn-lg btn-default" ng-click="open2($event)"><i class="glyphicon glyphicon-calendar"></i></button>
											              </span>
											            </p>  
                                            		</div>
                                            		<div class="col-sm-4">
                                            			<p class="input-group">
											              <input type="text" class="form-control input-lg" datepicker-popup="[:format:]" ng-model="maintenance.dt3" is-open="opened3" min-date="minDate" max-date="'2018-06-22'" datepicker-options="dateOptions"  ng-required="true" close-text="Close" />
											              <span class="input-group-btn">
											                <button type="button" class="btn btn-lg btn-default" ng-click="open3($event)"><i class="glyphicon glyphicon-calendar"></i></button>
											              </span>
											            </p>  
                                            		</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="frm-main no-indent">
                                            <label for="Maintenance_Application_Q4" translate="profile.SECTION.Maintenance.apply.table.form.q4">What were you doing when the problem occurred?</label>
                                            <div class="inner-wrap">
                                                <input aria-required="false" id="LastName" name="LastName"   type="text" ng-model="maintenance.q4">
                                            </div>
                                            <div class="inner-wrap">
                                            	<div class="row m-t-md">
                                            		<div class="col-sm-4">                                            			
                                            		</div>
                                            		<div class="col-sm-4">
                                            			 <a id="myBtn" ng-click="submit()" class="btn lowlight" translate="profile.SECTION.Maintenance.apply.table.submit">Submit</a>
                                            		</div>
                                            		<div class="col-sm-4">
                                            			
                                            		</div>
                                            	</div>
                                                
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="tab-pane tabPanel" ng-class="{'active': tabs[4]}">
                    <div class="col-sm-12 tabPanel" id="myProfile" role="tabpanel" aria-hidden="false" aria-labelledby="tab-myProfile">
						<div class="card">
							<div class="inner-wrap clear">
								<header>
									<h3 translate="profile.SECTION.Maintenance.history.title">Maintenance&nbsp;History</h3>									
								</header>
								<div class="content-wrap clear">
									<div class="wrapper-md">
										<div class="panel panel-default">
											<div class="table-responsive">
											<table class="table table-striped m-b-none" style="table-layout:fixed ; width: 100%;">
											  <thead>
												<tr>
												  <!--<th style="width:40px;">CID</th>-->
												  <th style="width:80px;" translate="profile.SECTION.Maintenance.history.table.col1">Service Type</th>
												  <th style="width:80px;" translate="profile.SECTION.Maintenance.history.table.col2">MApplyForm</th>
												  <th style="width:100px;" translate="profile.SECTION.Maintenance.history.table.col3">Mstat</th>
												  <th style="width:80px;" translate="profile.SECTION.Maintenance.history.table.col4">Apply Date</th>
												  <th style="width:80px;" translate="profile.SECTION.Maintenance.history.table.col5">MConfirm</th>
												</tr>
											  </thead>
											  <tbody>
												<tr ng-repeat="data in mtCheckDataResult.data">
												  <!--<td>[:data.CID:]</td>-->
												  <td>[:data.MType:]</td>
												  <!--form btn 预览或下载报修申请表 值为data.MApplyForm即申请表单完整内容-->
												  <td>[:data.MApplyForm:]</td>
												  <!--form end-->
												  <!--process 先使用文字表述，若用进度条表示需要进度类型与值对应转换方法-->
												  <td>
													<!--<div class="progress progress-sm progress-striped active m-t-xs m-b-none">
													  <div class="progress-bar bg-success" data-toggle="tooltip" data-original-title="80%" style="width: 80%"></div>
													</div>-->
													[:data.MStat:]
												  </td>
												  <!--process end-->
												  <td>[:data.MApplyDate:]</td>
												  <td>
												  <a href class="active" ui-toggle-class><i class="fa fa-check text-success text-active"></i><i class="fa fa-times text-danger text"></i></a>
												</td>
												</tr>
											  </tbody>
											</table>
										 	</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				
				 <div class="tab-pane tabPanel" ng-class="{'active': tabs[5]}">
                    <div class="col-sm-12 tabPanel" id="myProfile" role="tabpanel" aria-hidden="false" aria-labelledby="tab-myProfile">
						<div class="card">
							<div class="inner-wrap clear">
								<header>
									<h3 translate="profile.SECTION.Service.apply.title">Service Apply</h3>
								</header>	
								<body><a translate="profile.SECTION.Service.apply.table.tpl"></a></body>
							</div>
						</div>
					</div>
				</div>
				<div class="tab-pane tabPanel" ng-class="{'active': tabs[6]}">
                    <div class="col-sm-12 tabPanel" id="myProfile" role="tabpanel" aria-hidden="false" aria-labelledby="tab-myProfile">
						<div class="card">
							<div class="inner-wrap clear">
								<header>
									<h3 translate="profile.SECTION.Service.history.title">Service History</h3>
								</header>	
								<div class="content-wrap clear">
									<div class="wrapper-md">
										<div class="panel panel-default">
											<div class="table-responsive">
											<table class="table table-striped m-b-none" style="table-layout:fixed ; width: 100%;">
											  <thead>
												<tr>
												  <th style="width:40px;" translate="profile.SECTION.Service.history.table.id">SLID</th>
												  <th style="width:80px;" translate="profile.SECTION.Service.history.table.type">ServiceType</th>
												  <th style="width:80px;" translate="profile.SECTION.Service.history.table.file">ServiceFile</th>
												  <th style="width:100px;" translate="profile.SECTION.Service.history.table.comment">ServiceComment</th>
												  <th style="width:80px;" translate="profile.SECTION.Service.history.table.date">Service Date</th>
												  <th style="width:40px;" translate="profile.SECTION.Service.history.table.status">ServiceSate</th>
												</tr>
											  </thead>
											  <tbody>
												<tr ng-repeat="data in serviceHistoryData.data">
												  <td>[:data.SLID:]</td>
												  <td>[:data.ServiceType:]</td>
												  <!--file btn 下载文件备份，值为文件存储路径不显示-->
												  <td>[:data.ServiceFile:]</td>
												  <!--file end-->
												  <td>[:data.ServiceComment:]</td>
												  <td>[:data.ServiceDate:]</td>
												  <td>
												  <a href class="active" ui-toggle-class><i class="fa fa-check text-success text-active"></i><i class="fa fa-times text-danger text"></i></a>
												</td>
												</tr>
											  </tbody>
											</table>
										 	</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			  	<div class="tab-pane tabPanel" ng-class="{'active': tabs[7]}">
                    <div class="col-sm-12 tabPanel" id="myProfile" role="tabpanel" aria-hidden="false" aria-labelledby="tab-myProfile">
						<div class="card">
							<div class="inner-wrap clear">
								<header>
									<h3 translate="profile.SECTION.Message.title">Messages</h3>
								</header>	
								<div class="content-wrap clear">
									<div class="wrapper-md">
										<div class="panel panel-default">
											<div class="table-responsive">
											<table class="table table-striped m-b-none" style="table-layout:fixed ; width: 100%;">
											  <thead>
												<tr>
												  <th style="width:80px;" translate="profile.SECTION.Message.table.title">Title</th>
												  <th style="width:200px;" translate="profile.SECTION.Message.table.content">Content</th>
												  <th style="width:120px;" translate="profile.SECTION.Message.table.time">CreateTime</th>
												  <th style="width:100px;" translate="profile.SECTION.Message.table.confirm">Confirm</th>
												</tr>
											  </thead>
											  <tbody>
												<tr ng-repeat="data in messageData.data">
												  <td>[:data.title:]</td>
												  <td ng-click="msg_click($index)">[:data.content:]</td>
												  <td>[:data.createTime:]</td>
												  <!--message confirm 调用customercontroller msg_confirm()-->
												  <td>
												  <a href class="active" ui-toggle-class><i class="fa fa-check text-success text-active"></i><i class="fa fa-times text-danger text"></i></a>
												  </td>
												  <!--message confirm end-->
												</tr>
											  </tbody>
											</table>
										 	</div>
										</div>
										
										<!--popup-->
										<div class="popup" ng-show = "msg_content" ng-mouseleave = "msg_content=!msg_content">
											 <div class="m-l-lg panel b-a">
									            <div class="panel-body">
									              <div>[:msg_read.content:]</div>
									              <div class="m-t-sm">
									                <a href ui-toggle-class class="btn btn-default btn-xs active" translate="profile.SECTION.Message.table.confirm">
									                  <i class="fa fa-star-o text-muted text"></i>
									                  <i class="fa fa-star text-danger text-active"></i> 
									                  confirm
									                </a>
									                <a href class="btn btn-default btn-xs" translate="profile.SECTION.Message.reply">
									                  <i class="fa fa-mail-reply text-muted"></i> Reply
									                </a>
									              </div>
									            </div>
									          </div>
										</div>
										<!--popup-->
										
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
               </div>
			</div>
		</div>
	</section>
</div>
