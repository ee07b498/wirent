<div ng-controller="HomeController" class="homepage"> 
	<div class="hero-wrap  transparent-header" style="background-image: url(img/Evergrand1366x614Tiny.jpg);">
 <div style="z-index:999; position:relative;">
		<div class="search-banner">
		<div class="search-options clearfix">
			<div id="search-tabs">
				<div>
					<div id="accommodation-offer" class="btn-group btn-group-justified" style="width:980px;margin:0 auto; border-radius:4px;background:rgba(100,100,100,0.2);">
						<a ng-click="switchCheckBox1()" role="button" ng-class="{'active':active1}" class="btn no" style="border-radius:4px;">I need accommodation</a>
						<a ng-click="switchCheckBox2()" role="button" ng-class="{'active':active2}" class="btn yes" style="border-radius:4px;">I need a flatmate</a>
					</div>
				</div>
			</div>
		</div>
	</div>
  </div>  

<div class="content-wrap search-wrap">
     
   <div class="inner-wrap">
            <div class="card lrg ">
            <div class="inner-wrap">
            <div class="search-bg"></div>
                

<form  ng-show="active1" class="frm-search wide" >  
	
<fieldset class="frm-inline lrg">
        <div class="frm-main no-indent">
            <label class="hide-visually" for="Terms_Mode">Mode</label>
            <select class="modeDropDrown sml ng-pristine ng-valid" ng-model="myMode" ng-options="mode.name as mode.name for mode in Modes" id="Terms_Mode" name="Terms.Mode">
				
			</select>
            <label class="hide-visually" for="Terms_Suburb">Suburb(s), postcode or Property ID</label>
            <div class="search-input-wrap">
                <input class="SearchAutoComplete SearchAutoCompleteTokenizer" name="inputStr" data-val="true" data-val-required="Please choose a location to search." ng-minlength="2"  ng-model="inputStr" ng-change="sendMsg()" id="tbSuburbName" name="Terms.Suburb" placeholder="Search by suburb, region, postcode or address" type="text" value="" />
                <div ng-show="inputStr.$error.minlength&&inputStr.$dirty">最小长度为2</div>
                <span class="field-validation-valid" data-valmsg-for="Terms.Suburb" data-valmsg-replace="true"></span>
                <span class="field-validation-valid" data-valmsg-for="Terms.PriceFrom" data-valmsg-replace="true"></span>
            </div>
            <button type="submit" name="Search" value="Search" ng-click="entireSearch()" id="Search" class="btn lrg searchButton domain-icon-ic_arrow-right">Search &nbsp;<a style="color:white;"><i class="fa fa-search fa-lg" aria-hidden="true"></i></a></button>
        </div>
	<input data-val="true" data-val-required="The Surrounding suburbs field is required." id="Terms_SurroundingSuburbs" name="Terms.SurroundingSuburbs" type="hidden" value="True" />    </fieldset>
    <div id="searchOptionsPlaceHolder">
        <fieldset class="frm-inline med col5 toggle-content">		
            <div class="frm-main multi-inputs no-indent">
                <label for="Terms_PropertyTypes">Property type</label>        
                <select ng-model="myPropertyType" class="Terms_PropertyTypes" ng-options="property.propertyType as property.propertyType for property in propertyTypes">
				
				</select>			
			</div>
            <div class="frm-main no-indent">
                <label for="Terms_PriceFrom">Price min</label>
                <select id="Terms_PriceFrom" ng-model="myMinPrice" ng-options="minPrice.price as minPrice.price for minPrice in minPrices" name="Terms.PriceFrom">
						
				</select>
            </div>
            <div class="frm-main no-indent">
                <label for="Terms_PriceTo">Price max</label>
                <select id="Terms_PriceTo" ng-model="myMaxPrice" ng-options="maxPrice.price as maxPrice.price for maxPrice in maxPrices" name="Terms.PriceTo"><option value="">Any</option>
					
				</select>
            </div>
            <div class="frm-main no-indent">
                <label for="Terms_Bedrooms">minBeds</label>
                <select id="Terms_Bedrooms" ng-model="minBedNum" ng-options="minBed.num as minBed.num for minBed in bedsNum" name="Terms.Bedrooms">
				
				</select>
            </div>
			 <div class="frm-main no-indent">
                <label for="Terms_Bedrooms">maxBeds</label>
                <select id="Terms_Bedrooms" ng-model="maxBedNum" ng-options="maxBed.num as maxBed.num for maxBed in bedsNum" name="Terms.Bedrooms">
				
				</select>
            </div>
            <div class="frm-main no-indent">
                <label for="Terms_Bathrooms">minBaths</label>                
                <select id="Terms_Bathrooms" ng-model="minBathNum" ng-options="minBath.num as minBath.num for minBath in bathsNum" name="Terms.Bathrooms">
				
				</select>
            </div>
			 <div class="frm-main no-indent">
                <label for="Terms_Bathrooms">maxBaths</label>                
                <select id="Terms_Bathrooms" ng-model="maxBathNum" ng-options="maxBath.num as maxBath.num for maxBath in bathsNum" name="Terms.Bathrooms">
				
				</select>
            </div>
            <div class="frm-main no-indent ">
                <label for="Terms_Parking">Parking</label>
                <select id="Terms_Parking" ng-model="myParkingNum" ng-options="parking.num as parking.num for parking in parkingsNum" name="Terms.Parking">
					
				</select>
            </div>
			<div class="frm-main no-indent">
				<label for="tbSuburbName">Keywords</label>
                <input class="SearchAutoComplete SearchAutoCompleteTokenizer" data-val="true" data-val-required="Please input a keyword to search." ng-model="keywords"  id="tbSuburbName" name="Terms.Suburb" placeholder="with furniture, " type="text" value="" />
            </div>
			<div class="frm-main no-indent last">
			<!-- more features-->
			</div>
        </fieldset>
    </div>
