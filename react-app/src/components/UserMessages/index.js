import React, { useState } from 'react';
import { Modal } from '../Context/Modal.js'
import { useSelector } from 'react-redux';
import UserMessages from './UserMessages.js';
import LoginForm from '../auth/LoginForm.js';
import SignUpForm from '../auth/SignUpForm.js';


function MultiModal() {
	const user = useSelector(state => state.session.user)

	const [showModal, setShowModal] = useState(false);
	const [showLoginModal, setShowLoginModal] =useState(false)


  if (user) {
  return (
		<>
			<button className='button'
				onClick={() => setShowModal(true)}
			>Your Notifications
            </button>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<UserMessages setShowModal={setShowModal} />
				</Modal>
			)}
		</>
  )} else {
	return (
		<>
			<p id='login_nav' className="splash-page_nav"
				onClick={() => setShowLoginModal(true)}
			>&nbsp;&nbsp;Login&nbsp;&nbsp;
            </p>
			{showLoginModal && (
				<Modal code={"login"} onClose={() => setShowLoginModal(false)}>
					<LoginForm setShowModal={setShowModal} />
				</Modal>
			)}
			<p id='signup_nav' className="splash-page_nav"
				onClick={() => setShowModal(true)}
			>&nbsp;&nbsp;Sign Up&nbsp;&nbsp;
            </p>
			{showModal && (
				<Modal code={'signup'} onClose={() => setShowModal(false)}>
					<SignUpForm setShowModal={setShowModal} />
				</Modal>
			)}
		</>
	)



  }
}

export default MultiModal;
