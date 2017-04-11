<div ng-controller="UserController">
	<div class="card user container">
		<h1>用户详情</h1>
		<div class="hr"></div>
		<div class="basic">
		<div class="info_item clearfix">
			<div>username</div>
			<div>[:User.current_user.username:]</div>
		</div>
		
		<div class="info_item clearfix">
			<div>intro</div>
			<div>[:User.current_user.intro || '暂无介绍':]</div>
		</div>
		
		</div>
		<h2>用户提问</h2>
		<div ng-repeat="(key, value) in User.his_questions">
			<div class="title">[:value.title:]</div>
		</div>
		
		<h2>用户回答</h2>
		<div ng-repeat="(key, value) in User.his_answers">
			<div class="title">[:value.question.title:]</div>
			<div class="action-set">
				<div class="comment">更新时间：[:value.updated_at:]</div>
			</div>
		</div>
	</div>
</div>