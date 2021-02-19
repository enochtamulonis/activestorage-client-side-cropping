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


  uploadImageToCrop(event) {
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

  saveCrop(event) {
    event.preventDefault()
    this.croppie.result().then((result) => {
      let blob = this.dataURLtoBlob(result)
      let file = new File( [blob], 'croppedImg.jpg', { type: 'image/jpeg' } )
      console.log(file)
      this.directUploadFile(file)
    })
  }

  directUploadFile(file) {
    console.log("initiated Uploading")
    // your form needs the file_field direct_upload: true, which
    //  provides data-direct-upload-url
    this.fileInputTarget.value = null;
    const url = this.fileInputTarget.dataset.directUploadUrl

    this.upload = new DirectUpload(file, url)
    console.log(this.upload);
    this.upload.create((error, blob) => {
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

  dataURLtoBlob(dataURI) {
      // convert base64 to raw binary data held in a string
      var byteString = atob(dataURI.split(',')[1]);

      // separate out the mime component
      var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

      // write the bytes of the string to an ArrayBuffer
      var arrayBuffer = new ArrayBuffer(byteString.length);
      var _ia = new Uint8Array(arrayBuffer);
      for (var i = 0; i < byteString.length; i++) {
          _ia[i] = byteString.charCodeAt(i);
      }

      var dataView = new DataView(arrayBuffer);
      var blob = new Blob([dataView], { type: mimeString });
      return blob;
  }
}
