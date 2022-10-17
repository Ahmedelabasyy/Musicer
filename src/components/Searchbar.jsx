import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Searchbar = () => {
  const navigate = useNavigate();
  const [searchTerm, setsearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate(`/search/${searchTerm}`);
  };
  return (
    <form onSubmit={handleSubmit} autoComplete="off" className="p-2 text-gray-400 focus-within:text-gray-600">
      <label htmlFor="search-feild" className="sr-only">
        Search all songs
      </label>

      <div className="flex flex-row justify-start items-center">
        <FaSearch className="w-5 h-5 ml-4" />
        <input
          type="search"
          name="search-feild"
          id="search-feild"
          value={searchTerm}
          onChange={(e) => setsearchTerm(e.target.value)}
          autoComplete="off"
          placeholder="Search for song"
          className="bg-transparent border-none outline-none flex-1 placeholder-gray-500 text-base text-white p-4"
        />
      </div>
    </form>
  );
};

export default Searchbar;
