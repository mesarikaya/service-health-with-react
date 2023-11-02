import { sanitizeUrl } from "@braintree/sanitize-url";
import AttachmentFile from "../../redux/types/data/attachment";

export const downloadFile = (response, file: AttachmentFile) => {
    const url = window.URL.createObjectURL(response.data);
    const link = document.createElement("a");
    const sanitizedURL = sanitizeUrl(url);
    link.href = sanitizedURL;
    link.setAttribute(
        "download",
        file?.fileName
    );
    document.body.appendChild(link);
    link.click();
    
    // Clean up and remove the link
    document.body.removeChild(link);
}