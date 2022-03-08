let loop = true;

while (loop) {
  let input = prompt("?");

  switch (input) {
    case "exit":
    case "quit":
    case "q":
      loop = false;
      break;
    default:
      console.log(`thinking about ${input}`);

      try {
        let params = new URLSearchParams();
        params.append("appid", "J8JRRK-Q8953H39T8");
        params.append("output", "json");
        params.append("input", input);

        const url = `https://api.wolframalpha.com/v2/query?${params.toString()}`;
        const res = await fetch(url);
        const data = await res.json();

        data.queryresult.pods.map(pod => {
          const { title } = pod;
          pod.subpods.map(subpod => {
            const { plaintext } = subpod;
            if (plaintext && plaintext.length > 0)
              console.log(`${title}: ${subpod.plaintext}`);
          });
        });
      } catch (err) {
        console.log("hmmm...I don't know that one");
      }
  }
}
