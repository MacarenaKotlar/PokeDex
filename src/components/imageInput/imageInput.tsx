import { IPokemon } from "../../mock";

function inputImage(
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  pokemon: IPokemon,
  location: any
) {
  const imageInput = document.getElementById("imageInput") as HTMLInputElement;
  const imagePreview = document.getElementById("imagePreview");

  function getImgData() {
    if (imageInput.files) {
      const files = imageInput.files[0];
      if (files && imagePreview) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(files);
        fileReader.addEventListener("load", function () {
          imagePreview.style.display = "block";
          imagePreview.innerHTML = `<img src="${this.result}" />`;
        });
      }
    }
  }

  if (imageInput) {
    imageInput.onchange = () => {
      getImgData();
    };
  }
  return (
    <>
      <div id="imagePreview">
        {location.pathname.includes("edit") && <img src={pokemon.img} />}
      </div>
      <input type="file" accept="image/*" id="imageInput" onChange={onChange} />
      <label htmlFor="imageInput">Seleccione una Imagen</label>
    </>
  );
}

export default inputImage;
