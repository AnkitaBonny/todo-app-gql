import React from "react";
import { useMutation } from "react-query";
import { addTodo } from "@gql";
import { InputField, InputRef } from "@components/input-field";

type CompProps = {
  onSuccess?: () => void;
};

const AddTodo: React.FC<CompProps> = (props) => {
  // ref type - uncontrolled input component
  const todoInput = React.createRef<InputRef>();
  const { mutate, isLoading } = useMutation(addTodo);

  const handleOnSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    mutate({
      summary: todoInput.current?.value
    }, {
      onSuccess: () => {
        console.log("onSuccess: Add Todo");
        props.onSuccess();
      },
      onError: () => {
        console.log("onError: Add Todo");
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
          value="Add"
          disabled={isLoading}
        >
          Add
        </button>
      </p>
    </form>
  )
};

export default AddTodo;
