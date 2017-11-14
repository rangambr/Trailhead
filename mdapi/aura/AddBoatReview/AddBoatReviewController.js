({
    doInit : function(component, event, helper) {
        helper.onInit(component, event, helper);
    },

    onSave : function(component, event, helper) {
        var boat =  component.get("v.boat");
        component.set("v.boatReview.Boat__c", boat.Id);

        component.find("service").saveRecord(function(saveResult) {
            if (saveResult.state === "SUCCESS" || saveResult.state === "DRAFT") {
                // record is saved successfully
                var resultsToast = $A.get("e.force:showToast");
                if(resultsToast != null) {
                    resultsToast.setParams({
                        "title": "Saved",
                        "message": "The record was saved.",
                        "type" : "success"
                    });
                    resultsToast.fire();

                    var evt = component.getEvent("boatReviewAdded");       
                    evt.fire();     
                } else {
                    alert("The record was saved.");
                }
                helper.onInit(component, event, helper);

            } else if (saveResult.state === "INCOMPLETE") {
                // handle the incomplete state
                console.log("User is offline, device doesn't support drafts.");
            } else if (saveResult.state === "ERROR") {
                // handle the error state
                console.log('Problem saving contact, error: ' + JSON.stringify(saveResult.error));
            } else {
                console.log('Unknown problem, state: ' + saveResult.state + ', error: ' + JSON.stringify(saveResult.error));
            }
        });
    },

    onRecordUpdated : function(component, event, helper) {
        var eventParams = event.getParams();
        if(eventParams.changeType === "CHANGED") {
            var resultsToast = $A.get("e.force:showToast");
            if(resultsToast != null) {            
                resultsToast.setParams({
                    "title": "Saved",
                    "message": "The record was updated.",
                    "type" : "success"
                });
                resultsToast.fire();
            } else {
                alert("The record was updated.");
            }
        } 
    },
})
