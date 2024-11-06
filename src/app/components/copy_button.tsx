import { Button } from "@mui/material";
import { useState } from "react";

export default function CopyButton(props: { text: string }): JSX.Element {
  let { text } = props;

  const re_spaces = /\s+/gm;
  const [lastCopied, setLastCopied] = useState(0);

  text = text.replaceAll(re_spaces, " ");

  const splits = [...(text + " ").split('|||')];

  //console.log(splits)


  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-2">
        {splits !== undefined ? splits.map((_, index) => (
          <button
            key={index}
            className="h-9 w-9 border-white border self-center flex items-center justify-center rounded-md"
            onClick={() => {
              navigator.clipboard.writeText(splits[index]);
              setLastCopied(index);
            }}
            style={{
              backgroundColor: index == lastCopied ? "#119090" : "#d1a22a85"
            }}
          >
            {index + 1}
          </button>
        )) : <></>}
      </div>
      <div>
        <div className="text-sm">Connected from our mod?</div>
        <div className="text-sm">Use our auto-send here!</div>
        <Button onClick={
          () => {
            fetch("http://localhost:8000/api", {
              method: "POST",
              body: text,
            })
          }
        }>Auto-send</Button>
      </div>
    </div>
  );
}

