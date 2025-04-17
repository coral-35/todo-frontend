import React from "react";
import styled from "styled-components";

const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => (props.done ? "#e6ffe6" : "#fff")};
  padding: 0.8rem 1rem;
  margin-bottom: 0.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  color: ${(props) => (props.done ? "#555" : "#333")};
  text-decoration: ${(props) => (props.done ? "line-through" : "none")};
`;

const DeleteButton = styled.button`
  background: #e74c3c;
  color: white;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    background: #c0392b;
  }
`;

function TodoItem({ todo, onDelete }) {
  return (
    <Item done={todo.done}>
      <span>{todo.title}</span>
      <DeleteButton onClick={() => onDelete(todo.id)}>削除</DeleteButton>
    </Item>
  );
}

export default TodoItem;