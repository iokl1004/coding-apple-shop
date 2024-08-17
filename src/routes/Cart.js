import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeName, increase } from "./../store/userSlice.js";
import { addCount, minusCount } from "../store.js";
import { memo, useMemo, useState } from "react";

// memo? 이 컴포넌트는요 꼭 필요할때 재렌더링 해주세요
let Child = memo( function() {
    console.log('재렌더링됨')
    return <div>자식임</div>
})

function Cart() {

    // const state = useSelector((state) => { return state})   // Redux store 가져와줌.
    const state = useSelector((state) => { return state})   // store의 user만 가져옴!
    const cart = state.cart;

    // store.js로 요청보내주는 함수임.
    const dispatch = useDispatch()
    return (
        <div>
            {/* <Child count={count}></Child>
            <button onClick={() => { setCount(count+1) }}>+</button> */}

            <h6>{state.user.name} {state.user.age}의 장바구니</h6>
            <button onClick={() => 
                dispatch(increase(100))
            }> 버튼 </button>

            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경하기</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cart.map((a, i) =>
                            <tr key={i}>
                                <td>{cart[i].id}</td>
                                <td>{cart[i].name}</td>
                                <td>{cart[i].count}</td>
                                <td>
                                    <button onClick={()=> {
                                        // dispatch( state 변경함수() )
                                        // 오늘의 숙제 1. + 버튼 누르면 수량이 +1 되는 기능
                                        dispatch(addCount(cart[i]))}}>
                                        +
                                    </button>
                                    <button onClick={()=> {
                                        // 응용 1. 장바구니 항목삭제기능
                                        dispatch(minusCount(cart[i]))}}>
                                        -
                                    </button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </Table> 
        </div>
    )
}

export default Cart;