import React, {Component} from "react";
import MainLayout from "../layouts/MainLayout";

class ForgotPassword extends  Component{
    render() {
        return <MainLayout>
            <section className={'login-section'}>
                <div className={'login-container'}>
                    <h2 className={'login-title'}>My account</h2>
                    <h3>Forgot Password</h3>
                    <p className="form-row form-row-wide" >
                        <div className={'col-12'}>
                            <label htmlFor="username">Email address&nbsp;<span className="required">*</span></label>
                            <span className="woocommerce-input-wrapper">
                                    <input type="text" className="input-text " name="username" placeholder="" value=""/>
                                </span>
                        </div>

                    </p>

                    <p className="form-row">
                        <div className={'col-12'}>
                            <button type="submit"
                                    className="form-login__submit"
                                    name="login" value="Log in">Send
                            </button>
                        </div>


                    </p>
                    <p className="woocommerce-LostPassword lost_password">
                        <a href="/">Login</a>
                    </p>
                </div>
            </section>


        </MainLayout>;
    }
}
export default ForgotPassword;