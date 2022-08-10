import emailLogo from "../images/email-icon.svg";
import telegramLogo from "../images/telegram-icon.svg";
import githubLogo from "../images/github-icon.svg";

export default function Footer() {
    return (
        <footer className="footer">
            <nav className="footer__links">
                <a className="footer__link" target="_blank" href="mailto:kiselev.pavel.job@gmail.com"><img className="footer__link-image" src={emailLogo} alt="email"/></a>
                <a className="footer__link" target="_blank" href="https://t.me/pahanavrik"><img className="footer__link-image" src={telegramLogo} alt="telegram"/></a>
                <a className="footer__link" target="_blank" href="https://github.com/pahanavr"><img className="footer__link-image" src={githubLogo} alt="github"/></a>
            </nav>
            <p className="footer__text">&#169;{new Date().getFullYear()} to do list</p>
        </footer>
    )
}