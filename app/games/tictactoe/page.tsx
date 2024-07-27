"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

function Ex() {
  return (
    <motion.div className="w-full h-full relative flex justify-center items-center">
      <div className="absolute rotate-45  w-full h-3">
        <motion.div
          initial={{ opacity: 1, scaleX: 0.1 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.1 }}
          className=" w-full h-full rounded-full  bg-red-500"
        ></motion.div>
      </div>
      <div className="absolute rotate-45  w-3 h-full">
        <motion.div
          initial={{ opacity: 1, scaleY: 0.1 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ duration: 0.1 }}
          className=" h-full w-full rounded-full  bg-red-500"
        ></motion.div>
      </div>
    </motion.div>
  );
}

function Ow() {
  return (
    <div className="w-full h-full flex justify-center items-center p-2">
      <motion.div
        initial={{ scale: 0.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.1 }}
        className="w-full h-full rounded-full bg-green-500 p-3"
      >
        <div className="w-full h-full rounded-full bg-white"></div>
      </motion.div>
    </div>
  );
}

function Tics() {
  return (
    <div className="flex w-full h-full">
      <Tictactoe />
      <Tictactoe />
      <Tictactoe />
    </div>
  );
}
function Tictactoe() {
  type CellValue = "n" | "x" | "o";

  const [a1, setA1] = useState<CellValue>("n");
  const [a2, setA2] = useState<CellValue>("n");
  const [a3, setA3] = useState<CellValue>("n");
  const [b1, setB1] = useState<CellValue>("n");
  const [b2, setB2] = useState<CellValue>("n");
  const [b3, setB3] = useState<CellValue>("n");
  const [c1, setC1] = useState<CellValue>("n");
  const [c2, setC2] = useState<CellValue>("n");
  const [c3, setC3] = useState<CellValue>("n");
  const [isX, setIsX] = useState<boolean>(true);
  const [winner, setWinner] = useState<CellValue | null>(null);
  const [tie, setTie] = useState<boolean>(false);

  const handleClick = (
    currentValue: CellValue,
    setter: React.Dispatch<React.SetStateAction<CellValue>>
  ) => {
    if (currentValue === "n" && winner === null) {
      setter(isX ? "x" : "o");
      setIsX(!isX);
    }
  };

  useEffect(() => {
    checkWinner();
  }, [a1, a2, a3, b1, b2, b3, c1, c2, c3]);

  const checkWinner = () => {
    const lines = [
      [a1, a2, a3],
      [b1, b2, b3],
      [c1, c2, c3],
      [a1, b1, c1],
      [a2, b2, c2],
      [a3, b3, c3],
      [a1, b2, c3],
      [a3, b2, c1],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [cell1, cell2, cell3] = lines[i];
      if (cell1 !== "n" && cell1 === cell2 && cell2 === cell3) {
        setWinner(cell1);
        return;
      }
    }

    // Check for tie if no winner
    const allCellsFilled = [a1, a2, a3, b1, b2, b3, c1, c2, c3].every(
      (cell) => cell !== "n"
    );
    if (allCellsFilled && winner === null) {
      setTie(true);
    }
  };

  const resetGame = () => {
    setA1("n");
    setA2("n");
    setA3("n");
    setB1("n");
    setB2("n");
    setB3("n");
    setC1("n");
    setC2("n");
    setC3("n");
    setIsX(true);
    setWinner(null);
  };

  const tiereset = () => {
    setTie(false);
    resetGame();
    setIsX(true);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="grid grid-cols-3 gap-2">
        <div
          className="w-20 h-20 bg-white rounded-md"
          onClick={() => handleClick(a1, setA1)}
        >
          {a1 == "x" ? (
            <>
              <Ex />
            </>
          ) : a1 == "o" ? (
            <>
              <Ow />
            </>
          ) : null}
        </div>
        <div
          className="w-20 h-20 bg-white rounded-md"
          onClick={() => handleClick(a2, setA2)}
        >
          {a2 == "x" ? (
            <>
              <Ex />
            </>
          ) : a2 == "o" ? (
            <>
              <Ow />
            </>
          ) : null}
        </div>
        <div
          className="w-20 h-20 bg-white rounded-md"
          onClick={() => handleClick(a3, setA3)}
        >
          {a3 == "x" ? (
            <>
              <Ex />
            </>
          ) : a3 == "o" ? (
            <>
              <Ow />
            </>
          ) : null}
        </div>
        <div
          className="w-20 h-20 bg-white rounded-md"
          onClick={() => handleClick(b1, setB1)}
        >
          {b1 == "x" ? (
            <>
              <Ex />
            </>
          ) : b1 == "o" ? (
            <>
              <Ow />
            </>
          ) : null}
        </div>
        <div
          className="w-20 h-20 bg-white rounded-md"
          onClick={() => handleClick(b2, setB2)}
        >
          {b2 == "x" ? (
            <>
              <Ex />
            </>
          ) : b2 == "o" ? (
            <>
              <Ow />
            </>
          ) : null}
        </div>
        <div
          className="w-20 h-20 bg-white rounded-md"
          onClick={() => handleClick(b3, setB3)}
        >
          {b3 == "x" ? (
            <>
              <Ex />
            </>
          ) : b3 == "o" ? (
            <>
              <Ow />
            </>
          ) : null}
        </div>
        <div
          className="w-20 h-20 bg-white rounded-md"
          onClick={() => handleClick(c1, setC1)}
        >
          {c1 == "x" ? (
            <>
              <Ex />
            </>
          ) : c1 == "o" ? (
            <>
              <Ow />
            </>
          ) : null}
        </div>
        <div
          className="w-20 h-20 bg-white rounded-md"
          onClick={() => handleClick(c2, setC2)}
        >
          {c2 == "x" ? (
            <>
              <Ex />
            </>
          ) : c2 == "o" ? (
            <>
              <Ow />
            </>
          ) : null}
        </div>
        <div
          className="w-20 h-20 bg-white rounded-md"
          onClick={() => handleClick(c3, setC3)}
        >
          {c3 == "x" ? (
            <>
              <Ex />
            </>
          ) : c3 == "o" ? (
            <>
              <Ow />
            </>
          ) : null}
        </div>
      </div>

      {winner && (
        <div className=" absolute w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-10 rounded-lg shadow-lg text-black text-center">
            <h2 className="text-2xl font-bold mb-4">
              {winner.toUpperCase()} Wins!
            </h2>
            <button
              onClick={resetGame}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Play Again
            </button>
          </div>
        </div>
      )}

      {tie && (
        <div className="absolute w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-10 rounded-lg shadow-lg text-black text-center">
            <h2 className="text-2xl font-bold mb-4">It is a Tie!</h2>
            <button
              onClick={tiereset}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Tictactoe;
