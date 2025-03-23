const imageTobase64 = async(image) =>{
    const reader = new FileReader();
    reader.readAsDataURL(image) //convert to base64

    const data = await new Promise((resolve, reject) =>{
        reader.onloadend = ()=> resolve(reader.result)

        reader.onerror = (error) => reject(error)
    })
    return data
}

export default imageTobase64