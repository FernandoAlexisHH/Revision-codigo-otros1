const baseEndpoint = "https://api.github.com";
const usersEndpoint = `${baseEndpoint}/users`;

// Coloque nombres de variables más descriptivos
const $name = document.querySelector(".name"); // Usando "." para seleccionar por clase
const $blog = document.querySelector(".blog");
const $location = document.querySelector(".location");
const $imagenAvatar = document.querySelector(".avatar");
const $seguidores = document.querySelector(".seguidores");

function handleError(err) {
  console.log("OH NO!");
  console.log(err);
  $name.textContent = `${err}`;
}

// Agregue async porque es una función asincrónica
async function displayUser(username) {
  //Utilice un try catch para manejar los errores ante una posible excepción del servidor
  try {
    $name.textContent = "cargando...";
    const response = await fetch(`${usersEndpoint}/${username}`);

    if (!response.ok) {
      throw new Error(`Error ${response.status}: Usuario no encontrado`);
    }
    const usuario = await response.json(); // Convertir la respuesta en objeto JSON

    console.log(usuario);

    // Verificar si existen los valores antes de asignarlos
    $name.textContent = usuario.name || "No disponible";
    $blog.textContent = usuario.blog || "No disponible";
    $location.textContent = usuario.location || "No disponible";
    $imagenAvatar.src = usuario.avatar_url || "#";
    $seguidores.textContent =
      `Seguidores: ${usuario.followers}` || "No tengo seguidores";
  } catch (err) {
    handleError(
      err
    ); /*Utilice una funcion aparte para dividir responsabilidades*/
  }
}

// Llamada a la función con manejo de errores
displayUser("stolinski");
