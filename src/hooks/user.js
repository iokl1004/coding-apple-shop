// 44. custom hook으로 코드 재사용하기
// 오늘의 숙제 : public 폴더 내에 있는 username.json 파일을 읽어서 보여주자!
import axios from "axios";
import { useEffect, useState } from "react"

export function useUsername() {
    const [username, setUsername] = useState('')

    useEffect(()=> {
        axios.get('/username.json')
        .then((a) => {
            setUsername(a.data)
        })
        .catch(setUsername('데이터를 읽어오지 못하였습니다.'))
    }, [])

    return username;
}