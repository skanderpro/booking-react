import React from "react";

function FooterNav() {
  return (
    <div className={"footer-nav"}>
      <div className={"row"}>
        <div className={"col-lg-8 footer-columns"}>
          <div className={"row"}>
            <div className={"col-lg-3 col-md-6 col-sm-6"}>
              <div className={"footer-column"}>
                <div className={"title"}>Classes</div>
                <div className={"column-list"}>
                  <div className={"column-item"}>
                    <a href={"https://sewconfident.co.uk/glasgow"}>Sewing Classes Glasgow</a>
                  </div>
                  <div className={"column-item"}>
                    <a href={"https://sewconfident.co.uk/dundee"}>Sewing Classes Dundee</a>
                  </div>
                  
                  <div className={"column-item"}>
                    <a href={"https://sewconfident.co.uk/chorley"}>Sewing Classes Chorley</a>
                  </div>
                  <div className={"column-item"}>
                    <a href={"https://sewconfident.co.uk/online-classes"}>Online Sewing Classes</a>
                  </div>
                </div>
              </div>
            </div>
            <div className={"col-lg-3 col-md-6 col-sm-6"}>
              <div className={"footer-column"}>
                <div className={"title"}>Shop Online</div>
                <div className={"column-list"}>
                  <div className={"column-item"}>
                    <a href={"https://sewconfident.co.uk/sewing-machines"}>Sewing Machines</a>
                  </div>
                  <div className={"column-item"}>
                    <a href={"https://sewconfident.co.uk/fabric"}>Fabric & Materials</a>
                  </div>
                  <div className={"column-item"}>
                    <a href={"https://sewconfident.co.uk/diy-crafty-kits"}>DIY Crafty Kits</a>
                  </div>
                  <div className={"column-item"}>
                    <a href={"https://sewconfident.co.uk/sewing-machine-accessories"}> Machine Accessories</a>
                  </div>
                  <div className={"column-item"}>
                    <a href={"https://sewconfident.co.uk/haberdashery"}>Haberdashery</a>
                  </div>
                </div>
              </div>
            </div>
            <div className={"col-lg-3 col-md-6 col-sm-6"}>
              <div className={"footer-column"}>
                <div className={"title"}>Our Services</div>
                <div className={"column-list"}>
                 
                  <div className={"column-item"}>
                    <a href={"https://sewconfident.co.uk/studios"}>Studios</a>
                  </div>
						<div className={"column-item"}>
                    <a href={"https://sewconfident.co.uk/shop"}>Online Shop</a>
                  </div>
                  <div className={"column-item"}>
                    <a href={"https://sewconfident.co.uk/121-2"}>Private Tuition</a>
                  </div>
                  
                  <div className={"column-item"}>
                    <a href={"https://sewconfident.co.uk/parties/"}>Crafty Parties</a>
                  </div>
                </div>
              </div>
            </div>
            <div className={"col-lg-3 col-md-6 col-sm-6"}>
              <div className={"footer-column"}>
                <div className={"title"}>About Us</div>
                <div className={"column-list"}>
                  <div className={"column-item"}>
                    <a href={"https://sewconfident.co.uk/about-sew-confident"}>About Sew Confident</a>
                  </div>
                  <div className={"column-item"}>
                    <a href={"https://sewconfident.co.uk/reviews"}>Reviews</a>
                  </div>
                  <div className={"column-item"}>
                    <a href={"https://sewconfident.co.uk/blog"}> Sew Confident Blog</a>
                  </div>
                  <div className={"column-item"}>
                    <a href={"https://sewconfident.co.uk/own-your-own-studio"}>Franchising Opportunities</a>
                  </div>
                  <div className={"column-item"}>
                    <a href={"https://sewconfident.co.uk/contact-us/"}>Contact us</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={"col-lg-4 text-right-images"}>
          <div className={"footer-images"}>
            <img
              className={"d-inline-block logo-1"}
              src={require("./../../assets/images/logo.png").default}
            />
            <img
              className={"d-inline-block logo-2"}
              src={
                require("./../../assets/images/7c77a5a22ea47f2a489591985fa8736a.jpg")
                  .default
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default FooterNav;
