import React from 'react';
import styled from 'styled-components';
import Task from './Task';

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 10px;
`;

const Title = styled.h3`
  padding: 8px;
`;

const TaskList = styled.div`
  padding: 8px;
`;

function Column(props) {
    return (
        <Container>
            <Title>{props.column.title}</Title>
            <TaskList>
                {props.tasks.map((task, index) => (
                    <Task key={task.id} task={task} index={index} columnId={props.column.id} state={props.state} setState={props.setState} />
                ))}
            </TaskList>
        </Container>
    );
}

export default Column;
