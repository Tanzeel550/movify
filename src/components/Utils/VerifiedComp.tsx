import React, { ReactElement } from 'react';
import VerifyEmailBtn from './VerifyEmailBtn';

type Props = {
  children:
    | React.ReactNode
    | ReactElement<any, any>
    | JSX.Element
    | JSX.Element[];
  // children: Component<{}, {}, any>;
  emailVerified: boolean;
};

const VerifiedComp: React.FC<Props> = ({ children, emailVerified }: Props) => {
  return emailVerified ? (
    <React.Fragment>{children}</React.Fragment>
  ) : (
    <div className="container jumbotron">
      <p>email is ${emailVerified}</p>
      <h3 className="u-text-colorized">
        You cannot access this page because your Email is not verified
      </h3>
      <VerifyEmailBtn />
    </div>
  );
};

export default VerifiedComp;
