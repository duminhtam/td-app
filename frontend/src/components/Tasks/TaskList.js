import React from 'react'
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { makeStyles } from "@material-ui/core/styles";
import { MdModeEdit } from "react-icons/md";
import io from 'socket.io-client';

export const socket = io('http://localhost:3002');


const useStyles = makeStyles({
    custom: {
        color: "#00EE00",
        fontWeight: "bold"
    }
});

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function TaskList({ setLoggedIn }) {


    const [tasks, setTasks] = React.useState([])
    const [open, setOpen] = React.useState(false);

    const handleClose = () => setOpen(false);
    const [title, setTitle] = React.useState("")


    const navigate = useNavigate();
    const addMatch = React.useCallback(

        (task) => setTasks([task,...tasks]),
    );
    React.useEffect(() => {
        async function fetchData() {
            try {
                const token = localStorage.getItem('token');
                const { data } = await axios.get('http://localhost:3002/api/v1/task', {
                    headers: ({
                        Authorization: 'Bearer ' + token
                    })
                });
                setTasks(data)
            } catch (error) {
                setLoggedIn(true);
            }
        }
        fetchData();
    }, [navigate, setLoggedIn]);

    React.useEffect(() => {
        socket.on('newMatch', addMatch);
        return () => {
            socket.off('newMatch', addMatch);
        };
    }, [addMatch, socket]);


    const [titleName, settitle] = React.useState({
        title: "",
        id: "",
        description: ""
    });
    const handleClick = async (task) => {
        await setOpen(true);
         settitle({
            id: task._id,
            title: task.title,
            description: task.description
        });
    };

    const submitForm = async (e) => {

        e.preventDefault();
        const data1 = new FormData(e.currentTarget);
        const form = {
            title: data1.get('title'),
            id: data1.get('id'),
            description: data1.get('description')
        };
        const token = localStorage.getItem('token');
        await axios.put("http://localhost:3002/api/v1/task/" + titleName.id, form, {
            headers: ({
                Authorization: 'Bearer ' + token
            })
        })
        const { data } = await axios.get('http://localhost:3002/api/v1/task', {
            headers: ({
                Authorization: 'Bearer ' + token
            })
        });

        setTasks(data)
        handleClose()
    }
    const classes = useStyles();
    return (

        <Container>
            <div>

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            <Box component="form" onSubmit={submitForm} sx={{ mt: 1 }}>
                                <label>Title:</label>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="title"
                                    name="title"
                                    autoFocus
                                    placeholder={titleName.title}
                                    onChange={(e) => setTitle(titleName.title)}
                                />
                                <TextField
                                    margin="normal"

                                    fullWidth
                                    id="id"
                                    name="id"
                                    autoFocus
                                    style={{ display: 'none' }}

                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                <label>description</label>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth id="description" name="description"
                                    autoFocus
                                    placeholder={titleName.description}
                                    onChange={(e) => setTitle(titleName.description)}
                                />

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Update task
                                </Button>
                            </Box>
                        </Typography>
                    </Box>
                </Modal>
            </div>

            <Grid container spacing={2} marginTop={2}>
                {tasks.map((task) => {
                    return <Grid item xs={12} md={4} key={task._id}>
                        <CardActionArea >
                            <Card sx={{ display: 'flex' }}>
                                <CardContent sx={{ flex: 1 }} onClick={() => {handleClick(task)}}>
                                    <MdModeEdit id={task._id} alt={task.title} name={task.description}  />
                                    <Typography id="outlined-helperText" variant="h6" className={classes.custom} component="div" color="text.secondary">
                                        {task.title}
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.primary">
                                        {task.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </CardActionArea>
                    </Grid>
                })}
            </Grid>
        </Container >
    );
}
