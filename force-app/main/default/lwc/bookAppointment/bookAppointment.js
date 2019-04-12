import { LightningElement, api } from 'lwc';
import EMPTY from '@salesforce/resourceUrl/empty';
import BOOKAPPT from '@salesforce/apex/RestaurantFinder.createEvent';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class BookAppointment extends LightningElement {
    @api lat;
    @api lon;
    @api name;
    @api contactId;

    selectedDateTime;
    duration;

    emptyURL = EMPTY;

    get mapMarkers(){
        return [{
            location: {
                'Latitude': this.lat,
                'Longitude': this.lon
            }
        }];
    } 

    handleChange(event){
        const targetName = event.target.name;
        if(targetName === 'appointmentStart'){
            this.selectedDateTime = event.target.value;
        }
        if(targetName === 'duration'){
            this.duration = event.target.value;
        }
    }

    get showMap(){
        return (this.lat !=null && this.lon != null)? true: false;
    }

    handleClick(){
        BOOKAPPT({
            duration: this.duration,
            dt: this.selectedDateTime,
            contactId: this.contactId,
            rName: this.name,
        })
        .then(() => {
            this.dispatchEvent(new ShowToastEvent({
                title: 'Appointment Booked',
                message: 'Booked Successfully',
                variant: 'success'
            }));
        })
        .catch(error => {
            this.dispatchEvent(new ShowToastEvent({
                title: 'Error Occurred',
                message: error,
                variant: 'error'
            }));
        });

    }
}