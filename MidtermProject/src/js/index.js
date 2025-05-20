//fetch the data from the JSON file
document.addEventListener("DOMContentLoaded", function () {
  fetch("../assets/data.json")
      .then(response => response.json())
      .then(data => {
        //store it in containers
          const featuresContainer = document.getElementById("popular-features-container");

          //Bootstrap css for the dynamic data
          //map function returns array of strings and join combines them into a single string
          featuresContainer.innerHTML = data.popularFeatures.map(feature => `
              <div class="col-md-4 px-3">
                  <div class="card shadow-sm text-center p-4 h-100 d-flex flex-column" id="pop">
                      <img src="${feature.image}" alt="${feature.title}" class="card-img-top-logo mx-auto d-block"/>
                      <div class="card-body d-flex flex-column justify-content-between">
                          <div>
                              <h5 class="card-title fs-4">${feature.title}</h5>
                              <p class="card-text fs-5">${feature.description}</p>
                              <br>
                          </div>
                          <a href="${feature.link}" class="btn btn-primary w-100 py-3 px-4 fs-5 mt-auto">View Details</a>
                      </div>
                  </div>
              </div>
          `).join("");
      })
      .catch(error => console.error("Error loading popular features:", error));
});
