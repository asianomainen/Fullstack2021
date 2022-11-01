interface Course {
  name: string,
  exerciseCount: number
}

interface CourseArray {
  courses: Array<Course>
}

const Total = ({courses}: CourseArray): JSX.Element => {
  return (
    <>
      Number of exercises {courses.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </>
  )
}

export default Total