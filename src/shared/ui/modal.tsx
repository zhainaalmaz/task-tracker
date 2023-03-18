import { addTask } from "@/store/tasksSlice";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useOnClickOutside } from "../lib";

const ModalBackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7); /* semi-transparent black backdrop */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  padding: 20px;
`;

const Content = styled.div`
  width: 100%;
  max-width: 600px;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: rgba(255, 255, 255, 0.6) 0px 0px 30px;
`;

interface IModal {
  children: React.ReactNode;
  onClose: () => void;
}

export const Modal = (props: IModal) => {
  const contentRef = useRef(null);
  useOnClickOutside(contentRef, props.onClose);

  return (
    <ModalBackDrop>
      <Content ref={contentRef}>{props.children}</Content>
    </ModalBackDrop>
  );
};
