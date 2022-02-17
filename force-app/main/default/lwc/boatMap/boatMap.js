import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import { APPLICATION_SCOPE, MessageContext, subscribe, unsubscribe } from 'lightning/messageService';
import BOATMC from '@salesforce/messageChannel/BoatMessageChannel__c';

const LONGITUDE_FIELD = 'Boat__c.Geolocation__Longitude__s';
const LATITUDE_FIELD = 'Boat__c.Geolocation__Latitude__s';
const BOAT_FIELDS = [LONGITUDE_FIELD, LATITUDE_FIELD];

export default class BoatMap extends LightningElement {

  // private
  subscription = null;
  @api boatId;
 
  @api
  get recordId() {
    return this.boatId;
  }

  set recordId(value) {
    this.setAttribute('boatId', this.recordId);
    this.boatId = value;
  }

  error = undefined;
  mapMarkers = [];
  // Initialize messageContext for Message Service
  @wire(MessageContext)
  messageContext;
  // Wire the getRecord method using ('$boatId')
  @wire(getRecord, {recordId: '$recordId', fields: BOAT_FIELDS})
  wiredRecord({ error, data }) {
    // Error handling
    if (data) {
      this.error = undefined;
      const longitude = data.fields.Geolocation__Longitude__s.value;
      const latitude = data.fields.Geolocation__Latitude__s.value;
      this.updateMap(longitude, latitude);

    } else if (error) {
      this.error = error;
      this.recordId = undefined;
      this.mapMarkers = [];
    }
  }

  // Encapsulate logic for Lightning message service subscribe and unsubsubscribe
  subscribeToMessageChannel() {
    if (!this.subscription) {
        this.subscription = subscribe(
            this.messageContext,
            BOATMC,
            (message) => {
              this.boatId = message.recordId;
            }, 
            { scope: APPLICATION_SCOPE }
        );
    }
}

  unsubscribeToMessageChannel() {
    unsubscribe(this.subscription);
    this.subscription = null;
  }

  // Runs when component is connected, subscribes to BoatMC
  connectedCallback() {
    // recordId is populated on Record Pages, and this component
    // should not update when this component is on a record page.
    if (this.subscription || this.recordId) {
      return;
    }
    // Subscribe to the message channel to retrieve the recordID and assign it to boatId.
    this.subscribeMC();
  }

  subscribeMC() {
    let subscription = subscribe(
      this.messageContext, 
      BOATMC, 
      (message) => { this.boatId = message.recordId }, 
      { scope: APPLICATION_SCOPE });

  }

  // Creates the map markers array with the current boat's location for the map.
  updateMap(Longitude, Latitude) {
    this.mapMarkers = [Longitude, Latitude];
  }

  // Getter method for displaying the map component, or a helper method.
  get showMap() {
    return this.mapMarkers.length > 0;
  }
}