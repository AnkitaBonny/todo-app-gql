import React from "react";
import { useQuery, useMutation } from "react-query";
import { getTodos, deleteTodo } from "@gql";
import TodoList from "@components/todo-list";
import AddTodo from "@components/add-todo";
import Layout from "@components/layout";

const TodoComponent: React.FunctionComponent = () => {
  // Get all todos
  const { data, error, isLoading, refetch } = useQuery("todos", getTodos);
  // Delete a todo
  const { mutate } = useMutation(deleteTodo);
  // Handler - delete todo
  const handleOnDelete = (e: React.SyntheticEvent, id: string) => {
    mutate({
      id
    }, {
      onSuccess: () => {
        console.log("onSuccess: Delete Todo");
        refetch();
      },
      onError: () => {
        console.log("onError: Delete Todo");
      }
    });
  }
  // Handler - refetch todos post creation
  const handleOnAdd = () => {
    refetch();
  };

  return (
    <Layout
     title="Todo App"
    >
      <>
        <section>
          <AddTodo onSuccess={handleOnAdd} />
        </section>
        <section>
          <TodoList
            data={data}
            error={error}
            loading={isLoading}
            onDelete={handleOnDelete}
          />
        </section>
      </>
    </Layout>
  );
}

export default TodoComponent;
