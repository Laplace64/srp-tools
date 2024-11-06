import { useEffect } from "react";
import { IStoredColor } from "./stored_colors";

const MINECRAFT_COLOR_CODE = new Map([
  ["0", "#000000"],
  ["1", "#0000AA"],
  ["2", "#00AA00"],
  ["3", "#00AAAA"],
  ["4", "#AA0000"],
  ["5", "#AA00AA"],
  ["6", "#FFAA00"],
  ["7", "#AAAAAA"],
  ["8", "#555555"],
  ["9", "#5555FF"],
  ["a", "#55FF55"],
  ["b", "#55FFFF"],
  ["c", "#FF5555"],
  ["d", "#FF55FF"],
  ["e", "#FFFF55"],
  ["f", "#FFFFFF"],
  ["g", "#DDD605"],
])

const FORMATTING_CODE = new Map([
  ["l", "font-bold"],
  ["m", "line-through"],
  ["n", "underline-offset-auto underline"],
  ["o", "italic"],
  ["k", "bg-indigo-500 text-indigo-500"],
])

export default function RichFormat({
  text,
  customColors,
  defaultColor,
  defaultColorMessage,
  quotationColor,
  setFullText
}: {
  text: string,
  customColors: IStoredColor[],
  defaultColor: string,
  defaultColorMessage: string,
  quotationColor: string,
  setFullText: (text: string) => void
}
): JSX.Element {

  let color = "";
  let lastColor = "";
  let acc = "";
  let raw_formattings = [];
  let formattings = [];
  const splits = [];

  // let mc_color = new Map(MINECRAFT_COLOR_CODE);
  // custom_colors.forEach((v) => {
  //   mc_color.set(v.name, v.color);
  // });

  let eoq = true;

  const re = /(&#[0-9a-fA-F]{6})|(&.)|(["])|(\s+)/gm;


  // split text into parts by the pattern
  const parts = customColors.reduce((acc, v) => {
    return acc.replaceAll(`@${v.name}`, `&${v.color}`);
  }, text).split(re);

  const items = []

  for (let i = 0; i < parts.length; i++) {
    let part = parts[i];



    if (part === undefined) {
      continue;
    }

    if (part.startsWith("&")) {
      part = part.trim();
      if (part.length === 2) {
        if (part[1] === "r") {
          color = "";

          formattings = [];
          raw_formattings = [];

          // if (eoq) {
          //   acc += `&r&${defaultColor}`;
          // } else {
          //   acc += `&r&${defaultColorMessage}`;
          // }

          acc += '&r';

          if (eoq) {
            acc += `&${defaultColor}`;
          } else {
            acc += `&${defaultColorMessage}`;
          }

        }

        let t = MINECRAFT_COLOR_CODE.get(part[1])
        if (t !== undefined) {
          color = t;
        }
        t = FORMATTING_CODE.get(part[1])
        if (t !== undefined) {
          formattings.push(t);
          raw_formattings.push(part[1]);
        }


      } else {
        color = part.substring(1);
      }

      acc += part;
    } else if (part.trim() === "" && part.length >= 1) {

      items.push(<div key={i} style={{
        paddingLeft: "0.2em",
      }}>{part}</div>);

      acc += " ";
    } else if (part === "\"") {
      eoq = !eoq;

      items.push(<div key={i} style={{
        color: quotationColor
      }}>{part}</div>);

      color = "";

      if (color === "") {
        if (quotationColor === "#ffffff") {
          acc += '&f';
        } else {
          acc += `&${quotationColor}`;
        }

      }

      acc += '\"';
    } else {
      const current_color = (color === "") ? (eoq ? defaultColor : defaultColorMessage) : color;

      const concat_classname = formattings.join(" ");

      if (lastColor !== current_color && color === "") {
        acc += `&${current_color}`;
      }

      lastColor = current_color;

      items.push(<div key={i} style={{
        color: current_color,
      }} className={concat_classname}>{part.trim()}</div>);

      acc += part;
    }

    if (acc.length >= 240 || i === parts.length - 1) {
      splits.push(acc);
      const current_color = (color === "") ? (eoq ? defaultColor : defaultColorMessage) : color;
      const concat_classname = raw_formattings.length ? raw_formattings.map((v) => `&${v}`).join(" ") : "";
      acc = `${concat_classname}&${current_color}`;
    }
  }

  acc = splits.join("|||");
  useEffect(() => {
    setFullText(acc);
  });

  return <span className="flex flex-row overflow-y-scroll flex-wrap" style={{
    gap: "0",
  }}>
    {items}
  </span>
}