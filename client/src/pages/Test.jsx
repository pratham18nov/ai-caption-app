import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment } from '../store/counterSlice'

const Test = () => {
    const count = useSelector((state)=>state.counter.value)
    const dispatch = useDispatch()

  return (
    <div className='h-screen w-full bg-red-600'>
        <p>Count: {count}</p>
        <button onClick={()=>dispatch(increment())}>Increment</button>
        <button onClick={()=>dispatch(decrement())}>Decrement</button>
    </div>
  )
}

export default Test



// import { useEffect, useRef, useState } from 'react'
// import ColorThief from 'color-thief-browser'

// // function base64ToFile(base64, filename) {
// //   if (!base64 || typeof base64 !== 'string' || !base64.includes(',')) {
// //     console.error('Invalid base64 input:', base64)
// //     return null
// //   }

// //   const arr = base64.split(',')
// //   const mimeMatch = arr[0].match(/:(.*?);/)

// //   if (!mimeMatch) {
// //     console.error('Invalid MIME type in base64:', base64)
// //     return null
// //   }

// //   const mime = mimeMatch[1]
// //   const bstr = atob(arr[1])
// //   let n = bstr.length
// //   const u8arr = new Uint8Array(n)

// //   while (n--) {
// //     u8arr[n] = bstr.charCodeAt(n)
// //   }

// //   return new File([u8arr], filename, { type: mime })
// // }


// const ColorExtractor = (imageFile) => {
//   const [dominantColor, setDominantColor] = useState(null)
//   const imgRef = useRef(new Image())

//   useEffect(() => {
//   if (!imageFile) return

// //   const file = base64ToFile(imageFile, 'uploaded-image.png')
//   if (!imageFile) return

//   const img = imgRef.current
//   const objectUrl = URL.createObjectURL(imageFile)

//   img.crossOrigin = 'anonymous'
//   img.src = objectUrl

//   img.onload = async () => {
//     try {
//       const color = await ColorThief.getColor(img)
//       setDominantColor(`rgb(${color[0]}, ${color[1]}, ${color[2]})`)
//     } catch (err) {
//       console.error('Color extraction failed:', err)
//     } finally {
//       URL.revokeObjectURL(objectUrl)
//     }
//   }
// }, [imageFile])


//   return dominantColor
// }

// export default ColorExtractor
