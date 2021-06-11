import React, { useContext } from "react";
import {
  Accordion,
  Card,
  useAccordionToggle,
  AccordionContext,
} from "react-bootstrap";

function ClassAccordion(props) {
  return (
    <Accordion defaultActiveKey={`0`}>
      {props.classDetail.product.faqs.map((faq, index) => {
        return (
          <Card key={`accordion-card-${index}`}>
            <Card.Header>
              <span>{faq.question}</span>
              <ContextAwareToggle eventKey={`${index}`}>
                Click me!
              </ContextAwareToggle>
            </Card.Header>
            <Accordion.Collapse eventKey={`${index}`}>
              <Card.Body>{faq.answer}</Card.Body>
            </Accordion.Collapse>
          </Card>
        );
      })}
    </Accordion>
  );
}

function ContextAwareToggle({ children, eventKey, callback }) {
  const currentEventKey = useContext(AccordionContext);

  const decoratedOnClick = useAccordionToggle(
    eventKey,
    () => callback && callback(eventKey)
  );

  const isCurrentEventKey = currentEventKey === eventKey;

  return (
    <button
      type="button"
      className={["button-status", isCurrentEventKey ? "active" : ""].join(" ")}
      onClick={decoratedOnClick}
    >
      {isCurrentEventKey ? "-" : "+"}
    </button>
  );
}
export default ClassAccordion;
