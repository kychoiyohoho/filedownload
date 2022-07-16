# filedownload
# 스프레드 연산자
import { actionTypes } from "actions/contacts";

const initialState = {
    list: [{ name: "John Doe", phone: "500550512" }]
};

export default function contacts(state = initialState, action) {
    switch (action.type) {
        //새로운 데이터가 만들어 지는데, ...state 로 {state:list[{}]}상태이다,
        //action에서 contact 를 복제해서 contact 상위개념인 list 에 붙여넣기 한다. 
        //list 는 상위개념인 state에 붙여넣기 한다.
        case actionTypes.CREATE_CONTACT:
            return {
                ...state,
                list: [...state.list, { ...action.contact }]
            };

        case actionTypes.UPDATE_CONTACT:
       console.log("state",{state});
       // 스프레드 연산자로 복제를 하고 덮어씌우는 개념인데, {...state} 하면 {state:{list[]}} 로 된다.
       //그래서 list 를 만들어서 state 하위개념으로, 덮어씌운다.
            return {
                ...state,
                list: state.list.map((contact, index) =>
                    index === action.index ? { ...action.contact } : contact
                )
            };

        case actionTypes.DELETE_CONTACT:
            return {
                ...state,
                list: state.list.filter(
                    (contact, index) => index !== action.index
                )
            };

        default:
            return { ...state };
    }
}
