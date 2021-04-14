import React from "react";

function FooterBottom() {
    return <React.Fragment>
        <div className={'footer-bottom'}>
            <div className={'footer-bottom-list'}>
                <a href={''} className={'footer-bottom-list-item'}>
                    Terms & Conditions
                </a>
                <a href={''} className={'footer-bottom-list-item'}>
                    Privacy Policy
                </a>
                <a href={''} className={'footer-bottom-list-item'}>
                    Copyright Notice
                </a>
            </div>
            <div className={'social-links'}>
                <div className={'social-link'}>
                    <a href={''}>
                        <i className="fab fa-facebook"></i>
                    </a>

                </div>
                <div className={'social-link'}>
                    <a href={''}>
                        <i className="fab fa-instagram"></i>
                    </a>

                </div>
                <div className={'social-link'}>
                    <a href={''}>
                        <i className="fab fa-twitter"></i>
                    </a>

                </div>
                <div className={'social-link'}>
                    <a href={''}>
                        <i className="fab fa-pinterest"></i>
                    </a>

                </div>
            </div>
        </div>
    </React.Fragment>
}
export default FooterBottom;