
// add "@repo/payments-core": "workspace:*",

//import type { PaymentProvider } from '@repo/payments-core';

//let provider: PaymentProvider | null = null;

/* export async function getPaymentProvider(): Promise<PaymentProvider> {
  if (provider) return provider;

  if (process.env.USE_STRIPE === 'true') {
    const { default: StripeProvider } = await import('@repo/payments-stripe');

    provider = new StripeProvider({
      apiKey: process.env.STRIPE_KEY!,
    });

    return provider;
  }

  if (process.env.USE_2CHECKOUT === 'true') {
    const { default: TwoCheckoutProvider } = await import('@repo/payments-two-checkout');

    provider = new TwoCheckoutProvider({
      apiKey: process.env.TC_KEY!,
    });

    return provider;
  }

  throw new Error('No payment provider configured');
} */
