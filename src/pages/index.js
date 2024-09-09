import { Button, Card, CardContent, Container, Grid } from "semantic-ui-react";
import { useRouter } from 'next/router';
import Calendar from "react-calendar";
import CalendarComponent from "components/CalendarComponent";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

//frontend
export default function Home({tasks}) {

  const isLargeScreen = useMediaQuery({ query: '(min-width: 1200px)' });
  const isMediumScreen = useMediaQuery({ query: '(min-width: 768px)' });
  const isSmallScreen = useMediaQuery({ query: '(max-width: 767px)' });

  // Determinar el número de tarjetas por fila según el tamaño de pantalla
  const itemsPerRow = isLargeScreen ? 4 : isMediumScreen ? 2 : 1;

  const router = useRouter();
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const filterTasksByDate = (date) => {
    const selectedDay = formatDateToYYYYMMDD(date); // Convierte la fecha seleccionada a YYYY-MM-DD
    console.log("Fecha seleccionada para filtrar:", selectedDay);

    const filtered = tasks.filter((task) => {
      return task.dateAsigned === selectedDay; // Compara directamente la fecha de la tarea con la fecha seleccionada
    });

    setFilteredTasks(filtered); // Actualiza el estado de las tareas filtradas
  };



  const formatDateToYYYYMMDD = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };


  const handleDateSelect = (newDate) => {
    setSelectedDate(newDate);
  };

  const markAsMade = async (task) => {
    try {
      await fetch(`http://localhost:3000/api/tasks/${task._id}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...task, isMade: true }), // Actualizar isMade a true
      });

      // Actualizar la UI después de hacer la solicitud PUT
      setFilteredTasks(filteredTasks.map((t) => 
        t._id === task._id ? { ...t, isMade: true } : t
      ));
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  useEffect(() => {
    filterTasksByDate(selectedDate); 
    console.log("Tasks:", tasks);
    
  }, [selectedDate, tasks, filterTasksByDate]);


  // console.log(tasks);

  if(tasks.length === 0) return (
    <Grid centered verticalAlign="middle" columns={1} style={{height: "80vh"}}>
      <Grid.Row>
        <Grid.Column textAlign="center">
          <h1>There aren't tasks yet</h1>
          {/* <img src="https://img.freepik.com/vector-gratis/ilustracion-concepto-fallo-conexion_114360-536.jpg?w=2000" alt="No tasks yet"/> */}
          <div>
            <Button>
              Create a task
            </Button>
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
  
  return (
    // <Layout>  
      <Container style={{padding: "20px"}}>

        <CalendarComponent 
          tasks={tasks} onDateSelect={handleDateSelect}
        />
      <h1>Tasks</h1>
      <div className="cards">

      <Card.Group itemsPerRow={itemsPerRow}>
        {filteredTasks.map(task => (
          <Card
            key={task._id}
            style={{
              backgroundColor: task.isMade 
                ? '#28a745'  // Verde claro si la tarea está marcada como hecha (isMade)
                : task.priority === 'urgent'
                ? '#dc3545'  // Rojo claro para urgente
                : task.priority === 'moderate'
                ? '#ffc107'  // Amarillo claro para moderado
                : task.priority === 'low'
                ? '#007bff'  // Azul claro para bajo
                : 'white',   // Blanco por defecto si no tiene prioridad
            }}
          >
            <CardContent className="card-body">
              <Card.Header>{task.title}</Card.Header>
              <p className="description">{task.description}</p>
              <p className="priority">Priority {task.priority}</p>
              <p className={task.isMade ? "isMade" : "noMade"}>{task.isMade ? "Complete" : "Incomplete"}</p>
            </CardContent>
            <Card.Content extra>
              <div className="btns">
                <Button primary onClick={() => router.push(`/tasks/${task._id}`)}>View</Button>
                <Button primary onClick={() => router.push(`/tasks/${task._id}/edit`)}>Edit</Button>
              </div>
              {!task.isMade && (
                <Button className="btn" primary onClick={() => markAsMade(task)}>Mark as Made</Button>
              )}
            </Card.Content>
          </Card>
                  ))}
                </Card.Group>
      </div>
      </Container>
    // </Layout>
  )
}

//backend 7.
export const getServerSideProps = async (ctx) => {
  const res = await fetch('http://localhost:3000/api/tasks');
  const tasks = await res.json();

  return {
    props : {
      tasks,
    },
  };
}