import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import useful_string from "./useful_string";
// import Parser from "rss-parser";

// let rssparser = require("rss-parser");

function App() {
  // let parser = new Parser();

  const [feed, setFeed] = useState(null);
  useEffect(() => {
    let f = async () => {
      let xml_string;
      xml_string = useful_string;

      // !!! USE WEB VERSION
      // Enable demo on https://cors-anywhere.herokuapp.com/corsdemo and then uncomment code below to fetch data from web

      // xml_string = await (
      //   await fetch(
      //     "https://cors-anywhere.herokuapp.com/https://www.finam.ru/analysis/nslent/rsspoint/"
      //   )
      // ).text();

      // console.log(xml_string);
      let parser = new DOMParser();
      let xml = parser.parseFromString(xml_string, "text/xml");
      // console.log(xml.documentElement.textContent);
      // console.log(xml.getElementsByTagName("item"));
      let newslist = xml.getElementsByTagName("item");
      let list = [];
      // newslist.forEach((element) => {
      for (let element of newslist) {
        let j = {
          // link: element.children[0].innerHTML,
          link: element.querySelector("link").textContent,
          author: element.querySelector("author").textContent,
          title: element.querySelector("title").textContent,
          description: element.querySelector("description").textContent,
          pubdate: element.querySelector("pubDate").textContent,
        };
        list.push(j);
      }
      // });
      setFeed(list);
    };
    f();
  }, []);

  useEffect(() => {
    if (!feed) {
      return;
    }
    for (let index = 0; index < feed.length; index++) {
      const element = feed[index];
      document.getElementById("news" + index).innerHTML = element.description;
    }
  }, [feed]);

  return !feed ? null : (
    <div>
      <h1>Последние финансовые новости</h1>
      {feed.map((news, id) => (
        <div>
          <h2>{news.title}</h2>
          <p>{news.pubdate}</p>
          <cite>{news.author}</cite>
          <details id={"news" + id}></details>
          <a href={news.link}>Открыть новость</a>
          <hr />
          {/* {(document.getElementById("news" + id).innerHTML = news.description)} */}
        </div>
      ))}
    </div>
  );
}

export default App;
