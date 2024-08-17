import { createSlice } from "@reduxjs/toolkit"

// useState 역할임.
// state 하나를 slice라고 부름.
const user = createSlice({
    name : 'user',          // state 이름
    // initialState : 'kim',   // 값
    initialState : { name : 'kim' , age : 20 },   // Object, Array 값
    reducers : {
        // 1. state 수정해주는 함수 생성
        changeName(state) { // state는 기존 state를 뜻함.
            // return 'john' + state
            // return { name : 'park' , age : 20 }   // Object, Array 값 변경
            state.name = 'park'                      // Object, Array 값 변경
        },
        increase(state, action) {
          state.age += action.payload
        },
    }    
})

// state 변경함수들 남음.
// 2. 만든 함수 export 해야함.
export const { changeName, increase } = user.actions

export default user