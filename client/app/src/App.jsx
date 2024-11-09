import { useState } from "react";

export default function App() {

  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');

  const handleAddBook = () => {
    console.log("Book added:", { title, year });
  };

  return (
    <div className="bg-[#2a2a2a] h-[100vh] overflow-hidden">
      <div className="flex justify-center items-center h-full flex-col space-y-4">
        <h1 className="text-5xl text-white font-black">
          Book Website
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
            onClick={handleAddBook}
            className="text-white bg-black rounded-lg p-2">
            Add Book
          </button>
        </div>
      </div>
    </div>
  );
}
