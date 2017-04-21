<div class="profile" ng-controller="ProfileController">
	<section class="main-area content-wrap">
		<div class="inner-wrap">
			<div class="row">
				<div class="col-sm-12">
                	<h3>My account</h3>
            	</div>
			</div>
			<div class="row">
                <div class="col-sm-12 feedback success" role="alert" style="display:block;">
                    <h4>Success</h4>
                    
                    <p>Your profile has been updated.</p>
                </div>
                <div class="col-sm-12 w-full feedback error" role="alert" style="display:block;">
                    <h4>That didn't work</h4>
                    
                    <p>Your preferences have not been updated, please try again.</p>
                </div>
            </div>
            <div class="row">
            	<div class="col-sm-3 profile-nav">
                    <ul class="tabNav" role="tablist">
                        <li class="selected" role="presentation">
                            <a href="#myProfile" class="f-icon with-text" id="tab-myProfile" role="tab" aria-selected="true" tabindex="0">
                                <span class="icon fa fa-user"></span>
                                <span class="copy">My profile</span>
                            </a>
                        </li>
                        <li role="presentation">
                            <a href="#emailPreferences" class="f-icon with-text" id="tab-emailPreferences" role="tab" aria-selected="false" tabindex="-1">
                                <span class="icon "><i class="fa fa-envelope-o" aria-hidden="true"></i></span>
                                <span class="copy">Email preferences</span>
                            </a>
                        </li>
                         <li role="presentation">
                            <a href="#emailPreferences" class="f-icon with-text" id="tab-emailPreferences" role="tab" aria-selected="false" tabindex="-1">
                                <span class="icon "><i class="fa fa-suitcase" aria-hidden="true"></i></span>
                                <span class="copy">Property Management</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="col-sm-9 tabPanel selected">
                    <div class="col-sm-12 tabPanel selected" id="myProfile" role="tabpanel" aria-hidden="false" aria-labelledby="tab-myProfile">
                    <div class="card">
                        <div class="inner-wrap clear">

                            <header>
                                <h3>My profile</h3>
                                
                            </header>

                            <div class="content-wrap">
                                <div class="frm-main no-indent">
                                    <div class="inner-wrap">
                                        <a id="myBtn" class="btn lowlight">Edit Profile</a>
                                    </div>
                                    <!-- The Modal -->
									<div id="myModal" class="modal">
									
									  <!-- Modal content -->
									  <div class="modal-content">
									    <div class="modal-header">
									      <span class="close">&times;</span>
									      <h2>Modal Header</h2>
									    </div>
									    <div class="modal-body">
									      <p>Some text in the Modal Body</p>
									      <p>Some other text...</p>
									    </div>
									    <div class="modal-footer">
									      <h3>Modal Footer</h3>
									    </div>
									  </div>
	
									</div>
                                </div>
                            </div>

                            <div class="content-wrap clear">

                                <div class="half">

                                    <fieldset>
                                        <div class="frm-main no-indent">
                                            <label for="FirstName">First name</label>
                                            <div class="inner-wrap">
                                                <input aria-required="false" id="FirstName" name="FirstName" readonly="readonly" type="text" value="Ran">
                                            </div>
                                        </div>
                                        <div class="frm-main no-indent">
                                            <label for="LastName">Last name</label>
                                            <div class="inner-wrap">
                                                <input aria-required="false" id="LastName" name="LastName" readonly="readonly" type="text" value="Sun">
                                            </div>
                                        </div>
                                        <div class="frm-main no-indent">
                                            <label for="Phone">Suburb</label>
                                            <div class="inner-wrap">
                                                <input aria-required="false" id="Phone" name="Phone" readonly="readonly" type="text" value="">
                                            </div>
                                        </div>
                                        <div class="frm-main no-indent">
                                            <label for="CurrStat">CurrentState</label>
                                            <div class="inner-wrap">
                                                <input aria-required="false" id="CurrStat" name="CurrStat" readonly="readonly" type="text" value="Australia">
                                            </div>
                                        </div>
                                        <div class="frm-main no-indent">
                                            <label for="PostCode">Current postcode</label>
                                            <div class="inner-wrap">
                                                <input aria-required="false" data-val="true" data-val-regex="Postcode should be 4 digits." data-val-regex-pattern="^[0-9]{4}$" id="PostCode" name="PostCode" readonly="readonly" type="text" value="">
                                                <span class="field-validation-valid" data-valmsg-for="PostCode" data-valmsg-replace="true"></span>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>

                                <div class="half">
                                    <fieldset>
                                        <div class="frm-main no-indent">
                                            <label for="EmailAddress">Email address</label>
                                            <div class="inner-wrap">
                                                <input aria-required="true" id="EmailAddress" name="EmailAddress" readonly="readonly" type="text" value="464824361@qq.com">
                                            </div>
                                        </div>
                                        <div class="frm-main no-indent">
                                            <div class="inner-wrap">
                                                <a href="javascript:;" class="btn lowlight ">Reset</a>
                                                 <a href="javascript:;" class="btn lowlight">Save</a>
                                            </div>
                                            
                                        </div>
                                        
                                    </fieldset>
                                </div>
                            </div>
                           
                         </div>
                    </div>
                </div>
                    
                </div>
            </div>
		</div>
	</section>	
	 <script>
								// Get the modal
								var modal = document.getElementById('myModal');
								
								// Get the button that opens the modal
								var btn = document.getElementById("myBtn");
								
								// Get the <span> element that closes the modal
								var span = document.getElementsByClassName("close")[0];
								
								// When the user clicks the button, open the modal 
								btn.onclick = function() {
								    modal.style.display = "block";
								}
								
								// When the user clicks on <span> (x), close the modal
								span.onclick = function() {
								    modal.style.display = "none";
								}
								
								// When the user clicks anywhere outside of the modal, close it
								window.onclick = function(event) {
								    if (event.target == modal) {
								        modal.style.display = "none";
								    }
								}
								</script>
</div>
