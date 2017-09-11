<div class="container w-xxl w-auto-xs" ng-controller="SigninFormController" >
  <a href class="navbar-brand block m-t">[:name:]</a>
  <tabset class="tab-container">
    <tab>
      <tab-heading>
        <i class="fa fa-user" aria-hidden="true"></i> Customer
      </tab-heading>
      <div class="m-b-lg">
        <form name="form_customer" class="form-validation">
          <div class="text-danger wrapper text-center" ng-show="authError">
            login failed!
          </div>
          <div class="list-group list-group-sm">
            <div class="list-group-item">
              <input type="email" placeholder="Email" class="form-control no-border" ng-model="User.customer_login_data.CEmail" required>
            </div>
            <div class="list-group-item">
               <input type="password" placeholder="Password" class="form-control no-border" ng-model="User.customer_login_data.CPassword" required>
            </div>
          </div>
          <button type="submit" class="btn btn-lg btn-primary btn-block" style=" width:50%; margin:0 80px;" ng-click="User.customer_login()" ng-disabled='form_customer.$invalid' translate="header.LOGIN.Login">Log in</button>

          <div class="line line-dashed"></div>
          <p class="text-center"><small translate="header.LOGIN.Login_enquiry"></small></p>
          <a ui-sref="app.signup" style=" width:50%; margin:0 80px;" class="btn btn-lg btn-default btn-block" translate="header.REGIST.Regist"></a>
        </form>
      </div>
    </tab>
     <tab>
       <tab-heading>
         <i class="fa fa-user-circle-o" aria-hidden="true"></i> Landlord
       </tab-heading>
       <div class="m-b-lg">
         <form name="form_landlord" class="form-validation">
           <div class="text-danger wrapper text-center" ng-show="authError">
             login failed!
           </div>
           <div class="list-group list-group-sm">
             <div class="list-group-item">
               <input type="email" placeholder="Email" class="form-control no-border" ng-model="User.landlord_login_data.LLEmail" required>
             </div>
             <div class="list-group-item">
                <input type="password" placeholder="Password" class="form-control no-border" ng-model="User.landlord_login_data.LLPassword" required>
             </div>
           </div>
           <button type="submit" class="btn btn-lg btn-primary btn-block" style=" width:50%; margin:0 80px;" ng-click="User.landlord_login()" ng-disabled='form_landlord.$invalid' translate="header.LOGIN.Login">Log in</button>

           <div class="line line-dashed"></div>
           <p class="text-center"><small translate="header.LOGIN.Login_enquiry"></small></p>
           <a ui-sref="app.signup" style=" width:50%; margin:0 80px;" class="btn btn-lg btn-default btn-block" translate="header.REGIST.Regist"></a>
         </form>
       </div>
     </tab>
   </tabset>
</div>
