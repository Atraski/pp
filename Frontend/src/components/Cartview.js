import { useState, useEffect } from 'react';
import './Cartview.css';
import'./Emptycart.css';
import {Link} from 'react-router-dom';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { DEL, total } from './Actions/action1';
import { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
// import 
// import{INCREMENT_QUANTITY} from './Actions/action1'

 function Cartview() {
  const navigate= useNavigate()
  const cartItems = useSelector((state) => state.Cartreducer.carts);

  // Initialize state for item quantities
   const [quantities, setQuantities] = useState(() => {
    const savedQuantities = JSON.parse(localStorage.getItem('cartQuantities')) || {};
    
    const initialQuantities = {};
    cartItems.forEach((item) => {
      initialQuantities[item.id] = savedQuantities[item.id] || 1;
    });
    return initialQuantities;
  });
  let CalculateTotal = () => {
    let total = 0;
    cartItems.forEach(item => {
      const quantity = quantities[item.id] || 0; // Get the quantity for the item
      const subtotal = Math.round(quantity * item.price);
      total += subtotal;
    });
    return total;

  };
 const totalval= CalculateTotal();
//  localStorage.setItem('total',totalval)
  

  // const checkout=async(amount)=>{
  //   var data1 = await fetch("http://localhost:5000/Order",{
  //     method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({amount})
  //   })
  //   data1 = await data1.json()

  //   var keys= await fetch("http://localhost:5000/key",{
  //     method: 'GET',

  //   })
  //   keys = await keys.json()
  //   console.log(keys,"yes")

  //   // const keys='rzp_test_OmCfFJhnp3Fztn'
  //   console.log(keys)
  //   console.log(data1.amount)
  //   console.log(data1.id)
  //   console.log(data1)
  //   var options = {
  //     key:keys.key, // Enter the Key ID generated from the Dashboard
  //     amount: data1.order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
  //     currency: "INR",
  //     name: "Acme Corp", //your business name
  //     description: "Test Transaction",
  //     image: "https://example.com/your_logo",
  //     order_id: data1.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
  //     callback_url: "http://localhost:5000/verification",
  //     prefill: { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
  //         name: "Gaurav Kumar", //your customer's name
  //         email: "gaurav.kumar@example.com",
  //         contact: "9000090000" //Provide the customer's phone number for better conversion rates 
  //     },
  //     notes: {
  //         "address": "Razorpay Corporate Office"
  //     },
  //     theme: {
  //         "color": "#3399cc"
  //     }
  // };
  // var rzp1 = new window.Razorpay(options);
  //     rzp1.open();
  // }
    // console.log(data1)


  

  useEffect(() => {
    // Update local storage whenever the quantities state changes
    localStorage.setItem('cartQuantities', JSON.stringify(quantities));
  }, [quantities]);

  const dispatch = useDispatch();

  function Del_data(id) {
    dispatch(DEL(id));
  }

  const incr = (id) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: (prevQuantities[id] || 0) + 1,
    }));
  };

  const decr = (id) => {
    if (quantities[id] > 1) {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [id]: prevQuantities[id] - 1,
      }));
    }
  };
  // const [total, setTotal] = useState(0.0);


 
  return (

    <>

    <div className="body">
      <div className="container-fluid "style={{ height:"70%",backgroundColor:"white"}}>
      {cartItems.length!=0 ?

        <div className="container mt-5 mb-5">
          <div className="d-flex justify-content-center row ">
            <div className="col-md-8">
              <div className="p-2">
                <h4 className='mt-3 fs-2'style={{color:"black", fontWeight:"700"}}> Your Shopping cart</h4>
                <div className="d-flex flex-row align-items-center pull-right">
                  {/* <span className="mr-1 font-weight-bold">Price</span> */}
                  <i className="fa fa-angle-down"></i>
                </div>
              </div>
              {cartItems.map((element) => {
                const quantity = quantities[element.id] || 0;
                return (
                  <div
                    key={element.id}
                    className="d-flex flex-row justify-content-between align-items-center p-2 bg-white mt-4 px-3 rounded direaction"
                  >
                    <div className="mr-1">
                      <Link to={`/blogger1/${element.id}`}>
                      <img
                        className="rounded"
                        src={element.imageurl}
                        width="120"
                        height="150
                        
                        "
                      />
                      </Link>
                    </div>
                    <div className="d-flex flex-column align-items-center product-details">
                      <span className="font-weight-bold text-black bloggerText">{element.name}</span>
                      <div className="d-flex flex-row product-desc">
                        {/* <div className="size mr-1">
                          <span className="text-black">Size:</span>
                          <span className="font-weight-bold text-black">&nbsp;M</span>
                        </div>
                        <div className="color">
                          <span className="text-black">Color:</span>
                          <span className="font-weight-bold text-black">&nbsp;Grey</span>
                        </div> */}
                      </div>
                    </div>
                    <div className="d-flex flex-row align-items-center qty">
                      <i
                        className="fa fa-minus text-danger mm"
                        onClick={() => decr(element.id)}
                      ></i>
                      <h5 className="text-grey mt-1 mr-1 ml-1 m">{quantity}</h5>
                      <i
                        className="fa fa-plus text-success mt-1 mr-1 ml-1 mm"
                        onClick={() => incr(element.id)}
                      ></i>
                    </div>
                    <div className="cartssss">
                    <div>

                      <h5 className="text-grey h5 mt-3 mr-5 ml-1 mb-2">₹ { Math.round(element.price  * quantity)}</h5>
                    </div>

                    <div className="d-flex align-items-center mt-1 mr-5 ml-1">
                      <i
                        className="fa fa-trash fs-2 mb-1 text-danger"
                        onClick={() => {
                          Del_data(element.id );
                        }}


                      ></i>

                    </div>
                    </div>
                    {/* <button onClick={()=>{checkout(Math.round(element.price  * quantity))}}>click here to buy</button> */}
                  </div>
                );
              })}

              <div className="d-flex   mt-3 p-2 bg-white rounded" style={{ justifyContent:"space-between"}}>
              {/* <Link to="/paymentform" > */}
                <button
                 className="btn btn-warning btn-lg ml-2 pay-button"
                  // type="button" style={{ width:"auto"}}  onClick={()=>{checkout(totalval)}}
                  type="button" style={{ width:"auto"}}  onClick={()=>{navigate('/paymentform')}}

                >
                  Proceed to Pay
                </button>
                <div className ="text-danger tt "style={{ color:" ",fontSize:"20px",padding:"8px" ,fontWeight:"bold" }}>Total Amount: ₹{totalval}</div>

              </div>

            </div>
          </div>
        </div>
    
        :
        <div className='container-fluid' style={{ height:"580px",backgroundColor:"white"}}>
      {/* <span> the cart is empty </span> */}
      <div className="empty-cart">
  <svg
    viewBox="656 573 264 182"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <rect
      id="bg-line"
      stroke="none"
      fillOpacity="0.2"
      fill="#FFE100"
      fillRule="evenodd"
      x={656}
      y={624}
      width={206}
      height={38}
      rx={19}
    />
    <rect
      id="bg-line"
      stroke="none"
      fillOpacity="0.2"
      fill="#FFE100"
      fillRule="evenodd"
      x={692}
      y={665}
      width={192}
      height={29}
      rx="14.5"
    />
    <rect
      id="bg-line"
      stroke="none"
      fillOpacity="0.2"
      fill="#FFE100"
      fillRule="evenodd"
      x={678}
      y={696}
      width={192}
      height={33}
      rx="16.5"
    />
    <g
      id="shopping-bag"
      stroke="none"
      strokeWidth={1}
      fill="none"
      fillRule="evenodd"
      transform="translate(721.000000, 630.000000)"
    >
      <polygon id="Fill-10" fill="#FFA800" points="4 29 120 29 120 0 4 0" />
      <polygon
        id="Fill-14"
        fill="#FFE100"
        points="120 29 120 0 115.75 0 103 12.4285714 115.75 29"
      />
      <polygon
        id="Fill-15"
        fill="#FFE100"
        points="4 29 4 0 8.25 0 21 12.4285714 8.25 29"
      />
      <polygon
        id="Fill-33"
        fill="#FFA800"
        points="110 112 121.573723 109.059187 122 29 110 29"
      />
      <polygon
        id="Fill-35"
        fillOpacity="0.5"
        fill="#FFFFFF"
        points="2 107.846154 10 112 10 31 2 31"
      />
      <path
        d="M107.709596,112 L15.2883462,112 C11.2635,112 8,108.70905 8,104.648275 L8,29 L115,29 L115,104.648275 C115,108.70905 111.7365,112 107.709596,112"
        id="Fill-36"
        fill="#FFE100"
      />
      <path
        d="M122,97.4615385 L122,104.230231 C122,108.521154 118.534483,112 114.257931,112 L9.74206897,112 C5.46551724,112 2,108.521154 2,104.230231 L2,58"
        id="Stroke-4916"
        stroke="#000000"
        strokeWidth={3}
        strokeLinecap="round"
      />
      <polyline
        id="Stroke-4917"
        stroke="#000000"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
        points="2 41.5 2 29 122 29 122 79"
      />
      <path
        d="M4,50 C4,51.104 3.104,52 2,52 C0.896,52 0,51.104 0,50 C0,48.896 0.896,48 2,48 C3.104,48 4,48.896 4,50"
        id="Fill-4918"
        fill="#000000"
      />
      <path
        d="M122,87 L122,89"
        id="Stroke-4919"
        stroke="#000000"
        strokeWidth={3}
        strokeLinecap="round"
      />
      <polygon
        id="Stroke-4922"
        stroke="#000000"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
        points="4 29 120 29 120 0 4 0"
      />
      <path
        d="M87,46 L87,58.3333333 C87,71.9 75.75,83 62,83 L62,83 C48.25,83 37,71.9 37,58.3333333 L37,46"
        id="Stroke-4923"
        stroke="#000000"
        strokeWidth={3}
        strokeLinecap="round"
      />
      <path
        d="M31,45 C31,41.686 33.686,39 37,39 C40.314,39 43,41.686 43,45"
        id="Stroke-4924"
        stroke="#000000"
        strokeWidth={3}
        strokeLinecap="round"
      />
      <path
        d="M81,45 C81,41.686 83.686,39 87,39 C90.314,39 93,41.686 93,45"
        id="Stroke-4925"
        stroke="#000000"
        strokeWidth={3}
        strokeLinecap="round"
      />
      <path
        d="M8,0 L20,12"
        id="Stroke-4928"
        stroke="#000000"
        strokeWidth={3}
        strokeLinecap="round"
      />
      <path
        d="M20,12 L8,29"
        id="Stroke-4929"
        stroke="#000000"
        strokeWidth={3}
        strokeLinecap="round"
      />
      <path
        d="M20,12 L20,29"
        id="Stroke-4930"
        stroke="#000000"
        strokeWidth={3}
        strokeLinecap="round"
      />
      <path
        d="M115,0 L103,12"
        id="Stroke-4931"
        stroke="#000000"
        strokeWidth={3}
        strokeLinecap="round"
      />
      <path
        d="M103,12 L115,29"
        id="Stroke-4932"
        stroke="#000000"
        strokeWidth={3}
        strokeLinecap="round"
      />
      <path
        d="M103,12 L103,29"
        id="Stroke-4933"
        stroke="#000000"
        strokeWidth={3}
        strokeLinecap="round"
      />
    </g>
    <g
      id="glow"
      stroke="none"
      strokeWidth={1}
      fill="none"
      fillRule="evenodd"
      transform="translate(768.000000, 615.000000)"
    >
      <rect
        id="Rectangle-2"
        fill="#000000"
        x={14}
        y={0}
        width={2}
        height={9}
        rx={1}
      />
      <rect
        fill="#000000"
        transform="translate(7.601883, 6.142354) rotate(-12.000000) translate(-7.601883, -6.142354) "
        x="6.60188267"
        y="3.14235449"
        width={2}
        height={6}
        rx={1}
      />
      <rect
        fill="#000000"
        transform="translate(1.540235, 7.782080) rotate(-25.000000) translate(-1.540235, -7.782080) "
        x="0.54023518"
        y="6.28207994"
        width={2}
        height={3}
        rx={1}
      />
      <rect
        fill="#000000"
        transform="translate(29.540235, 7.782080) scale(-1, 1) rotate(-25.000000) translate(-29.540235, -7.782080) "
        x="28.5402352"
        y="6.28207994"
        width={2}
        height={3}
        rx={1}
      />
      <rect
        fill="#000000"
        transform="translate(22.601883, 6.142354) scale(-1, 1) rotate(-12.000000) translate(-22.601883, -6.142354) "
        x="21.6018827"
        y="3.14235449"
        width={2}
        height={6}
        rx={1}
      />
    </g>
    <polygon
      id="plus"
      stroke="none"
      fill="#7DBFEB"
      fillRule="evenodd"
      points="689.681239 597.614697 689.681239 596 690.771974 596 690.771974 597.614697 692.408077 597.614697 692.408077 598.691161 690.771974 598.691161 690.771974 600.350404 689.681239 600.350404 689.681239 598.691161 688 598.691161 688 597.614697"
    />
    <polygon
      id="plus"
      stroke="none"
      fill="#EEE332"
      fillRule="evenodd"
      points="913.288398 701.226961 913.288398 699 914.773039 699 914.773039 701.226961 917 701.226961 917 702.711602 914.773039 702.711602 914.773039 705 913.288398 705 913.288398 702.711602 911 702.711602 911 701.226961"
    />
    <polygon
      id="plus"
      stroke="none"
      fill="#FFA800"
      fillRule="evenodd"
      points="662.288398 736.226961 662.288398 734 663.773039 734 663.773039 736.226961 666 736.226961 666 737.711602 663.773039 737.711602 663.773039 740 662.288398 740 662.288398 737.711602 660 737.711602 660 736.226961"
    />
    <circle
      id="oval"
      stroke="none"
      fill="#A5D6D3"
      fillRule="evenodd"
      cx="699.5"
      cy="579.5"
      r="1.5"
    />
    <circle
      id="oval"
      stroke="none"
      fill="#CFC94E"
      fillRule="evenodd"
      cx="712.5"
      cy="617.5"
      r="1.5"
    />
    <circle
      id="oval"
      stroke="none"
      fill="#8CC8C8"
      fillRule="evenodd"
      cx="692.5"
      cy="738.5"
      r="1.5"
    />
    <circle
      id="oval"
      stroke="none"
      fill="#3EC08D"
      fillRule="evenodd"
      cx="884.5"
      cy="657.5"
      r="1.5"
    />
    <circle
      id="oval"
      stroke="none"
      fill="#66739F"
      fillRule="evenodd"
      cx="918.5"
      cy="681.5"
      r="1.5"
    />
    <circle
      id="oval"
      stroke="none"
      fill="#C48C47"
      fillRule="evenodd"
      cx="903.5"
      cy="723.5"
      r="1.5"
    />
    <circle
      id="oval"
      stroke="none"
      fill="#A24C65"
      fillRule="evenodd"
      cx="760.5"
      cy="587.5"
      r="1.5"
    />
    <circle
      id="oval"
      stroke="#66739F"
      strokeWidth={2}
      fill="none"
      cx={745}
      cy={603}
      r={3}
    />
    <circle
      id="oval"
      stroke="#EFB549"
      strokeWidth={2}
      fill="none"
      cx={716}
      cy={597}
      r={3}
    />
    <circle
      id="oval"
      stroke="#FFE100"
      strokeWidth={2}
      fill="none"
      cx={681}
      cy={751}
      r={3}
    />
    <circle
      id="oval"
      stroke="#3CBC83"
      strokeWidth={2}
      fill="none"
      cx={896}
      cy={680}
      r={3}
    />
    <polygon
      id="diamond"
      stroke="#C46F82"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      points="886 705 889 708 886 711 883 708"
    />
    <path
      d="M736,577 C737.65825,577 739,578.34175 739,580 C739,578.34175 740.34175,577 742,577 C740.34175,577 739,575.65825 739,574 C739,575.65825 737.65825,577 736,577 Z"
      id="bubble-rounded"
      stroke="#3CBC83"
      strokeWidth={1}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
  <h3 style={{color:"black"}}>Oops The Cart Is Empty</h3>
  <p>
 Add Products In your Carts ,Start Your Shopping Today
  </p>
</div>

				</div>

            }

    
    
      </div>

      </div>
    </>
  );
}
// export { quantities };

export default Cartview ;