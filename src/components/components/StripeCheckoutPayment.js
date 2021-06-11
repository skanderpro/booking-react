import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe("pk_test_Du0fzY5XkR7m8qkwrWanhqpC00TMxFfEet");

const App = () => {
  return (
    <Elements stripe={stripePromise}>
      <MyCheckoutForm />
    </Elements>
  );
};
