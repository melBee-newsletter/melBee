import React, { useState } from 'react';

function ReceiverSelect(){
    const [receivers, setReceivers] = useState<string []>([]);
    const [email, setEmail] =useState<string>("");

    const handleAdd = (e: React.ChangeEvent<any>): void => {
            e.preventDefault();
            setReceivers(prevEmail =>[...prevEmail, email]);
            setEmail("");
    };

    const handleRemove = async (e: React.ChangeEvent<any>): Promise<any> => {
        e.preventDefault();
        let index = Number(e.target.id);
        let left = receivers.slice(0, index);
        let right = receivers.slice(index + 1);
        setReceivers([...left, ...right]);
    };

    const handleSend = (e: React.ChangeEvent<any>): void => {
        e.preventDefault();
        //TODO: once we get the endpoints to send the recipient email list, need to implement here.
    };
    
    const displayEmail = (email: string, i: number) => {
        return(
            <div className='inline-flex align-middle pt-4 pb-4'>
                <p >{email}</p>
                <button type="submit" id={String(i)} onClick={handleRemove}>❌</button>
            </div>
        );
    }
    
    return (
        <div style={{backgroundColor: "yellow"}}>
            <h3>送信先のメールアドレスをご入力ください</h3>
            <div className='bg-white h-fit w-fit rounded-xl'>
                {receivers.map((email, i) => {
                    return displayEmail(email, i);
                })}
            </div>
            <div>
                <form onSubmit={handleAdd}>
                    <input type="email" value={email} placeholder='メールアドレス' onChange={(e) => setEmail(e.target.value)} />
                    <button> 追加 </button>
                </form>
                <button type="submit" onClick={handleSend} className="bg-black text-white" >送信</button>
            </div>
        </div>
    );
};

export default ReceiverSelect;