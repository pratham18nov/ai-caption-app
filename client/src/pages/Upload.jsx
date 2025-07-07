import React, { useEffect, useState } from 'react'
import { FiUpload } from 'react-icons/fi'
import { IoMdCloseCircleOutline } from 'react-icons/io'
import { LuImage } from 'react-icons/lu'
import { Link, useNavigate } from 'react-router-dom'
import GenerateCaptions from '../components/GenerateCaptions'
import imageTobase64 from '../helpers/imageTobase64'
import TypewriterText from '../animations/TypewriterText'
import ColorExtractor from '../components/ColorExtractor'
// import '../animations/'
import InteractiveCard from '../animations/InteractiveCard'

const Upload = () => {
  const [loading, setLoading] = useState(false)
  const [imageArray, setImageArray] = useState([])
  const [dominantColor, setDominantColor] = useState(null)
  const [invertedColor, setInvertedColor] = useState(null)
  const navigate = useNavigate();
  

  const handleChange = async(e) =>{
    const image = e.target.files[0]
    console.log('image uploaded', image)

    if(image){
      try {
        const color = await ColorExtractor(image)
        console.log('Dominant color:', color)
        // Use this color in your state or UI
        setDominantColor(color)
        console.log('color extracted', dominantColor)
      } catch (error) {
        console.error('Color extraction failed:', error)
      }

      const convert = await imageTobase64(image)
      setImageArray(convert)
    }
  }

  function removeImage(){
    setImageArray([])
  }

  useEffect(() => {
    if (dominantColor) {
      console.log('color extracted (updated):', dominantColor)
      setInvertedColor(getInvertedColor(dominantColor))
      console.log('inverted color extracted (updated):', invertedColor)
    }
  }, [dominantColor])

  const getInvertedColor = (rgbString) =>{
    const [r,g,b] = rgbString.match(/\d+/g).map(Number)
    const opposite = `rgb(${255-r}, ${255-g}, ${255-b})`
    return opposite
  }
  

  const genCaps = async() =>{
    setLoading(true)

    const captions = await GenerateCaptions(imageArray)
    navigate('/results', {state: {image: imageArray, dominantColor:dominantColor, invertedColor:invertedColor}})
    console.log("captions generated", captions)
  }
  
  return (
    <section className='h-full w-full flex flex-col jutify-center gap-2 items-center py-15'>
      <div className='text-5xl max-sm:text-3xl font-bold text-center'><TypewriterText text="Upload Your Image"/></div>
      <p className='text-xl max-sm:text-sm text-slate-700 dark:text-slate-300 mt-2 text-center'>Upload an image to get AI-powered caption recommendations.</p>

      
      <div className='min-h-[420px] max-sm:h-[500px] min-w-[55%] max-sm:w-[95%] border border-slate-700 rounded-lg mt-10 flex flex-col justify-around items-center gap-4 relative  '>
      <InteractiveCard className='p-10 w-[95%] max-sm:w-[80%] border border-dashed border-slate-500 rounded-lg flex justify-center items-center'>
        <div >
          {
            imageArray.length===0 ? (
                <div className='flex flex-col justify-center items-center gap-4  '>
                  <div className='h-18 w-18 sm:h-20 sm:w-20 rounded-full flex justify-center items-center text-4xl bg-[#94A3B8] dark:bg-[#1a1a1a] text-slate-700 dark:text-slate-400'><LuImage/></div>
                  <p className='text-2xl max-sm:text-lg font-bold text-center'>Drag and drop your image here</p>
                  <p className='-mt-2 max-sm:text-xs text-center'>Supports JPG, PNG and GIF files. Max file size 10MB.</p>
                  <label className=''>  
                    <div className='btn flex items-center gap-2 text-lg '>
                      <i><FiUpload/></i>
                      <span>Select File</span>
                    </div> 
                    <input type='file' className='hidden' onChange={handleChange} accept="image/*"/>
                  </label>
                </div>
            ) : (
              <div className='relative'>
                <div className='absolute -top-2 -right-6 text-2xl cursor-pointer' onClick={removeImage}><IoMdCloseCircleOutline/></div>
                <div className='max-w-full max-h-56 flex justify-center items-center '>
                  <img src={imageArray} alt='imageArray' className='w-full max-h-56 object-cover'/>
                </div>
              </div>
            )
          }
        </div>

      </InteractiveCard>

        {/* color spill */}
        {imageArray[0] && <div className="absolute -inset-15 blur-3xl opacity-25 -z-10 rounded-lg" style={{backgroundColor:dominantColor||'transparent', transition:'background-color 2s ease'}}> </div> }


        <button className='w-84 max-sm:w-70 text-center' style={imageArray.length !== 0 ? { borderRadius: '12px', boxShadow: `0px 0px 10px 0px ${invertedColor}, inset 0px 0px 20px 0px ${invertedColor}` } : {}} >
          {
            imageArray.length !== 0 ? (
              <div onClick={genCaps}>
                <span className='btn block text-gray-900 dark:text-white/87' >Generate Captions</span>
              </div>
            ) : (
              <span className='btn-disabled block'>Generate Captions</span>
            )
          }

          {/* {
            imageArray.length !== 0 ? (
              <div
                onClick={(e) => !loading && genCaps(e)} // prevent multiple clicks while loading
                className="cursor-pointer text-center"
              >
                {
                  loading ? (
                    <span className="loader block mx-auto h-fit w-fit"></span> // loader animation
                  ) : (
                    <span className="btn block text-gray-900 dark:text-white/87">
                      Generate Captions
                    </span>
                  )
                }
              </div>
            ) : (
              <span className="btn-disabled block text-center">
                Generate Captions
              </span>
            )
          } */}

        </button>
      </div>
      

      {/* <InteractiveCard/> */}

      {
        loading ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs ">
            <div className="loader"></div> 
          </div>
        ) : null
      }
      
    </section>
  )
}

export default Upload