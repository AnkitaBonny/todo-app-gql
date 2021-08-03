import React from "react";
import { useMutation } from "react-query";
import { updateTodo } from "@gql";
import { InputField, InputRef } from "@components/input-field";

type CompProps = {
  onSuccess?: () => void;
};

const UpdateTodo: React.FC<CompProps> = (props) => {
  // ref type - uncontrolled input component
  const todoInput = React.createRef<InputRef>();
  const { mutate, isLoading } = useMutation(updateTodo);

  const handleOnSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    mutate({
      id: props.id,
      summary: todoInput.current?.value
    }, {
      onSuccess: () => {
        console.log("onSuccess: Update Todo");
        props.onSuccess();
      },
      onError: () => {
        console.log("onError: Update Todo");
      }
    });
    todoInput.current.value = "";
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <p>
        <label htmlFor="todo"></label>
        <InputField
          type="text"
          name="todo"
          ref={todoInput}
          defaultValue=""
          required
        />
      </p>
      <p>
        <button
          type="submit"
          value="Update"
          disabled={isLoading}
        >
          Update
        </button>
      </p>
    </form>
  )
};

export default UpdateTodo;
