import { useEffect, useState } from "react";
import { onSnapshot } from "mobx-state-tree";
import reactLogo from "./assets/react.svg";
import "./App.css";
import axios from "axios";

import { useQuery } from "react-query";

import TwitterStore from "./store";

const tss: any = TwitterStore.create({});

// Listen to new snapshots, which are created anytime something changes
onSnapshot(tss, (snapshot) => {
  console.log(snapshot);
});

// create your new Twitter store instance with some initial data
//@ts-ignore
function App() {
  const [count, setCount] = useState(0);

  // useEffect(() => {
  //   tss.getAllTwets();
  // });

  const resp = useQuery("random", () => tss.getAllTwets());
  // const data = resp?.data?.data?.data || [];

  // console.log("resp", resp);
  // console.log("---- ta", tss.tweets.toJSON());
  // const resp = {
  //   status: true,
  //   isSuccess: true,
  // };
  return (
    <div className="App">
      <div style={{ height: "900px" }}>
        App is running and running
        <h2>{resp.status}</h2>
        {resp.isSuccess && (
          <ul>
            {tss.tweets.map((item: any) => {
              return <li key={item.id}>{item.title}</li>;
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
