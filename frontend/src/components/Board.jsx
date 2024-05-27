import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content:center;
`;

const ColumnContainer = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 300px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h3`
  padding: 8px;
`;

const TaskList = styled.div`
  padding: 8px;
`;

const TaskContainer = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  width:200px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: white;
`;

const Heading = styled.div`
    color:"red";
`;

function Board(props) {
    const initialData = {
        "tasks": {
            "task-1": { "id": "task-1", "content": "create video" },
            "task-2": { "id": "task-2", "content": "Edit video" },
            "task-3": { "id": "task-3", "content": "publish video" }
        },
        "columns": {
            "column-1": {
                "id": "column-1",
                "title": "To do",
                "taskIds": ["task-2", "task-3"]
            },
            "column-2": {
                "id": "column-2",
                "title": "Done",
                "taskIds": ["task-1"]
            }
        },
        "columnOrder": ["column-1", "column-2"]
    };

    const [state, setState] = useState(initialData);

    useEffect(() => {
        fetchBoard().then(board => setState(board));
    }, [props.token]);

    async function fetchBoard() {
        const response = await fetch('/board', { headers: { "Authorization": "Bearer " + props.token } });
        const data = await response.json();
        return data.board;
    }

    return (
        <div style={{width:"100vw"}}> 
         <h1 style={{textAlign:"center"}}>KANBAN BOARD</h1>
        <Container>
            {
                state.columnOrder.map((columnId, index) => {
                    const column = state.columns[columnId];
                    const tasks = column.taskIds.map(taskId => state.tasks[taskId]);
                    return (
                        <ColumnContainer key={column.id}>
                            <Title>{column.title}</Title>
                            <TaskList>
                                {tasks.map(task => (
                                    <TaskContainer key={task.id}>
                                        {task.content}
                                    </TaskContainer>
                                ))}
                            </TaskList>
                        </ColumnContainer>
                    );
                })
            }
        </Container>
        </div>
    );
}

export default Board;
