import React, { useState } from "react";

import BoardContext from "./boardContext";
import { loadLists } from "../../services/cardsService";

import List from "../List";
import { Container } from "./styles";

const data = loadLists();

export default function Board() {
  const [lists, setLists] = useState(data);

  function move(from, to) {
    if (from.listId === to.listId) {
      const currentListIndex = lists.findIndex(list => from.listId === list.id);
      const currentList = { ...lists[currentListIndex] };
      const listCards = currentList.cards;

      if (from.index > to.index) {
        const movedCard = listCards.splice(from.index, 1);
        const beforeDestinyCard = listCards.splice(to.index, listCards.length);
        const updatedList = [...listCards, ...movedCard, ...beforeDestinyCard];

        const newList = [...lists];
        newList[currentListIndex].cards = updatedList;
        setLists(newList);
      }

      if (from.index < to.index) {
        const movedCard = listCards.splice(from.index, 1);
        const afterMovedCard = listCards.splice(
          to.index,
          listCards.length - (from.index + 1)
        );
        const updatedList = [...listCards, ...movedCard, ...afterMovedCard];

        const newList = [...lists];
        newList[currentListIndex].cards = updatedList;
        setLists(newList);
      }

      return;
    }

    const editedLists = {};

    for (let index in lists) {
      if (editedLists.from && editedLists.to) {
        break;
      }
      if (lists[index].id === from.listId) {
        editedLists.from = {
          cards: [...lists[index].cards],
          index
        };
        continue;
      }
      if (lists[index].id === to.listId) {
        editedLists.to = {
          cards: [...lists[index].cards],
          index
        };
        continue;
      }
    }    
    
    const movedCard = editedLists.from.cards[from.index];
    
    //from list
    const updatedFromCards = editedLists.from.cards.filter((card,i) => i !== from.index)
    editedLists.from.cards = updatedFromCards
    //to list
    const beforeInsertionToCards = editedLists.to.cards.slice(0, to.index);
    const afterInsertionToCards = editedLists.to.cards.slice(to.index);
    const updatedCards = [...beforeInsertionToCards, movedCard, ...afterInsertionToCards]
    editedLists.to.cards = updatedCards

    

    const newList = [...lists];
    newList[editedLists.from.index].cards = [...editedLists.from.cards];
    newList[editedLists.to.index].cards = [...editedLists.to.cards];
    setLists(newList);
  }

  return (
    <BoardContext.Provider value={{ lists, move }}>
      <Container>
        {lists.map(list => (
          <List key={list.title} data={list} />
        ))}
      </Container>
    </BoardContext.Provider>
  );
}
