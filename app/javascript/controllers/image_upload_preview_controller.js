import { Controller } from "stimulus"

export default class extends Controller {
  static targets = ["imagePreview","fileInput", "cropContainer"]

  toggleImagePreview(event) {
    if (this.fileInputTarget.files) {
      let reader = new FileReader();
      reader.onload = e => {
        this.imagePreviewTarget.src = e.target.result;
      };
      reader.readAsDataURL(event.srcElement.files[0]);
      this.croppie = new Croppie(this.cropContainerTarget, {
        viewport: { width: 703, height: 128 },
        boundary: { width: 703, height: 128 },
        showZoomer: false,
      })
    }

  }
}
