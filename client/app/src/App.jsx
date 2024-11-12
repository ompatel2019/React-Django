import { useState, useEffect } from "react";

export default function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [newTitle, setNewTitle] = useState('');
  
  const fetchBooks = async () => { 
    try { 
      const response = await fetch('http://127.0.0.1:8000/api/books/');
      const data = await response.json();
      console.log(data);  
      setBooks(data);     
    } catch (err) { 
      console.log(err);
    }
  };

  useEffect(() => { 
    fetchBooks();
  }, []);

  const addBook = async () => { 
    const newBook = {
      'title': title,
      'release_year': year  
    };
    try {
      const response = await fetch('http://127.0.0.1:8000/api/books/create', {
        method: "POST", 
        headers: { 
          'Content-Type': "application/json",
        }, 
        body: JSON.stringify(newBook)
      });
      const data = await response.json();
      console.log(data);
 
      setBooks([...books, data]);

    } catch (err) { 
      console.log(err);
    }
  }

  const updateTitle = async (pk, release_year) => { 
    const updatedBook = {
      'title': newTitle,
      'release_year': release_year  
    };
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/books/${pk}/`, {
        method: "PUT", 
        headers: { 
          'Content-Type': "application/json",
        }, 
        body: JSON.stringify(updatedBook)
      });
      const data = await response.json();
      console.log(data);

      fetchBooks()

    } catch (err) { 
      console.log(err);
    }
  }

  const deleteBook = async (pk) => { 
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/books/${pk}/`, {
        method: "DELETE",
        headers: { 
          'Content-Type': "application/json",
        }
      });
      response.ok ? fetchBooks() : console.log('Error deleting book');
    } catch (err) { 
      console.log(err);
    }
  };

  return (
    <div className="bg-[#2a2a2a] h-[100vh]">
      <div className="flex justify-center items-center h-full flex-col space-y-4">
        <h1 className="text-5xl text-white font-black">
          Your Library
        </h1>

        <div className="flex flex-col gap-2">
          <input 
            onChange={(e) => setTitle(e.target.value)}
            className="p-2"
            type="text"
            value={title}
            placeholder="Book Title..."
          /> 

          <input 
            onChange={(e) => setYear(e.target.value)}
            className="p-2"
            type="number"
            value={year}
            placeholder="Release Year..."
          />

          <button 
            onClick={addBook}  
            className="text-white bg-black rounded-lg p-2">
            Add Book
          </button>
        </div>

        <div className="space-y-4">
          {books.map((book, bookIndex) => (
            <div className="text-white" key={bookIndex}> 
              <p>Title: {book.title}</p>
              <input 
              type="text" 
              className="p-2 text-black"
              placeholder="New Title..." 
              onChange={(e) => setNewTitle(e.target.value)}
              />
              <p>Release Year: {book.release_year}</p>

              <button
              className="text-white bg-black rounded-lg p-2"
              onClick={() => updateTitle(book.id, book.release_year)}>
                Change title
              </button>
              <button
              className="text-white bg-black rounded-lg p-2"
              onClick={() => deleteBook(book.id)}>
                Delete Book
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
