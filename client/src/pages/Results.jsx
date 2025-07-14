import React, { useState } from 'react'
import { BiLike, BiSolidLike } from 'react-icons/bi'
import { RiTranslateAi2 } from "react-icons/ri";
import { GrRevert } from "react-icons/gr";
import { FaCheck } from 'react-icons/fa'
import { LuCopy } from 'react-icons/lu'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import SummaryApi from '../helpers/SummaryApi'
import {motion} from 'motion/react'
import TypewriterText from '../animations/TypewriterText';
import PartyBlaster from '../animations/PartyBlaster';
import isLoggedIn from '../helpers/isLoggedIn';
import { toast } from 'react-toastify'
import GenerateCaptions from '../components/GenerateCaptions';

const Results = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { image, dominantColor, invertedColor, results = [] } = location.state || {};

  // console.log('image Received', image)

  const [loading, setLoading] = useState(false)
  const [copiedIndex, setCopiedIndex] = useState(null)
  const [likedIndex, setLikedIndex] = useState([])
  const [capSaved, setCapSaved] = useState([])
  const [translatedTexts, setTranslatedTexts] = useState([])
  const [translatedIndex, setTranslatedIndex] = useState([])
  
  const authToken = localStorage.getItem("authToken")
  const user = JSON.parse(localStorage.getItem("userData"))
  const userId = user?._id

  const copyText = async(text, index) =>{
    try{
      await navigator.clipboard.writeText(text)
      setCopiedIndex(index)
      setTimeout(()=>setCopiedIndex(null), 2000)
    }
    catch(err){
      console.error("Error copying text", err)
    }
  }

  const handleLike = async(event, index) =>{
    if(!isLoggedIn()){
      toast.warning("Please login")
      return 
    }

    try{
      setLikedIndex((prev)=>
        prev.includes(index) ? prev.filter((i)=>i!==index) : [...prev, index]
      //.filter() creates a new array containing only elements not equal to index.
      )

      // setCapSaved((prev)=>{
      //   if(!prev.includes(index)) {
      //     saveCaption(event, index);
      //     return [...prev, index]
      //   }
      //   return prev
      // })

      if (!capSaved.includes(index)) {
        const success = await saveCaption(event, index);
        if(success){
            setCapSaved(prev => [...prev, index]);
            
            // Increment totalLikes in user statistics
            try {
                const response = await fetch(SummaryApi.incrementTotalLikes.url, {
                    method: SummaryApi.incrementTotalLikes.method,
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ userId: userId })
                });
                const responseData = await response.json();
                if (responseData.success) {
                    console.log('Total likes incremented successfully');
                } else {
                    console.log('Failed to increment total likes:', responseData.message);
                }
            } catch (error) {
                console.error('Error incrementing total likes:', error);
            }
        }
      }
    }
    catch(error){
      console.error("Error occurred in liking caption ", error)
    }
  }

  const saveCaption = async(event, index) =>{
    event.preventDefault();
    if(!isLoggedIn()){
      toast.warning("Please login")
      return 
    }

    try{
      const data = {caption:capArray[index].title, tags:keywordsArray, userId:userId}

      const dataResponse = await fetch(SummaryApi.saveCaptions.url, {
        method : SummaryApi.saveCaptions.method,
        headers: {
          'Authorization': `Bearer ${authToken}`,
          "Content-Type" : "application/json"
        },
        body: JSON.stringify(data),
      })
      const dataApi = await dataResponse.json()
      console.log("dataApi at saveCaption", dataApi)

      if(dataApi.success){
        console.log(dataApi.message)
        return true
      }
      if(dataApi.error){
        console.log("Error while saving caption", dataApi.message)
        return false
      }
    } 
    catch(error){
      console.error("Error occurred in storing caption ", error)
      return false
    }
  }

  const translateText = async(text) =>{
    console.log("called")
    try {
      const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|hi`);
      //for other language translation, change langCode in API
      const data = await res.json();
      return data.responseData.translatedText;
    } 
    catch (err) {
      console.error('Translation error', err)
      return text  
    }
  }

  const handleTranslate = async(event, index, originalText) =>{
    // const originalText = capArray[index].title

    if(translatedIndex.includes(index)){
      //Toggle back to original
      setTranslatedIndex((prev)=> prev.filter((i)=>i!==index) )
    }
    else{
      try {
        const translated = await translateText(originalText) // hi -> hindi
        setTranslatedTexts((prev) =>({ ...prev, [index] : translated }))
        setTranslatedIndex(prev => [...prev, index])
      } 
      catch (err) {
        console.error("Translation failed", err)  
      }
    }
    
    // try {
    //   const translated = await translateText(originalText, 'hi') // hi -> hindi
    //     console.log("translated text:", translated)
    //   setTranslatedTexts((prev) =>({ ...prev, [index] : translated }))
    //   setTranslatedIndex((prev)=>prev.includes(index) ? prev.filter((i)=>i!==index) : [...prev, index])
    // } catch (err) {
    //   console.log("Some error occured while translating", err)
    // }
  }

  const handleNavigate = () =>{
    if(!isLoggedIn()) {
      toast.warning("Please login")
      return
    }
    navigate('/most-liked-captions')
  }

  const genCaps = async() =>{
    setLoading(true)

    // const captions = await GenerateCaptions(image)
    // const captions = await GenerateCaptions(image, mood)
    // console.log("captions generated", captions)

    // Increment captionsGenerated if user is logged in
    if (isLoggedIn()) {
      const user = JSON.parse(localStorage.getItem("userData"));
      const authToken = localStorage.getItem("authToken");
      try {
        const response = await fetch(SummaryApi.incrementCaptionsGenerated.url, {
          method: SummaryApi.incrementCaptionsGenerated.method,
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userId: user._id })
        });
        const responseData = await response.json();
        if (responseData.success) {
          console.log('Captions generated count incremented');
        } else {
          console.log('Failed to increment captions generated:', responseData.message);
        }
      } 
      catch (error) {
        console.error('Error incrementing captions generated:', error);
      }
    }

    setLoading(false)
  }

  const keywordsArray = [ "Mountain", "cloud", "Rooftop", "Rain", "Travel", "Happy" ]
  const capArray = results.map((item, index) => ({
    id: String(index + 1),
    title: item[0],  // caption text
    score: item[1]   // similarity score (optional to show)
  }));
  

  return (
    <section className='w-full flex flex-col jutify-center gap-2 items-center py-15'>
      <PartyBlaster />
      <p className='text-5xl max-sm:text-3xl font-bold text-center'>Caption Recommendations</p>
      <p className='text-xl max-sm:text-sm text-slate-700 dark:text-slate-300 mt-2 text-center max-sm:w-[80%]'>Here are AI-generated caption suggestions for your image.</p>

      <section className='h-full py-10'>
        <div className='h-full w-[55vw] max-lg:w-[80vw] max-md:w-[100vw] flex justify-around gap-8 max-lg:flex-col max-lg:items-center'>

          {/* image part */}
          <div className='h-full w-[38%] max-lg:w-[90%] border border-slate-700 rounded-lg relative' >
            <div className='p-2'>
              <img src={image} alt='image' className='mx-auto rounded-lg'/>
            </div>
            <div className='p-2 opacity-75'>KeyWords:</div>
            <div className='p-2 flex gap-2 w-contain w-full flex-wrap'>
              {
                keywordsArray.map((data, index)=>{
                  return(
                    <span key={index} className='h-5 w-fit p-4 border border-slate-700 rounded flex justify-center items-center' style={{border:`2px solid ${invertedColor}`}}>{data}</span>
                  )
                })
              }
            </div>

            {/* color spill */}
            <div className="absolute -inset-15 blur-3xl opacity-25 -z-10 transition-all duration-1500 rounded-lg" style={{backgroundColor:dominantColor||'transparent'}}> </div>
            
          </div>

          {/* caption part */}
          <div className='h-fit w-[57%] max-lg:w-[75%] max-sm:w-[90vw] border border-slate-700 rounded-lg p-4'>
            <span className='pt-4 text-2xl font-bold text-gradient'><TypewriterText text="Suggested Captions"/> </span>
            <div className='flex flex-col gap-4 mt-4'>
              {
                capArray.length ? (
                  capArray.map((data, index)=>{
                    return(
                      <motion.div key={index} initial={{y:-index*(158)}} 
                        animate={{y:index*0}} 
                        transition={{duration:1, delay:index*1/3,}}
                        style={{zIndex: data.length-index, border:`1px solid ${invertedColor}`}}
                        className='border rounded-lg p-4 flex flex-col gap-4 bg-[#E2E8F0] dark:bg-[#1a1a1a]'>
                        <p className='text-slate-700 dark:text-slate-300' value={data.title}>{translatedIndex.includes(index) ? translatedTexts[index]: data.title}</p>
                        <div className='flex justify-between max-sm:flex-row-reverse'>
                          <div className='flex gap-6 max-sm:hidden'>
                            <i className='h-10 w-10 border border-slate-700 hover:text-white flex justify-center items-center text-lg rounded-lg hover:dark:bg-gray-700 cursor-pointer transition-all' onClick={(e)=>handleLike(e,index)}>
                              {
                                likedIndex.includes(index) ? (<BiSolidLike/>) : (<BiLike/>)
                              }
                            </i>
                            <i className='h-10 w-10 border border-slate-700 hover:text-white flex justify-center items-center text-lg rounded-lg hover:dark:bg-gray-700 cursor-pointer transition-all' onClick={(e)=>handleTranslate(e,index, data.title)} title='translate'> 
                              {
                                translatedIndex.includes(index) ? (<GrRevert/>) : (<RiTranslateAi2/>)
                              } 
                            </i>
                          </div>
                          <div className='flex gap-2 items-center btn btn-copy hover:bg-white '>
                          {/* <div className='flex gap-2 items-center border border-slate-700 px-4 rounded-lg hover:bg-gray-700 cursor-pointer transition-all max-sm:h-12'> */}
                            <i id='copy-icon'>{copiedIndex===index ? (<FaCheck/>) : (<LuCopy/>)}</i>
                            <p id='copy-text' className='text-slate-700 dark:text-slate-300 ' onClick={()=>copyText(data.title, index)}>{copiedIndex===index ? ('Copied') : ('Copy')}</p>
                          </div>
                        </div>
                      </motion.div> 
                    )
                  })
                ) : (
                  <div>No data found</div>
                ) 
              }
            </div>

          </div>
        </div>
      </section>

      <div className='flex gap-4 max-md:flex-col'>
        <Link to='/upload' className='btn w-fit min-w-56 text-center '>
          <div className='text-gray-900 dark:text-white/87'>Upload Another Image</div>
        </Link>
        <button onClick={genCaps} className='btn w-fit min-w-56 text-center '>
          <div className='text-gray-900 dark:text-white/87'>Generate More</div>
        </button>
        <button onClick={handleNavigate} className='btn w-fit min-w-56 text-center '>
          <div className='text-gray-900 dark:text-white/87'>Most liked Captions</div>
        </button>
      </div>

      {/* <div className='flex gap-4 max-[560px]:flex-col'>
        <Link to='/upload' className='btn w-[25%] max-lg:w-[50%] min-w-[240px] text-center '>
          <div className='text-gray-900 dark:text-white/87'>Upload Another Image</div>
        </Link>
        
        <button onClick={handleNavigate} className='btn w-[25%] max-lg:w-[50%] min-w-[240px] text-center '>
          <div className='text-gray-900 dark:text-white/87'>Most liked Captions</div>
        </button>
      </div> */}


      {/* loading animation */}
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

export default Results
