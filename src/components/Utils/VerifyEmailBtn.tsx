import React from 'react';
import { sendEmailVerification } from '../../actions/authActions';
import { setError } from '../../actions/errorActions';
import { connect, ConnectedProps } from 'react-redux';

const connector = connect(null, { setError });

type Props = ConnectedProps<typeof connector>;

const VerifyEmailBtn: React.FC<Props> = ({ setError }: Props) => {
  return (
    <div>
      <button
        className="btn u-btn-colorized"
        onClick={async () => {
          try {
            await sendEmailVerification();
            throw new Error('A Verification Link has been sent to your email');
          } catch (e) {
            setError({ message: e.message, title: 'Verification Email' });
          }
        }}
      >
        Verify Email
      </button>
    </div>
  );
};

export default connector(VerifyEmailBtn);
