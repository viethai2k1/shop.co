export default class CloudinaryService {
    static upload = async (image) => {
      const formData = new FormData();
      formData.append("upload_preset", "ml_default");
      formData.append("file", image);
  
      return await fetch(
        "https://api.cloudinary.com/v1_1/dm9uyoivn/image/upload",
        {
          method: "POST",
          body: formData,
        }
      ).then((res) => res.json());
    };
  }
  