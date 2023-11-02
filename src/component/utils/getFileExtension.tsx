


export const getFileExtension = (fileName: String) => {
    return fileName.substring(fileName.lastIndexOf('.')+1, fileName.length).toUpperCase() || '';
}