({
    doInit: function (component, event, helper) {
        var action = component.get("c.pastAppointments");
        action.setParams({ contactId : component.get("v.recordId") });

        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.eventsList",response.getReturnValue());
            }
            else if (state === "INCOMPLETE") {
                component.set("v.eventsList",null);
            }
            else if (state === "ERROR") {
                component.set("v.eventsList",null);
            }
        });
        $A.enqueueAction(action);
    },

    handlePubsubReady: function(component) {
        var pubsub = component.find('pubsub');
        var callback = $A.getCallback(function(data) {
            component.set("v.lat", data.lat);
            component.set("v.lon", data.lon);
            component.set("v.name", data.name);
           
        });
        pubsub.registerListener('locationSelected', callback);
    },

    handleDestroy: function(component) {
        var pubsub = component.find('pubsub');
        pubsub.unregisterAllListeners();
    }
})
