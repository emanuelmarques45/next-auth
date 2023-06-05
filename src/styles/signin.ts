import styled from "styled-components"

const Container = styled.main`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--clr-athens-gray);

  form {
    width: min(90%, 40rem);
    margin-inline: auto;
    padding: 2rem;
    background-color: var(--clr-white);
    border-radius: var(--br-default);

    fieldset {
      display: flex;
      flex-direction: column;
      gap: 3rem;

      legend {
        width: 100%;
        text-align: center;
        margin-bottom: 3rem;
      }

      input {
        width: 100%;
        border: 1px solid var(--clr-oslo-gray);
        border-radius: var(--br-default);
        transition: var(--transition-default);
        padding: 1rem;

        &:focus {
          outline: none;
          box-shadow: 1px 1px 7px 3px var(--clr-non-photo-blue);
        }
      }
    }

    button {
      margin-top: 3rem;
      width: 100%;
      border-radius: var(--br-default);
      background-color: var(--clr-lochmara);
      color: var(--clr-white);
      padding: 1.5rem;
      font-size: 1.6rem;
      transition: var(--transition-default);

      &:hover {
        background-color: var(--clr-lochmara-light);
      }
    }
  }
`

const InputBox = styled.div`
  position: relative;

  label {
    position: absolute;
    left: 1rem;
    top: 0.9rem;
    transition: var(--transition-default);
    pointer-events: none;
  }

  input {
    &:focus + label,
    &:not(:placeholder-shown) + label {
      top: -2rem;
      left: 0.5rem;
      font-size: 1.4rem;
    }

    &::placeholder {
      opacity: 0;
    }
  }
`

export { Container, InputBox }
