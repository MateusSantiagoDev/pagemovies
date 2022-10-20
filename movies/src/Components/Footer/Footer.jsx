import "./Footer.css";
import { HiOutlineMail } from "react-icons/hi";
import { GoMarkGithub } from "react-icons/go";
import { BsLinkedin } from "react-icons/bs";


export function Footer() {
  return (
    <nav className="nav_footer">
      <ul className="ul_footer">
        <li className="li_email"><a href="mailto:mateus_santiago2.3@outlook.com" target="_blanc"><HiOutlineMail/></a></li>
        <li className="li_gitHub"><a href="https://github.com/MateusSantiagoDev" target="_blanc"><GoMarkGithub/></a></li>
        <li className="li_linkedin"><a href="https://www.linkedin.com/in/mateus-santiago-439628228/" target="_blanc"><BsLinkedin/></a></li>
      </ul>
    </nav>
  );
}
