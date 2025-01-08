"use client";
import { Button } from "@/components/ui/button";
import Navbar from "@/comps/navbar";
import { useEffect, useRef, useState } from "react";

function next(){
  const nextButton = document.querySelector("#next");
  if (nextButton) {
    (nextButton as HTMLElement).click();
  }
}


// function prev(){
//   const nextButton = document.querySelector("#next");
//   if (nextButton) {
//     (nextButton as HTMLElement).click();
//   }
// }


const StartContent = () => {
  return (
    <div className="main-content pl-20 pt-5">
      <span className="text-2xl font-bold">Improving Memory</span>
      <div className="pt-4 pr-10">
        A Number will be provided which you have to remember for long time which will help you to increase
        you long-term memory.

        The number will be genrated at random based on the constraints provided by you
      </div>
      <div className="py-20 w-full h-20 flex justify-center items-center">
        <Button className="w-40 h-16 text-2xl" variant="outline" onClick={() => {
          console.log("donw");

          next();
        }}>Start</Button>
      </div>
    </div>
  );
}

function generateRandomNumber(length: number): string {
  if (length <= 0) return '';

  const characters = '0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomChar = characters.charAt(Math.floor(Math.random() * characters.length));
    result += randomChar;
  }
  return result;
}

const Lab = () => {
  const minLength = 4;

  const [length, setLength] = useState(minLength);
  const lengthRef = useRef<HTMLInputElement>(null)
  const [Number, setNumber] = useState("0");

  useEffect(() => {
    setNumber(generateRandomNumber(length));
  }, [length])
  return (
    <>
      <div className="flex flex-col items-center justify-center rounded">
        <div className="flex flex-col justify-center items-center w-3/4 h-[200px] bg-gray-900 mt-10 rounded-xl">
          <span className="text-white  pb-5 text-xl">Output will be like:</span>
          <input type="text" className="w-[400px] h-[40px] outline-none rounded text-xl" value={Number} />

          <div className="flex flex-column gap-x-10">
            <input type="range" max="20" min={minLength} ref={lengthRef} value={length} onChange={() => {
              setLength(Number(lengthRef.current?.value) || minLength)
            }} /><label className="text-white">Length: {length}</label>
          </div>
          <Button className="mt-10 text-black hover:bg-black hover:text-white bg-white w-20 h-10" onClick={() => {
            window.localStorage.setItem("length", length.toString())

            next();
          }}>START!</Button>
        </div>
      </div>
    </>
  );
}

const Remember = () => {
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev: number): number => {
        if (prev > 1) {
          return prev - 1;
        } else {
          clearInterval(interval);
          return 0;
        }
      });
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (countdown == 0) {
      setTimeout(() => {
        const LENGTH_OF_RANDOM_NUMBER = Number(window.localStorage.getItem("length"));
        const GENRATED_RANDOM_NUMBER = Number(generateRandomNumber(LENGTH_OF_RANDOM_NUMBER));
        setCountdown(GENRATED_RANDOM_NUMBER);
        window.localStorage.setItem("RandINT", GENRATED_RANDOM_NUMBER)
        //also add date to local Storage to
        const date = new Date();
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        const formattedDate = `${day}:${hours}:${minutes}:${seconds}`;
        window.localStorage.setItem("current-date", formattedDate);

        //also clear random number

        const TIME_TAKEN_TO_REMEMBER = 5000; //5s
        setTimeout(() => {
          setCountdown("---");
          setTimeout(() => {
            const nextButton = document.querySelector("#next");
            if (nextButton) {
              (nextButton as HTMLElement).click();
            }
          }, 1000)
        }, TIME_TAKEN_TO_REMEMBER);


      })
    }
  }, [countdown])
  return (
    <>
      <div className="flex justify-center items-center w-full h-[500px]">
        <span className="text-4xl" id="number">{countdown}</span>
      </div>
    </>
  )
}

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState("Time");
  const REMEMBERING_TIME = window.localStorage.getItem("current-date"); // of format date:hours:minutes:seconds
  const pauseTimeRef = useRef("");
  const [pauseTime, setPauseTime] = useState(4);

  useEffect(() => {
    if (REMEMBERING_TIME) {
      const remTime_formated = REMEMBERING_TIME.split(":").map(Number);
      const pauseTime_formated = [0, pauseTime, 0, 0];
      let nextDay = false;
      const pauseTimeSec = pauseTime_formated[1] * 3600;
      const remTime_formatedSec = (remTime_formated[1] * 3600) + (remTime_formated[2] * 60) + remTime_formated[3];
      let FinalTime = pauseTimeSec + remTime_formatedSec;

      if (FinalTime > 86400) {
        FinalTime = FinalTime - 86400;
        remTime_formated[0] += 1;
        nextDay = true;
      }

      if (!nextDay) {
        const Finalhr = Math.floor(FinalTime / 3600);
        const Finalmin = Math.floor((FinalTime % 3600) / 60);
        const Finalsec = FinalTime % 60;
        setTimeLeft(`At ${Finalhr}:${Finalmin}:${Finalsec}`);
      } else {
        const Finalhr = Math.floor(FinalTime / 3600);
        const Finalmin = Math.floor((FinalTime % 3600) / 60);
        const Finalsec = FinalTime % 60;
        setTimeLeft(`At ${Finalhr}:${Finalmin}:${Finalsec} Next day`);
      }
    }
  }, [pauseTime, REMEMBERING_TIME, setTimeLeft]);

  return (
    <>
      <div className="justify-center items-center flex">
        <div className="mt-20 h-[250px] flex-col gap-y-10 w-1/2 rounded-3xl flex justify-center items-center bg-gray-800">
          <span className="text-white text-sm">Come after : {pauseTime}hrs</span>
          <span className="text-white text-2xl">{timeLeft}</span>
          <input type="range" min="1" max="24" ref={pauseTimeRef} value={pauseTime} onChange={() => {
            setPauseTime(pauseTimeRef.current.value);
          }} /> {/* Come After time much time */}
          <Button onClick={() => {
            window.localStorage.setItem("Endtime", timeLeft);
            next();
          }}>Next</Button>
        </div>
      </div>
    </>)
}

