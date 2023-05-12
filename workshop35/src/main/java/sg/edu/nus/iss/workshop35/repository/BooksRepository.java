package sg.edu.nus.iss.workshop35.repository;

import java.util.List;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import sg.edu.nus.iss.workshop35.model.Book;

@Repository
public class BooksRepository {

    @Autowired
    MongoTemplate mongoTemplate;

    // read data from mongodb
    public List<Book> getBooks(String title) {

        String regexTitle = ".*" + title + ".*";
        Criteria c = Criteria.where("title").regex(regexTitle, "i");

        Query q = Query.query(c).with(Sort.by(Sort.Direction.ASC, "title")).limit(20);

        List<Book> results = mongoTemplate.find(q, Document.class, "books").stream()
                .map(d -> Book.convertFromDocument(d))
                .toList();
        return results;
    }

}
