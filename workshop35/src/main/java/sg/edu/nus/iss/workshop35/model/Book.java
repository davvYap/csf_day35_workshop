package sg.edu.nus.iss.workshop35.model;

import org.bson.Document;

import jakarta.json.Json;
import jakarta.json.JsonObject;

public class Book {

    private String title;
    private String authors;

    private double averageRating;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthors() {
        return authors;
    }

    public void setAuthors(String authors) {
        this.authors = authors;
    }

    public double getAverageRating() {
        return averageRating;
    }

    public void setAverageRating(double averageRating) {
        this.averageRating = averageRating;
    }

    public static Book convertFromDocument(Document d) {
        Book book = new Book();
        book.setTitle(d.getString("title"));
        book.setAuthors(d.getString("authors"));
        book.setAverageRating(d.getDouble("average_rating"));
        return book;
    }

    public JsonObject toJsonObject() {
        return Json.createObjectBuilder()
                .add("title", title)
                .add("authors", authors)
                .add("average_rating", averageRating)
                .build();
    }

}
