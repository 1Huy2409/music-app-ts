tinymce.init({
  selector: 'textarea[textarea-mce]',
  plugins: "lists link image table code help wordcount",
  image_title: true,
  automatic_uploads: true,
  file_picker_types: "image",
  images_upload_url: "/admin/upload", // insert image by tinymce => run through route /admin/upload
});
