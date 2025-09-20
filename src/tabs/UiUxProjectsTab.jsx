export default function UiUxProjectsTab() {
    // HTI course project 
    // dashboard figma 
    // recipe app

    const projects = [
        {
            title: "The 3R Project",
            description:
                `A Web-Based Platform for reducing plastic use and promoting sustainable practices among university students. 
                This is the project in the scope of course HTI.100 User Interfaces and Human-Centred Design of professor Jari Varsaluoma at Tampere University, 
                which is one of the best courses I have taken. The team was 3 students: me, My, and Sang. We conducted user research, interviewed participants; 
                defined context of use, users and built personas; defined user tasks, goals and usability goals; moved on to concept map, conceptual design, made 
                user scenarios with story boards; designed wireframes, low-fi prototype, then hi-fi and interactive prototype using Figma. We wrote a report of 51 pages 
                to describe workflow, schedule, and explain everything that we did, why and how we made decisions. I learned so much from doing this project!`,
            role: ["UI/UX designer and researcher"],
            done: [
                "Designed Wireframes",
                "Figma Prototyping (both Low-Fi and High-Fi)",
                "User Research (interview, collect and study data)",
                "Affinity Diagram for Qualitative Research",
            ],
            tech: ["Figma", "Miro Board", "Trello"],
            attachments: {
                link: {
                Notes: "https://www.figma.com/board/zJaszarTFT5PNmYQicpv0X/User-Interview-Notes---Affinity-Diagram-Template--Community-?node-id=0-1&t=hv8oitO0UXJ0VjTY-1",
                Figma: "https://www.figma.com/design/550fP4fhosVlC7E0hXoF8y/Template?node-id=0-1&t=ZNwMAbuUSzsllB5E-1",
                Report: "https://tuni-my.sharepoint.com/:b:/g/personal/anh_v_tran_tuni_fi/EeXJ8eKnEopDgCzJ8daMzu8Bjf0Iitv5neeBW-a_rwT3Fg?e=USLnpE"
                },
                media: {
                poster: "/media/3Rproject/3Rproject.jpeg",
                gif: "/media/3Rproject/frames.gif",
                },
            },
        },
        {
            title: "RecipeNest",
            description:
                "An app for finding/sharing food recipes and help cooking easier, from planning the shopping, to finding a suitable recipe. This is a prototype for the project in the course Software Product and Process Management.",
            role: ["UI/UX designer"],
            done: [
                "Designed Wireframes",
                "Figma Prototyping",
            ],
            tech: ["Figma"],
            attachments: {
                link: {
                Figma: "https://www.figma.com/design/LcbZQC1XjUOfj4o3nVXqNA/Recipe-App?node-id=72-822&t=ZNwMAbuUSzsllB5E-1",
                },
                media: {
                video: "/media/recipenest/recipenest.mp4",
                },
            },
        },
        {
          title: "Paravolt",
          description:
              `Paravolt is a mobile app concept that makes EV charging effortless. 
              It helps drivers find, book, and pay for charging stations while reducing range anxiety through real-time availability updates, route planning, and cost transparency. 
              The app also syncs with the car to provide energy usage statistics, expense tracking, and eco-impact insights—turning EV ownership into a seamless and stress-free experience.`,
          role: ["UI/UX Researcher", "UI/UX Designer"],
          done: [
              "Design low-fi wireframes and hi-fi prototype UI/UX with Figma",
              "Market research",
              "Persona",
          ],
          tech: ["Figma", "Canva"],
          attachments: {
              link: {
              Figma: "https://www.figma.com/design/dzV0ocoas08ebta8KkJdg8/PARAVOLT?node-id=0-1&t=3zMRSk2J5BGikZN0-1",
              Report: "https://tuni-my.sharepoint.com/:w:/g/personal/anh_v_tran_tuni_fi/Edtsut4j7wZImvHeA4bhRsgBdqoqyJiDMhrq1Y-TZ9ob1w?e=zTzcEf"
              },
              media: {
              gif: "/media/skycast/Paravolt.gif",
              },
          },
        },
        {
          title: "Skycast",
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
