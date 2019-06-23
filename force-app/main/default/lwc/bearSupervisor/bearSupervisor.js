import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi'; //Get record 
import SUPERVISOR_FIELD from '@salesforce/schema/Bear__c.Supervisor__c'; // Get field api name

const bearFields = [SUPERVISOR_FIELD];

export default class BearSupervisor extends LightningElement {
    @api recordId; // Bear Id
    
	@wire(getRecord, { recordId: '$recordId', fields: bearFields })
    bear;
    
	get supervisorId() {
		return getFieldValue(this.bear.data, SUPERVISOR_FIELD);
	}
}