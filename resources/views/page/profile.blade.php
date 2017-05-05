<div class="profile" ng-controller="ProfileController">
	<section class="main-area content-wrap">
		<div class="inner-wrap">
			<div class="row">
				<div class="col-sm-12">
                	<h3>My account</h3>
            	</div>
			</div>
			<div class="row">
                <div class="col-sm-12 feedback success" role="alert" style="display:block;">
                    <h4>Success</h4>    
                    <p>Your profile has been updated.</p>
                </div>
                <div class="col-sm-12 w-full feedback error" role="alert" style="display:block;">
                    <h4>That didn't work</h4>
                    
                    <p>Your preferences have not been updated, please try again.</p>
                </div>
            </div>
            <div class="row">
            	<div class="col-sm-3 profile-nav">
                    <ul class="tabNav" role="tablist">
                        <li ng-class="{'active': tabs[0]}" class="active" role="presentation">
                            <a href ng-click="tab(0)" class="f-icon with-text" id="tab-myProfile" role="tab" aria-active="true" tabindex="0">
                                <span class="icon fa fa-user"></span>
                                <span class="copy">My profile</span>
                            </a>
                        </li>
                        <li ng-class="{'active': tabs[1]}" role="presentation">
                            <a href ng-click="tab(1)" class="f-icon with-text" id="tab-emailPreferences" role="tab" aria-active="false" tabindex="-1">
                                <span class="icon "><i class="fa fa-dollar" aria-hidden="true"></i></span>
                                <span class="copy">My Payments</span>
                            </a>
                        </li>
                         <li ng-class="{'active': tabs[2]}" role="presentation">
                            <a href ng-click="tab(2)" class="f-icon with-text" id="tab-emailPreferences" role="tab" aria-active="false" tabindex="-1">
                                <span class="icon "><i class="fa fa-suitcase" aria-hidden="true"></i></span>
                                <span class="copy">Property Management</span>
                            </a>
                        </li>
                        <li ng-class="{'active': tabs[3]}" role="presentation">
                            <a href ng-click="tab(3)" class="f-icon with-text" id="tab-emailPreferences" role="tab" aria-active="false" tabindex="-1">
                                <span class="icon "><i class="fa fa-suitcase" aria-hidden="true"></i></span>
                                <span class="copy">Repair & Service</span>
                            </a>
                        </li>
						 <li ng-class="{'active': tabs[4]}" role="presentation">
                            <a href ng-click="tab(4)" class="f-icon with-text" id="tab-emailPreferences" role="tab" aria-active="false" tabindex="-1">
                                <span class="icon "><i class="fa fa-suitcase" aria-hidden="true"></i></span>
                                <span class="copy">Service History</span>
                            </a>
                        </li>
                    </ul>
                </div>
                
               <div class="col-sm-9 tab-content "> 
                <div class="tab-pane tabPanel active profile-detail" ng-class="{'active': tabs[0]}">
                    <div class="tab-pane tabPanel active" id="myProfile" role="tabpanel" aria-hidden="false" aria-labelledby="tab-myProfile">
                    <div class="card">
                        <div class="inner-wrap clear">

                            <header>
                                <h3>My profile</h3>
                                
                            </header>

                            <div class="content-wrap">
                                <div class="frm-main no-indent">
                                    <div class="inner-wrap">
                                        <a id="myBtn" class="btn lowlight">Edit Profile</a>
                                    </div>
                                    <!-- The Modal -->
									<div id="myModal" class="modal">
									
									  <!-- Modal content -->
									  <div class="modal-content">
									    <div class="modal-header">
									      <span class="close">&times;</span>
									      <h2>Modal Header</h2>
									    </div>
									    <div class="modal-body">
									      <p>Some text in the Modal Body</p>
									      <p>Some other text...</p>
									    </div>
									    <div class="modal-footer">
									      <h3>Modal Footer</h3>
									    </div>
									  </div>
	
									</div>
                                </div>
                            </div>

                            <div class="content-wrap profile-detail clear">

                                <div class="half">

                                    <fieldset>
                                        <div class="frm-main no-indent">
                                            <label for="FirstName">First name</label>
                                            <div class="inner-wrap">
                                                <input aria-required="false" id="FirstName" name="FirstName" readonly="readonly" type="text" value="Ran">
                                            </div>
                                        </div>
                                        <div class="frm-main no-indent">
                                            <label for="LastName">Last name</label>
                                            <div class="inner-wrap">
                                                <input aria-required="false" id="LastName" name="LastName" readonly="readonly" type="text" value="Sun">
                                            </div>
                                        </div>
                                        <div class="frm-main no-indent">
                                            <label for="Phone">Phone</label>
                                            <div class="inner-wrap">
                                                <input aria-required="false" id="Phone" name="Phone" readonly="readonly" type="text" value="0424909328">
                                            </div>
                                        </div>
                                        <div class="frm-main no-indent">
                                            <label for="CurrStat">CurrentState</label>
                                            <div class="inner-wrap">
                                                <input aria-required="false" id="CurrStat" name="CurrStat" readonly="readonly" type="text" value="Citizen">
                                            </div>
                                        </div>
                                        <div class="frm-main no-indent">
                                            <label for="IDType">IDType</label>
                                            <div class="inner-wrap">
                                                <input aria-required="false" id="IDType" name="IDType" readonly="readonly" type="text" readonly="readonly" type="text" value="">
                                            </div>
                                        </div>
                                         <div class="frm-main no-indent">
                                            <label for="Income">Income</label>
                                            <div class="inner-wrap">
                                                <input aria-required="false" id="Income" name="Income" readonly="readonly" type="text" readonly="readonly" type="text" value="">
                                            </div>
                                        </div>
                                        <div class="frm-main no-indent">
                                            <label for="Saving">Saving</label>
                                            <div class="inner-wrap">
                                                <input aria-required="false" id="Saving" name="Saving" readonly="readonly" type="text" readonly="readonly" type="text" value="">
                                            </div>
                                        </div>
                                        <div class="frm-main no-indent">
                                            <label for="PartenerID">PartenerID</label>
                                            <div class="inner-wrap">
                                                <input aria-required="false" id="PartenerID" name="PartenerID" readonly="readonly" type="text" readonly="readonly" type="text" value="">
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>

                                <div class="half">
                                    <fieldset>
                                    	 <div class="frm-main no-indent">
                                            <label for="Gender">Gender</label>
                                            <div class="inner-wrap">
                                                <input aria-required="false" id="Gender" name="Gender" readonly="readonly" type="text" readonly="readonly" type="text" value="">
                                            </div>
                                        </div>
                                        <div class="frm-main no-indent">
                                            <label for="Age">Age</label>
                                            <div class="inner-wrap">
                                                <input aria-required="false" id="Age" name="Age" readonly="readonly" type="text" readonly="readonly" type="text" value="">
                                            </div>
                                        </div>
                                         <div class="frm-main no-indent">
                                            <label for="Work">Work</label>
                                            <div class="inner-wrap">
                                                <input aria-required="false" id="Work" name="Work" readonly="readonly" type="text" readonly="readonly" type="text" value="">
                                            </div>
                                        </div>
                                        <div class="frm-main no-indent">
                                            <label for="Pet">Pet</label>
                                            <div class="inner-wrap">
                                                <input aria-required="false" id="Pet" name="Pet" readonly="readonly" type="text" readonly="readonly" type="text" value="">
                                            </div>
                                        </div>
                                        <div class="frm-main no-indent">
                                            <label for="Smoking">Smoking</label>
                                            <div class="inner-wrap">
                                                <input aria-required="false" id="Smoking" name="Smoking" readonly="readonly" type="text" readonly="readonly" type="text" value="">
                                            </div>
                                        </div>
                                        <div class="frm-main no-indent">
                                            <label for="Budget">Budget</label>
                                            <div class="inner-wrap">
                                                <input aria-required="false" id="Budget" name="Budget" readonly="readonly" type="text" readonly="readonly" type="text" value="">
                                            </div>
                                        </div>
                                        <div class="frm-main no-indent">
                                            <label for="Password">Password</label>
                                            <div class="inner-wrap">
                                                <input aria-required="false" id="Password" name="Password" readonly="readonly" type="text" readonly="readonly" type="text" value="">
                                            </div>
                                        </div>
                                        <div class="frm-main no-indent">
                                            <label for="EmailAddress">Email address</label>
                                            <div class="inner-wrap">
                                                <input aria-required="true" id="EmailAddress" name="EmailAddress" readonly="readonly" type="text" value="464824361@qq.com">
                                            </div>
                                        </div>
                                        <div class="frm-main no-indent">
                                            <div class="inner-wrap">
                                                <a href="javascript:;" class="btn lowlight ">Reset</a>
                                                 <a href="javascript:;" class="btn lowlight">Save</a>
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
									<h3>My Payments</h3>									
								</header>
								
								<div class="content-wrap clear">
									<div class="wrapper-md">
								  <div class="panel panel-default">
									<div class="panel-heading">
									  Here are the payments list:
									</div>
									<div class="panel-body b-b b-light">
									  Search: <input id="filter" type="text" class="form-control input-sm w-sm inline m-r" placeholder="input the date to search"/>
									</div>
									<div>
									  <table class="table m-b-none"  data-filter="#filter" data-page-size="5">
										<thead>
										  <tr>
											  <th data-toggle="true">
												 Name
											  </th>
											  <th>
												  Start Date
											  </th>
											  <th data-hide="phone,tablet">
												  End Date
											  </th>
											  <th data-hide="phone,tablet" data-name="Date Of Birth">
												  Address
											  </th>
											  <th data-hide="phone">
												  Status
											  </th>
										  </tr>
										</thead>
										<tbody>
										  <tr>
											  <td>Andy</td>
											  <td>2017-01-12</td>
											  <td>2017-02-12</td>
											  <td data-value="78025368997">9/20 Harbourne Road Kingsford</td>
											  <td data-value="1"><span class="label bg-success" title="Active">Paied</span></td>
										  </tr>
										  <tr>
											  <td>Andy</td>
											  <td>2017-01-12</td>
											  <td>2017-02-12</td>
											  <td data-value="78025368997">9/20 Harbourne Road Kingsford</td>
											  <td data-value="1"><span class="label bg-success" title="Active">Paied</span></td>
										  </tr>
										  <tr>
											  <td>Andy</td>
											  <td>2017-01-12</td>
											  <td>2017-02-12</td>
											  <td data-value="78025368997">9/20 Harbourne Road Kingsford</td>
											  <td data-value="1"><span class="label bg-warning" title="Pending">Pending</span></td>
										  </tr>
										  <tr>
											  <td>Andy</td>
											  <td>2017-01-12</td>
											  <td>2017-02-12</td>
											  <td data-value="78025368997">9/20 Harbourne Road Kingsford</td>
											  <td data-value="1"><span class="label bg-success" title="Active">Paied</span></td>
										  </tr>
										  <tr>
											  <td>Andy</td>
											  <td>2017-01-12</td>
											  <td>2017-02-12</td>
											  <td data-value="78025368997">9/20 Harbourne Road Kingsford</td>
											  <td data-value="1"><span class="label bg-success" title="Active">Paied</span></td>
										  </tr>
										  <tr>
											  <td>Andy</td>
											  <td>2017-01-12</td>
											  <td>2017-02-12</td>
											  <td data-value="78025368997">9/20 Harbourne Road Kingsford</td>
											  <td data-value="1"><span class="label bg-warning" title="Pending">Pending</span></td>
										  </tr>
										  <tr>
											  <td>Andy</td>
											  <td>2017-01-12</td>
											  <td>2017-02-12</td>
											  <td data-value="78025368997">9/20 Harbourne Road Kingsford</td>
											  <td data-value="1"><span class="label bg-success" title="Active">Paied</span></td>
										  </tr>
										  <tr>
											  <td>Andy</td>
											  <td>2017-01-12</td>
											  <td>2017-02-12</td>
											  <td data-value="78025368997">9/20 Harbourne Road Kingsford</td>
											  <td data-value="1"><span class="label bg-warning" title="Pending">Pending</span></td>
										  </tr>
										  <tr>
											  <td>Andy</td>
											  <td>2017-01-12</td>
											  <td>2017-02-12</td>
											  <td data-value="78025368997">9/20 Harbourne Road Kingsford</td>
											  <td data-value="1"><span class="label bg-success" title="Active">Paied</span></td>
										  </tr>
										  <tr>
											  <td>Andy</td>
											  <td>2017-01-12</td>
											  <td>2017-02-12</td>
											  <td data-value="78025368997">9/20 Harbourne Road Kingsford</td>
											  <td data-value="1"><span class="label bg-success" title="Active">Paied</span></td>
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
								<header>
									<h3>My Rental</h3>									
								</header>
								<div class="wrapper-md">
									 <div class="panel panel-default">
										<div class="panel-heading">
										  My Rental Property List
										</div>
										
										<div class="table-responsive">
										  <table class="table table-striped b-t b-light">
											<thead>
											  <tr>
												<th style="width:20px;">
												  <label class="i-checks m-b-none">
													<input type="checkbox"><i></i>
												  </label>
												</th>
												<th>Property</th>
												<th>Rental(Week)</th>
												<th>Contract End Date</th>
												<th style="width:30px;">state</th>
											  </tr>
											</thead>
											<tbody>
											  <tr>
												<td><label class="i-checks m-b-none"><input type="checkbox" name="post[]"><i></i></label></td>
												<td>9/20 harbourne road kingsford</td>
												<td>$650</td>
												<td>Jul-25-2013</td>
												<td>
												  <a href class="active" ui-toggle-class><i class="fa fa-check text-success text-active"></i><i class="fa fa-times text-danger text"></i></a>
												</td>
											  </tr>
											  <tr>
												<td><label class="i-checks m-b-none"><input type="checkbox" name="post[]"><i></i></label></td>
												<td>9/20 harbourne road kingsford</td>
												<td>$650</td>
												<td>Jul-22-2013</td>
												<td>
												  <a href ui-toggle-class><i class="fa fa-check text-success text-active"></i><i class="fa fa-times text-danger text"></i></a>
												</td>
											  </tr>
											  <tr>
												<td><label class="i-checks m-b-none"><input type="checkbox" name="post[]"><i></i></label></td>
												<td>9/20 harbourne road kingsford</td>
												<td>$650</td>
												<td>Jul-15-2013</td>
												<td>
												  <a href class="active" ui-toggle-class><i class="fa fa-check text-success text-active"></i><i class="fa fa-times text-danger text"></i></a>
												</td>
											  </tr>
											  <tr>
												<td><label class="i-checks m-b-none"><input type="checkbox" name="post[]"><i></i></label></td>
												<td>9/20 harbourne road kingsford</td>
												<td>$650</td>
												<td>Jul-11-2013</td>
												<td>
												  <a href class="active" ui-toggle-class><i class="fa fa-check text-success text-active"></i><i class="fa fa-times text-danger text"></i></a>
												</td>
											  </tr>
											  <tr>
												<td><label class="i-checks m-b-none"><input type="checkbox" name="post[]"><i></i></label></td>
												<td>9/20 harbourne road kingsford</td>
												<td>$650</td>
												<td>Jul-7-2013</td>
												<td>
												  <a href class="active" ui-toggle-class><i class="fa fa-check text-success text-active"></i><i class="fa fa-times text-danger text"></i></a>
												</td>
											  </tr>
											  <tr>
												<td><label class="i-checks m-b-none"><input type="checkbox" name="post[]"><i></i></label></td>
												<td>9/20 harbourne road kingsford</td>
												<td>$650</td>
												<td>Jul-3-2013</td>
												<td>
												  <a href class="active" ui-toggle-class><i class="fa fa-check text-success text-active"></i><i class="fa fa-times text-danger text"></i></a>
												</td>
											  </tr>
											  <tr>
												<td><label class="i-checks m-b-none"><input type="checkbox" name="post[]"><i></i></label></td>
												<td>9/20 harbourne road kingsford</td>
												<td>$650</td>
												<td>Jul-2-2013</td>
												<td>
												  <a href class="active" ui-toggle-class><i class="fa fa-check text-success text-active"></i><i class="fa fa-times text-danger text"></i></a>
												</td>
											  </tr>
											  <tr>
												<td><label class="i-checks m-b-none"><input type="checkbox" name="post[]"><i></i></label></td>
												<td>9/20 harbourne road kingsford</td>
												<td>$650</td>
												<td>Jul-1-2013</td>
												<td>
												  <a href class="active" ui-toggle-class><i class="fa fa-check text-success text-active"></i><i class="fa fa-times text-danger text"></i></a>
												</td>
											  </tr>
											</tbody>
										  </table>
										</div>
										<footer class="panel-footer">
										  <div class="row">
											<div class="col-sm-4 text-center">
											  <small class="text-muted inline m-t-sm m-b-sm">showing 1-10 of 50 items</small>
											</div>
											<div class="col-sm-8 text-right text-center-xs">                
											  <ul class="pagination pagination-sm m-t-none m-b-none">
												<li><a href><i class="fa fa-chevron-left"></i></a></li>
												<li><a href>1</a></li>
												<li><a href>2</a></li>
												<li><a href>3</a></li>
												<li><a href>4</a></li>
												<li><a href>5</a></li>
												<li><a href><i class="fa fa-chevron-right"></i></a></li>
											  </ul>
											</div>
										  </div>
										</footer>
									  </div>

								</div>
							</div>
						</div>
					</div>
					</div>
				 <div class="tab-pane tabPanel" ng-class="{'active': tabs[3]}">
                    <div class="col-sm-12 tabPanel" id="myProfile" role="tabpanel" aria-hidden="false" aria-labelledby="tab-myProfile">
						<div class="card">
							<div class="inner-wrap clear">
								<header>
									<h3>Repair & Service Application Form</h3>
									
								</header>
								<div class="content-wrap clear">

                                <div class="">

                                    <fieldset>
                                        <div class="frm-main no-indent">
                                            <label for="FirstName">First name</label>
                                            <div class="inner-wrap">
                                                <input aria-required="false" id="FirstName" name="FirstName"  readonly="readonly" type="text" value="Ran">
                                            </div>
                                        </div>
                                        <div class="frm-main no-indent">
                                            <label for="LastName">Last name</label>
                                            <div class="inner-wrap">
                                                <input aria-required="false" id="LastName" name="LastName"  readonly="readonly" type="text" value="Sun">
                                            </div>
                                        </div>
                                       
										 <div class="frm-main no-indent">
                                            <label for="LastName">Property Address</label>
                                            <div class="inner-wrap">
                                                <input aria-required="false" id="LastName" name="LastName"  readonly="readonly" type="text" value="Sun">
                                            </div>
                                        </div>
                                        <div class="frm-main no-indent">
                                            <label for="Phone">Phone</label>
                                            <div class="inner-wrap">
                                                <input aria-required="false" id="Phone" name="Phone" readonly="readonly" type="text" value="0424909328">
                                            </div>
                                        </div>
										<div class="frm-main no-indent">
                                            <label for="Password">Password</label>
                                            <div class="inner-wrap">
                                                <input aria-required="false" id="Password" name="Password" readonly="readonly" type="text" readonly="readonly" type="text" value="">
                                            </div>
                                        </div>
                                        <div class="frm-main no-indent">
                                            <label for="EmailAddress">Email address</label>
                                            <div class="inner-wrap">
                                                <input aria-required="true" id="EmailAddress" name="EmailAddress" readonly="readonly" type="text" value="464824361@qq.com">
                                            </div>
                                        </div>
										 <div class="frm-main no-indent">
                                            <label for="LastName">When did the problem start?</label>
                                            <div class="inner-wrap">
                                                <input aria-required="false" id="LastName" name="LastName"   type="text" value="Sun">
                                            </div>
                                        </div>
                                        <div class="frm-main no-indent">
                                            <label for="LastName">Do you have any idea what cause the problem?</label>
                                            <div class="inner-wrap">
                                                <input aria-required="false" id="LastName" name="LastName"   type="text" value="Sun">
                                            </div>
                                        </div>
                                        <div class="frm-main no-indent">
                                            <label for="LastName">What were you doing when the problem occurred?</label>
                                            <div class="inner-wrap">
                                                <input aria-required="false" id="LastName" name="LastName"   type="text" value="Sun">
                                            </div>
                                        </div>
                                        <div class="frm-main no-indent">
                                            <label for="LastName">Available time for a technician comes (please list 3 periods of time):</label>
                                            <div class="inner-wrap">
                                            	<div class="row">
                                            		<div class="col-sm-4">
                                            			<p class="input-group">
											              <input type="text" class="form-control input-lg" datepicker-popup="[:format:]" ng-model="dt" is-open="opened" min-date="minDate" max-date="'2018-06-22'" datepicker-options="dateOptions"  ng-required="true" close-text="Close" />
											              <span class="input-group-btn">
											                <button type="button" class="btn btn-lg btn-default" ng-click="open($event)"><i class="glyphicon glyphicon-calendar"></i></button>
											              </span>
											            </p>  
                                            		</div>
                                            		<div class="col-sm-4">
                                            			<p class="input-group">
											              <input type="text" class="form-control input-lg" datepicker-popup="[:format:]" ng-model="dt" is-open="opened" min-date="minDate" max-date="'2018-06-22'" datepicker-options="dateOptions"  ng-required="true" close-text="Close" />
											              <span class="input-group-btn">
											                <button type="button" class="btn btn-lg btn-default" ng-click="open($event)"><i class="glyphicon glyphicon-calendar"></i></button>
											              </span>
											            </p>  
                                            		</div>
                                            		<div class="col-sm-4">
                                            			<p class="input-group">
											              <input type="text" class="form-control input-lg" datepicker-popup="[:format:]" ng-model="dt" is-open="opened" min-date="minDate" max-date="'2018-06-22'" datepicker-options="dateOptions"  ng-required="true" close-text="Close" />
											              <span class="input-group-btn">
											                <button type="button" class="btn btn-lg btn-default" ng-click="open($event)"><i class="glyphicon glyphicon-calendar"></i></button>
											              </span>
											            </p>  
                                            		</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="frm-main no-indent">
                                            <label for="LastName">What were you doing when the problem occurred?</label>
                                            <div class="inner-wrap">
                                            	<div class="row">
                                            		<div class="col-sm-4">
                                            			
                                            		</div>
                                            		<div class="col-sm-4">
                                            			 <a id="myBtn" class="btn lowlight">Submit</a>
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
									<h3>Service History</h3>
									
								</header>
								<div class="content-wrap clear">
									<div class="wrapper-md">
										<div class="panel panel-default">
											<div class="panel-heading">
											  <span class="label bg-danger pull-right m-t-xs">1 left</span>
											  Tasks
											</div>
											<table class="table table-striped m-b-none">
											  <thead>
												<tr>
												  <th>Service Type</th>
												  <th>Progress</th>
												  <th>Apply Date</th>
												  <th style="width:30px;">state</th>
												</tr>
											  </thead>
											  <tbody>
												<tr>
												  <td>Plumb Repair</td>
												  <td>
													<div class="progress progress-sm progress-striped active m-t-xs m-b-none">
													  <div class="progress-bar bg-success" data-toggle="tooltip" data-original-title="80%" style="width: 80%"></div>
													</div>
												  </td>
												  <td>21-02-2017</td>
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
			</div>
		</div>
	</section>
</div>
