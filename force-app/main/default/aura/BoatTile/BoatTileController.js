({
    doInit : function(component, event, helper) {
        var imgUrl = component.get("v.boat").Picture__c;
        var backgroundImage = 'background-image: url("'+imgUrl+'")';
        component.set("v.backgroundStyle", backgroundImage);
    },

    onBoatClick : function(component, event, helper) {
        var evt = component.getEvent("boatSelect");
        var boat = component.get("v.boat");
        evt.setParam("boatId", boat.Id);        
        evt.fire();   
        
        var appEvent = $A.get("e.c:boatSelected");
        appEvent.setParams({"boat" : boat});
        appEvent.fire();  
        
        var locEvent = $A.get("e.c:PlotMapMarker");
        console.log(boat);
        locEvent.setParams({
            "sObjectId" : boat.Id,
            "lat" : boat.Geolocation__Latitude__s,
            "long" : boat.Geolocation__Longitude__s,
            "label" : boat.Name
        });
        locEvent.fire();  
    }
})
