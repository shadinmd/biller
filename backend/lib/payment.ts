import Stripe from "stripe";
import PlanInterface from "types/plan.interface";
import VendorInterface from "types/vendor.interface";


const STRIPE_SECRET = process.env.STRIPE_SECRET
const FRONT_URL = process.env.FRONT_URL
const HOST_URL = process.env.HOST_URL

if (!STRIPE_SECRET || !FRONT_URL || !HOST_URL)
	throw new Error("Missing environment variables")

const stripe = new Stripe(STRIPE_SECRET)

export const createPaymentSessions = async (planId: string, vendor: VendorInterface, plan: PlanInterface) => {
	try {
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			mode: "payment",
			success_url: `${HOST_URL}/subscribe/confirmPayment?planId=${planId}&vendorId=${vendor._id}&sessionId={CHECKOUT_SESSION_ID}`,
			cancel_url: `${FRONT_URL}/vendor/subscribe/${planId}`,
			customer_email: vendor.email,
			client_reference_id: vendor._id,
			line_items: [
				{
					price_data: {
						currency: "inr",
						unit_amount: (plan.price - plan.discount) * 100,
						product_data: {
							name: `plan - ${plan.name}`,
							description: plan.description
						}
					},
					quantity: 1
				}
			]
		})
		return session
	} catch (error) {
		console.log(error)
	}
}


export const getPaymentDetials = async (sessionId: string) => {
	try {
		const session = await stripe.checkout.sessions.retrieve(sessionId);
		return session;
	} catch (error) {
		console.log(error);
	}
}
