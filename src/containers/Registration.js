import React, {Component} from "react";
import MainLayout from "../layouts/MainLayout";
import {connect} from "react-redux";
import {register} from './../redux/actions/userActions';
import {getMessages} from "../redux/actions/functions";
import {Alert} from "react-bootstrap";

class Registration extends Component{

    state = {
        formData:{
            name:'',
            email:'',
            password:'',
            password_confirmation:''
        },
        errors:[]

    }

    validateForm = () => {


    }

    render() {
        return <React.Fragment>
            <MainLayout>
                <section className={'login-section'}>
                    <div className={'login-container'}>
                        <h2 className={'login-title'}>My account</h2>
                        <h3>Registration</h3>
                        {this.state.errors.length > 0 ? <Alert variant={'danger'} ><div dangerouslySetInnerHTML={{__html:this.state.errors.join('<br>')}} /> </Alert> : null}

                        <p className="form-row form-row-wide" >
                            <div className={'col-12'}>
                                <label htmlFor="username">Username<span className="required">*</span></label>
                                <span className="woocommerce-input-wrapper">
                                    <input type="text" className="input-text " onChange={e => {
                                        this.setState({
                                            formData:{
                                                ...this.state.formData,
                                                name:e.target.value
                                            }
                                        })
                                    }} name="username" placeholder="" value={this.state.formData.name}/>
                                </span>
                            </div>

                        </p>
                        <p className="form-row form-row-wide" >
                            <div className={'col-12'}>
                                <label htmlFor="username">Email address&nbsp;<span className="required">*</span></label>
                                <span  className="woocommerce-input-wrapper">
                                    <input type="text" className="input-text" onChange={e => {
                                        this.setState({
                                            formData:{
                                                ...this.state.formData,
                                                email:e.target.value
                                            }
                                        })
                                    }}  name="email" placeholder="" value={this.state.formData.email} />
                                </span>

                            </div>
                        </p>
                        <p className="form-row form-row-wide" >
                            <div className={'col-12'}>
                                <label htmlFor="password">Password&nbsp;<span className="required">*</span></label>
                                <span className="woocommerce-input-wrapper">
                                    <input type="password" className="input-text " onChange={e => {
                                        this.setState({
                                            formData:{
                                                ...this.state.formData,
                                                password:e.target.value
                                            }
                                        })
                                    }}  name="password" placeholder="" value={this.state.formData.password}/>
                                </span>
                            </div>

                        </p>
                        <p className="form-row form-row-wide" >
                            <div className={'col-12'}>
                                <label htmlFor="password">Repeat Password&nbsp;<span className="required">*</span></label>
                                <span className="woocommerce-input-wrapper">
                                    <input type="password" className="input-text "  onChange={e => {
                                        this.setState({
                                            formData:{
                                                ...this.state.formData,
                                                password_confirmation:e.target.value
                                            }
                                        })
                                    }} name="repeat_password" placeholder="" value={this.state.formData.password_confirmation}/>
                                </span>
                            </div>

                        </p>
                        <p className="form-row">
                             <div className={'col-12'}>
                                 <button type="button"
                                         className="form-login__submit"
                                         name="login" value="Log in" onClick={() => {
                                             this.props.register(this.state.formData)
                                                 .then(response => {
                                                     window.location.href = '/';
                                                 })
                                                 .catch(error => {
                                                     let responseErrors = getMessages(error.response.data.errors);
                                                    this.setState({
                                                        errors:[...responseErrors]
                                                    })
                                                 })
                                 }}>Registration
                                 </button>
                             </div>


                        </p>
                        <p className="woocommerce-LostPassword lost_password">
                            <a href="/">Login?</a>
                        </p>
                    </div>
                </section>
            </MainLayout>
        </React.Fragment>
    }
}
function mapStateToProps(state) {
    return {}
}
function mapDispatchToProps(dispatch) {
    return {
        register:(formData) => {
            return dispatch(register(formData))
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Registration) ;