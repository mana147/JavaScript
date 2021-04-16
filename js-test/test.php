<?php
     class BookSingleton {
          private $author = 'Gamma, Helm, Johnson, and Vlissides';
          private $title  = 'Design Patterns';
          private static $book = NULL;
          private static $isLoanedOut = FALSE;

          private function __construct() {
          }

          static function borrowBook() {
            if (self::$isLoanedOut == FALSE) {
              if (self::$book == NULL) {
                 self::$book = new BookSingleton();
              }
              self::$isLoanedOut = TRUE;

              return self::$book;
            } else {
              return NULL;
            }
          }

          function returnBook(BookSingleton $bookReturned) {
              self::$isLoanedOut = FALSE;
          }

          function getAuthor() {
               return $this->author;
          }

          function getTitle() {
              return $this->title;
          }

          function getAuthorAndTitle() {
            return $this->getTitle() . ' by ' . $this->getAuthor();
          }
       }

     class BookBorrower {
          private $borrowedBook;
          private $haveBook = FALSE;

          function __construct() {
          }

          function getAuthorAndTitle() {
            if ($this->haveBook == TRUE) {
              return $this->borrowedBook->getAuthorAndTitle();
            } else {
              return "I don't have the book";
            }
          }

          function borrowBook() {
            $this->borrowedBook = BookSingleton::borrowBook();
            if ($this->borrowedBook == NULL) {
              $this->haveBook = FALSE;
            } else {
              $this->haveBook = TRUE;
            }
          }

          function returnBook() {
            $this->borrowedBook->returnBook($this->borrowedBook);
          }
       }

     // Initialization

     echo 'BEGIN TESTING SINGLETON PATTERN\n\n';
     $bookBorrower1 = new BookBorrower();
     $bookBorrower2 = new BookBorrower();

     $bookBorrower1->borrowBook();
     echo 'BookBorrower1 asked to borrow the book\n';
     echo 'BookBorrower1 Author and Title:\n';
     echo $bookBorrower1->getAuthorAndTitle() . '\n\n';

     $bookBorrower2->borrowBook();
     echo 'BookBorrower2 asked to borrow the book\n';
     echo 'BookBorrower2 Author and Title:\n';
     echo $bookBorrower2->getAuthorAndTitle() . '\n\n';

     $bookBorrower1->returnBook();
     echo 'BookBorrower1 returned the book\n\n';

     $bookBorrower2->borrowBook();
     echo 'BookBorrower2 Author and Title:\n';
     echo $bookBorrower1->getAuthorAndTitle() . '\n\n';

     echo 'END TESTING SINGLETON PATTERN';
?>