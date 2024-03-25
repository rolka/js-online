export const createPc = async ( pcDetails, callBack ) =>
{
    const promise = await fetch('/pc_rent/api/pc', {
        method: 'post',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(pcDetails)
    })
    const result = await promise.json()
    callBack(result);
}

export const createPcWithImage = async ( pcDetails, callBack ) =>
{
    const promise = await fetch('/pc_rent/api/pc', {
        method: 'post',
        body: pcDetails
    })
    const result = await promise.json()
    callBack(result);
}

export const getAllPcs = async ( callBack ) =>
{
    const promise = await fetch('/pc_rent/api/pc');
    const result = await promise.json()
    callBack(result);
}
export const getPcById = async ( pcId, callback ) =>
{
    const promise = await fetch(`/pc_rent/api/pc/${pcId}`);
    const result = await promise.json();
    console.log(result);
    callback(result);
}
export const getPcsByOwner = async ( callback ) =>
{
    const promise = await fetch(`/pc_rent/api/pc/my-pcs`);
    const result = await promise.json();
    // console.log(result);
    callback(result);
}


