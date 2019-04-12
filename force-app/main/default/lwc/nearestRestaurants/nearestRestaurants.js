import { LightningElement, api, wire } from 'lwc';
import getRestaurantList from '@salesforce/apex/RestaurantFinder.getRestaurantList';
import {CurrentPageReference} from 'lightning/navigation';
import {fireEvent} from 'c/pubsub';

export default class NearestRestaurants extends LightningElement {
    @api recordId;

    @wire(CurrentPageReference)
    pageRef;

    @wire(getRestaurantList, {contactId: '$recordId'})
    restaurantsList;

    handleClick(event){
        event.preventDefault();
        const location = {
            "name": event.target.getAttribute('data-name'),
            "lat": event.target.getAttribute('data-lat'),
            "lon": event.target.getAttribute('data-lon')
        };    

        fireEvent(this.pageRef, 'locationSelected',location );
    }

}