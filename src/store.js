import { configureStore, createSlice } from '@reduxjs/toolkit'
import user from './store/userSlice.js'

// 상품
const cart = createSlice({
    name : 'cart',
    initialState : [
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1},
    ],
    reducers : {
        // 오늘의 숙제 1. + 버튼 누르면 수량이 +1 되는 기능
        addCount(state, action) {
            const index = state.findIndex((i) => i.id === action.payload.id);
            state[index].count ++
        },
        // 오늘의 숙제 2. 주문하기 버튼 누르면 장바구니에 상품추가하기.
        addItem(state, action) {
            // 응용2. 중복된 상품은 추가하지 않도록
            // 해당 id값이 현재 cart Data 검사
            const idCheck = state.find((i) => i.id === action.payload.id);
            if(idCheck) {
                alert('이미존재합니다!');
            }
            else {
                state.push(action.payload);
                alert('추가 완료하였습니다!');
            }
        },
        // 응용 1. - 버튼 누르면 수량이 -1 되는 기능
        minusCount(state, action) {
            const index = state.findIndex((i) => i.id === action.payload.id);
            state[index].count --
        },
    },
})

export const { addCount, addItem, minusCount } = cart.actions;

export default configureStore({
  reducer: {
    user : user.reducer,
    cart : cart.reducer
  }
}) 