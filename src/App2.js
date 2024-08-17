// 성능개선 3 : useTransition, useDeferredValue
import { useState, useTransition, useDeferredValue } from "react";

let a = new Array(10000).fill(0)

function App2() {
    let [name, setName] = useState('')
    let [isPending, 늦게처리] = useTransition()
    let state = useDeferredValue(state)

    return (
        <div className="App">
            <input onChange={(e) => {
                늦게처리(() => {
                    setName(e.target.value)
                })
            }}/>
            {
                isPending ? '로딩중' : 
                a.map(() => {
                    return <div>{state}</div>
                })
            }
        </div>
    );
}

export default App2;