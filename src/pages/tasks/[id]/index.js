import React, {useState} from 'react';
import Error from 'next/error';
import { Button, Grid, Confirm, Loader } from 'semantic-ui-react';
import { useRouter } from 'next/router';

const TaskDetails = ({task, error}) => {
    const {query, push} = useRouter();

    const [confirm, setConfirm] = useState(false)
    const [deleting, setDeleting] = useState(false);

    const close = () => {
        setConfirm(!confirm)
    }

    const deleteTask = async () => {
        const {id} = query;
        try {
            await fetch(`http://localhost:3000/api/tasks/${id}`, {
                method: 'DELETE',
            })
        } catch (error) {
            console.log(error);
        }
    }
    const handleDelete = () => {
        console.log('xd');
        setDeleting(true); //spinner
        deleteTask();
        close();
        push("/");
    }

    if(error && error.statusCode) return <Error statusCode={error.statusCode} title={error.statusText} />

    return (  
        <Grid 
            centered 
            verticalAlign="middle"
            columns="1"
            style={{height: "80vh"}}
        >
            <Grid.Row>
                <Grid.Column textAlign='center'>
                    <h1>{task.title}</h1>
                    <p>{task.description}</p>
                    <div>
                        <Button
                            color='red'
                            onClick={close}
                            loading={deleting}
                        >
                            Delete
                        </Button>
                    </div>
                </Grid.Column>
            </Grid.Row>
            <Confirm 
                open={confirm}
                onConfirm={handleDelete}
                onCancel={close}
            />
        </Grid>
    );
}
 
export default TaskDetails;

//backend
export async function getServerSideProps({query: {id}}){

    const res = await fetch(`http://localhost:3000/api/tasks/${id}`);
    if(res.status === 200) {
        const task = await res.json();
        return {
            props: {
                task
            }
        }
    }

    console.log(id);
    return{
        props: {
            error: {    
                statusCode: res.status,
                statusText: "Invalided ID"
            }
        }
    }
}