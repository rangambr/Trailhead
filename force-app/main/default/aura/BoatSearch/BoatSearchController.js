({
    onFormSubmit : function(component, event, helper) {
        var btSearchRes = component.find("boatSearchRes");
        btSearchRes.search(event.getParam("formData").boatTypeId);
    }
})
