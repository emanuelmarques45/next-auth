import styled from "styled-components"

const Button = styled.button`
  margin-top: 3rem;
  width: 100%;
  max-width: 40rem;
  border-radius: var(--br-default);
  background-color: var(--clr-lochmara);
  color: var(--clr-white);
  padding: 1.5rem;
  font-size: 1.6rem;
  transition: var(--transition-default);

  &:hover {
    background-color: var(--clr-lochmara-light);
  }
`

export { Button }
