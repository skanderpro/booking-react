import React from "react";
import {InputGroup,FormControl} from 'react-bootstrap';

function MailContainer() {
    return <div className={'mail-container'}>
        <div className={'row no-gutters'}>
            <div className={'col-lg-6 text-block'}>
                <h2>Join Our Mailing List</h2>
                <p>Be the first to know about exclusive shop discounts, product restocks and new launches. Sign up to the Sew Confident mailing list!</p>
            </div>
            <div className={'col-lg-6 form-block'}>
                <InputGroup >
                    <FormControl
                        placeholder="Your email"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                    />
                    <InputGroup.Append>
                        <button className={'btn'}>Subscribe</button>
                    </InputGroup.Append>
                </InputGroup>
            </div>
        </div>
    </div>
}
export  default MailContainer;