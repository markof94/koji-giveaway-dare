import React, { useEffect, forwardRef, useImperativeHandle } from 'react';
import styled from 'styled-components';
import p5 from 'p5';
import setup from './setup';

/* eslint-disable */
const Container = styled.div`
  overflow-y: hidden;
`;

let game = null;

const getShuffledParticipantsBasedOnEntries = (participants) => {
  const data = [];

  participants.forEach((p) => {
    for (let i = 0; i < p.entries; i++) {
      data.push(p);
    }
  });

  return shuffle(data);
};

const initGame = (participants, onDone, width) => {
  game = new p5((game) => {
    game.preload = () => {
      game.words = shuffle(participants);
      game.onDone = onDone;
    };

    game.setup = () => setup(game, width);

    game.draw = () => {
      game.background('white');
      game.wheel1.update();
    };
  }, 'p5game');
};

const removeGame = () => {
  if (game) {
    game.remove();
    game = null;
  } else {
    const canv = window.document.querySelector('canvas');
    canv && canv.remove();
  }
};

function shuffle(array) {
  let currentIndex = array.length;
  let randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--

    // And swap it with the current element.
    ;[array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

const WordSpinner = forwardRef(({ participants, onDone }, ref) => {
  useEffect(() => {
    const containerWidth =
      window.document.getElementById('spinner-dialog-container').offsetWidth -
      30;

    initGame(participants, onDone, containerWidth);

    return () => {
      removeGame();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useImperativeHandle(ref, () => ({
    spin: () => game.wheel1.spin(),
  }));

  return (
    <Container>
      <div id="p5game" />
    </Container>
  );
});

export { game };
export default WordSpinner;
