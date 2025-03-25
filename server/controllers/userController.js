import Course from "../models/Course.js";
import { Purchase } from "../models/Purchase.js";
import User from "../models/User.js";
import Stripe from 'stripe';

// Get User Data
export const getUserData = async (req, res) => {
    try {
        const userId = req.auth.userId;
        const user = await User.findOne({ clerkId: userId }); // ✅ FIXED

        if (!user) {
            return res.status(404).json({ success: false, message: "User Not Found" });
        }

        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Users Enrolled Courses With Lecture Links 
export const userEnrolledCourses = async (req, res) => {
    try {
        const userId = req.auth.userId;
        const userData = await User.findOne({ clerkId: userId }).populate("enrolledCourses"); // ✅ FIXED

        if (!userData) {
            return res.json({ success: false, message: "User Not Found" });
        }

        res.json({ success: true, enrolledCourses: userData.enrolledCourses });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Purchase Course
export const purchaseCourse = async (req, res) => {
    try {
        const { courseId } = req.body;
        const origin = req.headers.origin || "http://localhost:3000"; // fallback in case origin is missing
        const clerkUserId = req.auth.userId; // Clerk user ID

        // Find the user by Clerk ID
        const userData = await User.findOne({ clerkId: clerkUserId });
        const courseData = await Course.findById(courseId);

        if (!userData || !courseData) {
            return res.json({ success: false, message: 'Data Not Found' });
        }

        const discountedAmount = (
            courseData.coursePrice - (courseData.discount * courseData.coursePrice) / 100
        ).toFixed(2);

        const purchaseData = {
            courseId: courseData._id,
            userId: userData._id,
            amount: discountedAmount
        };

        const newPurchase = await Purchase.create(purchaseData);

        // Stripe Gateway Initialize
        const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
        const currency = process.env.CURRENCY.toLowerCase();

        const line_items = [{
            price_data: {
                currency,
                product_data: {
                    name: courseData.courseTitle
                },
                unit_amount: Math.floor(discountedAmount * 100) // amount in cents
            },
            quantity: 1
        }];

        const session = await stripeInstance.checkout.sessions.create({
            success_url: `${origin}/loading/my-enrollments`,
            cancel_url: `${origin}/`,
            line_items,
            mode: 'payment',
            metadata: {
                purchaseId: newPurchase._id.toString()
            }
        });

        res.json({ success: true, session_url: session.url });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};





// // Purchase Course
// export const purchaseCourse = async (req, res) => {
//     try {
//         const {courseId} = req.body;
//         const {origin} = req.headers;
//         const userId = req.auth.userId;
//         const userData = await User.findById(userId)
//         const courseData = await Course.findById(courseId)

//         if(!userData || !courseData){
//             return res.json({ success: false, message: 'Data Not Found'})
//         }

//         const purchaseData = {
//             courseId: courseData_id,
//             userId,
//             amount: (courseData.coursePrice - courseData.discount * courseData.coursePrice
//                 / 100).toFixed(2),
//         }

//         const newPurchase = await Purchase.create(purchaseData)

//         // Stripe Gateway Initailize
//         const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY)

//         // const currency = process.env.CURRENCY.toLowerCase()
//         const currency = process.env.CURRENCY.toLowerCase(); // Ensure this is 'usd', 'eur', etc.


//         // creating line items to for Stripe
//         const line_items = [{
//             price_data:{
//                 currency,
//                 product_data: {
//                     name: courseData.courseTitle
//                 },
//                 unit_amount: Math.floor(newPurchase.amount) * 100
//             },
//             quantity: 1
//         }]

//         const session = await stripeInstance.checkout.sessions.create({
//             success_url: `${origin}/loading/my-enrollments`,
//             cancel_url: `${origin}/`,
//             line_items: line_items,
//             mode: 'payment',
//             metedata: {
//                 purchaseId: newPurchase._id.toString()
//             }
//         })

//         res.json({ success: true, session_url: session.url});
//     } catch (error) {
//         res.json({ success: false, message: error.message });
//     }
// }