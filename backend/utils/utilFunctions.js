

exports.checkMissingParams = ({requiredFields})=>{
    const missingFields = []


    Object.entries(requiredFields).forEach(([key,val])=>{
       if(val === null || val === undefined)
        missingFields.push(key)
    })

    if(Object.keys(missingFields).length > 0) {
        missingMessage = {'message':'Bad request missing params','data':missingFields}
        return {
            success: false,
            data: missingMessage
        }
    }

    return { success: true };
}