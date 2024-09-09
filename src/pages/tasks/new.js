import React, {useState, useEffect} from 'react';
import { Form, Grid, Button } from 'semantic-ui-react';
import { useRouter } from 'next/router';

const NewTask = () => {

    const {query, push} = useRouter();

    const [newTask, setNewTask] = useState({
        title: "",
        description: "",
        dateAsigned: "",
        priority: "moderate"
    })
    const [errors, setErrors] = useState({})

    const validate = () => {
        const errors = {}

        if(!newTask.title) errors.title = "Title is requiered"
        if(!newTask.description) errors.description= "Title is requiered"
        return errors
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        let errors = validate();
        if (Object.keys(errors).length) return setErrors(errors);
      
        if (query.id) {
          await updateTask();
        } else {
          await createTask();
        }
      
        await push('/'); // Redirige solo después de que la tarea se haya creado o actualizado
      };
    
    const updateTask = () => {
        try {
            fetch(`http://localhost:3000/api/tasks/`+query.id, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newTask)
            })
        } catch (error) {
            console.log(error);
        }
    }
    const handleChange = (e) => {
        setNewTask({
            ...newTask,
            [e.target.name] : e.target.value
        })
    }
    const createTask = async () => {
        console.log(newTask);
        
        try {
          const res = await fetch('http://localhost:3000/api/tasks', {
            method: 'POST',
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(newTask)
          });
          if (!res.ok) {
            throw new Error('Error al crear la tarea');
          }
        } catch (error) {
          console.log(error);
        }
      }

    const getTask = async () => {
        const res = await fetch('http://localhost:3000/api/tasks/' + query.id);
        const data = await res.json();
        setNewTask({
            title: data.title,
            description: data.description
        })
        console.log(data);
    }

    useEffect(() => {
      if(query.id){
        getTask();
      }
    }, [])
    

    return (  
        <Grid
            centered
            verticalAlign='middle'
            columns={'3'}
            style={{height: "80vh"}}
        >
            <Grid.Row>
                <Grid.Column>
                    <h1>Create Task</h1>
                    <Form
                        onSubmit={handleSubmit}
                    >
                        <Form.Input 
                            label="Title" 
                            placeholder="title"
                            name="title" 
                            onChange={handleChange}
                            error={errors.title ? {content: 'please enter a title', pointing: "below"} 
                            : null }
                            value={newTask.title}
                        />
                        <Form.Input 
                            label="Description" 
                            placeholder="description" 
                            name="description" 
                            onChange={handleChange}
                            error={errors.description ? {content: 'please enter a description', pointing: "below"} 
                            : null }
                            value={newTask.description}
                        />

                        <Form.Input
                            label="Date"
                            type="date"
                            name="dateAsigned"
                            onChange={handleChange}
                            value={newTask.dateAsigned}
                        />
                         <Form.Select
                            label="Priority"
                            name="priority"
                            options={[
                                { key: 'low', text: 'Low', value: 'low' },
                                { key: 'moderate', text: 'Moderate', value: 'moderate' },
                                { key: 'urgent', text: 'Urgent', value: 'urgent' }
                            ]}
                            onChange={(e, { value }) => handleChange({ target: { name: 'priority', value } })}
                            value={newTask.priority}
                        />

                        <Button
                            primary
                        >
                            Save
                        </Button>
                    </Form>
                </Grid.Column>
            </Grid.Row>
        </Grid>

    );
}
 
export default NewTask;