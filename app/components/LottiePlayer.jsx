"use client";
import { Player } from "@lottiefiles/react-lottie-player";

const LottiePlayer = () => {
  return (
    <Player
      autoplay
      loop
      src="https://assets4.lottiefiles.com/packages/lf20_x62chJ.json"
      style={{ height: "400px", width: "400px" }}
    />
  );
};

export default LottiePlayer;
