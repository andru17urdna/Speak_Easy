import React, { useState } from 'react';
import { Modal } from '../Context/Modal.js'
import UserMessages from './UserMessages.js';


function UserMessagesModal() {
  const [showModal, setShowModal] = useState(false);

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
  );
}

export default UserMessagesModal;
