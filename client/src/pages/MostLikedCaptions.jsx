import React, { useEffect, useState } from 'react'
import { BiLike, BiSolidLike } from 'react-icons/bi'
import { RiTranslateAi2 } from "react-icons/ri";
import { GrRevert } from "react-icons/gr";
import { FaCheck } from 'react-icons/fa'
import { LuCopy } from 'react-icons/lu'
import SummaryApi from '../helpers/SummaryApi'
import { toast } from 'react-toastify'
import isLoggedIn from '../helpers/isLoggedIn'
import TypewriterText from '../animations/TypewriterText'
import {motion} from 'motion/react'
import AnimateNumber from '../animations/AnimateNumber';

const MostLikedCaptions = () => {
    const [loading, setLoading] = useState(false)
    const [capArray, setCapArray] = useState([])
    const [copiedIndex, setCopiedIndex] = useState(null)
    const [likedIndex, setLikedIndex] = useState([])
    const [capSaved, setCapSaved] = useState([])
    const [translatedTexts, setTranslatedTexts] = useState([])
    const [translatedIndex, setTranslatedIndex] = useState([])
    
    const authToken = localStorage.getItem("authToken");
    const user = JSON.parse(localStorage.getItem("userData"));
    const userId = user._id;

    const fetchCaptions = async() =>{
        setLoading(true)
        const response = await fetch(SummaryApi.getAllCaptions.url, {
            method:SummaryApi.getAllCaptions.method,
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        })
        const responseData = await response.json()
        if(responseData.success){
            setCapArray(responseData.data)
            console.log('responseData',responseData.message)
            console.log('array',capArray)
        }
        setLoading(false)
    }

    useEffect(()=>{
        // setLoading(true)
        fetchCaptions()
        // console.log('Updated captions array:', capArray)
        // setLoading(false)
    }, [])

    useEffect(() => {
        console.log('Updated capArray:', capArray); // This will reflect the updated array
    }, [capArray]);

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
            if (!capSaved.includes(index)) {
                const success = await saveCaption(event, index);
                if(success){
                    setCapArray(prev => prev.map(
                        (item,i)=> i===index ? {...item, likeCount:item.likeCount+1} : item)
                    )
                    setCapSaved(prev => [...prev, index]);
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
            const data = {caption:capArray[index].caption, userId:userId}

            const dataResponse = await fetch(SummaryApi.saveCaptions.url, {
                method : SummaryApi.saveCaptions.method,
                credentials: "include",
                headers: {
                'Authorization': `Bearer ${authToken}`,
                "content-type" : "application/json"
                },
                body: JSON.stringify(data),
            })
            const dataApi = await dataResponse.json()
            console.log("dataApi at saveCaption", dataApi)
            
            if(dataApi.success){
                console.log(dataApi.message)
            }
            if(dataApi.error){
                console.log("Error while saving caption", dataApi.message)
            }
            return dataApi.success
        } 
        catch(error){
        console.error("Error occurred in storing caption ", error)
        }
    }

    const translateText = async(text) =>{
        // console.log("called")
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
    }


  return (
    <section className='flex flex-col justify-center my-8'>
        <div className='flex flex-col justify-center items-center py-6'>
            <div className='text-5xl max-sm:text-3xl font-bold text-center'><TypewriterText text="Most Loved Captions"/></div>
            <p className='text-xl text-slate-700 dark:text-slate-300 text-[clamp(1rem,2vw,1.25rem)] w-[80%] sm:w-[60%] md:w-[55%] text-center p-4'>Discover the captions that captured the most hearts! These community favorites have resonated the most—whether it’s humor, inspiration, or creativity, they’ve left a mark.</p>
        </div>

        <div className='h-fit w-[57%] max-lg:w-[75%] max-sm:w-[90vw] border border-slate-600 rounded-lg p-4 mx-auto'>
            {/* <span className='pt-4 text-2xl font-bold text-gradient'><TypewriterText text="Most Liked Captions"/> </span> */}
            <div className='flex flex-col gap-4'>
                {
                capArray.length ? (
                    capArray.map((data, index)=>{
                    return(
                        <motion.div key={index} initial={{y:-index*(175)}} 
                        animate={{y:index*0}} 
                        transition={{duration:1, delay:index*1/3,}}
                        style={{zIndex: data.length-index}}
                        className='border border-slate-600 rounded-lg p-4 flex flex-col gap-4 bg-[#E2E8F0] dark:bg-[#1a1a1a]'>
                        <p className='text-lg text-slate-700 dark:text-slate-300' value={data.caption}>{translatedIndex.includes(index) ? translatedTexts[index]: data.caption}</p>
                        <div className='flex max-md:flex-col items-center text-sm'>
                            <div className='opacity-75 max-md:w-full max-md:ml-4'><span>KeyWords/Category:</span></div>
                            <div className='p-1 flex gap-2 w-contain w-full flex-wrap'>
                            {
                                data.tags.map((data, index)=>{
                                return(
                                    <span key={index} className='h-5 w-fit p-1 border border-slate-600 rounded flex justify-center items-center'>{data}</span>
                                )
                                })
                            }
                            </div>
                        </div>
                        <div className='flex justify-between max-sm:flex-row-reverse'>
                            <div className='flex gap-6 max-sm:hidden'>
                            <i className='h-10 w-fit p-2 border border-slate-700 hover:text-white flex justify-center items-center text-lg rounded-lg hover:dark:bg-gray-700 cursor-pointer transition-all' onClick={(e)=>handleLike(e,index)}>
                                {
                                likedIndex.includes(index) ? (<BiSolidLike/>) : (<BiLike/>)
                                }
                                <AnimateNumber value={data.likeCount} length={index}/>
                            </i>
                            
                            <i className='h-10 w-10 border border-slate-700 hover:text-white flex justify-center items-center text-lg rounded-lg hover:dark:bg-gray-700 cursor-pointer transition-all' onClick={(e)=>handleTranslate(e,index, data.caption)} title='translate'> 
                                {
                                translatedIndex.includes(index) ? (<GrRevert/>) : (<RiTranslateAi2/>)
                                } 
                            </i>
                            </div>
                            <div className='flex gap-2 items-center btn btn-copy hover:bg-white '>
                            {/* <div className='flex gap-2 items-center border border-slate-700 px-4 rounded-lg hover:bg-gray-700 cursor-pointer transition-all max-sm:h-12'> */}
                            <i id='copy-icon'>{copiedIndex===index ? (<FaCheck/>) : (<LuCopy/>)}</i>
                            <p id='copy-text' className='text-slate-700 dark:text-slate-300 ' onClick={()=>copyText(data.caption, index)}>{copiedIndex===index ? ('Copied') : ('Copy')}</p>
                            </div>
                        </div>
                        </motion.div> 
                    )
                    })
                ) : (
                    <div>No Captions found</div>
                ) 
                }
            </div>
        </div>

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

export default MostLikedCaptions