import { Webhook } from "svix";
import User from "../models/User.js";

// API Controller Function to Manage Clerk User with database
export const clerkWebhooks = async (req, res) => {
    try {
        console.log("Webhook received:", req.body);

        const svix = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        const payload = JSON.stringify(req.body);
        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        };

        // Verify the webhook signature
        svix.verify(payload, headers);

        const { data, type } = req.body;
        console.log("Webhook type:", type);

        switch (type) {
            case "user.created": {
                const userData = {
                    _id: data.id,
                    email: data.email_addresses[0].email_address,
                    name: `${data.first_name} ${data.last_name}`,
                    imageUrl: data.image_url,
                };
                await User.create(userData);
                console.log("User created:", userData);
                break;
            }

            case "user.updated": {
                const userData = {
                    email: data.email_addresses[0].email_address,
                    name: `${data.first_name} ${data.last_name}`,
                    imageUrl: data.image_url,
                };
                await User.findByIdAndUpdate(data.id, userData, { new: true });
                console.log("User updated:", userData);
                break;
            }

            case "user.deleted": {
                await User.findByIdAndDelete(data.id);
                console.log("User deleted:", data.id);
                break;
            }

            default:
                console.log("Unhandled webhook type:", type);
                break;
        }

        // Respond with success regardless of type
        res.status(200).json({ success: true });
    } catch (error) {
        console.error("Webhook error:", error);
        res.status(400).json({ success: false, message: error.message });
    }
};
