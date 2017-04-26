<!doctype html>
<html lang="en" ng-app="andy">
<head>
	<meta charset="utf-8" />
	<title>andy</title>
	<link rel="stylesheet" href="/node_modules/normalize-css/normalize.css">
	<link rel="stylesheet" href="/css/bootstrap.css" type="text/css" />
	<link rel="stylesheet" href="/css/animate.css" type="text/css" />
	<link rel="stylesheet" href="/fonts/css/font-awesome.min.css" type="text/css" />
	<link rel="stylesheet" href="/css/simple-line-icons.css" type="text/css" />
	<link rel="stylesheet" href="/css/font.css" type="text/css" />
	<link rel="stylesheet" href="/css/app.css" type="text/css" />
	<link rel="stylesheet" href="/css/search-option.css" type="text/css" />
	<link rel="stylesheet" href="/css/profile.css" type="text/css" />
	<script src="/node_modules/angular/angular.min.js"></script>
	<script src="/node_modules/jquery/dist/jquery.min.js"></script>
	<script src="/node_modules/jquery.slimscroll.min.js"></script>
	<script src="/node_modules/angular-ui-router/release/angular-ui-router.min.js"></script>
	<script src="/node_modules/ui-bootstrap-tpls.js"></script>
	<script src="/node_modules/ui-utils.js"></script>
	<script src="/js/directives/ui-jq.js"></script>
	<script src="/js/services/ui-load.js"></script>
	<script src="/js/base.js"></script>
	<script src="/js/user.js"></script>
	<script src="/js/question.js"></script>
	<script src="/js/common.js"></script>
	<script src="/js/answer.js"></script>
	</head>
<body ng-controller="AppCtrl">
<div class="navbar">
      <!-- navbar header -->
      <div class="navbar-header">
        <button class="pull-right visible-xs dk" ui-toggle-class="show" data-target=".navbar-collapse">
          <i class="glyphicon glyphicon-align-justify"></i>
        </button>
      <!--  
		<button class="pull-right visible-xs" ui-toggle-class="off-screen" data-target=".app-aside" >
          <i class="glyphicon glyphicon-align-justify"></i>
        </button>
	  -->
        <!-- brand -->
        <a href="#/" class="navbar-brand text-lt">
          <i class="fa fa-wikipedia-w"></i>
         
          <span class="hidden-folded m-l-xs">[:name:]</span>
        </a>
        <!-- / brand -->
      </div>
      <!-- / navbar header -->

      <!-- navbar collapse -->
      <div class="collapse pos-rlt navbar-collapse box-shadow">
        <!-- link and dropdown -->
		<ul class="nav navbar-nav hidden-sm">
			<li><a href="#about">Rental</a></li>
			<li><a href="#services">Buy</a></li>
			<li><a ui-sref="news">News</a></li>
			<li><a ui-sref="contact">Contact</a></li>
			<li><a ui-sref="aboutus">About</a></li>
		</ul>
        <!-- / link and dropdown -->

        <!-- search form -->
		
        <!-- / search form -->

        <!-- nabar right -->
        <ul class="nav navbar-nav navbar-right">
      <!-- 
		-->
		  <li class="dropdown" dropdown>
            <a href class="dropdown-toggle" dropdown-toggle>
              <i class="icon-heart fa-fw"></i>
              <span class="visible-xs-inline">Notifications</span>
              <span class="badge badge-sm up bg-danger pull-right-xs">2</span>
            </a>
            <!-- dropdown -->
            <div class="dropdown-menu w-xl animated fadeInUp">
              <div class="panel bg-white">
                <div class="panel-heading b-light bg-light">
                  <strong>You have <span>2</span> hostories</strong>
                </div>
                <div class="list-group">
                  <a href class="media list-group-item">
                    <span class="pull-left thumb-sm">
                      <img src="https://s3-ap-southeast-2.amazonaws.com/elasticbeanstalk-ap-southeast-2-653083494801/CPhoto/andy.jpg" alt="..." class="img-rounded">
                    </span>
                    <span class="media-body block m-b-none">
                      Olympic park<br>
                      <small class="text-muted">two days ago</small>
                    </span>
                  </a>
                  <a href class="media list-group-item">
                    <span class="pull-left thumb-sm">
                      <img src="https://s3-ap-southeast-2.amazonaws.com/elasticbeanstalk-ap-southeast-2-653083494801/CPhoto/andy.jpg" alt="..." class="img-rounded">
                    </span>
                    <span class="media-body block m-b-none">
                      Olympic park<br>
                      <small class="text-muted">two days ago</small>
                    </span>
                  </a>
                </div>
                <div class="panel-footer text-sm">
                  <a href class="pull-right"><i class="fa fa-cog"></i></a>
                  <a href="#notes">See all the favors</a>
                </div>
              </div>
            </div>
            <!-- / dropdown -->
          </li>
		  <li >
			<a><i class="fa fa-star fa-fw"></i></a>
		  </li>
          <li ng-if="!profile">
			<a ui-sref="login"><span class="badge badge-lg bg-success" >登录</span></a>
		  </li>
		  <li ng-if="!profile">
			<a ui-sref="signup"><span class="badge badge-lg bg-success" >注册</span></a>
		  </li>
		 
		 <li ng-if="profile" class="dropdown" dropdown>
            <a href class="dropdown-toggle clear" dropdown-toggle>
              <span class="thumb-sm avatar pull-right m-t-n-sm m-b-n-sm m-l-sm">
                <img src="https://s3-ap-southeast-2.amazonaws.com/elasticbeanstalk-ap-southeast-2-653083494801/CPhoto/libin.jpg" alt="...">
                <i class="on md b-white bottom"></i>
              </span>
              <span class="hidden-sm hidden-md">[:User.user_data.CEmail:]</span> <b class="caret"></b>
            </a>
            <!-- dropdown -->
            <ul class="dropdown-menu animated fadeInRight w">
              <li class="wrapper b-b m-b-sm bg-light m-t-n-xs">
                <div>
                  <p>Update your profile,30% finished</p>
                </div>
                <progressbar value="60" class="progress-xs m-b-none bg-white"></progressbar>
              </li>
              <li>
                <a href>
                  <span class="badge bg-danger pull-right">30%</span>
                  <span>Settings</span>
                </a>
              </li>
              <li>
                <a ui-sref="profile">Profile</a>
              </li>
              <li>
                <a ui-sref="app.docs">
                  <span class="label bg-info pull-right">new</span>
                  Help
                </a>
              </li>
              <li class="divider"></li>
              <li>
                <a ng-click="logout()">Logout</a>
              </li>
            </ul>
            <!-- / dropdown -->
          </li>
       
		 </ul>
        <!-- / navbar right -->

      </div>
      <!-- / navbar collapse -->
</div>
</div>
<div>
	<div ui-view></div>
</div>
</body>
	
</script>
</html>