import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearSelectedEvent } from '../../redux/eventSlice';
import { resetCount } from '../../redux/countSlice';
import { Link, useNavigate } from 'react-router-dom';
import { BiMinusCircle, BiPlusCircle } from "react-icons/bi";
import API_BASE_URL from '../../apiConfig';
import { setIsAgreed } from '../../redux/isAgreedSlice';
import {
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  IconButton,
} from '@mui/material';
import { RiDeleteBinLine } from 'react-icons/ri';

export const Cart = ({ selectedEvent, count, handleDecrease, handleIncrease, cartTotal }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onDeleteEvent = () => {
        dispatch(clearSelectedEvent());
        dispatch(resetCount());
        navigate('/');
    };

    const [isCouponVisible, setIsCouponVisible] = useState(false);
    const toggleCouponInput = () => {
        setIsCouponVisible(!isCouponVisible);
    };

    const isAgreed = useSelector((state) => state.isAgreed.isAgreed);

    const handleCheckboxChange = () => {
        dispatch(setIsAgreed(!isAgreed));
    };

    return (
        <>
            {/** Mobile View */}
            <div className="flex flex-col justify-start p-5 md:hidden">
                <div>
                    <Typography variant="h6" color="primary" gutterBottom>
                        Cart
                    </Typography>
                    <hr className="border-slate-600 w-full my-2" />
                </div>

                {selectedEvent ? (
                    <>
                        {/* Display selected event details */}
                        <Typography variant="subtitle1" color="textPrimary">
                            Product
                        </Typography>
                        <Typography variant="h6" color="primary" gutterBottom>
                            {selectedEvent.workshop}
                        </Typography>

                        <div className="flex w-full flex-col">
                            {/* Price */}
                            <div className="mb-5 flex justify-between items-center">
                                <Typography variant="subtitle1" color="textPrimary">
                                    Price
                                </Typography>
                                <Typography variant="body1" color="textPrimary" fontWeight="bold">
                                    Rs.{selectedEvent.price}
                                </Typography>
                            </div>
                            {/* Quantity */}
                            <hr className="border-slate-400 w-full my-2 md:hidden" />
                            <div className="mb-5 flex justify-between items-center">
                                <Typography variant="subtitle1" color="textPrimary">
                                    Quantity
                                </Typography>
                                <div className="flex items-center space-x-3 mt-3">
                                    <IconButton onClick={handleDecrease}>
                                        <BiMinusCircle className='text-2xl' />
                                    </IconButton>
                                    <Typography variant="body1" color="textPrimary" fontWeight="bold">
                                        {count}
                                    </Typography>
                                    <IconButton onClick={handleIncrease}>
                                        <BiPlusCircle className='text-2xl' />
                                    </IconButton>
                                </div>
                            </div>

                            {/* Total */}
                            <hr className="border-slate-400 w-full my-2 md:hidden" />
                            <div className="mb-5 flex justify-between items-center">
                                <Typography variant="subtitle1" color="textPrimary">
                                    Total
                                </Typography>
                                <Typography variant="body1" color="textPrimary" fontWeight="bold">
                                    Rs.{cartTotal}
                                </Typography>
                            </div>

                            {/* Apply Coupon */}
                            <hr className="border-slate-400 w-full my-2 md:hidden" />
                            <div className="mb-5 flex justify-between items-center">
                                {isCouponVisible ? (
                                    <div className="flex flex-col justify-between space-y-3 items-end w-full">
                                        <TextField
                                            type="text"
                                            variant="outlined"
                                            size="small"
                                            placeholder="Coupon Code"
                                            fullWidth
                                        />
                                        <Button
                                            variant="contained"
                                            color="error"
                                            size="small"
                                            onClick={toggleCouponInput}
                                        >
                                            No Coupon
                                        </Button>
                                    </div>
                                ) : (
                                    <Typography
                                        variant="body2"
                                        color="success"
                                        className="text-green-600 text-sm font-bold rounded-lg"
                                        onClick={toggleCouponInput}
                                    >
                                        Have Coupon?
                                    </Typography>
                                )}
                            </div>

                            {/* Action */}
                            <hr className="border-slate-400 w-full my-2 md:hidden" />
                            <div className="mb-5 flex justify-between items-center">
                                <div className=" rounded-full py-2 w-fit">
                                    <Typography
                                        variant="body1"
                                        color="error"
                                        className="text-md font-bold hover:cursor-pointer"
                                        onClick={onDeleteEvent}
                                    >
                                        Reset
                                    </Typography>
                                </div>
                            </div>
                            <hr className="border-slate-400 w-full my-2 md:hidden" />
                            <div className="flex flex-col space-y-3">
                                <Typography variant="body2" color="textPrimary">
                                    This price is inclusive of all taxes.
                                </Typography>
                                <div className='flex'>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={isAgreed}
                                                onChange={handleCheckboxChange}
                                                size="small"
                                                color="primary"
                                            />
                                        }
                                        label="I accept the terms of payment"
                                    />
                                </div>
                            </div>

                            {/* Checkout button with a link */}
                            <Link
                                to={isAgreed === true && `/customer-details?event=${selectedEvent.title}`}
                                className={`mt-2 bg-purple-900 text-white py-2 rounded flex items-center justify-center w-fit h-fit px-5 ${
                                    !isAgreed ? 'pointer-events-none opacity-50' : ''
                                }`}
                            >
                                Checkout
                            </Link>
                        </div>
                    </>
                ) : (
                    // No items in cart
                    <Typography variant="body1" color="textSecondary">
                        No items in cart.
                    </Typography>
                )}
            </div>

            {/** Desktop View */}
            <div className="hidden md:flex md:flex-col md:justify-between md:items-center md:mb-5">
                <Typography variant="h6" color="primary" gutterBottom>
                    Cart
                </Typography>

                {selectedEvent ? (
                    <>
                        <div className='flex flex-row justify-start items-start border border-slate-500 p-5 rounded-lg w-full space-x-5'>
                            {/* Display selected event image and details */}
                            <div className="flex flex-col justify-between items-start flex-1 space-y-3">
                                <Typography variant="subtitle1" color="textPrimary">
                                    ITEMS
                                </Typography>
                                <img src={API_BASE_URL +"/storage/images/events/" +selectedEvent.imagePath} alt="workshop" className="rounded-lg w-[200px]"/>
                            </div>
                            <div className='flex flex-col justify-between items-start w-3/4 space-y-10 x-full  '>
                                <div className="flex justify-between items-inline w-full">
                                    {/* Price */}
                                    <div className="flex flex-col justify-between items-start">
                                        <Typography variant="subtitle1" color="textPrimary">
                                            Price
                                        </Typography>
                                        <Typography variant="body1" color="textPrimary" fontWeight="bold">
                                            Rs.{selectedEvent.price}
                                        </Typography>
                                    </div>
                                    {/* Quantity */}
                                    <div className="flex flex-col justify-between items-start">
                                        <Typography variant="subtitle1" color="textPrimary">
                                            Quantity
                                        </Typography>
                                        <div className="flex items-center space-x-3 mt-3">
                                            <IconButton
                                                className="text-black font-bold py-2 px-4 rounded-full border border-black border-opacity-50 text-sm"
                                                onClick={handleDecrease}
                                            >
                                                -
                                            </IconButton>
                                            <Typography variant="body1" color="textPrimary" fontWeight="bold">
                                                {count}
                                            </Typography>
                                            <IconButton
                                                className="text-black font-bold py-2 px-4 rounded-full border border-black border-opacity-50 text-sm"
                                                onClick={handleIncrease}
                                            >
                                                +
                                            </IconButton>
                                        </div>
                                    </div>

                                    <hr className="border-slate-400 w-full my-2 md:hidden" />
                                    {/* Total */}
                                    <div className="flex flex-col justify-between items-start">
                                        <Typography variant="subtitle1" color="textPrimary">
                                            Total
                                        </Typography>
                                        <Typography variant="body1" color="textPrimary" fontWeight="bold">
                                            Rs.{cartTotal}
                                        </Typography>
                                    </div>
                                    <hr className="border-slate-400 w-full my-2 md:hidden" />
                                </div>

                                {/* Coupon Input */}
                                {/* Conditional rendering for Coupon input */}
                                {isCouponVisible ? (
                                    <div className="flex justify-between space-x-3 items-center">
                                        <TextField
                                            type="text"
                                            variant="outlined"
                                            size="small"
                                            placeholder="Coupon Code"
                                        />
                                        <Button
                                            variant="contained"
                                            color="error"
                                            size="small"
                                            onClick={toggleCouponInput}
                                        >
                                            No Coupon
                                        </Button>
                                    </div>
                                ) : (
                                    <Button
                                        type="button"
                                        variant="outlined"
                                        color="success"
                                        size="small"
                                        onClick={toggleCouponInput}
                                    >
                                        Have Coupon?
                                    </Button>
                                )}

                                <div className='flex  items-end w-full justify-between'>
                                    <div className="flex flex-col space-y-3">
                                        <Typography variant="body2" color="textPrimary">
                                            This price is inclusive of all taxes
                                        </Typography>
                                        <div className='flex'>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={isAgreed}
                                                        onChange={handleCheckboxChange}
                                                        size="small"
                                                        color="primary"
                                                    />
                                                }
                                                label="I accept the terms of payment"
                                            />
                                        </div>
                                    </div>
                                    <Typography
                                        variant="body1"
                                        color="error"
                                        className="text-md font-bold hover:cursor-pointer"
                                        onClick={onDeleteEvent}
                                    >
                                        Reset
                                    </Typography>

                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    // No items in cart
                    <Typography variant="body1" color="textSecondary">
                        No items in cart.
                    </Typography>
                )}
            </div>
        </>
    );
};

