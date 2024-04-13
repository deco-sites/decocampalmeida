import { useEffect, useState } from "preact/hooks";
import Loading from "deco-sites/decocampalmeida/components/daisy/Loading.tsx";

export interface Props {
  celsius?: number;
}

function WeatherLocation({
  celsius
}: Props) {
  const [tempNow, setTempNow ] = useState<string | null>(null);

  const getWeather = async (): Promise<void> => {
    let latitude;
    let longitude;
    let isRj = false

    if ("geolocation" in navigator) {
      try {
        const position: GeolocationPosition = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
  
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
      } catch (error) {
        console.error("Erro ao obter a localização do usuário:", error);
        latitude = -22.9068;
        longitude = -43.1729;
        isRj = true;
      }
    } else {
      console.error("Geolocalização não é suportada pelo seu navegador.");
      latitude = -22.9068;
      longitude = -43.1729;
      isRj= true;
    }

    const weatherFor = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m`;
    const weatherResponse = await fetch(weatherFor);

    if (!weatherResponse.ok) {
      setTempNow(null);
      return;
    }

    const weather = await weatherResponse.json();
    setTempNow(`${weather.current.temperature_2m}°C ${isRj ? "no Rio de Janeiro" : "Perto de você"} `);
  };

  useEffect(() => {
    getWeather();
  }, []);
  

  return (
    <div className="flex justify-center flex-col content-center items-center py-10 text-lg">
     {tempNow !== null ? `${tempNow}` : <Loading style={"loading-dots"} size={"loading-md" }/>}
    </div>
  );
}

export default WeatherLocation;