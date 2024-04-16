import Commerce from '@chec/commerce.js';

let commerce

 
function getCommerce(commercePublicKey) {
    if(commerce) {
        return commerce
    }
    else{
        const publicKey = commercePublicKey || process.env.NEXT_PUBLIC_API_KEY
        const devEnvironment = process.env.NODE_ENV == "development"

        if( devEnvironment && !publicKey ) {
            throw Error('Commerce Public API key not available')
            console.log(" Commerce public api key not available ")
        }
        commerce = new Commerce(publicKey, devEnvironment)
        return commerce
    }
}

// const client = new CommerceSDK(process.env.NEXT_PUBLIC_API_KEY)


export default getCommerce