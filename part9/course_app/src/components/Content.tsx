import Part from "./Part";
import { CoursePart } from "../types";

interface CourseArray {
  courses: Array<CoursePart>
}

const Content = ({ courses }: CourseArray): JSX.Element => {
  return (
    <div>
      {courses.map(course =>
        <Part key={course.name} course={course}/>
      )}
    </div>
  )
}

export default Content