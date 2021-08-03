import React from "react";
import styles from "@styles/todo.module.css";
import UpdateTodo from "@components/update-todo";
import { useState } from "react";
import { getTodos } from "@gql";
import { useQuery } from "react-query";

type ErrorModel = {
  message?: string;
};

type TodoModel = {
  id: string;
  summary: string;
  created_at: string;
  last_updated: string;
};

type TodoList = {
  todos: Array<TodoModel>;
};

type ListProps = {
  data: TodoList;
  error: ErrorModel;
  loading: boolean;
  onDelete?: (e: React.SyntheticEvent, id: string) => void;
  onSuccess?: (e: React.SyntheticEvent, id: string) => void;
};

const TodoList: React.FC<ListProps> = (props) => {
  const { data, error, onDelete, onSuccess, loading } = props;
  const [showUpdateContext, setShowUpdateContext] = useState(false);
  const { refetch } = useQuery("todos", getTodos);
  const handleOnDelete = (e: React.SyntheticEvent, id) => {
    onDelete(e, id);
  };

  const handleOnUpdate = () => {
    refetch();
  };

  if (loading) { return <p>loading...</p> }
  if (error) { return <p>{error.message}</p> }
  if (data?.todos.length) {
    return (
      <ul className={styles.todo}>
        {
          data.todos.map((todo: TodoModel) => {
            return (
              <li key={todo.id}>
                <div>
                  {todo.summary}
                </div>
                <div>
                  <button
                    className={styles.update}
                    type="button"
                    value="Update"
                    onClick={(e) => setShowUpdateContext(true)}
                    disabled={loading}
                  />
                  <button
                    className={styles.delete}
                    type="button"
                    value="Delete"
                    onClick={(e) => handleOnDelete(e, todo.id)}
                    disabled={loading}
                  />
                  { showUpdateContext && (
                    <UpdateTodo
                      //pass onsuccess and todo.id
                      onSuccess={handleOnUpdate}
                      id={todo.id}
                    />
                  )}
                </div>
              </li>
            )
          })
        }
      </ul>
    )
  } else {
    return <p>Write your first todo.</p>
  }
};

export default TodoList;
