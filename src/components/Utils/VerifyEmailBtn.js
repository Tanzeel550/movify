import React, { useState } from 'react';
import { verifyEmail } from '../../actions/authActions';
import MessageModal from './MessageModal';

const VerifyEmailBtn = () => {
  const [message, setMessage] = useState(null);
  return (
    <div>
      <button
        className="btn u-btn-colorized"
        onClick={async () => {
          try {
            await verifyEmail();
            throw new Error('A Verification Link has been sent to your email');
          } catch (e) {
            setMessage(e.message);
          }
        }}
      >
        Verify Email
      </button>
      <MessageModal
        clearMessage={() => setMessage(null)}
        message={message}
        title="Verification Email"
      />
    </div>
  );
};

export default VerifyEmailBtn;
