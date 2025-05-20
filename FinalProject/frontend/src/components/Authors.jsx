import React, { useEffect, useState } from "react";

const images = import.meta.glob('../assets/images/**/*.{jpg,jpeg,png}', { eager: true });

const Authors = () => {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/team")
      .then((res) => res.json())
      .then((data) => setTeam(data))
      .catch((err) => console.error("Error loading team:", err));
  }, []);

  return (
    //html for the authors section with data pulled from the db
    <section id="authors" className="section-padding" style={{ backgroundColor: "#D6A184" }}>
      <div className="container">
        <div className="text-center mb-5">
          <h2>Meet the Authors</h2>
          <p>Construction of User Interfaces, Spring 2025</p>
          <p>4/28/2025</p>
        </div>
        <div className="row justify-content-center g-4">
          {team.map((member, idx) => (
            <div className="col-md-6 text-center" key={idx}>
              <div className="card shadow-sm p-4" id="pop" style={{ borderRadius: "15px" }}>
                <img
                  className="img-fluid rounded-circle mb-3"
                  src={images[member.image]?.default || ""}
                  alt={member.name}
                />
                <h3 className="fw-bold">{member.name}</h3>
                <p className="mb-2">{member.role}</p>
                <div className="d-flex justify-content-center gap-3">
                  <a href={`mailto:${member.email}`} className="btn btn-outline-dark btn-sm">
                    Email
                  </a>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-dark btn-sm"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Authors;
