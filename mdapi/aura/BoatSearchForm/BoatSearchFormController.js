({
    doInit : function(component, event, helper) {
        var boatTypes = [];
        component.set("v.options", boatTypes);

        var action = component.get("c.getBoatTypes");
        action.setCallback(this, function(response) {   
            var resp = response.getReturnValue()      
            for(var i = 0; i < resp.length; i++) {
                boatTypes.push({'label' : resp[i].Name, 'id' : resp[i].Id});
            }
            component.set("v.options", boatTypes);
        });
        $A.enqueueAction(action);        
    },
    newBoat : function(component, event, helper) {
        var createBoat = $A.get("e.force:createRecord");
        var selectedType = component.get("v.selectedType");
        selectedType = selectedType == "" ? null : selectedType;
        createBoat.setParams({
            "entityApiName": "Boat__c",
            "defaultFieldValues": {
                'BoatType__c' : selectedType
            }
        });
        createBoat.fire();
    },
    onFormSubmit : function(component, event, helper) {
        var selectedType = component.get("v.selectedType");
        var evt = component.getEvent("formsubmit");
        evt.setParam("formData", {"boatTypeId" : selectedType});        
        evt.fire();     
    }
})