</form>

<form  ng-show="active2" class="frm-search wide">  
	
<fieldset class="frm-inline lrg">
        <div class="frm-main no-indent">
            <label class="hide-visually" for="Terms_Mode">Mode</label>
            <select class="modeDropDrown sml" ng-model="myMode" ng-options="mode.name as mode.name for mode in Modes" data-val="true" data-val-required="The Mode field is required." id="Terms_Mode" name="Terms.Mode">
				
			</select>
            <label class="hide-visually" for="Terms_Suburb">Suburb(s), postcode or Property ID</label>
            <div class="search-input-wrap">
                <input class="SearchAutoComplete SearchAutoCompleteTokenizer" data-val="true" data-val-required="Please choose a location to search." id="tbSuburbName" name="Terms.Suburb" ng-model="address" placeholder="Search by suburb, region, postcode or address" type="text" value="" />
                <span class="field-validation-valid" data-valmsg-for="Terms.Suburb" data-valmsg-replace="true"></span>
                <span class="field-validation-valid" data-valmsg-for="Terms.PriceFrom" data-valmsg-replace="true"></span>
            </div>
            <button type="submit" name="Search" value="Search" id="Search" ng-click="shareSearch()" class="btn lrg searchButton domain-icon-ic_arrow-right">Search &nbsp;<a style="color:white;"><i class="fa fa-search fa-lg" aria-hidden="true"></i></a></button>
        </div>
<input data-val="true" data-val-required="The Surrounding suburbs field is required." id="Terms_SurroundingSuburbs" name="Terms.SurroundingSuburbs" type="hidden" value="True" />    </fieldset>
    <div id="searchOptionsPlaceHolder">
        <fieldset class="frm-inline med col5 toggle-content">
             <div class="frm-main multi-inputs no-indent">
                <label for="Terms_PropertyTypes">Property type</label>        
                <select ng-model="myPropertyType" class="Terms_PropertyTypes" ng-options="property.propertyType as property.propertyType for property in propertyTypes">
				
				</select>			
			</div>
            <div class="frm-main no-indent">
                <label for="Terms_PriceFrom">Price min</label>
                <select id="Terms_PriceFrom" ng-model="myMinPrice" ng-options="minPrice.price as minPrice.price for minPrice in minPrices" name="Terms.PriceFrom">
						
				</select>
            </div>
            <div class="frm-main no-indent">
                <label for="Terms_PriceTo">Price max</label>
                <select id="Terms_PriceTo" ng-model="myMaxPrice" ng-options="maxPrice.price as maxPrice.price for maxPrice in maxPrices" name="Terms.PriceTo">
					
				</select>
            </div>
        </fieldset>
    </div>
