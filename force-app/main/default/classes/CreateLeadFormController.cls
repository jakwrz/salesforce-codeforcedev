global class CreateLeadFormController {
    global class LeadWrapper {
        @AuraEnabled
        public String firstName {get;set;}

        @AuraEnabled
        public String lastName {get;set;}

        @AuraEnabled
        public String company {get;set;}

        @AuraEnabled
        public String email {get;set;}
    }



    @AuraEnabled
    public static void createLead(LeadWrapper leadData){
        if (leadData == null) {
            throw new AuraHandledException('Lead data cannot be null!');
        }

        Lead lead = new Lead(
            FirstName = leadData.firstName,
            LastName = leadData.lastName,
            Company = leadData.company,
            Email = leadData.email,
            Status = 'New'
        );

        try {
            insert lead;
        } catch (Exception e) {
            throw new AuraHandledException('Error during lead creation: ' + e.getMessage());
        }
    }
}