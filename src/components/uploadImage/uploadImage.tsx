const uploadImageToCloudinary = async (data: FormData) => {
  const cloud_name = "dmiqarwcb";
  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloud_name}/upload`,
      {
        method: "POST",
        body: data,
      }
    );

    if (!response.ok) {
      console.log("Error al subir el archivo");
    }

    const file = await response.json();
    return file.secure_url;
  } catch (e: any) {
    console.error(e);
  }
};

const UploadImage = async (image: File) => {
  const preset_name = "pokemon_preset";

  const files = image;
  const data = new FormData();
  data.append("file", files);
  data.append("upload_preset", preset_name);

  const cloud = await uploadImageToCloudinary(data);

  return cloud;
};

export default UploadImage;
