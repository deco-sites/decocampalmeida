import { useEffect, useState } from "preact/hooks";
import Loading from "deco-sites/decocampalmeida/components/daisy/Loading.tsx";


function WeatherLocation() {
  const [tempNow, setTempNow] = useState<string | null>(null);

  const getWeather = async (): Promise<void> => {
    let latitude;
    let longitude;

    const weatherFor =
      `https://api.open-meteo.com/v1/forecast?latitude=-3.5806406&longitude=-57.7761488&current=temperature_2m`;
    const weatherResponse = await fetch(weatherFor);

    if (!weatherResponse.ok) {
      setTempNow(null);
      return;
    }

    const weather = await weatherResponse.json();
    setTempNow(`${weather.current.temperature_2m}°C`);
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <div className="flex justify-center flex-col content-center items-center py-10 text-lg">
      {tempNow !== null
        ? `${tempNow} no Prará nesse momento`
        : <Loading style={"loading-dots"} size={"loading-md"} />}
    </div>
  );
}

export default WeatherLocation;
