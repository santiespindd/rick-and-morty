import { useEffect, useState } from "react";
import Character from "./Character";



function NavPage({page, setPage , btnDisabled}){

    return(
       <div>
            <nav className="d-flex justify-content-between align-items-center">
              <button className="btn btn-primary btn-sm mb-3" 
                      onClick={() => setPage(page-1)}
                      disabled = {btnDisabled}
              >

                  Page {btnDisabled ? '' : page  }
              </button>
              <button className="btn btn-primary btn-sm mb-3"
                      onClick={() => setPage(page+1)}
                    
              >

                  Page {page + 2}
              </button>

        </nav>
       </div>
        
    );
}



function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
      const data = await response.json();
      

      setCharacters(data.results);
    }

    fetchData();
  }, [page]);

  return (
    <div className="container">
        <NavPage page={page} setPage={setPage} btnDisabled = { page > 0 ? false : true}/>

        <div className="row">
          {characters.map((character) => (
            <div className="col-md-4" key={character.id}>
              <Character
               
                character={character}
              />
            </div>
          ))}
        </div>
        <NavPage page={page} setPage={setPage} btnDisabled = { page > 0 ? false : true}/>
    </div>
  );
}

export default CharacterList;
