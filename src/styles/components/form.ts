import { motion } from "framer-motion"
import styled from "styled-components"

const Form = styled(motion.form)`
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
      font-size: 3rem;
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
    width: 100%;
    border-bottom: 1px solid var(--clr-oslo-gray);
    transition: var(--transition-default);
    padding: 1rem;
    border-radius: 0.6rem 0.6rem 0 0;
    font-size: 1.6rem;

    &:focus {
      outline: none;
      background-color: var(--clr-athens-gray);
    }

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

const ErrorMessage = styled.p`
  color: var(--clr-indian-red);
  margin-top: 2rem;
`

export const formAnimation = {
  initial: { y: -50, opacity: 0.5 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.1,
      bounce: 1,
      stiffness: 200,
      type: "spring"
    }
  },
  exit: { y: 50, opacity: 0, transition: { duration: 0.3 } }
}

export { ErrorMessage, Form, InputBox }
