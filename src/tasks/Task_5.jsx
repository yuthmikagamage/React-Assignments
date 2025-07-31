import React, { useEffect, useRef, useState, useCallback } from "react";

import "./Task_5.css";

function Task_5() {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [currentSection, setCurrentSection] = useState(0);

  const sections = [
    "Section 1",
    "Section 2",
    "Section 3",
    "Section 4",
    "Section 5",
    "Section 6",
    "Section 7",
    "Section 8",
    "Section 9",
    "Section 10",
  ];

  const handleScroll = useCallback(() => {
    const video = videoRef.current;
    const container = containerRef.current;

    if (!video || !container || !video.duration) return;

    const scrollTop = window.pageYOffset;
    const maxScroll = container.offsetHeight - window.innerHeight;
    const scrollProgress = Math.max(0, Math.min(scrollTop / maxScroll, 1));

    video.currentTime = scrollProgress * video.duration;

    const sectionIndex = Math.floor(scrollProgress * sections.length);
    setCurrentSection(Math.min(sectionIndex, sections.length - 1));
  }, [sections.length]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();

    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });

    handleScroll();

    return () => window.removeEventListener("scroll", throttledScroll);
  }, [handleScroll]);

  return (
    <div className="task5">
      <div ref={containerRef} className="scroll-video-container">
        <div className="video-background">
          <video ref={videoRef} className="background-video" muted playsInline>
            <source src="./scrollable-video.mp4" type="video/mp4" />
          </video>

          <div className="text-overlay">
            <h1 className="section-title">{sections[currentSection]}</h1>
          </div>
        </div>

        <div className="scroll-content">
          {sections.map((section, index) => (
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
