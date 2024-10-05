package io.minh18ndh.github.notableviet;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "viets")   // Annotate this class as a document
public class Viet {

    @Id   // Let framework know that id property should be treated as unique identifier for each person
    private ObjectId id;
    private String name;
    private String born;
    private String died;
    private String occupation;
    private String wikipedia;
    private String gps;

    // Constructor
    public Viet() {
    }

    public Viet(ObjectId id, String name, String born, String died, String occupation, String wikipedia, String gps) {
        this.id = id;
        this.name = name;
        this.born = born;
        this.died = died;
        this.occupation = occupation;
        this.wikipedia = wikipedia;
        this.gps = gps;
    }

    // Getters
    public ObjectId getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getBorn() {
        return born;
    }

    public String getDied() {
        return died;
    }

    public String getOccupation() {
        return occupation;
    }

    public String getWikipedia() {
        return wikipedia;
    }

    public String getGps() {
        return gps;
    }

    // Setters
    public void setId(ObjectId id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setBorn(String born) {
        this.born = born;
    }

    public void setDied(String died) {
        this.died = died;
    }

    public void setOccupation(String occupation) {
        this.occupation = occupation;
    }

    public void setWikipedia(String wikipedia) {
        this.wikipedia = wikipedia;
    }

    public void setGps(String gps) {
        this.gps = gps;
    }
}
