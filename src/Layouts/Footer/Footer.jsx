import { FaGithub, FaLinkedin, FaSquareFacebook, FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {


    return (
        <footer className=" bg-black/90 text-white "> 
            <div className="container mx-auto flex mt-20 flex-col md:flex-row max-md:gap-20 justify-between items-center p-32 lg:p-40">
            <div>
            <Link to="/" className="font-bold font-cinzel text-3xl">
          <span className="text-blue-500">Trust</span>Pharma
        </Link>
            </div>
                <div className="flex justify-center items-center gap-10 text-4xl">
                    <a target="_blank" href="https://www.facebook.com/"><FaSquareFacebook className="text-blue-600" /></a>
                    <a target="_blank" href="https://x.com/?lang=en"><FaXTwitter /></a>
                    <a target="_blank" href="https://www.linkedin.com/"><FaLinkedin className="text-blue-600" /></a>
                    <a target="_blank" href="https://github.com/shbhuiyan"><FaGithub /></a>
                </div>
                <div className="text-center">
                  <h6 className="footer-title">Newsletter</h6>
                  <fieldset className="form-control w-80">
                    <div className="join">
                      <input
                        type="text"
                        placeholder="enter your email"
                        className="input input-bordered join-item" />
                      <button className="btn btn-info join-item">Subscribe</button>
                    </div>
                  </fieldset>
                </div>
            </div>
            <div className="footer footer-center bg-black text-white p-4">
                <p>Copyright © {new Date().getFullYear()} - All right reserved by SH Bhuiyan</p>
            </div>
        </footer>
    );
};

export default Footer;