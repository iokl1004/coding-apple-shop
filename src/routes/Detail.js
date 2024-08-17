import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from 'styled-components';
import { Nav } from 'react-bootstrap';
import { Context1 } from './../App.js';
import { addItem } from "./../store.js";
import { useLike } from "../hooks/like.js";
import axios from "axios";
import { useUsername } from "../hooks/user.js";

// const YellowBtn = styled.button`
//   background : ${ props => props.bg };
//   color : ${ props => props.bg == 'blue' ? 'white' : 'black' };
//   padding : 10px;
// `
// // 기존 styled 가져올수도 있다!
// const NewBtn = styled.button(YellowBtn);

// const Box = styled.div`
//   background : grey;
//   padding : 20px;
// `

function Detail(props) {
  const dispatch = useDispatch();

  // 보관함을 해체해줌.
  // const {재고} = useContext(Context1)

  // 부모단에서 선언한 id값 가져옴
  const {id} = useParams();
  const shoesInfo = props.shoes.find(obj => obj.id == id);
  const [status, setStatus] = useState(true);
  const [textinput, setTextinput] = useState('');
  const [tab, setTab] = useState(0);  // 탭 상태 저장해둘 state

  const [fade2, setFade2] = useState('');

  useEffect(()=> {
    let getWatched = localStorage.getItem('watched')
    getWatched = JSON.parse(getWatched)
    getWatched.push(shoesInfo.id)
    getWatched = new Set(getWatched)
    getWatched = Array.from(getWatched)
    localStorage.setItem('watched', JSON.stringify(getWatched));
  })

  // const watched = JSON.parse(localStorage.getItem('watched'));
  // watched.push(id);
  // JSON.stringify(watched);
  // localStorage.setItem('watched', JSON.stringify(watched));

  // status 변수가 변경이 될때 setTimeout 함수를 실행 시킨다.
  useEffect(() => {
    setTimeout(() => { setStatus(false) }, 2000)

    // 클린업 펑션 : useEffect 동작 전에 실행되는 return ()=> {}
    return () => {
      // console.log(12);
    }
  });
  
  // 오늘의 숙제 : <input>에 숫자말고 다른거 입력하면 그러지말라고 안내메시지(alert) 띄우기
  useEffect(() => {
    if (isNaN(textinput) === true) {
      alert('그러지마세요');
    }
  }, [textinput]);

  // 오늘의 숙제 : Detail 페이지 로드시 투명도 0에서 1로 애니메시연 주고 싶으면?
  useEffect(() => {
    setFade2('end')

    return () => {
      setFade2('')
    }
  }, [])

  // 44. custom hook으로 코드 재사용하기
  let [like, addLike] = useLike()
  let username = useUsername()

  return (
    <div className={'container start ' + fade2}>
      {/* <Box> */}
        {/* <YellowBtn bg='blue'>버튼</YellowBtn>
        <YellowBtn bg='orange'>버튼</YellowBtn> */}
      {/* </Box> */}
      {
        status === true
        ? <div className="alert alert-warning">
            2초이내 구매시 할인
          </div>
        : null
      }
      {/* {count}

      <button onClick={() => { setCount(count+1)} }>버튼</button> */}
      {/* {재고} */}
      {username}
      <div className="row">
        <div className="col-md-6">
          <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
        </div>
        <div className="col-md-6">
          {like} <span onClick={() => { addLike()}}>♥</span>
          <input onChange={ (e) => setTextinput(e.target.value) } />
          <h4 className="pt-5">{shoesInfo.title}</h4>
          <p>{shoesInfo.content}</p>
          <p>{shoesInfo.price}원</p>
          <button className="btn btn-danger" onClick={() => {
            dispatch(addItem( {id : shoesInfo.id, name : shoesInfo.title, count : 1} ))
          }}>주문하기</button> 
        </div>
      </div>
      
      {/* defaultActiveKey : 기본으로 눌려있을 버튼 */}
      <Nav variant="tabs"  defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link onClick={() => setTab(0)} eventKey="link0">버튼0</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => setTab(1)} eventKey="link1">버튼1</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => setTab(2)} eventKey="link2">버튼2</Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent tab={tab}/>
    </div>
  )
}

function TabContent({tab}) {
  // 1. if문 사용하는 방법
  // if(tab === 0) {
  //   return <div>내용0</div>
  // }
  // else if(tab === 1) {
  //   return <div>내용1</div>
  // }
  // else if(tab === 2) {
  //   return <div>내용2</div>
  // }

  const [fade, setFade] = useState('');
  const {재고} = useContext(Context1)

  useEffect(() => {
    // 리액트의 automatic batching 기능
    setTimeout(() => { setFade('end') }, 10)

    return () => {
      setFade('')
    }
  }, [tab])
  // 2. if문을 사용하지 않는 방법
  return (
    <div className={'start ' + fade}>
      {   [<div>내용0</div>
        , <div>내용1</div>
        , <div>내용2</div>]
        [tab]
      }
    </div>
  )
}

export default Detail;