public with sharing class BoatSearchResults {
    @AuraEnabled
    public static List<Boat__c> getBoats(String boatTypeId) {
        if(String.isEmpty(boatTypeId)) {
            return [SELECT Id, Name, Contact__r.Name, Picture__c, Geolocation__Latitude__s, Geolocation__Longitude__s  FROM Boat__c];
        }
        return [SELECT Id, Name, Contact__r.Name, Picture__c, Geolocation__Latitude__s, Geolocation__Longitude__s FROM Boat__c WHERE BoatType__c =:boatTypeId];
    }
}
