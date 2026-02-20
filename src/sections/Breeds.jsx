import css from './Breeds.module.css';
import { useState, useEffect } from 'react';
import { getCanineBreeds, getCanineByBreed } from "./Endpoints/Endpoints";
import { ThreeCircles } from "react-loader-spinner";
import { BreedModal } from "../components/BreedModal";


const Breeds = () => {

  const [canineBreeds, setCanineBreeds] = useState([]);
  const [canineBreed, setCanineBreed] = useState({});
  const [filterWord, setFilterWord] = useState('');
  const [filteredBreeds, setFilteredBreeds] = useState([]);
  const [areBreedsLoading, setBreedsLoadingStatus] = useState();
  const [isBreedLoading, setBreedLoadingStatus] = useState(false);
  const [areBreedsLoadingError, setBreedsLoadingError] = useState(false);
  const [isBreedLoadingError, setBreedLoadingError] = useState(false);
  const [modalState, setModalState] = useState(false);

  const handleChange = (evt) => {
    evt.preventDefault();
    //console.log(evt.target.value);
    setFilterWord(evt.target.value);
    
    const filterTemp = canineBreeds.filter(
      (breed) =>
        breed.name
          .toLowerCase()
          .includes(evt.target.value.trim().toLowerCase()) &&
        evt.target.value.trim() !== "",
    );
    //console.log(filterTemp);
    setFilteredBreeds([...filterTemp]);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    //console.log(evt.target[0].value);
    setFilterWord(evt.target[0].value);
  };

  useEffect(() => {
      setBreedsLoadingError(false);
      setBreedsLoadingStatus(true);
      getCanineBreeds()
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((response) => {
          //console.log(response);
          //setBreedsLoadingError(false);
          setCanineBreeds([...response]);
          setBreedsLoadingStatus(false);
        })
        .catch((error) => {
          setBreedsLoadingStatus(false);
          setBreedsLoadingError(true);
          console.error(`Error message ${error}`);
        });
    }, []);
  
  const handleTryAgain = () => {
    setBreedsLoadingError(false);
    setBreedsLoadingStatus(true);
      getCanineBreeds()
        .then((response) => {
          //console.log(response);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((response) => {
          setCanineBreeds([...response]);
          setBreedsLoadingStatus(false);
          //console.log(response);
        })
        .catch((error) => {
          setBreedsLoadingStatus(false);
          setBreedsLoadingError(true);
          console.error(`Error message ${error}`);
        });
  }

  const handleBreedSelect = (name, evt) => {
    setBreedLoadingError(false);
    setBreedLoadingStatus(true);
    setModalState(true);
    getCanineByBreed(name)
      .then((response) => {
        //console.log(response);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((response) => {
        setCanineBreed({ ...response[0] });
        
        setBreedLoadingStatus(false);
        //console.log(response);
      })
      .catch((error) => {
        setBreedLoadingStatus(false);
        setBreedLoadingError(true);
        console.error(`Error message ${error}`);
      });
  };
  
  
  return (
    <section className="c-space section-spacing" id="breeds">
      <h2 className={css.textHeading}>Breeds</h2>
      <div className={css.breedsGalleryWrapper}>
        <div className={css.breedsGallery}>
          <BreedModal
            isOpen={modalState}
            stateSetter={setModalState}
            loadingStatus={isBreedLoading}
            breed={canineBreed}
            isError={isBreedLoadingError}
          />
          <form
            className={css.form}
            onChange={handleChange}
            onSubmit={handleSubmit}
          >
            <input
              className={css.input}
              type="text"
              autoComplete="off"
              placeholder="Search for Canine Breeds"
            />
            <button type="submit" className={css.button}>
              <span className={css.buttonLabel}>Search</span>
            </button>
          </form>
          {areBreedsLoading && (
            <div className={css.backDrop}>
              <div className={css.centerStyle}>
                <ThreeCircles
                  visible={true}
                  height="60"
                  width="60"
                  color="#ffff"
                  radius="9"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass={{}}
                />
              </div>
            </div>
          )}

          {areBreedsLoading === false &&
            areBreedsLoadingError === false &&
            filterWord === "" && (
              <ul className={css.breedList}>
                {canineBreeds.map((breed) => {
                  return (
                    <li
                      key={breed.id}
                      className={css.breedListItem}
                      onClick={(evt) => handleBreedSelect(breed.name, evt)}
                    >
                      <div>
                        <img className={css.smallImage} src={breed.image.url} />
                      </div>
                      <p>{breed.name}</p>
                    </li>
                  );
                })}
              </ul>
            )}

          {areBreedsLoading === false &&
            areBreedsLoadingError === false &&
            filterWord !== "" && (
              <ul className={css.breedList}>
                {filteredBreeds.map((breed) => {
                  return (
                    <li
                      className={css.breedListItem}
                      onClick={(evt) => handleBreedSelect(breed.name, evt)}
                    >
                      <div>
                        <img className={css.smallImage} src={breed.image.url} />
                      </div>
                      <p>{breed.name}</p>
                    </li>
                  );
                })}
              </ul>
            )}

          {areBreedsLoading === false && areBreedsLoadingError === true && (
            <>
              <div>Error</div>
              <button className={css.button} onClick={handleTryAgain}>
                Try Again
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Breeds;
