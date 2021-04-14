import React,{useContext} from "react";
import {Accordion,Card,useAccordionToggle,AccordionContext} from 'react-bootstrap';




function ClassAccordion() {
    return  <Accordion defaultActiveKey="0">
        <Card>
            <Card.Header>
              <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
              <ContextAwareToggle eventKey="0">Click me!</ContextAwareToggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
                <Card.Body>Hello! I'm the body</Card.Body>
            </Accordion.Collapse>
        </Card>
        <Card>
            <Card.Header>
                <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
                <ContextAwareToggle eventKey="1">Click me!</ContextAwareToggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
                <Card.Body>Hello! I'm another body</Card.Body>
            </Accordion.Collapse>
        </Card>
        <Card>
            <Card.Header>
                <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
                <ContextAwareToggle eventKey="2">Click me!</ContextAwareToggle>
            </Card.Header>
            <Accordion.Collapse eventKey="2">
                <Card.Body>Hello! I'm another body</Card.Body>
            </Accordion.Collapse>
        </Card>
    </Accordion>
}

function ContextAwareToggle({ children, eventKey, callback }) {
    const currentEventKey = useContext(AccordionContext);

    const decoratedOnClick = useAccordionToggle(
        eventKey,
        () => callback && callback(eventKey),
    );

    const isCurrentEventKey = currentEventKey === eventKey;

    return (
        <button
            type="button"
            className={[
                'button-status',
                isCurrentEventKey ? 'active' : ''
            ].join(' ')}

            onClick={decoratedOnClick}
        >
            {isCurrentEventKey ? '-' : '+'}
        </button>
    );
}
export default ClassAccordion;