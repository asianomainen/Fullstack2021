interface Course {
  name: string,
  exerciseCount: number
}

interface CourseArray {
  courses: Array<Course>
}

const Content = ({courses}: CourseArray): JSX.Element => {
  return (
    <>
      {courses.map(course =>
        <p key={course.name}>{course.name} {course.exerciseCount}</p>
      )}
    </>
  )
}

export default Content