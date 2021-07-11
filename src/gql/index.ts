import { request, gql } from "graphql-request";

const endpoint = "http://local.dev.com:4000/graphql";

export const getTodos = async () => {
  const data = await request(
    endpoint,
    gql`{
      todos {
        id,
        summary
        created_at,
        last_updated
      }
    }`
  );

  return data;
};

export const addTodo = ({ summary }) => {
  return request(
    endpoint,
    gql`
      mutation addTodo($summary: String!) {
        addTodo(summary: $summary) {
          id,
          summary
          created_at,
          last_updated
        }
      }`,
    { summary: summary }
  );
};

export const deleteTodo = async ({ id: todoId}) => {
  const data = await request(
    endpoint,
    gql`
      mutation deleteTodo($id: ID!) {
        deleteTodo(id: $id) {
          id,
          summary
          created_at,
          last_updated
        }
      }`,
    { id: todoId }
  );

  return data;
};
