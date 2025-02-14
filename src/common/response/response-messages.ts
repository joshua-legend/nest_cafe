export const ResponseMessages = {
  SUCCESS: {
    GET_OBJECT: (obj) => `해당 ${obj}를 가져왔습니다.`,
    CREATE_OBJECT: (obj) => `해당 ${obj}를 생성했습니다.`,
    UPDATE_OBJECT: (obj) => `해당 ${obj}를 업데이트 됐습니다`,
    DELETE_ID: (id) => `해당 ID:${id}를 삭제하였습니다.`,
  },
  FAIL: {
    NOT_DEFINED: '설정되지 않는 오류입니다.',
    NO_BODY: '요청 바디가 비어있습니다.',
    BAD_BODY: '요청 바디에 잘못된 키가 포함되어 있습니다.',
    EXISTS_ALREADY_NAME: '이미 존재하는 이름입니다.',
    EXIST_NO_ID: (id) => `해당 ID:${id}는 존재하지 않습니다.`,
    EXIST_NO_CATEGORY: '카테고리를 찾을 수 없습니다.',
    REFERENCE_ERROR: (a, b) => `해당 ${a}가 다른 ${b}에서 참조 중이므로 삭제할 수 없습니다.`,
  },
};
