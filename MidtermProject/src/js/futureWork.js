//Fetching the data from the JSON file
document.addEventListener("DOMContentLoaded", function () {
    fetch("../assets/data.json")
        .then(response => response.json())
        .then(data => {
            //Store the elements in in the const
            const futureWorkContainer = document.getElementById("future-work-container");
            
            //Boostrap card
            //map function returns array of strings and join combines them into a single string
            futureWorkContainer.innerHTML = data.futureWork.map(item => `
                <div class="col-md-6">
                    <div class="card shadow-sm p-4" id="pop" style="border-radius: 15px">
                        <h4 class="fw-bold">${item.title}</h4>
                        <p class="text-muted">${item.description}</p>
                    </div>
                </div>
            `).join("");
        })
        .catch(error => console.error("Error loading future work data:", error));
});