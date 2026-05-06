import { useNavigate, useRouteLoaderData } from 'react-router-dom';
import './NavigationPage.css'
import { useContext, useEffect, useState } from 'react';
import { ProductContext } from '../App';

export default function Searchbar() {
  const [search, setsearch] = useState('');
  const [searchresult, setsearchresult] = useState([]);
  const [visible, setvisible] = useState(false);

  const [historysearch, sethistorysearch] = useState(() => {
    try {
      const saved = localStorage.getItem('search_history');
      if (saved && saved !== "undefined") {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.error("Failed to parse history:", error);
    }
    return [];
  });
  const data = useRouteLoaderData('root');

  const adddata = useContext(ProductContext);
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.setItem('search_history', JSON.stringify(historysearch))
  }, [historysearch])

  useEffect(() => {
    if (!search.trim()) {
      // setsearchresult([]);
      return;
    }
    const found = data.filter(product =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
    
    setsearchresult(found.slice(0, 4));
  }, [search, data]);

  function handleSearch() {
    if (!search.trim()) return;
    sethistorysearch(prev => {
      const newHistory = [search, ...prev.filter(item => item !== search)].slice(0, 4);
      return newHistory;
    });
    setvisible(false);

    const foundProduct = data.filter(product =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );

    adddata.setdata(foundProduct);
    navigate('/search');
  }

  const deleteHistory = (indexToDelete) => {
    sethistorysearch(historysearch.filter((_, i) => i !== indexToDelete));
  };

  return (
    <>
      <div id="searcharea">
        <input
          type="search"
          value={search}
          onClick={() => setvisible(!visible)}
          onChange={(e) => setsearch(e.target.value)}
          autoComplete='off'
          id="navsearch"
          placeholder="Search"
        />
        <button onClick={handleSearch}>🔍</button>
      </div>

      {search !== 0 && visible && <ul id='searchresult'>
        {search && searchresult.map((sr) => (
          <li key={sr.id} onClick={() => setsearch(sr.name)}>{sr.name}</li>
        ))}

        {search && searchresult.length === 0 && <li>Not found</li>}

        {historysearch.length > 0 && search.length === 0 && (
          <>
            <li style={{ fontWeight: 'bold', backgroundColor: '#eee', width: "600px" }}>Recent Searches</li>
            {historysearch.map((item, index) => (
              <li key={index} style={{ display: 'flex', justifyContent: 'space-between', }}>
                <span onClick={() => setsearch(item)}>{item}</span>
                <button onClick={() => deleteHistory(index)} style={{ color: 'SKYBLUE', border: 'none', background: 'none', cursor: 'pointer' }}>
                  x
                </button>
              </li>
            ))}
          </>
        )}
      </ul>}
    </>
  );
}
