/** @jsxImportSource @emotion/react */
import { Dialog } from "@reach/dialog"
import "@reach/dialog/styles.css"
import { cloneElement, createContext, useContext, useState } from "react"
import { css } from "@emotion/react"

const callAll =
  (...fns) =>
  (...args) => {
    fns.forEach((fn) => fn && fn(...args))
  }

const ModalContext = createContext()

export function Modal({ children }) {
  const [isopen, setisOpen] = useState(false)
  return (
    <ModalContext.Provider value={[isopen, setisOpen]}>
      {children}
    </ModalContext.Provider>
  )
}

export function ModalOpenButton({ children: child }) {
  const [, setisOpen] = useContext(ModalContext)
  return cloneElement(child, {
    onClick: callAll(() => setisOpen(true), child.props.onClick),
  })
}

export function ModalDismissButton({ children: child }) {
  const [, setIsOpen] = useContext(ModalContext)
  return cloneElement(child, {
    onClick: callAll(() => setIsOpen(false), child.props.onClick),
  })
}

export function ModalConfirmButton({ children: child }) {
  const [, setIsOpen] = useContext(ModalContext)
  return cloneElement(child, {
    onClick: callAll(() => child.props.onClick(setIsOpen)),
  })
}

export function ModalContentsBase(props) {
  const [isopen, setisOpen] = useContext(ModalContext)
  return (
    <Dialog
      css={css`
        border-radius: 12px;
        max-width: 450px;
      `}
      aria-label="dialog"
      isOpen={isopen}
      onDismiss={() => setisOpen(false)}
      {...props}
    ></Dialog>
  )
}

export function ModalContents({ title, children, ...props }) {
  return (
    <ModalContentsBase {...props}>
      <h3>{title}</h3>
      {children}
    </ModalContentsBase>
  )
}
