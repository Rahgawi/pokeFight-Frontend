import './Footer.css';
function Footer() {
  return (
    <footer>
      <div className="footer">
        <div className="footer-container">
          <p className="box">
            <img
              src={require('../Header/images/Pokefight.png')}
              width="130px"
            />
            <br></br>
            <br></br>
          </p>
          <p className="box">
            Hellostrasse 40 <br></br>12478 Hellostadt <br></br> Tel. 050/ 56 477
            9
          </p>
          <p className="box">
            <strong> Bank account:</strong> <br></br>
            Bank Hellostadt IBAN: DE89 1234 1234 1234 1234 00
            <br></br>BIC: BLAHDE34BLA
          </p>

          <p className="box">
            <li className="list-item">
              <a className="links" href="#">
                Privacy
              </a>
            </li>
            <li className="list-item">
              <a className="links" href="#">
                Imprint
              </a>
            </li>
            <li className="list-item">
              <a className="links" href="#">
                Newsletter
              </a>
            </li>
            <li className="list-item">
              <a className="links" href="#">
                Jobs
              </a>
            </li>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
