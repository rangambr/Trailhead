({
    onSearch : function(component, event) {
        var params = event.getParam('arguments');
        if(params) {        
            var action = component.get("c.getBoats");
            action.setParams({
                boatTypeId : params.boatTypeId
            });
            action.setCallback(this, function(response) {   
                var resp = response.getReturnValue();
                component.set("v.boats", resp);
            });
            $A.enqueueAction(action);
        }
    }
})
