package sg.edu.nus.iss.workshop35.controller;

import java.io.StringReader;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.json.Json;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;
import sg.edu.nus.iss.workshop35.model.Book;
import sg.edu.nus.iss.workshop35.service.BooksService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "/api")
public class BooksRestController {

    @Autowired
    BooksService booksService;

    @PostMapping(path = "/books", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> getBooks(@RequestBody String payload) {
        JsonReader jr = Json.createReader(new StringReader(payload));
        JsonObject jsObj = jr.readObject();
        String title = jsObj.getString("title");

        List<Book> books = booksService.getBooks(title);

        JsonArrayBuilder jsArr = Json.createArrayBuilder();
        for (Book b : books) {
            jsArr.add(b.toJsonObject());
        }

        System.out.println("JAVA SERVER ONLINE");

        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.APPLICATION_JSON)
                .body(jsArr.build().toString());
    }
}
