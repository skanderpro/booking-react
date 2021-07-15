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
                    <a href={""}>Sewing Classes Glasgow</a>
                  </div>
                  <div className={"column-item"}>
                    <a href={""}>Sewing Classes Dundee</a>
                  </div>
                  <div className={"column-item"}>
                    <a href={""}>Sewing Classes Birmingham</a>
                  </div>
                  <div className={"column-item"}>
                    <a href={""}>Sewing Classes Chorley</a>
                  </div>
                  <div className={"column-item"}>
                    <a href={""}>Online Sewing Classes</a>
                  </div>
                </div>
              </div>
            </div>
            <div className={"col-lg-3 col-md-6 col-sm-6"}>
              <div className={"footer-column"}>
                <div className={"title"}>Shop Online</div>
                <div className={"column-list"}>
                  <div className={"column-item"}>
                    <a href={""}>Sewing Machines</a>
                  </div>
                  <div className={"column-item"}>
                    <a href={""}>Fabric & Materials</a>
                  </div>
                  <div className={"column-item"}>
                    <a href={""}>DIY Crafty Kits</a>
                  </div>
                  <div className={"column-item"}>
                    <a href={""}> Machine Accessories</a>
                  </div>
                  <div className={"column-item"}>
                    <a href={""}>Haberdashery</a>
                  </div>
                </div>
              </div>
            </div>
            <div className={"col-lg-3 col-md-6 col-sm-6"}>
              <div className={"footer-column"}>
                <div className={"title"}>Our Services</div>
                <div className={"column-list"}>
                  <div className={"column-item"}>
                    <a href={""}>Sewing Classes</a>
                  </div>
                  <div className={"column-item"}>
                    <a href={""}>Studios</a>
                  </div>
                  <div className={"column-item"}>
                    <a href={""}>Private Tuition</a>
                  </div>
                  <div className={"column-item"}>
                    <a href={""}>Online Shop</a>
                  </div>
                  <div className={"column-item"}>
                    <a href={""}>Sew Macho</a>
                  </div>
                </div>
              </div>
            </div>
            <div className={"col-lg-3 col-md-6 col-sm-6"}>
              <div className={"footer-column"}>
                <div className={"title"}>About Us</div>
                <div className={"column-list"}>
                  <div className={"column-item"}>
                    <a href={""}>About Sew Confident</a>
                  </div>
                  <div className={"column-item"}>
                    <a href={""}>Reviews</a>
                  </div>
                  <div className={"column-item"}>
                    <a href={""}> PR & Press</a>
                  </div>
                  <div className={"column-item"}>
                    <a href={""}>Latest News</a>
                  </div>
                  <div className={"column-item"}>
                    <a href={""}>Franchising Opportunities</a>
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
