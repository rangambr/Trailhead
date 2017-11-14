({
    onInit : function(component, event, helper) {
        component.find("service").getNewRecord(
            "BoatReview__c",
            null,
            false,
            $A.getCallback(function() {
                component.set("v.boatReview.Boat__c", component.get("v.boat").Id);
                var error = component.get("v.recordError");
                if(error) {
                    console.log(error);
                }
            })
        );
    }
})
