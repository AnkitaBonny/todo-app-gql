import React from "react";
import styles from "@styles/todo.module.css";

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
};

const TodoList: React.FC<ListProps> = (props) => {
  const { data, error, onDelete, loading } = props;
  const handleOnDelete = (e: React.SyntheticEvent, id) => {
    onDelete(e, id);
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
                    onClick={() => null}
                    disabled={loading}
                  />
                  <button
                    className={styles.delete}
                    type="button"
                    value="Delete"
                    onClick={(e) => handleOnDelete(e, todo.id)}
                    disabled={loading}
                  />
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
