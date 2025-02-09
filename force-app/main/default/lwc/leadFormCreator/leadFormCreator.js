import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import createLead from '@salesforce/apex/CreateLeadFormController.createLead';

export default class LeadFormCreator extends LightningElement {
    leadData = {
        firstName: '',
        lastName: '',
        company: '',
        email: ''
    };

    handleInputChange(event) {
        this[event.target.dataset.field] = event.target.value;
    }

    createLead() {
        createLead({ leadData: this.leadData })
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Lead created',
                        variant: 'success'
                    })
                );
            })
            .catch(error => {
                let errorMessage = error.body ? error.body.message : error.message;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: 'Error creating lead:' + errorMessage,
                        variant: 'error'
                    })
                );
            });
    }

    clearForm() {
        this.leadData = {
            firstName: '',
            lastName: '',
            company: '',
            email: ''
        };
    }
}