</form>

<script type="text/javascript">
    $j(document).ready(function () {
        $j("#Search").on('click', function (e) {
            if (window.dataLayer && window.dataLayer.push) {
                window.dataLayer.push({ 'event': 'GAevent', 'eventCategory': 'Sponsorship', 'eventAction': 'Homepage Elevator', 'eventLabel': 'Search Button' });
            }
        });
    });
</script>
            </div>
        </div>
        
    </div>
</div>

        <div id="browse-by-region" class="content-wrap browse-by-region">
            Loading...
        </div>
        <div class="ads" id="elevator-ads-homepage"></div>
    </div>
		<section class="content-wrap main-area redesign" id="main-area">

    

    <section class="latest-news m-b-md">
        <div class="latest-news-inner-wrap cfix">
            <header class="latest-news-header">
                <a href="#" class="latest-news-title-link"><h2 class="latest-news-title">latest news</h2></a>
            </header>
                <article class="latest-news-item">
                    <div class="media-wrap">
                        <a href="#">
                            <img src="https://strap.domain.com.au/domain-homepage/DomainHomePage-17-04-05-03-32-28-0.jpg" alt="After the boom: What it looks like when a bubble bursts">
                        </a>
                    </div>
                    <a class="latest-news-item-title" href="#">After the boom: What it looks like when a bubble bursts</a>                    
                </article>
                <article class="latest-news-item">
                    <div class="media-wrap">
                        <a href="#">
                            <img src="https://strap.domain.com.au/domain-homepage/DomainHomePage-17-04-05-03-32-29-1.jpg" alt="Buying property? You shouldn&amp;#39;t listen to family and friends">
                        </a>
                    </div>
                    <a class="latest-news-item-title" href="#">Buying property? You shouldn&#39;t listen to family and friends</a>                    
                </article>
                <article class="latest-news-item">
                    <div class="media-wrap">
                        <a href="#">
                            <img src="https://strap.domain.com.au/domain-homepage/DomainHomePage-17-04-05-03-32-29-2.jpg" alt="$7 million cottage: Australia&amp;#39;s priciest one-bedroom house?">
                        </a>
                    </div>
                    <a class="latest-news-item-title" href="#">$7 million cottage: Australia&#39;s priciest one-bedroom house?</a>                    
                </article>
                <article class="latest-news-item">
                    <div class="media-wrap">
                        <a href="#">
                            <img src="https://strap.domain.com.au/domain-homepage/DomainHomePage-17-04-05-03-32-29-3.jpg" alt="The kitchen items that are worth splurging on">
                        </a>
                    </div>
                    <a class="latest-news-item-title" href="#">The kitchen items that are worth splurging on</a>                    
                </article>
        </div>
    </section>


    <div id="dream-homes-section" style="display: block;"><section class="dream-homes">
    <h1 class="dream-homes-main-title">Dream Homes</h1>
    <div class="content-wrap dream-homes-container is-carousel">
        <ul class="dream-homes-list" style="width: 4497px; left: 0px;">
				<li class="dream-homes-item " data-adid="2013482649" data-listingtype="Residential" style="width: 499.667px;">
                    <a href="#" class="dream-homes-item-link" data-adid="2013482649" data-listingtype="Residential" data-position="1">
                        <header class="dream-homes-item-header">
                            <span class="dream-homes-item-header-wrap">
                                <h2 class="dream-homes-title">
                                        <span class="dream-homes-title-agency-name">Fletchers  Canterbury</span>
                                    <span class="dream-homes-title-suburb">Balwyn, Vic </span>
                                </h2>
                                        <span class="f-icon with-text">
                                        <span class="copy">
                                            3
                                        </span>
                                        <span class="icon fa fa-bed"></span>
                                    </span> 
                                    <span class="f-icon with-text">
                                        <span class="copy">
                                            3
                                        </span>
                                        <span class="icon fa fa-bath"></span>
                                    </span>
                                    <span class="f-icon with-text">
                                        <span class="copy">
                                            1
                                        </span>
                                        <span class="icon fa fa-car"></span>
                                    </span>
                            </span>
                        </header>
                    </a>
                    <img class="dream-homes-item-img" src="https://strap.domain.com.au/dream-homes-vic/DreamHomes2013482649.jpg" alt="Balwyn, Vic">
                </li>
				<li class="dream-homes-item " data-adid="2013431230" data-listingtype="Residential" style="width: 499.667px;">
                    <a href="#" class="dream-homes-item-link" data-adid="2013431230" data-listingtype="Residential" data-position="2">
                        <header class="dream-homes-item-header">
                            <span class="dream-homes-item-header-wrap">
                                <h2 class="dream-homes-title">
                                        <span class="dream-homes-title-agency-name">Marshall White Stonnington</span>
                                    <span class="dream-homes-title-suburb">Toorak, Vic </span>
                                </h2>
                                        <span class="f-icon with-text">
                                        <span class="copy">
                                            3
                                        </span>
                                        <span class="icon fa fa-bed"></span>
                                    </span> 
                                    <span class="f-icon with-text">
                                        <span class="copy">
                                            2
                                        </span>
                                        <span class="icon fa fa-bath"></span>
                                    </span>
                                    <span class="f-icon with-text">
                                        <span class="copy">
                                            2
                                        </span>
                                        <span class="icon fa fa-car"></span>
                                    </span>
                            </span>
                        </header>
                    </a>
                    <img class="dream-homes-item-img" src="https://strap.domain.com.au/dream-homes-vic/DreamHomes2013431230.jpg" alt="Toorak, Vic">
                </li>
				<li class="dream-homes-item " data-adid="2013160302" data-listingtype="Residential" style="width: 499.667px;">
                    <a href="#" class="dream-homes-item-link" data-adid="2013160302" data-listingtype="Residential" data-position="3">
                        <header class="dream-homes-item-header">
                            <span class="dream-homes-item-header-wrap">
                                <h2 class="dream-homes-title">
                                        <span class="dream-homes-title-agency-name">Marshall White Stonnington</span>
                                    <span class="dream-homes-title-suburb">South Yarra, Vic </span>
                                </h2>
                                        <span class="f-icon with-text">
                                        <span class="copy">
                                            3
                                        </span>
                                        <span class="icon fa fa-bed"></span>
                                    </span> 
                                    <span class="f-icon with-text">
                                        <span class="copy">
                                            3
                                        </span>
                                        <span class="icon fa fa-bath"></span>
                                    </span>
                                    <span class="f-icon with-text">
                                        <span class="copy">
                                            2
                                        </span>
                                        <span class="icon fa fa-car"></span>
                                    </span>
                            </span>
                        </header>
                    </a>
                    <img class="dream-homes-item-img" src="https://strap.domain.com.au/dream-homes-vic/DreamHomes2013160302.jpg" alt="South Yarra, Vic">
                </li>
				<li class="dream-homes-item is-lazy-loading" data-adid="2013336062" data-listingtype="NewDevelopment" style="width: 499.667px;">
                    <a href="#" class="dream-homes-item-link" data-adid="2013336062" data-listingtype="NewDevelopment" data-position="4">
                        <header class="dream-homes-item-header">
                            <span class="dream-homes-item-header-wrap">
                                <h2 class="dream-homes-title">
                                        <span class="dream-homes-title-agency-name">Lechte Corp</span>
                                    <span class="dream-homes-title-suburb">Hawthorn, Vic </span>
                                </h2>
                                        <span class="f-icon with-text">
                                        <span class="copy">
                                            3
                                        </span>
                                        <span class="icon fa fa-bed"></span>
                                    </span> 
                                    <span class="f-icon with-text">
                                        <span class="copy">
                                            2
                                        </span>
                                        <span class="icon fa fa-bath"></span>
                                    </span>
                                    <span class="f-icon with-text">
                                        <span class="copy">
                                            2
                                        </span>
                                        <span class="icon fa fa-car"></span>
                                    </span>
                            </span>
                        </header>
                    </a>
                    <img class="dream-homes-item-img" data-lazy-src="https://strap.domain.com.au/dream-homes-vic/DreamHomes2013336062.jpg" alt="Hawthorn, Vic">
                </li>
				<li class="dream-homes-item is-lazy-loading" data-adid="2013260868" data-listingtype="Residential" style="width: 499.667px;">
                    <a href="#" class="dream-homes-item-link" data-adid="2013260868" data-listingtype="Residential" data-position="5">
                        <header class="dream-homes-item-header">
                            <span class="dream-homes-item-header-wrap">
                                <h2 class="dream-homes-title">
                                    <span class="dream-homes-title-agency-name">Marshall White Stonnington</span>
                                    <span class="dream-homes-title-suburb">Glen Iris, Vic </span>
                                </h2>
                                        <span class="f-icon with-text">
                                        <span class="copy">
                                            3
                                        </span>
                                        <span class="icon fa fa-bed"></span>
                                    </span> 
                                    <span class="f-icon with-text">
                                        <span class="copy">
                                            2
                                        </span>
                                        <span class="icon fa fa-bath"></span>
                                    </span>
                                    <span class="f-icon with-text">
                                        <span class="copy">
                                            2
                                        </span>
                                        <span class="icon fa fa-car"></span>
                                    </span>
                            </span>
                        </header>
                    </a>
                    <img class="dream-homes-item-img" data-lazy-src="https://strap.domain.com.au/dream-homes-vic/DreamHomes2013260868.jpg" alt="Glen Iris, Vic">
                </li>
				<li class="dream-homes-item is-lazy-loading" data-adid="2013498866" data-listingtype="NewDevelopment" style="width: 499.667px;">
                    <a href="#" class="dream-homes-item-link" data-adid="2013498866" data-listingtype="NewDevelopment" data-position="6">
                        <header class="dream-homes-item-header">
                            <span class="dream-homes-item-header-wrap">
                                <h2 class="dream-homes-title">
                                        <span class="dream-homes-title-agency-name">Trenerry Property Group  Pty Ltd</span>
                                    <span class="dream-homes-title-suburb">West Melbourne, Vic </span>
                                </h2>
                                                                    <span class="f-icon with-text">
                                        <span class="copy">
                                            3
                                        </span>
                                        <span class="icon fa fa-bed"></span>
                                    </span> 
                                    <span class="f-icon with-text">
                                        <span class="copy">
                                            2
                                        </span>
                                        <span class="icon fa fa-bath"></span>
                                    </span>
                                    <span class="f-icon with-text">
                                        <span class="copy">
                                            2
                                        </span>
                                        <span class="icon fa fa-car"></span>
                                    </span>
                            </span>
                        </header>
                    </a>
                    <img class="dream-homes-item-img" data-lazy-src="https://strap.domain.com.au/dream-homes-vic/DreamHomes2013498866.jpg" alt="West Melbourne, Vic">
                </li>
				<li class="dream-homes-item is-lazy-loading" data-adid="2013483343" data-listingtype="Residential" style="width: 499.667px;">
                    <a href="#" class="dream-homes-item-link" data-adid="2013483343" data-listingtype="Residential" data-position="7">
                        <header class="dream-homes-item-header">
                            <span class="dream-homes-item-header-wrap">
                                <h2 class="dream-homes-title">
                                        <span class="dream-homes-title-agency-name">Fletchers  Canterbury</span>
                                    <span class="dream-homes-title-suburb">Surrey Hills, Vic </span>
                                </h2>
                                        <span class="f-icon with-text">
                                        <span class="copy">
                                            5
                                        </span>
                                        <span class="icon fa fa-bed"></span>
                                    </span> 
                                    <span class="f-icon with-text">
                                        <span class="copy">
                                            4
                                        </span>
                                        <span class="icon fa fa-bath"></span>
                                    </span>
                                    <span class="f-icon with-text">
                                        <span class="copy">
                                            3
                                        </span>
                                        <span class="icon fa fa-car"></span>
                                    </span>
                            </span>
                        </header>
                    </a>
                    <img class="dream-homes-item-img" data-lazy-src="https://strap.domain.com.au/dream-homes-vic/DreamHomes2013483343.jpg" alt="Surrey Hills, Vic">
                </li>
				<li class="dream-homes-item is-lazy-loading" data-adid="1785" data-listingtype="Project" style="width: 499.667px;">
                    <a href="#" class="dream-homes-item-link" data-adid="1785" data-listingtype="Project" data-position="8">
                        <header class="dream-homes-item-header">
                            <span class="dream-homes-item-header-wrap">
                                <h2 class="dream-homes-title">
                                        <span class="dream-homes-title-project-name">Collins Arch</span>
                                    <span class="dream-homes-title-suburb">Melbourne, Vic </span>
                                </h2>
                                    <span class="dream-homes-project-agency-name">Colliers l Collins Arch</span>
                                                            </span>
                        </header>
                    </a>
                    <img class="dream-homes-item-img" data-lazy-src="https://strap.domain.com.au/dream-homes-vic/DreamHomes1785.jpg" alt="Melbourne, Vic">
                </li>
				<li class="dream-homes-item is-lazy-loading" data-adid="2013491279" data-listingtype="NewDevelopment" style="width: 499.667px;">
                    <a href="#" class="dream-homes-item-link" data-adid="2013491279" data-listingtype="NewDevelopment" data-position="9">
                        <header class="dream-homes-item-header">
                            <span class="dream-homes-item-header-wrap">
                                <h2 class="dream-homes-title">
                                        <span class="dream-homes-title-agency-name">Protec Property Group | Illusso</span>
                                    <span class="dream-homes-title-suburb">Kew, Vic </span>
                                </h2>
                                                                    <span class="f-icon with-text">
                                        <span class="copy">
                                            3
                                        </span>
                                        <span class="icon fa fa-bed"></span>
                                    </span> 
                                    <span class="f-icon with-text">
                                        <span class="copy">
                                            2
                                        </span>
                                        <span class="icon fa fa-bath"></span>
                                    </span>
                                    <span class="f-icon with-text">
                                        <span class="copy">
                                            2
                                        </span>
                                        <span class="icon fa fa-car"></span>
                                    </span>
                            </span>
                        </header>
                    </a>
                    <img class="dream-homes-item-img" data-lazy-src="https://strap.domain.com.au/dream-homes-vic/DreamHomes2013491279.jpg" alt="Kew, Vic">
                </li>
        </ul>
        <a href="javascript:;" class="dream-homes-prev-btn" style="display: none;">
            <span class="icon fa fa-chevron-circle-left"></span><span class="hide-visually">previous</span>
        </a>
        <a href="javascript:;" class="dream-homes-next-btn" style="display: block;">
            <span class="icon fa fa-chevron-circle-right"></span><span class="hide-visually">next</span>
        </a>
    </div>
</section>

<script src="js/index.js"></script>    
</div>

    		<div id="adspot-970x250_728x90-pos-1" class="btf-ad ad">
			<script type="text/javascript">
				var titan = window.titan || {};
				if (false) {
					titan.requestConditionalAd = titan.requestConditionalAd || [];
					titan.requestConditionalAd.push("adspot-970x250_728x90-pos-1");
				} else {
					titan.requestAd = titan.requestAd || [];
					titan.requestAd.push("adspot-970x250_728x90-pos-1");
				}
			</script>
		</div>



    <div id="contentblock-section"></div>
    
  </section>

		<div id="adspot-1x11-pos-1">
			<script type="text/javascript">
				var titan = window.titan || {};
				if (false) {
					titan.requestConditionalAd = titan.requestConditionalAd || [];
					titan.requestConditionalAd.push("adspot-1x11-pos-1");
				} else {
					titan.requestAd = titan.requestAd || [];
					titan.requestAd.push("adspot-1x11-pos-1");
				}
			</script>
		</div>
	
</div>