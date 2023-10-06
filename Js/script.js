document.getElementById("contactForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const email = document.getElementById("email").value;
  const telefono = document.getElementById("telefono").value;
  const motivo = document.getElementById("motivo").value;

  const formularioEnviadoExitosamente = true;

  if (formularioEnviadoExitosamente) {
    const params = {
      "nombre": nombre,
      "apellido": apellido,
      "email": email,
      "telefono": telefono,
      "motivo": motivo
    };

    const serviceID = "service_wdd956l";
    const templateID = "template_grazp1j";
    emailjs.init("6T_VK-gPutcLVgT2u");

    emailjs.send(serviceID, templateID, params)
      .then(res => {
        document.getElementById("nombre").value = "";
        document.getElementById("apellido").value = "";
        document.getElementById("email").value = "";
        document.getElementById("motivo").value = "";
        document.getElementById("telefono").value = "";
      })
      .catch(error => {
        console.log(error);
      });
  }

  const formulariosEnviados = JSON.parse(localStorage.getItem("formulariosEnviadosJson")) || [];
  formulariosEnviados.push({
    nombre: nombre,
    apellido: apellido,
    email: email,
    telefono: telefono,
    motivo: motivo
  });
  localStorage.setItem("formulariosEnviadosJson", JSON.stringify(formulariosEnviados));

  Swal.fire({
    title: '¡Alerta!',
    text: 'El formulario fue enviado correctamente, nos contactaremos contigo en breve.',
    icon: 'success',
    confirmButtonText: 'OK'
  });
});


let searchBtn = document.getElementById("search-btn");
let countryInp = document.getElementById("country-inp");
searchBtn.addEventListener("click", () => {
  let paisNombre = countryInp.value;
  let finalURL = `https://restcountries.com/v3.1/name/${paisNombre}?fullText=true`;
  console.log(finalURL);
  fetch(finalURL)
    .then((response) => response.json())
    .then((data) => {
      result.innerHTML = `
        <img src="${data[0].flags.svg}" class="flag-img">
        <h2>${data[0].name.common}</h2>
        <div class="wrapper">
            <div class="data-wrapper">
                <h4>Capital:</h4>
                <span>${data[0].capital[0]}</span>
            </div>
        </div>
        <div class="wrapper">
            <div class="data-wrapper">
                <h4>Continente:</h4>
                <span>${data[0].continents[0]}</span>
            </div>
        </div>
         <div class="wrapper">
            <div class="data-wrapper">
                <h4>Poblacion:</h4>
                <span>${data[0].population}</span>
            </div>
        </div>

      `;
    })
    .catch((error) => {
      if (error.status === 404) {
        result.innerHTML = `<h3>País no encontrado</h3>`;
      } else {
        result.innerHTML = `<p>Pais no encontrado,intente nuevamente<p>`;
      }
    });
});

