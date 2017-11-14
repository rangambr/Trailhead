({
    jsLoaded: function(component) {
        component.set("v.jsLoaded", true);
    },

    onPlotMark : function(component,event,helper) {
        var lat = event.getParam("lat");
        var long = event.getParam("long");
        var label = event.getParam("label");
        var loc = {};
        loc.lat = lat;
        loc.long = long;

        component.set("v.location", loc);
    }
})