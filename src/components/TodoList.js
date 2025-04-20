import React from "react";
import styled from "styled-components";
import TodoItem from "./TodoItem";

const ListContainer = styled.div`
  margin: 2rem auto;
  padding: 1rem;
  max-width: 600px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

function TodoList({ todos, onDelete, onToggle }) {
  return (
    <ListContainer>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </ListContainer>
  );
}

export default TodoList;