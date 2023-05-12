package sg.edu.nus.iss.workshop35.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sg.edu.nus.iss.workshop35.model.Book;
import sg.edu.nus.iss.workshop35.repository.BooksRepository;

@Service
public class BooksService {

    @Autowired
    BooksRepository booksRepository;

    public List<Book> getBooks(String title) {
        return booksRepository.getBooks(title);
    }

}
