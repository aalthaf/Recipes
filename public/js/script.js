
// FOR GET
let xhrGET = new XMLHttpRequest()

xhrGET.open('GET', "/recipes", true)
xhrGET.setRequestHeader("Content-Type", "application/json")
//xhrGET.send(null)
//xmlhttp.onreadystatechange = myfunction;

xhrGET.onreadystatechange = () => {
    console.log(JSON.parse(xhrGET.responseText))
    if (xhrGET.readyState == 4 && xhrGET.readyState==200) {
        let ingredientDiv = document.getElementById('ingredientDIV')
        ingredientDiv.innerHTML = ''
        let response = JSON.parse(xhrGET.responseText)

        for (var key in response.recipes)
        ingredientDiv.innerHTML = ingredientDiv.innerHTML + `
        <figure>
        <a href="${response.recipes[key].source_url}">
        <img src = "${response.recipes[key].image_url}" width="410" height="340">
        <figcaption>${response.recipes[key].title}</figcaption>
        </a>
        </figure>
        `
    }

}



function getRecipe() {
    // uses post request
    let ingredientName = document.getElementById('ingredient').value
    if(ingredientName === '') {
        return alert('Please enter an ingredient')
    }

    let url = '/recipes'
    let ingredient_data = {
      ingredient : ingredientName
    }
    let ingredientDiv = document.getElementById('ingredientDIV')
    ingredientDiv.innerHTML = ''
	//console.log("hello");
    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let response = JSON.parse(xhr.responseText)
      for (var key in response.recipes)
 			ingredientDiv.innerHTML = ingredientDiv.innerHTML + `

      <figure>
      <a href="${response.recipes[key].source_url}">
      <img src = "${response.recipes[key].image_url}" width="410" height="340">
      <figcaption>${response.recipes[key].title}</figcaption>
      </a>
      </figure>
			`
        }
    }

      xhr.open('POST', url, true)
      xhr.setRequestHeader("Content-Type", "application/json")
      xhr.send(JSON.stringify(ingredient_data))
}



//Attach Enter-key Handler
const ENTER=13
document.getElementById("ingredient")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === ENTER) {
        document.getElementById("submit").click();
    }
});
