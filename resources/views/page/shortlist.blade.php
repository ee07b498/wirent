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
	                                <li><a href="javascript:;" class="btn" data-filter="">All</a></li>
	                                <li><a href="javascript:;" class="btn" data-filter="buy">Buy</a></li>
	                                <li><a href="javascript:;" class="btn selected" data-filter="rent">Rent</a></li>
	                                <li><a href="javascript:;" class="btn" data-filter="NewDevelopment">New Homes</a></li>
	                                <li><a href="javascript:;" class="btn" data-filter="share">Share</a></li>
	                                <li><a href="javascript:;" class="btn" data-filter="sold">Sold</a></li>
                            	</ul>
							</div>
						</header>
					</div>
				</div>
				<div class="row cfix" style="display: block;">
					<ul class="cfix">
					<li class="card listing shortlist clickable" ng-repeat="(key,value) in shortlistData track by $index">
						<a class="f-icon shortlist star shortlisted shortlist-ga-tracking" ng-click="remove(value[0].ER_ID)" title="remove from shortlist">        
								<span class="icon fill domain-icon-ic_shortlist_selected"></span>
						        <span class="icon outline fa fa-star"></span>
						        <span class="invisible">remove from shortlist</span>
						</a>
						<a href="#" class="projectListingsClickThrough">
					        <div class="media-wrap crop-image" style="overflow: hidden; position: relative;">
					                <img src="[:value[0].PicFile:]" alt="61 Cottenham Avenue, Kingsford" class="" style="position: absolute; width: 320px; height: auto; top: -11.5px; left: 0px;">
					        </div>
					    </a>
					    <div class="outer-wrap">
					        <div class="inner-wrap">
					            <a href="#" class="projectListingsClickThrough">
					                <div class="price-wrap">
					                        <h4 class="truncate-single">$[:value[0].ER_Price:]</h4>
					                </div>
					                    <ul class="features">
					                            <li class="truncate-single">[:value[0].ER_BedRoom:] beds, [:value[0].ER_BathRoom:] baths, [:value[0].ER_Parking:] parking</li>
					                            <li class="address truncate-single">[:value[0].ER_No:] [:value[0].ER_St:], [:value[0].ER_Suburb:]</li>
					                    </ul>
					                <dl class="cfix">
					                    
					                        <dt>Inspection</dt>
					                        <dd>Contact agent</dd>
					                    
					                </dl>
					            </a>
					        </div>
					     
					            <div class="toolbar-wrap">
					                    <a href="#" class="btn-primary shortlistEnquiry">Enquire now</a>
					                
					                <span class="enquirySendDate" id="enquirySent"></span>
					
					            </div>
					    </div>
						
					</li>
				</ul>
				</div>
				
			</div>
		</section>
	
	</div>
</div>