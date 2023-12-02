import { useCallback, useState } from "react";
import { CoursesContext } from "./courses.context";

export const CoursesProvider = (props) => {
  const [courses, setCourses] = useState([]);
  const changeCourses = useCallback((courses) => {
    setCourses(courses);
  }, []);

  return (
    <CoursesContext.Provider value={{ courses, changeCourses }}>
      {props.children}
    </CoursesContext.Provider>
  );
};
