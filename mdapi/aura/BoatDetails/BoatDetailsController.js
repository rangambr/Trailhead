({
    onBoatSelected : function(component, event, helper) {
        component.set("v.id", event.getParam("boat").Id);
        var service =  component.find("service");
        service.set("v.recordId", event.getParam("boat").Id);
        service.reloadRecord();
    },

    onRecordUpdated : function(component, event, helper) {
        var boatReviews = component.find("boatReviews");
        if(boatReviews != undefined) {
            boatReviews.refresh();
        }
    },

    onBoatReviewAdded : function(component, event, helper) {
        var tbSet = component.find("tbSet");
        tbSet.set("v.selectedTabId", "boatreviewtab");

        var boatReviews = component.find("boatReviews");
        if(boatReviews != undefined) {
            boatReviews.refresh();
        }
        
    },
})
