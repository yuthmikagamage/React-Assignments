import React, { useEffect, useRef, useState } from "react";
import "./Task_5.css";

function Task_5() {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [currentSection, setCurrentSection] = useState(0);

  const sections = [
    "Section #1",
    "Section #2",
    "Section #3",
    "Section #4",
    "Section #5",
    "Section #6",
    "Section #7",
    "Section #8",
    "Section #9",
    "Section #10",
  ];

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    video.pause();

    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const containerHeight = container.offsetHeight - window.innerHeight;
      const scrollProgress = Math.min(scrollTop / containerHeight, 1);

      if (video.duration) {
        video.currentTime = scrollProgress * video.duration;
      }

      const sectionIndex = Math.floor(scrollProgress * sections.length);
      setCurrentSection(Math.min(sectionIndex, sections.length - 1));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="task5">
      <div ref={containerRef} className="scroll-video-container">
        <div className="video-background">
          <video ref={videoRef} className="background-video" muted playsInline>
            <source src="src/assets/scrollable-video.mp4" type="video/mp4" />
          </video>
          <div className="text-overlay">
            <h1 className="section-title">{sections[currentSection]}</h1>
          </div>
        </div>

        <div className="scroll-content">
          {sections.map((_, index) => (
            <div
              key={index}
              className={`content-section ${
                index === currentSection ? "active" : ""
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Task_5;
