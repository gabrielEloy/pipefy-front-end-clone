import React, { useRef, useContext } from "react";
import { useDrag, useDrop } from "react-dnd";

import BoardContext from "../Board/boardContext";

import { Container, Label } from "./styles";

export default function Card({ data, index, listId }) {
  const { content, labels, id } = data;
  const { move } = useContext(BoardContext);

  const [{ isDragging }, dragRef] = useDrag({
    item: { type: "CARD", index, id, listId},
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    })
  });

  const [, dropRef] = useDrop({
    accept: "CARD",
    hover(item, monitor) {
      const draggedItem = {index: item.index, listId: item.listId}
      const targetItem = {index, listId}

      if (draggedItem.index === targetItem.index) {
        return;
      }

      const targetSize = ref.current.getBoundingClientRect();
      const targetCenter = (targetSize.bottom - targetSize.top) / 2;

      const draggedOffset = monitor.getClientOffset();
      const draggedTop = draggedOffset.y - targetSize.top;

      //not sure about this block at all
      /**/
      if (draggedItem.index < targetItem.index && draggedTop < targetCenter) {
        return;
      }
      if (draggedItem.index > targetItem.index && draggedTop > targetCenter) {
        return;
      }
      
      move(draggedItem, targetItem);

      item.index = targetItem.index;
    }
  });

  const ref = useRef();

  dragRef(dropRef(ref));

  return (
    <Container isDragging={isDragging} ref={ref}>
      <header>
        {labels.map(label => (
          <Label key={label} color={label} />
        ))}
      </header>
      <p>{content}</p>
      {data.user && (
        <img
          src="https://api.adorable.io/avatars/285/abott@adorable.png"
          alt="avatar"
        />
      )}
    </Container>
  );
}
