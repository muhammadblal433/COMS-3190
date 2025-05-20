document.addEventListener("DOMContentLoaded", function () {
    //Fetching the data from the JSON file
    fetch("../assets/data.json")
        .then(response => response.json())
        .then(data => {
            const teamContainer = document.getElementById("teamContainer");
            //Only use the team

            //map function returns array of strings and join combines them into a single string
            teamContainer.innerHTML = data.team.map(member => `
                <div class="col-md-6 text-center">
                    <div class="card shadow-sm p-4" id="pop" style="border-radius: 15px">
                        <img class="img-fluid rounded-circle mb-3" src="${member.image}" alt="${member.name}">
                        <h3 class="fw-bold">${member.name}</h3>
                        <p class="mb-2">${member.role}</p>
                        <div class="d-flex justify-content-center gap-3">
                            <a href="mailto:${member.email}" class="btn btn-outline-dark btn-sm">
                                <i class="fas fa-envelope"></i> Email
                            </a>
                            <a href="${member.linkedin}" target="_blank" class="btn btn-outline-dark btn-sm">
                                <i class="fab fa-linkedin"></i> LinkedIn
                            </a>
                        </div>
                    </div>
                </div>
            `).join("");
        })
        .catch(error => console.error("Error loading team data:", error));
});
