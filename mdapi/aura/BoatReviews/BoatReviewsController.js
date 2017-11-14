({
    doInit : function(component, event, helper) {
        helper.onInit(component, event, helper);
    },

    onUserInfoClick : function(component, event, helper) {
        var selectedItem = event.currentTarget;
        var recId = selectedItem.dataset.userid;

        var navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
            "recordId": recId
        });
        navEvt.fire();
    }
})
