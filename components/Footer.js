import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
import "bootstrap/dist/css/bootstrap.css";
import Link from "next/link";
import {ImFacebook2} from "react-icons/im";
import {
  FaTwitterSquare,
  FaInstagramSquare,
  FaPinterestSquare,
  FaTiktok
} from "react-icons/fa";
import Image from "next/image";
import {AiFillGoogleSquare} from "react-icons/ai";
const facebook ={ color:  "#8e2de2", fontSize: "1.5em"};
const facebook1 = { color: "#8e2de2", fontSize: "1.7em" };
const facebook2 = { color: "#8e2de2", fontSize: "1.9em" };
const footerBody = {color: "#4a00e0", fontSize: "1.5em"};

const Footer =()=> {
  return (
    <MDBFooter
      bgColor="white"
      className="text-center text-lg-start text-muted"
      dir="rtl"
    >
      <section
        style={{ backgroundColor: "#FFABE1" }}
        className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom"
      >
        <div className="me-5 d-none d-lg-block">
          <span style={{ fontSize: "1.5em" }}>
            تواصل معنا عبر التواصل الاجتماعي
          </span>
        </div>

        <div>
          <a href="" className="me-4 text-reset">
            <ImFacebook2 style={facebook} />
          </a>
          <a href="" className="me-4 text-reset">
            <FaTwitterSquare style={facebook1} />
          </a>
          <a href="" className="me-4 text-reset">
            <AiFillGoogleSquare style={facebook2} />
          </a>
          <a href="" className="me-4 text-reset">
            <FaInstagramSquare style={facebook1} />
          </a>
          <a href="" className="me-4 text-reset">
            <FaPinterestSquare style={facebook1} />
          </a>
          <a href="" className="me-4 text-reset">
            <FaTiktok style={facebook} />
          </a>
        </div>
      </section>

      <section className="">
        <MDBContainer className="text-center text-md-start mt-5">
          <MDBRow className="mt-3">
            <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
              <Image
                src="/android-chrome-192x192.png"
                alt="Picture of the author"
                width="130"
                height="130"
                flex="1"
                display="flex"
              />
            </MDBCol>
            <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4" style={footerBody}>
                <MDBIcon icon="gem" className="me-3" />
                Scroop, سكرووب
              </h6>
              <p>
                Here you can use rows and columns to organize your footer
                content. Lorem ipsum dolor sit amet, consectetur adipisicing
                elit.
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4" style={footerBody}>
                روابط
              </h6>
              <p>
                <Link href="/collections" className="text-reset">
                  الاسعار
                </Link>
              </p>
              <p>
                <Link href="#!" className="text-reset">
                  المؤنتجات
                </Link>
              </p>
              <p>
                <Link href="#!" className="text-reset">
                  طلاباتك
                </Link>
              </p>
              <p>
                <Link href="#!" className="text-reset">
                  مساعدة
                </Link>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4" style={footerBody}>
                التواصل
              </h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                New York, NY 10012, US
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                info@example.com
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" /> + 01 234 567 88
              </p>
              <p>
                <MDBIcon icon="print" className="me-3" /> + 01 234 567 89
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className="text-center p-4" style={{ backgroundColor: "#937DC2" }}>
        © 2022 Copyright:
        <a className="text-reset fw-bold" href="https://dev-taherm.github.io/">
          Dev-Taher
        </a>
      </div>
    </MDBFooter>
  );
}

export default Footer;
