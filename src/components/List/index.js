import React from "react";
import { Container } from "./styles";

import { MdAdd } from "react-icons/md";

import Card from "../Card";

export default function List({ data }) {
  const { title, creatable, done, id } = data;
  return (
    <Container done={done}>
      <header>
        <h2>{title}</h2>
        {creatable && (
          <button type="button">
            <MdAdd size={24} color="fff" />
          </button>
        )}
      </header>

      <ul>
        {data.cards.map((card, index) => (
          <Card key={card.id} index={index} data={card} listId={id}/>
        ))}
      </ul>
    </Container>
  );
}
