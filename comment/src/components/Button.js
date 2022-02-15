/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled"
import { colors } from "../utils/style"

function Button({ children, ...props }) {
  return <StyledButton {...props}>{children}</StyledButton>
}

const base = {
  cursor: "pointer",
  display: "inline-block",
  textAlign: "center",
  verticalAlign: "middle",
  userSelect: "none",
  border: "1px solid transparent",
  padding: ".4rem .75rem",
  fontSize: "1rem",
  fontWeight: 700,
  lineHeight: 1.5,
  borderRadius: "4px",
  transition: "all .15s ease-in-out",
  "&:focus": {
    outline: "0",
  },
  "&:disabled": {
    cursor: "inherit",
    opacity: 0.5,
  },
}

const buttonVariant = {
  primary: {
    color: colors.Moderateblue,
    background: "none",
  },
  secondary: {
    color: colors.Darkblue,
    background: "none",
  },
  danger: {
    color: colors.SoftRed,
    background: "none",
  },
}

const space = (space) => {
  return (
    space && {
      display: "flex",
      alignItems: "baseline",
      columnGap: "4px",
    }
  )
}

const variant = ({ variant }) => variant && buttonVariant[variant]

const buttonColor = {
  primary: {
    color: colors.White,
    backgroundColor: colors.Moderateblue,
  },
  secondary: {
    color: colors.White,
    backgroundColor: colors.Darkblue,
  },
  danger: {
    color: colors.White,
    backgroundColor: colors.SoftRed,
  },
}

const color = ({ color = "primary" }) => buttonColor[color]

const buttonSize = {
  small: {
    fontSize: ".75rem",
    padding: ".2rem .75rem",
  },
  medium: {
    fontSize: "1rem",
    padding: ".4rem 1rem",
  },
  large: {
    fontSize: "1.25rem",
    padding: ".6rem 1.25rem",
  },
}

const size = ({ size = "medium" }) => buttonSize[size]

const StyledButton = styled.button(base, color, size, variant, space)

export default Button
