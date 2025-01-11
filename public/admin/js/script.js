// upload image
const uploadImage = document.querySelector("[upload-image]");
if(uploadImage) {
  const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
  const uploadImagePreview = uploadImage.querySelector("[upload-image-preview]");

  uploadImageInput.addEventListener("change", () => {
    const file = uploadImageInput.files[0];
    if(file) {
      uploadImagePreview.src = URL.createObjectURL(file);
    }
  });
}
// end upload image

// upload audio
const uploadAudio = document.querySelector("[upload-audio]");
if (uploadAudio)
{
  const uploadAudioInput = uploadAudio.querySelector("[upload-audio-input]");
  const uploadAudioPlay = uploadAudio.querySelector("[upload-audio-play]");
  if (uploadAudioInput)
  {
    uploadAudioInput.addEventListener("change", ()=>
    {
      const file = uploadAudioInput.files[0];
      uploadAudioPlay.src = URL.createObjectURL(file);
    })
  }
}
// end upload audio