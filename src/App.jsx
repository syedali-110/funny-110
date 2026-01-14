import { useEffect, useState, useRef } from "react";
import Question from "./components/Question";
import FinalYes from "./components/FinalYes";

export default function App() {
  const [step, setStep] = useState(0);
  const noHoverCountRef = useRef(0); // 🔥 persists across steps

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://tenor.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
  }, [step]);

  if (step === 4) return <FinalYes />;

  const steps = [
    {
      gif: "22885016",
      title: "Do you love me? 🤗",
      subtitle: "I'm all yours",
    },
    {
      gif: "22050818",
      title: "Please think again! 🙄",
      subtitle: "itni jaldi na matt bolo😥",
    },
    {
      gif: "15195810",
      title: "Ek aur baar Soch lo! 😣",
      subtitle: "kyu aisa kar rahi ho Pls Maan jao😣",
    },
    {
      gif: "15974530976611222074",
      title: "beautiful pls Man jao na! Kitna code likh waogi😭",
      subtitle:
        "bhut glt baat hai yrr😭 ek br Yes button pr bhi ja kr dekh lo chahe click mt krna, No pr hi kr lena click",
      runaway: true,
    },
  ];

  const current = steps[step];

  return (
    <Question
      gifId={current.gif}
      title={current.title}
      subtitle={current.subtitle}
      runaway={current.runaway}
      noHoverCountRef={noHoverCountRef}
      yesAction={() => setStep(4)}
      noAction={() => setStep(step + 1)}
    />
  );
}
