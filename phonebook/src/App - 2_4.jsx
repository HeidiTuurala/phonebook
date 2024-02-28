const Header = (props) => {
  console.log(props)
  return (
    <div>
      <h2>{props.header}</h2>
    </div>
  )
}

const Part = (props) => {
  console.log(props)

  return (
    <div>
      <p>{props.course.name} {props.course.exercises}</p>
    </div>
  )
}

/*
function myMap(arr, func) {
  let komponentit = []
  for (let k of arr) {
    komponentit.push(func(k))
  }
  return komponentit
}
*/
const Content = (props) => {
  console.log(props)

  return (
    <div>
      {props.kurssit.map((k) => <Part course={k} />)}
    </div>
  )
}

const Total = (props) => {
  console.log(props)

  const kokonaismäärä = props.kurssi.reduce((sum, part) => sum+part.exercises,0)

  return (
    <div>
      <b>Total of exercises {kokonaismäärä}</b>
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header header={course.name} />
      <Content kurssit={course.parts} />
      <Total kurssi={course.parts} />
    </div>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web development curriculum</h1>
      <div>
        {courses.map(course =>
          <Course key={courses.id} course={course}/>
          )}
      </div>
    </div>
  )
}

export default App

