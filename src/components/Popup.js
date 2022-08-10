export default function Popup({isOpen, onClose, item}) {
    return (
        <div
          className={`popup ${isOpen && "popup_opened"}`}>
          <div className="popup__container">
            <button
              className="popup__close-button"
              type="button"
              onClick={onClose}
            ></button>
            <h2 className="popup__title">{item.title}</h2>
            <p className="popup__text">{item.text}</p>
          </div>
        </div>
      );
    }