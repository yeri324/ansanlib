package com.ansanlib.constant;

public enum Gender {
   MALE, FEMALE;
   
   public static Gender fromString(String gender) {
       switch (gender.toUpperCase()) {
           case "MALE":
               return MALE;
           case "FEMALE":
               return FEMALE;
           default:
               throw new IllegalArgumentException("Unknown gender: " + gender);
       }
   }
   
}
