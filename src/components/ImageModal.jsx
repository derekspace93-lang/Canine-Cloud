import css from "./ImageModal.module.css";
import { ThreeCircles } from "react-loader-spinner";

export const ImageModal = ({ isOpen, stateSetter, loadingStatus, image, isError }) => {

  const handleImageClose = () => {
    stateSetter(false);
  };

  return (
    <div>
      {isOpen && (
        <div className={css.backDrop}>
          <button className={css.closeModal} onClick={handleImageClose}>
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
                  <img className={css.infoImage} src={image.url} />
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
