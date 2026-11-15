import {useEffect, useState} from "react";

import Documentation from "../components/footer/Documentation.tsx";
import Connect from "../components/footer/Connect.tsx";
import InfoBox from "../components/infoBox/InfoBox.tsx";
import Button from "../components/ui/Button.tsx";
import Card from "../components/ui/Card.tsx";
import AppList from "../components/apps/AppList.tsx";

import {boxesHomeData} from "../data/BoxesHome.ts";
import {appsData} from "../data/AppsData.ts";
import {BackendConfig} from "../components/config/BackendConfig.ts";


export default function Home() {
  
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("");
  const [callingBacking, setcallingBacking] = useState(false);
  
  useEffect(() => {
    document.title = "Beo Base | Home";
  }, []);
  
  const callBackend = async () => {
    try {
      setcallingBacking(true);
      const response = await fetch(`${BackendConfig.springApiUrl}/test/test`);
      const data = await response.text()
      
      setMessage(data)
    } catch (error) {
      setMessage("Backend connection failed")
      console.error(error)
    } finally {
      setcallingBacking(false);
    }
  }
  
  return (
    <>
      <AppList apps={appsData} />
      
      {boxesHomeData.map((box, index) => (
        <InfoBox
          key={index}
          title={box.title}
          buttons={box.buttons}
        />
      ))}
      
      <Card>
        <div className="flex flex-1 flex-col place-content-center place-items-center gap-6.25 max-lg:gap-4.5 max-lg:px-5 max-lg:pt-8 max-lg:pb-6">
          <Button
            type="button"
            onClick={() => setCount((count) => count + 1)}
          >
            Count is {count}
          </Button>
          
          <div>
            <Button
              type="button"
              onClick={callBackend}
              disabled={callingBacking}
            >
              {callingBacking ? "Loading..." : "Call Spring"}
            </Button>
            
            {/* Backend Response */}
            <p className="text-stone-100">
              {message}
            </p>
          </div>
        </div>
      </Card>
      
      <section className="mx-auto pb-4 mt-12 grid max-w-6xl gap-6 px-6 md:grid-cols-2">
        <Documentation />
        <Connect />
      </section>
    </>
  );
}