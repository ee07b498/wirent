    <div class="container w-xxl w-auto-xs" ng-controller="SignupFormController" >
      <a href class="navbar-brand block m-t">[:name1:]</a>
      <div class="m-b-lg">
        <div class="wrapper text-center">
          <strong></strong>
        </div>
        <form name="form" class="form-validation">
          <div class="text-danger wrapper text-center" ng-show="authError">
              
          </div>
          <div class="list-group list-group-sm">
            <div class="list-group-item">
              <input type="email" placeholder="Email" class="form-control no-border" ng-model="User.signup_data.CEmail" required>
            </div>
            <div class="list-group-item">
               <input type="password" placeholder="Password" class="form-control no-border" ng-model="User.signup_data.CPassword" required>
            </div>
          </div>
          <div class="checkbox m-b-md m-t-none">
            <label class="i-checks">
              <input type="checkbox" ng-model="agree" required><i></i> Agree the <a href>terms and policy</a>
            </label>
          </div>
          <button type="submit" class="btn btn-lg btn-primary btn-block" style=" width:50%; margin:0 80px;" ng-click="User.signup()" ng-disabled='form.$invalid' translate="header.REGIST.Regist"></button>
          <div class="line line-dashed"></div>
          <p class="text-center"><small translate="header.REGIST.Regist_enquiry"></small></p>
          <a ui-sref="app.login" style=" width:50%; margin:0 80px;" class="btn btn-lg btn-default btn-block" translate="header.LOGIN.Login"></a>
        </form>
      </div>
      
    </div>