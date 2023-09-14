import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decreaseCount, increaseCount, resetCount } from '../../redux/countSlice';
import { Cart } from '../../components/cart-form/Cart';
import CustomerDetails from '../../components/cart-form/CustomerDetails';
import { useNavigate } from 'react-router';
import { DefaultLayoutComponent } from '../../components/pagelayouts/DefaultLayoutComponent';

const CartForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();



  // Get the selectedEvent from the Redux store or set it to null if not available
  const selectedEvent = useSelector((state) => state.event.selectedEvent) || null;

  // Get the count from the Redux store
  const count = useSelector((state) => state.count.count);

  // Check if the selectedEvent is available, otherwise navigate back to the home page
  useEffect(() => {
    if (!selectedEvent) {
      navigate('/');
    }
  });



  // Event handler for increasing the count
  const handleIncrease = (eventId) => {
    const serializableEventId = eventId.toString(); // Convert eventId to a string
    dispatch(increaseCount(serializableEventId));
  };

  // Event handler for decreasing the count
  const handleDecrease = (eventId) => {
    const serializableEventId = eventId.toString();
    dispatch(decreaseCount(serializableEventId));
  };

  // Calculate cart total, subtotal, VAT, and total
  const cartTotal = selectedEvent ? selectedEvent.price * count : 0;
  const VAT = selectedEvent.vat;
  const subtotal = cartTotal;
  const VATAmount = subtotal * VAT/100;
  const total = subtotal + VATAmount;

  return (
    <DefaultLayoutComponent>
      {/* Cart and Order Summary */}
      <div className="flex flex-col justify-start md:px-20 md:py-2 px-5 w-screen">
        <Cart selectedEvent={selectedEvent} handleDecrease={handleDecrease} handleIncrease={handleIncrease} count={count} cartTotal={total} />
        <div className='md:flex md:justify-between md:items-row md:space-x-10 hidden'>

          {/* Customer Details */}
          <CustomerDetails total={total}/>
        </div>
      </div>
    </DefaultLayoutComponent>
  );
};

export default CartForm;
