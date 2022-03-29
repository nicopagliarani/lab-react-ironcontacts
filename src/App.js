import { useState } from "react";
import "./App.css";
import allContacts from "./contacts.json";
/* import contacto from './contacts.json' */

function App() {
  const firstFive = allContacts.slice(0, 5);
  const [celebs, setCelebs] = useState(firstFive);

  const addContact = () => {
    const random = allContacts[Math.floor(Math.random() * allContacts.length)];
    if (celebs.find((celebs) => celebs.id === random.id)) {
      if (celebs.length < allContacts.length) {
        addContact();
      }
      return;
    }
    setCelebs((celebs) => [random, ...celebs]);
  };

  const sortedByName = () => {
    const sortIt = [...celebs];
    sortIt.sort((a, b) => a.name.localeCompare(b.name));

    setCelebs(sortIt);
  };

  const sortedByPopularity = () => {
    const sortIt = [...celebs];
    sortIt.sort((a, b) => b.popularity - a.popularity);

    setCelebs(sortIt);
  };

  const deleteCeleb = (celebToFind) => {
    setCelebs((oldCelebs) => {
      return oldCelebs.filter((celebs) => celebs.id !== celebToFind.id);
    });
  };

  return (
    <div className="App">
      <h1>NICADO Contacts</h1>
      <div id="btn-container">
        <button className="random-button" onClick={addContact}>
          Add a random celebrity
        </button>
        <button className="random-button" onClick={sortedByName}>
          Sort by name
        </button>
        <button className="random-button" onClick={sortedByPopularity}>
          Sort by popularity
        </button>
      </div>

      <table>
        <thead>
          <div>
            <tr>
              <th>Picture</th>
              <th>Name</th>
              <th>Popularity</th>
              <th>Won Oscar</th>
              <th>Won Emmy</th>
            </tr>
          </div>
          <hr className="hr-line"></hr>
        </thead>
        <tbody>
          <div>
            {celebs.map((elem, index) => {
              return (
                <tr key={elem.name + index}>
                  <td>
                    <img
                      src={elem.pictureUrl}
                      alt="celeb pic"
                      style={{ height: "100px" }}
                    />
                  </td>
                  <td>
                    <h3>{elem.name}</h3>
                  </td>
                  <td>
                    <h3>{elem.popularity}</h3>
                  </td>
                  <td>
                    <h3>{elem.wonOscar ? <p>🏆</p> : <p>💩</p>}</h3>
                  </td>
                  <td>
                    <h3>{elem.wonEmmy ? <p>🏆</p> : <p>💩</p>}</h3>
                  </td>
                  <td>
                    <button
                      className="random-button"
                      onClick={() => deleteCeleb(elem)}
                    >
                      delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </div>
        </tbody>
      </table>
    </div>
  );
}

export default App;