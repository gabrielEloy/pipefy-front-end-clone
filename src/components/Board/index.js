import React, { useState } from "react";


import BoardContext from "./boardContext";
import { loadLists } from "../../services/cardsService";

import List from "../List";
import { Container } from "./styles";

const data = loadLists();

export default function Board() {
  const [lists, setLists] = useState(data);

  function move(from, to) {
  if(from.listId === to.listId){
    const currentListIndex = lists.findIndex(list => from.listId === list.id);
    const currentList = {...lists[currentListIndex]};
    const listCards = currentList.cards;
    
    if(from.index > to.index){
      const movedCard = listCards.splice(from.index, 1);
      const beforeDestinyCard = listCards.splice(to.index, listCards.length);
      const updatedList = [...listCards, ...movedCard, ...beforeDestinyCard];
      
      const newList = [...lists]
      newList[currentListIndex].cards = updatedList;
      setLists(newList);
    }

    if(from.index < to.index){
      const movedCard = listCards.splice(from.index, 1);
      const afterMovedCard = listCards.splice(to.index, (listCards.length - (from.index + 1)));
      const updatedList = [...listCards, ...movedCard, ...afterMovedCard];

      const newList = [...lists]
      newList[currentListIndex].cards = updatedList;
      setLists(newList);
    }
  }
  }

  return (
    <BoardContext.Provider value={{lists, move}}>
      <Container>
        {lists.map(list => (
          <List key={list.title} data={list} />
        ))}
      </Container>
    </BoardContext.Provider>
  );
}
