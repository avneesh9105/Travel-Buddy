import React,{Component,useRef, useState,useEffect} from 'react'
// import GooglePayButton from '@google-pay/button-react'
import Card from 'react-credit-cards'
import emailjs from '@emailjs/browser'
import logo from "./logo1.jpeg";


import './Payment.css'
// import jwt_decode from 'jwt-decode'
// import {
//     formatCreditCardNumber,
//     formatCVC,
//     formatExpirationDate,
//     formatFormData
// } 
// from './utils.js'
import 'react-credit-cards/es/styles-compiled.css'
import { useNavigate } from 'react-router-dom'
export default function Paymenttab(){

    // const [number, setNumber] = useState('')
    // const [name, setName] = useState('')
    // const [expiry, setExpiry] = useState('')
    // const [cvc, setCvc] = useState('')
    // const [ focus, setFocus] = useState('')
    
     
    
    const [userData,setUserData]=useState({});
    useEffect(() => {
    
        const callAboutPage = async ()=>{
        try {
        
        const res = await fetch('http://localhost:8000/profile', {
        method: "GET",
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
        },
        credentials: "include"
        });
        const data = await res.json();
        console.log(data);
        setUserData(data);
        if(!res.status===200){
            const error =new Error(res.error);
            throw error;
        }
    }catch(err){
        console.log(err);
        
    }
        }
        callAboutPage();
      }, []);
    
    
    const navigate=useNavigate();
    const amount=localStorage.getItem('price')+"00";
        const currency="INR";
        const receiptId="bbjbj";
        const email=userData.email;
        const cuName=userData.name;
        const contact=userData.mobile;


    const paymentHandler=async(e)=>{
        const res=await fetch("http://localhost:8000/orders",{
          method:"POST",
          body:JSON.stringify({
            amount,
            currency,
            receipt:receiptId,
          }),
          headers:{
            "Content-Type":"application/json",
          },
        });
          const order=await res.json();
          console.log(order);
        
          var options = {
            "key": "rzp_test_7Zj7q3hZcqGAV8", // Enter the Key ID generated from the Dashboard
            amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency,
            "name": "Travel Buddy", //your business name
            "description": "Test Transaction",
            "image": {logo},
            "order_id": order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "handler": function (response){
                // alert(response.razorpay_payment_id);
                // alert(response.razorpay_order_id);
                // alert(response.razorpay_signature)
                sendEmail();  
            },
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
                cuName, //your customer's name
                email,
                contact,  //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        var rzp1 = new Razorpay(options);
        rzp1.on('payment.failed', function (response){
                alert(response.error.code);
                alert(response.error.description);
                alert(response.error.source);
                alert(response.error.step);
                alert(response.error.reason);
                alert(response.error.metadata.order_id);
                alert(response.error.metadata.payment_id);
        });
        rzp1.open();
        // e.preventDefault();
    }
         let retString = localStorage.getItem("nameData")
         let retArray = JSON.parse(retString)
         const size=retArray.length;
         const info1=
"Thank you for using the TRAVEL BUDDY."+" "+"We've successfully booked your seats."
// "Thank you for using the TRAVEL BUDDY."+" "+"We'vesuccessfully processed your payment of Rs"+localStorage.getItem("price")*size+".\n\n"
// const info2="Your Booking is Confirmed"

console.log(info1);
// console.log(info2);
    const form = useRef();
    const sendEmail=()=>{
        // e.preventdefault();
        emailjs.sendForm('service_7jfb7pv','template_ytguedf',form.current,'95bb5dkHPzVZmp_Ip')
        .then(() => {
            console.log('success');
        }, (error) => {
            console.log(error.text);
        });
        navigate('/confirm')
    
    }

 
  const handleButtonClick = () => {
    paymentHandler();
    // sendEmail();
  };
   
        return ( 
            <div className = 'paym' >
            {/* <div className = 'row' > */}
            {/* <div className = ' col App-payment ' >
            <p className = 'pPayment' > Enter Credit card details </p> 
            <Card 
            number = {number }
            name = { name }
            expiry = { expiry }
            cvc = { cvc }
            focused = { focus}
            />
            <form className = 'credit-form' id='form-id'  >
            <div className = 'form-group' >
            <input type = 'tel'
            name = 'number'
            className = 'frm-ctrl'
            placeholder = 'Card Number'
            maxLength={16}

            pattern = '[\d| ]{16,22}'
            value={number}
             onChange ={e=>setNumber(e.target.value) }
             onFocus={e=>setFocus(e.target.name)}
            />
            </div>
            <div className = 'form-group' >
            <input type = 'text'
            name = 'name'
            maxLength={20}

            className = 'frm-ctrl'
            placeholder = 'Name'
            value={name}

            onChange ={e=>setName(e.target.value) }
             onFocus={e=>setFocus(e.target.name)}
            />
            </div> 
           <div className = 'form-group' >
           <input type = 'tel'
            name = 'expiry'
            className = 'frm-ctrl'
            placeholder = 'Valid Thru'
            maxLength={4}

            pattern = '\d\d/\d\d'
            value={expiry}

            onChange ={e=>setExpiry(e.target.value) }
            onFocus={e=>setFocus(e.target.name)}
            />
             </div> 
            <div className = 'form-group' >
            <input type = 'tel'
            name = 'cvc'
            className = 'frm-ctrl cvc'
            placeholder = 'CVC'
            maxLength={3}
            pattern = '\d{3,4}'
            value={cvc}

            onChange ={e=>setCvc(e.target.value) }
             onFocus={e=>setFocus(e.target.name)}
            />
            </div>
            <div className = '' >*/}
            {/* <button onClick={sendEmail} className = 'btn btn-light btCustom' >PAY </button>  */}
            {/* </div> 
            </form> 
            </div>   */}
            <div className = 'col' >
            <div className='payhead'>
            <h3 className='h3'> Travel Buddy </h3> 
            <p className='detail'> BOOKING DETAILS </p> 
            </div>
            <div className = 'row' >
            <div className = 'col-7  heading ' >
            < p className = 'hdng' >Username</p> 
            <p className = 'hdng' > Date </p> 
            <p className='hdng'> From </p>
            <p className = 'hdng' > To </p>
            <p className = 'hdng' > Passengers Name </p>
            <p className = 'hdng' >Seat No </p>
            <p className = 'hdng' > Ticket price </p> 
            <p className = 'hdng' > Total price </p> 
            </div> 
            <div className = 'col-5 mt-2' >
            <p className='usrName'>{userData.name}</p>  
            <p className = 'usrName' > { localStorage.getItem('dep') } 
            </p> 
            <p className = 'usrName' > { localStorage.getItem('from') } </p> 
            <p className = 'usrName' > { localStorage.getItem('to') } 
            </p> 
            <p className = 'hdng' >{localStorage.getItem('name') } </p> 
            <p className = 'usrName' > { localStorage.getItem('seat') } </p>
            <p>{localStorage.getItem('price') }</p>
            <p> {localStorage.getItem('price')*size}</p>
          
            </div> 
            </div>
            <div className='centerbutton'>
            <button onClick={handleButtonClick} className = 'btn btn-light btCustom rezorpay' >PAY </button> 
            </div>
             </div>
               {/* </div> */}
               <div>
    <form className="myform" ref={form}>
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input type="email"  name = 'email'  value={email}class="form-control" id="exampleInputEmail1"/>
    
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input type="text" name = 'to_name'   value={cuName} class="form-control" id="exampleInputPassword1"/>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input type="text" name = 'message'   value={info1} class="form-control" id="exampleInputPassword1"/>
  </div>
  {/* <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input type="text" name = 'message'   value={info2} class="form-control" id="exampleInputPassword1"/>
  </div> */}
  
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
    </div>
               </div>
            
        );
    }
 
