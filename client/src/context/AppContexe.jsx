// import { createContext, useEffect, useState } from "react";
// import { dummyCourses } from "../assets/assets";
// import { useNavigate } from "react-router-dom";
// import humanizeDuration from 'humanize-duration'
// import { useAuth, useUser} from "@clerk/clerk-react"
// import axios from "axios"
// import { toast } from "react-toastify";

// export const AppContext = createContext()

// export const AppContextProvider = (props) => {

//     const backendUrl =import.meta.env.VITE_BACKEND_URL 

//     const currency = import.meta.env.VITE_CURRENCY
//     const navigate = useNavigate()
//     const {getToken} = useAuth()
//     const {user} = useUser()

//     const [allCourses, setAllcourses] = useState([])
//     const [isEducator, setIsEducator] = useState(true)
//     const [enrolledCourses, setEnrolledCourses] = useState([])

//     // Fetch All courses
//     const fetchAllCourses = async () => {
//        try {
//         const {data} = await axios.get(backendUrl + '/api/course/all');

//         if(data.success){
//             setAllcourses(data.courses)
//         } else {
//             toast.error(data.message)
//         }
//        } catch (error) {
//         toast.error(error.message)
//        }
//     }

//     // Function to calculate average rating of course
//     const calculateRating = (course) => {
//         if (!course.courseRating || course.courseRating.length === 0) {
//             return 0;
//         }
//         let totalRating = 0;
//         course.courseRating.forEach(rating => {
//             totalRating += rating.rating;
//         });
//         return totalRating / course.courseRating.length;
//     };

//     // fuction ot Calcutate Course Chapter Time
//     const calculateChapterTime = (chapter) => {
//         let time = 0
//         chapter.chapterContent.map((lecture) => time += lecture.lectureDuration)
//         return humanizeDuration(time * 60 * 1000, {units: ['h', 'm']})
//     }

//      // fuction ot Calcutate Course Duration
//      const calculateCourseDuration = (course) => {
//         let time = 0 

//         course.courseContent.map((chapter) => chapter.chapterContent.map(
//             (lecture) => time += lecture.lectureDuration
//         ))
//         return humanizeDuration(time * 60 * 1000, {units: ['h', 'm']})
//      }

//       // fuction Calcutate to No of lectures in the course
//       const calculateNoOfLectures = (course) => {
//         let totalLectures = 0;
//         course.courseContent.forEach(chapter => {
//             if(Array.isArray(chapter.chapterContent)){
//                 totalLectures += chapter.chapterContent.length;
//             }
//         });
//         return totalLectures;
//       } 

//       // Fetch User Enrolled Courses
//         const fetchUserEnrolledCourses = async () => {
//             console.log("Fetching user enrolled courses...");
//             setEnrolledCourses(dummyCourses)
//             console.log("User enrolled courses fetched:", dummyCourses);
//         }
    

//     useEffect(()=> {
//         fetchAllCourses()
//         fetchUserEnrolledCourses()
//     }, [])

//     const logToken = async () => {
//         console.log("Fetching token...");
//         console.log( await getToken())
//     }

//     useEffect(() => {
//         if(user){
//             logToken()
//         }
//     }, [user])

//     const value = {
//         currency, allCourses, navigate, calculateRating, isEducator,
//         setIsEducator, calculateChapterTime, calculateCourseDuration, 
//         calculateNoOfLectures, enrolledCourses, fetchUserEnrolledCourses

//     }

//     return (
//         <AppContext.Provider value={value}>
//             {props.children}
//         </AppContext.Provider>
//     )
// }



import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from 'humanize-duration'
import { useAuth, useUser } from "@clerk/clerk-react"
import axios from "axios"
import { toast } from "react-toastify";

export const AppContext = createContext()

export const AppContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const currency = import.meta.env.VITE_CURRENCY;
    const navigate = useNavigate();
    const { getToken } = useAuth();
    const { user } = useUser();

    const [allCourses, setAllCourses] = useState([]);  // Renamed to setAllCourses
    const [isEducator, setIsEducator] = useState(true);
    const [enrolledCourses, setEnrolledCourses] = useState([]);

    // Fetch All courses
    const fetchAllCourses = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/course/all');

            if (data.success) {
                setAllCourses(data.courses);  // Corrected state update
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    // Function to calculate average rating of a course
    const calculateRating = (course) => {
        if (!course.courseRating || course.courseRating.length === 0) {
            return 0;
        }
        let totalRating = 0;
        course.courseRating.forEach(rating => {
            totalRating += rating.rating;
        });
        return totalRating / course.courseRating.length;
    };

    // Function to calculate Course Chapter Time
    const calculateChapterTime = (chapter) => {
        let time = 0;
        chapter.chapterContent.forEach((lecture) => {  // Used forEach instead of map
            time += lecture.lectureDuration;
        });
        return humanizeDuration(time * 60 * 1000, { units: ['h', 'm'] });
    }

    // Function to calculate Course Duration
    const calculateCourseDuration = (course) => {
        let time = 0;
        course.courseContent.forEach((chapter) => {
            chapter.chapterContent.forEach((lecture) => {
                time += lecture.lectureDuration;
            });
        });
        return humanizeDuration(time * 60 * 1000, { units: ['h', 'm'] });
    }

    // Function to calculate the number of lectures in a course
    const calculateNoOfLectures = (course) => {
        let totalLectures = 0;
        course.courseContent.forEach(chapter => {
            if (Array.isArray(chapter.chapterContent)) {
                totalLectures += chapter.chapterContent.length;
            }
        });
        return totalLectures;
    }

    // Fetch User Enrolled Courses
    const fetchUserEnrolledCourses = async () => {
        console.log("Fetching user enrolled courses...");
        setEnrolledCourses(dummyCourses);  // Using dummyCourses here
        console.log("User enrolled courses fetched:", dummyCourses);
    }

    useEffect(() => {
        fetchAllCourses();
        fetchUserEnrolledCourses();
    }, []);

    // Log Token (improved)
    useEffect(() => {
        if (user) {
            getToken().then(token => {
                console.log("User token:", token);  // Logging token directly
            });
        }
    }, [user]);

    const value = {
        currency, allCourses, navigate, calculateRating, isEducator,
        setIsEducator, calculateChapterTime, calculateCourseDuration, 
        calculateNoOfLectures, enrolledCourses, fetchUserEnrolledCourses
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
