import css from "./BreedModal.module.css";
import { ThreeCircles } from "react-loader-spinner";

export const BreedModal = ({ isOpen, stateSetter, loadingStatus, breed, isError }) => {
  const handleInfoClose = () => {
    stateSetter(false);
  };

  return (
    <div>
      {isOpen && (
        <div className={css.backDrop}>
          <button className={css.closeModal} onClick={handleInfoClose}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              aria-label="Close"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                cursor: "pointer",
                display: "inline-block",
              }}
            >
              <path
                d="M6.5 6.5 L17.5 17.5 M17.5 6.5 L6.5 17.5"
                style={{
                  fill: "none",
                  stroke: "#ffffff",
                  strokeWidth: 2.75,
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                }}
              />
            </svg>
          </button>
          {loadingStatus === false && isError === false ? (
            <div className={css.modalWindow}>
              <div className={css.canineInfo}>
                <div className={css.imageWrapper}>
                  <img className={css.infoImage} src={breed.image.url} />
                  <div className={css.name}>{breed.name}</div>
                </div>
                <div className={css.description}>
                  <div className={css.descriptionTitle}>Description</div>
                  <div className={css.descriptionInfo}>{breed.description}</div>
                </div>
                <div className={css.temperament}>
                  <div className={css.temperamentTitle}>Temperament</div>
                  <div className={css.temperamentInfo}>{breed.temperament}</div>
                </div>
                <div className={css.history}>
                  <div className={css.historyTitle}>History</div>
                  <div className={css.historyInfo}>{breed.history}</div>
                </div>
                <div className={css.origin}>
                  <div className={css.originTitle}>Country of Origin</div>
                  <div className={css.originInfo}>{breed.origin}</div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              {isError === false && (
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
              )}
            </div>
          )}

          {isError && loadingStatus === false && (
            <div>
              <div>
                Error getting breed details, close modal and select breed again
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
