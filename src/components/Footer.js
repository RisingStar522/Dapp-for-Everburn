import React from 'react';

const Footer = () => {
    return (
        <footer id="footer">

            <ul className="icons">

                <li><a href="https://twitter.com/EverburnToken" className="icon fa-twitter"><span className="label">Twitter</span></a></li>

                <li><a href="https://medium.com/@everburntoken" className="icon fa-newspaper-o"><span className="label">Medium</span></a></li>

                <li><a href="https://t.me/EverburnToken" className="icon fa-send"><span className="label">Telegram</span></a></li>

            </ul>

            <ul className="menu">

                <li><a href="https://www.everburn.io/disclaimer.html">Disclaimer</a></li>

                <li><a href="mailto:everburntoken@gmail.com">Contact</a></li>

            </ul>

        </footer>
    );
}

export default Footer;
