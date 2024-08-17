import { Navbar, Nav, Container } from 'react-bootstrap';
// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import bg from './img/bg.png';   // HTML에서 이미지 추가도 가능!
import { lazy, Suspense, createContext, useState, useEffect } from 'react';
import './App.css';
import data from './data.js';
import { BrowserRouter, Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import axios from 'axios'
import { useQuery } from 'react-query';

// import Detail from './routes/Detail.js';
// import Cart from './routes/Cart.js' // 장바구니

// 사이트 발행할 때도 별도의 js파일로 분리됨.
// 단점 : Cart, Detail 컴포넌트 로딩시간 발생.
const Detail = lazy(() => import('./routes/Detail.js'));
const Cart = lazy(() => import('./routes/Cart.js'));

// state 보관함 이라고 생각하면됨.
export let Context1 = createContext()

function App() {

  // 최근 본 상품 기능 추가
  useEffect(()=> {
    let getWatched = localStorage.getItem('watched')
    if(getWatched === null)
    {
      localStorage.setItem('watched', JSON.stringify([]))
    }
  }, [])

  // const obj = {name : 'jang'}
  // localStorage.setItem('data', JSON.stringify(obj));  // array/object -> JSON 변환은 JSON.stringify()
  // const obj2 = localStorage.getItem('data')
  // console.log(JSON.parse(obj2).name);

  const [shoes, setShoes] = useState(data);
  const [재고] = useState([10, 11, 12]);  
  const [scount, setScount] = useState(2);  // 응용1. 버튼 2회 누를 때는 7, 8, 9번 상품 가져오려면?
  const navigate =  useNavigate();

  // 장점1. 성공/실패/로딩중 쉽게 파악가능
  // result.data
  // result.isLoading
  // result.error

  let result = useQuery(['작명'], () =>
    axios.get('https://codingapple1.github.io/userdata.json').then((a) => {
    
    // 장점3. 실패시 retry 알아서 해줌.
    // axios.get('https://codingapple1.github.io/userdata123.json').then((a) => {
      console.log('요청됨')
      return a.data
    }),
    { staleTime : 2000 }  // 장점2. 틈만나면 자동으로 refetch 해줌.
  )

  return (
    <div className='App'>
      {/* <Button variant="primary">Primary</Button> */}
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">POP'SHOP</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => {navigate('/')}}>홈</Nav.Link>
            <Nav.Link onClick={() => {navigate('/detail')}}>상세페이지</Nav.Link>
            <Nav.Link onClick={() => {navigate('/cart')}}>Cart</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link>
              { result.isLoading && '로딩중'}
              { result.error && '에러남'}
              { result.data && (result.data.name + '님 환영합니다!')}
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Suspense fallback={<div>로딩중임</div>}>
        <Routes>
          <Route path="/" element={
            <>
              {/* HTML에서 이미지 추가 하는법 */}
              {/* <div className='main-bg' style={{ backgroundImage : 'url('+bg+')'}}> </div> */}
              <div className='main-bg'> </div>
              <div className='container'>
                <div className='row'>
                  {
                    shoes.map((a, i) => {
                    return (
                        <Card key={i} shoes={shoes[i]} i={i}/>
                      )
                    })
                  }
                </div>
              </div>
              <button onClick={() => {
                // 응용2. 버튼 3회 누를 때는 상품 더 없다고 말해주기
                if(scount < 4 ) {
                  // 응용1. 버튼 2회 누를 때는 7, 8, 9번 상품 가져오려면?
                  axios.get('https://codingapple1.github.io/shop/data'+[scount]+'.json') // ajax 성공
                  // axios.get('asd') // ajax 실패
                  // ajax 성공
                  .then((결과)=> {
                    console.log(결과.data)
                    const copy = [...shoes, ...결과.data];
                    setShoes(copy);
                    setScount(scount+1);  // 응용1. 버튼 2회 누를 때는 7, 8, 9번 상품 가져오려면?
                    // 로딩중 UI 숨기기~
                  }) // 서버에서 가져온 data
                  .catch(() => {
                    // 로딩중 UI 숨기기~
                  })
                } else {
                  // 응용2. 버튼 3회 누를 때는 상품 더 없다고 말해주기
                  alert("상품이 더이상 존재하지 않습니다.");
                }
              }}>더보기</button>
            </>
          }/>

          {/* 페이지 여러개 만들고 싳으면 URL 파라미터 써도됨! */}
          <Route path="/detail/:id" element={
            // value에는 재고라는 스테이트를 공유하고 싶다면 입력하면됨.
              <Context1.Provider value={{ 재고 }}>
                <Detail shoes={shoes} />
              </Context1.Provider>
          } />

          <Route path="/cart" element={ <Cart /> } />

          {/* <Route path="/about" element={ <About /> }>
            <Route path="member" element={ <div>멤버임</div>} />
            <Route path="location" element={ <div>위치정보임</div> } />
          </Route>

          <Route path="/event" element={ <EventPage /> }>
            <Route path="one" element={ <p>첫 주문 시 양배추즙 서비스</p>} />
            <Route path="two" element={ <p>생일기념 쿠폰받기</p> } />
          </Route> */}

          {/* 404 페이지 */}
          {/* <Route path="/*" element={ <div>없는페이지입니다.</div> }/> */}
        </Routes>
      </Suspense>
    </div>
  );
}

function About() {
  return (
    <div>
      <h4>회사정보임</h4>

      {/* 구멍이라는 뜻. */}
      <Outlet></Outlet>
    </div>
  )
}

function EventPage() {
  return (
    <div>
      <h4>오늘의 이벤트</h4>

      {/* 구멍이라는 뜻. */}
      <Outlet></Outlet>
    </div>
  )
}

function Card(props) {
  return ( 
      <div className='col-md-4'>
        <img src={'https://codingapple1.github.io/shop/shoes' + (props.i+1) + '.jpg'} width="80%"/>
        <h4>{props.shoes.title}</h4>
        <p>{props.shoes.content}</p>
      </div>
  )
}

export default App;