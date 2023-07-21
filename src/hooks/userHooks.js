


const useUserFetch = ()=>{

    const headers = {
        'Content-Type': 'application/json'
   }
   const baseUrl = '/api/user'


    const login =async (userData)=>{
        const {name, email} = userData

       return fetch(`${baseUrl}/login`,{
            method:'POST',
            body: JSON.stringify({
                name:name,
                email:email
            }),
            headers: headers,
        })
    }

    const register = async (userData)=>{
        const {name, email} = userData
        
        return fetch(`${baseUrl}/register`,{
            method:'POST',
            headers:headers,

            body:JSON.stringify({
                name:name,
                email:email

            }),
        })

    }

    return{
        login,
        register,
    }

   


}
export  {useUserFetch}