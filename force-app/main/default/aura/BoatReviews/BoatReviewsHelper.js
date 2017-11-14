({
    onInit : function(component, event, helper) {
        var action = component.get("c.getAll");
        var boat = component.get("v.boat");
        action.setParams({ boatId :  boat.Id});
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.boatReviews", response.getReturnValue());
            }
            else if (state === "INCOMPLETE") {
                console.error('INCOMPLETE');
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.error("Error message: " + 
                                 errors[0].message);
                    }
                } else {
                    console.error("Unknown error");
                }
            }
        });
        $A.enqueueAction(action);        
    }
})
