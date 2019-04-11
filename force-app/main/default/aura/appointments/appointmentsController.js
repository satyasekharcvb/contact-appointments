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
    }
})
