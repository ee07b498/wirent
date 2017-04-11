﻿;(function(){
	'use strict';
	angular.module('answer',[])
		.service('AnswerService',['$http','$state',function($http,$state){
			var me = this;
			me.data = {};
			/*统计票数
			*@answers array 用于统计票数的数据
			*此数据可以是问题也可以是回答
			*如果是问题将会跳过统计
			*/
			me.count_vote = function(answers){
				/*迭代所有的数据*/
				for(var i=0;i<answers.length;i++){
					/*封装单个数据*/
					var votes, item = answers[i];	
					/*如果不是回答也没有users元素，
					*说明本条不是回答或
					*回答没有任何票数
					*/
					//如果有question_id,说明是个问题，如果没有说明
					if(!item['question_id']) 
						continue;
						
						me.data[item.id] = item;
					
					if(!item['users'])
						continue;
					/*每条回答的默认赞同票和反对票都默认为0*/
					item.upvote_count = 0;
					item.downvote_count = 0;
					/*users是所有投票用户的用户信息*/
					votes = item['users'];
				//	console.log('vote',vote);
					if(votes)
					for(var j=0; j<votes.length; j++){
						var v = votes[j];
						/*获取pivot元素中的用户投票信息
						*如果是1将增加赞同票
						*如果是2将增加反对票
						*/
						if(v['pivot'].vote === 1){
							item.upvote_count++;
						}
						if(v['pivot'].vote === 2){
							item.downvote_count++;
						}
					}
					
				}
				return answers;
			}
			me.vote = function(conf){
				if(!conf.id || !conf.vote){
					console.log('id and vote are required!');
					return;
				}
				
				var answer = me.data[conf.id],
				users = answer.users;
				//判断当前用户是否已经投过相同的票
				for(var i=0;i<users.length;i++)
				{
					if(users[i].id == his.id && conf.vote == users[i].pivot.vote)
						conf.vote=3;
				}
				
				return $http.post('api/answer/vote',conf)
					.then(function(r){
						if(r.data.status)
							return true;
						else if(r.data.msg = 'login required')
							$state.go('login');
						else
							return false;
					},function(){
						return false;
					})
			}
			me.update_data = function(id){
				/*if(angular.isNumeric(input))
					var id = input;
				if(angular.isArray(input))
					var id_set = input;*/
				return $http.post('/customer/answer/read',{id:id})
					.then(function(r){
					//	console.log('r',r);
					me.data[id] = r.data.data;
					})
			}
			me.read = function(params){
				return $http.post('/customer/answer/read',params)
						.then(function(r)
						{
							if(r.data.status)
							{
								me.data = angular.merge({},me.data,r.data.data);
								return r.data.data;
							}
							return false;
						})
			}
		}])
})();