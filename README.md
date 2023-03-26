# stripe-mvp-ui

> MVP POC UI for stripe product, price, and subscription management

## Local development

1. Follow steps to run [`cepwn/stripe-mvp-local-cluster`](https://github.com/cepwn/stripe-mvp-local-cluster)

2. Follow steps to run [`cepwn/stripe-mvp-api`](https://github.com/cepwn/stripe-mvp-api)

3. Install dependencies:

   ```bash
   npm i
   ```

4. Start the development server:

   ```bash
   npm start
   ```

5. UI will open in your browser, or open:

   ```bash
   open http://localhost:3000
   ```

## Suggested Functionality Test Walkthrough

> As the following steps are performed, integrations with stripe `customers`, `products`, `prices` and `subscriptions` may be viewed in the [`stripe dashboard`](https://dashboard.stripe.com/).

1. Sign up a new user with email and password at [`http://localhost:3000/sign-up`](http://localhost:3000/sign-up).

2. Once logged in, create 3 new pricing plans via the `Edit Pricing Plans` admin side menu item.

   > NOTE: There are currently no restrictions on plan creation quantities. To ensure proper layout rendering:
   >
   > 1. Set at most 3 plans to `active` state (checkbox/boolean).
   > 2. Set 1 plan `most recomended` (boolean/checkbox) to true.
   > 3. Fill the `features` input with the same amount of lines across all pricing plans.

<br>

3. Navigate to the `Pricing Plans` account side menu item.

4. Click on `Get Started` on any of the newly created plans.

5. Once in in the `Checkout` view, use stripe test credit card number : `4242 4242 4242 4242`, expiration: `04/24`, CVV: `424`, Zip (if applicable): `90210`. View [`stripe docs`](https://stripe.com/docs/testing) for more details or test card numbers.

6. Once subscriptions are successfully created, they can be viewed by navigating to the `Billing` account side menu item.
