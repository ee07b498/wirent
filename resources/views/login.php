<!DOCTYPE html>
<html lang="zh">

	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>login</title>
		<link rel="stylesheet" href="css/index.css" />
			<link rel="stylesheet" href="css/base.css" />
		<style type="text/css">
			.center {
				text-align: center;
				height: 100px;
			}
			
			.login-page {
				width: 360px;
				padding: 8% 0 0;
				margin: 0 auto;
			}
			
			.form {
				position: relative;
				z-index: 1;
				max-width: 360px;
				background: #FFFFFF;
				margin: 0 auto 100px;
				padding: 45px;
				text-align: center;
				box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
			}
			
			.form input {
				font-family: "microsoft yahei", sans-serif;
				outline: 0;
				background: #F2F2F2;
				width: 100%;
				border: 0;
				margin: 0 0 15px;
				padding: 15px;
				box-sizing: border-box;
				font-size: 14px;
			}
			
			.form button {
				font-family: "microsoft sans serif", "microsoft yahei";
				text-transform: uppercase;
				outline: 0;
				background: #4CAF50;
				width: 100%;
				border: 0;
				padding: 15px;
				color: #FFFFFF;
				font-size: 14px;
				-webkit-transform: all 0.3 ease;
				transition: all 0.3 ease;
				cursor: pointer;
			}
			
			.form button:hover,
			.form button:active,
			.form button:focus {
				background: #43A047;
			}
			
			.form .message {
				margin: 15px 0 0;
				color: #B3B3B3;
				font-size: 12px;
			}
			
			.form .message a {
				color: #4CAF50;
				text-decoration: none;
			}
			
			.form .register-form {
				display: none;
			}
			
			.container {
				position: relative;
				z-index: 1;
				max-width: 300px;
				margin: 0 auto;
			}
			
			.container:before,
			.container:after {
				content: "";
				display: block;
				clear: both;
			}
			
			.container .info {
				margin: 50px auto;
				text-align: center;
			}
			
			body {
				background-color: #F7F7F7;
			}
			
			.shake_effect {
				-webkit-animation-name: shake;
				animation-name: shake;
				-webkit-animation-duration: 1s;
				animation-duration: 1s;
			}
			
			@-webkit-keyframes shake {
				from,
				to {
					-webkit-transform: translate3d(0, 0, 0);
					transform: trnaslate3d(0, 0, 0);
				}
				10%,
				30%,
				50%,
				70%,
				90% {
					-webkit-transform: translate3d(-10px, 0, 0);
					transform: translate3d(-10px, 0, 0);
				}
				20%,
				40%,
				60%,
				80% {
					-webkit-transform: translate3d(10px, 0, 0);
					transform: translate3d(10px, 0, 0);
				}
			}
			
			@keyframes shake {
				from,
				to {
					-webkit-transform: translate3d(0, 0, 0);
					transform: trnaslate3d(0, 0, 0);
				}
				10%,
				30%,
				50%,
				70%,
				90% {
					-webkit-transform: translate3d(-10px, 0, 0);
					transform: translate3d(-10px, 0, 0);
				}
				20%,
				40%,
				60%,
				80% {
					-webkit-transform: translate3d(10px, 0, 0);
					transform: translate3d(10px, 0, 0);
				}
			}
			
			p.center {
				color: #fff;
				font-family: "microsoft yahei";
			}
		</style>

	</head>

	<body>
		<div class="header">
			<div class="inner_c">
				<h1 class="logo">
					<a href="#">
						WinningInvestmentGroup-唯赢集团
					</a>
				</h1>
				<div class="nav">
					<ul>
						<li class="current">
							<a href="index_rental.html">首页</a>
						</li>
						<li>
							<a href="rental.html">租房</a>
						</li>
						<li>
							<a href="#">Advice</a>
						</li>
						<li>
							<a href="contact_us.html">联系我们</a>
						</li>
						<li>
							<a href="news.html">最新消息</a>
						</li>
						<li>
							<a href="about_us1.html">关于唯赢</a>
						</li>
					</ul>
				</div>
				<div class="join_us">
					<a class="fst" href="login.html">加入我们</a>
				</div>
			</div>
				<div class="container">
			<p class="center"></p>
			<div id="wrapper" class="login-page">
				<div id="login_form" class="form">
					<form class="register-form" method="post">
						<input type="text" placeholder="请使用电子邮件注册" id="r_email" />
						<!--<input type="text" placeholder="用户名" id="r_user_name" />-->
						<input type="password" placeholder="密码" id="r_password" />
						<button id="create" onclick="return check_register()">创建账户</button>
						<p class="message">已经有了一个账户？
							<a href="#">立刻登录</a>
						</p>
					</form>
					
					<form class="login-form" method = "post">
						<input type="text" class="input-text" placeholder="用户名" name = "user_name" id="user_name" />						
						<input type="password" placeholder="密码" name ="password" id="password" />

						<button id="login" onclick="return check_login()">登录</button>
						<p class="message">还没有账户？
							<a href="#">立刻创建</a>							
						</p>
					</form>
					
					
					<div><span id = "loginResult" style="display: none ;"></span></div>
				</div>
			</div>
		</div>

		</div>
	
		<script src="js/jquery.js" type="text/javascript"></script>
		<script>
		function check_login()
		{
			var user_name = $('#user_name').val();
			var password = $('#password').val();
//			var checkResult = Array();		
			var checkResult = '';
			$.ajax
			({
				type:"POST",
				url:"php/customer_login.php",
//				url:"php/customer_login_test.php",				
				async:false,
				cache:false,
				dataType:"json",
				timeout: 100000,
				data:{user_name:user_name,password:password},
				success: function(data)
				{
					checkResult = data;	
				},
				error: function()
				{alert('ajax通信失败'+Error());}
			});
			if (checkResult =='login_success')
				{
					alert("登陆成功"+"欢迎"+user_name+"使用唯赢租房");
					window.location.href='index_rental.html';
				}
			else if (checkResult=='login_failed')
			{
				alert("密码错误"+"请重新输入密码");
				location.href='login.html?user_name='+user_name; 	
			}
			else 
			{
				alert("用户名未注册，请先注册");
				location.href='login.html';
			}

			return false;	
		}
		
		function check_register()
		{
			var user_name = $('#r_email').val();
			var password = $('#r_password').val();
//			var checkResult = Array();		
			var checkResult = '';
			var insertResult = '';			
			$.ajax
			({
				type:"POST",
//				url:"php/customer_login.php",
				url:"php/customer_login_test.php",	
				async:false,
				cache:false,
				dataType:"json",
				timeout: 100000,
				data:{user_name:user_name,password:password},
				success: function(data)
				{
					checkResult = data;	
				},
				error: function()
				{alert('ajax通信失败'+Error());}
			});
//			if (checkResult[0]==0)
			if (checkResult == 'unregistered_name')
				{
				$.ajax({
					type:"POST",
					url:"php/customer_register.php",
					async:false,
					cache:false,
//					dataType:"json",    //返回单字符串用json_encode编码则使用eval解码
					timeout: 100000,
					data:{user_name:user_name,password:password},
					success: function(data)
					{
	
						insertResult = eval('('+data+')');//解码返回值
						if (insertResult == "register_success")
							{
								alert("注册成功"+"欢迎"+user_name+"使用唯赢租房");
								window.location.href='index_rental.html';
							}
						else 
							{
								alert("注册失败");
								location.href='login.html';
							}
					},
					error: function()
					{alert('ajax通信失败');}
				});
				}
			else
				alert("用户名已注册");
			return false;	
		}
		
		
		$(function() 
			{		
				$('.message a').click(function() {
					$('form').animate({
						height: 'toggle',
						opacity: 'toggle'
					}, 'slow');
				});
			}
		)
		</script>
	</body>

</html>