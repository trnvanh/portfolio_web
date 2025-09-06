import React from "react";
import "./TabStyles.css";


// Projects: sustainable project, software design project, software testing project, 
// advanced web dev backend, software process and project management 
    
const projects = [
    {
      title: "HeroEats - Food Rescue App",
      description:
        "A sustainability-focused mobile application for reducing food waste by connecting restaurants with users. This is the final peoject when I took the course Sustainable Software Engineering.",
      role: ["UI/UX designer", "Frontend Dev"],
      done: [
        "Design UI/UX",
        "Figma Prototype",
        "Frontend Developing",
        "Poster and Report",
      ],
      tech: ["React Native (Expo)", "Spring Boot", "PostgreSQL"],
      attachments: {
        link: {
          GitHub: "https://github.com/trnvanh/sustainable_project",
          Figma: "https://www.figma.com/design/iPu56fBq3jo1MuHHMrtSqc/Sustainable-app?node-id=11-15&t=ZNwMAbuUSzsllB5E-1"
        },
        media: {
          poster: "/media/heroeats/heroeatpost.jpg",
          video: "/media/heroeats/HeroEats.mp4",
          gif: "",
        },
      },
    },
    {
      title: "AeroSky - Weather and Air Quality Personalized Forecast App",
      description:
        "A Java-based application developed as part of a Software Design course project. This app fetches and displays weather and air quality data for user-specified cities. Users can also save their favorite cities for quick access. Data is visualized in interactive graphs, and near forecast data is displayed as cards.",
      role: ["UI/UX designer", "Full Stack dev"],
      done: [
        "Design GUI",
        "Figma Prototype",
        "Simple Frontend with JavaFXML",
        "API and Backend Developing",
        "Learn and Practice Common Java Design Patterns and Principles such as Singleton, Facade, Single Responsibility Priciple, Dependency Injection, SOLID, Builder Pattern, MVC."
      ],
      tech: ["Java SDK 17", "JavaFXML", "Spring Boot", "Docker", "PostgreSQL"],
      attachments: {
        link: {
          GitLab: "https://course-gitlab.tuni.fi/compse110-fall2024/kirsi-group",
        },
        media: {
          video: "/media/aerosky/softwaredesign.mp4",
        },
      },
    },
    {
      title: "Testing an E-commerce store application",
      description:
        "This is the final project of the course Software Testing. The group consists of 2 students: me and Lassi. We wrote test plan, and implemented it to test a JavaScript utility library, which is used for an E-commerce application. Finally, we wrote a test report and hosted a CI pipeline on GitHub.",
      role: ["Testing Engineer"],
      done: ["Wrote unit tests using Jest test framework", "Risk assessment", "Made UML diagrams for end-to-end scenarios", "Set up CI pipeline on GitHub"],
      tech: ["JavaScript", "Node.js", "CI pipeline on GitHub"],
      attachments: {
        link: {
          GitHub: "https://github.com/lassirissanen/COMP.SE.200-2024-2025-1",
        },
        media: {
          poster: "",
          video: "",
          gif: "",
        },
      },
    },
    {
      title: "Real-time interaction system for live-streaming platforms",
      description:
        "This is the project of the course Advanced Web Dev - Backend. The team consists of 3 students: me, Tuan and Duy. The aim is to implement the backend of the real-time reaction service using web socket and 2 servers connected to a message broker (Kafka). Additionally, a simple responsive frontend was built to display user interaction with the built system. This system enhances viewer engagement by allowing real-time reactions (during sports events or concerts). It also helps broadcasters identify key moments automatically.",
      role: ["Full stack dev"],
      done: ["Developed UI", "Wrote Dockerfile", "Connected frontend to server's REST API", "Practiced implementing WebSocket to communicate between UI and Kafka"],
      tech: ["GitLab", "Docker", "REST API", "Kafka", "React Vite TS", "Node.js"],
      attachments: {
        link: {
          GitLab: "https://course-gitlab.tuni.fi/compcs510-spring2025/code4fun",
        },
        media: {
          poster: "",
          video: "/media/webbackend/reacting.mp4",
          gif: "",
        },
      },
    },
];

export default function SchoolProjectsTab() {
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