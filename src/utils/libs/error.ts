interface errMessageObjectType {
  readonly [key: string]: string;
}

const errMessageObject: errMessageObjectType = {
  "Request failed with status code 400": "잘못된 요청입니다.",
  "Request failed with status code 401": "권한이 없습니다.",
  "Request failed with status code 403": "접근이 금지되었습니다.",
  "Request failed with status code 404": "리소스를 찾을수 없습니다.",
  "Request failed with status code 405": "허용되지 않은 메서드입니다.",
  "Request failed with status code 429": "요청한도가 초과되었습니다.",
  "Request failed with status code 500": "서버 오류입니다.",
  "Request failed with status code 502": "잘못된 게이트웨이입니다.",
  "Request failed with status code 503": "서비스를 사용할 수 없습니다.",
  "Request failed with status code 504": "요청 시간이 초과되었습니다.",
};

const errHandler: Function = (err: Error) => {
  try {
    alert(errMessageObject[err.message] || err.message);
  } catch (e) {
    alert("알 수 없는 에러가 발생하였습니다." + err.message);
  }
};

export default errHandler;
