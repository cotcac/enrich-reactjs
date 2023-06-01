import { httpForMultipart, httpNoAuth } from "../helper/httpCommon";


const upload = (data) => {
    return httpForMultipart.post("/files/", data);
  };

const getAll = (page) => {
    return httpNoAuth.get("/files/?page=" + page);
};
const FilesService = {
    upload,
    getAll,
};

export default FilesService;