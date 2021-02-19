import { Controller } from "stimulus"

import { DirectUpload } from "@rails/activestorage"

export default class extends Controller {
  static targets = ["fileInput", "cropContainer"]
  connect() {
    this.croppie = new Croppie(this.cropContainerTarget, {
      enableExif: true,
      viewport: { width: 703, height: 128 },
      boundary: { width: 703, height: 128 },
    })
  }

  saveCrop(event) {
    event.preventDefault()
    this.croppie.result().then((result) => {
      this.uploadFile(result)
    })
  }

  uploadFile(file) {
    console.log("initiated Uploading")
    // your form needs the file_field direct_upload: true, which
    //  provides data-direct-upload-url
    this.fileInputTarget.value = null;
    const url = this.fileInputTarget.dataset.directUploadUrl
    this.upload = new DirectUpload(file, url)
    this.upload.create((error, blob) => {
      debugger;
      console.log("CREATING")
      if (error) {
        console.log("There was an error")
        console.log(error)
        // Handle the error
      } else {
        console.log("Direct Uploaded")
        // Add an appropriately-named hidden input to the form with a
        //  value of blob.signed_id so that the blob ids will be
        //  transmitted in the normal upload flow
        const hiddenField = document.createElement('input')
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("value", blob.signed_id);
        hiddenField.name = this.fileInputTarget.name;
        document.querySelector('form').appendChild(hiddenField)
      }
    })
  }

  toggleImagePreview(event) {
    if (this.fileInputTarget.files) {
      let reader = new FileReader();
      reader.onload = e => {
        this.croppie.bind({
          url: e.target.result
        })
      };
      reader.readAsDataURL(event.srcElement.files[0]);
    }

  }
}
