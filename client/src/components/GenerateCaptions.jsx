// import React from 'react'

const GenerateCaptions = async(image) => {

    // function base64ToBlob(image) {
    //     const [header, data] = image.split(',');
    //     const mime = header.match(/:(.*?);/)[1];
    //     const binary = atob(data);
    //     const array = new Uint8Array(binary.length);

    //     for (let i = 0; i < binary.length; i++) {
    //         array[i] = binary.charCodeAt(i);
    //     }

    //     return new Blob([array], { type: mime });
    // }

    const getCaptionFromImage = async(image) =>{
        console.log(import.meta.env.VITE_HUGGINGFACE_API_TOKEN)
        
        const response = await fetch("https://api-inference.huggingface.co/models/ckandemir/blip-image-captioning-large-inference", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_HUGGINGFACE_API_TOKEN}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ image: image })
        });

        const result = await response.json();
        return result[0]?.generated_text || "No caption generated";
    }

    const genQuoteFromCaption = async(caption) => {
        const prompt = `Turn this into a short quote suitable for Instagram:\n"${caption}"`

        const response = await fetch("https://api-inference.huggingface.co/models/tiiuae/falcon-7b-instruct", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_huggingFace_AccessToken}`,
                "Content-type" : "application/json"
            },
            body: JSON.stringify( {inputs : prompt} )
        })

        const data = await response.json()
        return typeof data ==="string" ? data : data[0]?.generated_text || "No quote generated"
    }

    // const imageBlob = base64ToBlob(image)
    const caption = await getCaptionFromImage(image)
    // const quote = await genQuoteFromCaption(caption)

    return caption
    // return quote
}

export default GenerateCaptions