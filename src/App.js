import "./App.css";
import { useCallback, useContext, useEffect, useState } from "react";
import { CoursesProvider, RouterProvider, UserProvider } from "./context";
import { RouterContext } from "./context/routing/router.context";
import { UserContext } from "./context/user/user.context";
import { CoursesContext } from "./context/courses/courses.context";
import { USER_TYPES } from "./constants";
import SignIn from "./components/Signin";
import AdminPage from "./components/AdminPage";
import ManageInstructor from "./components/ManageInstructor";
import ManageUsers from "./components/ManageUsers";
import { Routes, Route, useParams, Navigate, useLocation } from "react-router-dom";
import { LoadingProvider } from "./context/loadingContext";
import SignUp from "./components/SignUp";
import AddCourse from "./components/ManageCourse";
import Navbar from "./components/Navbar";
import { AlertProvider } from "./context/alertContext";
import AlertPopup from "./components/AlertPopup";
import InstructorDashboard from "./components/InstructorDashboard";
import StudentsDashboard from "./components/StudentsDashboard";
import CourseDetails from "./components/CourseDetails";
import AllCourses from "./components/AllCourses";
import EnrolledStudents from "./components/EnrolledStudents";


function CourseForm(props) {
  const { name, description } = props;
  console.log(props);
  return (
    <div>
      <div></div>
    </div>
  );
}

// function CourseDetails1(props) {
//   const { id } = props;
//   const { user } = useContext(UserContext);
//   const { courses } = useContext(CoursesContext);

//   const course = courses.find((entry) => entry.id === id);
//   console.log(course);
//   if (user === USER_TYPES.STUDENT) {
//     return <div>Student View</div>;
//   } else if (user === USER_TYPES.INSTRUCTOR) {
//     return (
//       <div className="course-details-instructor">
//         <button className="course-action">Edit Course</button>
//         <button className="course-action">Add Topic</button>
//         <button className="course-action">Add Study Material</button>
//         <CourseForm {...course} />
//       </div>
//     );
//   }
// }

function CourseCard(props) {
  const { name, id } = props;
  const { changeRoute } = useContext(RouterContext);
  const onClick = useCallback(() => {
    changeRoute("view-course", { id });
  }, [changeRoute, id]);

  return (
    <div className="course-card">
      {name}
      <button onClick={onClick}>View Course</button>
    </div>
  );
}

function CourseList(props) {
  const { courses } = useContext(CoursesContext);
  return (
    <div className="courses-container">
      {courses.map((course, index) => (
        <CourseCard key={index} {...course} />
      ))}
    </div>
  );
}

function PathShala() {
  const { route, context, changeRoute } = useContext(RouterContext);
  const { changeUser } = useContext(UserContext);
  const { changeCourses } = useContext(CoursesContext);

  useEffect(() => {
    fetch(
      "https://pathshala-api-8e4271465a87.herokuapp.com/pathshala/courses/instructor?userId=1"
    )
      .then((res) => res.json())
      .then((data) => {
        changeCourses(data);
      });

    changeRoute("courses-list", {});
    changeUser(USER_TYPES.INSTRUCTOR);
  }, [changeCourses, changeRoute, changeUser]);

  if (route === "courses-list") {
    return <CourseList />;
  }

  if (route === "view-course") {
    return <CourseDetails {...context} />;
  }

  return <div>"404 Not Found"</div>;
}

function InstructorPage() {
  const params = useParams();
  console.log(params);
  return <div>Instructor Page</div>;
}

function PrivateRoute(props) {
  const { user } = useContext(UserContext);

  if (user) {
    return <>{props.children}</>
  } else {
    return <Navigate to="/" replace={true} />
  }
}

function App() {
  const location = useLocation();
  return (
    <LoadingProvider>
      <RouterProvider>
        <UserProvider>
          <CoursesProvider>
            <AlertProvider>
              <AlertPopup />
              {location.pathname !== '/' && location.pathname !== '/signup' && <Navbar />}
              <Routes>
                <Route path="/" element={<SignIn />} />
                <Route path="/instructor" element={<InstructorDashboard />} />
                <Route path="/instructor/courseDetails/:courseId" element={<CourseDetails/>} />
                <Route path="/student" element={<StudentsDashboard />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/admin/manageUsers" element={<ManageUsers />} />
                <Route
                  path="/admin/manageInstructor"
                  element={<PrivateRoute><ManageInstructor /></PrivateRoute>}
                />
                <Route path="/admin/courses" element={<AddCourse />} />
                <Route path="/student/allCourses" element={<AllCourses />} />
                <Route path="/instructor/courseDetails/enrolledStudents/:courseId" element={<EnrolledStudents />} />
              </Routes>
            </AlertProvider>
          </CoursesProvider>
        </UserProvider>
      </RouterProvider>
    </LoadingProvider>
  );
}

export default App;
