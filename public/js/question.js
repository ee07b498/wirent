;(function(){
	'use strict';
	angular.module('question',[])
		.service('QuestionService',[
					'$http',
					'$state',
					'AnswerService',function($http,$state,AnswerService){
					var me = this;
					me.new_question = {};
					me.data = {};
					me.go_add_question = function()
					{
						//alert(123);
						$state.go('question.add');
					}
					
					me.read = function(params)
					{
						return $http.post('/api/question/read',params)
							.then(function(r){
								//var its_answers;
								if(r.data.status)
								{	//只读一条
									if(params.id)
									{
										me.data[params.id] = me.current_question =  r.data.data;
										me.its_answers = me.current_question.answers_with_user_info;
										me.its_answers = AnswerService.count_vote(me.its_answers);
										//每次点在之后再question 这个里面watch数据表
									}
									else
									{
										me.data = angular.merge({},me.data,r.data.data);
									}
									return r.data.data;
								}
								return false;
							})
					}
					me.vote = function(conf)
					{
						if(AnswerService.vote(conf))
						{
							me.update_answer(conf.id);
						}
					}
					me.update_answer = function(answer_id){
						$http.post('/api/answer/read', {id:answer_id})
							.then(function(r){
								if(r.data.status){
									if(r.data.status){
										var answer = me.its_answers[i];
										if(answer.id == answer_id)
										{
											me.its_answers[i]=r.data.data;
											AnswerService.data[answer_id] = r.data.data;
										}
									}
									
								}
							})
					}
					me.add = function()
					{
						if(!me.new_question.title)
							return ;
						$http.post('/api/question/add', me.new_question)
							.then(function(r){
								//console.log('r',r);
								if(r.data.status)
								{
									me.new_question = {};
									$state.go('home');
								}
							},function(e){
								
							})
					}
			}])
		
		
		
		.controller('QuestionController', [
					'$scope',
					'QuestionService',
					function($scope,QuestionService){
						$scope.Question = QuestionService;
					}])
		.controller('QuestionAddController',[
					'$scope',
					'QuestionService',
					function($scope,QuestionService){
						$scope.Question = QuestionService;//在这里就不要写了，直接引用上面的
					}])
		.controller('QuestionDetailController',[
					'$scope',
					'$stateParams',
					'QuestionService',
					function($scope,$stateParams,QuestionService){
					QuestionService.read($stateParams);
		}])
		

})();