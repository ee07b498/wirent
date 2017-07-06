<div class="my-shortlist cfix" ng-controller="shortlistCtrl">
	<div class="page-inner-wrap cfix">
		<section class="content-wrap main-area">
			<div class="inner-wrap ">
				<div class="row cfix">
					<div class="col-12 ">
						<header class="page cfix">
							<div class="left">
								<h1>Shortlist</h1>
							</div>
							<div class="right">
								<ul class="switchboard">
                    <li class="copy">Filter by</li>
                    <li><a ng-click="entireCheck()" class="btn" data-filter="buy">Entire</a></li>
                    <li><a ng-click="shareCheck()" class="btn selected" data-filter="rent">Share</a></li>
										<li>
										 <a ng-click="sortBy('ER_Price')" class="btn">
												 <i translate="listpage.list.orderBy.price"></i>
											 &nbsp;
												 <span ng-if="orderleft">
													 <i ng-show="sortPrice" class="fa fa-caret-down"></i>
													 <i ng-show="!sortPrice" class="fa fa-caret-up"></i>
											 </span>
										 </a>
									 </li>
									 <li>
										 <a ng-click="sortBy('ER_AvailableDate')" class="btn">
												 <i translate="listpage.list.orderBy.time"></i>
												 &nbsp;
												 <span ng-if="orderright">
											 <i ng-show="sortDate" class="fa fa-caret-down"></i>
													 <i ng-show="!sortDate" class="fa fa-caret-up"></i>
										 </span>
										 </a>
									 </li>
              	</ul>
							</div>
						</header>
					</div>
				</div>
				<div class="row cfix" style="display: block;">
					<ul class="cfix">
					<li class="card listing shortlist clickable" ng-repeat="property in shortlistData track by $index | orderBy: orderName: reverse">
						<script type="text/ng-template" id="myModalCancel.html">
									<div ng-include="'/partials/tpl/modalcancel.html'"></div>
						</script>
						<a class="f-icon shortlist star shortlisted shortlist-ga-tracking" ng-click="remove($index);show=!show;" title="remove from shortlist">
								<span class="icon fill domain-icon-ic_shortlist_selected"></span>
						        <span class="icon outline fa fa-heart" style="color:pink;"></span>
										<!-- <span class="icon outline fa fa-heart-o" ng-show="show" style="color:pink;"></span> -->
						        <span class="invisible">remove from shortlist</span>
						</a>
						<a  class="projectListingsClickThrough" ui-sref="app.details({id:property.ER_ID,name:property.ER_No+' '+property.ER_St+' '+property.ER_Suburb+' '+property.ER_Region})">
					        <div class="media-wrap crop-image" style="overflow: hidden; position: relative;">
					                <img src="[:property.PicFile:]" alt="[:property.ER_No:] [:property.ER_St:], [:property.ER_Suburb:]" style="position: absolute; width: 320px; height: auto; top: -11.5px; left: 0px;">
					        </div>
					    </a>
					    <div class="outer-wrap">
					        <div class="inner-wrap">
					            <a class="projectListingsClickThrough">
					                <div class="price-wrap">
			                        <h4 class="truncate-single">$[:property.ER_Price:]</h4>
					                </div>
			                    <ul class="features">
	                            <li class="truncate-single">[:property.ER_BedRoom:] <i class="fa fa-bed"></i> [:property.ER_BathRoom:] <i class="fa fa-bath"></i> [:property.ER_Parking:] <i class="fa fa-car"></i></li>
	                            <li class="address truncate-single">[:property.ER_No:] [:property.ER_St:], [:property.ER_Suburb:]</li>
			                    </ul>
					                <dl class="cfix">
			                        <dt>Available time</dt>
			                        <dd>[:property.ER_AvailableDate:]</dd>
					                </dl>
					            </a>
					        </div>
			            <div class="toolbar-wrap">
			                    <a ng-click="open()" class="btn btn-success shortlistEnquiry">Enquire now</a>
													<script type="text/ng-template" id="myModalEnquire.html">
																<div ng-include="'/partials/tpl/modalenquire.html'"></div>
													</script>
			                <span class="enquirySendDate" id="enquirySent"></span>
			            </div>
					    </div>
						<!-- <div class="cover" ng-show="show">
							<a></a>
						</div> -->
					</li>
				</ul>
				</div>

			</div>
		</section>

	</div>
</div>
