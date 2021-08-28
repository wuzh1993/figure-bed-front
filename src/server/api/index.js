import instance from "../request";
export function login(data) {
  return instance({
    url: "/api/user/doLogin",
    method: "post",
    data,
  });
}

export function uploadImg(data) {
  return instance({
    url: "/api/img/uploadImg",
    method: "post",
    data,
    headers: {
      "Content-Type": "multipart/form-data ",
    },
  });
}

export function getImgList(data) {
  return instance({
    url: "/api/img/getImgList",
    method: "post",
    data,
  });
}

export function deleteImg(data) {
  return instance({
    url: "/api/img/deleteImg",
    method: "post",
    data,
  });
}

export function renameImg(data) {
  return instance({
    url: "/api/img/renameImg",
    method: "post",
    data,
  });
}

