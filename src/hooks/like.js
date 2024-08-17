// 44. custom hook으로 코드 재사용하기
import { useState } from "react"

export function useLike() {
    // 좋아요 버튼과 기능을 만들자!
    let [like, setLike] = useState(0)
    function addLike() {
      setLike(a => a + 1)
    }

    return [like, addLike];
}