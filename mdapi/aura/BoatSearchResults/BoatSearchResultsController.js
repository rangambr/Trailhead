({
    doSearch : function(component, event, helper) {
        helper.onSearch(component, event);     
    },

    onBoatSelect : function(component, event, helper) {
        component.set("v.selectedBoatId",  event.getParam("boatId"));  
    }
})
