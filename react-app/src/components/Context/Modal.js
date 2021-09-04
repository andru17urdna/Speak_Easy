import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css'


const ModalContext = React.createContext();

export function ModalProvider({ children }) {
  const modalRef = useRef();
  const [value, setValue] = useState();


  useEffect(() => {
    setValue(modalRef.current);
  }, [])

  return (
    <>
      <ModalContext.Provider value={value}>
        {children}
      </ModalContext.Provider>
      <div id='modal__container--div' ref={modalRef} />
    </>
  );
}

export function Modal({ onClose, code, children }) {
  const modalNode = useContext(ModalContext);
  if (!modalNode) return null;

  switch(code) {
    case "login":

      return ReactDOM.createPortal(
        <div id="login-modal">
          <div id="login-modal-background" onClick={onClose} />
          <div id="login-modal-content">
            {children}
          </div>
        </div>,
        modalNode
      );

    case "signup":

      return ReactDOM.createPortal(
        <div id="signup-modal">
          <div id="signup-modal-background" onClick={onClose} />
          <div id="signup-modal-content">
            {children}
          </div>
        </div>,
        modalNode
      );

    default:
      return ReactDOM.createPortal(
        <div id="modal">
          <div id="modal-background" onClick={onClose} />
          <div id="modal-content">
            {children}
          </div>
        </div>,
        modalNode
      );
  }


}
