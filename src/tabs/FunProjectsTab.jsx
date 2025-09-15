import React from "react";
import "./TabStyles.css";
    
    // pomodoro dog-themed app
    // an interactive skate shop website 
    // graphic programming and 3d stuff
    // game 
const projects = [
    {
        title: "Pomodoggo",
        description:
            `A dog-themed pomodoro app for dog lovers! Users can track their progress over time. 
            Reward mechanism to unlock more "study buddies" and playful UI yet user-friendly help boosting productivity and interest.
            Progress is visualized using charts to make it measurable. The app also has scheduling feature, which complements
            a productivity app. Users can do everythingin an app: planning to-dos, completing them with pomodoro, tracking progress.`,
        role: ["Full-stack Dev", "UI/UX Designer"],
        done: [
            "Design UI/UX",
            "Figma Prototype",
            "Frontend Developing",
            "Backend Developing",
        ],
        tech: ["React Native (Expo)", "TypeScript (Frontend)", "Java (Backend)", "Spring Boot", "PostgreSQL"],
        attachments: {
            link: {
            GitHub: "https://github.com/trnvanh/study-buddy",
            },
            media: {
            poster: "/media/pomodoggo/PomoDoggo.png",
            video: "/media/pomodoggo/demo.mp4",
            },
        },
    },
    {
        title: "SkyCast",
        description:
            `SkyCast is a modern, visually appealing weather application that provides real-time weather updates, forecasts, and personalized recommendations
             for users. The app is designed to help users stay prepared for daily weather conditions, with intuitive UI and interactive features. This is my 
             first practice app to learn Swift.`,
        role: ["Full-stack Dev", "UI/UX Designer"],
        done: [
            "Design UI/UX",
            "Frontend Developing",
            "Backend Developing",
        ],
        tech: ["Swift", "SwiftUI"],
        attachments: {
            link: {
            GitHub: "https://github.com/trnvanh/weather_app",
            },
            media: {
            gif: "/media/skycast/Weather.gif",
            },
        },
    },
]

export default function FunProjectsTab() { 

    return (
      <div className="tab-content">
        {projects.map((p, idx) => (
          <div key={idx} className="project-card">
            <h2>{p.title}</h2>
            <p>{p.description}</p>

            <h4>Roles:</h4>
            <ul>
              {p.role.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>

            <h4>What I have done:</h4>
            <ul>
              {p.done.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>

            <h4>Tech Stack:</h4>
            <ul className="tech-list">
              {p.tech.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>

            <div className="media-section">
              {p.attachments.media.poster && (
                <img
                  src={p.attachments.media.poster}
                  alt={`${p.title} poster`}
                  className="media-poster"
                />
              )}
              {p.attachments.media.video && (
                <video 
                  controls 
                  className="media-video"
                  width="100%"
                  src={p.attachments.media.video}
                />
              )}
              {p.attachments.media.gif && (
                <img
                  src={p.attachments.media.gif}
                  alt={`${p.title} gif`}
                  className="media-gif"
                />
              )}
            </div>

            <div className="links">
              {Object.entries(p.attachments.link).map(([name, url]) => (
                <a key={name} href={url} target="_blank" rel="noreferrer">
                  {name}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
}