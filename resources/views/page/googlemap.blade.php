<div ng-controller="MyCtrl as vm" >
			<div class="row clear">
				<div style="position: fixed; top: 50px; right: 0;width:100%; z-index: 100; background-color: #f6f8f8;">
								
								<div>
								<form>
								<ul class="nav navbar-nav more-options">
							          <li class="dropdown pos-stc" dropdown>
							            <a href class="dropdown-toggle" dropdown-toggle>
							              <span>Mega</span> 
							              <span class="caret"></span>
							            </a>
							            <div class="dropdown-menu wrapper w-full bg-white cust-m-t" >
							              <div class="row">
							                <div class="col-sm-4">
							                	
							                  <div class="row">
							                    <div class="col-xs-6 left-li">
							                      <ul class="list-unstyled l-h-2x">
							                        <li>
							                         <label>Price</label>
    												<input type="text" class="form-control input-sm" placeholder="minPrice" aria-describedby="basic-addon1">
							                        </li>
							                        <li>
							                          <label>Beds</label>
        											  <select class="input-sm form-control w-sm inline v-middle" ng-model="minBedNum" ng-options="minBed.num as minBed.num for minBed in bedsNum">
							                          </select>
							                        </li>
							                        <li>
							                          <label>Baths</label>
												        <select class="input-lg form-control w-sm inline v-middle" ng-model="minBathNum" ng-options="minBath.num as minBath.num for minBath in bathsNum"  >
												         
												        </select>
							                        </li>
							                        <li>
							                          <label>Property type</label>
												        <select class="input-lg form-control w-sm inline v-middle" ng-model="myPropertyType"  ng-options="property.propertyType as property.propertyType for property in propertyTypes">
												        </select>
							                        </li>
							                      </ul>
							                    </div>
							                    <div class="col-xs-6 right-li">
							                      <ul class="list-unstyled l-h-2x">
							                        <li>
    												<input type="text" class="form-control input-sm" placeholder="maxPrice" aria-describedby="basic-addon1">
							                        </li>
							                        <li>
        											  <select class="input-lg form-control w-sm inline v-middle" ng-model="maxBedNum" ng-options="maxBed.num as maxBed.num for maxBed in bedsNum">
							                        	</select>
							                        </li>
							                        <li>
												        <select class="input-lg form-control w-sm inline v-middle" ng-model="maxBathNum" ng-options="maxBath.num as maxBath.num for maxBath in bathsNum" >
												        </select>
							                        </li>
							                        <li>
							                          
							                        </li>
							                      </ul>
							                    </div>
							                  </div>
							                </div>
							                <div class="col-sm-4 b-l b-light">
							                  <div class="row">
							                    <div class="col-xs-6 left-li">
							                      <ul class="list-unstyled l-h-2x">
							                        <li>
							                          <label>Parking</label>
												        <select class="input-sm form-control w-sm inline v-middle" ng-model="myParkingNum" ng-options="parking.num as parking.num for parking in parkingsNum" >
												        </select>
							                        </li>
							                        <li>
							                          <label>minArea</label>
												        <select class="input-lg form-control w-sm inline v-middle" ng-model="myParkingNum" ng-options="parking.num as parking.num for parking in parkingsNum" >
												        </select>
							                        </li>
							                        <li>
							                          	<label>features</label>
    													<input type="text" class="form-control input-lg" placeholder="freatures,e.g. pets allowed.." aria-describedby="basic-addon1">
							                        </li>
							                        <li>
							                         <label class="m-t-xxs">Available:</label>
											            <p class="input-group">
											              <input type="text" class="form-control input-sm" datepicker-popup="[:format:]" ng-model="dt" is-open="opened" min-date="minDate" max-date="'2018-06-22'" datepicker-options="dateOptions"  ng-required="true" close-text="Close" />
											              <span class="input-group-btn">
											                <button type="button" class="btn btn-default btn-md" ng-click="open($event)"><i class="glyphicon glyphicon-calendar"></i></button>
											              </span>
											            </p>   
							                        </li>
							                      </ul>
							                    </div>
							                    <div class="col-xs-6 right-li">
							                      <ul class="list-unstyled l-h-2x">
							                        <li>
							                         <select class="input-sm form-control w-sm inline v-middle" ng-model="myParkingNum" ng-options="parking.num as parking.num for parking in parkingsNum" >
        											 </select>
							                        </li>
							                        <li>
												        <select class="input-lg form-control w-sm inline v-middle" ng-model="myParkingNum" ng-options="parking.num as parking.num for parking in parkingsNum" >
												        </select>
							                        </li>
							                        <li>
							                          	<a></a>
							                        </li>
							                        <li>
							                           <label>descriptions</label>
    												   <input type="text" class="form-control input-lg" placeholder="keyword description" aria-describedby="basic-addon1">
							                        </li>
							                      </ul>
							                    </div>
							                  </div>
							                </div>
							                <div class="col-sm-4 b-l m-l-n-xxs">
							                  <div class="row">
							                    <div class="col-xs-6">
							                      <ul class="list-unstyled l-h-2x">
							                      	<li>
							                      	<input type="checkbox" name="featureproductrank" id="featureproductrankRefineCb0" value="premier-only" tabindex="18">
							                      	<label for="featureproductrankRefineCb0">Search only Premiere properties</label>
							                      	</li>
							                      	<li>
							                      		<input type="checkbox" name="allowances" id="allowancesRefineCb1" value="pets-allowed" tabindex="19">
							                      		<label for="allowancesRefineCb1">Pets allowed</label>
							                      	</li>
							                      	<li>
							                      		<input type="checkbox" name="allowances" id="allowancesRefineCb2" value="furnished" tabindex="20">
							                      		<label for="allowancesRefineCb2">Furnished</label>
							                      	</li>
							                      	<li>
							                      		<input type="checkbox" name="allowances" id="allowancesRefineCb3" value="smokers" tabindex="21">
							                      		<label for="allowancesRefineCb3">Smoking permitted</label>
							                      	</li>
							                      	<li>
							                      		<button type="submit" class="button plusplus" tabindex="23"><span>Update search</span></button>
							                      	</li>
							                      </ul>
							                    </div>
							                  </div>
							                </div>
							              </div>
							            </div>
							          </li>
							</ul>
							</form>
							</div>
							<div>
								<form class="navbar-form navbar-form-sm navbar-left shift" ui-shift="prependTo" target=".navbar-collapse" role="search" >
					          <div class="form-group">
					            <div class="input-group">
					              <input type="text" ng-model="selected" typeahead="state for state in states | filter:$viewValue | limitTo:8" class="form-control input-sm bg-light no-border rounded padder" placeholder="Search projects...">
					              <span class="input-group-btn">
					                <button type="submit" class="btn btn-sm bg-light rounded"><i class="fa fa-search"></i></button>
					              </span>
					            </div>
					          </div>
					        </form>
							</div>
							<div class="pull-right b-l" style="margin: 10px;">
								<h5 class="inline m-t-md m-l-sm m-r-sm">385 Properties for rent in Kingsford, NSW, 2032</h5>
								 <ul class="pagination pagination-sm m-t-none m-b-none">
												<li><a href="#"><i class="fa fa-chevron-left"></i></a></li>
												<li><a href>1</a></li>
												<li><a href>2</a></li>
												<li><a href>3</a></li>
												<li><a href>4</a></li>
												<li><a href>5</a></li>
												<li><a href><i class="fa fa-chevron-right"></i></a></li>
								</ul>
							</div>
							
						</div>
					<div class="col-sm-7 pull-left">
						<div class="col-sm-12" style="height: 100%;position: fixed; left: -15px;top: 100px;">
							<ng-map  center="-33.8688197,151.20929550000005" zoom="18" style="height: 538px; width: 64%;">
							<marker id='[:shop.id:]' position="[:shop.position:]" ng-repeat="shop in vm.shops" on-mouseover="vm.showDetail(shop)">
							</marker>
							<info-window id="foo-iw">
								<div ng-non-bindable="">
											<div class="infowindow-container clear">
														<div class="info-left">
															<img src="/img/bandmember.jpg" alt="Avatar" style="width:100px; align-content: center;">
														</div>
														<div class="info-right">
															<p class="price">$585<span>per week</span></p>
														  <p class="address"><span><a ui-sref="details">9/20 harbourne road, Kingsford nsw, australia</span></a></p>
														  <div class="listing-features">
																		<span class="f-icon with-text">
						                            <span class="copy"><em class="ng-binding">2</em></span>
																		<span class="icon fa fa-bed"></span>
																		
																		</span>
																		<span class="f-icon with-text">
						                            <span class="copy"><em class="ng-binding">1</em></span>
																		<span class="icon fa fa-bath"></span>
																		</span>
																		<span class="f-icon with-text">
						                            <span class="copy"><em class="ng-binding">-</em></span>
																		<span class="icon fa fa-car"></span>
																		</span>
																</div>
															</div>
											
											</div>
								</div>
							</info-window>
						</ng-map>
						</div>
						
					</div>
					<div class="col-sm-5 pull-right clear">
						<div class="clear">
								<div class="adv">
									<div class="relative-position">
										<ul>
											<li>
												<div id="box" class="all clear">
													<div class="ad">
														<ul id="imgs">
															<li><img src="img/aa.jpg" /></li>
															<li><img src="img/b1.jpg" /></li>
															<li><img src="img/b2.jpg" /></li>
															<li><img src="img/b3.jpg" /></li>
															<li><img src="img/b4.jpg" /></li>
														</ul>
													</div>
													<div id="arr"><span id="left"><</span><span id="right">></span></div>
												</div>
												<div class="description">
													<div class="info-panel">
														<div class="listing-features rooms">
																				<span class="f-icon with-text">
													                            <span class="copy"><em class="ng-binding">1</em></span>
																									<span class="icon fa fa-bed"></span>
																									</span>
																				<span class="f-icon with-text">
								                            <span class="copy"><em class="ng-binding">1</em></span>
																				<span class="icon fa fa-bath"></span>
																				</span>
																				<span class="f-icon with-text">
								                            <span class="copy"><em class="ng-binding">-</em></span>
																				<span class="icon fa fa-car"></span>
																				</span>
														</div>
														<div class="address">
															<a ui-sref="details">
																<span>harbourne road,</span>
																<span>Kingsford,NSW</span>
															</a>
														</div>
														<div class="benefits">
															<a href class="f-icon with-text train">
								                                <span class="icon "><i class="fa fa-train" aria-hidden="true"></i></span>
								                                <span class="copy">距central station 200米</span>
								                            </a>
								                            <a href class="f-icon with-text bus">
								                                <span class="icon "><i class="fa fa-train" aria-hidden="true"></i></span>
								                                <span class="copy">距bus stop 100米</span>
								                            </a>
															<a href class="f-icon with-text shoping">
								                                <span class="icon "><i class="fa fa-train" aria-hidden="true"></i></span>
								                                <span class="copy">距Coles 500米</span>
								                            </a>
								                            <a href class="f-icon with-text hospital">
								                                <span class="icon "><i class="fa fa-train" aria-hidden="true"></i></span>
								                                <span class="copy">距Hospital 500米</span>
								                            </a>
															
														</div>
														<div class="price">
															<span class="num">$585</span>
															<span class="period">per week</span>
															<span class="available">Available Time:10/02/2017</span>
														</div>
														<div class="view">
															<span class="view-num">Viewed:  20</span>
														</div>
													</div>
							
												</div>
											</li>
											<li>
												<div id="box" class="all clear">
													<div class="ad">
														<ul id="imgs">
															<li><img src="img/aa.jpg" /></li>
															<li><img src="img/b1.jpg" /></li>
															<li><img src="img/b2.jpg" /></li>
															<li><img src="img/b3.jpg" /></li>
															<li><img src="img/b4.jpg" /></li>
														</ul>
													</div>
													<div id="arr"><span id="left"><</span><span id="right">></span></div>
												</div>
												<div class="description">
													<div class="info-panel">
														<div class="listing-features rooms">
																				<span class="f-icon with-text">
													                            <span class="copy"><em class="ng-binding">1</em></span>
																									<span class="icon fa fa-bed"></span>
																									</span>
																				<span class="f-icon with-text">
								                            <span class="copy"><em class="ng-binding">1</em></span>
																				<span class="icon fa fa-bath"></span>
																				</span>
																				<span class="f-icon with-text">
								                            <span class="copy"><em class="ng-binding">-</em></span>
																				<span class="icon fa fa-car"></span>
																				</span>
														</div>
														<div class="address">
															<a ui-sref="details">
																<span>harbourne road,</span>
																<span>Kingsford,NSW</span>
															</a>
														</div>
														<div class="benefits">
															<a href class="f-icon with-text train">
								                                <span class="icon "><i class="fa fa-train" aria-hidden="true"></i></span>
								                                <span class="copy">距central station 200米</span>
								                            </a>
								                            <a href class="f-icon with-text bus">
								                                <span class="icon "><i class="fa fa-train" aria-hidden="true"></i></span>
								                                <span class="copy">距bus stop 100米</span>
								                            </a>
															<a href class="f-icon with-text shoping">
								                                <span class="icon "><i class="fa fa-train" aria-hidden="true"></i></span>
								                                <span class="copy">距Coles 500米</span>
								                            </a>
								                            <a href class="f-icon with-text hospital">
								                                <span class="icon "><i class="fa fa-train" aria-hidden="true"></i></span>
								                                <span class="copy">距Hospital 500米</span>
								                            </a>
															
														</div>
														<div class="price">
															<span class="num">$585</span>
															<span class="period">per week</span>
															<span class="available">Available Time:10/02/2017</span>
														</div>
														<div class="view">
															<span class="view-num">Viewed:  20</span>
														</div>
													</div>
							
												</div>
											</li>
											
										</ul>
									</div>
								</div>
						</div>
						
					</div>
			</div>
			
</div>