// import { createContext, useEffect, useState } from "react";
// // import { dummyCourses } from "../assets/assets";
// import { useNavigate } from "react-router-dom";
// import humanizeDuration from 'humanize-duration'
// import { useAuth, useUser} from "@clerk/clerk-react"
// import axios from "axios"
// import { toast } from "react-toastify";

// export const AppContext = createContext()

// export const AppContextProvider = (props) => {

//     const backendUrl = import.meta.env.VITE_BACKEND_URL 

//     const currency = import.meta.env.VITE_CURRENCY
//     const navigate = useNavigate()
//     const {getToken} = useAuth()
//     const {user} = useUser()

//     const [allCourses, setAllcourses] = useState([])
//     const [isEducator, setIsEducator] = useState(false)
//     const [enrolledCourses, setEnrolledCourses] = useState([])
//     const [userData, setUserData] = useState(null)

//     // Fetch All courses
//     const fetchAllCourses = async () => {
//        try {
//         const { data } = await axios.get(backendUrl + '/api/course/all');

//         if(data.success){
//             setAllcourses(data.courses)
//         } else {
//             toast.error(data.message)
//         }
//        } catch (error) {
//         toast.error(error.message)
//        }
//     }

//     // Fetch UserData
//     const fetchUserData = async () =>{

//         if(user.publicMetadata.role === 'educator'){
//             setIsEducator(true)
//         }
//         try {
//             const token = await getToken();

//             const {data} = await axios.get(backendUrl + '/api/user/data', { headers: { Authorization: `Bearer ${token}` } })


//           if(data.success){
//             setUserData(data.user)
//           } else {
//             toast.error(data.message)
//           }
//         } catch (error) {
//             toast.error(error.message)
//         }
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
//         return Math.floor(totalRating / course.courseRating.length)
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
//           try {
//             const token = await getToken();
//             const { data } = await axios.get(backendUrl + '/api/user/enrolled-courses', {
//                 headers: { Authorization: `Bearer ${token}` }
//               });              
//             if(data.success){
//              setEnrolledCourses(data.enrolledCourses.reverse())
//             } else {
//              toast.error(data.message)
//             }
//           } catch (error) {
//             toast.error(error.message)
//           }
//         }
    

//     useEffect(()=> {
//         fetchAllCourses()
//     }, [])

    

//     useEffect(() => {
//         if(user){
//             fetchUserData()
//             fetchUserEnrolledCourses()
//         }
//     }, [user])

//     const value = {
//         currency, allCourses, navigate, calculateRating, isEducator,
//         setIsEducator, calculateChapterTime, calculateCourseDuration, 
//         calculateNoOfLectures, enrolledCourses, fetchUserEnrolledCourses, backendUrl,
//         userData, setUserData, getToken, fetchAllCourses

//     }

//     return (
//         <AppContext.Provider value={value}>
//             {props.children}
//         </AppContext.Provider>
//     )
// }


import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import humanizeDuration from 'humanize-duration';
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL; // ✅ Ensure this is set correctly in .env
    const currency = import.meta.env.VITE_CURRENCY || "USD";
    const navigate = useNavigate();
    const { getToken } = useAuth();
    const { user } = useUser();

    const [allCourses, setAllcourses] = useState([]);
    const [isEducator, setIsEducator] = useState(false);
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [userData, setUserData] = useState(null);

    // ✅ Fetch All courses
    const fetchAllCourses = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/course/all`);
            if (data.success) {
                setAllcourses(data.courses);
            } else {
                toast.error(data.message || "Failed to load courses");
            }
        } catch (error) {
            console.error("Error fetching all courses:", error);
            toast.error("Unable to load courses.");
        }
    };

    // ✅ Fetch UserData (Protected Route)
    const fetchUserData = async () => {
        if (user?.publicMetadata?.role === 'educator') {
            setIsEducator(true);
        }

        try {
            const token = await getToken();
            if (!token) return;

            const { data } = await axios.get(`${backendUrl}/api/user/data`, {
                headers: { Authorization: `Bearer ${token}` }
              });
              

            if (data.success) {
                setUserData(data.user);
            } else {
                toast.error(data.message || "Failed to fetch user data");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            toast.error("Could not load user information.");
        }
    };

    // ✅ Fetch Enrolled Courses (Protected Route)
    const fetchUserEnrolledCourses = async () => {
        try {
            const token = await getToken();
            if (!token) return;

            const { data } = await axios.get(`${backendUrl}/api/user/enrolled-courses`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (data.success) {
                setEnrolledCourses(data.enrolledCourses.reverse());
            } else {
                toast.error(data.message || "Failed to fetch enrolled courses");
            }
        } catch (error) {
            console.error("Error fetching enrolled courses:", error);
            toast.error("Unable to load enrolled courses.");
        }
    };

    // ✅ Calculate course rating
    const calculateRating = (course) => {
        if (!course.courseRating?.length) return 0;
        const totalRating = course.courseRating.reduce((sum, r) => sum + r.rating, 0);
        return Math.floor(totalRating / course.courseRating.length);
    };

    // ✅ Calculate chapter time
    const calculateChapterTime = (chapter) => {
        const time = chapter.chapterContent?.reduce((sum, lecture) => sum + lecture.lectureDuration, 0) || 0;
        return humanizeDuration(time * 60000, { units: ['h', 'm'] });
    };

    // ✅ Calculate course duration
    const calculateCourseDuration = (course) => {
        let time = 0;
        course.courseContent?.forEach(ch => {
            ch.chapterContent?.forEach(l => {
                time += l.lectureDuration;
            });
        });
        return humanizeDuration(time * 60000, { units: ['h', 'm'] });
    };

    // ✅ Calculate total number of lectures
    const calculateNoOfLectures = (course) => {
        return course.courseContent?.reduce((total, ch) => total + (ch.chapterContent?.length || 0), 0) || 0;
    };

    // ✅ Fetch courses on mount
    useEffect(() => {
        fetchAllCourses();
    }, []);

    // ✅ Fetch user info & enrolled courses when user is ready
    useEffect(() => {
        if (user) {
            fetchUserData();
            fetchUserEnrolledCourses();
        }
    }, [user]);

    const value = {
        currency,
        allCourses,
        navigate,
        calculateRating,
        isEducator,
        setIsEducator,
        calculateChapterTime,
        calculateCourseDuration,
        calculateNoOfLectures,
        enrolledCourses,
        fetchUserEnrolledCourses,
        backendUrl,
        userData,
        setUserData,
        getToken,
        fetchAllCourses,
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};
