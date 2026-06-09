import bg1 from "../imagenes/background-images/1.jpg";
import bg2 from "../imagenes/background-images/2.jpg";
import bg3 from "../imagenes/background-images/3.jpg";
import bg4 from "../imagenes/background-images/4.jpg";
import bg5 from "../imagenes/background-images/5.jpg";
import bg6 from "../imagenes/background-images/6.jpg";

const backgrounds = [bg1, bg2, bg3, bg4, bg5, bg6];
const IMAGE_DURATION = 6;
const TOTAL_DURATION = backgrounds.length * IMAGE_DURATION;

function BackgroundSlider() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-black/30 pointer-events-none" />
      {backgrounds.map((image, index) => (
        <div
          key={index}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat filter brightness-[0.5] saturate-90 opacity-0 animate-fadeSlide pointer-events-none"
          style={{
            backgroundImage: `url(${image})`,
            animationDuration: `${TOTAL_DURATION}s`,
            animationDelay: `${index * IMAGE_DURATION}s`,
          }}
        />
      ))}
    </div>
  );
}

export default BackgroundSlider;
