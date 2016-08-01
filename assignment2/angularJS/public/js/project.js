angular.module('contactBook', [])
.controller('bookController',['$scope','$http', function($scope,$http){
	var iD,rowIndex;
	$scope.contacts = [];
    $scope.active = function(){
                        if($scope.contacts.length>0){
                        return $scope.contacts;
                        }
                    }
	$scope.openBook = function(start){
						if(start==0){
						$scope.contacts = [];
						}
    					context= 'open';
                			$http.get('http://localhost:8080/Contacts?_start='+start+'&_limit=7&_sort=name&_order=ASC')
                			.success (function(data){
                        		for (var i=0; i<data.length; i++){
    								$scope.contacts.push(data[i]);
								}
                   			})
                			.error(function(data, status) {
                        		console.error('failure loading the record', status, data);
                        	});
            		}
    $scope.searchBook = function(start){
						if(start==0){
						$scope.contacts = [];
						}
    					context= 'search';
                			$http.get('http://localhost:8080/Contacts?name_like='+$scope.searchName+'&_start='+start+'&_limit=7&_sort=name&_order=ASC')
                			.success (function(data){
                        		for (var i=0; i<data.length; i++){
    								$scope.contacts.push(data[i]);
								}
                   			})
                			.error(function(data, status) {
                        		console.error('failure loading the record', status, data);
                        	});
            		}

    
    $scope.deleteRow = function(id,index){
					iD=id;
					rowIndex=index;
            		}
    $scope.deleteRecord = function(){
							$http.delete('http://localhost:8080/Contacts/'+iD)
                			.success (function(data){
                				$scope.contacts.splice(index, 1);
                        		alert('delete Successfully');
                   			})
                			.error(function(data, status) {
                        		console.error('failure deleting the record', status, data);
                        	});	
            			}

   	var loadUpdateModal = function(){
                            $scope.updateName = $scope.contacts[rowIndex].name;
                            $scope.updateCountry = $scope.contacts[rowIndex].nationality;
                            $scope.updateCompany = $scope.contacts[rowIndex].company;
                            $scope.updateEmail = $scope.contacts[rowIndex].email;
                            $scope.updatePhone = $scope.contacts[rowIndex].phone;
                            $scope.updateAddress = $scope.contacts[rowIndex].address;
                            $scope.registered = $scope.contacts[rowIndex].registered;
                            $scope.updateEmergencyContact = $scope.contacts[rowIndex].emergencyContact;
                        }
    
	$scope.updateRow = function(id,index){
					iD=id;
					rowIndex=index;
                    loadUpdateModal(rowIndex);
            		}
    $scope.updateRecord = function(){
    						var updateItem={
        						"name": $scope.updateName,
        						"nationality": $scope.updateCountry,
        						"company": $scope.updateCompany,
        						"email": $scope.updateEmail,
        						"phone": $scope.updatePhone,
        						"address": $scope.updateAddress,
                                "registered": $scope.registered,
      	  						"emergencyContact": $scope.updateEmergencyContact
        					};
        				
							var req = {
 							method: 'PATCH',
 							url: 'http://localhost:8080/Contacts/'+iD,
 							headers: {
   							'Content-Type': 'application/json'
 							},
 							data: updateItem
						}

						$http(req).then(function(response){
							alert('Updated Successfully');
                            $scope.contacts[rowIndex]= updateItem;
						},
						function(response){
							console.error('failure deleting the record', response);
						});
                			
            			}
    
    $scope.addRecord = function(){
						var addItem={
        					"name": $scope.inputName,
        					"nationality": $scope.inputCountry,
        					"company": $scope.inputCompany,
        					"email": $scope.inputEmail,
        					"phone": $scope.inputPhone,
        					"address": $scope.inputAddress,
        					"registered": new Date().toDateString( )+"  "+new Date().toLocaleTimeString(),
        					"emergencyContact": $scope.inputEmergencyContact
        				};
        				var req = {
 							method: 'POST',
 							url: 'http://localhost:8080/Contacts/',
 							headers: {
   							'Content-Type': 'application/json'
 							},
 							data: addItem
						}

						$http(req).then(function(response){
							alert('Added Successfully');
                            resetForm();
						},
						function(response){
							console.error('failure deleting the record', response);
						});
            		}
    var resetForm = function(form) {
                            $scope.inputName="",
                            $scope.inputCountry="",
                            $scope.inputCompany="",
                            $scope.inputEmail="",
                            $scope.inputPhone="",
                            $scope.inputAddress="",
                            $scope.inputEmergencyContact=""
                        }

	var start=0;
    angular.element(window).bind("scroll", function() {
    	var windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    	var body = document.body, html = document.documentElement;
    	var docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
    	windowBottom = windowHeight + window.pageYOffset;
    	if (windowBottom >= docHeight) {
        	start=start+7;
            if(context == 'search') {
            $scope.searchBook(start);                    
            } else if(context == 'open') {
            $scope.openBook(start);
            }
    	}
	});
}])   