import React from 'react';
import { NavLink } from 'react-router-dom';
import { skills1, skills2 } from '../../consts/fixtures';

type Props = {
  skills: string[];
};

export const SkillsComponent: React.FC<Props> = ({ skills }: Props) => (
  <ul>
    {skills.map((skill, i) => (
      <li key={i}>
        <a
          href="https://www.linkedin.com/in/tanzeel-ahmed-b101261b1/"
          rel="noreferrer"
          target="_blank"
        >
          {skill}
        </a>
      </li>
    ))}
  </ul>
);

const Footer: React.FC = () => (
  <div className="footer-dark">
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-sm-6 col-md-3 item">
            <h3>Services</h3>
            <SkillsComponent skills={skills1} />
          </div>
          <div className="col-sm-6 col-md-3 item">
            <h3>About</h3>
            <SkillsComponent skills={skills2} />
          </div>
          <div className="col-md-6 item text">
            <h3>About Tanzeel </h3>
            <p>
              Tanzeel is an Expert JavaScript Developer. His speciality is to
              make a REST API and then develop a stunning looking User Interface
              through React
            </p>
          </div>
          <div className="col item social">
            <a
              href="https://www.linkedin.com/in/tanzeel-ahmed-b101261b1/"
              className="social--item"
            >
              <i className="zmdi zmdi-linkedin" />
            </a>
            <NavLink to="#" className="social--item">
              <i className="zmdi zmdi-twitter" />
            </NavLink>
            <NavLink to="#" className="social--item">
              <i className="zmdi zmdi-instagram" />
            </NavLink>
            <a href="mailto: abc@example.com" className="social--item">
              <i className="zmdi zmdi-email-open" />
            </a>
          </div>
        </div>
        <p className="copyright">Company Name Tanzeel Ahmed © 2021</p>
      </div>
    </footer>
  </div>
);

export default Footer;