const InputRememberedNumber = () => {
  const numRef = useRef("");
  const [ans, setAns] = useState("");
  let endtime = localStorage.getItem("Endtime")?.replaceAll("At","");
  if (endtime?.includes("Next day")) {
    endtime.replace("Next day", "");
  }
  endtime = endtime?.split(":");
  endtime = [Number(endtime[0]), Number(endtime[1]), Number(endtime[2])];
  const date = new Date();
  // const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  console.log(endtime);
  console.log(hours, minutes, seconds);

  if (endtime[0] < hours || ((endtime[0]==hours)?((endtime[1]<minutes)?true:false):false)) {
  return (
    <div className="flex bg-gray-800 w-full h-[200px] mt-20 justify-center items-center gap-y-20">
      <input type="text" className="outline-none h-[30px] rounded pl-2" placeholder="Enter Number" ref={numRef} />
      <Button className="ml-[-5px]" onClick={() => {
        const RandINT = window.localStorage.getItem("RandINT");
        if (numRef.current.value == RandINT) {
          setAns("Correct");
          // clearing local stoage
          // localStorage.clear()//("Endtime");
          setTimeout(()=>{
            localStorage.clear()
          },2000)
          // localStorage.clear()//("RandINT");
          // localStorage.clear()//("current-date");
          // localStorage.clear()//("length");
          
        }
        else {
          setAns("Not correct");
        }
      }}>Validate</Button>
      <span className="text-white">{ans}</span>
    </div>
  )}
  else{
  return(
    <div className="flex justify-center w-full items center">
    <div className="flex flex-col bg-gray-800 w-1/2 h-[300px] mt-20 justify-center items-center gap-y-4 rounded-3xl">
      <span className="text-white text-3xl font-bold">
        Not Now
      </span>
      <span className="text-white">Come back at</span>
      <span className="text-white text-xl">{localStorage.getItem("Endtime")?.replace("At","")}</span>
    </div>
    </div>
);
  }
}

export default function Home() {
  const [content, setContent] = useState(<StartContent />);
  const [nextPage, setNextPage] = useState(0);

  function numToEnter(){
    if (localStorage.getItem("RandINT")){
      setContent(<InputRememberedNumber />)
    }
  }

  useEffect(() => {
    if (nextPage == 1) {
      setContent(<StartContent />)
    }
    if (nextPage == 2) {
      setContent(<Lab />)
    }
    if (nextPage == 3) {
      setContent(<Remember />)
    }
    if (nextPage == 4) {
      setContent(<Timer />)
    }
    if (nextPage == 5) {
      setContent(<InputRememberedNumber />)
    }
  }, [nextPage])
  //some more logic
  
  useEffect(()=>{
  numToEnter();
  },[])
  return (
    <>
      <Navbar />
      <div className="w-full hidden flex flex-column gap-x-3 justify-end pr-5 cursor-pointer">
        <div id="next" onClick={() => {
          if (nextPage < 5) {
            setNextPage(nextPage + 1);
          }
          console.log("next");
        }}>Next</div>

        <div id="prev" onClick={() => {
          if (nextPage > 1) {
            setNextPage(nextPage - 1);
          }
          console.log("prev");
        }}>Prev</div>
      </div>
      {content}
    </>
  );
}
