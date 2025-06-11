package uas.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import uas.model.Book;

import static org.junit.jupiter.api.Assertions.*;

public class BookServiceTest {
    private BookService service;

    @BeforeEach
    public void setUp() {
        service = new BookService();
        service.addBook("Clean Code", "Uncle Bob", 3);
        service.addBook("Zero Stock Book", "Unknown", 0);
    }

    @ParameterizedTest
    @CsvSource({
            "Clean Code, 2",
    })
    public void testLoanBookSuccess(String title, int expectedStock) throws Exception {
        service.loanBook(title);
        Book book = service.findBookByTitle(title);
        assertEquals(expectedStock, book.getStock());
    }

    @Test
    public void testLoanBookOutOfStock() {
        Exception exception = assertThrows(Exception.class, () -> {
            service.loanBook("Zero Stock Book");
        });
        assertEquals("Stok habis", exception.getMessage());
    }

    @Test
    public void testLoanBookNotFound() {
        Exception exception = assertThrows(Exception.class, () -> {
            service.loanBook("Buku Tidak Ada");
        });
        assertEquals("Buku tidak ditemukan", exception.getMessage());
    }
}
