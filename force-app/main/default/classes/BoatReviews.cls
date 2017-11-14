public with sharing class BoatReviews {
    @AuraEnabled
    public static List<BoatReview__c> getAll(Id boatId) {
        try{
            return [SELECT Id, Name, Comment__c, Rating__c, LastModifiedDate, 
            CreatedBy.Name, CreatedBy.SmallPhotoUrl, CreatedBy.CompanyName,
            CreatedDate, CreatedBy.Id FROM BoatReview__c WHERE Boat__c =:boatId];
        } catch(Exception ex) {
            throw new AuraHandledException(ex.getMessage());
        }
        
    }
}
