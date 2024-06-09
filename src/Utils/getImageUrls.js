export async function getImageUrls(file, files) {
  const formData = new FormData();
  formData.append("image", file);
  for (let i = 0; i < files.length; i++) {
    formData.append("imagesArray", files[i]);
  }
  //Mando los archivos de imagen al back para que me devuelva urls
  const response = await fetch("/api/uploadCloudinary", {
    method: "POST",
    body: formData
  });
  if (response.ok) {
    const urls = await response.json();
    return urls
  } else {
    console.log("Oops! ", response.statusText);
  }
}
