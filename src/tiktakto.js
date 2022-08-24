import React, { useEffect, useState, useRef } from "react";

let timeout;
let timeoutnot;
let timeout2;
let interval;
let interval3;
let win = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let blockwin = (arr, arr2, checknum) => {
  return new Promise((res, rej) => {
    let c = win.filter((e, index) => {
      let d = e.filter((d) => arr.includes(d));
      console.log(d, "d");
      if (d.length == 2) {
        return true;
      }
      return false;
      // e.forEach(c => {

      //     if (arr.includes(c)) {

      //     }
      // })
    });

    console.log(c, "cvb", checknum);

    let obj = c.reduce((total, acc) => {
      let num = acc.find((e) => !checknum.includes(e));
      console.log(num);
      if (num) {
        total = num;
      }

      return total;
    }, false);
    console.log(obj, "objcvb");
    res(obj);
  });
};

let Tiktakto = () => {
  let box = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  let width = 100;
  let height = 100;
  let ref1 = useRef(null);
  let ref = useRef(null);

  let [bo, setbo] = useState({
    x: {
      text: "X",
      name: "prince",
      backgroundColor: "red",
      color: "white",
      num: [],
    },
    o: {
      text: "O",
      name: "",
      backgroundColor: "blue",
      color: "white",
      num: [],
    },
    error: "",
    next: "o",
    not: "",

    start: false,
    win: false,
    style: {
      width: `${width}px`,
      height: `${height}px`,
      border: "1px solid black",
      borderColor: "blue",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  });

  //     let block_exhausted = () => {
  //        if()

  //    }
  let checknum = [...bo.x.num, ...bo.o.num];
  let checknum_ = box.reduce((total, acc) => {
    if (!checknum.includes(acc)) {
      total.push(acc);
    }

    return total;
  }, []);

  let checkwin = (arr, person) => {
    if (checknum.length >= box.length) {
      let bo_ = { ...bo };

      bo_.win = {};
      bo_.win.no_victor = true;
      bo_.next = "";

      bo_.not = `no winner .click restart to replay`;

      return bo_;
    }
    let c = win.find((e, index) => {
      let d = e.filter((d) => arr.includes(d));
      console.log(d, "d");
      if (d.length == 3) {
        return true;
      }
      return false;
      // e.forEach(c => {

      //     if (arr.includes(c)) {

      //     }
      // })
    });
    if (c) {
      let bo_ = { ...bo };

      bo_.win = {};
      bo_.win.person = person;
      bo_.win.winindex = c;
      bo_.win.index = 0;
      bo_.next = "";
      bo_.not = `${person} has won`;

      return bo_;
    } else {
      return false;
    }
  };
  let error = (e) => {
    clearTimeout(timeout);
    let bo_ = { ...bo };
    bo_.error = e;

    timeout = setTimeout((e) => {
      let bo_ = { ...bo };
      bo_.error = "";

      setbo(bo_);
    }, 2000);
    setbo(bo_);
  };

  let win_ = (bo) => {
    let count = 0;
    if (bo.win.no_victor) {
      interval3 = setInterval(() => {
        box.forEach((e, index) => {
          console.log(bo);
          let box_ = document.getElementById(`${e}`);

          box_.style.backgroundColor = `rgb(10, 10, ${
            (10 + index) * Math.random() * 100
          })`;
        });
      }, 2000);
      return;
    }

    interval = setInterval((e) => {
      count >= bo.win.winindex.length - 1 ? (count = 0) : (count += 1);
      bo.win.winindex.forEach((e) => {
        console.log(bo);
        let box_ = document.getElementById(`${e}`);

        box_.style.backgroundColor = "black";
        box_.style.borderColor = "yellow";
      });

      let box_ = document.getElementById(`${bo.win.winindex[count]}`);
      // box_.style.color="red"
      box_.style.borderColor = "red";
    }, 1000);
  };

  useEffect(() => {
    if (bo.next == "x" && !bo.win) {
      clearTimeout(timeout2);
      timeout2 = setTimeout((e) => {
        xfun();
      }, 2000);
    }
    if (bo.win) {
      win_(bo);
    }
  }, [bo]);
  let ofun = (e) => {
    if (bo.next != "o" || !bo.start) {
      return;
    }

    let trgt = e.currentTarget;
    if (checknum.includes(+trgt.id)) {
      error("this box has already being choosen");
      return;
    }
    // trgt.innerText = "O"
    console.log(trgt, checknum);
    console.log(trgt.id);

    let bo_ = { ...bo };
    bo_.next = "x";
    bo_.o.num = [...bo.o.num, +trgt.id];
    let win = checkwin(bo_.o.num, bo_.o.name);
    if (win) {
      setbo(win);
    } else {
      setbo(bo_);
    }
  };

  // useEffect(() => {

  // },[bo])

  let xfun = async (e) => {
    let bo_ = { ...bo };
    bo_.next = "o";
    let defend = await blockwin(bo.o.num, bo.x.num, checknum);
    let attack = await blockwin(bo.x.num, bo.o.num, checknum);
    console.log(attack, "attack");
    console.log(defend, "defend");
    if (attack) {
      console.log("attk");
      bo_.x.num = [...bo.x.num, +attack];
    } else if (defend) {
      console.log("dff");
      bo_.x.num = [...bo.x.num, +defend];
    } else {
      if (!checknum.includes(4)) {
        bo_.x.num = [...bo.x.num, 4];
      } else {
        let index = Math.floor(Math.random() * checknum_.length);
        console.log(checknum_);
        console.log(index);

        bo_.x.num = [...bo.x.num, checknum_[index]];
      }
    }
    let win = checkwin(bo_.x.num, bo_.x.name);
    if (win) {
      setbo(win);
    } else {
      setbo(bo_);
    }
  };

  console.log(bo.style.borderColor);
  return (
    <React.Fragment>
      <h1>TIKTAKTO</h1>
      <p className="error">{bo.error}</p>
      <p className="error">{bo.not}</p>
      {bo.start && bo[bo.next] && (
        <p style={{ width: "200px" }} className="error">
          {`next: `}
          <b style={{ textTransfrom: "uppercase", color: "red" }}>
            {bo[bo.next].name}
          </b>
        </p>
      )}
      <div
        style={{
          width: `${width * 3.5}px`,
          height: `${height * 3.5}px`,
          border: "1px solid black",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {box.map((e) => (
          <div
            style={{
              width: `${width}px`,
              height: `${height}px`,
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor: `${bo.start || "black"}`,

              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: `${
                (bo.x.num.includes(e) && bo.x.backgroundColor) ||
                (bo.o.num.includes(e) && bo.o.backgroundColor) ||
                "white"
              }`,
              color: `${
                (bo.x.num.includes(e) && bo.x.color) ||
                (bo.o.num.includes(e) && bo.o.color) ||
                "white"
              }`,
            }}
            id={e}
            key={e}
            onClick={(e) => {
              ofun(e);
            }}
          >
            {(bo.x.num.includes(e) && bo.x.text) ||
              (bo.o.num.includes(e) && bo.o.text) ||
              ""}
          </div>
        ))}
      </div>
      <div>
        <input
          ref={ref}
          value={bo.o.name}
          onChange={(e) => {
            let bo_ = { ...bo };
            bo_.o.name = e.currentTarget.value;
            setbo(bo_);
          }}
          placeholder="enter your name"
        ></input>
        <button
          ref={ref1}
          style={{ margin: "20px" }}
          onClick={(e) => {
            clearInterval(interval);
            clearTimeout(timeout);
            clearTimeout(timeout2);
            clearInterval(interval3);
            clearTimeout(timeoutnot);

            if (!bo.start) {
              e.currentTarget.innerText = "reset";
              ref.current.style.display = "none";
              let bo_ = { ...bo };

              if (bo_.o.name == "") {
                bo_.o.name = "user";
              }

              bo_.start = true;
              setbo(bo_);
            } else {
              e.currentTarget.innerText = "start";
              ref.current.style.display = "inline-flex";
              let bo_ = {
                ...bo,
                x: {
                  text: "X",
                  name: "prince",
                  backgroundColor: "red",
                  color: "white",
                  num: [],
                },
                o: {
                  text: "O",
                  name: "",
                  backgroundColor: "blue",
                  color: "white",
                  num: [],
                },
                error: "",
                next: "o",
                not: "",

                start: false,
                win: false,
              };
              bo_.style.borderColor = "black";

              setbo(bo_);
            }
          }}
        >
          start
        </button>
      </div>
    </React.Fragment>
  );
};

export default Tiktakto;
