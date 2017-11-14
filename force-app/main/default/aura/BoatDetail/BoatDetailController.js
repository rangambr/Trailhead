({
    doInit : function(component, event, helper) {
        var navEvt = $A.get("e.force:navigateToSObject");
        if($A.util.isEmpty(navEvt)) {
            component.set("v.isEventAvailable", false);
        } else {
            component.set("v.isEventAvailable", true);
        }
        
    },
    onFullDetails : function(component, event, helper) {
        var navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
            "recordId": component.get("v.boat.Id")
        });
        navEvt.fire();
    }
})
