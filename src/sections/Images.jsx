import css from './Images.module.css';
import { useState, useEffect } from "react";
import { Particles } from "../components/Particles";
import { getCaninePics, getOneCaninePic } from "./Endpoints/Endpoints";
import { ThreeCircles } from "react-loader-spinner";
import { ImageModal } from "../components/ImageModal";


const Images = () => {

  const [modalState, setModalState] = useState();
  const [canineImage, setCanineImage] = useState({});
  const [canineImages, setCanineImages] = useState([]);
  const [areImagesLoading, setImagesLoadingStatus] = useState(false);
  const [areImagesLoadingError, setImagesLoadingError] = useState(false);
  const [isImageLoading, setImageLoadingStatus] = useState(false);
  const [isImageLoadingError, setImageLoadingError] = useState(false);

  const handleTryAgain = () => {
    setImagesLoadingError(false);
    setImagesLoadingStatus(true);
    getCaninePics()
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((response) => {
        //setImagesLoadingError(false);
        setCanineImages([...response]);
        setImagesLoadingStatus(false);
        console.log(response);
      })
      .catch((error) => {
        setImagesLoadingStatus(false);
        setImagesLoadingError(true);
        console.error(`Error message ${error}`);
      });
  }

  const handleImageSelect = (id, evt) => {
    setModalState(true);
    setImageLoadingError(false);
    setImageLoadingStatus(true);
    getOneCaninePic(id)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((response) => {
        //setImagesLoadingError(false);
        setCanineImage({ ...response });
        setImageLoadingStatus(false);
        console.log(response);
      })
      .catch((error) => {
        setImageLoadingStatus(false);
        setImageLoadingError(true);
        console.error(`Error message ${error}`);
      });
  };
   

  useEffect(() => { 
    setImagesLoadingError(false);
    setImagesLoadingStatus(true);
    getCaninePics()
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((response) => {
        //setImagesLoadingError(false);
        setCanineImages([...response]);
        setImagesLoadingStatus(false);
      })
      .catch((error) => {
        setImagesLoadingStatus(false);
        setImagesLoadingError(true);
        console.error(`Error message ${error}`);
      });
  }, []);

  
  return (
    <section
      id="images"
      className="relative items-center c-space section-spacing"
    >
      <Particles
        className="absolute inset-0 -z-50"
        quantity={100}
        ease={80}
        color={"#ffa500"}
        refresh
      />
      <h2 className={css.textHeading}>Images</h2>
      <div className={css.imagesGalleryWrapper}>
        <div className={css.imagesGallery}>
          <ImageModal
            isOpen={modalState}
            stateSetter={setModalState}
            loadingStatus={isImageLoading}
            image={canineImage}
            isError={isImageLoadingError}
          />
          {areImagesLoading && (
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
          {areImagesLoading === false && areImagesLoadingError === false && (
            <ul className={css.imageList}>
              {canineImages.map((image) => {
                return (
                  <li
                    key={image.id}
                    className={css.imageListItem}
                    onClick={(evt) => handleImageSelect(image.id, evt)}
                  >
                    <img className={css.image} src={image.url} />
                  </li>
                );
              })}
            </ul>
          )}
          {areImagesLoading === false && areImagesLoadingError === true && (
            <>
              <div>Error, could not get images</div>
              <button className={css.button} onClick={handleTryAgain}>
                Try Again
              </button>
            </>
          )}

          <button
            style={{ marginTop: 40 }}
            className={css.button}
            onClick={handleTryAgain}
          >
            Get More
          </button>
        </div>
      </div>
    </section>
  );
};

export default Images;
