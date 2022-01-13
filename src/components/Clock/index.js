import React, { useState, useEffect } from 'react';
import './clock.scss';

function Clock() {
  // Clock utilise un hook décentralisé du Redux Store pour éviter
  // de polluer le ReduxDevTools avant une action s'activant une fois par seconde.
  const [time, setTime] = useState(new Date());
  // Fonction de mise à jour du temps.
  const updateTime = () => setTime(new Date());
  // On lance la mise à jour du temps à chaque seconde.
  // On retire le setInterval à l'unmount pour éviter une fuite de mémoire.
  useEffect(() => {
    const timer = setInterval(updateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  // On extraie le temps depuis new Date() et on le formate.
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  return (
    <div className="clock">
      {(hours < 10 ? `0${hours}` : hours)}
      :
      {(minutes < 10 ? `0${minutes}` : minutes)}
      :
      {(seconds < 10 ? `0${seconds}` : seconds)}
    </div>
  );
}

export default Clock;
